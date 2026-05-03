dest = r"C:\Users\USER\Desktop\nclex-app\app\ai-tutor\page.tsx"
with open(dest, encoding="utf-8") as f:
    content = f.read()

old = '''fileContext = attachedFile && attachedFile.content
      ? "\\n\\n--- ATTACHED FILE: " + attachedFile.name + " ---\\n" + attachedFile.content + "\\n--- END OF FILE ---"
      : "";'''

new = '''fileContext = attachedFile && attachedFile.content && attachedFile.content !== "Extracting content..."
      ? "\\n\\n--- ATTACHED FILE: " + attachedFile.name + " ---\\n" + attachedFile.content + "\\n--- END OF FILE ---"
      : attachedFile && attachedFile.content === "Extracting content..."
      ? "\\n\\n[Note: A file named " + attachedFile.name + " was attached but is still being processed. Please ask the student to try again.]"
      : "";'''

content = content.replace(old, new)

with open(dest, "w", encoding="utf-8") as f:
    f.write(content)
print("Done! Fixed:", old in open(dest, encoding="utf-8").read())
