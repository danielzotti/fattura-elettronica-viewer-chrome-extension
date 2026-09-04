import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PdfExportOptions {
  fileName?: string;
  onProgress?: (status: string) => void;
}

/**
 * Generates and downloads a clean A4 PDF of the invoice container element.
 */
export async function exportInvoiceToPdf(
  containerElement: HTMLElement,
  options: PdfExportOptions = {}
): Promise<void> {
  const { fileName = 'Fattura_Elettronica.pdf', onProgress } = options;

  onProgress?.('Preparazione rendering documento...');

  // Check if dark theme is active and temporarily switch live DOM to light mode
  const previousTheme = document.documentElement.getAttribute('data-theme');
  const wasDark = previousTheme === 'dark';

  if (wasDark) {
    document.documentElement.setAttribute('data-theme', 'light');
    // Allow the browser to repaint and update computed styles
    await new Promise((resolve) => setTimeout(resolve, 80));
  }

  const originalScrollY = window.scrollY;
  window.scrollTo(0, 0);

  try {
    onProgress?.('Cattura visuale ad alta risoluzione...');

    const canvas = await html2canvas(containerElement, {
      scale: 2, // 2x scale for crisp print text
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200,
      onclone: (clonedDoc) => {
        // Enforce light theme on cloned document
        clonedDoc.documentElement.removeAttribute('data-theme');
        clonedDoc.documentElement.setAttribute('data-theme', 'light');
        if (clonedDoc.body) {
          clonedDoc.body.removeAttribute('data-theme');
          clonedDoc.body.setAttribute('data-theme', 'light');
          clonedDoc.body.style.backgroundColor = '#ffffff';
          clonedDoc.body.style.color = '#0f172a';
          clonedDoc.body.style.width = '1200px';
        }

        // Force desktop A4 styling for PDF capture
        const a4Style = clonedDoc.createElement('style');
        a4Style.id = 'pdf-a4-enforced-styles';
        a4Style.textContent = `
          .no-print, .no-pdf, button, .btn, .btn-icon, input, textarea, .tabs-nav, .lines-cards-container {
            display: none !important;
            visibility: hidden !important;
          }
          .hidden-on-screen-cards, .table-wrapper {
            display: block !important;
            overflow: hidden !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .invoice-table {
            display: table !important;
            width: 100% !important;
            max-width: 100% !important;
            table-layout: fixed !important;
            box-sizing: border-box !important;
          }
          .grid-2 {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 16px !important;
            margin-bottom: 20px !important;
          }
          .kpi-banner {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 12px !important;
            margin: 16px 0 !important;
          }
          .kpi-card.highlight {
            grid-column: span 1 !important;
            background: #eff6ff !important;
            border-color: #bfdbfe !important;
          }
          .kpi-card.highlight .kpi-value {
            color: #1d4ed8 !important;
          }
          .payment-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
            gap: 14px !important;
            margin-bottom: 20px !important;
          }
          .payment-card-header {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 8px !important;
          }
          .payment-condition {
            font-size: 12px !important;
          }
          .field-row {
            display: flex !important;
            flex-direction: row !important;
            align-items: flex-start !important;
            justify-content: space-between !important;
            gap: 8px !important;
          }
          .field-value {
            text-align: right !important;
            justify-content: flex-end !important;
            width: auto !important;
          }
          .company-card, .payment-card, .kpi-card {
            background-color: #f8fafc !important;
            border: 1px solid #e2e8f0 !important;
            color: #0f172a !important;
          }
        `;
        clonedDoc.head.appendChild(a4Style);

        const clonedEl = clonedDoc.getElementById(containerElement.id);
        if (clonedEl) {
          // Layout adjustments for clean A4 paper rendering
          clonedEl.style.width = '1000px';
          clonedEl.style.maxWidth = '1000px';
          clonedEl.style.minWidth = '1000px';
          clonedEl.style.margin = '0 auto';
          clonedEl.style.padding = '24px';
          clonedEl.style.boxShadow = 'none';
          clonedEl.style.border = 'none';
          clonedEl.style.backgroundColor = '#ffffff';
          clonedEl.style.color = '#0f172a';
        }
      },
    });

    onProgress?.('Creazione documento PDF vettoriale A4...');

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    // Standard A4 dimensions in mm
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth - 20; // 10mm margins on left and right
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10; // 10mm top margin

    pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight - 20;

    // Multi-page handling if invoice is longer than single A4 page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight - 20;
    }

    onProgress?.('Salvataggio PDF...');
    pdf.save(fileName);
  } finally {
    window.scrollTo(0, originalScrollY);
    // Restore user theme if it was dark
    if (wasDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }
}

/**
 * Native print trigger
 */
export function triggerPrint(): void {
  const previousTheme = document.documentElement.getAttribute('data-theme');
  const wasDark = previousTheme === 'dark';

  if (wasDark) {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  const cleanup = () => {
    if (wasDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    window.removeEventListener('afterprint', cleanup);
  };

  window.addEventListener('afterprint', cleanup);

  setTimeout(() => {
    window.print();
    // Safety fallback in case afterprint doesn't fire immediately in some browser versions
    setTimeout(cleanup, 1200);
  }, 60);
}
