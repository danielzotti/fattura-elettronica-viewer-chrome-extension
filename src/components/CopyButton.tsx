import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text?: string;
  label?: string;
  className?: string;
  title?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label,
  className = 'btn-icon',
  title = 'Copia negli appunti',
}) => {
  const [copied, setCopied] = useState(false);

  if (!text) return null;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`no-print no-pdf ${className}`}
      title={copied ? 'Copiato!' : title}
      aria-label={label || title}
    >
      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
      {label && <span>{copied ? 'Copiato!' : label}</span>}
    </button>
  );
};
