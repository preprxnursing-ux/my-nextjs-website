const fs = require('fs');
let lines = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8').split('\n');
for(let i = 383; i < 398; i++) {
  console.log(i+1, JSON.stringify(lines[i]));
}