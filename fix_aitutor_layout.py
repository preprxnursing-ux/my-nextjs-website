f = open("app/ai-tutor/page.tsx", "r", encoding="utf-8")
c = f.read()
f.close()

# Make page not overlap navbar - add padding top
c = c.replace(
    'padding: "40px 20px 28px"',
    'padding: "24px 20px 20px"'
)

# Ensure bottom input doesnt cover mobile tab bar
c = c.replace(
    'padding: "14px 20px" }}',
    'padding: "14px 20px", paddingBottom: "calc(14px + env(safe-area-inset-bottom))" }}'
)

f = open("app/ai-tutor/page.tsx", "w", encoding="utf-8")
f.write(c)
f.close()
print("Done")
