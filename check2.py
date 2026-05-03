dest = r"C:\Users\USER\Desktop\nclex-app\app\ai-tutor\page.tsx"
with open(dest, encoding="utf-8") as f:
    content = f.read()
idx = content.find("fileContext")
print(repr(content[idx:idx+200]))
