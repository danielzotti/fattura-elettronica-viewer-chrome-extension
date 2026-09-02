export interface SampleInvoiceItem {
  id: string;
  name: string;
  subtitle: string;
  xml: string;
}

export const SAMPLE_INVOICE_COMMERCIAL = `<?xml version="1.0" encoding="UTF-8"?>
<p:FatturaElettronica versione="FPR12" xmlns:p="http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2">
  <FatturaElettronicaHeader>
    <DatiTrasmissione>
      <IdTrasmittente>
        <IdPaese>IT</IdPaese>
        <IdCodice>01234567890</IdCodice>
      </IdTrasmittente>
      <ProgressivoInvio>2026-0042</ProgressivoInvio>
      <FormatoTrasmissione>FPR12</FormatoTrasmissione>
      <CodiceDestinatario>M5UXCR1</CodiceDestinatario>
    </DatiTrasmissione>
    <CedentePrestatore>
      <DatiAnagrafici>
        <IdFiscaleIVA>
          <IdPaese>IT</IdPaese>
          <IdCodice>01234567890</IdCodice>
        </IdFiscaleIVA>
        <CodiceFiscale>01234567890</CodiceFiscale>
        <Anagrafica>
          <Denominazione>ACME CLOUD SOLUTIONS S.R.L.</Denominazione>
        </Anagrafica>
        <RegimeFiscale>RF01</RegimeFiscale>
      </DatiAnagrafici>
      <Sede>
        <Indirizzo>Corso Vittorio Emanuele II, 120</Indirizzo>
        <CAP>00186</CAP>
        <Comune>ROMA</Comune>
        <Provincia>RM</Provincia>
        <Nazione>IT</Nazione>
      </Sede>
      <Contatti>
        <Telefono>+39 06 9876543</Telefono>
        <Email>amministrazione@acmecloud.it</Email>
      </Contatti>
      <IscrizioneREA>
        <Ufficio>RM</Ufficio>
        <NumeroREA>1234567</NumeroREA>
        <CapitaleSociale>50000.00</CapitaleSociale>
        <SocioUnico>SM</SocioUnico>
        <StatoLiquidazione>LN</StatoLiquidazione>
      </IscrizioneREA>
    </CedentePrestatore>
    <CessionarioCommittente>
      <DatiAnagrafici>
        <IdFiscaleIVA>
          <IdPaese>IT</IdPaese>
          <IdCodice>09876543210</IdCodice>
        </IdFiscaleIVA>
        <CodiceFiscale>09876543210</CodiceFiscale>
        <Anagrafica>
          <Denominazione>NEXUS TECH INNOVATIONS S.P.A.</Denominazione>
        </Anagrafica>
      </DatiAnagrafici>
      <Sede>
        <Indirizzo>Via Dante Alighieri, 45</Indirizzo>
        <CAP>10121</CAP>
        <Comune>TORINO</Comune>
        <Provincia>TO</Provincia>
        <Nazione>IT</Nazione>
      </Sede>
    </CessionarioCommittente>
  </FatturaElettronicaHeader>
  <FatturaElettronicaBody>
    <DatiGenerali>
      <DatiGeneraliDocumento>
        <TipoDocumento>TD01</TipoDocumento>
        <Divisa>EUR</Divisa>
        <Data>2026-09-02</Data>
        <Numero>FT-2026/894</Numero>
        <ImportoTotaleDocumento>3538.00</ImportoTotaleDocumento>
        <Causale>Fornitura servizi infrastruttura cloud e consulenza sistemistica Q3 2026</Causale>
        <Causale>Rif. Ordine d'acquisto PO-2026-789</Causale>
      </DatiGeneraliDocumento>
      <DatiOrdineAcquisto>
        <IdDocumento>PO-2026-789</IdDocumento>
        <Data>2026-08-15</Data>
        <CodiceCIG>Z123456789</CodiceCIG>
      </DatiOrdineAcquisto>
    </DatiGenerali>
    <DatiBeniServizi>
      <DettaglioLinee>
        <NumeroLinea>1</NumeroLinea>
        <CodiceArticolo>
          <CodiceTipo>SKU</CodiceTipo>
          <CodiceValore>KUBE-ENT-01</CodiceValore>
        </CodiceArticolo>
        <Descrizione>Cluster Kubernetes Dedicato High-Availability (3 Nodi Master + 6 Worker)</Descrizione>
        <Quantita>1.00</Quantita>
        <UnitaMisura>Mese</UnitaMisura>
        <PrezzoUnitario>1800.00</PrezzoUnitario>
        <PrezzoTotale>1800.00</PrezzoTotale>
        <AliquotaIVA>22.00</AliquotaIVA>
      </DettaglioLinee>
      <DettaglioLinee>
        <NumeroLinea>2</NumeroLinea>
        <CodiceArticolo>
          <CodiceTipo>SKU</CodiceTipo>
          <CodiceValore>STORAGE-NVME-TB</CodiceValore>
        </CodiceArticolo>
        <Descrizione>Storage NVMe Enterprise Ridondato - 4TB</Descrizione>
        <Quantita>4.00</Quantita>
        <UnitaMisura>TB</UnitaMisura>
        <PrezzoUnitario>150.00</PrezzoUnitario>
        <ScontoMaggiorazione>
          <Tipo>SC</Tipo>
          <Percentuale>10.00</Percentuale>
        </ScontoMaggiorazione>
        <PrezzoTotale>540.00</PrezzoTotale>
        <AliquotaIVA>22.00</AliquotaIVA>
      </DettaglioLinee>
      <DettaglioLinee>
        <NumeroLinea>3</NumeroLinea>
        <CodiceArticolo>
          <CodiceTipo>SKU</CodiceTipo>
          <CodiceValore>CONS-DEV-SR</CodiceValore>
        </CodiceArticolo>
        <Descrizione>Consulenza Architettura Cloud &amp; CI/CD Pipeline Automation</Descrizione>
        <Quantita>7.00</Quantita>
        <UnitaMisura>Ore</UnitaMisura>
        <PrezzoUnitario>80.00</PrezzoUnitario>
        <PrezzoTotale>560.00</PrezzoTotale>
        <AliquotaIVA>22.00</AliquotaIVA>
      </DettaglioLinee>
      <DatiRiepilogo>
        <AliquotaIVA>22.00</AliquotaIVA>
        <ImponibileImporto>2900.00</ImponibileImporto>
        <Imposta>638.00</Imposta>
        <EsigibilitaIVA>I</EsigibilitaIVA>
      </DatiRiepilogo>
    </DatiBeniServizi>
    <DatiPagamento>
      <CondizioniPagamento>TP02</CondizioniPagamento>
      <DettaglioPagamento>
        <Beneficiario>ACME CLOUD SOLUTIONS S.R.L.</Beneficiario>
        <ModalitaPagamento>MP05</ModalitaPagamento>
        <DataScadenzaPagamento>2026-10-02</DataScadenzaPagamento>
        <ImportoPagamento>3538.00</ImportoPagamento>
        <IBAN>IT60X0542811101000000123456</IBAN>
        <IstitutoFinanziario>Banca Intesa Sanpaolo</IstitutoFinanziario>
        <BIC>BCITITMM</BIC>
      </DettaglioPagamento>
    </DatiPagamento>
  </FatturaElettronicaBody>
</p:FatturaElettronica>`;

