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

export const SAMPLE_INVOICE_UBL_PEPPOL = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0</cbc:CustomizationID>
  <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
  <cbc:ID>PEPPOL-2026-904</cbc:ID>
  <cbc:IssueDate>2026-09-02</cbc:IssueDate>
  <cbc:DueDate>2026-10-02</cbc:DueDate>
  <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
  <cbc:Note>Fornitura licenze cloud SaaS per gestione documentale europea Peppol</cbc:Note>
  <cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>
  <cbc:BuyerReference>REF-EU-4458</cbc:BuyerReference>
  <cac:OrderReference>
    <cbc:ID>PO-EUROPE-2026</cbc:ID>
  </cac:OrderReference>
  <cac:ContractDocumentReference>
    <cbc:ID>CONTR-PEPPOL-01</cbc:ID>
  </cac:ContractDocumentReference>
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cbc:EndpointID schemeID="0088">7300010000001</cbc:EndpointID>
      <cac:PartyName>
        <cbc:Name>EURO CLOUD NETWORKS B.V.</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>Keizersgracht 421</cbc:StreetName>
        <cbc:CityName>Amsterdam</cbc:CityName>
        <cbc:PostalZone>1016 EK</cbc:PostalZone>
        <cac:Country>
          <cbc:IdentificationCode>NL</cbc:IdentificationCode>
        </cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>NL856473829B01</cbc:CompanyID>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>EURO CLOUD NETWORKS B.V.</cbc:RegistrationName>
        <cbc:CompanyID>54981234</cbc:CompanyID>
      </cac:PartyLegalEntity>
      <cac:Contact>
        <cbc:Name>Billing Department</cbc:Name>
        <cbc:Telephone>+31 20 1234567</cbc:Telephone>
        <cbc:ElectronicMail>billing@eurocloudnetworks.nl</cbc:ElectronicMail>
      </cac:Contact>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty>
    <cac:Party>
      <cbc:EndpointID schemeID="0208">09876543210</cbc:EndpointID>
      <cac:PartyName>
        <cbc:Name>GLOBAL LOGISTICS ITALIA S.R.L.</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>Via Dante 14</cbc:StreetName>
        <cbc:CityName>Milano</cbc:CityName>
        <cbc:PostalZone>20121</cbc:PostalZone>
        <cac:Country>
          <cbc:IdentificationCode>IT</cbc:IdentificationCode>
        </cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>IT09876543210</cbc:CompanyID>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>GLOBAL LOGISTICS ITALIA S.R.L.</cbc:RegistrationName>
        <cbc:CompanyID>09876543210</cbc:CompanyID>
      </cac:PartyLegalEntity>
      <cac:Contact>
        <cbc:Name>Ufficio Acquisti</cbc:Name>
        <cbc:Telephone>+39 02 76543210</cbc:Telephone>
        <cbc:ElectronicMail>procurement@globallogistics.it</cbc:ElectronicMail>
      </cac:Contact>
    </cac:Party>
  </cac:AccountingCustomerParty>
  <cac:PaymentMeans>
    <cbc:PaymentMeansCode>58</cbc:PaymentMeansCode>
    <cbc:PaymentID>PEPPOL-2026-904</cbc:PaymentID>
    <cac:PayeeFinancialAccount>
      <cbc:ID>NL91ABNA0417164300</cbc:ID>
      <cbc:Name>EURO CLOUD NETWORKS B.V.</cbc:Name>
      <cac:FinancialInstitutionBranch>
        <cbc:ID>ABNANL2A</cbc:ID>
      </cac:FinancialInstitutionBranch>
    </cac:PayeeFinancialAccount>
  </cac:PaymentMeans>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="EUR">462.00</cbc:TaxAmount>
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="EUR">2100.00</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="EUR">462.00</cbc:TaxAmount>
      <cac:TaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>22.00</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>
  </cac:TaxTotal>
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="EUR">2100.00</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="EUR">2100.00</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="EUR">2562.00</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="EUR">2562.00</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
  <cac:InvoiceLine>
    <cbc:ID>1</cbc:ID>
    <cbc:InvoicedQuantity unitCode="EA">1.00</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="EUR">1500.00</cbc:LineExtensionAmount>
    <cac:Item>
      <cbc:Description>Enterprise Cloud Gateway Peppol Access Point Subscription (Annual)</cbc:Description>
      <cbc:Name>Peppol AP Subscription</cbc:Name>
      <cac:SellersItemIdentification>
        <cbc:ID>PEPPOL-AP-ENT</cbc:ID>
      </cac:SellersItemIdentification>
      <cac:ClassifiedTaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>22.00</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="EUR">1500.00</cbc:PriceAmount>
    </cac:Price>
  </cac:InvoiceLine>
  <cac:InvoiceLine>
    <cbc:ID>2</cbc:ID>
    <cbc:InvoicedQuantity unitCode="HUR">6.00</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="EUR">600.00</cbc:LineExtensionAmount>
    <cac:Item>
      <cbc:Description>Onboarding &amp; Integration Consulting Services</cbc:Description>
      <cbc:Name>Integration Consulting</cbc:Name>
      <cac:SellersItemIdentification>
        <cbc:ID>SRV-INT-HR</cbc:ID>
      </cac:SellersItemIdentification>
      <cac:ClassifiedTaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>22.00</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="EUR">100.00</cbc:PriceAmount>
    </cac:Price>
  </cac:InvoiceLine>
