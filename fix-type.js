const fs = require('fs');
let c = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8');
c = c.replace(
  'Correct answer: {q.answer}) {q.options[q.answer]}',
  'Correct answer: {q.answer}) {(q.options as any)[q.answer]}'
);
fs.writeFileSync('components/AnatomyVisualizer.tsx', c, 'utf8');
console.log('Done');