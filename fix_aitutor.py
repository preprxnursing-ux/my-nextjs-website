# Fix features page - make AI Tutor card open chatbot
f = open("app/features/page.tsx", "r", encoding="utf-8")
c = f.read()
f.close()
c = c.replace(
    'title: "AI tutor -- coming soon"',
    'title: "AI Tutor"'
)
f = open("app/features/page.tsx", "w", encoding="utf-8")
f.write(c)
f.close()

# Fix navbar - add AI Tutor link
f = open("components/Navbar.tsx", "r", encoding="utf-8")
c = f.read()
f.close()
c = c.replace(
    'const appLinks = [',
    'const appLinks = [\n  { href: "/ai-tutor", label: "AI Tutor" },'
)
f = open("components/Navbar.tsx", "w", encoding="utf-8")
f.write(c)
f.close()

print("Done")
