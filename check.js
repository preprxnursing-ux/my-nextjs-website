const fs = require('fs');
const f = fs.readFileSync('app/auth/login/page.tsx','utf8');
const i = f.indexOf('router.push');
console.log(f.slice(i-100, i+300));
