const fs = require('fs');
let f = fs.readFileSync('components/Navbar.tsx','utf8');

// Add useEffect to close all dropdowns on route change
f = f.replace(
  '  const [coursesOpen, setCoursesOpen] = useState(false);',
  '  const [coursesOpen, setCoursesOpen] = useState(false);\n  useEffect(() => { setMoreOpen(false); setCoursesOpen(false); setAvatarOpen(false); }, [pathname]);'
);

fs.writeFileSync('components/Navbar.tsx', f, 'utf8');
console.log('Done');
