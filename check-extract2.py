dest = r"C:\Users\USER\Desktop\nclex-app\app\api\extract\route.ts"
with open(dest, encoding="utf-8") as f:
    content = f.read()
print("Has scanned:", "scanned" in content)
print("Has isGarbage:", "isGarbage" in content)
