with open(r'app\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old = '''                <div style={{ position: "relative", marginBottom: "18px" }}>
                  <div style={{ background: "#f1f5f9", borderRadius: "8px", padding: "8px 14px", marginBottom: "14px", display: "inline-block" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748b", fontStyle: "italic" }}>The only Nursing TV of its kind.</span>
                  </div>
                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.4rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.1, margin: 0 }}>
                    Now you have a chance<br />
                    <span style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>using the only Nursing TV<br />built for nurses.</span>
                  </h3>
                </div>
                {/* Description */}
                <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.8, marginBottom: "24px", fontWeight: 400 }}>
                  Cinematic lessons. One dedicated channel per certification path. The learning experience your competitors simply cannot match.
                </p>'''

new = '''                {/* Heading */}
                <div style={{ marginBottom: "20px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 800, color: "#0ea5e9", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: "12px" }}>Exclusive · Free · Live</p>
                  <div style={{ background: "linear-gradient(135deg,#f8fafc,#f1f5f9)", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "12px 16px", marginBottom: "16px" }}>
                    <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.7rem", fontWeight: 700, color: "#334155", lineHeight: 1.2, margin: 0 }}>
                      Now you have a chance using the only<br />Nursing TV built for nurses.
                    </h3>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                    <a href="/nursing-tv" style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#ff0000", borderRadius: "6px", padding: "4px 10px" }}>
                        <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/></svg>
                        <span style={{ fontSize: "11px", fontWeight: 900, color: "white", letterSpacing: ".04em" }}>NURSING TV</span>
                      </div>
                      <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>by Pre-NCLEX-Review</span>
                    </a>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", borderRadius: "100px", padding: "3px 10px" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ef4444", display: "inline-block", animation: "pulseRing 1.8s ease-out infinite" }} />
                      <span style={{ fontSize: "9px", fontWeight: 800, color: "#ef4444", letterSpacing: ".15em" }}>LIVE</span>
                    </div>
                  </div>
                  <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.75, marginBottom: "0", fontWeight: 400 }}>
                    Cinematic lessons. One dedicated channel per certification path.
                  </p>
                </div>'''

content = content.replace(old, new)

with open(r'app\page.tsx', 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print("SUCCESS: Card heading redesigned.")
