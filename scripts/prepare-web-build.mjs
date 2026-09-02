import { copyFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const outDir = resolve('.output/chrome-mv3');
const viewerHtml = resolve(outDir, 'viewer.html');
const indexHtml = resolve(outDir, 'index.html');
const nojekyll = resolve(outDir, '.nojekyll');
const cname = resolve(outDir, 'CNAME');

if (!existsSync(viewerHtml)) {
  console.error('Error: viewer.html not found in .output/chrome-mv3. Run wxt build first.');
  process.exit(1);
}

// 1. Copy viewer.html -> index.html for root hosting
copyFileSync(viewerHtml, indexHtml);
console.log('✔ Generated index.html from viewer.html');

// 2. Ensure .nojekyll exists
writeFileSync(nojekyll, '');
console.log('✔ Generated .nojekyll');

// 3. Ensure CNAME exists
writeFileSync(cname, 'fattura-elettronica-viewer.zotti.dev\n');
console.log('✔ Verified CNAME (fattura-elettronica-viewer.zotti.dev)');
