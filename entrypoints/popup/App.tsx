import React, { useState, useEffect } from 'react';
import { SAMPLES } from '../../src/lib/sample-invoices';
import { Receipt, ExternalLink, Upload, Clipboard, Sparkles, FileText } from 'lucide-react';
import '../../src/styles/viewer.css';

export default function App() {
  const [hasDetectedXml, setHasDetectedXml] = useState(false);
  const [detectedXmlContent, setDetectedXmlContent] = useState<string | null>(null);
  const [pasteMode, setPasteMode] = useState(false);
  const [pastedXml, setPastedXml] = useState('');

  useEffect(() => {
    // Check active tab content
    const checkTab = async () => {
      try {
        if (typeof chrome === 'undefined' || !chrome.tabs) return;
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab?.id) {
          // Send message or query tab
          chrome.tabs.sendMessage(tab.id, { type: 'CHECK_FE_XML' }, (response) => {
            if (chrome.runtime.lastError) return;
            if (response?.hasXml && response?.xml) {
              setHasDetectedXml(true);
              setDetectedXmlContent(response.xml);
            }
          });
        }
      } catch (e) {
        // ignore
      }
    };
    checkTab();
  }, []);

  const openViewerWithXml = async (xml: string, fileName = 'fattura.xml') => {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        await chrome.storage.local.set({
          pendingInvoiceXml: xml,
          pendingInvoiceFileName: fileName,
        });
        const viewerUrl = chrome.runtime.getURL('/viewer.html');
        await chrome.tabs.create({ url: viewerUrl });
      } else {
        window.open('/viewer.html', '_blank');
      }
    } catch (err) {
      console.error(err);
      window.open('/viewer.html', '_blank');
    }
  };

  const handleOpenEmptyViewer = async () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      const viewerUrl = chrome.runtime.getURL('/viewer.html');
      await chrome.tabs.create({ url: viewerUrl });
    } else {
      window.open('/viewer.html', '_blank');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    const isP7m = file.name.toLowerCase().endsWith('.p7m');

    if (isP7m) {
      reader.readAsArrayBuffer(file);
      reader.onload = (ev) => {
        const buffer = ev.target?.result as ArrayBuffer;
        const decoder = new TextDecoder('utf-8', { fatal: false });
        const text = decoder.decode(buffer);
        openViewerWithXml(text, file.name);
      };
    } else {
      reader.readAsText(file);
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        openViewerWithXml(text, file.name);
      };
    }
  };

  return (
    <div style={{ width: '380px', padding: '18px', backgroundColor: 'var(--bg-app)', color: 'var(--text-main)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Receipt size={18} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px' }}>Fattura Elettronica</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Viewer &amp; Esportazione PDF</div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenEmptyViewer}
          className="btn btn-secondary btn-sm"
          title="Apri il viewer in una nuova scheda"
        >
          <ExternalLink size={13} /> Viewer
        </button>
      </div>

      {/* Detected XML in active tab notification */}
      {hasDetectedXml && detectedXmlContent && (
        <div
          style={{
            backgroundColor: 'var(--primary-subtle)',
            border: '1px solid var(--primary-border)',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
            marginBottom: '14px',
          }}
        >
          <div style={{ fontWeight: 600, fontSize: '12px', color: 'var(--primary-text)', marginBottom: '4px' }}>
            ⚡ XML Fattura rilevato nella scheda corrente!
          </div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ width: '100%', marginTop: '6px' }}
            onClick={() => openViewerWithXml(detectedXmlContent, 'fattura_scheda.xml')}
          >
            Visualizza Graficamente
          </button>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
        <label
          className="btn btn-primary"
          style={{ width: '100%', cursor: 'pointer' }}
        >
          <Upload size={15} /> Carica File XML / P7M
          <input
            type="file"
            accept=".xml,.p7m,.xml.p7m"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>

        <button
          type="button"
          className="btn btn-secondary"
          style={{ width: '100%' }}
          onClick={() => setPasteMode(!pasteMode)}
        >
          <Clipboard size={15} /> Incolla Testo XML
        </button>
      </div>

      {/* Paste text area */}
      {pasteMode && (
        <div style={{ marginBottom: '16px' }}>
          <textarea
            rows={5}
            placeholder="Incolla il codice XML..."
            value={pastedXml}
            onChange={(e) => setPastedXml(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              fontFamily: 'monospace',
              fontSize: '11px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-main)',
              resize: 'none',
              outline: 'none',
              marginBottom: '8px',
            }}
          />
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ width: '100%' }}
            disabled={!pastedXml.trim()}
            onClick={() => openViewerWithXml(pastedXml, 'fattura_incollata.xml')}
          >
            Apri nel Viewer
          </button>
        </div>
      )}

      {/* Quick sample buttons */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={12} color="var(--primary)" /> Esempi Rapidi:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {SAMPLES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => openViewerWithXml(sample.xml, `${sample.id}.xml`)}
              className="btn btn-secondary btn-sm"
              style={{ justifyContent: 'flex-start', textAlign: 'left', padding: '6px 10px' }}
            >
              <FileText size={13} style={{ flexShrink: 0, color: 'var(--primary)' }} />
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <div style={{ fontSize: '12px', fontWeight: 600 }}>{sample.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
