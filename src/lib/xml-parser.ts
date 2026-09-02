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
  DatiBollo,
  DatiRitenuta,
  DatiCassaPrevidenziale,
  Allegato,
  DocumentoCorrelato,
  DatiDDT,
  ScontoMaggiorazione,
  CodiceArticolo,
  AltriDatiGestionali,
  Anagrafica,
  Sede,
} from './types';

function getDirectElement(parent: Element | null, tagName: string): Element | null {
  if (!parent) return null;
  // Try direct children first (ignoring namespace prefix)
  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i];
    if (!child) continue;
    const localName = child.localName || child.nodeName.split(':').pop();
    if (localName === tagName) {
      return child;
    }
  }
  // Fallback to getElementsByTagName
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
  // Fallback
  const elements = parent.getElementsByTagName(tagName);
  if (elements.length > 0) return Array.from(elements);
  const nsElements = parent.getElementsByTagNameNS('*', tagName);
  return Array.from(nsElements);
}

function getText(parent: Element | null, tagName: string): string | undefined {
  const el = getDirectElement(parent, tagName);
  if (!el || el.textContent === null) return undefined;
  const text = el.textContent.trim();
  return text.length > 0 ? text : undefined;
}

function getNumber(parent: Element | null, tagName: string): number | undefined {
  const txt = getText(parent, tagName);
  if (txt === undefined) return undefined;
  const num = parseFloat(txt.replace(',', '.'));
  return isNaN(num) ? undefined : num;
}

function parseAnagrafica(parent: Element | null): Anagrafica {
  const anagraficaEl = getDirectElement(parent, 'Anagrafica');
  if (!anagraficaEl) {
    return {
      denominazione: getText(parent, 'Denominazione'),
      nome: getText(parent, 'Nome'),
      cognome: getText(parent, 'Cognome'),
    };
  }
  return {
    denominazione: getText(anagraficaEl, 'Denominazione'),
    nome: getText(anagraficaEl, 'Nome'),
    cognome: getText(anagraficaEl, 'Cognome'),
    titolo: getText(anagraficaEl, 'Titolo'),
    codEORI: getText(anagraficaEl, 'CodEORI'),
  };
}

function parseSede(parent: Element | null): Sede {
  return {
    indirizzo: getText(parent, 'Indirizzo') || '',
    numeroCivico: getText(parent, 'NumeroCivico'),
    cap: getText(parent, 'CAP') || '',
    comune: getText(parent, 'Comune') || '',
    provincia: getText(parent, 'Provincia'),
    nazione: getText(parent, 'Nazione') || 'IT',
  };
}

function parseCedentePrestatore(headerEl: Element): CedentePrestatore {
  const cpEl = getDirectElement(headerEl, 'CedentePrestatore');
  const datiAnagraficiEl = getDirectElement(cpEl, 'DatiAnagrafici');
  const idFiscaleIVAEl = getDirectElement(datiAnagraficiEl, 'IdFiscaleIVA');
  const sedeEl = getDirectElement(cpEl, 'Sede');
  const contattiEl = getDirectElement(cpEl, 'Contatti');
  const reaEl = getDirectElement(cpEl, 'IscrizioneREA');

  return {
    datiAnagrafici: {
      idFiscaleIVA: idFiscaleIVAEl
        ? {
            idPaese: getText(idFiscaleIVAEl, 'IdPaese') || 'IT',
            idCodice: getText(idFiscaleIVAEl, 'IdCodice') || '',
          }
        : undefined,
      codiceFiscale: getText(datiAnagraficiEl, 'CodiceFiscale'),
      anagrafica: parseAnagrafica(datiAnagraficiEl),
      alboProfessionale: getText(datiAnagraficiEl, 'AlboProfessionale'),
      provinciaAlbo: getText(datiAnagraficiEl, 'ProvinciaAlbo'),
      numeroIscrizioneAlbo: getText(datiAnagraficiEl, 'NumeroIscrizioneAlbo'),
      dataIscrizioneAlbo: getText(datiAnagraficiEl, 'DataIscrizioneAlbo'),
      regimeFiscale: getText(datiAnagraficiEl, 'RegimeFiscale'),
    },
    sede: parseSede(sedeEl),
    contatti: contattiEl
      ? {
          telefono: getText(contattiEl, 'Telefono'),
          fax: getText(contattiEl, 'Fax'),
          email: getText(contattiEl, 'Email'),
        }
      : undefined,
    iscrizioneREA: reaEl
      ? {
          ufficio: getText(reaEl, 'Ufficio'),
          numeroREA: getText(reaEl, 'NumeroREA'),
          capitaleSociale: getText(reaEl, 'CapitaleSociale'),
          socioUnico: getText(reaEl, 'SocioUnico'),
          statoLiquidazione: getText(reaEl, 'StatoLiquidazione'),
        }
      : undefined,
  };
}

