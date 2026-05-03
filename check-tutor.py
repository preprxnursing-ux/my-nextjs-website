dest = r"C:\Users\USER\Desktop\nclex-app\app\ai-tutor\page.tsx"
with open(dest, encoding="utf-8") as f:
    content = f.read()
print("Has attachedFile:", "attachedFile" in content)
print("Has fileContext:", "fileContext" in content)
print("Has api/extract:", "/api/extract" in content)
print("Lines:", content.count("\n"))
