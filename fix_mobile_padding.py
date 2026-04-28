# Fix AI tutor page bottom padding for mobile
f = open("app/ai-tutor/page.tsx", "r", encoding="utf-8")
c = f.read()
f.close()
c = c.replace(
    '"20px 20px 120px"',
    '"20px 20px 140px"'
)
f = open("app/ai-tutor/page.tsx", "w", encoding="utf-8")
f.write(c)
f.close()

# Fix MobileNav CSS - ensure tab bar always shows above everything
f = open("components/MobileNav.tsx", "r", encoding="utf-8")
c = f.read()
f.close()
c = c.replace(
    '.mob-tabbar { position: fixed; bottom: 0; left: 0; right: 0; height: 58px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; align-items: stretch; z-index: 997; }',
    '.mob-tabbar { position: fixed; bottom: 0; left: 0; right: 0; height: 58px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; align-items: stretch; z-index: 9997; }'
)
# Fix chatbot widget z-index to not cover tab bar
f2 = open("components/ChatbotWidget.tsx", "r", encoding="utf-8")
c2 = f2.read()
f2.close()
c2 = c2.replace(
    'position: "fixed", bottom: 24, right: 24, zIndex: 9999,',
    'position: "fixed", bottom: 80, right: 16, zIndex: 9990,'
)
c2 = c2.replace(
    'position: "fixed", bottom: 90, right: 24, zIndex: 9998,',
    'position: "fixed", bottom: 145, right: 16, zIndex: 9989,'
)
f2 = open("components/ChatbotWidget.tsx", "w", encoding="utf-8")
f2.write(c2)
f2.close()

# Fix globals.css - ensure main padding bottom on mobile
f3 = open("app/globals.css", "r", encoding="utf-8")
c3 = f3.read()
f3.close()
if '@media (max-width: 767px)' not in c3:
    c3 += '\n@media (max-width: 767px) { main { padding-bottom: 70px !important; } }\n'
f3 = open("app/globals.css", "w", encoding="utf-8")
f3.write(c3)
f3.close()

print("Done")
