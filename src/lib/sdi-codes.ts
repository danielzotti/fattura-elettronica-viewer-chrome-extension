export const TIPI_DOCUMENTO: Record<string, { label: string; desc: string; isCredit?: boolean }> = {
  TD01: { label: 'Fattura ordinaria', desc: 'Fattura standard tra privati o verso PA' },
  TD02: { label: 'Acconto/Anticipo su fattura', desc: 'Fattura di acconto per cessione di beni o prestazioni' },
  TD03: { label: 'Acconto/Anticipo su parcella', desc: 'Acconto per prestazioni professionali' },
  TD04: { label: 'Nota di credito', desc: 'Rettifica a favore del cliente (importo a credito/storno)', isCredit: true },
  TD05: { label: 'Nota di debito', desc: 'Rettifica a debito del cliente' },
  TD06: { label: 'Parcella', desc: 'Parcella per liberi professionisti iscritti ad albo' },
  TD16: { label: 'Integrazione reverse charge interno', desc: 'Integrazione fattura per reverse charge interno' },
  TD17: { label: 'Integrazione/Autofattura acquisto servizi estero', desc: 'Acquisto di servizi dall’estero (UE ed extra-UE)' },
  TD18: { label: 'Integrazione acquisto beni intracomunitari', desc: 'Acquisto di beni da paesi UE' },
  TD19: { label: 'Integrazione/Autofattura acquisto beni ex art.17 c.2 DPR 633/72', desc: 'Acquisto beni da soggetti non residenti' },
  TD20: { label: 'Autofattura per regolarizzazione (splafonamento/omessa fattura)', desc: 'Autofattura denuncia ex art. 6 c. 8 D.Lgs. 471/97' },
  TD21: { label: 'Autofattura per splafonamento', desc: 'Autofattura per superamento plafond' },
  TD22: { label: 'Estrazione beni da Deposito IVA', desc: 'Estrazione beni con o senza pagamento IVA' },
  TD23: { label: 'Estrazione beni da Deposito IVA con versamento IVA', desc: 'Estrazione beni da deposito IVA con versamento' },
  TD24: { label: 'Fattura differita', desc: 'Fattura differita per beni collegati a DDT o servizi' },
  TD25: { label: 'Fattura differita per triangolare', desc: 'Fattura differita per passaggi triangolari' },
  TD26: { label: 'Cessione beni ammortizzabili / passaggi interni', desc: 'Vendita cespiti o passaggi tra attività separate' },
  TD27: { label: 'Fattura per autoconsumo o cessioni gratuite', desc: 'Autoconsumo o omaggi senza rivalsa' },
  TD28: { label: 'Acquisti da San Marino con IVA', desc: 'Fattura cartacea con IVA da fornitore di San Marino' },
  // UNCL 1001 / EN 16931 Document Types (UBL & CII)
  '380': { label: 'Fattura Commerciale (Commercial Invoice)', desc: 'Fattura standard europea EN 16931 / Peppol BIS 3.0 / Factur-X' },
  '381': { label: 'Nota di Credito (Credit Note)', desc: 'Nota di credito europea / rettifica a favore del compratore', isCredit: true },
  '384': { label: 'Fattura Rettificata (Corrected Invoice)', desc: 'Rettifica della fattura precedentemente emessa' },
  '389': { label: 'Autofattura (Self-billed Invoice)', desc: 'Fattura emessa dall’acquirente per conto del fornitore' },
  '261': { label: 'Autofattura Nota di Credito', desc: 'Nota di credito emessa dall’acquirente', isCredit: true },
  '751': { label: 'Fattura Informativa (Commercial Invoice)', desc: 'Documento informativo di fatturazione' },
};

export const REGIMI_FISCALI: Record<string, string> = {
  RF01: 'Ordinario',
  RF02: 'Contribuenti minimi (art. 1, c. 96-117, L. 244/2007)',
  RF04: 'Agricoltura e attività connesse e pesca (artt. 34 e 34-bis, DPR 633/1972)',
  RF05: 'Vendita sali e tabacchi (art. 74, c. 1, DPR 633/1972)',
  RF06: 'Commercio dei fiammiferi (art. 74, c. 1, DPR 633/1972)',
  RF07: 'Editoria (art. 74, c. 1, DPR 633/1972)',
  RF08: 'Gestione di servizi di telefonia pubblica (art. 74, c. 1, DPR 633/1972)',
  RF09: 'Rivendita documenti di trasporto e sosta (art. 74, c. 1, DPR 633/1972)',
  RF10: 'Intrattenimenti, giochi e spettacoli (art. 74, c. 6, DPR 633/1972)',
  RF11: 'Agenzie di viaggi e turismo (art. 74-ter, DPR 633/1972)',
  RF12: 'Agriturismo (art. 5, c. 2, L. 413/1991)',
  RF13: 'Vendite a domicilio (art. 25-bis, c. 6, DPR 600/1973)',
  RF14: 'Rivendita beni usati, oggetti d’arte, antiquariato (art. 36, DL 41/1995)',
  RF15: 'Agenzie di vendite all’asta di oggetti d’arte (art. 40-bis, DL 41/1995)',
  RF16: 'Allevamento di animali (art. 34-bis, DPR 633/1972)',
  RF17: 'Attività connesse all’agricoltura (art. 34-bis, DPR 633/1972)',
  RF18: 'Altro regime speciale',
  RF19: 'Regime forfettario (art. 1, c. 54-89, L. 190/2014)',
};

