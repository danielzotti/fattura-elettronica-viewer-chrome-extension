import React, { useState } from 'react';
import { CopyButton } from './CopyButton';
import { Code, Download, Search } from 'lucide-react';

interface RawXmlViewerProps {
  xml?: string;
  fileName?: string;
}

export const RawXmlViewer: React.FC<RawXmlViewerProps> = ({ xml = '', fileName = 'fattura.xml' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDownload = () => {
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.endsWith('.xml') ? fileName : `${fileName}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div className="section-title" style={{ margin: 0, flex: '1 1 auto' }}>
          <Code size={16} /> Sorgente XML Fattura Elettronica
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', width: '100%', maxWidth: '420px' }}>
          <div style={{ position: 'relative', flex: '1 1 160px', minWidth: '130px' }}>
            <Search
              size={14}
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              placeholder="Cerca nel codice XML..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 12px 6px 30px',
                fontSize: '12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-main)',
                outline: 'none',
              }}
            />
          </div>

          <CopyButton text={xml} label="Copia" className="btn btn-secondary btn-sm" />

          <button type="button" onClick={handleDownload} className="btn btn-secondary btn-sm">
            <Download size={14} /> Salva
          </button>
        </div>
      </div>

      <pre className="xml-container" style={{ maxHeight: '600px', overflowY: 'auto' }}>
        <code>{xml}</code>
      </pre>
    </div>
  );
};
