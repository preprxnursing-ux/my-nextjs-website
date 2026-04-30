const fs = require('fs');
let c = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8');

// Fix the quiz content to use full width - remove the 2-column grid layout
c = c.replace(
  'flex: 1, display: "grid", gridTemplateColumns: "260px 1fr", overflow: "hidden", animation: "slideUp .25s ease"',
  'flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", animation: "slideUp .25s ease"'
);

fs.writeFileSync('components/AnatomyVisualizer.tsx', c, 'utf8');
console.log('Done');