export const MODALITA_PAGAMENTO: Record<string, string> = {
  MP01: 'Contanti',
  MP02: 'Assegno bancario/circolare',
  MP03: 'Assegno circolare',
  MP04: 'Contanti presso Tesoreria',
  MP05: 'Bonifico Bancario / Postale',
  MP06: 'Vaglia cambiario',
  MP07: 'Bollettino bancario',
  MP08: 'Carta di pagamento (Carta di Credito/Debito)',
  MP09: 'RID',
  MP10: 'RID utenze',
  MP11: 'RID veloce',
  MP12: 'RIBA (Ricevuta Bancaria)',
  MP13: 'MAV',
  MP14: 'Quietanza erario',
  MP15: 'Addebito Diretto SEPA / Giroconto',
  MP16: 'Domiciliazione bancaria',
  MP17: 'Domiciliazione postale',
  MP18: 'Bollettino di c/c postale',
  MP19: 'SEPA Direct Debit CORE',
  MP20: 'SEPA Direct Debit B2B',
  MP21: 'Trattenuta su somme già riscosse',
  MP22: 'Trattenuta su provvigioni',
  MP23: 'PagoPA',
  // UNCL 4461 Payment Means (UBL & CII)
  '10': 'Contanti (Cash)',
  '20': 'Assegno (Cheque)',
  '30': 'Bonifico Bancario (Credit Transfer / SEPA)',
  '31': 'Addebito Bancario (Debit Transfer)',
  '42': 'Versamento su conto bancario (Payment to bank account)',
  '48': 'Carta di Credito / Debito (Credit/Debit Card)',
  '49': 'Addebito Diretto (Direct Debit)',
  '57': 'Accordo permanente / Ordine permanente',
  '58': 'Bonifico SEPA (SEPA Credit Transfer)',
  '59': 'Addebito Diretto SEPA (SEPA Direct Debit)',
  '97': 'Compensazione tra partner commerciali (Clearing)',
};

export const CONDIZIONI_PAGAMENTO: Record<string, string> = {
  TP01: 'Pagamento a rate',
  TP02: 'Pagamento completo',
  TP03: 'Anticipo',
};

export const NATURE_IVA: Record<string, string> = {
  N1: 'Escluse ex art. 15 DPR 633/72',
  'N2.1': 'Non soggette ad IVA - adempimenti specifici (artt. da 7 a 7-septies)',
  'N2.2': 'Non soggette - altri casi (es. Regime Forfettario)',
  N2: 'Non soggette ad IVA',
  'N3.1': 'Non imponibili - esportazioni (art. 8, c. 1, lett. a/b)',
  'N3.2': 'Non imponibili - cessioni intracomunitarie (art. 41 DL 331/93)',
  'N3.3': 'Non imponibili - cessioni verso San Marino',
  'N3.4': 'Non imponibili - operazioni assimilate alle esportazioni (art. 8-bis/9)',
  'N3.5': 'Non imponibili - a seguito di dichiarazione di intento',
  'N3.6': 'Non imponibili - altre operazioni che non concorrono alla formazione del plafond',
  N3: 'Non imponibili',
  'N4': 'Esenti (art. 10 DPR 633/72)',
  'N5': 'Regime del margine / IVA non esposta in fattura (DL 41/95)',
  'N6.1': 'Inversione contabile - rottami e altri materiali di recupero',
  'N6.2': 'Inversione contabile - cessione di oro e argento puro',
  'N6.3': 'Inversione contabile - subappalto nel settore edile',
  'N6.4': 'Inversione contabile - cessione di fabbricati',
  'N6.5': 'Inversione contabile - cessione di telefoni cellulari',
  'N6.6': 'Inversione contabile - cessione di prodotti elettronici / microprocessori',
  'N6.7': 'Inversione contabile - prestazioni settore energetico',
  'N6.8': 'Inversione contabile - settore edile e settori connessi',
  'N6.9': 'Inversione contabile - altri casi',
  N6: 'Inversione contabile (reverse charge)',
  'N7': 'IVA assolta in altro stato UE (artt. 40 e 44 DL 331/93)',
  // UNCL 5305 / EN 16931 Duty / Tax / Fee Categories (UBL & CII)
  'S': 'Aliquota Standard (Standard rate)',
  'Z': 'Aliquota Zero (Zero rated goods)',
  'E': 'Esente da Imposta (Exempt from tax)',
  'AE': 'Inversione Contabile (VAT Reverse Charge)',
  'K': 'Operazione Intra-UE (Intra-Community VAT exempt)',
  'G': 'Esente Esportazione (Free export item, tax not charged)',
  'O': 'Fuori Campo IVA (Services outside scope of tax)',
  'L': 'Isole Canarie / Altre giurisdizioni speciali (IGIC/IPSI)',
  'M': 'Tassa per imposte specifiche o di produzione',
};

