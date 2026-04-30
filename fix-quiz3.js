const fs = require('fs');
let c = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8');

// Make the entire quiz view scrollable instead of fixed height
c = c.replace(
  'flex: 1, display: "flex", flexDirection: "column", background: "#f8fafc", animation: "slideUp .25s ease", overflow: "hidden", overflowY: "auto"',
  'flex: 1, overflowY: "auto", background: "#f8fafc", animation: "slideUp .25s ease"'
);

fs.writeFileSync('components/AnatomyVisualizer.tsx', c, 'utf8');
console.log('Done');