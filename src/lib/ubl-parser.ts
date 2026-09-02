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

function parseParty(partyEl: Element | null): {
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
  endpointId?: string;
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

  // Name
  const partyNameEl = getDirectElement(partyEl, 'PartyName');
  const legalEntityEl = getDirectElement(partyEl, 'PartyLegalEntity');
  const denominazione =
    getText(partyNameEl, 'Name') ||
    getText(legalEntityEl, 'RegistrationName') ||
    getText(partyEl, 'EndpointID') ||
    'Non specificato';

  // Tax ID & Registration
  const taxSchemeEl = getDirectElement(partyEl, 'PartyTaxScheme');
  const taxCompanyId = getText(taxSchemeEl, 'CompanyID');
  const legalCompanyId = getText(legalEntityEl, 'CompanyID');
  const partyIdEl = getDirectElement(partyEl, 'PartyIdentification');
  const rawPartyId = getText(partyIdEl, 'ID');

  let idFiscale: { idPaese: string; idCodice: string } | undefined;
  const rawVat = taxCompanyId || (rawPartyId && /^[A-Z]{2}/.test(rawPartyId) ? rawPartyId : undefined);

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

  const codiceFiscale = legalCompanyId || (!taxCompanyId && rawPartyId ? rawPartyId : undefined);

  // Address
  const postalAddress = getDirectElement(partyEl, 'PostalAddress');
  const streetName = getText(postalAddress, 'StreetName') || '';
  const addStreet = getText(postalAddress, 'AdditionalStreetName');
  const indirizzo = [streetName, addStreet].filter(Boolean).join(', ') || 'Indirizzo non specificato';
  const cap = getText(postalAddress, 'PostalZone') || '';
  const comune = getText(postalAddress, 'CityName') || '';
  const provincia = getText(postalAddress, 'CountrySubentity');
  const countryEl = getDirectElement(postalAddress, 'Country');
  const nazione = getText(countryEl, 'IdentificationCode') || idFiscale?.idPaese || 'IT';

  // Contact
  const contactEl = getDirectElement(partyEl, 'Contact');
  const email = getText(contactEl, 'ElectronicMail');
  const telefono = getText(contactEl, 'Telephone');
  const endpointId = getText(partyEl, 'EndpointID');

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
    endpointId,
  };
}

