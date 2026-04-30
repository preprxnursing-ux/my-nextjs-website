const fs = require('fs');
let c = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8');

// Make the question card full width
c = c.replace(
  'padding: "28px 36px", background: "white", borderRadius: 16, width: "100%", boxShadow',
  'padding: "24px 28px", background: "white", borderRadius: 12, width: "100%", maxWidth: "100%", boxShadow'
);

// Reduce left padding on question display container
c = c.replace(
  'flex: 1, overflowY: "auto", padding: "24px 28px", width: "100%", boxSizing: "border-box"',
  'flex: 1, overflowY: "auto", padding: "16px 20px", width: "100%", boxSizing: "border-box"'
);

fs.writeFileSync('components/AnatomyVisualizer.tsx', c, 'utf8');
console.log('Done');