const fs = require('fs');
let f = fs.readFileSync('app/globals.css','utf8');
f = f.replace('html, body { overflow-x: hidden; max-width: 100vw; }', 'body { overflow-x: hidden; max-width: 100vw; }');
f = f.replace('body, html { overflow-x: hidden !important; }', 'body { overflow-x: hidden !important; }');
fs.writeFileSync('app/globals.css', f, 'utf8');
console.log('Done');
