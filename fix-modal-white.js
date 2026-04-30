const fs = require('fs');
let c = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8');

// White background modal
c = c.replace(
  'background:"#0c1829", borderRadius:20, padding:"32px", maxWidth:580, width:"100%", boxShadow:"0 32px 80px rgba(0,0,0,0.6)", border:"1px solid rgba(255,255,255,0.08)"',
  'background:"#ffffff", borderRadius:20, padding:"32px", maxWidth:580, width:"100%", boxShadow:"0 32px 80px rgba(0,0,0,0.25)"'
);

// Fix rationale text to dark
c = c.replace(
  'fontSize:15, color:"#cbd5e1", lineHeight:1.85, marginBottom:24, fontFamily:"Georgia, serif", borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:16',
  'fontSize:15, color:"#334155", lineHeight:1.85, marginBottom:24, fontFamily:"Georgia, serif", borderTop:"1px solid #e2e8f0", paddingTop:16'
);

// Fix correct answer subtitle
c = c.replace(
  'fontSize:12, color:"#64748b", margin:0, fontFamily:"system-ui" }}>Correct answer:',
  'fontSize:12, color:"#94a3b8", margin:0, fontFamily:"system-ui" }}>Correct answer:'
);

// Next question = green
c = c.replace(
  'flex:1, padding:"12px", borderRadius:10, background:"linear-gradient(135deg,#0ea5e9,#38bdf8)", border:"none", color:"white", cursor:"pointer", fontSize:15, fontWeight:700',
  'flex:1, padding:"12px", borderRadius:10, background:"linear-gradient(135deg,#16a34a,#22c55e)", border:"none", color:"white", cursor:"pointer", fontSize:15, fontWeight:700, boxShadow:"0 4px 12px rgba(22,163,74,0.35)"'
);

// Back to lessons = medical blue
c = c.replace(
  'padding:"12px 20px", borderRadius:10, background:"transparent", border:"1.5px solid rgba(255,255,255,0.15)", color:"#94a3b8", cursor:"pointer", fontSize:14',
  'padding:"12px 20px", borderRadius:10, background:"linear-gradient(135deg,#0369a1,#0ea5e9)", border:"none", color:"white", cursor:"pointer", fontSize:14, fontWeight:700, boxShadow:"0 4px 12px rgba(14,165,233,0.35)"'
);

fs.writeFileSync('components/AnatomyVisualizer.tsx', c, 'utf8');
console.log('Done');