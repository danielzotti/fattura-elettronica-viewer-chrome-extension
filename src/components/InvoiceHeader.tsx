import React from 'react';
import type { FatturaElettronica } from '../lib/types';
import { getTipoDocumentoInfo, formatDate } from '../lib/sdi-codes';
import { FileDown, Printer, RefreshCw, Layers } from 'lucide-react';

interface InvoiceHeaderProps {
  invoice: FatturaElettronica;
  activeBodyIndex: number;
  onSelectBody: (index: number) => void;
  onExportPdf: () => void;
  onPrint: () => void;
  onReset: () => void;
  isExportingPdf?: boolean;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({
  invoice,
  activeBodyIndex,
  onSelectBody,
  onExportPdf,
  onPrint,
  onReset,
  isExportingPdf = false,
}) => {
  const currentBody = invoice.body[activeBodyIndex];
  const dgd = currentBody?.datiGenerali.datiGeneraliDocumento;
  const tipoDoc = dgd?.tipoDocumento || 'TD01';
  const docInfo = getTipoDocumentoInfo(tipoDoc);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        marginBottom: '22px',
        paddingBottom: '18px',
        borderBottom: '2px solid var(--border-color)',
      }}
    >
      <div style={{ flex: '1 1 300px', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
          <span
            className={`badge ${docInfo.isCredit ? 'badge-warning' : 'badge-primary'}`}
            style={{ fontSize: '12px', padding: '3px 8px' }}
          >
            {tipoDoc} • {docInfo.label}
          </span>

          <span className="badge badge-outline" style={{ fontSize: '11px' }}>
            {invoice.versione}
          </span>

          {invoice.body.length > 1 && (
            <span className="badge" style={{ backgroundColor: '#e0e7ff', color: '#3730a3', fontSize: '11px' }}>
              <Layers size={12} style={{ marginRight: '4px' }} />
              Doc {activeBodyIndex + 1}/{invoice.body.length}
            </span>
          )}
        </div>

        <h1 style={{ fontSize: 'clamp(20px, 3.5vw, 26px)', fontWeight: 800, color: 'var(--text-main)', margin: '4px 0', wordBreak: 'break-word' }}>
          Fattura N. <span style={{ color: 'var(--primary)' }}>{dgd?.numero || '-'}</span>
        </h1>

        <div style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
          <span>Data Emissione: <strong>{formatDate(dgd?.data)}</strong></span>
          {invoice.fileName && (
            <span style={{ opacity: 0.85, wordBreak: 'break-all' }}>
              • File: <code>{invoice.fileName}</code>
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className="no-print no-pdf"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          flex: '1 1 auto',
          justifyContent: 'flex-start',
        }}
      >
        {invoice.body.length > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Lotto:</span>
            {invoice.body.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`btn btn-sm ${activeBodyIndex === idx ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => onSelectBody(idx)}
                style={{ minWidth: '32px' }}
              >
                #{idx + 1}
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={onExportPdf}
          disabled={isExportingPdf}
          className="btn btn-primary"
          title="Esporta fattura in PDF ad alta fedeltà A4"
        >
          <FileDown size={15} />
          <span>{isExportingPdf ? 'Esportazione...' : 'Esporta PDF'}</span>
        </button>

        <button
          type="button"
          onClick={onPrint}
          className="btn btn-secondary"
          title="Stampa documento con il browser"
        >
          <Printer size={15} />
          <span>Stampa</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="btn btn-secondary"
          title="Carica un'altra fattura elettronica"
        >
          <RefreshCw size={15} />
          <span>Altra</span>
        </button>
      </div>
    </div>
  );
};
