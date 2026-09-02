import type {
  FatturaElettronica,
  FatturaBody,
  CedentePrestatore,
  CessionarioCommittente,
  DatiTrasmissione,
  DettaglioLinea,
  DatiRiepilogoIVA,
  DatiPagamento,
  DettaglioPagamento,
  DatiGeneraliDocumento,
  DocumentoCorrelato,
  DatiDDT,
  ScontoMaggiorazione,
  CodiceArticolo,
  Allegato,
} from './types';

// Robust XML element selectors that ignore namespaces
function getDirectElement(parent: Element | null, tagName: string): Element | null {
  if (!parent) return null;
  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i];
    if (!child) continue;
    const localName = child.localName || child.nodeName.split(':').pop();
    if (localName === tagName) return child;
  }
  const elements = parent.getElementsByTagName(tagName);
  if (elements.length > 0 && elements[0]) return elements[0];
  const nsElements = parent.getElementsByTagNameNS('*', tagName);
  if (nsElements.length > 0 && nsElements[0]) return nsElements[0];
  return null;
}

function getDirectElements(parent: Element | null, tagName: string): Element[] {
  if (!parent) return [];
  const results: Element[] = [];
  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i];
    if (!child) continue;
    const localName = child.localName || child.nodeName.split(':').pop();
    if (localName === tagName) {
      results.push(child);
    }
  }
  if (results.length > 0) return results;
  const elements = parent.getElementsByTagName(tagName);
  if (elements.length > 0) return Array.from(elements);
  const nsElements = parent.getElementsByTagNameNS('*', tagName);
  return Array.from(nsElements);
}

function getText(parent: Element | null, tagName: string): string | undefined {
  const el = getDirectElement(parent, tagName);
  const text = el?.textContent?.trim();
  return text || undefined;
}

function getNumber(parent: Element | null, tagName: string): number | undefined {
  const text = getText(parent, tagName);
  if (!text) return undefined;
  const num = parseFloat(text.replace(',', '.'));
  return isNaN(num) ? undefined : num;
}

function formatCiiDate(rawDate?: string): string {
  if (!rawDate) return '';
  const clean = rawDate.trim();
  // Format YYYYMMDD
  if (/^\d{8}$/.test(clean)) {
    return `${clean.substring(0, 4)}-${clean.substring(4, 6)}-${clean.substring(6, 8)}`;
  }
  // Format YYYY-MM-DDTHH:MM:SS or YYYY-MM-DD
  if (clean.includes('T')) {
    return clean.split('T')[0] || clean;
  }
  return clean;
}

function parseCiiParty(partyEl: Element | null): {
  denominazione: string;
  idFiscale?: { idPaese: string; idCodice: string };
  codiceFiscale?: string;
  indirizzo: string;
  cap: string;
  comune: string;
  provincia?: string;
  nazione: string;
  email?: string;
  telefono?: string;
  uriId?: string;
} {
  if (!partyEl) {
    return {
      denominazione: 'Non specificato',
      indirizzo: '',
      cap: '',
      comune: '',
      nazione: 'IT',
    };
  }

  const denominazione = getText(partyEl, 'Name') || 'Non specificato';

  // Tax registrations
  const taxRegistrations = getDirectElements(partyEl, 'SpecifiedTaxRegistration');
  let rawVat: string | undefined;
  for (const tr of taxRegistrations) {
    const idEl = getDirectElement(tr, 'ID');
    const scheme = idEl?.getAttribute('schemeID');
    const val = idEl?.textContent?.trim();
    if (val) {
      if (scheme === 'VA' || /^[A-Z]{2}/i.test(val)) {
        rawVat = val;
        break;
      } else if (!rawVat) {
        rawVat = val;
      }
    }
  }

  const legalOrgEl = getDirectElement(partyEl, 'SpecifiedLegalOrganization');
  const legalId = getText(legalOrgEl, 'ID');

  let idFiscale: { idPaese: string; idCodice: string } | undefined;
  if (rawVat) {
    const cleanVat = rawVat.replace(/[\s.-]/g, '');
    if (/^[A-Z]{2}/i.test(cleanVat)) {
      idFiscale = {
        idPaese: cleanVat.substring(0, 2).toUpperCase(),
        idCodice: cleanVat.substring(2),
      };
    } else {
      idFiscale = {
        idPaese: 'IT',
        idCodice: cleanVat,
      };
    }
  }

  const codiceFiscale = legalId || (!rawVat ? undefined : undefined);

  // Address
  const postalAddress = getDirectElement(partyEl, 'PostalTradeAddress');
  const lineOne = getText(postalAddress, 'LineOne') || '';
  const lineTwo = getText(postalAddress, 'LineTwo');
  const lineThree = getText(postalAddress, 'LineThree');
  const indirizzo = [lineOne, lineTwo, lineThree].filter(Boolean).join(', ') || 'Indirizzo non specificato';
  const cap = getText(postalAddress, 'PostcodeCode') || '';
  const comune = getText(postalAddress, 'CityName') || '';
  const provincia = getText(postalAddress, 'CountrySubDivisionName');
  const nazione = getText(postalAddress, 'CountryID') || idFiscale?.idPaese || 'IT';

  // Contact
  const contactEl = getDirectElement(partyEl, 'DefinedTradeContact');
  const emailEl = getDirectElement(contactEl, 'EmailURIUniversalCommunication');
  const email = getText(emailEl, 'URIID');
  const phoneEl = getDirectElement(contactEl, 'TelephoneUniversalCommunication');
  const telefono = getText(phoneEl, 'CompleteNumber');

  const uriCommEl = getDirectElement(partyEl, 'URIUniversalCommunication');
  const uriId = getText(uriCommEl, 'URIID');

  return {
    denominazione,
    idFiscale,
    codiceFiscale,
    indirizzo,
    cap,
    comune,
    provincia,
    nazione,
    email,
    telefono,
    uriId,
  };
}

