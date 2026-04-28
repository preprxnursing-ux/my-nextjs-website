const fs = require('fs');
const f = fs.readFileSync('app/auth/verify/page.tsx','utf8');
const i = f.indexOf('handleOtpInput');
console.log(f.slice(i-50, i+600));