function parseCessionarioCommittente(headerEl: Element): CessionarioCommittente {
  const ccEl = getDirectElement(headerEl, 'CessionarioCommittente');
  const datiAnagraficiEl = getDirectElement(ccEl, 'DatiAnagrafici');
  const idFiscaleIVAEl = getDirectElement(datiAnagraficiEl, 'IdFiscaleIVA');
  const sedeEl = getDirectElement(ccEl, 'Sede');

  return {
    datiAnagrafici: {
      idFiscaleIVA: idFiscaleIVAEl
        ? {
            idPaese: getText(idFiscaleIVAEl, 'IdPaese') || 'IT',
            idCodice: getText(idFiscaleIVAEl, 'IdCodice') || '',
          }
        : undefined,
      codiceFiscale: getText(datiAnagraficiEl, 'CodiceFiscale'),
      anagrafica: parseAnagrafica(datiAnagraficiEl),
    },
    sede: parseSede(sedeEl),
  };
}

function parseDatiTrasmissione(headerEl: Element): DatiTrasmissione {
  const dtEl = getDirectElement(headerEl, 'DatiTrasmissione');
  const idTrasmittenteEl = getDirectElement(dtEl, 'IdTrasmittente');
  const contattiEl = getDirectElement(dtEl, 'ContattiTrasmittente');

  return {
    idTrasmittente: idTrasmittenteEl
      ? {
          idPaese: getText(idTrasmittenteEl, 'IdPaese') || 'IT',
          idCodice: getText(idTrasmittenteEl, 'IdCodice') || '',
        }
      : undefined,
    progressivoInvio: getText(dtEl, 'ProgressivoInvio'),
    formatoTrasmissione: getText(dtEl, 'FormatoTrasmissione'),
    codiceDestinatario: getText(dtEl, 'CodiceDestinatario'),
    pecDestinatario: getText(dtEl, 'PECDestinatario'),
    contattiTrasmittente: contattiEl
      ? {
          telefono: getText(contattiEl, 'Telefono'),
          email: getText(contattiEl, 'Email'),
        }
      : undefined,
  };
}

function parseScontiMaggiorazioni(parent: Element | null): ScontoMaggiorazione[] {
  if (!parent) return [];
  const elements = getDirectElements(parent, 'ScontoMaggiorazione');
  return elements.map((sm) => ({
    tipo: getText(sm, 'Tipo') || 'SC',
    percentuale: getNumber(sm, 'Percentuale'),
    importo: getNumber(sm, 'Importo'),
  }));
}

