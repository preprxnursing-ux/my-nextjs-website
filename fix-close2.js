const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');

// Find the right insertion point - after all useState declarations
f = f.replace(
  '  const [avatarOpen, setAvatarOpen] = useState(false);',
  '  const [avatarOpen, setAvatarOpen] = useState(false);\n  useEffect(() => { setMoreOpen(false); setCoursesOpen(false); setAvatarOpen(false); }, [pathname]);'
);

fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Done');
