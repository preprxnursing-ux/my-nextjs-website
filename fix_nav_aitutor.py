f = open("components/Navbar.tsx", "r", encoding="utf-8")
c = f.read()
f.close()

# Add AI Tutor link next to NursingTV in desktop nav (both logged in and logged out)
c = c.replace(
    '<NursingTVDropdown pathname={pathname} />\n                <ContactDropdown pathname={pathname} />',
    '<NursingTVDropdown pathname={pathname} />\n                <Link href="/ai-tutor" className={`nav-btn${isActive(pathname, "/ai-tutor") ? " active" : ""}`}>AI Tutor</Link>\n                <ContactDropdown pathname={pathname} />'
)
c = c.replace(
    '<NursingTVDropdown pathname={pathname} />\n              <ContactDropdown pathname={pathname} />',
    '<NursingTVDropdown pathname={pathname} />\n              <Link href="/ai-tutor" className={`nav-btn${isActive(pathname, "/ai-tutor") ? " active" : ""}`}>AI Tutor</Link>\n              <ContactDropdown pathname={pathname} />'
)

f = open("components/Navbar.tsx", "w", encoding="utf-8")
f.write(c)
f.close()
print("Navbar done")

# Add AI Tutor to mobile drawer Explore section
f = open("components/Navbar.tsx", "r", encoding="utf-8")
c = f.read()
f.close()
c = c.replace(
    '{ href: "/nursing-tv", label: "Nursing TV", sub: "Video lessons by RNs", color: "#ef4444", badge: "" },',
    '{ href: "/nursing-tv", label: "Nursing TV", sub: "Video lessons by RNs", color: "#ef4444", badge: "" },\n      { href: "/ai-tutor", label: "AI Tutor", sub: "Your NCLEX study assistant", color: "#0070f3", badge: "NEW" },'
)
f = open("components/Navbar.tsx", "w", encoding="utf-8")
f.write(c)
f.close()
print("Mobile drawer done")

# Add AI Tutor to MobileNav Explore grid
f = open("components/MobileNav.tsx", "r", encoding="utf-8")
c = f.read()
f.close()
c = c.replace(
    '{ href: "/faq",          label: "FAQ",          icon: <HelpCircle size={11}/> },',
    '{ href: "/faq",          label: "FAQ",          icon: <HelpCircle size={11}/> },\n                  { href: "/ai-tutor",     label: "AI Tutor",     icon: <Zap size={11}/> },'
)
f = open("components/MobileNav.tsx", "w", encoding="utf-8")
f.write(c)
f.close()
print("MobileNav done")
