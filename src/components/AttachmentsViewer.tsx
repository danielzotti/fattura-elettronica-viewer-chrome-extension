import React from 'react';
import type { Allegato } from '../lib/types';
import { Paperclip, Download, FileText } from 'lucide-react';

interface AttachmentsViewerProps {
  attachments?: Allegato[];
}

export const AttachmentsViewer: React.FC<AttachmentsViewerProps> = ({ attachments }) => {
  if (!attachments || attachments.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
        <Paperclip size={32} style={{ opacity: 0.5, marginBottom: '8px' }} />
        <p>Nessun allegato incorporato in questo documento XML.</p>
      </div>
    );
  }

  const handleDownload = (allegato: Allegato) => {
    try {
      const byteCharacters = atob(allegato.attachment.replace(/\s/g, ''));
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const mimeType = allegato.formatoAttachment
        ? `application/${allegato.formatoAttachment.toLowerCase()}`
        : 'application/octet-stream';
      const blob = new Blob([byteArray], { type: mimeType });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = allegato.nomeAttachment || 'allegato';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      alert('Impossibile decodificare l’allegato Base64.');
    }
  };

  return (
    <div>
      <div className="section-title">
        <Paperclip size={16} /> Allegati ({attachments.length})
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {attachments.map((att, idx) => (
          <div key={idx} className="company-card" style={{ padding: '16px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--primary-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-text)',
                  flexShrink: 0,
                }}
              >
                <FileText size={20} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '14px', wordBreak: 'break-all', color: 'var(--text-main)' }}>
                  {att.nomeAttachment}
                </div>
                {att.descrizioneAttachment && (
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {att.descrizioneAttachment}
                  </div>
                )}
                <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginTop: '4px' }}>
                  {att.formatoAttachment ? `Formato: ${att.formatoAttachment.toUpperCase()} • ` : ''}
                  {att.dimensioneBytes ? `${(att.dimensioneBytes / 1024).toFixed(1)} KB` : 'Allegato binario'}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => handleDownload(att)}
                className="btn btn-secondary btn-sm"
              >
                <Download size={14} /> Scarica Allegato
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
