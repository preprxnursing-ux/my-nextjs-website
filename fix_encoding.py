import os
files = []
for root, dirs, filenames in os.walk('app'):
    for f in filenames:
        if f.endswith('.tsx'):
            files.append(os.path.join(root, f))
files.append('components/Navbar.tsx')
for path in files:
    with open(path, 'rb') as f:
        c = f.read()
    c = c.replace(b'\xe2\x80\x94', b'--')
    c = c.replace(b'\xe2\x80\x93', b'-')
    c = c.replace(b'\xe2\x80\x99', b"'")
    c = c.replace(b'\xe2\x98\x85', b'*')
    c = c.replace(b'\xe2\x9c\x94', b'v')
    c = c.replace(b'\xc2\xae', b'(R)')
    c = c.replace(b'\xc2\xb7', b'.')
    c = c.replace(b'\xe2\x86\x92', b'->')
    with open(path, 'wb') as f:
        f.write(c)
    print('Fixed:', path)
print('All done!')