export function parseCiiInvoice(xmlDoc: Document, rawXml?: string, fileName?: string): FatturaElettronica {
  const root = xmlDoc.documentElement;

  // Context & Guideline
  const docContextEl = getDirectElement(root, 'ExchangedDocumentContext');
  const guidelineParamEl = getDirectElement(docContextEl, 'GuidelineSpecifiedDocumentContextParameter');
  const guidelineId = getText(guidelineParamEl, 'ID') || '';

  let versione = 'UN/CEFACT CII (Factur-X / ZUGFeRD)';
  if (guidelineId.toLowerCase().includes('xrechnung')) {
    versione = 'UN/CEFACT CII (XRechnung)';
  } else if (guidelineId.toLowerCase().includes('factur-x') || guidelineId.toLowerCase().includes('zugferd')) {
    versione = 'UN/CEFACT CII (Factur-X / ZUGFeRD)';
  } else if (guidelineId.toLowerCase().includes('en16931')) {
    versione = 'UN/CEFACT CII (EN 16931)';
  }

  // ExchangedDocument (Header)
  const exchangedDocEl = getDirectElement(root, 'ExchangedDocument');
  const numero = getText(exchangedDocEl, 'ID') || 'N/A';
  const tipoDocumento = getText(exchangedDocEl, 'TypeCode') || '380';

  const issueDateEl = getDirectElement(exchangedDocEl, 'IssueDateTime');
  const issueDateStrEl = getDirectElement(issueDateEl, 'DateTimeString');
  const rawData = issueDateStrEl?.textContent?.trim() || '';
  const data = formatCiiDate(rawData) || new Date().toISOString().split('T')[0] || '';

  // Notes / Causale
  const noteElements = getDirectElements(exchangedDocEl, 'IncludedNote');
  const causale = noteElements
    .map((n) => getText(n, 'Content'))
    .filter((s): s is string => !!s);

  // Supply Chain Trade Transaction
  const transactionEl = getDirectElement(root, 'SupplyChainTradeTransaction');

  // Trade Agreement (Parties, Orders, Contracts)
  const agreementEl = getDirectElement(transactionEl, 'ApplicableHeaderTradeAgreement');
  const buyerReference = getText(agreementEl, 'BuyerReference');

  // Supplier
  const sellerPartyEl = getDirectElement(agreementEl, 'SellerTradeParty');
  const seller = parseCiiParty(sellerPartyEl);

  const cedentePrestatore: CedentePrestatore = {
    datiAnagrafici: {
      idFiscaleIVA: seller.idFiscale,
      codiceFiscale: seller.codiceFiscale,
      anagrafica: {
        denominazione: seller.denominazione,
      },
    },
    sede: {
      indirizzo: seller.indirizzo,
      cap: seller.cap,
      comune: seller.comune,
      provincia: seller.provincia,
      nazione: seller.nazione,
    },
    contatti: {
      email: seller.email,
      telefono: seller.telefono,
    },
  };

  // Customer
  const buyerPartyEl = getDirectElement(agreementEl, 'BuyerTradeParty');
  const buyer = parseCiiParty(buyerPartyEl);

  const cessionarioCommittente: CessionarioCommittente = {
    datiAnagrafici: {
      idFiscaleIVA: buyer.idFiscale,
      codiceFiscale: buyer.codiceFiscale,
      anagrafica: {
        denominazione: buyer.denominazione,
      },
    },
    sede: {
      indirizzo: buyer.indirizzo,
      cap: buyer.cap,
      comune: buyer.comune,
      provincia: buyer.provincia,
      nazione: buyer.nazione,
    },
  };

  // Transmission Data
  const datiTrasmissione: DatiTrasmissione = {
    formatoTrasmissione: versione,
    progressivoInvio: numero,
    codiceDestinatario: buyerReference || buyer.uriId || '0000000',
    pecDestinatario: buyer.email,
  };

  // Correlated documents
  const datiOrdineAcquisto: DocumentoCorrelato[] = [];
  const buyerOrderDocEl = getDirectElement(agreementEl, 'BuyerOrderReferencedDocument');
  if (buyerOrderDocEl) {
    const orderId = getText(buyerOrderDocEl, 'ID');
    const orderDateEl = getDirectElement(buyerOrderDocEl, 'FormattedIssueDateTime');
    const orderDate = formatCiiDate(getText(orderDateEl, 'DateTimeString'));
    if (orderId) {
      datiOrdineAcquisto.push({
        idDocumento: orderId,
        data: orderDate || undefined,
      });
    }
  }

  const datiContratto: DocumentoCorrelato[] = [];
  const contractDocEl = getDirectElement(agreementEl, 'ContractReferencedDocument');
  if (contractDocEl) {
    const contractId = getText(contractDocEl, 'ID');
    if (contractId) {
      datiContratto.push({ idDocumento: contractId });
    }
  }

  // Delivery & DDT
  const deliveryEl = getDirectElement(transactionEl, 'ApplicableHeaderTradeDelivery');
  const datiDDT: DatiDDT[] = [];
  const despatchDocEl = getDirectElement(deliveryEl, 'DespatchAdviceReferencedDocument');
  if (despatchDocEl) {
    const ddtId = getText(despatchDocEl, 'ID');
    const ddtDateEl = getDirectElement(despatchDocEl, 'FormattedIssueDateTime');
    const ddtDate = formatCiiDate(getText(ddtDateEl, 'DateTimeString')) || '';
    if (ddtId) {
      datiDDT.push({
        numeroDDT: ddtId,
        dataDDT: ddtDate,
      });
    }
  }

  // Settlement (Monetary Summations, Tax, Payment)
  const settlementEl = getDirectElement(transactionEl, 'ApplicableHeaderTradeSettlement');
  const divisa = getText(settlementEl, 'InvoiceCurrencyCode') || 'EUR';

  // Monetary Summations
  const monetarySummationEl = getDirectElement(settlementEl, 'SpecifiedTradeSettlementHeaderMonetarySummation');
  const lineTotalAmount = getNumber(monetarySummationEl, 'LineTotalAmount') || 0;
  const taxBasisTotalAmount = getNumber(monetarySummationEl, 'TaxBasisTotalAmount') || lineTotalAmount;
  const grandTotalAmount = getNumber(monetarySummationEl, 'GrandTotalAmount');
  const duePayableAmount = getNumber(monetarySummationEl, 'DuePayableAmount') || grandTotalAmount || taxBasisTotalAmount;
  const roundingAmount = getNumber(monetarySummationEl, 'RoundingAmount');

  // Allowance / Charges at header level
  const docAllowanceCharges: ScontoMaggiorazione[] = [];
  const rootAllowanceElements = getDirectElements(settlementEl, 'SpecifiedTradeAllowanceCharge');
  for (const ac of rootAllowanceElements) {
    const isCharge = getText(ac, 'ChargeIndicator')?.toLowerCase() === 'true';
    const amount = getNumber(ac, 'ActualAmount');
    const percentage = getNumber(ac, 'CalculationPercent');
    if (amount !== undefined) {
      docAllowanceCharges.push({
        tipo: isCharge ? 'MG' : 'SC',
        importo: amount,
        percentuale: percentage,
      });
    }
  }

  const datiGeneraliDocumento: DatiGeneraliDocumento = {
    tipoDocumento,
    divisa,
    data,
    numero,
    importoTotaleDocumento: duePayableAmount,
    arrotondamento: roundingAmount,
    scontoMaggiorazione: docAllowanceCharges.length > 0 ? docAllowanceCharges : undefined,
    causale: causale.length > 0 ? causale : undefined,
  };

  // Applicable Trade Taxes (Tax Breakdown)
  const datiRiepilogo: DatiRiepilogoIVA[] = [];
  const taxElements = getDirectElements(settlementEl, 'ApplicableTradeTax');

  for (const taxEl of taxElements) {
    const basis = getNumber(taxEl, 'BasisAmount') || 0;
    const calculated = getNumber(taxEl, 'CalculatedAmount') || 0;
    const ratePercent = getNumber(taxEl, 'RateApplicablePercent') || 0;
    const categoryCode = getText(taxEl, 'CategoryCode') || 'S';
    const reason = getText(taxEl, 'ExemptionReason');

    datiRiepilogo.push({
      aliquotaIVA: ratePercent,
      natura: categoryCode,
      imponibileImporto: basis,
      imposta: calculated,
      esigibilitaIVA: categoryCode === 'AE' ? 'D' : 'I',
      riferimentoNormativo: reason,
    });
  }

  if (datiRiepilogo.length === 0) {
    const totalTax = getNumber(monetarySummationEl, 'TaxTotalAmount') || 0;
    datiRiepilogo.push({
      aliquotaIVA: 0,
      natura: 'S',
      imponibileImporto: taxBasisTotalAmount,
      imposta: totalTax,
      esigibilitaIVA: 'I',
    });
  }

  // Line Items (IncludedSupplyChainTradeLineItem)
  const dettaglioLinee: DettaglioLinea[] = [];
  const lineItemElements = getDirectElements(transactionEl, 'IncludedSupplyChainTradeLineItem');

  lineItemElements.forEach((lineEl, index) => {
    const docLineEl = getDirectElement(lineEl, 'AssociatedDocumentLineDocument');
    const lineId = getText(docLineEl, 'LineID') || String(index + 1);

    const productEl = getDirectElement(lineEl, 'SpecifiedTradeProduct');
    const name = getText(productEl, 'Name') || '';
    const desc = getText(productEl, 'Description') || '';
    const description = [name, desc].filter(Boolean).join(' - ') || `Riga ${index + 1}`;

    const codiciArticolo: CodiceArticolo[] = [];
    const sellerId = getText(productEl, 'SellerAssignedID');
    const globalIdEl = getDirectElement(productEl, 'GlobalID');
    const globalId = globalIdEl?.textContent?.trim();
    const globalScheme = globalIdEl?.getAttribute('schemeID') || 'GTIN';

    if (sellerId) codiciArticolo.push({ codiceTipo: 'SKU', codiceValore: sellerId });
    if (globalId) codiciArticolo.push({ codiceTipo: globalScheme, codiceValore: globalId });

    // Delivery Quantity
    const deliveryLineEl = getDirectElement(lineEl, 'SpecifiedLineTradeDelivery');
    const billedQtyEl = getDirectElement(deliveryLineEl, 'BilledQuantity');
    const quantity = billedQtyEl?.textContent ? parseFloat(billedQtyEl.textContent.replace(',', '.')) : 1;
    const unitaMisura = billedQtyEl?.getAttribute('unitCode') || undefined;

    // Price & Agreement
    const lineAgreementEl = getDirectElement(lineEl, 'SpecifiedLineTradeAgreement');
    const netPriceEl = getDirectElement(lineAgreementEl, 'NetPriceProductTradePrice');
    const unitPrice = getNumber(netPriceEl, 'ChargeAmount') || 0;

    // Line Settlement (Taxes, Total, Allowances)
    const lineSettlementEl = getDirectElement(lineEl, 'SpecifiedLineTradeSettlement');
    const lineTaxEl = getDirectElement(lineSettlementEl, 'ApplicableTradeTax');
    const lineTaxPercent = getNumber(lineTaxEl, 'RateApplicablePercent') || 0;
    const lineTaxCategory = getText(lineTaxEl, 'CategoryCode');

    const lineSummationEl = getDirectElement(lineSettlementEl, 'SpecifiedTradeSettlementLineMonetarySummation');
    const lineTotal = getNumber(lineSummationEl, 'LineTotalAmount') || unitPrice * quantity;

    // Line Allowance / Surcharges
    const lineAllowanceCharges: ScontoMaggiorazione[] = [];
    const lineAllowanceElements = getDirectElements(lineSettlementEl, 'SpecifiedTradeAllowanceCharge');
    for (const ac of lineAllowanceElements) {
      const isCharge = getText(ac, 'ChargeIndicator')?.toLowerCase() === 'true';
      const amount = getNumber(ac, 'ActualAmount');
      const percent = getNumber(ac, 'CalculationPercent');
      if (amount !== undefined) {
        lineAllowanceCharges.push({
          tipo: isCharge ? 'MG' : 'SC',
          importo: amount,
          percentuale: percent,
        });
      }
    }

    dettaglioLinee.push({
      numeroLinea: parseInt(lineId, 10) || index + 1,
      descrizione: description,
      quantita: isNaN(quantity) ? 1 : quantity,
      unitaMisura,
      prezzoUnitario: unitPrice,
      prezzoTotale: lineTotal,
      aliquotaIVA: lineTaxPercent,
      natura: lineTaxCategory,
      codiciArticolo: codiciArticolo.length > 0 ? codiciArticolo : undefined,
      scontiMaggiorazioni: lineAllowanceCharges.length > 0 ? lineAllowanceCharges : undefined,
    });
  });

  // Payment Details
  const datiPagamento: DatiPagamento[] = [];
  const paymentMeansElements = getDirectElements(settlementEl, 'SpecifiedTradeSettlementPaymentMeans');
  const paymentTermsEl = getDirectElement(settlementEl, 'SpecifiedTradePaymentTerms');
  const dueDateEl = getDirectElement(paymentTermsEl, 'DueDateDateTime');
  const dueDateStr = formatCiiDate(getText(dueDateEl, 'DateTimeString'));

  if (paymentMeansElements.length > 0) {
    const dettagliPagamento: DettaglioPagamento[] = [];

    for (const pm of paymentMeansElements) {
      const typeCode = getText(pm, 'TypeCode') || '30';
      const creditorAccountEl = getDirectElement(pm, 'PayeePartyCreditorFinancialAccount');
      const iban = getText(creditorAccountEl, 'IBANID') || getText(creditorAccountEl, 'ProprietaryID');
      const accountName = getText(creditorAccountEl, 'AccountName');

      const creditorInstEl = getDirectElement(pm, 'PayeeSpecifiedCreditorFinancialInstitution');
      const bic = getText(creditorInstEl, 'BICID');

      dettagliPagamento.push({
        modalitaPagamento: typeCode,
        dataScadenzaPagamento: dueDateStr || undefined,
        importoPagamento: duePayableAmount,
        codiceIBAN: iban,
        codiceBIC: bic,
        beneficiario: accountName || seller.denominazione,
      });
    }

    datiPagamento.push({
      condizioniPagamento: 'TP02',
      dettagliPagamento,
    });
  } else if (dueDateStr) {
    datiPagamento.push({
      condizioniPagamento: 'TP02',
      dettagliPagamento: [
        {
          modalitaPagamento: '30',
          dataScadenzaPagamento: dueDateStr,
          importoPagamento: duePayableAmount,
          beneficiario: seller.denominazione,
        },
      ],
    });
  }

  // Attachments (AdditionalReferencedDocument)
  const allegati: Allegato[] = [];
  const addReferencedDocElements = getDirectElements(agreementEl, 'AdditionalReferencedDocument');
  for (const docRef of addReferencedDocElements) {
    const docId = getText(docRef, 'ID') || 'allegato';
    const attachmentObj = getDirectElement(docRef, 'AttachmentBinaryObject');
    if (attachmentObj && attachmentObj.textContent) {
      const mime = attachmentObj.getAttribute('mimeCode') || undefined;
      const filename = attachmentObj.getAttribute('filename') || `${docId}.bin`;
      const base64 = attachmentObj.textContent.trim().replace(/\s/g, '');
      allegati.push({
        nomeAttachment: filename,
        formatoAttachment: mime,
        attachment: base64,
        dimensioneBytes: Math.floor((base64.length * 3) / 4),
      });
    }
  }

  const body: FatturaBody = {
    datiGenerali: {
      datiGeneraliDocumento,
      datiOrdineAcquisto: datiOrdineAcquisto.length > 0 ? datiOrdineAcquisto : undefined,
      datiContratto: datiContratto.length > 0 ? datiContratto : undefined,
      datiDDT: datiDDT.length > 0 ? datiDDT : undefined,
    },
    datiBeniServizi: {
      dettaglioLinee,
      datiRiepilogo,
    },
    datiPagamento: datiPagamento.length > 0 ? datiPagamento : undefined,
    allegati: allegati.length > 0 ? allegati : undefined,
  };

  return {
    versione,
    sistemaEmittente: guidelineId || 'UN/CEFACT CII Standard',
    header: {
      datiTrasmissione,
      cedentePrestatore,
      cessionarioCommittente,
    },
    body: [body],
    rawXml,
    fileName,
  };
}