export function parseUblInvoice(xmlDoc: Document, rawXml?: string, fileName?: string): FatturaElettronica {
  const root = xmlDoc.documentElement;
  const isCreditNote = (root.localName || root.nodeName).toLowerCase().includes('creditnote');

  // Customization & Version Detection
  const customizationId = getText(root, 'CustomizationID') || '';
  const profileId = getText(root, 'ProfileID') || '';

  let versione = isCreditNote ? 'UBL 2.1 (CreditNote)' : 'UBL 2.1 (Invoice)';
  if (customizationId.toLowerCase().includes('peppol')) {
    versione = isCreditNote ? 'UBL 2.1 (Peppol CreditNote)' : 'UBL 2.1 (Peppol BIS 3.0)';
  } else if (customizationId.toLowerCase().includes('xrechnung')) {
    versione = 'UBL 2.1 (XRechnung)';
  } else if (customizationId.toLowerCase().includes('en16931')) {
    versione = 'UBL 2.1 (EN 16931)';
  }

  // Document General Info
  const numero = getText(root, 'ID') || 'N/A';
  const data = getText(root, 'IssueDate') || new Date().toISOString().split('T')[0] || '';
  const tipoDocumento = getText(root, 'InvoiceTypeCode') || (isCreditNote ? '381' : '380');
  const divisa = getText(root, 'DocumentCurrencyCode') || 'EUR';
  const buyerReference = getText(root, 'BuyerReference');

  // Notes & Causale
  const noteElements = getDirectElements(root, 'Note');
  const causale = noteElements.map((n) => n.textContent?.trim() || '').filter(Boolean);

  // Supplier (Cedente / Prestatore)
  const supplierPartyWrapper = getDirectElement(root, 'AccountingSupplierParty');
  const supplierPartyEl = getDirectElement(supplierPartyWrapper, 'Party') || supplierPartyWrapper;
  const supplier = parseParty(supplierPartyEl);

  const cedentePrestatore: CedentePrestatore = {
    datiAnagrafici: {
      idFiscaleIVA: supplier.idFiscale,
      codiceFiscale: supplier.codiceFiscale,
      anagrafica: {
        denominazione: supplier.denominazione,
      },
    },
    sede: {
      indirizzo: supplier.indirizzo,
      cap: supplier.cap,
      comune: supplier.comune,
      provincia: supplier.provincia,
      nazione: supplier.nazione,
    },
    contatti: {
      email: supplier.email,
      telefono: supplier.telefono,
    },
  };

  // Customer (Cessionario / Committente)
  const customerPartyWrapper = getDirectElement(root, 'AccountingCustomerParty');
  const customerPartyEl = getDirectElement(customerPartyWrapper, 'Party') || customerPartyWrapper;
  const customer = parseParty(customerPartyEl);

  const cessionarioCommittente: CessionarioCommittente = {
    datiAnagrafici: {
      idFiscaleIVA: customer.idFiscale,
      codiceFiscale: customer.codiceFiscale,
      anagrafica: {
        denominazione: customer.denominazione,
      },
    },
    sede: {
      indirizzo: customer.indirizzo,
      cap: customer.cap,
      comune: customer.comune,
      provincia: customer.provincia,
      nazione: customer.nazione,
    },
  };

  // Transmission Data
  const datiTrasmissione: DatiTrasmissione = {
    formatoTrasmissione: versione,
    progressivoInvio: numero,
    codiceDestinatario: buyerReference || customer.endpointId || '0000000',
    pecDestinatario: customer.email,
  };

  // Correlated documents (Order, Contract, Despatch/DDT)
  const datiOrdineAcquisto: DocumentoCorrelato[] = [];
  const orderRefEl = getDirectElement(root, 'OrderReference');
  if (orderRefEl) {
    const orderId = getText(orderRefEl, 'ID');
    const orderDate = getText(orderRefEl, 'IssueDate');
    if (orderId) {
      datiOrdineAcquisto.push({
        idDocumento: orderId,
        data: orderDate,
      });
    }
  }

  const datiContratto: DocumentoCorrelato[] = [];
  const contractRefEl = getDirectElement(root, 'ContractDocumentReference');
  if (contractRefEl) {
    const contractId = getText(contractRefEl, 'ID');
    if (contractId) {
      datiContratto.push({ idDocumento: contractId });
    }
  }

  const datiDDT: DatiDDT[] = [];
  const despatchRefElements = getDirectElements(root, 'DespatchDocumentReference');
  for (const d of despatchRefElements) {
    const ddtId = getText(d, 'ID');
    const ddtDate = getText(d, 'IssueDate') || '';
    if (ddtId) {
      datiDDT.push({
        numeroDDT: ddtId,
        dataDDT: ddtDate,
      });
    }
  }

  // Monetary Totals (LegalMonetaryTotal)
  const monetaryTotalEl = getDirectElement(root, 'LegalMonetaryTotal');
  const lineExtensionAmount = getNumber(monetaryTotalEl, 'LineExtensionAmount') || 0;
  const taxExclusiveAmount = getNumber(monetaryTotalEl, 'TaxExclusiveAmount') || lineExtensionAmount;
  const taxInclusiveAmount = getNumber(monetaryTotalEl, 'TaxInclusiveAmount');
  const payableRoundingAmount = getNumber(monetaryTotalEl, 'PayableRoundingAmount');
  const payableAmount = getNumber(monetaryTotalEl, 'PayableAmount') || taxInclusiveAmount || taxExclusiveAmount;

  // Global Discounts/Charges on document level
  const docAllowanceCharges: ScontoMaggiorazione[] = [];
  const rootAllowanceCharges = getDirectElements(root, 'AllowanceCharge');
  for (const ac of rootAllowanceCharges) {
    const isCharge = getText(ac, 'ChargeIndicator')?.toLowerCase() === 'true';
    const amount = getNumber(ac, 'Amount');
    const percentage = getNumber(ac, 'MultiplierFactorNumeric');
    if (amount !== undefined) {
      docAllowanceCharges.push({
        tipo: isCharge ? 'MG' : 'SC',
        importo: amount,
        percentuale: percentage !== undefined ? percentage * (percentage <= 1 ? 100 : 1) : undefined,
      });
    }
  }

  const datiGeneraliDocumento: DatiGeneraliDocumento = {
    tipoDocumento,
    divisa,
    data,
    numero,
    importoTotaleDocumento: payableAmount,
    arrotondamento: payableRoundingAmount,
    scontoMaggiorazione: docAllowanceCharges.length > 0 ? docAllowanceCharges : undefined,
    causale: causale.length > 0 ? causale : undefined,
  };

  // Tax Subtotals (cac:TaxTotal / cac:TaxSubtotal)
  const datiRiepilogo: DatiRiepilogoIVA[] = [];
  const taxTotalElements = getDirectElements(root, 'TaxTotal');

  for (const taxTotalEl of taxTotalElements) {
    const taxSubtotals = getDirectElements(taxTotalEl, 'TaxSubtotal');
    for (const sub of taxSubtotals) {
      const taxable = getNumber(sub, 'TaxableAmount') || 0;
      const tax = getNumber(sub, 'TaxAmount') || 0;
      const taxCategoryEl = getDirectElement(sub, 'TaxCategory');
      const percent = getNumber(taxCategoryEl, 'Percent') || 0;
      const categoryId = getText(taxCategoryEl, 'ID') || 'S';
      const reason = getText(taxCategoryEl, 'TaxExemptionReason');

      datiRiepilogo.push({
        aliquotaIVA: percent,
        natura: categoryId,
        imponibileImporto: taxable,
        imposta: tax,
        esigibilitaIVA: categoryId === 'AE' ? 'D' : 'I',
        riferimentoNormativo: reason,
      });
    }
  }

  // Fallback if no explicit tax subtotal was found
  if (datiRiepilogo.length === 0) {
    const totalTaxAmount = taxTotalElements.length > 0 ? getNumber(taxTotalElements[0] || null, 'TaxAmount') || 0 : 0;
    datiRiepilogo.push({
      aliquotaIVA: 0,
      natura: 'S',
      imponibileImporto: taxExclusiveAmount,
      imposta: totalTaxAmount,
      esigibilitaIVA: 'I',
    });
  }

  // Invoice Lines (cac:InvoiceLine or cac:CreditNoteLine)
  const dettaglioLinee: DettaglioLinea[] = [];
  const lineTag = isCreditNote ? 'CreditNoteLine' : 'InvoiceLine';
  const lineElements = getDirectElements(root, lineTag);

  lineElements.forEach((lineEl, index) => {
    const lineId = getText(lineEl, 'ID') || String(index + 1);
    const qtyTag = isCreditNote ? 'CreditedQuantity' : 'InvoicedQuantity';
    const quantity = getNumber(lineEl, qtyTag) || 1;
    const qtyEl = getDirectElement(lineEl, qtyTag);
    const unitaMisura = qtyEl?.getAttribute('unitCode') || undefined;

    const lineExtension = getNumber(lineEl, 'LineExtensionAmount') || 0;

    // Item details
    const itemEl = getDirectElement(lineEl, 'Item');
    const description =
      getText(itemEl, 'Name') ||
      getText(itemEl, 'Description') ||
      `Riga ${index + 1}`;

    const codiciArticolo: CodiceArticolo[] = [];
    const sellerItemEl = getDirectElement(itemEl, 'SellersItemIdentification');
    const standardItemEl = getDirectElement(itemEl, 'StandardItemIdentification');
    if (sellerItemEl) {
      const sku = getText(sellerItemEl, 'ID');
      if (sku) codiciArticolo.push({ codiceTipo: 'SKU', codiceValore: sku });
    }
    if (standardItemEl) {
      const gtin = getText(standardItemEl, 'ID');
      if (gtin) codiciArticolo.push({ codiceTipo: 'GTIN', codiceValore: gtin });
    }

    // Price
    const priceEl = getDirectElement(lineEl, 'Price');
    const unitPrice = getNumber(priceEl, 'PriceAmount') || (quantity > 0 ? lineExtension / quantity : lineExtension);

    // Tax Category on Line
    const taxCatEl = getDirectElement(itemEl, 'ClassifiedTaxCategory');
    const lineTaxPercent = getNumber(taxCatEl, 'Percent') || 0;
    const lineTaxCategory = getText(taxCatEl, 'ID');

    // Line discounts / allowances
    const lineAllowanceCharges: ScontoMaggiorazione[] = [];
    const lineAllowanceElements = getDirectElements(lineEl, 'AllowanceCharge');
    for (const ac of lineAllowanceElements) {
      const isCharge = getText(ac, 'ChargeIndicator')?.toLowerCase() === 'true';
      const amount = getNumber(ac, 'Amount');
      const multiplier = getNumber(ac, 'MultiplierFactorNumeric');
      if (amount !== undefined) {
        lineAllowanceCharges.push({
          tipo: isCharge ? 'MG' : 'SC',
          importo: amount,
          percentuale: multiplier !== undefined ? multiplier * (multiplier <= 1 ? 100 : 1) : undefined,
        });
      }
    }

    dettaglioLinee.push({
      numeroLinea: parseInt(lineId, 10) || index + 1,
      descrizione: description,
      quantita: quantity,
      unitaMisura,
      prezzoUnitario: unitPrice,
      prezzoTotale: lineExtension,
      aliquotaIVA: lineTaxPercent,
      natura: lineTaxCategory,
      codiciArticolo: codiciArticolo.length > 0 ? codiciArticolo : undefined,
      scontiMaggiorazioni: lineAllowanceCharges.length > 0 ? lineAllowanceCharges : undefined,
    });
  });

  // Payment Details (cac:PaymentMeans)
  const datiPagamento: DatiPagamento[] = [];
  const paymentMeansElements = getDirectElements(root, 'PaymentMeans');
  const rootDueDate = getText(root, 'DueDate');

  if (paymentMeansElements.length > 0) {
    const dettagliPagamento: DettaglioPagamento[] = [];

    for (const pm of paymentMeansElements) {
      const code = getText(pm, 'PaymentMeansCode') || '30';
      const dueDate = getText(pm, 'PaymentDueDate') || rootDueDate;
      const paymentId = getText(pm, 'PaymentID') || getText(pm, 'InstructionNote');

      // Bank account
      const financialAccountEl = getDirectElement(pm, 'PayeeFinancialAccount');
      const iban = getText(financialAccountEl, 'ID');
      const accountName = getText(financialAccountEl, 'Name');

      const branchEl = getDirectElement(financialAccountEl, 'FinancialInstitutionBranch');
      const bic = getText(branchEl, 'ID');

      dettagliPagamento.push({
        modalitaPagamento: code,
        dataScadenzaPagamento: dueDate,
        importoPagamento: payableAmount,
        codiceIBAN: iban,
        codiceBIC: bic,
        beneficiario: accountName || supplier.denominazione,
      });
    }

    datiPagamento.push({
      condizioniPagamento: 'TP02',
      dettagliPagamento,
    });
  } else if (rootDueDate) {
    datiPagamento.push({
      condizioniPagamento: 'TP02',
      dettagliPagamento: [
        {
          modalitaPagamento: '30',
          dataScadenzaPagamento: rootDueDate,
          importoPagamento: payableAmount,
          beneficiario: supplier.denominazione,
        },
      ],
    });
  }

  // Attachments (cac:AdditionalDocumentReference / cac:Attachment)
  const allegati: Allegato[] = [];
  const addDocRefElements = getDirectElements(root, 'AdditionalDocumentReference');
  for (const docRef of addDocRefElements) {
    const docId = getText(docRef, 'ID') || 'allegato';
    const attachmentEl = getDirectElement(docRef, 'Attachment');
    const embeddedObj = getDirectElement(attachmentEl, 'EmbeddedDocumentBinaryObject');
    if (embeddedObj && embeddedObj.textContent) {
      const mime = embeddedObj.getAttribute('mimeCode') || undefined;
      const filename = embeddedObj.getAttribute('filename') || `${docId}.bin`;
      const base64 = embeddedObj.textContent.trim().replace(/\s/g, '');
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
    sistemaEmittente: customizationId || profileId || 'UBL 2.1 Standard',
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
