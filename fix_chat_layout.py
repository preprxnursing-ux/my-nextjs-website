f = open("components/ChatbotWidget.tsx", "r", encoding="utf-8")
c = f.read()
f.close()
c = c.replace(
    'display: "flex", flexDirection: "column", gap: 10',
    'display: "flex", flexDirection: "column", gap: 10, alignItems: "stretch"'
)
f = open("components/ChatbotWidget.tsx", "w", encoding="utf-8")
f.write(c)
f.close()
print("Done")
