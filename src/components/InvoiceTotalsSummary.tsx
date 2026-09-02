import React from 'react';
import type { FatturaBody } from '../lib/types';
import { formatCurrency, formatDate, getModalitaPagamentoDesc } from '../lib/sdi-codes';
import { DollarSign, Calendar, CreditCard, PieChart, ShieldAlert } from 'lucide-react';

interface InvoiceTotalsSummaryProps {
  body: FatturaBody;
}

export const InvoiceTotalsSummary: React.FC<InvoiceTotalsSummaryProps> = ({ body }) => {
  const dgd = body.datiGenerali.datiGeneraliDocumento;
  const divisa = dgd.divisa || 'EUR';

  // Calculate totals from summary or lines
  const totalImponibile = body.datiBeniServizi.datiRiepilogo.reduce(
    (acc, item) => acc + (item.imponibileImporto || 0),
    0
  );

  const totalImposta = body.datiBeniServizi.datiRiepilogo.reduce(
    (acc, item) => acc + (item.imposta || 0),
    0
  );

  // Document total can be explicitly set in XML, or sum of lines + taxes
  let importoTotale = dgd.importoTotaleDocumento;
  if (importoTotale === undefined) {
    importoTotale = totalImponibile + totalImposta;
  }

  // Ritenuta d'acconto
  const totalRitenuta = dgd.datiRitenuta?.reduce((acc, r) => acc + (r.importoRitenuta || 0), 0) || 0;

  // Bollo
  const bolloImporto = dgd.datiBollo?.importoBollo || 0;

  // First payment details if present
  const firstPayment = body.datiPagamento?.[0]?.dettagliPagamento?.[0];
  const paymentDueDate = firstPayment?.dataScadenzaPagamento;
  const paymentMethod = firstPayment?.modalitaPagamento;
  const paymentAmount = firstPayment?.importoPagamento;

  return (
    <div className="kpi-banner">
      <div className="kpi-card highlight">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="kpi-label">Totale Documento</span>
          <DollarSign size={16} color="var(--primary)" />
        </div>
        <div className="kpi-value">{formatCurrency(importoTotale, divisa)}</div>
        <div className="kpi-sub">
          {dgd.arrotondamento ? `Arrotondamento: ${formatCurrency(dgd.arrotondamento, divisa)}` : 'Importo complessivo'}
        </div>
      </div>

      <div className="kpi-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="kpi-label">Totale Imponibile</span>
          <PieChart size={16} color="var(--text-muted)" />
        </div>
        <div className="kpi-value">{formatCurrency(totalImponibile, divisa)}</div>
        <div className="kpi-sub">Base imponibile netta</div>
      </div>

      <div className="kpi-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="kpi-label">Totale Imposta (IVA)</span>
          <PieChart size={16} color="var(--text-muted)" />
        </div>
        <div className="kpi-value">{formatCurrency(totalImposta, divisa)}</div>
        <div className="kpi-sub">
          {body.datiBeniServizi.datiRiepilogo.some((r) => r.esigibilitaIVA === 'S')
            ? 'Include Split Payment (PA)'
            : 'IVA complessiva'}
        </div>
      </div>

      {totalRitenuta > 0 && (
        <div className="kpi-card" style={{ borderColor: 'var(--warning)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="kpi-label" style={{ color: 'var(--warning-text)' }}>
              Ritenuta d’Acconto
            </span>
            <ShieldAlert size={16} color="var(--warning)" />
          </div>
          <div className="kpi-value" style={{ color: 'var(--warning-text)' }}>
            -{formatCurrency(totalRitenuta, divisa)}
          </div>
          <div className="kpi-sub">A carico del committente</div>
        </div>
      )}

      {firstPayment && (
        <div className="kpi-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="kpi-label">Scadenza Pagamento</span>
            <Calendar size={16} color="var(--text-muted)" />
          </div>
          <div className="kpi-value" style={{ fontSize: '18px', paddingTop: '4px' }}>
            {paymentDueDate ? formatDate(paymentDueDate) : 'A vista'}
          </div>
          <div className="kpi-sub" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CreditCard size={12} />
            <span title={getModalitaPagamentoDesc(paymentMethod)} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {getModalitaPagamentoDesc(paymentMethod)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
