"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, ChevronDown, X, Menu, LogOut, User } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

const courseItems = [
  {
    exam: "Pre-Nursing",
    title: "TEAS 7 & HESI A2 Success Toolkit",
    color: "#f59e0b",
    href: "/courses/pre-nursing",
    available: false,
    tag: "TEAS 7 · HESI A2 entrance exams",
  },
  {
    exam: "Nursing School",
    title: "Your Nursing School Companion",
    color: "#10b981",
    href: "/courses/nursing-school",
    available: false,
    tag: "Fundamentals to advanced topics",
  },
  {
    exam: "NCLEX-RN®",
    title: "NCLEX-RN Success Tools",
    color: "#0ea5e9",
    href: "/courses/nclex-rn",
    available: true,
    tag: "3,100+ questions · All 8 categories",
  },
  {
    exam: "NCLEX-PN®",
    title: "Effective NCLEX-PN Prep",
    color: "#6366f1",
    href: "/courses/nclex-pn",
    available: false,
    tag: "Full PN test plan coverage",
  },
  {
    exam: "Nurse Practitioner",
    title: "Expert NP Exam Resources",
    color: "#8b5cf6",
    href: "/courses/nurse-practitioner",
    available: false,
    tag: "FNP · AGPCNP certification prep",
  },
  {
    exam: "CCRN®",
    title: "Essential CCRN Success Resources",
    color: "#ef4444",
    href: "/courses/ccrn",
    available: false,
    tag: "ICU-level critical care prep",
  },
];

