const fs = require('fs');
let c = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8');

// Fix quiz scroll container to allow scrolling
c = c.replace(
  'flex: 1, display: "flex", flexDirection: "column", background: "#f8fafc", animation: "slideUp .25s ease", overflow: "hidden"',
  'flex: 1, display: "flex", flexDirection: "column", background: "#f8fafc", animation: "slideUp .25s ease", overflow: "hidden", overflowY: "auto"'
);

// Make Next question button blue/colored
c = c.replace(
  'padding:"11px 28px", borderRadius:8, background:"#0f172a", border:"none", color:"white", cursor:"pointer", fontSize:14, fontWeight:700',
  'padding:"11px 28px", borderRadius:8, background:"linear-gradient(135deg,#0ea5e9,#38bdf8)", border:"none", color:"white", cursor:"pointer", fontSize:14, fontWeight:700, boxShadow:"0 4px 12px rgba(14,165,233,0.35)"'
);

// Make Back to lessons button colored
c = c.replace(
  'padding:"11px 22px", borderRadius:8, background:"white", border:"1.5px solid #e2e8f0", color:"#64748b", cursor:"poi',
  'padding:"11px 22px", borderRadius:8, background:"white", border:"1.5px solid #0ea5e9", color:"#0ea5e9", cursor:"poi'
);

// Fix inner quiz content to scroll
c = c.replace(
  '{q && (\n                <div style={{ ',
  '{q && (\n                <div style={{ overflowY: "auto", flex: 1, '
);

fs.writeFileSync('components/AnatomyVisualizer.tsx', c, 'utf8');
console.log('Done');