function parseDettaglioLinee(parent: Element | null): DettaglioLinea[] {
  if (!parent) return [];
  const lineEls = getDirectElements(parent, 'DettaglioLinee');

  return lineEls.map((lineEl) => {
    const codiciArticoloEls = getDirectElements(lineEl, 'CodiceArticolo');
    const codiciArticolo: CodiceArticolo[] = codiciArticoloEls.map((ca) => ({
      codiceTipo: getText(ca, 'CodiceTipo') || '',
      codiceValore: getText(ca, 'CodiceValore') || '',
    }));

    const altriDatiEls = getDirectElements(lineEl, 'AltriDatiGestionali');
    const altriDatiGestionali: AltriDatiGestionali[] = altriDatiEls.map((ad) => ({
      tipoDato: getText(ad, 'TipoDato') || '',
      riferimentoTesto: getText(ad, 'RiferimentoTesto'),
      riferimentoNumero: getNumber(ad, 'RiferimentoNumero'),
      riferimentoData: getText(ad, 'RiferimentoData'),
    }));

    return {
      numeroLinea: getNumber(lineEl, 'NumeroLinea') || 1,
      tipoCessionePrestazione: getText(lineEl, 'TipoCessionePrestazione'),
      codiciArticolo: codiciArticolo.length > 0 ? codiciArticolo : undefined,
      descrizione: getText(lineEl, 'Descrizione') || '',
      quantita: getNumber(lineEl, 'Quantita'),
      unitaMisura: getText(lineEl, 'UnitaMisura'),
      dataInizioPeriodo: getText(lineEl, 'DataInizioPeriodo'),
      dataFinePeriodo: getText(lineEl, 'DataFinePeriodo'),
      prezzoUnitario: getNumber(lineEl, 'PrezzoUnitario') || 0,
      scontiMaggiorazioni: parseScontiMaggiorazioni(lineEl),
      prezzoTotale: getNumber(lineEl, 'PrezzoTotale') || 0,
      aliquotaIVA: getNumber(lineEl, 'AliquotaIVA') || 0,
      ritenuta: getText(lineEl, 'Ritenuta'),
      natura: getText(lineEl, 'Natura'),
      riferimentoAmministrazione: getText(lineEl, 'RiferimentoAmministrazione'),
      altriDatiGestionali: altriDatiGestionali.length > 0 ? altriDatiGestionali : undefined,
    };
  });
}

function parseDatiRiepilogoIVA(parent: Element | null): DatiRiepilogoIVA[] {
  if (!parent) return [];
  const riepilogoEls = getDirectElements(parent, 'DatiRiepilogo');

  return riepilogoEls.map((rEl) => ({
    aliquotaIVA: getNumber(rEl, 'AliquotaIVA') || 0,
    natura: getText(rEl, 'Natura'),
    speseAccessorie: getNumber(rEl, 'SpeseAccessorie'),
    arrotondamento: getNumber(rEl, 'Arrotondamento'),
    imponibileImporto: getNumber(rEl, 'ImponibileImporto') || 0,
    imposta: getNumber(rEl, 'Imposta') || 0,
    esigibilitaIVA: getText(rEl, 'EsigibilitaIVA') as 'I' | 'D' | 'S' | undefined,
    riferimentoNormativo: getText(rEl, 'RiferimentoNormativo'),
  }));
}

function parseDocumentiCorrelati(parent: Element | null, tagName: string): DocumentoCorrelato[] {
  if (!parent) return [];
  const els = getDirectElements(parent, tagName);
  return els.map((el) => {
    const numLinee = getDirectElements(el, 'RiferimentoNumeroLinea')
      .map((l) => parseInt(l.textContent || '0', 10))
      .filter((n) => !isNaN(n));
    return {
      riferimentoNumeroLinea: numLinee.length > 0 ? numLinee : undefined,
      idDocumento: getText(el, 'IdDocumento') || '',
      data: getText(el, 'Data'),
      numItem: getText(el, 'NumItem'),
      codiceCommessaConvenzione: getText(el, 'CodiceCommessaConvenzione'),
      codiceCUP: getText(el, 'CodiceCUP'),
      codiceCIG: getText(el, 'CodiceCIG'),
    };
  });
}

function parseDatiDDT(parent: Element | null): DatiDDT[] {
  if (!parent) return [];
  const els = getDirectElements(parent, 'DatiDDT');
  return els.map((el) => {
    const numLinee = getDirectElements(el, 'RiferimentoNumeroLinea')
      .map((l) => parseInt(l.textContent || '0', 10))
      .filter((n) => !isNaN(n));
    return {
      numeroDDT: getText(el, 'NumeroDDT') || '',
      dataDDT: getText(el, 'DataDDT') || '',
      riferimentoNumeroLinea: numLinee.length > 0 ? numLinee : undefined,
    };
  });
}

