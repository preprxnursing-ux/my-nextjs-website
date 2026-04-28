f = open("app/layout.tsx", "r", encoding="utf-8")
c = f.read()
f.close()
c = c.replace(
    'import SessionGuard from "../components/SessionGuard";',
    'import SessionGuard from "../components/SessionGuard";\nimport ChatbotWidget from "../components/ChatbotWidget";'
)
c = c.replace(
    '</CartProvider>',
    '<ChatbotWidget />\n        </CartProvider>'
)
f = open("app/layout.tsx", "w", encoding="utf-8")
f.write(c)
f.close()
print("Done")
