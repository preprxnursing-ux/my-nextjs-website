dest = r"C:\Users\USER\Desktop\nclex-app\app\api\extract\route.ts"
with open(dest, encoding="utf-8") as f:
    content = f.read()

old = '''        const clean = text.replace(/\\s+/g, " ").trim();
        return NextResponse.json({
          text: clean.slice(0, 8000) || "No readable text found in PDF.",
          name: file.name,
          type: "pdf"
        });'''

new = '''        const clean = text.replace(/\\s+/g, " ").trim();
        const isGarbage = clean.length < 50 || (clean.match(/[a-zA-Z ]/g) || []).length / Math.max(clean.length, 1) < 0.5;
        if (isGarbage) {
          return NextResponse.json({ text: "", scanned: true, name: file.name, type: "pdf" });
        }
        return NextResponse.json({
          text: clean.slice(0, 8000),
          scanned: false,
          name: file.name,
          type: "pdf"
        });'''

content = content.replace(old, new)
with open(dest, "w", encoding="utf-8") as f:
    f.write(content)
print("Done! Replaced:", old[:50] in open(dest, encoding="utf-8").read())
