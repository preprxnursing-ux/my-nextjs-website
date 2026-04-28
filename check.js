const fs = require('fs');
const f = fs.readFileSync('components/MobileNav.tsx','utf8');
const i = f.indexOf('mob-hero-visitor');
const j = f.indexOf('mob-hero-visitor', i+1);
console.log(f.slice(j-10, j+600));
