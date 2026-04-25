import re

with open(r'app\nursing-tv\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old = '''<div style={{ background: "#ffffff", borderTop: "1px solid rgba(255,255,255,.04)", borderBottom: "1px solid rgba(255,255,255,.04)", padding: "28px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <p style={{ fontSize: "10px", fontWeight: 800, color: "#334155", letterSpacing: ".2em", textTransform: "uppercase", margin: "0 0 4px" }}>Channel Guide</p>
              <h2 style={{ fontFamily: "\\'Cormorant Garamond\\',serif", fontSize: "1.6rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>Choose your channel</h2>
            </div>
            <span style={{ fontSize: "11px", color: "#334155", fontWeight: 500 }}>{channels.length} channels available</span>
          </div>'''

new = '''<div style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,.06)", borderBottom: "1px solid rgba(0,0,0,.06)", padding: "28px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <p style={{ fontSize: "10px", fontWeight: 800, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", margin: "0 0 4px" }}>Channel Guide</p>
              <h2 style={{ fontFamily: "\\'Cormorant Garamond\\',serif", fontSize: "1.6rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Choose your channel</h2>
            </div>
            <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>{channels.length} channels available</span>
          </div>'''

content = content.replace(old, new)

# Fix channel card text colors for white background
content = content.replace(
    'color: activeChannel === i ? "#f8fafc" : "#94a3b8", margin: "0 0 3px"',
    'color: activeChannel === i ? "#ffffff" : "#0f172a", margin: "0 0 3px"'
)
content = content.replace(
    'color: activeChannel === i ? c.color : "#334155", margin: "0 0 10px"',
    'color: activeChannel === i ? "#ffffffcc" : "#64748b", margin: "0 0 10px"'
)
content = content.replace(
    'fontSize: "10px", color: "#475569", fontWeight: 500 }}>{c.episodes}',
    'fontSize: "10px", color: "#475569", fontWeight: 600 }}>{c.episodes}'
)

# Fix card backgrounds for white background - use light colored backgrounds
content = content.replace(
    '''background: activeChannel === i ? c.color + "18" : ["rgba(255,255,255,.05)","rgba(248,248,252,.04)","rgba(242,242,248,.04)","rgba(236,236,244,.03)","rgba(230,230,240,.03)","rgba(224,224,236,.03)"][i % 6], border: "1px solid " + (activeChannel === i ? c.color + "40" : ["rgba(255,255,255,.08)","rgba(255,255,255,.07)","rgba(255,255,255,.06)","rgba(255,255,255,.05)","rgba(255,255,255,.05)","rgba(255,255,255,.04)"][i % 6])''',
    '''background: activeChannel === i ? c.color : ["#f8fafc","#f1f5f9","#f0fdf4","#fefce8","#fdf4ff","#f0f9ff"][i % 6], border: "1px solid " + (activeChannel === i ? c.color : ["#e2e8f0","#cbd5e1","#bbf7d0","#fde68a","#e9d5ff","#bae6fd"][i % 6])'''
)

with open(r'app\nursing-tv\page.tsx', 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print("SUCCESS: Channel guide colors updated for white background.")