export const SAMPLE_INVOICE_PROFESSIONAL = `<?xml version="1.0" encoding="UTF-8"?>
<p:FatturaElettronica versione="FPR12" xmlns:p="http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2">
  <FatturaElettronicaHeader>
    <DatiTrasmissione>
      <IdTrasmittente>
        <IdPaese>IT</IdPaese>
        <IdCodice>09998887771</IdCodice>
      </IdTrasmittente>
      <ProgressivoInvio>PRO-2026-001</ProgressivoInvio>
      <FormatoTrasmissione>FPR12</FormatoTrasmissione>
      <CodiceDestinatario>SUBM70N</CodiceDestinatario>
    </DatiTrasmissione>
    <CedentePrestatore>
      <DatiAnagrafici>
        <IdFiscaleIVA>
          <IdPaese>IT</IdPaese>
          <IdCodice>09998887771</IdCodice>
        </IdFiscaleIVA>
        <CodiceFiscale>RSSMRA80A01H501U</CodiceFiscale>
        <Anagrafica>
          <Nome>Mario</Nome>
          <Cognome>Rossi</Cognome>
          <Titolo>Ing.</Titolo>
        </Anagrafica>
        <AlboProfessionale>Ordine degli Ingegneri della Provincia di Milano</AlboProfessionale>
        <ProvinciaAlbo>MI</ProvinciaAlbo>
        <NumeroIscrizioneAlbo>12345/A</NumeroIscrizioneAlbo>
        <RegimeFiscale>RF01</RegimeFiscale>
      </DatiAnagrafici>
      <Sede>
        <Indirizzo>Via Manzoni, 12</Indirizzo>
        <CAP>20121</CAP>
        <Comune>MILANO</Comune>
        <Provincia>MI</Provincia>
        <Nazione>IT</Nazione>
      </Sede>
      <Contatti>
        <Email>mario.rossi@ingegneri-mi.it</Email>
        <Telefono>+39 02 87654321</Telefono>
      </Contatti>
    </CedentePrestatore>
    <CessionarioCommittente>
      <DatiAnagrafici>
        <IdFiscaleIVA>
          <IdPaese>IT</IdPaese>
          <IdCodice>04443332221</IdCodice>
        </IdFiscaleIVA>
        <Anagrafica>
          <Denominazione>COSTRUZIONI &amp; PROGETTI S.P.A.</Denominazione>
        </Anagrafica>
      </DatiAnagrafici>
      <Sede>
        <Indirizzo>Via Emilia Ponente, 80</Indirizzo>
        <CAP>40133</CAP>
        <Comune>BOLOGNA</Comune>
        <Provincia>BO</Provincia>
        <Nazione>IT</Nazione>
      </Sede>
    </CessionarioCommittente>
  </FatturaElettronicaHeader>
  <FatturaElettronicaBody>
    <DatiGenerali>
      <DatiGeneraliDocumento>
        <TipoDocumento>TD06</TipoDocumento>
        <Divisa>EUR</Divisa>
        <Data>2026-09-02</Data>
        <Numero>PAR-2026/18</Numero>
        <DatiRitenuta>
          <TipoRitenuta>RT01</TipoRitenuta>
          <ImportoRitenuta>500.00</ImportoRitenuta>
          <AliquotaRitenuta>20.00</AliquotaRitenuta>
          <CausalePagamento>A</CausalePagamento>
        </DatiRitenuta>
        <DatiBollo>
          <BolloVirtuale>SI</BolloVirtuale>
          <ImportoBollo>2.00</ImportoBollo>
        </DatiBollo>
        <DatiCassaPrevidenziale>
          <TipoCassa>TC04</TipoCassa>
          <AliquotaIVA>22.00</AliquotaIVA>
          <ImportoContributoCassa>100.00</ImportoContributoCassa>
          <ImponibileCassa>2500.00</ImponibileCassa>
          <AliquotaCassa>4.00</AliquotaCassa>
        </DatiCassaPrevidenziale>
        <ImportoTotaleDocumento>3174.00</ImportoTotaleDocumento>
        <Causale>Parcella per prestazioni professionali collaudo statico e direzione lavori cantiere A2</Causale>
      </DatiGeneraliDocumento>
    </DatiGenerali>
    <DatiBeniServizi>
      <DettaglioLinee>
        <NumeroLinea>1</NumeroLinea>
        <Descrizione>Onorario professionale per direzione lavori e coordinamento sicurezza in fase di esecuzione</Descrizione>
        <Quantita>1.00</Quantita>
        <PrezzoUnitario>2500.00</PrezzoUnitario>
        <PrezzoTotale>2500.00</PrezzoTotale>
        <AliquotaIVA>22.00</AliquotaIVA>
        <Ritenuta>SI</Ritenuta>
      </DettaglioLinee>
      <DatiRiepilogo>
        <AliquotaIVA>22.00</AliquotaIVA>
        <ImponibileImporto>2600.00</ImponibileImporto>
        <Imposta>572.00</Imposta>
        <EsigibilitaIVA>I</EsigibilitaIVA>
      </DatiRiepilogo>
      <DatiRiepilogo>
        <AliquotaIVA>0.00</AliquotaIVA>
        <Natura>N1</Natura>
        <ImponibileImporto>2.00</ImponibileImporto>
        <Imposta>0.00</Imposta>
        <RiferimentoNormativo>Bollo virtuale ex art. 15 DPR 633/72</RiferimentoNormativo>
      </DatiRiepilogo>
    </DatiBeniServizi>
    <DatiPagamento>
      <CondizioniPagamento>TP02</CondizioniPagamento>
      <DettaglioPagamento>
        <Beneficiario>Ing. Mario Rossi</Beneficiario>
        <ModalitaPagamento>MP05</ModalitaPagamento>
        <DataScadenzaPagamento>2026-09-30</DataScadenzaPagamento>
        <ImportoPagamento>2674.00</ImportoPagamento>
        <IBAN>IT02L1234567890123456789012</IBAN>
        <IstitutoFinanziario>UniCredit S.p.A.</IstitutoFinanziario>
      </DettaglioPagamento>
    </DatiPagamento>
  </FatturaElettronicaBody>
</p:FatturaElettronica>`;