function parseDatiGeneraliDocumento(parent: Element | null): DatiGeneraliDocumento {
  const dgdEl = getDirectElement(parent, 'DatiGeneraliDocumento');
  if (!dgdEl) {
    return { tipoDocumento: 'TD01', divisa: 'EUR', data: '', numero: '' };
  }

  const bolloEl = getDirectElement(dgdEl, 'DatiBollo');
  const datiBollo: DatiBollo | undefined = bolloEl
    ? {
        bolloVirtuale: getText(bolloEl, 'BolloVirtuale'),
        importoBollo: getNumber(bolloEl, 'ImportoBollo'),
      }
    : undefined;

  const ritenutaEls = getDirectElements(dgdEl, 'DatiRitenuta');
  const datiRitenuta: DatiRitenuta[] = ritenutaEls.map((r) => ({
    tipoRitenuta: getText(r, 'TipoRitenuta') || 'RT01',
    importoRitenuta: getNumber(r, 'ImportoRitenuta') || 0,
    aliquotaRitenuta: getNumber(r, 'AliquotaRitenuta') || 0,
    causalePagamento: getText(r, 'CausalePagamento'),
  }));

  const cassaEls = getDirectElements(dgdEl, 'DatiCassaPrevidenziale');
  const datiCassaPrevidenziale: DatiCassaPrevidenziale[] = cassaEls.map((c) => ({
    tipoCassa: getText(c, 'TipoCassa') || '',
    aliquotaIVA: getNumber(c, 'AliquotaIVA') || 0,
    importoContributoCassa: getNumber(c, 'ImportoContributoCassa') || 0,
    imponibileCassa: getNumber(c, 'ImponibileCassa'),
    aliquotaCassa: getNumber(c, 'AliquotaCassa'),
    ritenuta: getText(c, 'Ritenuta'),
    natura: getText(c, 'Natura'),
  }));

  const causali = getDirectElements(dgdEl, 'Causale')
    .map((c) => c.textContent?.trim())
    .filter((c): c is string => !!c);

  return {
    tipoDocumento: getText(dgdEl, 'TipoDocumento') || 'TD01',
    divisa: getText(dgdEl, 'Divisa') || 'EUR',
    data: getText(dgdEl, 'Data') || '',
    numero: getText(dgdEl, 'Numero') || '',
    datiRitenuta: datiRitenuta.length > 0 ? datiRitenuta : undefined,
    datiBollo,
    datiCassaPrevidenziale: datiCassaPrevidenziale.length > 0 ? datiCassaPrevidenziale : undefined,
    scontoMaggiorazione: parseScontiMaggiorazioni(dgdEl),
    importoTotaleDocumento: getNumber(dgdEl, 'ImportoTotaleDocumento'),
    arrotondamento: getNumber(dgdEl, 'Arrotondamento'),
    causale: causali.length > 0 ? causali : undefined,
    art73: getText(dgdEl, 'Art73'),
  };
}

function parseDatiPagamento(parent: Element | null): DatiPagamento[] {
  if (!parent) return [];
  const dpEls = getDirectElements(parent, 'DatiPagamento');

  return dpEls.map((dpEl) => {
    const dettEls = getDirectElements(dpEl, 'DettaglioPagamento');
    const dettagliPagamento: DettaglioPagamento[] = dettEls.map((d) => ({
      beneficiario: getText(d, 'Beneficiario'),
      modalitaPagamento: getText(d, 'ModalitaPagamento') || 'MP01',
      dataRiferimentoTerminiPagamento: getText(d, 'DataRiferimentoTerminiPagamento'),
      giorniTerminiPagamento: getNumber(d, 'GiorniTerminiPagamento'),
      dataScadenzaPagamento: getText(d, 'DataScadenzaPagamento'),
      importoPagamento: getNumber(d, 'ImportoPagamento') || 0,
      codiceIBAN: getText(d, 'IBAN') || getText(d, 'CodiceIBAN'),
      codiceABI: getText(d, 'ABI') || getText(d, 'CodiceABI'),
      codiceCAB: getText(d, 'CAB') || getText(d, 'CodiceCAB'),
      codiceBIC: getText(d, 'BIC') || getText(d, 'CodiceBIC'),
      istitutoFinanziario: getText(d, 'IstitutoFinanziario'),
      scontoPagamentoAnticipato: getNumber(d, 'ScontoPagamentoAnticipato'),
      dataLimitePagamentoAnticipato: getText(d, 'DataLimitePagamentoAnticipato'),
    }));

    return {
      condizioniPagamento: getText(dpEl, 'CondizioniPagamento') || 'TP02',
      dettagliPagamento,
    };
  });
}

