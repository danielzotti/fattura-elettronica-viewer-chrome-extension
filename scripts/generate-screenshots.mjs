import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, createReadStream } from 'node:fs';
import { resolve, extname, join } from 'node:path';
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 54321;
const OUT_DIR = resolve('.output/chrome-mv3');
const STORE_ASSETS_DIR = resolve('store-assets');

if (!existsSync(STORE_ASSETS_DIR)) {
  mkdirSync(STORE_ASSETS_DIR, { recursive: true });
}

// MIME types for static server
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

function startServer() {
  return new Promise((res) => {
    const server = createServer((req, resHttp) => {
      let urlPath = req.url ? req.url.split('?')[0] : '/';
      if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

      const filePath = join(OUT_DIR, urlPath);
      if (existsSync(filePath)) {
        const ext = extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        resHttp.writeHead(200, { 'Content-Type': contentType });
        createReadStream(filePath).pipe(resHttp);
      } else {
        resHttp.writeHead(404, { 'Content-Type': 'text/plain' });
        resHttp.end('Not Found');
      }
    });

    server.listen(PORT, () => {
      console.log(`🚀 Screenshot local server running at http://localhost:${PORT}`);
      res(server);
    });
  });
}

async function generateScreenshots() {
  console.log('📸 Starting Chrome Web Store screenshot capture...');

  const server = await startServer();
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--hide-scrollbars',
      '--window-size=1280,800',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });

  // 1. Screenshot 1: Overview Light Mode (Commercial B2B Invoice)
  console.log('📸 Capturing Screenshot 1: Overview (Light Mode)...');
  await page.goto(`http://localhost:${PORT}/index.html?sample=commercial-sample`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('fe_viewer_theme', 'light');
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: join(STORE_ASSETS_DIR, 'screenshot-1-overview-light.png') });

  // 2. Screenshot 2: Items Table & VAT Summary (Commercial Invoice scrolled to table)
  console.log('📸 Capturing Screenshot 2: Goods & Services Table...');
  await page.evaluate(() => {
    const tableSection = document.querySelector('table');
    if (tableSection) {
      tableSection.scrollIntoView({ behavior: 'instant', block: 'center' });
    } else {
      window.scrollTo(0, 380);
    }
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: join(STORE_ASSETS_DIR, 'screenshot-2-items-table.png') });

  // 3. Screenshot 3: Dark Mode Professional Sample (Withholding Tax, Cassa, Stamp)
  console.log('📸 Capturing Screenshot 3: Dark Mode View...');
  await page.goto(`http://localhost:${PORT}/index.html?sample=professional-sample`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('fe_viewer_theme', 'dark');
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: join(STORE_ASSETS_DIR, 'screenshot-3-dark-mode.png') });

  // 4. Screenshot 4: Drag & Drop Upload Landing Screen
  console.log('📸 Capturing Screenshot 4: Drag & Drop Landing...');
  await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('fe_viewer_theme', 'light');
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: join(STORE_ASSETS_DIR, 'screenshot-4-upload-dragdrop.png') });

  // 5. Screenshot 5: European Standards (UBL 2.1 Peppol BIS 3.0)
  console.log('📸 Capturing Screenshot 5: European Standards (UBL Peppol)...');
  await page.goto(`http://localhost:${PORT}/index.html?sample=ubl-peppol-sample`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('fe_viewer_theme', 'light');
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: join(STORE_ASSETS_DIR, 'screenshot-5-european-standards.png') });

  await browser.close();
  server.close();

  // 6. Generate Promotional Tiles with Sharp
  console.log('🎨 Generating Promotional Tiles (440x280 & 1400x560)...');
  await generatePromoTiles();

  console.log('✅ All screenshots and promo assets successfully created in /store-assets/');
}

