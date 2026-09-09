# Informativa sulla Privacy / Privacy Policy

[Italiano](#-italiano) | [English](#-english)

---

## 🇮🇹 Italiano

**Ultimo aggiornamento:** Settembre 2026

Questa informativa sulla privacy descrive come l'estensione per browser e l'applicazione web **Fattura Elettronica Viewer & PDF** trattano i dati dell'utente.

### 1. Sintesi: Nessuna Raccolta o Utilizzo dei Dati
**Fattura Elettronica Viewer & PDF NON raccoglie, NON memorizza su server remoti, NON elabora a fini commerciali e NON trasmette alcun dato personale, fiscale o aziendale degli utenti.**

L'applicazione funziona interamente in locale (**100% Client-Side**) all'interno del browser dell'utente.

---

### 2. Trattamento dei File e dei Dati Fiscali
Quando carichi, trascini (Drag & Drop), incolli o apri una fattura elettronica (in formato XML, P7M, UBL o CII):
- **Elaborazione Locale**: Il parsing del file, l'estrazione dei dati, la visualizzazione grafica e l'eventuale generazione/esportazione del PDF avvengono esclusivamente nella memoria del tuo browser.
- **Nessun Invio a Server**: Nessun contenuto del file (nomi, indirizzi, Partite IVA, Codici Fiscali, importi, righe prodotto, coordinate bancarie IBAN, allegati) viene mai inviato a server esterni, API di terze parti o servizi cloud.
- **Funzionamento Offline**: L'estensione e la web app funzionano regolarmente anche in totale assenza di connessione internet.

---

### 3. Utilizzo della Memoria Locale del Dispositivo
L'estensione e la web app utilizzano esclusivamente lo storage locale del browser (`chrome.storage.local` / `localStorage`) per le seguenti finalità tecniche:
1. **Preferenze di interfaccia**: Memorizzazione della scelta del tema grafico (Tema Chiaro o Tema Scuro).
2. **Passaggio dati temporaneo (solo estensione)**: Trasferimento temporaneo del contenuto XML dal menu contestuale o popup alla nuova scheda del visualizzatore grafico.

Nessuno di questi dati viene mai sincronizzato o trasmesso all'esterno del tuo dispositivo.

---

### 4. Permessi del Browser e Relative Giustificazioni
L'estensione richiede alcuni permessi tecnici strettamente indispensabili per il suo funzionamento:

| Permesso | Perché è necessario | Uso dei dati |
| :--- | :--- | :--- |
| **`storage`** | Salva in locale la preferenza del tema (chiaro/scuro) e gestisce il passaggio temporaneo del payload della fattura alla scheda del visualizzatore. | Dati salvati unicamente sul dispositivo dell'utente. |
| **`contextMenus`** | Aggiunge la voce nel menu del tasto destro per consentire l'apertura rapida di link o testo XML selezionato. | Nessun dato tracciato o memorizzato. |
| **Accesso agli URL (`<all_urls>`)** | Rileva se nella scheda corrente è aperto o visualizzato un file XML di fattura elettronica (es. allegato webmail o portale ERP) per mostrare il pulsante di apertura grafica rapida. | Nessun dato di navigazione, cookie o richiesta di rete viene letto, memorizzato o inviato. |

---

### 5. Servizi di Terze Parti e Tracciamento
- **Nessun Cookie di Profilazione o Tracciamento**: Non vengono utilizzati cookie analitici o di profilazione.
- **Nessun Servizio di Analytics / Telemetria**: Non sono presenti script di tracciamento (come Google Analytics, Mixpanel o similari).
- **Nessun Annuncio Pubblicitario**: Il software è completamente privo di pubblicità o network di advertising.

---

### 6. Conformità GDPR
Poiché nessun dato personale o fiscale viene raccolto, trasmesso o memorizzato al di fuori del dispositivo dell'utente, l'utilizzo di **Fattura Elettronica Viewer & PDF** rispetta pienamente i principi di protezione dei dati stabiliti dal Regolamento Generale sulla Protezione dei Dati (GDPR - Regolamento UE 2016/679).

---

### 7. Trasparenza e Codice Open Source
Il codice sorgente dell'intero progetto è pubblico, aperto e completamente verificabile su GitHub:  
👉 [https://github.com/danielzotti/fattura-elettronica-viewer-chrome-extension](https://github.com/danielzotti/fattura-elettronica-viewer-chrome-extension)

---

### 8. Contatti
Per domande o segnalazioni riguardanti la privacy o il funzionamento dell'estensione, è possibile aprire una segnalazione (Issue) sul repository GitHub ufficiale:  
[https://github.com/danielzotti/fattura-elettronica-viewer-chrome-extension/issues](https://github.com/danielzotti/fattura-elettronica-viewer-chrome-extension/issues)

---

## 🇬🇧 English

**Last updated:** September 2026

This privacy policy explains how the **Fattura Elettronica Viewer & PDF** browser extension and web application handle user data.

### 1. Summary: No Data Collection or Usage
**Fattura Elettronica Viewer & PDF does NOT collect, store on remote servers, monetize, or transmit any personal, tax, or business data belonging to users.**

All operations are executed entirely on the client side (**100% Client-Side**) within your browser.

---

### 2. Processing of Invoices and Tax Data
When you upload, drag & drop, paste, or open an electronic invoice (XML, P7M, UBL, or CII format):
- **Local Processing**: File parsing, data extraction, graphic rendering, and PDF export occur strictly inside your browser's local memory.
- **No Server Uploads**: No invoice content (names, addresses, VAT numbers, Tax IDs, prices, product descriptions, IBANs, or attachments) is ever transmitted to remote servers, external APIs, or cloud services.
- **Offline Capable**: Both the extension and web app work completely offline without an active internet connection.

---

### 3. Local Storage Usage
The extension and web application only use local device storage (`chrome.storage.local` / `localStorage`) for minimal functional purposes:
1. **User Interface Preferences**: Storing your theme choice (Light mode / Dark mode).
2. **Temporary Data Relay (Extension only)**: Passing invoice content from popup/context menu to the new viewer tab.

None of this data is ever synced, shared, or transmitted off your device.

---

### 4. Browser Permissions & Justification
The extension requests specific browser permissions strictly required for its core functionality:

| Permission | Purpose | Data Usage |
| :--- | :--- | :--- |
| **`storage`** | Stores UI theme preference (light/dark) and temporarily transfers invoice payloads to the viewer tab. | Kept strictly on the user's local device. |
| **`contextMenus`** | Adds a right-click menu item to open selected XML text or invoice file links directly in the viewer. | No data collected or stored. |
| **Host Permissions (`<all_urls>`)** | Detects if an electronic invoice XML document is opened in the current browser tab (e.g., ERP portal or webmail attachment) to display a quick-open button. | No network traffic, page content, or browsing data is tracked or transmitted. |

---

### 5. Third-Party Services and Analytics
- **No Tracking Cookies**: No tracking or profiling cookies are used.
- **No Analytics / Telemetry**: No analytics services (e.g., Google Analytics, telemetry scripts) are bundled or executed.
- **No Advertising**: The software contains zero ads and connects to no ad networks.

---

### 6. GDPR Compliance
Because no personal or fiscal data is collected, transmitted, or stored on external servers, using **Fattura Elettronica Viewer & PDF** is fully compliant with the EU General Data Protection Regulation (GDPR - Regulation EU 2016/679).

---

### 7. Open Source & Transparency
The source code is open source and can be inspected and audited at:  
👉 [https://github.com/danielzotti/fattura-elettronica-viewer-chrome-extension](https://github.com/danielzotti/fattura-elettronica-viewer-chrome-extension)

---

### 8. Contact
For any privacy inquiries or support, please open an issue on the official GitHub repository:  
[https://github.com/danielzotti/fattura-elettronica-viewer-chrome-extension/issues](https://github.com/danielzotti/fattura-elettronica-viewer-chrome-extension/issues)
