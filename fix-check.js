const fs = require('fs');
let lines = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8').split('\n');

// Find and remove duplicate {ans && ( at line 377 (index 376)
for(let i = 370; i < 385; i++) {
  console.log(i+1, JSON.stringify(lines[i]));
}