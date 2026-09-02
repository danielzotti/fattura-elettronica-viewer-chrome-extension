import React, { useState, useEffect, useRef } from 'react';
import type { FatturaElettronica } from '../../src/lib/types';
import { parseFatturaElettronica } from '../../src/lib/xml-parser';
import { SAMPLES } from '../../src/lib/sample-invoices';
import { exportInvoiceToPdf, triggerPrint } from '../../src/lib/pdf-export';
import { InvoiceHeader } from '../../src/components/InvoiceHeader';
import { CompanyCard } from '../../src/components/CompanyCard';
import { InvoiceTotalsSummary } from '../../src/components/InvoiceTotalsSummary';
import { LinesTable } from '../../src/components/LinesTable';
import { VatSummaryTable } from '../../src/components/VatSummaryTable';
import { PaymentDetails } from '../../src/components/PaymentDetails';
import { AdministrativeDetails } from '../../src/components/AdministrativeDetails';
import { AttachmentsViewer } from '../../src/components/AttachmentsViewer';
import { RawXmlViewer } from '../../src/components/RawXmlViewer';
import { DropZone } from '../../src/components/DropZone';
import {
  FileText,
  FileCode,
  Paperclip,
  Calculator,
  ShieldAlert,
  Sun,
  Moon,
  Receipt,
  Layers,
  Sparkles,
  Info,
  FileUp,
} from 'lucide-react';

type TabKey = 'visual' | 'admin' | 'vat' | 'attachments' | 'xml';

