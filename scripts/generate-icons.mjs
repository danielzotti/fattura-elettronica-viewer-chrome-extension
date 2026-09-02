import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';

const publicDir = resolve('public');
const iconDir = resolve(publicDir, 'icon');

if (!existsSync(iconDir)) {
  mkdirSync(iconDir, { recursive: true });
}

// 1. Generate crisp SVG icon matching the top-left app logo
// Receipt icon paths from Lucide React
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="feGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="50%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.18" />
    </filter>
  </defs>
  
  <!-- Rounded Squircle Background -->
  <rect x="16" y="16" width="480" height="480" rx="108" fill="url(#feGradient)" filter="url(#subtleShadow)" />
  
  <!-- Lucide Receipt Icon Centered -->
  <g transform="translate(116, 116) scale(11.666)" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
    <path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8" />
    <path d="M12 17V7" />
  </g>
</svg>
`;

// Also clean SVG without outer shadow for smaller favicons / pixel sharpness
const svgClean = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="feGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="50%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
  </defs>
  
  <!-- Rounded Squircle Background -->
  <rect x="0" y="0" width="512" height="512" rx="114" fill="url(#feGradient)" />
  
  <!-- Lucide Receipt Icon Centered -->
  <g transform="translate(106, 106) scale(12.5)" stroke="#ffffff" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
    <path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8" />
    <path d="M12 17V7" />
  </g>
</svg>
`;

async function generate() {
  console.log('Generating favicon and extension icons...');

  // Save SVG files
  writeFileSync(resolve(publicDir, 'favicon.svg'), svgClean);
  writeFileSync(resolve(iconDir, 'favicon.svg'), svgClean);
  writeFileSync(resolve(publicDir, 'logo.svg'), svgIcon);

  // Generate PNG sizes
  const sizes = [16, 32, 48, 96, 128, 256, 512];
  const svgBuffer = Buffer.from(svgClean);

  for (const size of sizes) {
    const outputPath = resolve(iconDir, `${size}.png`);
    await sharp(svgBuffer)
      .resize(size, size, { fit: 'contain' })
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(outputPath);
    console.log(`✔ Generated ${size}x${size} icon: ${outputPath}`);
  }

  // Apple touch icon (180x180)
  await sharp(svgBuffer)
    .resize(180, 180, { fit: 'contain' })
    .png({ quality: 100 })
    .toFile(resolve(publicDir, 'apple-touch-icon.png'));
  console.log(`✔ Generated apple-touch-icon.png`);

  // Root favicon.ico / favicon.png
  await sharp(svgBuffer)
    .resize(32, 32, { fit: 'contain' })
    .png({ quality: 100 })
    .toFile(resolve(publicDir, 'favicon.ico'));
  console.log(`✔ Generated favicon.ico`);

  console.log('All icons generated successfully!');
}

generate().catch(console.error);