export const SAMPLE_INVOICE_PA = `<?xml version="1.0" encoding="UTF-8"?>
<p:FatturaElettronica versione="FPA12" xmlns:p="http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2">
  <FatturaElettronicaHeader>
    <DatiTrasmissione>
      <IdTrasmittente>
        <IdPaese>IT</IdPaese>
        <IdCodice>05554443332</IdCodice>
      </IdTrasmittente>
      <ProgressivoInvio>PA-2026-105</ProgressivoInvio>
      <FormatoTrasmissione>FPA12</FormatoTrasmissione>
      <CodiceDestinatario>UF6Z5Q</CodiceDestinatario>
    </DatiTrasmissione>
    <CedentePrestatore>
      <DatiAnagrafici>
        <IdFiscaleIVA>
          <IdPaese>IT</IdPaese>
          <IdCodice>05554443332</IdCodice>
        </IdFiscaleIVA>
        <CodiceFiscale>05554443332</CodiceFiscale>
        <Anagrafica>
          <Denominazione>DIGITAL PUBLIC SOLUTIONS S.R.L.</Denominazione>
        </Anagrafica>
        <RegimeFiscale>RF01</RegimeFiscale>
      </DatiAnagrafici>
      <Sede>
        <Indirizzo>Piazza Castello, 15</Indirizzo>
        <CAP>20121</CAP>
        <Comune>MILANO</Comune>
        <Provincia>MI</Provincia>
        <Nazione>IT</Nazione>
      </Sede>
      <Contatti>
        <Telefono>+39 02 11223344</Telefono>
        <Email>pa@digitalpublic.it</Email>
      </Contatti>
    </CedentePrestatore>
    <CessionarioCommittente>
      <DatiAnagrafici>
        <CodiceFiscale>80012340150</CodiceFiscale>
        <Anagrafica>
          <Denominazione>COMUNE DI ESEMPIO - AREA SERVIZI INFORMATICI</Denominazione>
        </Anagrafica>
      </DatiAnagrafici>
      <Sede>
        <Indirizzo>Piazza del Municipio, 1</Indirizzo>
        <CAP>20100</CAP>
        <Comune>MILANO</Comune>
        <Provincia>MI</Provincia>
        <Nazione>IT</Nazione>
      </Sede>
    </CessionarioCommittente>
  </FatturaElettronicaHeader>
  <FatturaElettronicaBody>
    <DatiGenerali>
      <DatiGeneraliDocumento>
        <TipoDocumento>TD01</TipoDocumento>
        <Divisa>EUR</Divisa>
        <Data>2026-09-02</Data>
        <Numero>FPA-2026/088</Numero>
        <ImportoTotaleDocumento>6100.00</ImportoTotaleDocumento>
        <Causale>Fornitura licenze software per portale servizi al cittadino - Determina n. 432/2026</Causale>
      </DatiGeneraliDocumento>
      <DatiOrdineAcquisto>
        <IdDocumento>DET-432-2026</IdDocumento>
        <Data>2026-07-20</Data>
        <CodiceCUP>B41B26000100001</CodiceCUP>
        <CodiceCIG>987654321A</CodiceCIG>
      </DatiOrdineAcquisto>
      <DatiContratto>
        <IdDocumento>CONTR-2026-PA</IdDocumento>
        <Data>2026-08-01</Data>
        <CodiceCIG>987654321A</CodiceCIG>
      </DatiContratto>
    </DatiGenerali>
    <DatiBeniServizi>
      <DettaglioLinee>
        <NumeroLinea>1</NumeroLinea>
        <CodiceArticolo>
          <CodiceTipo>CPV</CodiceTipo>
          <CodiceValore>72268000-1</CodiceValore>
        </CodiceArticolo>
        <Descrizione>Canone annuale piattaforma web per la digitalizzazione dei procedimenti amministrativi</Descrizione>
        <Quantita>1.00</Quantita>
        <UnitaMisura>Anno</UnitaMisura>
        <PrezzoUnitario>5000.00</PrezzoUnitario>
        <PrezzoTotale>5000.00</PrezzoTotale>
        <AliquotaIVA>22.00</AliquotaIVA>
      </DettaglioLinee>
      <DatiRiepilogo>
        <AliquotaIVA>22.00</AliquotaIVA>
        <ImponibileImporto>5000.00</ImponibileImporto>
        <Imposta>1100.00</Imposta>
        <EsigibilitaIVA>S</EsigibilitaIVA>
        <RiferimentoNormativo>Scissione dei pagamenti (Split Payment) ex art. 17-ter DPR 633/72</RiferimentoNormativo>
      </DatiRiepilogo>
    </DatiBeniServizi>
    <DatiPagamento>
      <CondizioniPagamento>TP02</CondizioniPagamento>
      <DettaglioPagamento>
        <Beneficiario>DIGITAL PUBLIC SOLUTIONS S.R.L.</Beneficiario>
        <ModalitaPagamento>MP05</ModalitaPagamento>
        <DataScadenzaPagamento>2026-10-31</DataScadenzaPagamento>
        <ImportoPagamento>5000.00</ImportoPagamento>
        <IBAN>IT88N0306909606100000012345</IBAN>
        <IstitutoFinanziario>Banca Nazionale del Lavoro</IstitutoFinanziario>
      </DettaglioPagamento>
    </DatiPagamento>
  </FatturaElettronicaBody>
</p:FatturaElettronica>`;

export const SAMPLES: SampleInvoiceItem[] = [
  {
    id: 'commercial-sample',
    name: 'Fattura Commerciale B2B (Acme Cloud → Nexus Tech)',
    subtitle: 'Fattura con sconti a riga, CIG, molteplici articoli e IBAN',
    xml: SAMPLE_INVOICE_COMMERCIAL,
  },
  {
    id: 'professional-sample',
    name: 'Parcella Professionale (Ing. Mario Rossi)',
    subtitle: 'Parcella con Ritenuta d’acconto 20%, Cassa Ingegneri 4% e Bollo',
    xml: SAMPLE_INVOICE_PROFESSIONAL,
  },
  {
    id: 'pa-sample',
    name: 'Fattura PA Split Payment (Ente Pubblico)',
    subtitle: 'Formato FPA12 con Scissione Pagamenti ex art. 17-ter, CUP e CIG',
    xml: SAMPLE_INVOICE_PA,
  },
];
