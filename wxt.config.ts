import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [
      {
        name: 'remove-pdfobject-cdn',
        transform(code, id) {
          if (id.includes('jspdf') || code.includes('https://cdnjs.cloudflare.com/ajax/libs/pdfobject')) {
            return {
              code: code.replace(
                /https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/pdfobject\/2\.1\.1\/pdfobject(\.min)?\.js/g,
                ''
              ),
              map: null,
            };
          }
        },
      },
    ],
  }),
  manifest: {
    name: 'Fattura Elettronica Viewer & PDF',
    description:
      'Visualizza e trasforma fatture elettroniche XML e P7M in documenti grafici ed esporta in PDF A4. 100% privato e offline.',
    version: '1.0.0',
    permissions: ['storage', 'contextMenus'],
    action: {
      default_title: 'Fattura Elettronica Viewer',
      default_icon: {
        '16': 'icon/16.png',
        '32': 'icon/32.png',
        '48': 'icon/48.png',
        '128': 'icon/128.png',
      },
    },
  },
});
