const fs = require('fs');
let c = fs.readFileSync('app/layout.tsx', 'utf8');
c = c.replace(
  'export const viewport = {\n  width: "device-width",\n  initialScale: 1,\n  maximumScale: 5,\n};',
  'export const viewport = {\n  width: "device-width",\n  initialScale: 1,\n  maximumScale: 1,\n  minimumScale: 1,\n};'
);
fs.writeFileSync('app/layout.tsx', c, 'utf8');
console.log('Done');