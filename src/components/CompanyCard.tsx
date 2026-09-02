import React from 'react';
import type { CedentePrestatore, CessionarioCommittente, DatiTrasmissione } from '../lib/types';
import { getRegimeFiscaleDesc } from '../lib/sdi-codes';
import { CopyButton } from './CopyButton';
import { Building2, User, MapPin, Mail, Phone, Hash, ShieldCheck, Inbox } from 'lucide-react';

interface CompanyCardProps {
  type: 'cedente' | 'cessionario';
  data: CedentePrestatore | CessionarioCommittente;
  trasmissione?: DatiTrasmissione;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ type, data, trasmissione }) => {
  const isCedente = type === 'cedente';
  const cedente = isCedente ? (data as CedentePrestatore) : undefined;
  const cessionario = !isCedente ? (data as CessionarioCommittente) : undefined;

  const anagrafica = data.datiAnagrafici.anagrafica;
  const displayName =
    anagrafica.denominazione ||
    [anagrafica.titolo, anagrafica.nome, anagrafica.cognome].filter(Boolean).join(' ') ||
    'Non specificato';

  const isIndividual = !anagrafica.denominazione && (!!anagrafica.nome || !!anagrafica.cognome);

  const pIva = data.datiAnagrafici.idFiscaleIVA
    ? `${data.datiAnagrafici.idFiscaleIVA.idPaese}${data.datiAnagrafici.idFiscaleIVA.idCodice}`
    : undefined;

  const codFiscale = data.datiAnagrafici.codiceFiscale;

  const sede = data.sede;
  const fullAddress = [
    sede.indirizzo,
    sede.numeroCivico,
    sede.cap,
    sede.comune,
    sede.provincia ? `(${sede.provincia})` : '',
    sede.nazione && sede.nazione !== 'IT' ? `[${sede.nazione}]` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="company-card">
      <div className="company-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: isCedente ? 'var(--primary-subtle)' : 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isCedente ? 'var(--primary-text)' : 'var(--text-main)',
            }}
          >
            {isIndividual ? <User size={18} /> : <Building2 size={18} />}
          </div>
          <div>
            <span className={`company-badge ${isCedente ? 'badge-cedente' : 'badge-cessionario'}`}>
              {isCedente ? 'Cedente / Fornitore' : 'Cessionario / Cliente'}
            </span>
            <div className="company-title">{displayName}</div>
          </div>
        </div>
      </div>

      <div className="field-group">
        {pIva && (
          <div className="field-row">
            <span className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Hash size={13} /> Partita IVA:
            </span>
            <span className="field-value">
              <code>{pIva}</code>
              <CopyButton text={pIva} />
            </span>
          </div>
        )}

        {codFiscale && (
          <div className="field-row">
            <span className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={13} /> Codice Fiscale:
            </span>
            <span className="field-value">
              <code>{codFiscale}</code>
              <CopyButton text={codFiscale} />
            </span>
          </div>
        )}

        <div className="field-row">
          <span className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={13} /> Sede Legale:
          </span>
          <span className="field-value" style={{ textAlign: 'right' }}>
            {fullAddress}
          </span>
        </div>

        {/* Cedente extra info */}
        {cedente?.datiAnagrafici.regimeFiscale && (
          <div className="field-row">
            <span className="field-label">Regime Fiscale:</span>
            <span className="field-value" style={{ fontSize: '12px', fontWeight: 500 }}>
              {getRegimeFiscaleDesc(cedente.datiAnagrafici.regimeFiscale)}
            </span>
          </div>
        )}

        {cedente?.contatti?.email && (
          <div className="field-row">
            <span className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Mail size={13} /> Email:
            </span>
            <span className="field-value">
              <a href={`mailto:${cedente.contatti.email}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                {cedente.contatti.email}
              </a>
              <CopyButton text={cedente.contatti.email} />
            </span>
          </div>
        )}

        {cedente?.contatti?.telefono && (
          <div className="field-row">
            <span className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Phone size={13} /> Telefono:
            </span>
            <span className="field-value">
              <a href={`tel:${cedente.contatti.telefono}`} style={{ color: 'var(--text-main)', textDecoration: 'none' }}>
                {cedente.contatti.telefono}
              </a>
            </span>
          </div>
        )}

        {cedente?.iscrizioneREA && (
          <div className="field-row">
            <span className="field-label">Iscrizione REA:</span>
            <span className="field-value" style={{ fontSize: '12px' }}>
              {cedente.iscrizioneREA.ufficio} - {cedente.iscrizioneREA.numeroREA}{' '}
              {cedente.iscrizioneREA.capitaleSociale ? `(Cap. ${cedente.iscrizioneREA.capitaleSociale} €)` : ''}
            </span>
          </div>
        )}

        {/* Cessionario / Transmission info */}
        {!isCedente && trasmissione && (
          <>
            {trasmissione.codiceDestinatario && (
              <div className="field-row">
                <span className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Inbox size={13} /> Codice SDI:
                </span>
                <span className="field-value">
                  <span className="badge badge-outline" style={{ fontFamily: 'monospace', fontWeight: 700 }}>
                    {trasmissione.codiceDestinatario}
                  </span>
                  <CopyButton text={trasmissione.codiceDestinatario} />
                </span>
              </div>
            )}

            {trasmissione.pecDestinatario && (
              <div className="field-row">
                <span className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Mail size={13} /> PEC Destinatario:
                </span>
                <span className="field-value">
                  <code>{trasmissione.pecDestinatario}</code>
                  <CopyButton text={trasmissione.pecDestinatario} />
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
