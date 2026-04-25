import re

with open(r'app\nursing-tv\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Give each channel card a unique grey shade based on index
old = '''style={{ background: activeChannel === i ? c.color + "18" : "rgba(255,255,255,.04)", border: "1px solid " + (activeChannel === i ? c.color + "40" : "rgba(255,255,255,.06)")'''

new = '''style={{ background: activeChannel === i ? c.color + "18" : ["rgba(255,255,255,.05)","rgba(248,248,252,.04)","rgba(242,242,248,.04)","rgba(236,236,244,.03)","rgba(230,230,240,.03)","rgba(224,224,236,.03)"][i % 6], border: "1px solid " + (activeChannel === i ? c.color + "40" : ["rgba(255,255,255,.08)","rgba(255,255,255,.07)","rgba(255,255,255,.06)","rgba(255,255,255,.05)","rgba(255,255,255,.05)","rgba(255,255,255,.04)"][i % 6])'''

content = content.replace(old, new)

if old not in open(r'app\nursing-tv\page.tsx', 'r', encoding='utf-8').read():
    print("ERROR: Pattern not found")
else:
    with open(r'app\nursing-tv\page.tsx', 'w', encoding='utf-8', newline='\n') as f:
        f.write(content)
    print("SUCCESS: Channel cards updated with gradient greys.")