const fs = require('fs');
let f = fs.readFileSync('app/quiz/select/page.tsx','utf8');

// Fix 1: Pass topic to quiz URL
f = f.replace(
  'const params = new URLSearchParams({ examType: selectedCourse! });\r\n    router.push(`/quiz?${params.toString()}`);',
  'const params = new URLSearchParams({ examType: selectedCourse!, topic: selectedTopic! });\r\n    router.push(`/quiz?${params.toString()}`);'
);

fs.writeFileSync('app/quiz/select/page.tsx', f, 'utf8');
console.log('Done');
