const fs = require('fs');
let f = fs.readFileSync('app/globals.css','utf8');
f = f.replace('body { overflow-x: clip; max-width: 100vw; }', 'html, body { overflow-x: hidden; max-width: 100vw; }');
f = f.replace('body { overflow-x: clip !important; }', 'body, html { overflow-x: hidden !important; }');
fs.writeFileSync('app/globals.css', f, 'utf8');
console.log('Done');
