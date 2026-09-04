import React from 'react';
import type { DatiRiepilogoIVA } from '../lib/types';
import { formatCurrency, getNaturaIvaDesc, getEsigibilitaIvaInfo } from '../lib/sdi-codes';
import { Calculator } from 'lucide-react';

interface VatSummaryTableProps {
  summary: DatiRiepilogoIVA[];
  currency?: string;
}

export const VatSummaryTable: React.FC<VatSummaryTableProps> = ({ summary, currency = 'EUR' }) => {
  const totalImponibile = summary.reduce((acc, s) => acc + (s.imponibileImporto || 0), 0);
  const totalImposta = summary.reduce((acc, s) => acc + (s.imposta || 0), 0);

  return (
    <div>
      <div className="section-title">
        <Calculator size={16} /> Riepilogo Aliquote e Imposte IVA
      </div>

      <div className="table-wrapper">
        <table className="invoice-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'center', width: '13%' }}>Aliquota IVA</th>
              <th style={{ width: '25%' }}>Natura / Esenzione</th>
              <th style={{ textAlign: 'right', width: '18%' }}>Imponibile / Importo</th>
              <th style={{ textAlign: 'right', width: '14%' }}>Imposta</th>
              <th style={{ textAlign: 'center', width: '14%' }}>Esigibilità IVA</th>
              <th style={{ width: '16%' }}>Riferimento Normativo</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((row, idx) => {
              const esigibilita = getEsigibilitaIvaInfo(row.esigibilitaIVA);

              return (
                <tr key={idx}>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>
                    <span className={`badge ${row.aliquotaIVA > 0 ? 'badge-primary' : 'badge-outline'}`}>
                      {row.aliquotaIVA.toFixed(2).replace(/\.00$/, '')}%
                    </span>
                  </td>
                  <td>
                    {row.natura ? (
                      <span title={getNaturaIvaDesc(row.natura)} style={{ fontWeight: 500 }}>
                        {getNaturaIvaDesc(row.natura)}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>Ordinaria</span>
                    )}
                  </td>
                  <td className="table-num" style={{ fontWeight: 600 }}>
                    {formatCurrency(row.imponibileImporto, currency)}
                  </td>
                  <td className="table-num" style={{ fontWeight: 600 }}>
                    {formatCurrency(row.imposta, currency)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {esigibilita ? (
                      <span className="badge" style={{ backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-color)' }}>
                        {esigibilita.label}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {row.riferimentoNormativo || '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr style={{ fontWeight: 700, backgroundColor: 'var(--bg-card-subtle)' }}>
              <td colSpan={2} style={{ textAlign: 'right' }}>
                TOTALI:
              </td>
              <td className="table-num" style={{ color: 'var(--primary-text)' }}>
                {formatCurrency(totalImponibile, currency)}
              </td>
              <td className="table-num" style={{ color: 'var(--primary-text)' }}>
                {formatCurrency(totalImposta, currency)}
              </td>
              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
