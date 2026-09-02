export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    // Check if the current page contains Fattura Elettronica XML
    function getPageXml(): string | null {
      const pageText = document.body?.innerText || document.documentElement?.textContent || '';
      if (
        (pageText.includes('<FatturaElettronica') ||
          pageText.includes(':FatturaElettronica') ||
          pageText.includes('FatturaElettronicaHeader')) &&
        (pageText.includes('CedentePrestatore') || pageText.includes('DatiGenerali'))
      ) {
        return pageText.trim();
      }
      return null;
    }

    const detectedXml = getPageXml();

    // Listen for messages from popup or background
    chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      if (message.type === 'CHECK_FE_XML') {
        const xml = getPageXml();
        sendResponse({ hasXml: !!xml, xml });
      }
      return true;
    });

    // If XML detected on page, inject a discreet, sleek floating banner
    if (detectedXml && !document.getElementById('fe-viewer-floating-banner')) {
      const banner = document.createElement('div');
      banner.id = 'fe-viewer-floating-banner';
      banner.style.position = 'fixed';
      banner.style.bottom = '24px';
      banner.style.right = '24px';
      banner.style.zIndex = '2147483647';
      banner.style.backgroundColor = '#1e293b';
      banner.style.color = '#ffffff';
      banner.style.padding = '12px 18px';
      banner.style.borderRadius = '12px';
      banner.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)';
      banner.style.display = 'flex';
      banner.style.alignItems = 'center';
      banner.style.gap = '14px';
      banner.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      banner.style.fontSize = '13px';
      banner.style.border = '1px solid #334155';

      banner.innerHTML = `
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:16px;">🧾</span>
          <span style="font-weight:600;">Fattura Elettronica Rilevata</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button id="fe-viewer-open-btn" style="background:#2563eb;color:#fff;border:none;padding:6px 14px;border-radius:6px;font-weight:600;font-size:12px;cursor:pointer;display:flex;align-items:center;gap:6px;">
            Visualizza Graficamente ➔
          </button>
          <button id="fe-viewer-close-btn" style="background:transparent;color:#94a3b8;border:none;padding:4px 8px;font-size:16px;cursor:pointer;">
            ✕
          </button>
        </div>
      `;

      document.body.appendChild(banner);

      document.getElementById('fe-viewer-close-btn')?.addEventListener('click', () => {
        banner.remove();
      });

      document.getElementById('fe-viewer-open-btn')?.addEventListener('click', async () => {
        try {
          await chrome.storage.local.set({
            pendingInvoiceXml: detectedXml,
            pendingInvoiceFileName: 'fattura_rilevata.xml',
          });
          const viewerUrl = chrome.runtime.getURL('/viewer.html');
          window.open(viewerUrl, '_blank');
        } catch (err) {
          console.error('Error opening viewer:', err);
        }
      });
    }
  },
});
