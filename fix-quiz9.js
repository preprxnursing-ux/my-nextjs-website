const fs = require('fs');
let c = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8');
c = c.replace(
  'maxWidth: 720, animation: "slideUp .25s ease"',
  'width: "100%", animation: "slideUp .25s ease"'
);
fs.writeFileSync('components/AnatomyVisualizer.tsx', c, 'utf8');
console.log('Done');