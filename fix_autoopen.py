f = open("components/ChatbotWidget.tsx", "r", encoding="utf-8")
c = f.read()
f.close()
c = c.replace(
    "export default function ChatbotWidget() {",
    "export default function ChatbotWidget({ autoOpen = false }: { autoOpen?: boolean }) {"
)
c = c.replace(
    "const [open, setOpen] = useState(false);",
    "const [open, setOpen] = useState(autoOpen);"
)
f = open("components/ChatbotWidget.tsx", "w", encoding="utf-8")
f.write(c)
f.close()
print("Done")
