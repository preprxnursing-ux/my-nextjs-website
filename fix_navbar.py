with open(r'app\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old = '''                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.4rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.1, margin: 0 }}>
                    Now you have a chance<br />
                    <span style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>using the only Nursing TV<br />built for nurses.</span>
                  </h3>
                </div>
                {/* Description */}
                <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.8, marginBottom: "24px", fontWeight: 400 }}>
                  
                </p>'''

new = '''                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.4rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.1, margin: "0 0 16px" }}>
                    Now you have a chance
                  </h3>
                  <div style={{ background: "#f1f5f9", borderRadius: "10px", padding: "14px 18px", marginBottom: "0" }}>
                    <p style={{ fontSize: "14px", color: "#334155", lineHeight: 1.8, margin: 0, fontWeight: 500 }}>
                      to excel using the only{" "}
                      <a href="/nursing-tv" style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "#ff0000", color: "white", padding: "2px 10px 2px 8px", borderRadius: "5px", fontSize: "12px", fontWeight: 900, textDecoration: "none", verticalAlign: "middle", margin: "0 2px" }}>
                        <svg width="12" height="12" fill="white" viewBox="0 0 24 24"><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/></svg>
                        Nursing TV
                      </a>{" "}
                      built for nurses.
                    </p>
                  </div>
                </div>
                {/* spacer */}
                <div style={{ marginBottom: "20px" }} />'''

content = content.replace(old, new)

with open(r'app\page.tsx', 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print("SUCCESS: Grey div with Nursing TV button added.")