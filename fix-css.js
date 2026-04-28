const fs = require('fs');
let f = fs.readFileSync('app/globals.css','utf8');
f = f.replace(
  '@media (max-width: 767px) {\n  \n  .mob-hide-on-mobile { display: none !important; }',
  '@media (max-width: 767px) {\n  \n  .mob-hide-on-mobile { display: none !important; }\n  body > header, #__next > header { display: none !important; }'
);
fs.writeFileSync('app/globals.css', f, 'utf8');
console.log('Done');
