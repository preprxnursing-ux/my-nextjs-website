with open(r'app\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old = '''            {/* NURSING TV PROMO CARD */}
            <div style={{ position: "absolute", right: "40px", top: "50%", transform: "translateY(-50%)", width: "420px", zIndex: 2 }}>
              <div style={{ background: "linear-gradient(145deg,#ffffff,#f0f6ff)", border: "1px solid rgba(14,165,233,.2)", borderRadius: "20px", padding: "32px", backdropFilter: "blur(20px)", boxShadow: "0 32px 80px rgba(0,0,0,.3), 0 0 0 1px rgba(255,255,255,.8)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.25)", borderRadius: "100px", padding: "5px 12px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", display: "inline-block", boxShadow: "0 0 6px #ef4444", animation: "pulseRing 1.8s ease-out infinite" }} />
                    <span style={{ fontSize: "9px", fontWeight: 900, color: "#ef4444", letterSpacing: ".22em" }}>LIVE NOW</span>
                  </div>
                  <span style={{ fontSize: "10px", color: "#64748b", fontWeight: 500 }}>6 channels · 100+ episodes</span>
                </div>
                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.8rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.15, marginBottom: "10px" }}>
                  The only Nursing TV<br />
                  <span style={{ color: "#38bdf8" }}>of its kind.</span>
                </h3>
                <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.7, marginBottom: "20px" }}>
                  Cinematic video lessons. One dedicated channel per certification path. Learn the way nurses were never taught before.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
                  {[["NCLEX-RN TV", "#0ea5e9"], ["NCLEX-PN TV", "#6366f1"], ["CCRN TV", "#ef4444"], ["TEAS 7 TV", "#f59e0b"]].map(([name, color]) => (
                    <div key={name} style={{ display: "flex", alignItems: "center", gap: "6px", background: color + "10", border: "1px solid " + color + "25", borderRadius: "8px", padding: "7px 10px" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />
                      <span style={{ fontSize: "10px", fontWeight: 700, color: color }}>{name}</span>
                    </div>
                  ))}
                </div>
                <a href="/nursing-tv" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "12px", borderRadius: "12px", fontSize: "13px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 24px rgba(14,165,233,.3)" }}>
                  <svg width="13" height="13" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  Tune in free — watch now
                </a>
              </div>
            </div>'''

new = '''            {/* NURSING TV PROMO CARD */}
            <div style={{ position: "absolute", right: "40px", top: "50%", transform: "translateY(-50%)", width: "440px", zIndex: 2 }}>
              <div style={{ background: "linear-gradient(160deg,#ffffff 0%,#f0f7ff 60%,#e8f4fd 100%)", borderRadius: "24px", padding: "36px", boxShadow: "0 40px 100px rgba(0,0,0,.25), 0 0 0 1px rgba(14,165,233,.15)", position: "relative", overflow: "hidden" }}>

                {/* Decorative background circle */}
                <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle,rgba(14,165,233,.12) 0%,transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "160px", height: "160px", borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,.08) 0%,transparent 70%)", pointerEvents: "none" }} />

                {/* Top accent line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,#0ea5e9,#6366f1,#ef4444)", borderRadius: "24px 24px 0 0" }} />

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "22px", position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", borderRadius: "100px", padding: "5px 14px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", display: "inline-block", boxShadow: "0 0 8px #ef4444", animation: "pulseRing 1.8s ease-out infinite" }} />
                    <span style={{ fontSize: "9px", fontWeight: 900, color: "#ef4444", letterSpacing: ".25em" }}>LIVE NOW</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>6 channels · 100+ episodes</span>
                </div>

                {/* Heading */}
                <div style={{ position: "relative", marginBottom: "14px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 800, color: "#0ea5e9", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: "8px" }}>Nursing TV</p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.1, margin: 0 }}>
                    The only Nursing TV<br />
                    <span style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>of its kind.</span>
                  </h3>
                </div>

                {/* Description */}
                <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.8, marginBottom: "24px", fontWeight: 400 }}>
                  Cinematic lessons. One dedicated channel per certification path. The learning experience your competitors simply cannot match.
                </p>

                {/* Channel pills */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "24px" }}>
                  {[["NCLEX-RN TV", "#0ea5e9", "Registered Nurse"], ["NCLEX-PN TV", "#6366f1", "Practical Nurse"], ["CCRN TV", "#ef4444", "Critical Care"], ["TEAS 7 TV", "#f59e0b", "Pre-Nursing"]].map(([name, color, tag]) => (
                    <a key={name} href="/nursing-tv" style={{ display: "flex", alignItems: "center", gap: "8px", background: color + "08", border: "1px solid " + color + "20", borderRadius: "10px", padding: "10px 12px", textDecoration: "none", transition: "all .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = color + "15"; e.currentTarget.style.borderColor = color + "40"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = color + "08"; e.currentTarget.style.borderColor = color + "20"; e.currentTarget.style.transform = "translateY(0)"; }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0, boxShadow: "0 0 4px " + color }} />
                      <div>
                        <p style={{ fontSize: "11px", fontWeight: 800, color: color, margin: 0, letterSpacing: ".02em" }}>{name}</p>
                        <p style={{ fontSize: "9px", color: "#94a3b8", margin: 0, fontWeight: 500 }}>{tag}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* CTA */}
                <a href="/nursing-tv" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "14px 20px", borderRadius: "14px", fontSize: "14px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 32px rgba(14,165,233,.35)", letterSpacing: ".01em" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    Tune in free — watch now
                  </span>
                  <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>

                {/* Footer note */}
                <p style={{ fontSize: "11px", color: "#94a3b8", textAlign: "center", margin: "14px 0 0", fontWeight: 500 }}>Free forever · No signup required to watch</p>
              </div>
            </div>'''

content = content.replace(old, new)

with open(r'app\page.tsx', 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print("SUCCESS: Nursing TV promo card redesigned.")