function parseAllegati(parent: Element | null): Allegato[] {
  if (!parent) return [];
  const allegatiEls = getDirectElements(parent, 'Allegati');

  return allegatiEls.map((el) => {
    const b64 = getText(el, 'Attachment') || '';
    let sizeBytes = 0;
    try {
      sizeBytes = Math.floor((b64.length * 3) / 4) - (b64.endsWith('==') ? 2 : b64.endsWith('=') ? 1 : 0);
    } catch {
      sizeBytes = b64.length;
    }

    return {
      nomeAttachment: getText(el, 'NomeAttachment') || 'allegato',
      algoritmoCompressione: getText(el, 'AlgoritmoCompressione'),
      formatoAttachment: getText(el, 'FormatoAttachment'),
      descrizioneAttachment: getText(el, 'DescrizioneAttachment'),
      attachment: b64,
      dimensioneBytes: sizeBytes > 0 ? sizeBytes : undefined,
    };
  });
}

/**
 * Extracts raw XML from a PKCS#7 / P7M signed binary string or buffer.
 */
export function extractXmlFromP7m(content: string | ArrayBuffer): string {
  let text = '';
  if (typeof content === 'string') {
    text = content;
  } else {
    const decoder = new TextDecoder('utf-8', { fatal: false });
    text = decoder.decode(content);
  }

  // Check if it's already an XML
  if (text.includes('<?xml') || text.includes('<FatturaElettronica') || text.includes(':FatturaElettronica')) {
    const startIdx = text.search(/<(\w+:)?FatturaElettronica/i);
    const endTagMatch = text.match(/<\/(\w+:)?FatturaElettronica>/i);
    if (startIdx !== -1 && endTagMatch && endTagMatch.index !== undefined) {
      const endIdx = endTagMatch.index + endTagMatch[0].length;
      return text.substring(startIdx, endIdx);
    }
  }

  // Fallback: try searching for <?xml or <FatturaElettronica
  const xmlMatch = text.match(/<\?xml[\s\S]*?<\/(\w+:)?FatturaElettronica>/i);
  if (xmlMatch) return xmlMatch[0];

  const rootMatch = text.match(/<(\w+:)?FatturaElettronica[\s\S]*?<\/(\w+:)?FatturaElettronica>/i);
  if (rootMatch) return rootMatch[0];

  return text;
}

/**
 * Main parser function to parse electronic invoice XML string into structured FatturaElettronica object.
 */
