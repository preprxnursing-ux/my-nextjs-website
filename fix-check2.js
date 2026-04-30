const fs = require('fs');
let lines = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8').split('\n');
for(let i = 385; i < 400; i++) {
  console.log(i+1, JSON.stringify(lines[i]));
}