import React, { useState } from 'react';
import type { DettaglioLinea } from '../lib/types';
import { formatCurrency, formatDate, getNaturaIvaDesc } from '../lib/sdi-codes';
import { Search, Tag, Package, LayoutList, Table as TableIcon } from 'lucide-react';

interface LinesTableProps {
  lines: DettaglioLinea[];
  currency?: string;
}

export const LinesTable: React.FC<LinesTableProps> = ({ lines, currency = 'EUR' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const filteredLines = lines.filter((l) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const descMatch = l.descrizione?.toLowerCase().includes(term);
    const skuMatch = l.codiciArticolo?.some(
      (c) => c.codiceValore.toLowerCase().includes(term) || c.codiceTipo.toLowerCase().includes(term)
    );
    const lineNumMatch = String(l.numeroLinea) === term;
    return descMatch || skuMatch || lineNumMatch;
  });

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
          <Package size={16} /> Dettaglio Beni e Servizi ({lines.length} {lines.length === 1 ? 'linea' : 'linee'})
        </div>

        <div className="no-print no-pdf" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', width: '100%', maxWidth: '380px' }}>
          {lines.length > 2 && (
            <div style={{ position: 'relative', flex: '1 1 180px', minWidth: '140px' }}>
              <Search
                size={14}
                style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
              />
              <input
                type="text"
                placeholder="Cerca linea..."
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
          )}

          {/* View Mode Toggle */}
          <div style={{ display: 'inline-flex', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', padding: '2px', backgroundColor: 'var(--bg-card-subtle)' }}>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`btn-icon ${viewMode === 'table' ? 'active' : ''}`}
              style={{
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: viewMode === 'table' ? 'var(--bg-card)' : 'transparent',
                color: viewMode === 'table' ? 'var(--primary)' : 'var(--text-muted)',
                boxShadow: viewMode === 'table' ? 'var(--shadow-sm)' : 'none',
              }}
              title="Vista Tabellare"
              aria-label="Vista Tabella"
            >
              <TableIcon size={14} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`btn-icon ${viewMode === 'cards' ? 'active' : ''}`}
              style={{
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: viewMode === 'cards' ? 'var(--bg-card)' : 'transparent',
                color: viewMode === 'cards' ? 'var(--primary)' : 'var(--text-muted)',
                boxShadow: viewMode === 'cards' ? 'var(--shadow-sm)' : 'none',
              }}
              title="Vista a Schede (Mobile)"
              aria-label="Vista a Schede"
            >
              <LayoutList size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Cards View (Mobile-optimized) */}
      {viewMode === 'cards' && (
        <div className="lines-cards-container no-print">
          {filteredLines.map((line) => {
            const hasDiscounts = line.scontiMaggiorazioni && line.scontiMaggiorazioni.length > 0;
            const discountText = hasDiscounts
              ? line.scontiMaggiorazioni!
                  .map((s) => {
                    if (s.percentuale !== undefined) return `${s.tipo === 'SC' ? '-' : '+'}${s.percentuale}%`;
                    if (s.importo !== undefined) return `${s.tipo === 'SC' ? '-' : '+'}${formatCurrency(s.importo, currency)}`;
                    return s.tipo;
                  })
                  .join(', ')
              : null;

            return (
              <div key={line.numeroLinea} className="line-item-card">
                <div className="line-item-header">
                  <span className="line-item-num-badge">#{line.numeroLinea}</span>
                  <div className="line-item-title">{line.descrizione}</div>
                </div>

                {line.codiciArticolo && line.codiciArticolo.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {line.codiciArticolo.map((ca, idx) => (
                      <span key={idx} className="badge badge-outline" style={{ fontSize: '11px' }}>
                        <Tag size={10} style={{ marginRight: '3px' }} />
                        {ca.codiceTipo ? `${ca.codiceTipo}: ` : ''}
                        <code>{ca.codiceValore}</code>
                      </span>
                    ))}
                  </div>
                )}

                <div className="line-item-grid">
                  <div>
                    <div className="line-item-stat-label">Quantità</div>
                    <div className="line-item-stat-val">
                      {line.quantita !== undefined ? `${line.quantita.toLocaleString('it-IT')} ${line.unitaMisura || ''}` : '1'}
                    </div>
                  </div>

                  <div>
                    <div className="line-item-stat-label">Prezzo Unitario</div>
                    <div className="line-item-stat-val">{formatCurrency(line.prezzoUnitario, currency)}</div>
                  </div>

                  {discountText && (
                    <div>
                      <div className="line-item-stat-label">Sconto / Magg.</div>
                      <div className="line-item-stat-val" style={{ color: 'var(--warning-text)' }}>{discountText}</div>
                    </div>
                  )}

                  <div>
                    <div className="line-item-stat-label">Aliquota IVA</div>
                    <div className="line-item-stat-val">
                      <span className={`badge ${line.aliquotaIVA > 0 ? 'badge-primary' : 'badge-outline'}`} style={{ fontSize: '11px' }}>
                        {line.aliquotaIVA.toFixed(2).replace(/\.00$/, '')}%
                        {line.natura && ` (${line.natura})`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="line-item-footer">
                  <span className="line-item-total-label">Totale Linea:</span>
                  <span className="line-item-total-val">{formatCurrency(line.prezzoTotale, currency)}</span>
                </div>
              </div>
            );
          })}

          {filteredLines.length === 0 && (
            <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
              Nessuna linea trovata con il filtro "{searchTerm}".
            </div>
          )}
        </div>
      )}

      {/* Table View (Default & Printable) */}
      <div className={`table-wrapper ${viewMode === 'cards' ? 'hidden-on-screen-cards' : ''}`}>
        <table className="invoice-table">
          <thead>
            <tr>
              <th style={{ width: '5%', textAlign: 'center' }}>#</th>
              <th style={{ width: '43%' }}>Descrizione / Articolo</th>
              <th style={{ textAlign: 'right', width: '10%' }}>Quantità</th>
              <th style={{ textAlign: 'right', width: '13%' }}>Prezzo Unit.</th>
              <th style={{ textAlign: 'center', width: '8%' }}>Sconto</th>
              <th style={{ textAlign: 'right', width: '13%' }}>Totale Riga</th>
              <th style={{ textAlign: 'center', width: '8%' }}>IVA %</th>
            </tr>
          </thead>
          <tbody>
            {filteredLines.map((line) => {
              const hasDiscounts = line.scontiMaggiorazioni && line.scontiMaggiorazioni.length > 0;
              const discountText = hasDiscounts
                ? line.scontiMaggiorazioni!
                    .map((s) => {
                      if (s.percentuale !== undefined) return `${s.tipo === 'SC' ? '-' : '+'}${s.percentuale}%`;
                      if (s.importo !== undefined) return `${s.tipo === 'SC' ? '-' : '+'}${formatCurrency(s.importo, currency)}`;
                      return s.tipo;
                    })
                    .join(', ')
                : '-';

              return (
                <tr key={line.numeroLinea}>
                  <td style={{ textAlign: 'center', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {line.numeroLinea}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{line.descrizione}</div>

                    {line.codiciArticolo && line.codiciArticolo.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                        {line.codiciArticolo.map((ca, idx) => (
                          <span key={idx} className="badge badge-outline" style={{ fontSize: '11px' }}>
                            <Tag size={10} style={{ marginRight: '3px' }} />
                            {ca.codiceTipo ? `${ca.codiceTipo}: ` : ''}
                            <code>{ca.codiceValore}</code>
                          </span>
                        ))}
                      </div>
                    )}

                    {(line.dataInizioPeriodo || line.dataFinePeriodo) && (
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '3px' }}>
                        Periodo: {formatDate(line.dataInizioPeriodo)} - {formatDate(line.dataFinePeriodo)}
                      </div>
                    )}

                    {line.riferimentoAmministrazione && (
                      <div style={{ fontSize: '11px', color: 'var(--text-subtle)', marginTop: '2px' }}>
                        Rif. Amm.: {line.riferimentoAmministrazione}
                      </div>
                    )}
                  </td>
                  <td className="table-num">
                    {line.quantita !== undefined ? (
                      <>
                        {line.quantita.toLocaleString('it-IT')}
                        {line.unitaMisura && (
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '4px' }}>
                            {line.unitaMisura}
                          </span>
                        )}
                      </>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="table-num">{formatCurrency(line.prezzoUnitario, currency)}</td>
                  <td style={{ textAlign: 'center', color: hasDiscounts ? 'var(--warning-text)' : 'var(--text-muted)' }}>
                    {discountText}
                  </td>
                  <td className="table-num" style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                    {formatCurrency(line.prezzoTotale, currency)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span
                      className={`badge ${line.aliquotaIVA > 0 ? 'badge-primary' : 'badge-outline'}`}
                      title={line.natura ? getNaturaIvaDesc(line.natura) : undefined}
                    >
                      {line.aliquotaIVA.toFixed(2).replace(/\.00$/, '')}%
                      {line.natura && <span style={{ marginLeft: '4px', opacity: 0.85 }}>({line.natura})</span>}
                    </span>
                  </td>
                </tr>
              );
            })}

            {filteredLines.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                  Nessuna linea trovata con il filtro "{searchTerm}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

