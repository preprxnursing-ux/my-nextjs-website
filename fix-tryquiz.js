const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');

f = f.replace(
  `? <span style={{ fontSize: "10px", fontWeight: 800, background: "rgba(14,165,233,.12)", color: "#0ea5e9", border: "1px solid rgba(14,165,233,.25)", padding: "2px 7px", borderRadius: "100px" }}>LIVE</span>
                                : <span style={{ fontSize: "10px", fontWeight: 600, background: "rgba(0,0,0,.04)", color: "#94a3b8", border: "1px solid rgba(0,0,0,.06)", padding: "2px 7px", borderRadius: "100px" }}>SOON</span>`,
  `? (<div style={{display:"flex",alignItems:"center",gap:"6px"}}><span style={{ fontSize: "10px", fontWeight: 800, background: "rgba(14,165,233,.12)", color: "#0ea5e9", border: "1px solid rgba(14,165,233,.25)", padding: "2px 7px", borderRadius: "100px" }}>LIVE</span><Link href={"/quiz/select?examType="+course.exam.replace("(R)","")} onClick={()=>setCoursesOpen(false)} style={{fontSize:"10px",fontWeight:700,color:"#0ea5e9",textDecoration:"none",border:"1px solid rgba(14,165,233,.3)",padding:"2px 7px",borderRadius:"100px"}}>Try Quiz</Link></div>)
                                : (<div style={{display:"flex",alignItems:"center",gap:"6px"}}><span style={{ fontSize: "10px", fontWeight: 600, background: "rgba(0,0,0,.04)", color: "#94a3b8", border: "1px solid rgba(0,0,0,.06)", padding: "2px 7px", borderRadius: "100px" }}>SOON</span><Link href={"/quiz/select?examType="+course.exam.replace("(R)","")} onClick={()=>setCoursesOpen(false)} style={{fontSize:"10px",fontWeight:700,color:"#0ea5e9",textDecoration:"none",border:"1px solid rgba(14,165,233,.3)",padding:"2px 7px",borderRadius:"100px"}}>Try Quiz</Link></div>)`
);

fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Done');
