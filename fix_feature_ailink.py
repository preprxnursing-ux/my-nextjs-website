f = open("components/Navbar.tsx", "r", encoding="utf-8")
c = f.read()
f.close()

c = c.replace(
    '{featureItems.map((f) => (\n                  <Link key={f.title} href="/features"',
    '{featureItems.map((f) => (\n                  <Link key={f.title} href={(f as any).href || "/features"}'
)

f = open("components/Navbar.tsx", "w", encoding="utf-8")
f.write(c)
f.close()
print("Done")
