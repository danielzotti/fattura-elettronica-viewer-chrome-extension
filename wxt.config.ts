import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Fattura Elettronica Viewer & PDF',
    description:
      'Visualizza in un formato grafico moderno ed esporta in PDF le fatture elettroniche italiane (XML e P7M).',
    version: '1.0.0',
    permissions: ['storage', 'contextMenus', 'tabs'],
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