export function parseFatturaElettronica(rawContent: string, fileName?: string): FatturaElettronica {
  const cleanXml = extractXmlFromP7m(rawContent);

  const parser = new DOMParser();
  const doc = parser.parseFromString(cleanXml, 'application/xml');

  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    const docText = parser.parseFromString(cleanXml, 'text/xml');
    if (docText.querySelector('parsererror')) {
      throw new Error(`Errore di parsing XML: ${parseError.textContent?.slice(0, 200)}`);
    }
  }

  // Find root element (<p:FatturaElettronica>, <FatturaElettronica>, etc.)
  let rootEl: Element | null = doc.documentElement;
  const rootLocalName = rootEl ? (rootEl.localName || rootEl.nodeName.split(':').pop()) : null;
  if (rootLocalName !== 'FatturaElettronica') {
    const found = doc.getElementsByTagNameNS('*', 'FatturaElettronica');
    if (found.length > 0 && found[0]) {
      rootEl = found[0];
    } else {
      const tagFound = doc.getElementsByTagName('FatturaElettronica');
      if (tagFound.length > 0 && tagFound[0]) {
        rootEl = tagFound[0];
      } else {
        throw new Error('Il file fornito non contiene un elemento radice <FatturaElettronica>.');
      }
    }
  }

  if (!rootEl) {
    throw new Error('Elemento radice XML non valido.');
  }

  const versione = rootEl.getAttribute('versione') || 'FPR12';
  const sistemaEmittente = rootEl.getAttribute('SistemaEmittente') || undefined;

  const headerEl = getDirectElement(rootEl, 'FatturaElettronicaHeader');
  if (!headerEl) {
    throw new Error('Elemento <FatturaElettronicaHeader> mancante.');
  }

  const datiTrasmissione = parseDatiTrasmissione(headerEl);
  const cedentePrestatore = parseCedentePrestatore(headerEl);
  const cessionarioCommittente = parseCessionarioCommittente(headerEl);

  const terzoEl = getDirectElement(headerEl, 'TerzoIntermediarioOSoggettoEmittente');
  const datiAnagraficiTerzoEl = getDirectElement(terzoEl, 'DatiAnagrafici');
  const idFiscaleTerzoEl = getDirectElement(datiAnagraficiTerzoEl, 'IdFiscaleIVA');

  const terzoIntermediario = terzoEl
    ? {
        datiAnagrafici: {
          idFiscaleIVA: idFiscaleTerzoEl
            ? {
                idPaese: getText(idFiscaleTerzoEl, 'IdPaese') || 'IT',
                idCodice: getText(idFiscaleTerzoEl, 'IdCodice') || '',
              }
            : undefined,
          codiceFiscale: getText(datiAnagraficiTerzoEl, 'CodiceFiscale'),
          anagrafica: parseAnagrafica(datiAnagraficiTerzoEl),
        },
      }
    : undefined;

  const bodyEls = getDirectElements(rootEl, 'FatturaElettronicaBody');
  if (bodyEls.length === 0) {
    throw new Error('Elemento <FatturaElettronicaBody> mancante.');
  }

  const bodies: FatturaBody[] = bodyEls.map((bodyEl) => {
    const datiGeneraliEl = getDirectElement(bodyEl, 'DatiGenerali');
    const datiBeniServiziEl = getDirectElement(bodyEl, 'DatiBeniServizi');

    const datiGeneraliDocumento = parseDatiGeneraliDocumento(datiGeneraliEl);
    const datiOrdineAcquisto = parseDocumentiCorrelati(datiGeneraliEl, 'DatiOrdineAcquisto');
    const datiContratto = parseDocumentiCorrelati(datiGeneraliEl, 'DatiContratto');
    const datiConvenzione = parseDocumentiCorrelati(datiGeneraliEl, 'DatiConvenzione');
    const datiRicezione = parseDocumentiCorrelati(datiGeneraliEl, 'DatiRicezione');
    const datiFattureCollegate = parseDocumentiCorrelati(datiGeneraliEl, 'DatiFattureCollegate');
    const datiDDT = parseDatiDDT(datiGeneraliEl);

    const dettaglioLinee = parseDettaglioLinee(datiBeniServiziEl);
    const datiRiepilogo = parseDatiRiepilogoIVA(datiBeniServiziEl);
    const datiPagamento = parseDatiPagamento(bodyEl);
    const allegati = parseAllegati(bodyEl);

    return {
      datiGenerali: {
        datiGeneraliDocumento,
        datiOrdineAcquisto: datiOrdineAcquisto.length > 0 ? datiOrdineAcquisto : undefined,
        datiContratto: datiContratto.length > 0 ? datiContratto : undefined,
        datiConvenzione: datiConvenzione.length > 0 ? datiConvenzione : undefined,
        datiRicezione: datiRicezione.length > 0 ? datiRicezione : undefined,
        datiFattureCollegate: datiFattureCollegate.length > 0 ? datiFattureCollegate : undefined,
        datiDDT: datiDDT.length > 0 ? datiDDT : undefined,
      },
      datiBeniServizi: {
        dettaglioLinee,
        datiRiepilogo,
      },
      datiPagamento: datiPagamento.length > 0 ? datiPagamento : undefined,
      allegati: allegati.length > 0 ? allegati : undefined,
    };
  });

  return {
    versione,
    sistemaEmittente,
    header: {
      datiTrasmissione,
      cedentePrestatore,
      cessionarioCommittente,
      terzoIntermediarioOSoggettoEmittente: terzoIntermediario,
      soggettoEmittente: getText(headerEl, 'SoggettoEmittente'),
    },
    body: bodies,
    rawXml: cleanXml,
    fileName,
  };
}

function datiConvenzioneEl(datiGeneraliEl: Element | null): Element | null {
  return datiGeneraliEl;
}
