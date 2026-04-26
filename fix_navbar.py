import re

with open(r'app\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_card = '''            {/* NURSING TV PROMO CARD */}
            <div style={{ position: "absolute", right: "40px", top: "50%", transform: "translateY(-50%)", width: "528px", zIndex: 2 }}>
              <div style={{ background: "linear-gradient(160deg,#ffffff 0%,#f0f7ff 60%,#e8f4fd 100%)", borderRadius: "24px", padding: "36px", boxShadow: "0 40px 100px rgba(0,0,0,.25), 0 0 0 1px rgba(14,165,233,.15)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,#0ea5e9,#6366f1,#ef4444)", borderRadius: "24px 24px 0 0" }} />
                <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle,rgba(14,165,233,.12) 0%,transparent 70%)", pointerEvents: "none" }} />

                {/* LIVE badge */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", borderRadius: "100px", padding: "5px 14px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", display: "inline-block", boxShadow: "0 0 8px #ef4444", animation: "pulseRing 1.8s ease-out infinite" }} />
                    <span style={{ fontSize: "9px", fontWeight: 900, color: "#ef4444", letterSpacing: ".25em" }}>LIVE NOW</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>6 channels · 100+ episodes</span>
                </div>

                {/* Main heading */}
                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.6rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.1, margin: "0 0 18px" }}>
                  Now you have a chance
                </h3>

                {/* Grey div with Nursing TV button */}
                <div style={{ background: "#f1f5f9", borderRadius: "12px", padding: "16px 20px", marginBottom: "22px" }}>
                  <p style={{ fontSize: "15px", color: "#334155", lineHeight: 1.8, margin: 0, fontWeight: 500 }}>
                    to excel using the only{" "}
                    <a href="/nursing-tv" style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "#ff0000", color: "white", padding: "3px 12px 3px 8px", borderRadius: "6px", fontSize: "13px", fontWeight: 900, textDecoration: "none", verticalAlign: "middle", margin: "0 3px" }}>
                      <svg width="13" height="13" fill="white" viewBox="0 0 24 24"><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/></svg>
                      Nursing TV
                    </a>{" "}
                    of its kind.
                  </p>
                </div>

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
                <a href="/nursing-tv" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "14px 20px", borderRadius: "14px", fontSize: "14px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 32px rgba(14,165,233,.35)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    Tune in free — watch now
                  </span>
                  <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <p style={{ fontSize: "11px", color: "#94a3b8", textAlign: "center", margin: "14px 0 0", fontWeight: 500 }}>Free forever · No signup required to watch</p>
              </div>
            </div>'''

# Replace everything between NURSING TV PROMO CARD comment and the closing div
pattern = r'\{/\* NURSING TV PROMO CARD \*/\}.*?</div>\s*</div>\s*</div>'
result = re.sub(pattern, new_card.strip() + '\n            </div>', content, flags=re.DOTALL)

if result == content:
    print("ERROR: Pattern not found.")
else:
    with open(r'app\page.tsx', 'w', encoding='utf-8', newline='\n') as f:
        f.write(result)
    print("SUCCESS: Card fully rewritten.")
    