const fs = require('fs');
let c = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8');
c = c.replace(
  'flex: 1, overflowY: "auto", padding: "24px 28px" }}',
  'flex: 1, overflowY: "auto", padding: "24px 28px", width: "100%", boxSizing: "border-box" }}'
);
fs.writeFileSync('components/AnatomyVisualizer.tsx', c, 'utf8');
console.log('Done');