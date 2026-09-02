# 🧾 Fattura Elettronica Viewer & PDF Export

[English](#-english) | [Italiano](#-italiano)

🌐 **Online Web App**: [https://fattura-elettronica-viewer.zotti.dev](https://fattura-elettronica-viewer.zotti.dev)

---

## 🇬🇧 English

Multi-platform browser extension (**Chrome, Firefox, Opera, Edge**) and **online web application** built with **[WXT](https://wxt.dev)** and **React** to transform Italian electronic invoice files (`XML` and `P7M`) into professional, elegant, and readable visual documents, featuring **A4 PDF export** and **high-fidelity printing**.

### 🌐 Use Online (No Installation Required)

You can use the viewer immediately in your browser without installing anything at:
👉 **[https://fattura-elettronica-viewer.zotti.dev](https://fattura-elettronica-viewer.zotti.dev)**

- **100% Client-Side & Private**: Invoices and files are parsed and rendered entirely inside your browser. No files are uploaded to any server.
- **Drag & Drop**: Easily drop XML or signed `.p7m` files to view them immediately.

---

### ✨ Key Features

- 🎨 **Professional Visual Rendering**:
  - Side-by-side cards for **Supplier/Seller (Cedente/Prestatore)** and **Customer/Buyer (Cessionario/Committente)** with quick-copy buttons for VAT Number, Tax Code (Codice Fiscale), Certified Email (PEC), and SDI Recipient Code.
  - **KPI Banner**: Prominent Total Amount, Taxable Amount, Total VAT, Withholding Tax (Ritenuta d'acconto), Due Date, and Payment Method.
  - **Goods and Services Table**: Line-by-line item details with real-time search, unit prices, discounts/surcharges, VAT rates, and exemption nature badges (e.g., Non-taxable, Reverse charge).
  - **VAT Summary & Split Payment**: Transparent breakdown of tax rates, taxable amounts, tax totals, and collectibility (Split Payment).
  - **Payment Details**: Due dates, amounts, payment methods (e.g., Bank Transfer, SEPA Direct Debit MP15, Cash, Cards), and **IBAN with quick-copy button**.
  - **Administrative Data**: SDI transmission details, Purchase Orders, Contracts, CIG, CUP, DDT (Transport documents), and virtual stamps (Bollo virtuale).
  - **Attachments**: Automatic detection of embedded Base64 attachments with 1-click download.
  - **Raw XML Source Code**: Integrated syntax-highlighted viewer with text search and full copy.

- 📄 **PDF Export & Printing**:
  - Dedicated **"Export PDF"** button: generates a clean, neatly formatted vector A4 PDF document.
  - Dedicated **"Print"** button: native `@media print` support with calibrated margins and contrast optimized for business documents.

- ⚡ **Automatic In-Tab Detection & Context Menus** *(Extension Mode)*:
  - When opening an `.xml` file or visiting a page containing an electronic invoice, a prompt banner appears: *"Electronic Invoice Detected — View Graphically ➔"*.
  - **Context Menu Actions**: Right-click on selected XML text to view it graphically, right-click on any invoice link to open it directly in the viewer, or right-click the extension icon for quick launch.

- 🌙 **Dark & Light Themes**:
  - Full Dark Mode support for comfortable on-screen reading, with automatic preference persistence.

- 📦 **Universal Format Support (Italian & European EN 16931)**:
  - 🇮🇹 **Italian SDI**: `FPR12` (B2B / B2C), `FPA12` (Public Administration), `FSM10` (Simplified Invoices)
  - 🇪🇺 **OASIS UBL 2.1**: **Peppol BIS Billing 3.0**, **XRechnung UBL**, universal UBL Invoices & Credit Notes
  - 🇪🇺 **UN/CEFACT CII**: **Factur-X / ZUGFeRD** (All EN 16931 profiles: Minimum, Basic, Comfort, Extended), **XRechnung CII**
  - 🔒 **Digitally Signed Envelopes**: `.xml.p7m` / `.p7m` (automatic PKCS#7 / CAdES envelope extraction)
  - 📑 **Multi-Body Documents**: Batches with multiple invoices within the same XML file

---

### 🚀 Installation & Development

#### Prerequisites

- **Node.js**: >= 18
- **npm** (or pnpm / yarn / bun)

#### Available Commands

```bash
# 1. Install dependencies
npm install

# 2. Start development mode with Hot Module Replacement (Chrome)
npm run dev

# 3. Start development mode on Firefox
npm run dev:firefox

# 4. Build production bundle for Chrome (Manifest V3)
npm run build

# 5. Build production bundle for Firefox
npm run build:firefox

# 6. Build standalone web bundle for GitHub Pages / static hosting
npm run build:web

# 7. Create ZIP bundle ready for store distribution
npm run zip
```

---

### 🔌 How to Load the Extension in Your Browser

#### Google Chrome / Opera / Brave / Microsoft Edge

1. Run `npm run build`.
2. Open `chrome://extensions` (or `opera://extensions` / `edge://extensions`).
3. Enable **"Developer mode"** in the top-right corner.
4. Click **"Load unpacked"**.
5. Select the `.output/chrome-mv3` folder.

#### Mozilla Firefox

1. Run `npm run build:firefox`.
2. Open `about:debugging#/runtime/this-firefox`.
3. Click **"Load Temporary Add-on..."**.
4. Select the `manifest.json` file inside `.output/firefox-mv2`.

---

### 🛠️ Tech Stack

- **[WXT](https://wxt.dev)**: Next-gen framework for Manifest V3 browser extensions.
- **React 19 & TypeScript**: Typed, modular, and reactive user interface.
- **jsPDF & html2canvas**: High-resolution client-side PDF generation.
- **Lucide React**: Modern and lightweight iconography.
- **GitHub Actions & GitHub Pages**: Continuous deployment to [https://fattura-elettronica-viewer.zotti.dev](https://fattura-elettronica-viewer.zotti.dev).

---

## 🇮🇹 Italiano

Estensione browser multi-piattaforma (**Chrome, Firefox, Opera, Edge**) e **applicazione web online** sviluppata con **[WXT](https://wxt.dev)** e **React** per trasformare i file di fattura elettronica italiana (`XML` e `P7M`) in documenti grafici professionali, eleganti e leggibili, con funzionalità di **esportazione in PDF A4** e **stampa ad alta fedeltà**.

### 🌐 Utilizzo Online (Senza Installazione)

L'applicativo è fruibile direttamente dal browser senza dover installare nulla al seguente indirizzo:
👉 **[https://fattura-elettronica-viewer.zotti.dev](https://fattura-elettronica-viewer.zotti.dev)**

- **100% Client-Side & Privacy Garantita**: Le fatture vengono elaborate e visualizzate interamente nel browser locale, senza che alcun dato o file venga trasmesso a server esterni.
- **Drag & Drop**: Trascina comodamente i tuoi file `.xml` o `.p7m` per visualizzarli all'istante.

---

### ✨ Funzionalità Principali

- 🎨 **Visualizzazione Grafica Professionale**:
  - Schede affiancate per **Cedente/Prestatore (Fornitore)** e **Cessionario/Committente (Cliente)** con pulsanti di copia rapida per Partita IVA, Codice Fiscale, PEC e Codice Destinatario SDI.
  - **KPI Banner**: Totale Documento in evidenza, Totale Imponibile, Imposta IVA complessiva, Ritenuta d'acconto, Scadenza e Modalità di Pagamento.
  - **Tabella Beni e Servizi**: Dettaglio linee con ricerca in tempo reale, prezzi unitari, sconti/maggiorazioni, aliquota IVA e badge della natura esenzione (es. Non imponibile, Reverse charge).
  - **Riepilogo IVA & Scissione Pagamenti**: Tabella trasparente delle aliquote, imponibili, imposte ed esigibilità (Split Payment).
  - **Dati Pagamento**: Scadenze, importi, modalità (es. Bonifico, Addebito Diretto SEPA MP15, Contanti, Carte) e **IBAN con pulsante copia**.
  - **Dati Amministrativi**: Dati trasmissione SDI, Ordini d'acquisto, Contratti, CIG, CUP, DDT e bolli virtuali.
  - **Allegati**: Rilevamento automatico di file allegati incorporati in Base64 con download diretto con 1 click.
  - **Codice XML Sorgente**: Visualizzatore con ricerca testuale e copia integrale.

- 📄 **Esportazione in PDF & Stampa**:
  - Pulsante dedicato **"Esporta PDF"**: genera un file PDF A4 vettoriale impaginato e pulito.
  - Pulsante **"Stampa"**: supporto per `@media print` nativo con margini e contrasto calibrati per documenti aziendali.

- ⚡ **Rilevamento Automatico & Menu Contestuale** *(Modalità Estensione)*:
  - Quando apri un file `.xml` o visiti una pagina contenente una fattura elettronica, compare un banner rapido: *"Fattura Elettronica Rilevata — Visualizza Graficamente ➔"*.
  - **Menu Contestuale con Tasto Destro**:
    - Click destro su **testo XML selezionato**: apre e renderizza all'istante il testo evidenziato nel visualizzatore grafico.
    - Click destro su **link a fattura**: scarica e visualizza direttamente il file XML senza doverlo prima salvare sul disco.
    - Click destro sull'**icona dell'estensione**: accesso rapido diretto al visualizzatore.

- 🌙 **Tema Scuro & Chiaro**:
  - Supporto Dark Mode per una lettura confortevole a schermo, con salvataggio delle preferenze.

- 📦 **Supporto Formati Universale (Standard Italiano ed Europeo EN 16931)**:
  - 🇮🇹 **SDI Italiano**: `FPR12` (Fattura tra Privati / B2B / B2C), `FPA12` (Fattura PA Split Payment), `FSM10` (Fattura Semplificata)
  - 🇪🇺 **OASIS UBL 2.1**: **Peppol BIS Billing 3.0**, **XRechnung UBL**, Fatture e Note di Credito UBL
  - 🇪🇺 **UN/CEFACT CII**: **Factur-X / ZUGFeRD** (Tutti i profili EN 16931: Minimum, Basic, Comfort, Extended), **XRechnung CII**
  - 🔒 **File Firmati Digitalmente**: `.xml.p7m` / `.p7m` (estrazione automatica della busta crittografica PKCS#7 / CAdES)
  - 📑 **Multi-Body**: Lotti con più fatture nello stesso file XML

---

### 🚀 Installazione e Sviluppo

#### Prerequisiti

- **Node.js**: >= 18
- **npm** (o pnpm / yarn / bun)

#### Comandi Disponibili

```bash
# 1. Installa le dipendenze
npm install

# 2. Avvia in modalità sviluppo con Hot Module Replacement (Chrome)
npm run dev

# 3. Avvia in modalità sviluppo su Firefox
npm run dev:firefox

# 4. Compila la versione di produzione per Chrome (Manifest V3)
npm run build

# 5. Compila la versione di produzione per Firefox
npm run build:firefox

# 6. Compila la versione web standalone per GitHub Pages / hosting statico
npm run build:web

# 7. Crea il pacchetto ZIP pronto per lo store o la distribuzione
npm run zip
```

---

### 🔌 Come Caricare l'Estensione nel Browser

#### Google Chrome / Opera / Brave / Microsoft Edge

1. Esegui `npm run build`.
2. Apri `chrome://extensions` (o `opera://extensions` / `edge://extensions`).
3. Attiva la **"Modalità sviluppatore"** (Developer mode) in alto a destra.
4. Clicca su **"Carica estensione non pacchettizzata"** (Load unpacked).
5. Seleziona la cartella `.output/chrome-mv3`.

#### Mozilla Firefox

1. Esegui `npm run build:firefox`.
2. Apri `about:debugging#/runtime/this-firefox`.
3. Clicca su **"Carica componente aggiuntivo temporaneo..."** (Load Temporary Add-on).
4. Seleziona il file `manifest.json` presente in `.output/firefox-mv2`.

---

### 🛠️ Tecnologie Utilizzate

- **[WXT](https://wxt.dev)**: Framework per estensioni browser Manifest V3.
- **React 19 & TypeScript**: UI reattiva, tipizzata e modulare.
- **jsPDF & html2canvas**: Generazione PDF lato client ad alta risoluzione.
- **Lucide React**: Iconografia moderna e leggera.
- **GitHub Actions & GitHub Pages**: Distribuzione continua su [https://fattura-elettronica-viewer.zotti.dev](https://fattura-elettronica-viewer.zotti.dev).
