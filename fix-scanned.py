dest = r"C:\Users\USER\Desktop\nclex-app\app\ai-tutor\page.tsx"
with open(dest, encoding="utf-8") as f:
    content = f.read()

old = "        setAttachedFile({ name: file.name, content: data.text || \"Could not extract content.\", type: ext });"
new = """        if (data.scanned) {
          setAttachedFile({ name: file.name, content: "This PDF appears to be scanned. Please copy and paste the text you want James to read.", type: ext });
        } else {
          setAttachedFile({ name: file.name, content: data.text || "Could not extract content.", type: ext });
        }"""

content = content.replace(old, new)
with open(dest, "w", encoding="utf-8") as f:
    f.write(content)
print("Done! Replaced:", "data.scanned" in open(dest, encoding="utf-8").read())
