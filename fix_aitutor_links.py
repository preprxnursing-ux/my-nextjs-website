f = open("components/Navbar.tsx", "r", encoding="utf-8")
c = f.read()
f.close()

# Fix the featureItems map to use f.href if it exists
c = c.replace(
    '{featureItems.map((f) => (\n                  <Link key={f.title} href="/features"',
    '{featureItems.map((f) => (\n                  <Link key={f.title} href={(f as any).href ?? "/features"}'
)

# Fix AI Tutor feature item - add emoji and better desc
c = c.replace(
    '{ title: "AI Tutor", desc: "Your personal NCLEX study assistant — ask anything, anytime", color: "#0070f3", href: "/ai-tutor"',
    '{ title: "🤖 AI Tutor", desc: "Your personal Nursing Exams study assistant — ask anything, anytime", color: "#0070f3", href: "/ai-tutor"'
)

f = open("components/Navbar.tsx", "w", encoding="utf-8")
f.write(c)
f.close()
print("Done")
