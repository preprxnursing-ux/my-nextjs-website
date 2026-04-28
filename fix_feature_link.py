f = open("components/Navbar.tsx", "r", encoding="utf-8")
c = f.read()
f.close()

# Fix the feature items map to use f.href if available, otherwise /features
old = '{featureItems.map((f) => (\n                  <Link key={f.title} href="/features"'
new = '{featureItems.map((f) => (\n                  <Link key={f.title} href={(f as any).href || "/features"}'
c = c.replace(old, new)

f = open("components/Navbar.tsx", "w", encoding="utf-8")
f.write(c)
f.close()
print("Done")
