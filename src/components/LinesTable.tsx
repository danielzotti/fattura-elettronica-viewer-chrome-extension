import React, { useState } from 'react';
import type { DettaglioLinea } from '../lib/types';
import { formatCurrency, formatDate, getNaturaIvaDesc } from '../lib/sdi-codes';
import { Search, Tag, Package } from 'lucide-react';

interface LinesTableProps {
  lines: DettaglioLinea[];
  currency?: string;
}

export const LinesTable: React.FC<LinesTableProps> = ({ lines, currency = 'EUR' }) => {
  const [searchTerm, setSearchTerm] = useState('');

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
          gap: '12px',
        }}
      >
        <div className="section-title" style={{ margin: 0 }}>
          <Package size={16} /> Dettaglio Beni e Servizi ({lines.length} {lines.length === 1 ? 'linea' : 'linee'})
        </div>

        {lines.length > 3 && (
          <div style={{ position: 'relative', width: '260px' }} className="no-print no-pdf">
            <Search
              size={14}
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              placeholder="Cerca linea o codice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 12px 6px 32px',
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
      </div>

      <div className="table-wrapper">
        <table className="invoice-table">
          <thead>
            <tr>
              <th style={{ width: '40px', textAlign: 'center' }}>#</th>
              <th>Descrizione / Articolo</th>
              <th style={{ textAlign: 'right' }}>Quantità</th>
              <th style={{ textAlign: 'right' }}>Prezzo Unitario</th>
              <th style={{ textAlign: 'center' }}>Sconto</th>
              <th style={{ textAlign: 'right' }}>Totale Riga</th>
              <th style={{ textAlign: 'center' }}>IVA %</th>
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
