const fs = require('fs');
let c = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8');
c = c.replace(
  'display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10',
  'display: "flex", flexDirection: "column", gap: 8'
);
fs.writeFileSync('components/AnatomyVisualizer.tsx', c, 'utf8');
console.log('Done');