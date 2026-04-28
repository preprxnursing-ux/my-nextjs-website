const fs = require('fs');
const f = fs.readFileSync('app/quiz/select/page.tsx','utf8');
console.log(f.slice(0,1800));