export const ESIGIBILITA_IVA: Record<string, { label: string; desc: string; badge: string }> = {
  I: { label: 'Immediata', desc: 'IVA ad esigibilità immediata', badge: 'bg-emerald-100 text-emerald-800' },
  D: { label: 'Differita', desc: 'IVA ad esigibilità differita', badge: 'bg-amber-100 text-amber-800' },
  S: { label: 'Split Payment', desc: 'Scissione dei pagamenti (art. 17-ter DPR 633/72)', badge: 'bg-purple-100 text-purple-800' },
};

export const TIPI_CASSA: Record<string, string> = {
  TC01: 'Cassa Nazionale Previdenza e Assistenza Avvocati e Procuratori Legali',
  TC02: 'Cassa Previdenza Dottori Commercialisti',
  TC03: 'Cassa Previdenza e Assistenza Geometri',
  TC04: 'Cassa Nazionale Previdenza e Assistenza Ingegneri e Architetti Liberi Professionisti',
  TC05: 'Cassa Nazionale del Notariato',
  TC06: 'Cassa Nazionale Previdenza e Assistenza Ragionieri e Periti Commerciali',
  TC07: 'Ente Nazionale Assistenza Agenti e Rappresentanti di Commercio (ENASARCO)',
  TC08: 'Ente Nazionale Previdenza e Assistenza Consulenti del Lavoro (ENPACL)',
  TC09: 'Ente Nazionale Previdenza e Assistenza Medici (ENPAM)',
  TC10: 'Ente Nazionale Previdenza e Assistenza Farmacisti (ENPAF)',
  TC11: 'Ente Nazionale Previdenza e Assistenza Veterinari (ENPAV)',
  TC12: 'Ente Nazionale Previdenza e Assistenza Impiegati dell’Agricoltura (ENPAIA)',
  TC13: 'Fondo Previdenza Impiegati Spedizione e Agenzie Marittime',
  TC14: 'Istituto Nazionale Previdenza Giornalisti Italiani (INPGI)',
  TC15: 'Opera Nazionale Assistenza Orfani Sanitari Italiani (ONAOSI)',
  TC16: 'Cassa Autonoma Assistenza Integrativa Giornalisti Italiani (CASAGIT)',
  TC17: 'Ente Previdenza Periti Industriali (EPPI)',
  TC18: 'Ente Previdenza e Assistenza Pluricategoriale (EPAP)',
  TC19: 'Ente Nazionale Previdenza e Assistenza Biologi (ENPAB)',
  TC20: 'Ente Nazionale Previdenza e Assistenza Professione Infermieristica (ENPAPI)',
  TC21: 'Ente Nazionale Previdenza e Assistenza Psicologi (ENPAP)',
  TC22: 'INPS Gestione Separata',
};

export const TIPI_RITENUTA: Record<string, string> = {
  RT01: 'Ritenuta persone fisiche',
  RT02: 'Ritenuta persone giuridiche',
  RT03: 'Contributo INPS',
  RT04: 'Contributo ENASARCO',
  RT05: 'Contributo ENPAM',
  RT06: 'Altro contributo previdenziale',
};

export function getTipoDocumentoInfo(code?: string) {
  if (!code) return { label: 'Documento', desc: '', isCredit: false };
  return TIPI_DOCUMENTO[code] || { label: code, desc: '', isCredit: false };
}

export function getRegimeFiscaleDesc(code?: string): string {
  if (!code) return 'Non specificato';
  return REGIMI_FISCALI[code] ? `${code} - ${REGIMI_FISCALI[code]}` : code;
}

export function getModalitaPagamentoDesc(code?: string): string {
  if (!code) return 'Non specificata';
  return MODALITA_PAGAMENTO[code] ? `${code} - ${MODALITA_PAGAMENTO[code]}` : code;
}

export function getCondizioniPagamentoDesc(code?: string): string {
  if (!code) return '';
  return CONDIZIONI_PAGAMENTO[code] ? `${code} - ${CONDIZIONI_PAGAMENTO[code]}` : code;
}

export function getNaturaIvaDesc(code?: string): string {
  if (!code) return '';
  return NATURE_IVA[code] ? `${code} (${NATURE_IVA[code]})` : code;
}

export function getEsigibilitaIvaInfo(code?: string) {
  if (!code) return null;
  return ESIGIBILITA_IVA[code] || { label: code, desc: code, badge: 'bg-slate-100 text-slate-800' };
}

export function formatCurrency(amount?: number, currency = 'EUR'): string {
  if (amount === undefined || isNaN(amount)) return '0,00 €';
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: currency || 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(amount);
}

export function formatDate(dateString?: string): string {
  if (!dateString) return '-';
  try {
    const parts = dateString.split('T')[0]?.split('-');
    if (parts && parts.length === 3 && parts[0] && parts[1] && parts[2]) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('it-IT');
  } catch {
    return dateString;
  }
}
