const fs = require('fs');
let lines = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8').split('\n');
// Remove duplicate )} at line 392 (index 391)
lines.splice(391, 1);
fs.writeFileSync('components/AnatomyVisualizer.tsx', lines.join('\n'), 'utf8');
console.log('Done');