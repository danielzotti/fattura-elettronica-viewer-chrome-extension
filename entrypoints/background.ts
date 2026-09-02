export default defineBackground(() => {
  chrome.runtime.onInstalled.addListener(() => {
    // Create Context Menu Items
    chrome.contextMenus.create({
      id: 'open-viewer-page',
      title: 'Apri Fattura Elettronica Viewer',
      contexts: ['action'],
    });

    chrome.contextMenus.create({
      id: 'view-selected-xml',
      title: 'Visualizza testo XML con Fattura Elettronica Viewer',
      contexts: ['selection'],
    });

    chrome.contextMenus.create({
      id: 'view-link-xml',
      title: 'Apri link fattura con Fattura Elettronica Viewer',
      contexts: ['link'],
    });
  });

  chrome.contextMenus.onClicked.addListener(async (info) => {
    const viewerUrl = chrome.runtime.getURL('/viewer.html');

    if (info.menuItemId === 'open-viewer-page') {
      await chrome.tabs.create({ url: viewerUrl });
    } else if (info.menuItemId === 'view-selected-xml' && info.selectionText) {
      await chrome.storage.local.set({
        pendingInvoiceXml: info.selectionText,
        pendingInvoiceFileName: 'selezione_testo.xml',
      });
      await chrome.tabs.create({ url: viewerUrl });
    } else if (info.menuItemId === 'view-link-xml' && info.linkUrl) {
      try {
        const response = await fetch(info.linkUrl);
        const text = await response.text();
        await chrome.storage.local.set({
          pendingInvoiceXml: text,
          pendingInvoiceFileName: info.linkUrl.split('/').pop() || 'fattura_link.xml',
        });
        await chrome.tabs.create({ url: viewerUrl });
      } catch (err) {
        console.error('Failed to fetch XML from link:', err);
        await chrome.tabs.create({ url: viewerUrl });
      }
    }
  });
});