async function generatePromoTiles() {
  // 1. Small Promo Tile (440x280)
  const promo440Svg = `
  <svg width="440" height="280" viewBox="0 0 440 280" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#090d16" />
        <stop offset="50%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#1e1b4b" />
      </linearGradient>
      <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="50%" stop-color="#2563eb" />
        <stop offset="100%" stop-color="#1d4ed8" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.5" />
      </filter>
    </defs>
    
    <!-- Background -->
    <rect width="440" height="280" fill="url(#bgGrad)" />
    <circle cx="380" cy="40" r="140" fill="#2563eb" opacity="0.12" filter="blur(40px)" />
    <circle cx="40" cy="240" r="120" fill="#38bdf8" opacity="0.08" filter="blur(40px)" />

    <!-- Icon Card -->
    <rect x="180" y="32" width="80" height="80" rx="20" fill="url(#blueGrad)" filter="url(#shadow)" />
    <!-- Receipt Icon -->
    <g transform="translate(196, 48) scale(2)" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
      <path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8" />
      <path d="M12 17V7" />
    </g>

    <!-- Title -->
    <text x="220" y="142" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" fill="#ffffff" letter-spacing="-0.3">Fattura Elettronica</text>
    <text x="220" y="165" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" fill="#93c5fd" letter-spacing="0.2">Viewer &amp; PDF Export</text>

    <!-- Badges -->
    <g transform="translate(68, 192)">
      <!-- Badge 1 -->
      <rect x="0" y="0" width="88" height="26" rx="13" fill="#1e293b" stroke="#334155" stroke-width="1" />
      <text x="44" y="17" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="600" fill="#e2e8f0">XML &amp; P7M</text>
      
      <!-- Badge 2 -->
      <rect x="98" y="0" width="96" height="26" rx="13" fill="#1e293b" stroke="#334155" stroke-width="1" />
      <text x="146" y="17" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="600" fill="#38bdf8">Esporta PDF</text>

      <!-- Badge 3 -->
      <rect x="204" y="0" width="100" height="26" rx="13" fill="#1e293b" stroke="#334155" stroke-width="1" />
      <text x="254" y="17" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="600" fill="#4ade80">100% Privato</text>
    </g>

    <text x="220" y="252" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="400" fill="#64748b">Compatibile con standard FatturaPA &amp; UBL Peppol</text>
  </svg>
  `;

  await sharp(Buffer.from(promo440Svg))
    .png()
    .toFile(join(STORE_ASSETS_DIR, 'promo-tile-440x280.png'));

  // 2. Marquee Promo Tile (1400x560)
  const marquee1400Svg = `
  <svg width="1400" height="560" viewBox="0 0 1400 560" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#050811" />
        <stop offset="40%" stop-color="#0b1329" />
        <stop offset="100%" stop-color="#171e3d" />
      </linearGradient>
      <linearGradient id="mBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="50%" stop-color="#2563eb" />
        <stop offset="100%" stop-color="#1d4ed8" />
      </linearGradient>
      <filter id="mShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.6" />
      </filter>
    </defs>
    
    <!-- Background -->
    <rect width="1400" height="560" fill="url(#mBgGrad)" />
    <circle cx="1100" cy="180" r="320" fill="#2563eb" opacity="0.15" />
    <circle cx="200" cy="460" r="280" fill="#38bdf8" opacity="0.08" />

    <!-- Left Content Column -->
    <g transform="translate(100, 110)">
      <!-- Logo Squircle -->
      <rect x="0" y="0" width="84" height="84" rx="22" fill="url(#mBlueGrad)" filter="url(#mShadow)" />
      <g transform="translate(18, 18) scale(2)" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
        <path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8" />
        <path d="M12 17V7" />
      </g>

      <text x="108" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="800" fill="#ffffff" letter-spacing="-0.5">Fattura Elettronica Viewer</text>
      <text x="108" y="76" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="500" fill="#60a5fa">Visualizzazione Grafica &amp; Esportazione PDF A4</text>

      <text x="0" y="140" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="400" fill="#cbd5e1" width="550">
        Trasforma file XML e P7M in documenti chiari e moderni.
      </text>
      <text x="0" y="168" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="400" fill="#94a3b8">
        Elaborazione 100% in locale nel browser per la massima sicurezza fiscale.
      </text>

      <!-- Feature Pill Badges -->
      <g transform="translate(0, 210)">
        <rect x="0" y="0" width="130" height="38" rx="19" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="65" y="24" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" fill="#f8fafc">📄 XML &amp; .p7m</text>

        <rect x="142" y="0" width="150" height="38" rx="19" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="217" y="24" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" fill="#38bdf8">🖨️ PDF &amp; Stampa A4</text>

        <rect x="304" y="0" width="156" height="38" rx="19" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="382" y="24" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" fill="#4ade80">🔒 100% Locale &amp; Safe</text>

        <rect x="472" y="0" width="140" height="38" rx="19" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="542" y="24" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" fill="#fbbf24">🇪🇺 EN 16931</text>
      </g>
    </g>

    <!-- Right Mockup Visual Box -->
    <g transform="translate(760, 80)">
      <rect x="0" y="0" width="540" height="400" rx="16" fill="#0f172a" stroke="#334155" stroke-width="2" filter="url(#mShadow)" />
      
      <!-- Window top bar -->
      <rect x="0" y="0" width="540" height="36" rx="16" fill="#1e293b" />
      <rect x="0" y="20" width="540" height="16" fill="#1e293b" />
      <circle cx="20" cy="18" r="5" fill="#ef4444" />
      <circle cx="36" cy="18" r="5" fill="#f59e0b" />
      <circle cx="52" cy="18" r="5" fill="#10b981" />
      <text x="270" y="23" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" fill="#94a3b8">Fattura N. 2026/0042 • ACME CLOUD SOLUTIONS S.R.L.</text>

      <!-- Mock Cards inside -->
      <g transform="translate(24, 56)">
        <rect x="0" y="0" width="236" height="100" rx="10" fill="#1e293b" stroke="#334155" />
        <text x="14" y="26" font-family="-apple-system, sans-serif" font-size="11" font-weight="700" fill="#60a5fa">CEDENTE / PRESTATORE</text>
        <text x="14" y="48" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#ffffff">Acme Cloud Solutions S.r.l.</text>
        <text x="14" y="68" font-family="-apple-system, sans-serif" font-size="11" fill="#94a3b8">P.IVA: IT01234567890</text>
        <text x="14" y="86" font-family="-apple-system, sans-serif" font-size="11" fill="#94a3b8">Regime: Ordinario (RF01)</text>

        <rect x="256" y="0" width="236" height="100" rx="10" fill="#1e293b" stroke="#334155" />
        <text x="270" y="26" font-family="-apple-system, sans-serif" font-size="11" font-weight="700" fill="#10b981">CESSIONARIO / COMMITTENTE</text>
        <text x="270" y="48" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#ffffff">Nexus Tech Innovations S.p.A.</text>
        <text x="270" y="68" font-family="-apple-system, sans-serif" font-size="11" fill="#94a3b8">P.IVA: IT09876543210</text>
        <text x="270" y="86" font-family="-apple-system, sans-serif" font-size="11" fill="#94a3b8">Cod. SDI: M5UXCR1</text>
      </g>

      <!-- KPI Ribbon Mock -->
      <g transform="translate(24, 172)">
        <rect x="0" y="0" width="492" height="74" rx="10" fill="#1e1b4b" stroke="#4338ca" />
        <text x="20" y="28" font-family="-apple-system, sans-serif" font-size="11" font-weight="600" fill="#a5b4fc">TOTALE DOCUMENTO</text>
        <text x="20" y="56" font-family="-apple-system, sans-serif" font-size="22" font-weight="800" fill="#ffffff">€ 3.660,00</text>
        
        <text x="200" y="28" font-family="-apple-system, sans-serif" font-size="11" font-weight="600" fill="#94a3b8">IMPONIBILE</text>
        <text x="200" y="54" font-family="-apple-system, sans-serif" font-size="18" font-weight="700" fill="#cbd5e1">€ 3.000,00</text>

        <text x="360" y="28" font-family="-apple-system, sans-serif" font-size="11" font-weight="600" fill="#94a3b8">IVA TOTALE</text>
        <text x="360" y="54" font-family="-apple-system, sans-serif" font-size="18" font-weight="700" fill="#cbd5e1">€ 660,00 (22%)</text>
      </g>

      <!-- Table Rows Mock -->
      <g transform="translate(24, 262)">
        <rect x="0" y="0" width="492" height="60" rx="8" fill="#1e293b" />
        <text x="16" y="25" font-family="-apple-system, sans-serif" font-size="12" font-weight="600" fill="#f8fafc">1. Sviluppo Piattaforma Cloud &amp; Microservizi</text>
        <text x="16" y="46" font-family="-apple-system, sans-serif" font-size="11" fill="#94a3b8">Q.tà: 1 • Prezzo: € 2.500,00 • IVA 22%</text>
        <text x="420" y="36" text-anchor="end" font-family="-apple-system, sans-serif" font-size="14" font-weight="700" fill="#ffffff">€ 2.500,00</text>
      </g>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(marquee1400Svg))
    .png()
    .toFile(join(STORE_ASSETS_DIR, 'marquee-promo-1400x560.png'));
}

generateScreenshots().catch((err) => {
  console.error('❌ Error generating screenshots:', err);
  process.exit(1);
});
