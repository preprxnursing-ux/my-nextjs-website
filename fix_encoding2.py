import os
replacements = [
    (b'\xe2\x80\x94', b' - '),
    (b'\xe2\x80\x93', b' - '),
    (b'\xe2\x80\x99', b"'"),
    (b'\xe2\x98\x85', b'*'),
    (b'\xe2\x9c\x94', b'v'),
    (b'\xc2\xae', b'(R)'),
    (b'\xc2\xb7', b' . '),
    (b'\xc2\xa0', b' '),
]
files = []
for root, dirs, filenames in os.walk('app'):
    for f in filenames:
        if f.endswith('.tsx'):
            files.append(os.path.join(root, f))
files.append('components/Navbar.tsx')
for path in files:
    with open(path, 'rb') as f:
        c = f.read()
    original = c
    for old, new in replacements:
        c = c.replace(old, new)
    if c != original:
        with open(path, 'wb') as f:
            f.write(c)
        print('Fixed:', path)
    else:
        print('No changes:', path)
print('All done!')
