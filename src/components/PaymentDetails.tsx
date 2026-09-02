import React from 'react';
import type { DatiPagamento } from '../lib/types';
import { formatCurrency, formatDate, getCondizioniPagamentoDesc, getModalitaPagamentoDesc } from '../lib/sdi-codes';
import { CopyButton } from './CopyButton';
import { CreditCard, Landmark, Calendar, UserCheck } from 'lucide-react';

interface PaymentDetailsProps {
  payments?: DatiPagamento[];
  currency?: string;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({ payments, currency = 'EUR' }) => {
  if (!payments || payments.length === 0) return null;

  return (
    <div>
      <div className="section-title">
        <CreditCard size={16} /> Modalità e Dati di Pagamento
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {payments.map((pGroup, gIdx) => (
          <div key={gIdx} style={{ display: 'contents' }}>
            {pGroup.dettagliPagamento.map((item, dIdx) => (
              <div key={dIdx} className="company-card" style={{ padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span className="badge badge-primary">
                    {getModalitaPagamentoDesc(item.modalitaPagamento)}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {getCondizioniPagamentoDesc(pGroup.condizioniPagamento)}
                  </span>
                </div>

                <div className="field-group">
                  <div className="field-row">
                    <span className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} /> Scadenza:
                    </span>
                    <span className="field-value" style={{ color: 'var(--text-main)' }}>
                      {item.dataScadenzaPagamento ? formatDate(item.dataScadenzaPagamento) : 'A vista'}
                    </span>
                  </div>

                  <div className="field-row">
                    <span className="field-label">Importo Rata:</span>
                    <span className="field-value" style={{ fontSize: '15px', color: 'var(--primary-text)', fontWeight: 700 }}>
                      {formatCurrency(item.importoPagamento, currency)}
                    </span>
                  </div>

                  {item.beneficiario && (
                    <div className="field-row">
                      <span className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <UserCheck size={13} /> Beneficiario:
                      </span>
                      <span className="field-value">{item.beneficiario}</span>
                    </div>
                  )}

                  {item.istitutoFinanziario && (
                    <div className="field-row">
                      <span className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Landmark size={13} /> Banca / Istituto:
                      </span>
                      <span className="field-value">{item.istitutoFinanziario}</span>
                    </div>
                  )}

                  {item.codiceIBAN && (
                    <div className="field-row">
                      <span className="field-label">IBAN:</span>
                      <span className="field-value">
                        <code style={{ fontSize: '12px', letterSpacing: '0.02em' }}>{item.codiceIBAN}</code>
                        <CopyButton text={item.codiceIBAN} title="Copia IBAN" />
                      </span>
                    </div>
                  )}

                  {item.codiceBIC && (
                    <div className="field-row">
                      <span className="field-label">BIC / SWIFT:</span>
                      <span className="field-value">
                        <code>{item.codiceBIC}</code>
                      </span>
                    </div>
                  )}

                  {item.scontoPagamentoAnticipato !== undefined && (
                    <div className="field-row">
                      <span className="field-label">Sconto anticipato:</span>
                      <span className="field-value" style={{ color: 'var(--success-text)' }}>
                        {formatCurrency(item.scontoPagamentoAnticipato, currency)}{' '}
                        {item.dataLimitePagamentoAnticipato ? `(entro il ${formatDate(item.dataLimitePagamentoAnticipato)})` : ''}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
