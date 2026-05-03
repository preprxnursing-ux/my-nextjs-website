dest = r"C:\Users\USER\Desktop\nclex-app\app\ai-tutor\page.tsx"
with open(dest, encoding="utf-8") as f:
    content = f.read()
# Find the fileContext and userMsg building area
idx = content.find("fileContext")
print(content[idx:idx+400])
