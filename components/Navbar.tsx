"use client";
import { useCart } from "@/lib/cartContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, X, Menu, LogOut, User, Search } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import MobileNav from "./MobileNav";

const courseItems = [
  { exam: "Pre-Nursing", color: "#f59e0b", href: "/courses/pre-nursing", tag: "TEAS 7 · HESI A2" },
  { exam: "Nursing School", color: "#10b981", href: "/courses/nursing-school", tag: "Fundamentals to advanced" },
  { exam: "NCLEX-RN®", color: "#0ea5e9", href: "/courses/nclex-rn", tag: "3,100+ questions" },
  { exam: "NCLEX-PN®", color: "#6366f1", href: "/courses/nclex-pn", tag: "Full PN test plan" },
  { exam: "Nurse Practitioner", color: "#8b5cf6", href: "/courses/fnp", tag: "FNP · AGPCNP" },
  { exam: "CCRN®", color: "#ef4444", href: "/courses/ccrn", tag: "Critical care prep" },
];

const searchPages = [
  { label: "NCLEX-RN Course", href: "/courses/nclex-rn" },
  { label: "NCLEX-PN Course", href: "/courses/nclex-pn" },
  { label: "TEAS 7 & HESI A2", href: "/courses/pre-nursing" },
  { label: "CCRN Course", href: "/courses/ccrn" },
  { label: "FNP Course", href: "/courses/fnp" },
  { label: "Nursing School", href: "/courses/nursing-school" },
  { label: "AI Tutor", href: "/ai-tutor" },
  { label: "Practice Quiz", href: "/quiz" },
  { label: "Anatomy Lab", href: "/anatomy" },
  { label: "Pricing", href: "/pricing" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Features", href: "/features" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Nursing TV", href: "/nursing-tv" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const navStyle = `
  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .nav-dropdown { animation: dropIn .15s ease both; }
  .nav-tab {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 0 16px; height: 38px; font-size: 13px; font-weight: 600;
    color: #334155; background: transparent; border: none; cursor: pointer;
    text-decoration: none; white-space: nowrap; font-family: inherit;
    border-bottom: 3px solid transparent; transition: color .15s, border-color .15s;
    flex-shrink: 0;
  }
  .nav-tab:hover { color: #0ea5e9; border-bottom-color: #0ea5e9; }
  .nav-tab.active { color: #0ea5e9; border-bottom-color: #0ea5e9; font-weight: 700; }
  .hamburger-btn { display: none !important; }
  @media (max-width: 900px) {
    .hamburger-btn { display: flex !important; }
    #nav-row2 { display: none !important; }
    #nav-search { display: none !important; }
  }
`;

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof searchPages>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSearch(val: string) {
    setQuery(val);
    if (val.trim().length < 1) { setResults([]); setOpen(false); return; }
    const filtered = searchPages.filter(p => p.label.toLowerCase().includes(val.toLowerCase()));
    setResults(filtered);
    setOpen(true);
  }

  function handleSelect(href: string) {
    setQuery(""); setResults([]); setOpen(false);
    router.push(href);
  }

  return (
    <div ref={ref} style={{ position: "relative", width: 260 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: "7px 12px" }}>
        <input
          value={query}
          onChange={e => handleSearch(e.target.value)}
          onFocus={() => query && setOpen(true)}
          onKeyDown={e => { if (e.key === "Enter" && results.length > 0) handleSelect(results[0].href); if (e.key === "Escape") { setOpen(false); setQuery(""); } }}
          placeholder="Search subjects, topics..."
          style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "#334155", width: "100%", fontFamily: "inherit" }}
        />
        <button onClick={() => results.length > 0 && handleSelect(results[0].href)}
          style={{ background: "#0ea5e9", border: "none", borderRadius: 4, padding: "3px 8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Search style={{ width: 13, height: 13, color: "#fff" }} />
        </button>
      </div>
      {open && results.length > 0 && (
        <div className="nav-dropdown" style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,.1)", zIndex: 1001, overflow: "hidden" }}>
          {results.slice(0, 8).map(r => (
            <button key={r.href} onClick={() => handleSelect(r.href)}
              style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "9px 14px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#334155", textAlign: "left", fontFamily: "inherit" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
              onMouseLeave={e => (e.currentTarget.style.background = "none")}>
              <Search style={{ width: 11, height: 11, color: "#94a3b8", flexShrink: 0 }} />
              {r.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CoursesDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  function handleEnter() { if (timeout.current) clearTimeout(timeout.current); setOpen(true); }
  function handleLeave() { timeout.current = setTimeout(() => setOpen(false), 140); }
  return (
    <div style={{ position: "relative", height: 40, display: "flex", alignItems: "center" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button className={`nav-tab${isActive(pathname, "/courses") ? " active" : ""}`}>
        Courses <ChevronDown style={{ width: 11, height: 11, transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      {open && (
        <div className="nav-dropdown" style={{ position: "absolute", left: 0, top: "100%", zIndex: 1001, paddingTop: 4, width: 300 }}>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, boxShadow: "0 12px 40px rgba(0,0,0,.12)", overflow: "hidden" }}>
            <div style={{ padding: "6px 8px" }}>
              {courseItems.map(c => (
                <Link key={c.href} href={c.href}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 6, textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{c.exam}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{c.tag}</div>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ borderTop: "1px solid #f1f5f9", padding: "8px" }}>
              <Link href="/courses" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8px", borderRadius: 6, background: "#0ea5e9", color: "#fff", textDecoration: "none", fontSize: 12, fontWeight: 700 }}>
                View all courses →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartPlan } = useCart();
  const [user, setUser] = useState<any>(null);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    setAvatarOpen(false);
  }

  const initials = user?.email ? user.email.slice(0, 2).toUpperCase() : "?";

  return (
    <>
      <style>{navStyle}</style>
      <header style={{ position: "sticky", top: 0, zIndex: 9999, background: "#fff", borderBottom: "1px solid #e2e8f0" }}>

        {/* ROW 1 — Logo + Search + Auth */}
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", gap: 12 }}>

          {/* LOGO */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <Image src="/logo.png" alt="Pre-NCLEX Nursing" width={44} height={44} style={{ borderRadius: 10 }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", lineHeight: 1, letterSpacing: "0.05em" }}>Pre-NCLEX-Review</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", lineHeight: 1.2, fontFamily: "serif" }}>NURSING</span>
            </div>
          </Link>

          {/* SEARCH */}
          <div id="nav-search">
            <SearchBar />
          </div>

          {/* AUTH + CART */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {/* CART */}
            <Link href="/cart" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, textDecoration: "none", color: "#334155" }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              {cartPlan && <span style={{ position: "absolute", top: 0, right: 0, background: "#0ea5e9", color: "#fff", fontSize: 9, fontWeight: 800, borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>1</span>}
            </Link>

            {/* USER */}
            {user ? (
              <div style={{ position: "relative" }}>
                <button onClick={() => setAvatarOpen(!avatarOpen)}
                  style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>{initials}</div>
                  <ChevronDown style={{ width: 12, height: 12, color: "#64748b", transform: avatarOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s" }} />
                </button>
                {avatarOpen && (
                  <>
                    <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setAvatarOpen(false)} />
                    <div className="nav-dropdown" style={{ position: "absolute", right: 0, top: "100%", zIndex: 1001, marginTop: 8, width: 200, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,.15)" }}>
                      <div style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9" }}>
                        <p style={{ fontSize: 11, color: "#64748b", margin: 0 }}>Signed in as</p>
                        <p style={{ fontSize: 12, fontWeight: 600, color: "#0f172a", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</p>
                      </div>
                      <div style={{ padding: 6 }}>
                        <Link href="/dashboard" onClick={() => setAvatarOpen(false)}
                          style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, fontSize: 13, color: "#334155", textDecoration: "none" }}
                          onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
                          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                          <User style={{ width: 14, height: 14 }} /> My Dashboard
                        </Link>
                        <button onClick={handleLogout}
                          style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", borderRadius: 8, fontSize: 13, color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
                          onMouseEnter={e => (e.currentTarget.style.background = "#fef2f2")}
                          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                          <LogOut style={{ width: 14, height: 14 }} /> Sign out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href={`/auth/login?returnUrl=${encodeURIComponent(pathname)}`}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 6, background: "#0ea5e9", color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>
                Sign In
              </Link>
            )}

            {/* MOBILE HAMBURGER */}
            <button className="hamburger-btn"
              style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "1px solid #e2e8f0", background: "#f8fafc", color: "#334155", cursor: "pointer" }}
              onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X style={{ width: 18, height: 18 }} /> : <Menu style={{ width: 18, height: 18 }} />}
            </button>
          </div>
        </div>

        {/* ROW 2 — Navigation tabs */}
        <div id="nav-row2" style={{ background: "#f8fafc", borderTop: "2px solid #0ea5e9" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", overflow: "hidden" }}>
            <CoursesDropdown pathname={pathname} />
            <Link href="/features" className={`nav-tab${isActive(pathname, "/features") ? " active" : ""}`}>Features</Link>
            <Link href="/testimonials" className={`nav-tab${isActive(pathname, "/testimonials") ? " active" : ""}`}>Testimonials</Link>
            <Link href="/nursing-tv" className={`nav-tab${isActive(pathname, "/nursing-tv") ? " active" : ""}`}>Nursing TV</Link>
            <Link href="/blog" className={`nav-tab${isActive(pathname, "/blog") ? " active" : ""}`}>Blog</Link>
            <Link href="/quiz" className={`nav-tab${isActive(pathname, "/quiz") ? " active" : ""}`}>Practice Quiz</Link>
            <Link href="/anatomy" className={`nav-tab${isActive(pathname, "/anatomy") ? " active" : ""}`}>Anatomy Lab</Link>
            <Link href="/ai-tutor" className={`nav-tab${isActive(pathname, "/ai-tutor") ? " active" : ""}`}>AI Tutor</Link>
            <Link href="/pricing" className={`nav-tab${isActive(pathname, "/pricing") ? " active" : ""}`}>Pricing</Link>
            <Link href="/contact" className={`nav-tab${isActive(pathname, "/contact") ? " active" : ""}`}>Contact</Link>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {mobileOpen && (
          <>
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 998 }} onClick={() => setMobileOpen(false)} />
            <div style={{ position: "fixed", top: 0, right: 0, width: 280, height: "100vh", background: "#fff", zIndex: 999, display: "flex", flexDirection: "column", boxShadow: "-8px 0 32px rgba(0,0,0,.15)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>Menu</span>
                <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}><X style={{ width: 20, height: 20 }} /></button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
                {[
                  ["Courses", "/courses"], ["Features", "/features"], ["Testimonials", "/testimonials"],
                  ["Nursing TV", "/nursing-tv"], ["Blog", "/blog"], ["Practice Quiz", "/quiz"],
                  ["Anatomy Lab", "/anatomy"], ["AI Tutor", "/ai-tutor"], ["Pricing", "/pricing"], ["Contact", "/contact"]
                ].map(([label, href]) => (
                  <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                    style={{ display: "block", padding: "12px 16px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, color: isActive(pathname, href) ? "#0ea5e9" : "#334155", background: isActive(pathname, href) ? "#f0f9ff" : "transparent" }}>
                    {label}
                  </Link>
                ))}
                {!user ? (
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "12px 0", padding: "12px", borderRadius: 8, background: "#0ea5e9", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
                    Sign In
                  </Link>
                ) : (
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                    style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", margin: "12px 0", padding: "12px 16px", borderRadius: 8, background: "#fef2f2", color: "#ef4444", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, fontFamily: "inherit" }}>
                    <LogOut style={{ width: 16, height: 16 }} /> Sign out
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </header>
      <MobileNav pathname={pathname} user={user} handleLogout={handleLogout} />
    </>
  );
}
