f = open("components/Navbar.tsx", "r", encoding="utf-8")
c = f.read()
f.close()
c = c.replace(
    '{ title: "AI Tutor - Coming Soon", desc: "Personalised study plans that adapt to where you struggle", color: "#c084fc", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>) },',
    '{ title: "AI Tutor", desc: "Your personal NCLEX study assistant — ask anything, anytime", color: "#0070f3", href: "/ai-tutor", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>) },'
)
f = open("components/Navbar.tsx", "w", encoding="utf-8")
f.write(c)
f.close()
print("Done")
