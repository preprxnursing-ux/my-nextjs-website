const fs = require('fs');
let c = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8');
c = c.replace('Question display */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>', 'Question display */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", width: "100%" }}>');
fs.writeFileSync('components/AnatomyVisualizer.tsx', c, 'utf8');
console.log('Done:', (c.match(/Question display/g)||[]).length);