const fs = require('fs');
let c = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8');
c = c.replace('overflowY: "auto", padding: "28px 36px", background: "#060d1a"', 'overflowY: "auto", padding: "28px 36px", background: "#f8fafc", flex: 1, width: "100%"');
fs.writeFileSync('components/AnatomyVisualizer.tsx', c, 'utf8');
console.log('Done');