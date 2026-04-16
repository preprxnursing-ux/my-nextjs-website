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
    c = c.replace(b'->', b'\xe2\x86\x92')
    with open(path, 'wb') as f:
        f.write(c)
    print('Restored arrows:', path)
print('All done!')
