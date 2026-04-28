const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');

const oldStr = '{course.available\r\n                                ? <span style={{ fontSize: "10px", fontWeight: 800, background: "rgba(14,165,233,.12)", color: "#0ea5e9", border: "1px solid rgba(14,165,233,.25)", padding: "2px 7px", borderRadius: "100px" }}>LIVE</span>\r\n                                : <span style={{ fontSize: "10px", fontWeight: 600, background: "rgba(0,0,0,.04)", color: "#94a3b8", border: "1px solid rgba(0,0,0,.06)", padding: "2px 7px", borderRadius: "100px" }}>SOON</span>';

const newStr = '{course.available\r\n                                ? <div style={{display:"flex",gap:"5px",alignItems:"center"}}><span style={{ fontSize: "10px", fontWeight: 800, background: "rgba(14,165,233,.12)", color: "#0ea5e9", border: "1px solid rgba(14,165,233,.25)", padding: "2px 7px", borderRadius: "100px" }}>LIVE</span><Link href={"/quiz/select?examType="+course.examType} onClick={()=>setCoursesOpen(false)} style={{fontSize:"10px",fontWeight:700,color:"#0ea5e9",textDecoration:"none",border:"1px solid rgba(14,165,233,.3)",padding:"2px 7px",borderRadius:"100px",background:"rgba(14,165,233,.06)"}}>Try Quiz</Link></div>\r\n                                : <div style={{display:"flex",gap:"5px",alignItems:"center"}}><span style={{ fontSize: "10px", fontWeight: 600, background: "rgba(0,0,0,.04)", color: "#94a3b8", border: "1px solid rgba(0,0,0,.06)", padding: "2px 7px", borderRadius: "100px" }}>SOON</span><Link href={"/quiz/select?examType="+course.examType} onClick={()=>setCoursesOpen(false)} style={{fontSize:"10px",fontWeight:700,color:"#0ea5e9",textDecoration:"none",border:"1px solid rgba(14,165,233,.3)",padding:"2px 7px",borderRadius:"100px",background:"rgba(14,165,233,.06)"}}>Try Quiz</Link></div>';

if (!f.includes(oldStr)) { console.log('NO MATCH'); process.exit(1); }
f = f.replace(oldStr, newStr);
fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Done');
