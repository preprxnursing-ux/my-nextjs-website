with open(r'components\Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# White navbar background
content = content.replace(
    'background: "rgba(6,15,30,0.97)", borderBottom: "1px solid rgba(14,165,233,0.1)", backdropFilter: "blur(20px)", boxShadow: "0 4px 32px rgba(0,0,0,0.3)"',
    'background: "#ffffff", borderBottom: "1px solid rgba(0,0,0,0.08)", backdropFilter: "blur(20px)", boxShadow: "0 2px 16px rgba(0,0,0,0.08)"'
)

# Dark nav-btn text for white background
content = content.replace(
    'color: #cbd5e1; background: transparent; border: none; cursor: pointer;',
    'color: #334155; background: transparent; border: none; cursor: pointer;'
)
content = content.replace(
    '.nav-btn:hover { background: rgba(255,255,255,.08); color: #f1f5f9; }',
    '.nav-btn:hover { background: rgba(14,165,233,.08); color: #0ea5e9; }'
)
content = content.replace(
    '.nav-btn.active { background: rgba(14,165,233,.15); color: #38bdf8; }',
    '.nav-btn.active { background: rgba(14,165,233,.1); color: #0ea5e9; }'
)

# Fix mobile menu background
content = content.replace(
    'background: "linear-gradient(160deg,#0d1f35,#0f2540)"',
    'background: "#ffffff"'
)

# Fix mobile menu border
content = content.replace(
    'borderTop: "1px solid rgba(255,255,255,.06)", background: "linear-gradient(160deg,#0d1f35,#0f2540)"',
    'borderTop: "1px solid rgba(0,0,0,.06)", background: "#ffffff"'
)

with open(r'components\Navbar.tsx', 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print("SUCCESS: Navbar converted to white background.")