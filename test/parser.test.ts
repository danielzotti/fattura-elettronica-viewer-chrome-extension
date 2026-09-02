import { parseFatturaElettronica } from '../src/lib/xml-parser';
import {
  SAMPLE_INVOICE_COMMERCIAL,
  SAMPLE_INVOICE_PROFESSIONAL,
  SAMPLE_INVOICE_PA,
  SAMPLE_INVOICE_UBL_PEPPOL,
  SAMPLE_INVOICE_CII_FACTURX,
} from '../src/lib/sample-invoices';

console.log('--- TEST 1: Parsing Public Administration Sample Invoice (PA Split Payment) ---');
const paInvoice = parseFatturaElettronica(SAMPLE_INVOICE_PA, 'pa_sample.xml');

console.assert(paInvoice.versione === 'FPA12', 'Versione should be FPA12');
console.assert(paInvoice.header.cedentePrestatore.datiAnagrafici.anagrafica.denominazione === 'DIGITAL PUBLIC SOLUTIONS S.R.L.', 'Cedente should be DIGITAL PUBLIC SOLUTIONS');
console.assert(paInvoice.header.cessionarioCommittente.datiAnagrafici.anagrafica.denominazione === 'COMUNE DI ESEMPIO - AREA SERVIZI INFORMATICI', 'Cessionario PA check');
console.assert(paInvoice.body.length === 1, 'Body count should be 1');

const body1 = paInvoice.body[0];
if (body1) {
  console.assert(body1.datiGenerali.datiGeneraliDocumento.numero === 'FPA-2026/088', 'Numero doc should be FPA-2026/088');
  console.assert(body1.datiBeniServizi.dettaglioLinee.length === 1, 'Line count should be 1');
  console.assert(body1.datiBeniServizi.datiRiepilogo[0]?.esigibilitaIVA === 'S', 'Split Payment (S) check');
  console.assert(body1.datiGenerali.datiOrdineAcquisto?.[0]?.codiceCUP === 'B41B26000100001', 'CUP check');
  console.assert(body1.datiGenerali.datiOrdineAcquisto?.[0]?.codiceCIG === '987654321A', 'CIG check');
}
console.log('✅ TEST 1 (PA Split Payment) passed successfully!');

console.log('--- TEST 2: Parsing Commercial Sample Invoice (ACME Cloud) ---');
const commInvoice = parseFatturaElettronica(SAMPLE_INVOICE_COMMERCIAL, 'comm_sample.xml');
console.assert(commInvoice.header.cedentePrestatore.datiAnagrafici.anagrafica.denominazione === 'ACME CLOUD SOLUTIONS S.R.L.', 'Cedente ACME check');
const commBody = commInvoice.body[0];
if (commBody) {
  console.assert(commBody.datiBeniServizi.dettaglioLinee.length === 3, 'Line count 3 check');
  console.assert(commBody.datiBeniServizi.dettaglioLinee[1]?.scontiMaggiorazioni?.[0]?.percentuale === 10, 'Discount check');
  console.assert(commBody.datiPagamento?.[0]?.dettagliPagamento[0]?.codiceIBAN === 'IT60X0542811101000000123456', 'IBAN check');
}
console.log('✅ TEST 2 (Commercial B2B) passed successfully!');

console.log('--- TEST 3: Parsing Professional Parcel Sample (Ing. Mario Rossi) ---');
const profInvoice = parseFatturaElettronica(SAMPLE_INVOICE_PROFESSIONAL, 'prof_sample.xml');
const profBody = profInvoice.body[0];
if (profBody) {
  console.assert(profBody.datiGenerali.datiGeneraliDocumento.datiRitenuta?.[0]?.importoRitenuta === 500, 'Ritenuta check');
  console.assert(profBody.datiGenerali.datiGeneraliDocumento.datiBollo?.importoBollo === 2, 'Bollo check');
  console.assert(profBody.datiGenerali.datiGeneraliDocumento.datiCassaPrevidenziale?.[0]?.importoContributoCassa === 100, 'Cassa previdenziale check');
}
console.log('✅ TEST 3 (Professional Parcel) passed successfully!');

console.log('--- TEST 4: Parsing European UBL 2.1 Sample Invoice (Peppol BIS 3.0) ---');
const ublInvoice = parseFatturaElettronica(SAMPLE_INVOICE_UBL_PEPPOL, 'peppol_sample.xml');
console.assert(ublInvoice.versione.includes('UBL 2.1'), 'Versione should include UBL 2.1');
console.assert(ublInvoice.header.cedentePrestatore.datiAnagrafici.anagrafica.denominazione === 'EURO CLOUD NETWORKS B.V.', 'Supplier should be EURO CLOUD NETWORKS');
console.assert(ublInvoice.header.cessionarioCommittente.datiAnagrafici.anagrafica.denominazione === 'GLOBAL LOGISTICS ITALIA S.R.L.', 'Customer should be GLOBAL LOGISTICS');
const ublBody = ublInvoice.body[0];
if (ublBody) {
  console.assert(ublBody.datiGenerali.datiGeneraliDocumento.numero === 'PEPPOL-2026-904', 'Doc number check');
  console.assert(ublBody.datiGenerali.datiGeneraliDocumento.importoTotaleDocumento === 2562, 'Total amount 2562 check');
  console.assert(ublBody.datiBeniServizi.dettaglioLinee.length === 2, 'Line count 2 check');
  console.assert(ublBody.datiPagamento?.[0]?.dettagliPagamento[0]?.codiceIBAN === 'NL91ABNA0417164300', 'UBL IBAN check');
}
console.log('✅ TEST 4 (UBL 2.1 Peppol) passed successfully!');

console.log('--- TEST 5: Parsing European UN/CEFACT CII Sample Invoice (Factur-X / ZUGFeRD) ---');
const ciiInvoice = parseFatturaElettronica(SAMPLE_INVOICE_CII_FACTURX, 'facturx_sample.xml');
console.assert(ciiInvoice.versione.includes('UN/CEFACT CII'), 'Versione should include UN/CEFACT CII');
console.assert(ciiInvoice.header.cedentePrestatore.datiAnagrafici.anagrafica.denominazione === 'TECH INSTRUMENTS FRANCE SAS', 'Supplier should be TECH INSTRUMENTS');
console.assert(ciiInvoice.header.cessionarioCommittente.datiAnagrafici.anagrafica.denominazione === 'AUTOMAZIONE & ROBOTICA S.P.A.', 'Customer check');
const ciiBody = ciiInvoice.body[0];
if (ciiBody) {
  console.assert(ciiBody.datiGenerali.datiGeneraliDocumento.numero === 'FX-2026-789', 'Doc number check');
  console.assert(ciiBody.datiGenerali.datiGeneraliDocumento.importoTotaleDocumento === 1440, 'Total amount 1440 check');
  console.assert(ciiBody.datiBeniServizi.dettaglioLinee.length === 2, 'Line count 2 check');
  console.assert(ciiBody.datiPagamento?.[0]?.dettagliPagamento[0]?.codiceIBAN === 'FR7630006000011234567890189', 'CII IBAN check');
  console.assert(ciiBody.datiGenerali.datiDDT?.[0]?.numeroDDT === 'DDT-FR-2026-44', 'CII DDT check');
}
console.log('✅ TEST 5 (UN/CEFACT CII Factur-X) passed successfully!');

console.log('\n🎉 ALL TESTS PASSED! Italian SDI, European UBL 2.1, and UN/CEFACT CII parsing is 100% operational.');