</Invoice>`;

export const SAMPLE_INVOICE_CII_FACTURX = `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"
                          xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"
                          xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100"
                          xmlns:qdt="urn:un:unece:uncefact:data:standard:QualifiedDataType:100">
  <rsm:ExchangedDocumentContext>
    <ram:GuidelineSpecifiedDocumentContextParameter>
      <ram:ID>urn:cen.eu:en16931:2017#conformant#urn:factur-x.eu:1p0:extended</ram:ID>
    </ram:GuidelineSpecifiedDocumentContextParameter>
  </rsm:ExchangedDocumentContext>
  <rsm:ExchangedDocument>
    <ram:ID>FX-2026-789</ram:ID>
    <ram:TypeCode>380</ram:TypeCode>
    <ram:IssueDateTime>
      <udt:DateTimeString format="102">20260902</udt:DateTimeString>
    </ram:IssueDateTime>
    <ram:IncludedNote>
      <ram:Content>Fattura elettronica formato ibrido Factur-X / ZUGFeRD - Profilo EN 16931 Extended</ram:Content>
    </ram:IncludedNote>
  </rsm:ExchangedDocument>
  <rsm:SupplyChainTradeTransaction>
    <ram:IncludedSupplyChainTradeLineItem>
      <ram:AssociatedDocumentLineDocument>
        <ram:LineID>1</ram:LineID>
      </ram:AssociatedDocumentLineDocument>
      <ram:SpecifiedTradeProduct>
        <ram:SellerAssignedID>IND-IOT-GW</ram:SellerAssignedID>
        <ram:Name>Industrial IoT Gateway Modbus/MQTT</ram:Name>
        <ram:Description>Gateway industriale per telemetria energetica e monitoraggio sensori 4.0</ram:Description>
      </ram:SpecifiedTradeProduct>
      <ram:SpecifiedLineTradeAgreement>
        <ram:NetPriceProductTradePrice>
          <ram:ChargeAmount>450.00</ram:ChargeAmount>
        </ram:NetPriceProductTradePrice>
      </ram:SpecifiedLineTradeAgreement>
      <ram:SpecifiedLineTradeDelivery>
        <ram:BilledQuantity unitCode="C62">2.00</ram:BilledQuantity>
      </ram:SpecifiedLineTradeDelivery>
      <ram:SpecifiedLineTradeSettlement>
        <ram:ApplicableTradeTax>
          <ram:TypeCode>VAT</ram:TypeCode>
          <ram:CategoryCode>S</ram:CategoryCode>
          <ram:RateApplicablePercent>20.00</ram:RateApplicablePercent>
        </ram:ApplicableTradeTax>
        <ram:SpecifiedTradeSettlementLineMonetarySummation>
          <ram:LineTotalAmount>900.00</ram:LineTotalAmount>
        </ram:SpecifiedTradeSettlementLineMonetarySummation>
      </ram:SpecifiedLineTradeSettlement>
    </ram:IncludedSupplyChainTradeLineItem>
    <ram:IncludedSupplyChainTradeLineItem>
      <ram:AssociatedDocumentLineDocument>
        <ram:LineID>2</ram:LineID>
      </ram:AssociatedDocumentLineDocument>
      <ram:SpecifiedTradeProduct>
        <ram:SellerAssignedID>SEN-TEMP-PRO</ram:SellerAssignedID>
        <ram:Name>Sonda Termica Industriale IP68</ram:Name>
        <ram:Description>Sensore di temperatura PT100 ad alta precisione</ram:Description>
      </ram:SpecifiedTradeProduct>
      <ram:SpecifiedLineTradeAgreement>
        <ram:NetPriceProductTradePrice>
          <ram:ChargeAmount>75.00</ram:ChargeAmount>
        </ram:NetPriceProductTradePrice>
      </ram:SpecifiedLineTradeAgreement>
      <ram:SpecifiedLineTradeDelivery>
        <ram:BilledQuantity unitCode="C62">4.00</ram:BilledQuantity>
      </ram:SpecifiedLineTradeDelivery>
      <ram:SpecifiedLineTradeSettlement>
        <ram:ApplicableTradeTax>
          <ram:TypeCode>VAT</ram:TypeCode>
          <ram:CategoryCode>S</ram:CategoryCode>
          <ram:RateApplicablePercent>20.00</ram:RateApplicablePercent>
        </ram:ApplicableTradeTax>
        <ram:SpecifiedTradeSettlementLineMonetarySummation>
          <ram:LineTotalAmount>300.00</ram:LineTotalAmount>
        </ram:SpecifiedTradeSettlementLineMonetarySummation>
      </ram:SpecifiedLineTradeSettlement>
    </ram:IncludedSupplyChainTradeLineItem>
    <ram:ApplicableHeaderTradeAgreement>
      <ram:BuyerReference>PO-FX-2026-09</ram:BuyerReference>
      <ram:SellerTradeParty>
        <ram:Name>TECH INSTRUMENTS FRANCE SAS</ram:Name>
        <ram:SpecifiedLegalOrganization>
          <ram:ID>82930419200018</ram:ID>
        </ram:SpecifiedLegalOrganization>
        <ram:DefinedTradeContact>
          <ram:PersonName>Service Facturation</ram:PersonName>
          <ram:TelephoneUniversalCommunication>
            <ram:CompleteNumber>+33 1 42 68 55 00</ram:CompleteNumber>
          </ram:TelephoneUniversalCommunication>
          <ram:EmailURIUniversalCommunication>
            <ram:URIID>facturation@techinstruments.fr</ram:URIID>
          </ram:EmailURIUniversalCommunication>
        </ram:DefinedTradeContact>
        <ram:PostalTradeAddress>
          <ram:PostcodeCode>75008</ram:PostcodeCode>
          <ram:LineOne>24 Rue du Faubourg Saint-Honoré</ram:LineOne>
          <ram:CityName>Paris</ram:CityName>
          <ram:CountryID>FR</ram:CountryID>
        </ram:PostalTradeAddress>
        <ram:SpecifiedTaxRegistration>
          <ram:ID schemeID="VA">FR12829304192</ram:ID>
        </ram:SpecifiedTaxRegistration>
      </ram:SellerTradeParty>
      <ram:BuyerTradeParty>
        <ram:Name>AUTOMAZIONE &amp; ROBOTICA S.P.A.</ram:Name>
        <ram:SpecifiedLegalOrganization>
          <ram:ID>03332221110</ram:ID>
        </ram:SpecifiedLegalOrganization>
        <ram:PostalTradeAddress>
          <ram:PostcodeCode>10126</ram:PostcodeCode>
          <ram:LineOne>Via Nizza, 230</ram:LineOne>
          <ram:CityName>Torino</ram:CityName>
          <ram:CountryID>IT</ram:CountryID>
        </ram:PostalTradeAddress>
        <ram:SpecifiedTaxRegistration>
          <ram:ID schemeID="VA">IT03332221110</ram:ID>
        </ram:SpecifiedTaxRegistration>
        <ram:URIUniversalCommunication>
          <ram:URIID>0208:03332221110</ram:URIID>
        </ram:URIUniversalCommunication>
      </ram:BuyerTradeParty>
      <ram:BuyerOrderReferencedDocument>
        <ram:ID>ORD-2026-981</ram:ID>
      </ram:BuyerOrderReferencedDocument>
    </ram:ApplicableHeaderTradeAgreement>
    <ram:ApplicableHeaderTradeDelivery>
      <ram:DespatchAdviceReferencedDocument>
        <ram:ID>DDT-FR-2026-44</ram:ID>
        <ram:FormattedIssueDateTime>
          <udt:DateTimeString format="102">20260901</udt:DateTimeString>
        </ram:FormattedIssueDateTime>
      </ram:DespatchAdviceReferencedDocument>
    </ram:ApplicableHeaderTradeDelivery>
    <ram:ApplicableHeaderTradeSettlement>
      <ram:InvoiceCurrencyCode>EUR</ram:InvoiceCurrencyCode>
      <ram:SpecifiedTradeSettlementPaymentMeans>
        <ram:TypeCode>58</ram:TypeCode>
        <ram:PayeePartyCreditorFinancialAccount>
          <ram:IBANID>FR7630006000011234567890189</ram:IBANID>
          <ram:AccountName>TECH INSTRUMENTS FRANCE SAS</ram:AccountName>
        </ram:PayeePartyCreditorFinancialAccount>
        <ram:PayeeSpecifiedCreditorFinancialInstitution>
          <ram:BICID>BNPAFRPP</ram:BICID>
        </ram:PayeeSpecifiedCreditorFinancialInstitution>
      </ram:SpecifiedTradeSettlementPaymentMeans>
      <ram:ApplicableTradeTax>
        <ram:CalculatedAmount>240.00</ram:CalculatedAmount>
        <ram:TypeCode>VAT</ram:TypeCode>
        <ram:BasisAmount>1200.00</ram:BasisAmount>
        <ram:CategoryCode>S</ram:CategoryCode>
        <ram:RateApplicablePercent>20.00</ram:RateApplicablePercent>
      </ram:ApplicableTradeTax>
      <ram:SpecifiedTradePaymentTerms>
        <ram:Description>Pagamento a 30 giorni fine mese con bonifico SEPA</ram:Description>
        <ram:DueDateDateTime>
          <udt:DateTimeString format="102">20261002</udt:DateTimeString>
        </ram:DueDateDateTime>
      </ram:SpecifiedTradePaymentTerms>
      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:LineTotalAmount>1200.00</ram:LineTotalAmount>
        <ram:TaxBasisTotalAmount>1200.00</ram:TaxBasisTotalAmount>
        <ram:TaxTotalAmount>240.00</ram:TaxTotalAmount>
        <ram:GrandTotalAmount>1440.00</ram:GrandTotalAmount>
        <ram:DuePayableAmount>1440.00</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
  </rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>`;

export const SAMPLES: SampleInvoiceItem[] = [
  {
    id: 'commercial-sample',
    name: 'Fattura Commerciale B2B (Acme Cloud → Nexus Tech)',
    subtitle: 'Fattura SDI (FPR12) con sconti a riga, CIG, molteplici articoli e IBAN',
    xml: SAMPLE_INVOICE_COMMERCIAL,
  },
  {
    id: 'professional-sample',
    name: 'Parcella Professionale (Ing. Mario Rossi)',
    subtitle: 'Parcella SDI (FPR12) con Ritenuta d’acconto 20%, Cassa Ingegneri 4% e Bollo',
    xml: SAMPLE_INVOICE_PROFESSIONAL,
  },
  {
    id: 'pa-sample',
    name: 'Fattura PA Split Payment (Ente Pubblico)',
    subtitle: 'Fattura SDI (FPA12) con Scissione Pagamenti ex art. 17-ter, CUP e CIG',
    xml: SAMPLE_INVOICE_PA,
  },
  {
    id: 'ubl-peppol-sample',
    name: '🇪🇺 UBL 2.1 (Peppol BIS Billing 3.0)',
    subtitle: 'Fattura europea EN 16931 transfrontaliera (OASIS UBL) con Peppol Endpoint e SEPA',
    xml: SAMPLE_INVOICE_UBL_PEPPOL,
  },
  {
    id: 'cii-facturx-sample',
    name: '🇪🇺 UN/CEFACT CII (Factur-X / ZUGFeRD)',
    subtitle: 'Fattura europea EN 16931 (Francia/Germania) con profilo Extended e DDT collegato',
    xml: SAMPLE_INVOICE_CII_FACTURX,
  },
];
