const fs = require('fs');
let lines = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8').split('\n');
// Remove duplicate line 376 (index 375) - the old {ans && (
lines.splice(375, 1);
fs.writeFileSync('components/AnatomyVisualizer.tsx', lines.join('\n'), 'utf8');
console.log('Done! Line 376 removed');