export default function App() {
  const [invoice, setInvoice] = useState<FatturaElettronica | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('visual');
  const [activeBodyIndex, setActiveBodyIndex] = useState<number>(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportProgress, setExportProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const invoiceSheetRef = useRef<HTMLDivElement>(null);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('fe_viewer_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('fe_viewer_theme', newTheme);
  };

  // Check storage or query params on load
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // 1. Check URL parameters (e.g. ?sample=commercial-sample)
        const params = new URLSearchParams(window.location.search);
        const sampleId = params.get('sample');
        if (sampleId) {
          const sample = SAMPLES.find((s) => s.id === sampleId);
          if (sample) {
            handleLoadXml(sample.xml, `${sample.id}.xml`);
            return;
          }
        }

        // 2. Check chrome.storage.local for pending invoice
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
          const result = (await chrome.storage.local.get(['pendingInvoiceXml', 'pendingInvoiceFileName'])) as {
            pendingInvoiceXml?: string;
            pendingInvoiceFileName?: string;
          };
          if (result.pendingInvoiceXml) {
            handleLoadXml(result.pendingInvoiceXml, result.pendingInvoiceFileName || 'fattura.xml');
            // Clear pending
            await chrome.storage.local.remove(['pendingInvoiceXml', 'pendingInvoiceFileName']);
            return;
          }
        }
      } catch (err: any) {
        console.error('Failed to load initial invoice', err);
      }
    };

    loadInitialData();
  }, []);

  const handleLoadXml = (xmlContent: string, fileName?: string) => {
    try {
      setError(null);
      const parsed = parseFatturaElettronica(xmlContent, fileName);
      setInvoice(parsed);
      setActiveBodyIndex(0);
      setActiveTab('visual');
    } catch (err: any) {
      console.error('XML parse error:', err);
      setError(err.message || 'Errore durante la lettura della fattura elettronica.');
    }
  };

  const handleExportPdf = async () => {
    if (!invoiceSheetRef.current || !invoice) return;
    const body = invoice.body[activeBodyIndex];
    const docNum = body?.datiGenerali.datiGeneraliDocumento.numero || 'Doc';
    const docDate = body?.datiGenerali.datiGeneraliDocumento.data || '';
    const safeName = `Fattura_${docNum}_${docDate}`.replace(/[\/\s:]/g, '_');

    setIsExportingPdf(true);
    setExportProgress('Generazione PDF in corso...');

    try {
      await exportInvoiceToPdf(invoiceSheetRef.current, {
        fileName: `${safeName}.pdf`,
        onProgress: (status) => setExportProgress(status),
      });
    } catch (err: any) {
      console.error('PDF export error:', err);
      alert(`Errore esportazione PDF: ${err.message}`);
    } finally {
      setIsExportingPdf(false);
      setExportProgress(null);
    }
  };

  const currentBody = invoice?.body[activeBodyIndex];
  const currency = currentBody?.datiGenerali.datiGeneraliDocumento.divisa || 'EUR';
  const totalAttachments = currentBody?.allegati?.length || 0;

  return (
    <div className="app-container">
      {/* Top sticky Navigation */}
      <header className="top-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: invoice ? 'pointer' : 'default',
            }}
            onClick={() => invoice && setInvoice(null)}
            title={invoice ? 'Torna alla schermata di caricamento' : undefined}
          >
            <Receipt size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Fattura Elettronica Viewer
              <span className="badge badge-primary" style={{ fontSize: '10px', padding: '2px 6px' }}>
                WXT MV3
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Visualizzatore grafico &amp; esportazione PDF per Fatture SDI, UBL &amp; CII (EN 16931)
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {invoice && (
            <button
              type="button"
              onClick={() => setInvoice(null)}
              className="btn btn-secondary btn-sm"
              title="Carica un'altra fattura elettronica"
            >
              <FileUp size={14} />
              <span>Nuovo Caricamento</span>
            </button>
          )}

          {/* Theme switch */}
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-secondary btn-sm"
            title={theme === 'light' ? 'Attiva Dark Mode' : 'Attiva Light Mode'}
          >
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            <span>{theme === 'light' ? 'Tema Scuro' : 'Tema Chiaro'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {error && (
          <div
            style={{
              backgroundColor: 'var(--danger-subtle)',
              color: 'var(--danger-text)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--danger)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldAlert size={20} />
              <span>{error}</span>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setError(null);
                setInvoice(null);
              }}
            >
              Riprova con un altro file
            </button>
          </div>
        )}

        {!invoice ? (
          <DropZone onLoadXml={handleLoadXml} />
        ) : (
          <div>
            {/* View Tabs Selector */}
            <nav className="tabs-nav no-print">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'visual' ? 'active' : ''}`}
                onClick={() => setActiveTab('visual')}
              >
                <FileText size={16} /> Fattura Grafica
              </button>

              <button
                type="button"
                className={`tab-btn ${activeTab === 'vat' ? 'active' : ''}`}
                onClick={() => setActiveTab('vat')}
              >
                <Calculator size={16} /> Riepilogo Fiscale &amp; IVA
              </button>

              <button
                type="button"
                className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
                onClick={() => setActiveTab('admin')}
              >
                <Layers size={16} /> Dati Amministrativi
              </button>

              {totalAttachments > 0 && (
                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'attachments' ? 'active' : ''}`}
                  onClick={() => setActiveTab('attachments')}
                >
                  <Paperclip size={16} /> Allegati ({totalAttachments})
                </button>
              )}

              <button
                type="button"
                className={`tab-btn ${activeTab === 'xml' ? 'active' : ''}`}
                onClick={() => setActiveTab('xml')}
              >
                <FileCode size={16} /> Codice Sorgente XML
              </button>
            </nav>

            {/* Export PDF Status Banner */}
            {isExportingPdf && exportProgress && (
              <div
                style={{
                  backgroundColor: 'var(--primary-subtle)',
                  color: 'var(--primary-text)',
                  border: '1px solid var(--primary-border)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '13px',
                }}
              >
                <Sparkles size={18} className="animate-spin" />
                <span>{exportProgress}</span>
              </div>
            )}

            {/* Active Tab View */}
            {activeTab === 'visual' && currentBody && (
              <div id="invoice-printable-sheet" ref={invoiceSheetRef} className="invoice-sheet">
                {/* Header */}
                <InvoiceHeader
                  invoice={invoice}
                  activeBodyIndex={activeBodyIndex}
                  onSelectBody={setActiveBodyIndex}
                  onExportPdf={handleExportPdf}
                  onPrint={triggerPrint}
                  onReset={() => setInvoice(null)}
                  isExportingPdf={isExportingPdf}
                />

                {/* Cedente & Cessionario Cards */}
                <div className="grid-2" style={{ marginBottom: '24px' }}>
                  <CompanyCard
                    type="cedente"
                    data={invoice.header.cedentePrestatore}
                  />
                  <CompanyCard
                    type="cessionario"
                    data={invoice.header.cessionarioCommittente}
                    trasmissione={invoice.header.datiTrasmissione}
                  />
                </div>

                {/* KPI Totals */}
                <InvoiceTotalsSummary body={currentBody} />

                {/* Goods and Services Lines Table */}
                <div style={{ marginTop: '24px' }}>
                  <LinesTable
                    lines={currentBody.datiBeniServizi.dettaglioLinee}
                    currency={currency}
                  />
                </div>

                {/* VAT Summary Table */}
                <div style={{ marginTop: '24px' }}>
                  <VatSummaryTable
                    summary={currentBody.datiBeniServizi.datiRiepilogo}
                    currency={currency}
                  />
                </div>

                {/* Payment Details */}
                {currentBody.datiPagamento && currentBody.datiPagamento.length > 0 && (
                  <div style={{ marginTop: '24px' }}>
                    <PaymentDetails
                      payments={currentBody.datiPagamento}
                      currency={currency}
                    />
                  </div>
                )}

                {/* Administrative & Order Info */}
                <div style={{ marginTop: '24px' }}>
                  <AdministrativeDetails invoice={invoice} body={currentBody} />
                </div>

                {/* Embedded Attachments in visual tab if any */}
                {totalAttachments > 0 && (
                  <div style={{ marginTop: '24px' }}>
                    <AttachmentsViewer attachments={currentBody.allegati} />
                  </div>
                )}

                {/* Document Footer */}
                <footer
                  style={{
                    marginTop: '36px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    color: 'var(--text-subtle)',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  <div>
                    Documento generato da Fattura Elettronica Viewer • Standard {invoice.versione.includes('UBL') || invoice.versione.includes('CII') ? 'Europeo EN 16931' : 'SDI Agenzia delle Entrate'}
                  </div>
                  <div>
                    Formato: <code>{invoice.versione}</code>
                    {invoice.header.datiTrasmissione.idTrasmittente ? (
                      <>
                        {' '}• Trasmittente:{' '}
                        <code>
                          {invoice.header.datiTrasmissione.idTrasmittente?.idPaese}
                          {invoice.header.datiTrasmissione.idTrasmittente?.idCodice}
                        </code>
                      </>
                    ) : (
                      invoice.header.datiTrasmissione.codiceDestinatario && invoice.header.datiTrasmissione.codiceDestinatario !== '0000000' && (
                        <>
                          {' '}• Destinatario/Endpoint: <code>{invoice.header.datiTrasmissione.codiceDestinatario}</code>
                        </>
                      )
                    )}
                  </div>
                </footer>
              </div>
            )}

            {activeTab === 'vat' && currentBody && (
              <div className="invoice-sheet">
                <InvoiceTotalsSummary body={currentBody} />
                <div style={{ marginTop: '20px' }}>
                  <VatSummaryTable summary={currentBody.datiBeniServizi.datiRiepilogo} currency={currency} />
                </div>
              </div>
            )}

            {activeTab === 'admin' && currentBody && (
              <div className="invoice-sheet">
                <AdministrativeDetails invoice={invoice} body={currentBody} />
              </div>
            )}

            {activeTab === 'attachments' && currentBody && (
              <div className="invoice-sheet">
                <AttachmentsViewer attachments={currentBody.allegati} />
              </div>
            )}

            {activeTab === 'xml' && (
              <div className="invoice-sheet">
                <RawXmlViewer xml={invoice.rawXml} fileName={invoice.fileName} />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
