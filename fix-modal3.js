const fs = require('fs');
let lines = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8').split('\n');

// Find the rationale div start (search for dcfce7)
let startLine = -1, endLine = -1;
for(let i = 0; i < lines.length; i++) {
  if(lines[i].includes('dcfce7') && lines[i].includes('padding:"16px')) startLine = i;
  if(startLine > -1 && lines[i].includes('Back to lessons')) { endLine = i + 2; break; }
}

console.log('Found at lines:', startLine, 'to', endLine);

if(startLine > -1 && endLine > -1) {
  const modal = [
    '                  {ans && (',
    '                    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>',
    '                      <div style={{ background:"white", borderRadius:16, padding:"28px", maxWidth:560, width:"100%", boxShadow:"0 24px 60px rgba(0,0,0,0.3)" }}>',
    '                        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>',
    '                          <div style={{ width:44, height:44, borderRadius:"50%", background:ans===q.answer?"#dcfce7":"#fee2e2", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{ans===q.answer?"✓":"✗"}</div>',
    '                          <div><p style={{ fontSize:18, fontWeight:800, color:ans===q.answer?"#15803d":"#dc2626", margin:0 }}>{ans===q.answer?"Correct!":"Incorrect"}</p>',
    '                          <p style={{ fontSize:12, color:"#94a3b8", margin:0 }}>Correct answer: {q.answer}) {q.options[q.answer]}</p></div>',
    '                        </div>',
    '                        <p style={{ fontSize:15, color:"#334155", lineHeight:1.8, marginBottom:24, fontFamily:"Georgia, serif", borderTop:"1px solid #f1f5f9", paddingTop:16 }}>{q.rationale}</p>',
    '                        <div style={{ display:"flex", gap:10 }}>',
    '                          <button onClick={genQ} style={{ flex:1, padding:"12px", borderRadius:10, background:"linear-gradient(135deg,#0ea5e9,#38bdf8)", border:"none", color:"white", cursor:"pointer", fontSize:15, fontWeight:700 }}>Next question →</button>',
    '                          <button onClick={goLearn} style={{ padding:"12px 20px", borderRadius:10, background:"white", border:"1.5px solid #e2e8f0", color:"#64748b", cursor:"pointer", fontSize:14 }}>Back to lessons</button>',
    '                        </div>',
    '                      </div>',
    '                    </div>',
    '                  )}',
  ];
  lines.splice(startLine, endLine - startLine, ...modal);
  fs.writeFileSync('components/AnatomyVisualizer.tsx', lines.join('\n'), 'utf8');
  console.log('Modal added!');
} else {
  console.log('Lines not found');
}