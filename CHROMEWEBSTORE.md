# Chrome Web Store Listing — Fattura Elettronica Viewer & PDF Export

## Metadata

- **Name**: Fattura Elettronica Viewer & PDF
- **Short Name**: FE Viewer
- **Summary / Short Description**: Visualizza in un formato grafico moderno ed esporta in PDF le fatture elettroniche italiane (XML e P7M).
- **Category**: Produttività / Strumenti per sviluppatori / Business
- **Default Language**: Italiano (it)
- **Supported Browsers**: Google Chrome, Mozilla Firefox, Opera, Microsoft Edge, Brave
- **Manifest Version**: 3 (MV3)

---

## Detailed Store Description (Italian)

Visualizza qualsiasi fattura elettronica italiana (XML standard o file firmato digitalmente .p7m) in un formato grafico chiaro, moderno e professionale. Esporta direttamente in formato PDF A4 pronto per la stampa o l'archiviazione contabile.

### 🌟 Caratteristiche Principali:
- **Visualizzazione Grafica Immediata**: trasforma file XML ostici in documenti leggibili e ordinati.
- **Esportazione PDF & Stampa A4**: genera documenti PDF con 1 click o stampa con impaginazione ottimizzata.
- **Riconoscimento Cedente & Cessionario**: schede fornitore e cliente con pulsanti per copiare rapidamente Partita IVA, Codice Fiscale, PEC e Codice Destinatario SDI.
- **Decodifica Automatica Codici SDI**: traduce in chiaro i codici dell'Agenzia delle Entrate (tipi documento TD01..TD28, regimi fiscali RF01..RF19, modalità di pagamento MP01..MP23, nature IVA ed esigibilità Split Payment).
- **Riepilogo Totali & IVA**: indicatori visivi per Totale Documento, Imponibile, IVA, Ritenute d'acconto, Casse Previdenziali e Bollo virtuale.
- **Gestione Allegati**: rileva e permette di scaricare con un click gli allegati incorporati nel file XML.
- **Rilevamento Automatico nelle Schede**: mostra una notifica discreta quando apri un file XML di fattura nel browser.
- **Privacy al 100%**: tutti i dati e i file XML rimangono esclusivamente all'interno del tuo computer / browser. Nessun dato viene inviato a server esterni.

---

## Permissions Justification

| Permission | Plain-English Reason |
| :--- | :--- |
| `storage` | Utilizzato per memorizzare localmente le preferenze dell'interfaccia (es. tema Chiaro / Scuro) e passare temporaneamente i dati della fattura tra il menu/popup e la scheda del visualizzatore. Nessun dato viene trasmesso all'esterno. |
| `contextMenus` | Consente all'utente di fare click col tasto destro su un testo XML selezionato o su un link a un file fattura per aprirlo direttamente nel visualizzatore grafico. |
| `tabs` | Utilizzato per rilevare la presenza di un documento fattura nella scheda aperta e consentire l'apertura della pagina del visualizzatore grafico in una nuova scheda. |

---

## Privacy & Data Use Disclosure

- **Raccolta dati**: Nessun dato personale o contabile viene raccolto, tracciato o inviato a server terzi.
- **Elaborazione locale**: Il parsing XML, la generazione del layout grafico e l'esportazione del PDF avvengono al 100% localmente all'interno del browser web dell'utente.

---

## Version History

- **v1.0.0** (Settembre 2026):
  - Rilascio iniziale con WXT e React 19 (Manifest V3).
  - Supporto completo standard FPR12, FPA12, FSM10 e `.p7m`.
  - Esportazione PDF e supporto stampa `@media print`.
  - Drag & Drop, incolla XML e fatture di esempio precaricate.
  - Supporto Dark Mode e Light Mode.