const featuredLinks = [
  { href: "/educators",    label: "For Educators" },
  { href: "/features",     label: "Our Features" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact",      label: "Contact Us" },
  { href: "/pricing",      label: "Pricing" },
];

const moreLinks = [
  { href: "#", label: "Private Tutors" },
  { href: "#", label: "Blog" },
  { href: "#", label: "FAQ" },
];

const appLinks = [
  { href: "/quiz",    label: "Quiz" },
  { href: "/results", label: "Results" },
  { href: "/review",  label: "Review" },
  { href: "/history", label: "History" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const navStyle = `
  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-8px) scale(.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .nav-dropdown { animation: dropIn .18s ease both; }

  .nav-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 6px 10px;
    border-radius: 9px;
    font-size: 13px;
    font-weight: 600;
    color: #cbd5e1;
    background: transparent;
    border: none;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
    transition: background .15s, color .15s;
    font-family: inherit;
  }
  .nav-btn:hover { background: rgba(255,255,255,.08); color: #f1f5f9; }
  .nav-btn.active { background: rgba(14,165,233,.15); color: #38bdf8; }

  .nav-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    border-radius: 9px;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    background: #0ea5e9;
    border: none;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
    transition: all .18s;
    box-shadow: 0 4px 14px rgba(14,165,233,.3);
    font-family: inherit;
  }
  .nav-btn-primary:hover { background: #38bdf8; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(14,165,233,.38); }

  .course-card {
    display: flex;
    flex-direction: column;
    padding: 16px 18px;
    border-radius: 14px;
    text-decoration: none;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
    transition: all .22s ease;
    position: relative;
    overflow: hidden;
  }
  .course-card:hover {
    background: rgba(255,255,255,.08);
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0,0,0,.3);
  }
`;

export default function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();

  const [moreOpen,    setMoreOpen]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [avatarOpen,  setAvatarOpen]  = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [user,        setUser]        = useState<any>(null);
  const [initials,    setInitials]    = useState("?");

  const coursesTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        setInitials(getInitials(data.user.user_metadata?.full_name ?? data.user.email ?? ""));
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) {
        setUser(session.user);
        setInitials(getInitials(session.user.user_metadata?.full_name ?? session.user.email ?? ""));
      } else {
        setUser(null);
        setInitials("?");
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  function getInitials(name: string) {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "?";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setAvatarOpen(false);
    router.push("/auth/login");
    router.refresh();
  }

  function handleCoursesEnter() {
    if (coursesTimeout.current) clearTimeout(coursesTimeout.current);
    setCoursesOpen(true);
  }
  function handleCoursesLeave() {
    coursesTimeout.current = setTimeout(() => setCoursesOpen(false), 140);
  }

  return (
    <>
      <style>{navStyle}</style>
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "linear-gradient(to bottom,#0a1929 0%,#0d1f35 100%)",
        borderBottom: "1px solid rgba(14,165,233,.12)",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", gap: "4px", padding: "0 16px", height: "60px" }}>

          {/* LOGO */}
          <Link href="/" style={{ flexShrink: 0, display: "flex", alignItems: "center", opacity: .92, transition: "opacity .15s", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = ".92")}>
            <Image src="/logo.png" alt="Pre-NCLEX Nursing" width={136} height={36} style={{ objectFit: "contain" }} />
          </Link>

          {/* DESKTOP NAV */}
          <div style={{ display: "flex", alignItems: "center", gap: "1px", flex: 1, justifyContent: "center", flexWrap: "nowrap", overflow: "hidden" }} className="hidden md:flex"> id="desktop-nav">

            {/* COURSES DROPDOWN */}
            <div style={{ position: "relative" }} onMouseEnter={handleCoursesEnter} onMouseLeave={handleCoursesLeave}>
              <button
                className={`nav-btn${pathname.startsWith("/courses") ? " active" : ""}`}
              >
                Courses
                <ChevronDown style={{ width: 13, height: 13, transition: "transform .2s", transform: coursesOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
              </button>

              {coursesOpen && (
                <div
                  className="nav-dropdown"
                  style={{ position: "absolute", left: 0, top: "100%", zIndex: 50, paddingTop: "10px", width: "768px" }}
                  onMouseEnter={handleCoursesEnter}
                  onMouseLeave={handleCoursesLeave}
                >
                  <div style={{
  background: "#ffffff",
  border: "1px solid rgba(0,0,0,.08)",
  borderRadius: "20px",
  boxShadow: "0 32px 80px rgba(0,0,0,.18), 0 0 0 1px rgba(0,0,0,.04)",
  overflow: "hidden",
}}>

                    {/* header */}
                    <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(0,0,0,.07)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(14,165,233,.04)" }}>
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9" }} />
    <span style={{ fontSize: "11px", fontWeight: 800, color: "#64748b", letterSpacing: ".18em", textTransform: "uppercase" }}>
  Certification Paths
</span>
  </div>
  <Link href="/courses" onClick={() => setCoursesOpen(false)}
    style={{ fontSize: "12px", fontWeight: 700, color: "#0ea5e9", textDecoration: "none" }}
    onMouseEnter={e => (e.currentTarget.style.color = "#38bdf8")}
    onMouseLeave={e => (e.currentTarget.style.color = "#0ea5e9")}>
    View all courses →
  </Link>
</div>
                    {/* 2-col bento grid */}
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "14px" }}>
  {courseItems.map((course, i) => {
    const greyShades = [
  { bg: "rgba(248,249,251,1)",  border: "rgba(0,0,0,.07)" },
  { bg: "rgba(245,247,250,1)",  border: "rgba(0,0,0,.06)" },
  { bg: "rgba(250,251,253,1)",  border: "rgba(0,0,0,.07)" },
  { bg: "rgba(243,246,249,1)",  border: "rgba(0,0,0,.06)" },
  { bg: "rgba(247,249,252,1)",  border: "rgba(0,0,0,.07)" },
  { bg: "rgba(244,247,251,1)",  border: "rgba(0,0,0,.06)" },
];
    const shade = greyShades[i] ?? greyShades[0];

    return (
      <Link
        key={course.exam}
        href={course.href}
        onClick={() => setCoursesOpen(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px 22px",
          borderRadius: "14px",
          textDecoration: "none",
          background: shade.bg,
          border: `1px solid ${shade.border}`,
          transition: "all .28s cubic-bezier(.34,1.56,.64,1)",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "scale(1.045) translateY(-3px)";
          el.style.background = `linear-gradient(135deg, ${course.color}18 0%, ${course.color}08 60%, #ffffff 100%)`;
el.style.borderColor = course.color + "60";
el.style.boxShadow = `0 12px 32px rgba(0,0,0,.1), 0 0 0 1px ${course.color}25, inset 0 1px 0 ${course.color}15`;
          el.style.zIndex = "10";
          const glow = el.querySelector(".card-glow") as HTMLElement;
          if (glow) glow.style.opacity = "1";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "scale(1) translateY(0)";
          el.style.background = shade.bg;
          el.style.borderColor = shade.border;
          el.style.boxShadow = "none";
          el.style.zIndex = "1";
          const glow = el.querySelector(".card-glow") as HTMLElement;
          if (glow) glow.style.opacity = "0";
        }}
      >
        {/* top color bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2.5px",
          background: course.color,
          opacity: course.available ? 1 : 0.35,
        }} />

        {/* glow blob — hidden by default, shows on hover */}
        <div
          className="card-glow"
          style={{
            position: "absolute",
            top: "-20px", right: "-20px",
            width: "100px", height: "100px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${course.color}40 0%, transparent 70%)`,
            opacity: 0,
            transition: "opacity .28s ease",
            pointerEvents: "none",
          }}
        />

        {/* row 1 — name + badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
  width: "11px", height: "11px", borderRadius: "50%",
  background: course.color, flexShrink: 0,
  boxShadow: `0 0 12px ${course.color}90`,
}} />
            <span style={{ fontSize: "14px", fontWeight: 800, color: course.color, letterSpacing: ".03em" }}>
  {course.exam}
</span>
          </div>
          {course.available ? (
            <span style={{
              fontSize: "9px", fontWeight: 800,
              background: "rgba(14,165,233,.16)", color: "#7dd3fc",
              border: "1px solid rgba(14,165,233,.32)",
              padding: "2px 8px", borderRadius: "100px",
              letterSpacing: ".07em",
              display: "flex", alignItems: "center", gap: "4px",
            }}>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
              LIVE
            </span>
          ) : (
            <span style={{
              fontSize: "9px", fontWeight: 600,
              background: "rgba(255,255,255,.05)", color: "#475569",
              border: "1px solid rgba(255,255,255,.08)",
              padding: "2px 8px", borderRadius: "100px", letterSpacing: ".06em",
            }}>
              SOON
            </span>
          )}
        </div>

        {/* row 2 — title */}
<p style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", lineHeight: 1.4, marginBottom: "6px", position: "relative", zIndex: 1 }}>
  {course.title}
</p>

{/* row 3 — tag */}
<p style={{ fontSize: "12px", color: "#64748b", fontWeight: 500, lineHeight: 1.4, position: "relative", zIndex: 1 }}>
  {course.tag}
</p>
      </Link>
    );
  })}
</div>

                    {/* footer CTA */}
                    <div style={{ margin: "0 14px 14px", padding: "14px 18px", background: "rgba(14,165,233,.06)", border: "1px solid rgba(14,165,233,.14)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
  <div>
<p style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", margin: 0 }}>Start with NCLEX-RN — it's free</p>
<p style={{ fontSize: "12px", color: "#64748b", margin: "3px 0 0", fontWeight: 500 }}>No credit card · No commitment · Live now</p>
  </div>
                      <Link href="/courses/nclex-rn" onClick={() => setCoursesOpen(false)}
                        className="nav-btn-primary" style={{ fontSize: "12px", padding: "8px 16px" }}>
                        Try free →
                      </Link>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* FEATURED LINKS */}
            {featuredLinks.map((link) => (
              <Link key={link.label} href={link.href}
                className={`nav-btn${isActive(pathname, link.href) ? " active" : ""}`}>
                {link.label}
              </Link>
            ))}

            <span style={{ width: "1px", height: "18px", background: "rgba(255,255,255,.1)", margin: "0 4px", flexShrink: 0 }} />

            {/* APP LINKS */}
            {appLinks.map((link) => (
              <Link key={link.label} href={link.href}
                className={`nav-btn${isActive(pathname, link.href) ? " active" : ""}`}>
                {link.label}
              </Link>
            ))}

            <span style={{ width: "1px", height: "18px", background: "rgba(255,255,255,.1)", margin: "0 4px", flexShrink: 0 }} />

            {/* MORE */}
            <div style={{ position: "relative" }}>
              <button className="nav-btn" onClick={() => setMoreOpen(!moreOpen)}>
                More
                <ChevronDown style={{ width: 13, height: 13, transition: "transform .2s", transform: moreOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
              </button>
              {moreOpen && (
                <>
                  <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setMoreOpen(false)} />
                  <div className="nav-dropdown" style={{ position: "absolute", right: 0, top: "100%", zIndex: 20, marginTop: "8px", width: "180px", background: "linear-gradient(160deg,#0d1f35,#0f2540)", border: "1px solid rgba(14,165,233,.15)", borderRadius: "14px", padding: "6px", boxShadow: "0 20px 50px rgba(0,0,0,.4)" }}>
                    {moreLinks.map((link) => (
                      <Link key={link.label} href={link.href} onClick={() => setMoreOpen(false)}
                        style={{ display: "block", padding: "10px 14px", borderRadius: "10px", fontSize: "13px", fontWeight: 500, color: "#94a3b8", textDecoration: "none", transition: "all .15s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; e.currentTarget.style.color = "#f1f5f9"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* FAR RIGHT */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }} className="hidden md:flex" id="desktop-actions">

            {/* CART */}
            <button className="nav-btn" style={{ gap: "6px" }}>
              <ShoppingCart style={{ width: 14, height: 14 }} />
              Cart
            </button>

            {user ? (
              <div style={{ position: "relative" }}>
                <button onClick={() => setAvatarOpen(!avatarOpen)}
                  style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#fff", boxShadow: "0 4px 12px rgba(14,165,233,.35)" }}>
                    {initials}
                  </div>
                  <ChevronDown style={{ width: 13, height: 13, color: "#64748b", transition: "transform .2s", transform: avatarOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>

                {avatarOpen && (
                  <>
                    <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setAvatarOpen(false)} />
                    <div className="nav-dropdown" style={{ position: "absolute", right: 0, top: "100%", zIndex: 20, marginTop: "8px", width: "210px", background: "linear-gradient(160deg,#0d1f35,#0f2540)", border: "1px solid rgba(14,165,233,.15)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.45)" }}>
                      <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                        <p style={{ fontSize: "11px", color: "#475569", margin: 0 }}>Signed in as</p>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "#e2e8f0", margin: "3px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</p>
                      </div>
                      <div style={{ padding: "6px" }}>
                        <Link href="/dashboard" onClick={() => setAvatarOpen(false)}
                          style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "10px", fontSize: "13px", fontWeight: 500, color: "#94a3b8", textDecoration: "none", transition: "all .15s" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; e.currentTarget.style.color = "#f1f5f9"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}>
                          <User style={{ width: 15, height: 15 }} />
                          My Dashboard
                        </Link>
                        <button onClick={handleLogout}
                          style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "10px 12px", borderRadius: "10px", fontSize: "13px", fontWeight: 500, color: "#f87171", background: "none", border: "none", cursor: "pointer", transition: "all .15s", fontFamily: "inherit" }}
                          onMouseEnter={e => (e.currentTarget.style.background = "rgba(248,113,113,.08)")}
                          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                          <LogOut style={{ width: 15, height: 15 }} />
                          Sign out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className="nav-btn">Sign in</Link>
            )}

            <Link href="/auth/signup" className="nav-btn-primary">
              Get started
            </Link>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            className="md:hidden"
            style={{ marginLeft: "auto", display: "flex", width: "38px", height: "38px", alignItems: "center", justifyContent: "center", borderRadius: "10px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.05)", color: "#94a3b8", cursor: "pointer" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X style={{ width: 18, height: 18 }} /> : <Menu style={{ width: 18, height: 18 }} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", background: "linear-gradient(160deg,#0d1f35,#0f2540)" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "16px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>

              <p style={{ fontSize: "10px", fontWeight: 700, color: "#334155", letterSpacing: ".16em", textTransform: "uppercase", padding: "4px 8px", marginBottom: "2px" }}>Courses</p>
              {courseItems.map((course) => (
                <Link key={course.exam} href={course.href} onClick={() => setMobileOpen(false)}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "12px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", textDecoration: "none", transition: "all .2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,.08)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,.04)")}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: course.color, flexShrink: 0, boxShadow: `0 0 8px ${course.color}60` }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: course.color, margin: 0 }}>{course.exam}</p>
                    <p style={{ fontSize: "11px", color: "#475569", margin: 0, fontWeight: 400 }}>{course.title}</p>
                  </div>
                  {course.available && (
                    <span style={{ fontSize: "9px", fontWeight: 800, background: "rgba(14,165,233,.16)", color: "#7dd3fc", border: "1px solid rgba(14,165,233,.3)", padding: "2px 8px", borderRadius: "100px" }}>LIVE</span>
                  )}
                </Link>
              ))}

              <p style={{ fontSize: "10px", fontWeight: 700, color: "#334155", letterSpacing: ".16em", textTransform: "uppercase", padding: "12px 8px 2px" }}>Pages</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {featuredLinks.map((link) => (
                  <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                    style={{ display: "block", padding: "11px 14px", borderRadius: "11px", background: isActive(pathname, link.href) ? "rgba(14,165,233,.15)" : "rgba(255,255,255,.05)", border: `1px solid ${isActive(pathname, link.href) ? "rgba(14,165,233,.3)" : "rgba(255,255,255,.08)"}`, fontSize: "13px", fontWeight: 600, color: isActive(pathname, link.href) ? "#38bdf8" : "#94a3b8", textDecoration: "none" }}>
                    {link.label}
                  </Link>
                ))}
              </div>

              <p style={{ fontSize: "10px", fontWeight: 700, color: "#334155", letterSpacing: ".16em", textTransform: "uppercase", padding: "12px 8px 2px" }}>App</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {appLinks.map((link) => (
                  <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                    style={{ display: "block", padding: "11px 14px", borderRadius: "11px", background: isActive(pathname, link.href) ? "rgba(14,165,233,.15)" : "rgba(255,255,255,.05)", border: `1px solid ${isActive(pathname, link.href) ? "rgba(14,165,233,.3)" : "rgba(255,255,255,.08)"}`, fontSize: "13px", fontWeight: 600, color: isActive(pathname, link.href) ? "#38bdf8" : "#94a3b8", textDecoration: "none" }}>
                    {link.label}
                  </Link>
                ))}
              </div>

              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <button style={{ display: "flex", alignItems: "center", gap: "7px", padding: "11px 16px", borderRadius: "11px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", fontSize: "13px", fontWeight: 600, color: "#94a3b8", cursor: "pointer", fontFamily: "inherit" }}>
                  <ShoppingCart style={{ width: 14, height: 14 }} /> Cart
                </button>
                {user ? (
                  <button onClick={handleLogout}
                    style={{ display: "flex", alignItems: "center", gap: "7px", padding: "11px 16px", borderRadius: "11px", background: "rgba(248,113,113,.1)", border: "1px solid rgba(248,113,113,.2)", fontSize: "13px", fontWeight: 600, color: "#f87171", cursor: "pointer", fontFamily: "inherit" }}>
                    <LogOut style={{ width: 14, height: 14 }} /> Sign out
                  </button>
                ) : (
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)}
                    style={{ display: "flex", alignItems: "center", gap: "7px", padding: "11px 16px", borderRadius: "11px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", fontSize: "13px", fontWeight: 600, color: "#94a3b8", textDecoration: "none" }}>
                    Sign in
                  </Link>
                )}
                <Link href="/auth/signup" onClick={() => setMobileOpen(false)}
                  style={{ display: "flex", alignItems: "center", gap: "7px", padding: "11px 16px", borderRadius: "11px", background: "#0ea5e9", border: "none", fontSize: "13px", fontWeight: 700, color: "#fff", textDecoration: "none", boxShadow: "0 4px 14px rgba(14,165,233,.3)" }}>
                  Get started
                </Link>
              </div>

            </div>
          </div>
        )}
      </header>
    </>
  );
}