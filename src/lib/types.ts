export interface Anagrafica {
  denominazione?: string;
  nome?: string;
  cognome?: string;
  titolo?: string;
  codEORI?: string;
}

export interface IdFiscale {
  idPaese: string;
  idCodice: string;
}

export interface Sede {
  indirizzo: string;
  numeroCivico?: string;
  cap: string;
  comune: string;
  provincia?: string;
  nazione: string;
}

export interface Contatti {
  telefono?: string;
  fax?: string;
  email?: string;
}

export interface IscrizioneREA {
  ufficio?: string;
  numeroREA?: string;
  capitaleSociale?: string;
  socioUnico?: string;
  statoLiquidazione?: string;
}

export interface CedentePrestatore {
  datiAnagrafici: {
    idFiscaleIVA?: IdFiscale;
    codiceFiscale?: string;
    anagrafica: Anagrafica;
    alboProfessionale?: string;
    provinciaAlbo?: string;
    numeroIscrizioneAlbo?: string;
    dataIscrizioneAlbo?: string;
    regimeFiscale?: string;
  };
  sede: Sede;
  stabileOrganizzazione?: Sede;
  contatti?: Contatti;
  iscrizioneREA?: IscrizioneREA;
}

export interface CessionarioCommittente {
  datiAnagrafici: {
    idFiscaleIVA?: IdFiscale;
    codiceFiscale?: string;
    anagrafica: Anagrafica;
  };
  sede: Sede;
  stabileOrganizzazione?: Sede;
  rappresentanteFiscale?: {
    idFiscaleIVA?: IdFiscale;
    anagrafica?: Anagrafica;
  };
}

export interface DatiTrasmissione {
  idTrasmittente?: IdFiscale;
  progressivoInvio?: string;
  formatoTrasmissione?: string;
  codiceDestinatario?: string;
  pecDestinatario?: string;
  contattiTrasmittente?: Contatti;
}

export interface ScontoMaggiorazione {
  tipo: 'SC' | 'MG' | string;
  percentuale?: number;
  importo?: number;
}

export interface CodiceArticolo {
  codiceTipo: string;
  codiceValore: string;
}

export interface AltriDatiGestionali {
  tipoDato: string;
  riferimentoTesto?: string;
  riferimentoNumero?: number;
  riferimentoData?: string;
}

export interface DettaglioLinea {
  numeroLinea: number;
  tipoCessionePrestazione?: string;
  codiciArticolo?: CodiceArticolo[];
  descrizione: string;
  quantita?: number;
  unitaMisura?: string;
  dataInizioPeriodo?: string;
  dataFinePeriodo?: string;
  prezzoUnitario: number;
  scontiMaggiorazioni?: ScontoMaggiorazione[];
  prezzoTotale: number;
  aliquotaIVA: number;
  ritenuta?: string;
  natura?: string;
  riferimentoAmministrazione?: string;
  altriDatiGestionali?: AltriDatiGestionali[];
}

export interface DatiRiepilogoIVA {
  aliquotaIVA: number;
  natura?: string;
  speseAccessorie?: number;
  arrotondamento?: number;
  imponibileImporto: number;
  imposta: number;
  esigibilitaIVA?: 'I' | 'D' | 'S' | string;
  riferimentoNormativo?: string;
}

export interface DettaglioPagamento {
  beneficiario?: string;
  modalitaPagamento: string;
  dataRiferimentoTerminiPagamento?: string;
  giorniTerminiPagamento?: number;
  dataScadenzaPagamento?: string;
  importoPagamento: number;
  codiceIBAN?: string;
  codiceABI?: string;
  codiceCAB?: string;
  codiceBIC?: string;
  istitutoFinanziario?: string;
  scontoPagamentoAnticipato?: number;
  dataLimitePagamentoAnticipato?: string;
}

export interface DatiPagamento {
  condizioniPagamento: string;
  dettagliPagamento: DettaglioPagamento[];
}

export interface DatiRitenuta {
  tipoRitenuta: string;
  importoRitenuta: number;
  aliquotaRitenuta: number;
  causalePagamento?: string;
}

export interface DatiBollo {
  bolloVirtuale?: string;
  importoBollo?: number;
}

export interface DatiCassaPrevidenziale {
  tipoCassa: string;
  aliquotaIVA: number;
  importoContributoCassa: number;
  imponibileCassa?: number;
  aliquotaCassa?: number;
  ritenuta?: string;
  natura?: string;
}

export interface DocumentoCorrelato {
  riferimentoNumeroLinea?: number[];
  idDocumento: string;
  data?: string;
  numItem?: string;
  codiceCommessaConvenzione?: string;
  codiceCUP?: string;
  codiceCIG?: string;
}

export interface DatiDDT {
  numeroDDT: string;
  dataDDT: string;
  riferimentoNumeroLinea?: number[];
}

export interface DatiGeneraliDocumento {
  tipoDocumento: string;
  divisa: string;
  data: string;
  numero: string;
  datiRitenuta?: DatiRitenuta[];
  datiBollo?: DatiBollo;
  datiCassaPrevidenziale?: DatiCassaPrevidenziale[];
  scontoMaggiorazione?: ScontoMaggiorazione[];
  importoTotaleDocumento?: number;
  arrotondamento?: number;
  causale?: string[];
  art73?: string;
}

export interface DatiBeniServizi {
  dettaglioLinee: DettaglioLinea[];
  datiRiepilogo: DatiRiepilogoIVA[];
}

export interface Allegato {
  nomeAttachment: string;
  algoritmoCompressione?: string;
  formatoAttachment?: string;
  descrizioneAttachment?: string;
  attachment: string; // Base64
  dimensioneBytes?: number;
}

export interface FatturaBody {
  datiGenerali: {
    datiGeneraliDocumento: DatiGeneraliDocumento;
    datiOrdineAcquisto?: DocumentoCorrelato[];
    datiContratto?: DocumentoCorrelato[];
    datiConvenzione?: DocumentoCorrelato[];
    datiRicezione?: DocumentoCorrelato[];
    datiFattureCollegate?: DocumentoCorrelato[];
    datiSAL?: { riferimentoFase: number }[];
    datiDDT?: DatiDDT[];
    datiTrasporto?: {
      datiAnagraficiVettore?: {
        idFiscaleIVA?: IdFiscale;
        anagrafica?: Anagrafica;
      };
      mezzoTrasporto?: string;
      causaleTrasporto?: string;
      numeroColli?: number;
      descrizione?: string;
      unitaMisuraPeso?: string;
      pesoLordo?: number;
      pesoNetto?: number;
      dataOraRitiro?: string;
      dataInizioTrasporto?: string;
      tipoResa?: string;
    };
  };
  datiBeniServizi: DatiBeniServizi;
  datiPagamento?: DatiPagamento[];
  allegati?: Allegato[];
}

export interface FatturaElettronica {
  versione: string;
  sistemaEmittente?: string;
  header: {
    datiTrasmissione: DatiTrasmissione;
    cedentePrestatore: CedentePrestatore;
    rappresentanteFiscale?: {
      datiAnagrafici?: {
        idFiscaleIVA?: IdFiscale;
        anagrafica?: Anagrafica;
      };
    };
    cessionarioCommittente: CessionarioCommittente;
    terzoIntermediarioOSoggettoEmittente?: {
      datiAnagrafici?: {
        idFiscaleIVA?: IdFiscale;
        codiceFiscale?: string;
        anagrafica?: Anagrafica;
      };
    };
    soggettoEmittente?: string;
  };
  body: FatturaBody[];
  rawXml?: string;
  fileName?: string;
}
