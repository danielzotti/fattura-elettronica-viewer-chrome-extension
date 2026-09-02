import React, { useState, useRef } from 'react';
import { SAMPLES } from '../lib/sample-invoices';
import { Upload, FileText, Clipboard, Sparkles, AlertCircle, ShieldCheck, ArrowRight, X } from 'lucide-react';

interface DropZoneProps {
  onLoadXml: (xmlContent: string, fileName?: string) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ onLoadXml }) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'paste'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setErrorMessage(null);
    const reader = new FileReader();
    const isP7m = file.name.toLowerCase().endsWith('.p7m');

    if (isP7m) {
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        try {
          const buffer = e.target?.result as ArrayBuffer;
          const decoder = new TextDecoder('utf-8', { fatal: false });
          const text = decoder.decode(buffer);
          onLoadXml(text, file.name);
        } catch (err: any) {
          setErrorMessage(`Errore lettura file firmato P7M: ${err.message}`);
        }
      };
    } else {
      reader.readAsText(file);
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          onLoadXml(text, file.name);
        } catch (err: any) {
          setErrorMessage(`Errore lettura file XML: ${err.message}`);
        }
      };
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFile(droppedFile);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handlePasteSubmit = () => {
    if (!pastedText.trim()) return;
    try {
      setErrorMessage(null);
      onLoadXml(pastedText, 'fattura_incollata.xml');
      setPastedText('');
    } catch (err: any) {
      setErrorMessage(`Errore XML: ${err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Privacy Guarantee Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '10px 16px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--success-subtle)',
          border: '1px solid var(--border-color)',
          color: 'var(--success-text)',
          fontSize: '12px',
          fontWeight: 500,
        }}
      >
        <ShieldCheck size={16} />
        <span>
          <strong>100% Privato &amp; Client-Side:</strong> Le fatture vengono elaborate esclusivamente nel tuo browser. Nessun dato fiscale viene inviato a server esterni.
        </span>
      </div>

      {errorMessage && (
        <div
          style={{
            backgroundColor: 'var(--danger-subtle)',
            color: 'var(--danger-text)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--danger)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
          }}
        >
          <AlertCircle size={16} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Container Card */}
      <div className="invoice-sheet" style={{ padding: '28px 32px' }}>
        {/* Mode Selector Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px',
            backgroundColor: 'var(--bg-card-subtle)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '24px',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveMode('upload')}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeMode === 'upload' ? 'var(--bg-card)' : 'transparent',
              color: activeMode === 'upload' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: activeMode === 'upload' ? 700 : 500,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: activeMode === 'upload' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <Upload size={16} />
            <span>Carica File XML / P7M</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('paste')}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeMode === 'paste' ? 'var(--bg-card)' : 'transparent',
              color: activeMode === 'paste' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: activeMode === 'paste' ? 700 : 500,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: activeMode === 'paste' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <Clipboard size={16} />
            <span>Incolla Codice XML</span>
          </button>
        </div>

        {/* Upload Mode */}
        {activeMode === 'upload' && (
          <div
            className={`dropzone-container ${isDragging ? 'dragging' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              accept=".xml,.p7m,.xml.p7m"
              style={{ display: 'none' }}
            />

            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-subtle)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <Upload size={28} />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
              Trascina qui il file della Fattura Elettronica
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px', maxWidth: '500px', margin: '0 auto 20px' }}>
              Seleziona o trascina un file fattura in formato <strong>.xml</strong> o firmato digitalmente <strong>.xml.p7m</strong>
            </p>

            <button
              type="button"
              className="btn btn-primary"
              style={{ padding: '10px 24px', fontSize: '14px', margin: '0 auto' }}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <FileText size={16} /> Sfoglia File dal Computer
            </button>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '20px',
                flexWrap: 'wrap',
              }}
            >
              <span className="badge badge-outline" style={{ fontSize: '11px' }}>FPR12 (B2B/B2C)</span>
              <span className="badge badge-outline" style={{ fontSize: '11px' }}>FPA12 (Pubblica Amm.)</span>
              <span className="badge badge-outline" style={{ fontSize: '11px' }}>FSM10 (Semplificata)</span>
              <span className="badge badge-outline" style={{ fontSize: '11px' }}>PKCS#7 (.p7m)</span>
            </div>
          </div>
        )}

        {/* Paste XML Mode */}
        {activeMode === 'paste' && (
          <div>
            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                Inserisci il codice XML completo:
              </label>
              {pastedText.trim() && (
                <button
                  type="button"
                  onClick={() => setPastedText('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                  }}
                >
                  <X size={13} /> Svuota testo
                </button>
              )}
            </div>

            <textarea
              rows={12}
              placeholder="Incolla qui il codice sorgente XML (es. <p:FatturaElettronica ...>)..."
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              style={{
                width: '100%',
                padding: '14px',
                fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, monospace",
                fontSize: '12px',
                lineHeight: '1.5',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-card-subtle)',
                color: 'var(--text-main)',
                resize: 'vertical',
                outline: 'none',
                marginBottom: '16px',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-primary"
                style={{ padding: '10px 24px', fontSize: '14px' }}
                onClick={handlePasteSubmit}
                disabled={!pastedText.trim()}
              >
                Visualizza Fattura Graficamente <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sample Invoices Quick Load */}
      <div className="company-card" style={{ padding: '22px' }}>
        <div className="section-title" style={{ marginBottom: '14px' }}>
          <Sparkles size={16} color="var(--primary)" /> Oppure esplora con una Fattura di Esempio:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {SAMPLES.map((sample) => (
            <div
              key={sample.id}
              onClick={() => onLoadXml(sample.xml, `${sample.id}.xml`)}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-card)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-main)', marginBottom: '6px' }}>
                  {sample.name}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  {sample.subtitle}
                </div>
              </div>
              <div
                style={{
                  marginTop: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--primary)',
                }}
              >
                Apri esempio <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
