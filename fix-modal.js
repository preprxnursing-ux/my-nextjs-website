const fs = require('fs');
let c = fs.readFileSync('components/AnatomyVisualizer.tsx', 'utf8');

// Replace inline rationale + buttons with a modal overlay
const oldRationale = `                  {ans && (
                    <div style={{ padding:"16px 20px", borderRadius:12, background:ans===q.answer?"#dcfce7":"#fee2e2", border:"1.5px solid "+(ans===q.answer?"#16a34a":"#dc2626"), fontSize:15, color:ans===q.answer?"#15803d":"#dc2626", lineHeight:1.8, marginBottom:16, fontFamily:"Georgia, serif" }}>
                      <span style={{ fontWeight:800 }}>{ans===q.answer?"Correct! ":"Incorrect. "}</span>{q.rationale}
                    </div>
                  )}
                  {ans && (
                    <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                      <button onClick={genQ} style={{ padding:"11px 28px", borderRadius:8, background:"linear-gradient(135deg,#0ea5e9,#38bdf8)", border:"none", color:"white", cursor:"pointer", fontSize:14, fontWeight:700, boxShadow:"0 4px 12px rgba(14,165,233,0.35)" }}>Next question \u2192</button>
                      <button onClick={goLearn} style={{ padding:"11px 22px", borderRadius:8, background:"white", border:"1.5px solid #0ea5e9", color:"#0ea5e9", cursor:"pointer", fontSize:14 }}>Back to lessons</button>
                    </div>
                  )}`;

const newRationale = `                  {ans && (
                    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
                      <div style={{ background:"white", borderRadius:16, padding:"32px", maxWidth:600, width:"100%", boxShadow:"0 24px 60px rgba(0,0,0,0.3)", animation:"slideUp .2s ease" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                          <div style={{ width:44, height:44, borderRadius:"50%", background:ans===q.answer?"#dcfce7":"#fee2e2", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{ans===q.answer?"✓":"✗"}</div>
                          <div>
                            <p style={{ fontSize:18, fontWeight:800, color:ans===q.answer?"#15803d":"#dc2626", margin:0 }}>{ans===q.answer?"Correct!":"Incorrect"}</p>
                            <p style={{ fontSize:12, color:"#94a3b8", margin:0 }}>Correct answer: {q.answer}) {q.options[q.answer]}</p>
                          </div>
                        </div>
                        <p style={{ fontSize:15, color:"#334155", lineHeight:1.8, marginBottom:24, fontFamily:"Georgia, serif", borderTop:"1px solid #f1f5f9", paddingTop:16 }}>{q.rationale}</p>
                        <div style={{ display:"flex", gap:10 }}>
                          <button onClick={genQ} style={{ flex:1, padding:"12px", borderRadius:10, background:"linear-gradient(135deg,#0ea5e9,#38bdf8)", border:"none", color:"white", cursor:"pointer", fontSize:15, fontWeight:700, boxShadow:"0 4px 12px rgba(14,165,233,0.35)" }}>Next question \u2192</button>
                          <button onClick={goLearn} style={{ padding:"12px 20px", borderRadius:10, background:"white", border:"1.5px solid #e2e8f0", color:"#64748b", cursor:"pointer", fontSize:14 }}>Back to lessons</button>
                        </div>
                      </div>
                    </div>
                  )}`;

c = c.replace(oldRationale, newRationale);
fs.writeFileSync('components/AnatomyVisualizer.tsx', c, 'utf8');
console.log('Done:', c.includes('position:"fixed"') ? 'modal added' : 'no match found');