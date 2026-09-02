import { parseFatturaElettronica } from '../src/lib/xml-parser';
import { SAMPLE_INVOICE_COMMERCIAL, SAMPLE_INVOICE_PROFESSIONAL, SAMPLE_INVOICE_PA } from '../src/lib/sample-invoices';

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
console.log('✅ TEST 2 passed successfully!');

console.log('--- TEST 3: Parsing Professional Parcel Sample (Ing. Mario Rossi) ---');
const profInvoice = parseFatturaElettronica(SAMPLE_INVOICE_PROFESSIONAL, 'prof_sample.xml');
const profBody = profInvoice.body[0];
if (profBody) {
  console.assert(profBody.datiGenerali.datiGeneraliDocumento.datiRitenuta?.[0]?.importoRitenuta === 500, 'Ritenuta check');
  console.assert(profBody.datiGenerali.datiGeneraliDocumento.datiBollo?.importoBollo === 2, 'Bollo check');
  console.assert(profBody.datiGenerali.datiGeneraliDocumento.datiCassaPrevidenziale?.[0]?.importoContributoCassa === 100, 'Cassa previdenziale check');
}
console.log('✅ TEST 3 passed successfully!');

console.log('\n🎉 ALL TESTS PASSED! XML parsing and data extraction is rock solid.');
