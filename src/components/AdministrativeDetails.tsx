import React from 'react';
import type { FatturaElettronica, FatturaBody } from '../lib/types';
import { formatDate, formatCurrency, TIPI_CASSA, TIPI_RITENUTA } from '../lib/sdi-codes';
import { FileText, Send, Link as LinkIcon, Shield } from 'lucide-react';

interface AdministrativeDetailsProps {
  invoice: FatturaElettronica;
  body: FatturaBody;
}

export const AdministrativeDetails: React.FC<AdministrativeDetailsProps> = ({ invoice, body }) => {
  const dt = invoice.header.datiTrasmissione;
  const dgd = body.datiGenerali.datiGeneraliDocumento;
  const orders = body.datiGenerali.datiOrdineAcquisto;
  const contracts = body.datiGenerali.datiContratto;
  const ddts = body.datiGenerali.datiDDT;
  const causali = dgd.causale;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Causale section if present */}
      {causali && causali.length > 0 && (
        <div className="company-card" style={{ padding: '16px' }}>
          <div className="section-title" style={{ marginBottom: '8px' }}>
            <FileText size={15} /> Causale Documento
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {causali.map((c, idx) => (
              <div key={idx} style={{ color: 'var(--text-main)', fontSize: '13px', lineHeight: 1.4 }}>
                • {c}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid of details */}
      <div className="grid-2">
        {/* Dati Trasmissione SDI */}
        <div className="company-card" style={{ padding: '16px' }}>
          <div className="section-title" style={{ marginBottom: '12px' }}>
            <Send size={15} /> Dati Trasmissione SDI
          </div>
          <div className="field-group">
            <div className="field-row">
              <span className="field-label">Formato Trasmissione:</span>
              <span className="field-value">
                <span className="badge badge-outline">{dt.formatoTrasmissione || invoice.versione}</span>
              </span>
            </div>
            <div className="field-row">
              <span className="field-label">Progressivo Invio:</span>
              <span className="field-value">
                <code>{dt.progressivoInvio || '-'}</code>
              </span>
            </div>
            {dt.idTrasmittente && (
              <div className="field-row">
                <span className="field-label">Trasmittente:</span>
                <span className="field-value">
                  <code>{dt.idTrasmittente.idPaese}{dt.idTrasmittente.idCodice}</code>
                </span>
              </div>
            )}
            {invoice.header.terzoIntermediarioOSoggettoEmittente && (
              <div className="field-row">
                <span className="field-label">Terzo Intermediario:</span>
                <span className="field-value">
                  {invoice.header.terzoIntermediarioOSoggettoEmittente.datiAnagrafici?.anagrafica?.denominazione ||
                    invoice.header.terzoIntermediarioOSoggettoEmittente.datiAnagrafici?.codiceFiscale ||
                    '-'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Ordini, Contratti, CIG / CUP */}
        <div className="company-card" style={{ padding: '16px' }}>
          <div className="section-title" style={{ marginBottom: '12px' }}>
            <LinkIcon size={15} /> Documenti e Appalti Correlati
          </div>
          <div className="field-group">
            {orders && orders.length > 0 ? (
              orders.map((ord, idx) => (
                <div key={idx} style={{ paddingBottom: '6px', borderBottom: '1px dashed var(--border-color)' }}>
                  <div className="field-row">
                    <span className="field-label">Ordine d’Acquisto:</span>
                    <span className="field-value">
                      <strong>{ord.idDocumento}</strong> {ord.data ? `del ${formatDate(ord.data)}` : ''}
                    </span>
                  </div>
                  {ord.codiceCIG && (
                    <div className="field-row">
                      <span className="field-label">Codice CIG:</span>
                      <span className="field-value">
                        <code>{ord.codiceCIG}</code>
                      </span>
                    </div>
                  )}
                  {ord.codiceCUP && (
                    <div className="field-row">
                      <span className="field-label">Codice CUP:</span>
                      <span className="field-value">
                        <code>{ord.codiceCUP}</code>
                      </span>
                    </div>
                  )}
                </div>
              ))
            ) : contracts && contracts.length > 0 ? (
              contracts.map((ct, idx) => (
                <div key={idx} className="field-row">
                  <span className="field-label">Contratto:</span>
                  <span className="field-value">
                    <strong>{ct.idDocumento}</strong> {ct.data ? `del ${formatDate(ct.data)}` : ''}
                  </span>
                </div>
              ))
            ) : (
              <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                Nessun ordine d'acquisto, contratto o CIG/CUP associato.
              </div>
            )}

            {ddts && ddts.length > 0 && (
              <div style={{ marginTop: '8px' }}>
                <div className="field-label" style={{ marginBottom: '4px' }}>Dati DDT collegati:</div>
                {ddts.map((ddt, dIdx) => (
                  <div key={dIdx} className="field-row">
                    <span className="field-label">DDT n. {ddt.numeroDDT}:</span>
                    <span className="field-value">{formatDate(ddt.dataDDT)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dati Fiscali Aggiuntivi: Ritenuta, Bollo, Cassa Previdenziale */}
      {(dgd.datiBollo || (dgd.datiRitenuta && dgd.datiRitenuta.length > 0) || (dgd.datiCassaPrevidenziale && dgd.datiCassaPrevidenziale.length > 0)) && (
        <div className="company-card" style={{ padding: '16px' }}>
          <div className="section-title" style={{ marginBottom: '12px' }}>
            <Shield size={15} /> Oneri Fiscali, Bolli e Casse Previdenziali
          </div>
          <div className="field-group">
            {dgd.datiBollo && (
              <div className="field-row">
                <span className="field-label">Imposta di Bollo (Virtuale):</span>
                <span className="field-value">
                  <span className="badge badge-warning">
                    {formatCurrency(dgd.datiBollo.importoBollo || 2.0, dgd.divisa)} ({dgd.datiBollo.bolloVirtuale || 'SI'})
                  </span>
                </span>
              </div>
            )}

            {dgd.datiRitenuta?.map((rit, rIdx) => (
              <div key={rIdx} className="field-row">
                <span className="field-label">
                  Ritenuta ({TIPI_RITENUTA[rit.tipoRitenuta] || rit.tipoRitenuta} - {rit.aliquotaRitenuta}%):
                </span>
                <span className="field-value" style={{ color: 'var(--warning-text)' }}>
                  -{formatCurrency(rit.importoRitenuta, dgd.divisa)} (Causale: {rit.causalePagamento || '-'})
                </span>
              </div>
            ))}

            {dgd.datiCassaPrevidenziale?.map((cassa, cIdx) => (
              <div key={cIdx} className="field-row">
                <span className="field-label">
                  Cassa Previdenziale ({TIPI_CASSA[cassa.tipoCassa] || cassa.tipoCassa} {cassa.aliquotaCassa ? `${cassa.aliquotaCassa}%` : ''}):
                </span>
                <span className="field-value">
                  +{formatCurrency(cassa.importoContributoCassa, dgd.divisa)} (IVA {cassa.aliquotaIVA}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
