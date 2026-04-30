const fs = require('fs');
let c = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8');

// Upgrade modal styling
c = c.replace(
  'background:"rgba(0,0,0,0.6)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px"',
  'background:"rgba(2,8,20,0.85)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", backdropFilter:"blur(8px)"'
);

c = c.replace(
  'background:"white", borderRadius:16, padding:"28px", maxWidth:560, width:"100%", boxShadow:"0 24px 60px rgba(0,0,0,0.3)"',
  'background:"#0c1829", borderRadius:20, padding:"32px", maxWidth:580, width:"100%", boxShadow:"0 32px 80px rgba(0,0,0,0.6)", border:"1px solid rgba(255,255,255,0.08)"'
);

// Fix correct/incorrect icon circle
c = c.replace(
  'background:ans===q.answer?"#dcfce7":"#fee2e2", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0',
  'background:ans===q.answer?"rgba(34,197,94,0.15)":"rgba(239,68,68,0.15)", border:"2px solid "+(ans===q.answer?"#22c55e":"#ef4444"), display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0'
);

// Fix correct/incorrect title color
c = c.replace(
  'color:ans===q.answer?"#15803d":"#dc2626", margin:0 }}>{ans===q.answer?"Correct!":"Incorrect"}',
  'color:ans===q.answer?"#22c55e":"#ef4444", margin:0, fontFamily:"Georgia, serif" }}>{ans===q.answer?"Correct!":"Incorrect"}'
);

// Fix correct answer subtitle
c = c.replace(
  'fontSize:12, color:"#94a3b8", margin:0 }}>Correct answer:',
  'fontSize:12, color:"#64748b", margin:0, fontFamily:"system-ui" }}>Correct answer:'
);

// Fix rationale text
c = c.replace(
  'fontSize:15, color:"#334155", lineHeight:1.8, marginBottom:24, fontFamily:"Georgia, serif", borderTop:"1px solid #f1f5f9", paddingTop:16',
  'fontSize:15, color:"#cbd5e1", lineHeight:1.85, marginBottom:24, fontFamily:"Georgia, serif", borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:16'
);

// Fix Back to lessons button
c = c.replace(
  'padding:"12px 20px", borderRadius:10, background:"white", border:"1.5px solid #e2e8f0", color:"#64748b", cursor:"pointer", fontSize:14',
  'padding:"12px 20px", borderRadius:10, background:"transparent", border:"1.5px solid rgba(255,255,255,0.15)", color:"#94a3b8", cursor:"pointer", fontSize:14'
);

fs.writeFileSync('components/AnatomyVisualizer.tsx', c, 'utf8');
console.log('Done');