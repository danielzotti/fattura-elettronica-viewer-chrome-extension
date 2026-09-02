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
        }

        const clonedEl = clonedDoc.getElementById(containerElement.id);
        if (clonedEl) {
          // Hide all action buttons, copy icons, search inputs, and no-print elements
          const elementsToHide = clonedEl.querySelectorAll<HTMLElement>(
            '.no-print, .no-pdf, button, .btn, .btn-icon, input, textarea, .tabs-nav'
          );
          elementsToHide.forEach((el) => {
            el.style.setProperty('display', 'none', 'important');
          });

          // Layout adjustments for clean A4 paper rendering
          clonedEl.style.width = '1000px';
          clonedEl.style.maxWidth = '1000px';
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
