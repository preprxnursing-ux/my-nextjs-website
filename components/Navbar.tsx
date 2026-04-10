"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, ChevronDown, X, Menu, LogOut, User } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

const courseItems = [
  { exam: "Pre-Nursing", title: "TEAS 7 & HESI A2 Success Toolkit", color: "#f59e0b", href: "/courses/pre-nursing", available: false, tag: "TEAS 7 · HESI A2 entrance exams" },
  { exam: "Nursing School", title: "Your Nursing School Companion", color: "#10b981", href: "/courses/nursing-school", available: false, tag: "Fundamentals to advanced topics" },
  { exam: "NCLEX-RN®", title: "NCLEX-RN Success Tools", color: "#0ea5e9", href: "/courses/nclex-rn", available: true, tag: "3,100+ questions · All 8 categories" },
  { exam: "NCLEX-PN®", title: "Effective NCLEX-PN Prep", color: "#6366f1", href: "/courses/nclex-pn", available: false, tag: "Full PN test plan coverage" },
  { exam: "Nurse Practitioner", title: "Expert NP Exam Resources", color: "#8b5cf6", href: "/courses/nurse-practitioner", available: false, tag: "FNP · AGPCNP certification prep" },
  { exam: "CCRN®", title: "Essential CCRN Success Resources", color: "#ef4444", href: "/courses/ccrn", available: false, tag: "ICU-level critical care prep" },
];

const featuredLinks = [
  { href: "/educators", label: "For Educators" },
  { href: "/contact", label: "Contact Us" },
  { href: "/pricing", label: "Pricing" },
];

const moreLinks = [
  { href: "#", label: "Private Tutors" },
  { href: "#", label: "Blog" },
  { href: "#", label: "FAQ" },
];

const appLinks = [
  { href: "/quiz", label: "Quiz" },
  { href: "/results", label: "Results" },
  { href: "/review", label: "Review" },
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
    gap: 4px;
    padding: 6px 9px;
    border-radius: 8px;
    font-size: 12.5px;
    font-weight: 600;
    color: #cbd5e1;
    background: transparent;
    border: none;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
    transition: all .18s;
    font-family: inherit;
  }
  .nav-btn:hover { background: rgba(255,255,255,.08); color: #f1f5f9; }
  .nav-btn.active { background: rgba(14,165,233,.15); color: #38bdf8; }

  .nav-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border-radius: 8px;
    font-size: 12.5px;
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
  .nav-btn-primary:hover { background: #38bdf8; transform: translateY(-1px); }

  @media (max-width: 767px) {
    #desktop-nav { display: none !important; }
    #desktop-actions { display: none !important; }
  }
`;

function FeaturesDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  }
  function handleLeave() {
    timeout.current = setTimeout(() => setOpen(false), 140);
  }

  const featureItems = [
    { title: "Three Exam Modes", desc: "Timed, Tutor, and Quick practice modes built for real NCLEX pressure", color: "#0ea5e9", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>) },
    { title: "Deep Clinical Rationales", desc: "Every answer explained with full clinical reasoning", color: "#8b5cf6", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>) },
    { title: "Performance Dashboard", desc: "Track every attempt, spot weak topics, measure improvement", color: "#10b981", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>) },
    { title: "Flag & Review System", desc: "Flag tough questions and study them with full breakdowns", color: "#f59e0b", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>) },
    { title: "Adaptive Timer", desc: "Build mental endurance NCLEX demands with real timed pressure", color: "#ef4444", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>) },
    { title: "AI Tutor — Coming Soon", desc: "Personalised study plans that adapt to where you struggle", color: "#c084fc", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>) },
  ];

  return (
    <div style={{ position: "relative" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link href="/features" className={`nav-btn${isActive(pathname, "/features") ? " active" : ""}`}>
        Our Features
        <ChevronDown style={{ width: 12, height: 12, transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </Link>
      {open && (
        <div className="nav-dropdown" style={{ position: "absolute", left: "-60px", top: "100%", zIndex: 50, paddingTop: "10px", width: "580px" }}>
          <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,.08)", borderRadius: "20px", boxShadow: "0 32px 80px rgba(0,0,0,.2)", overflow: "hidden" }}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid rgba(0,0,0,.06)", background: "linear-gradient(135deg,rgba(14,165,233,.06) 0%,rgba(139,92,246,.04) 100%)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", margin: 0 }}>Everything you need to pass</p>
                <p style={{ fontSize: "11px", color: "#64748b", margin: "2px 0 0", fontWeight: 400 }}>Built by licensed RNs for nurses who pass first time</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(14,165,233,.1)", border: "1px solid rgba(14,165,233,.25)", borderRadius: "100px", padding: "4px 12px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
                <span style={{ fontSize: "10px", fontWeight: 800, color: "#0ea5e9", letterSpacing: ".1em", textTransform: "uppercase" }}>9 Features</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", padding: "10px" }}>
              {featureItems.map((f) => (
                <Link key={f.title} href="/features"
                  style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", borderRadius: "12px", textDecoration: "none", transition: "all .2s", background: "transparent" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${f.color}08`; e.currentTarget.style.transform = "translateX(3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: `${f.color}12`, border: `1px solid ${f.color}25`, display: "flex", alignItems: "center", justifyContent: "center", color: f.color, flexShrink: 0 }}>{f.icon}</div>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: "0 0 3px" }}>{f.title}</p>
                    <p style={{ fontSize: "11px", color: "#64748b", margin: 0, fontWeight: 400, lineHeight: 1.5 }}>{f.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ margin: "0 10px 10px", padding: "14px 18px", background: "linear-gradient(135deg,rgba(14,165,233,.07) 0%,rgba(139,92,246,.05) 100%)", border: "1px solid rgba(14,165,233,.15)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", margin: "0 0 2px" }}>See every feature in detail</p>
                <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>Interactive demos · Comparison table · Full breakdown</p>
              </div>
              <Link href="/features" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#0ea5e9", color: "#fff", padding: "9px 18px", borderRadius: "9px", fontSize: "12px", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 4px 14px rgba(14,165,233,.3)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#38bdf8"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#0ea5e9"; e.currentTarget.style.transform = "translateY(0)"; }}>
                See all features
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TestimonialsDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  }
  function handleLeave() {
    timeout.current = setTimeout(() => setOpen(false), 140);
  }

  const previews = [
    { initials: "SG", name: "Stephanie G.", score: "Passed 85Q", exam: "NCLEX-RN", attempt: "1st attempt", color: "#38bdf8", quote: "The questions felt exactly like the real exam. The rationales changed how I think clinically. This platform is unreal." },
    { initials: "MT", name: "Marcus T.", score: "1st attempt", exam: "NCLEX-RN", attempt: "1st attempt", color: "#34d399", quote: "Three weeks of study using only this platform. I felt completely calm walking into the exam because I had already seen that level of difficulty." },
    { initials: "AN", name: "Amara N.", score: "Passed 110Q", exam: "NCLEX-RN", attempt: "2nd attempt", color: "#c084fc", quote: "After failing once with another platform, I switched here and passed comfortably. I finally understood why wrong answers were wrong." },
    { initials: "DW", name: "Denise W.", score: "Passed 85Q", exam: "NCLEX-PN", attempt: "1st attempt", color: "#818cf8", quote: "Quick mode 10-question sprints were perfect for my schedule. I passed my PN on the first attempt and I credit this platform completely." },
  ];

  const active = previews[activeCard];

  return (
    <div style={{ position: "relative" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link href="/testimonials" className={`nav-btn${isActive(pathname, "/testimonials") ? " active" : ""}`}>
        Testimonials
        <ChevronDown style={{ width: 12, height: 12, transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </Link>

      {open && (
        <div className="nav-dropdown" style={{ position: "absolute", left: "-160px", top: "100%", zIndex: 50, paddingTop: "10px", width: "580px" }}>
          <div style={{ background: "linear-gradient(160deg,#0a1929 0%,#0d1f35 100%)", border: "1px solid rgba(14,165,233,.18)", borderRadius: "20px", boxShadow: "0 32px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(14,165,233,.08)", overflow: "hidden" }}>

            {/* Header */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,.06)", background: "rgba(14,165,233,.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 800, color: "#f8fafc", margin: "0 0 2px" }}>Student Stories</p>
                <p style={{ fontSize: "11px", color: "#475569", margin: 0 }}>Real nurses · Real results · Verified</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(251,191,36,.1)", border: "1px solid rgba(251,191,36,.25)", borderRadius: "100px", padding: "5px 12px" }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#fbbf24", fontSize: "11px" }}>★</span>)}
                <span style={{ fontSize: "11px", color: "#fbbf24", fontWeight: 700, marginLeft: "4px" }}>4.9</span>
              </div>
            </div>

            {/* Two-panel layout */}
            <div style={{ display: "grid", gridTemplateColumns: "190px 1fr", minHeight: "240px" }}>

              {/* Left — selector */}
              <div style={{ borderRight: "1px solid rgba(255,255,255,.06)", padding: "10px" }}>
                <p style={{ fontSize: "9px", fontWeight: 700, color: "#334155", letterSpacing: ".14em", textTransform: "uppercase", padding: "4px 8px 8px" }}>Hover to preview</p>
                {previews.map((p, i) => (
                  <div key={p.name} onMouseEnter={() => setActiveCard(i)}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "12px", background: activeCard === i ? `${p.color}12` : "transparent", border: `1px solid ${activeCard === i ? p.color + "30" : "transparent"}`, cursor: "pointer", transition: "all .2s ease", marginBottom: "4px" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: `${p.color}18`, border: `2px solid ${p.color}${activeCard === i ? "60" : "30"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, color: p.color, flexShrink: 0, transition: "all .2s", transform: activeCard === i ? "scale(1.1)" : "scale(1)" }}>
                      {p.initials}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: "12px", fontWeight: 700, color: activeCard === i ? "#f8fafc" : "#64748b", margin: 0, transition: "color .2s" }}>{p.name}</p>
                      <p style={{ fontSize: "10px", color: activeCard === i ? p.color : "#334155", margin: 0, fontWeight: 600, transition: "color .2s" }}>{p.exam}</p>
                    </div>
                    {activeCard === i && (
                      <svg style={{ marginLeft: "auto", flexShrink: 0 }} width="12" height="12" fill="none" stroke={p.color} strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                    )}
                  </div>
                ))}
              </div>

              {/* Right — preview */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
                {/* Animated glow blob */}
                <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "180px", height: "180px", borderRadius: "50%", background: `radial-gradient(circle,${active.color}25 0%,transparent 70%)`, pointerEvents: "none", transition: "background .3s ease" }} />

                <div style={{ position: "relative", zIndex: 1 }}>
                  {/* Color accent bar */}
                  <div style={{ height: "3px", width: "48px", background: `linear-gradient(90deg,${active.color},${active.color}60)`, borderRadius: "3px", marginBottom: "14px", transition: "background .3s ease" }} />

                  {/* Stars */}
                  <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                    {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#fbbf24", fontSize: "13px" }}>★</span>)}
                  </div>

                  {/* Quote */}
                  <p style={{ fontSize: "13px", color: "#cbd5e1", fontStyle: "italic", lineHeight: 1.8, marginBottom: "18px", fontWeight: 400, transition: "all .25s ease" }}>
                    "{active.quote}"
                  </p>

                  {/* Author row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: `${active.color}18`, border: `2px solid ${active.color}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: active.color, flexShrink: 0, transition: "all .3s" }}>
                      {active.initials}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "#f8fafc", margin: 0 }}>{active.name}</p>
                      <p style={{ fontSize: "10px", color: "#475569", margin: 0 }}>{active.exam} · {active.attempt}</p>
                    </div>
                    <span style={{ fontSize: "10px", fontWeight: 700, background: `${active.color}15`, color: active.color, border: `1px solid ${active.color}35`, padding: "5px 12px", borderRadius: "100px", whiteSpace: "nowrap", transition: "all .3s" }}>
                      {active.score}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Link href="/testimonials"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "rgba(14,165,233,.08)", border: "1px solid rgba(14,165,233,.2)", borderRadius: "12px", textDecoration: "none", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(14,165,233,.18)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(14,165,233,.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(14,165,233,.08)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "#f8fafc", margin: "0 0 2px" }}>Read all 22+ stories</p>
                    <p style={{ fontSize: "10px", color: "#475569", margin: 0 }}>NCLEX-RN · NCLEX-PN · Nursing School</p>
                  </div>
                  <svg width="16" height="16" fill="none" stroke="#38bdf8" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>

            {/* Stats footer */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "12px 20px", background: "rgba(255,255,255,.02)", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
              {[
                { val: "50K+", label: "Students", color: "#38bdf8" },
                { val: "98%", label: "Pass rate", color: "#34d399" },
                { val: "4.9★", label: "Rating", color: "#fbbf24" },
                { val: "22+", label: "Stories", color: "#c084fc" },
              ].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px", fontWeight: 800, color: s.color, margin: "0 0 2px" }}>{s.val}</p>
                  <p style={{ fontSize: "10px", color: "#334155", margin: 0, fontWeight: 500 }}>{s.label}</p>
                </div>
              ))}
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

  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [initials, setInitials] = useState("?");

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

  const greyShades = [
    { bg: "rgba(248,249,251,1)", border: "rgba(0,0,0,.07)" },
    { bg: "rgba(245,247,250,1)", border: "rgba(0,0,0,.06)" },
    { bg: "rgba(250,251,253,1)", border: "rgba(0,0,0,.07)" },
    { bg: "rgba(243,246,249,1)", border: "rgba(0,0,0,.06)" },
    { bg: "rgba(247,249,252,1)", border: "rgba(0,0,0,.07)" },
    { bg: "rgba(244,247,251,1)", border: "rgba(0,0,0,.06)" },
  ];

  return (
    <>
      <style>{navStyle}</style>
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "linear-gradient(to bottom,#0a1929 0%,#0d1f35 100%)",
        borderBottom: "1px solid rgba(14,165,233,.12)",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", padding: "0 16px", height: "60px", gap: "8px" }}>

          {/* LOGO */}
          <Link href="/" style={{ flexShrink: 0, display: "flex", alignItems: "center", textDecoration: "none", opacity: .92, transition: "opacity .15s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = ".92")}>
            <Image src="/logo.png" alt="Pre-NCLEX Nursing" width={120} height={32} style={{ objectFit: "contain" }} />
          </Link>

          {/* DESKTOP NAV */}
          <div id="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "1px", flex: 1, justifyContent: "center" }}>

            {/* COURSES DROPDOWN */}
            <div style={{ position: "relative" }} onMouseEnter={handleCoursesEnter} onMouseLeave={handleCoursesLeave}>
              <button className={`nav-btn${pathname.startsWith("/courses") ? " active" : ""}`}>
                Courses
                <ChevronDown style={{ width: 12, height: 12, transition: "transform .2s", transform: coursesOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
              </button>
              {coursesOpen && (
                <div className="nav-dropdown" style={{ position: "absolute", left: 0, top: "100%", zIndex: 50, paddingTop: "10px", width: "720px" }}
                  onMouseEnter={handleCoursesEnter} onMouseLeave={handleCoursesLeave}>
                  <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,.08)", borderRadius: "20px", boxShadow: "0 32px 80px rgba(0,0,0,.18)", overflow: "hidden" }}>
                    <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(0,0,0,.07)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(14,165,233,.04)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9" }} />
                        <span style={{ fontSize: "11px", fontWeight: 800, color: "#64748b", letterSpacing: ".18em", textTransform: "uppercase" }}>Certification Paths</span>
                      </div>
                      <Link href="/courses" onClick={() => setCoursesOpen(false)} style={{ fontSize: "12px", fontWeight: 700, color: "#0ea5e9", textDecoration: "none" }}>View all →</Link>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", padding: "12px" }}>
                      {courseItems.map((course, i) => {
                        const shade = greyShades[i] ?? greyShades[0];
                        return (
                          <Link key={course.exam} href={course.href} onClick={() => setCoursesOpen(false)}
                            style={{ display: "flex", flexDirection: "column", padding: "16px 18px", borderRadius: "12px", textDecoration: "none", background: shade.bg, border: `1px solid ${shade.border}`, transition: "all .25s", position: "relative", overflow: "hidden" }}
                            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.03) translateY(-2px)"; el.style.background = `linear-gradient(135deg,${course.color}15 0%,#fff 100%)`; el.style.borderColor = course.color + "50"; el.style.boxShadow = `0 8px 24px rgba(0,0,0,.08)`; }}
                            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1) translateY(0)"; el.style.background = shade.bg; el.style.borderColor = shade.border; el.style.boxShadow = "none"; }}>
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: course.color, opacity: course.available ? 1 : 0.3 }} />
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                                <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: course.color, boxShadow: `0 0 8px ${course.color}80` }} />
                                <span style={{ fontSize: "13px", fontWeight: 800, color: course.color }}>{course.exam}</span>
                              </div>
                              {course.available ? (
                                <span style={{ fontSize: "9px", fontWeight: 800, background: "rgba(14,165,233,.12)", color: "#0ea5e9", border: "1px solid rgba(14,165,233,.25)", padding: "2px 7px", borderRadius: "100px" }}>LIVE</span>
                              ) : (
                                <span style={{ fontSize: "9px", fontWeight: 600, background: "rgba(0,0,0,.04)", color: "#94a3b8", border: "1px solid rgba(0,0,0,.06)", padding: "2px 7px", borderRadius: "100px" }}>SOON</span>
                              )}
                            </div>
                            <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", lineHeight: 1.4, marginBottom: "4px" }}>{course.title}</p>
                            <p style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>{course.tag}</p>
                          </Link>
                        );
                      })}
                    </div>
                    <div style={{ margin: "0 12px 12px", padding: "12px 16px", background: "rgba(14,165,233,.05)", border: "1px solid rgba(14,165,233,.12)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", margin: 0 }}>Start with NCLEX-RN — it's free</p>
                        <p style={{ fontSize: "11px", color: "#64748b", margin: "2px 0 0", fontWeight: 500 }}>No credit card · No commitment · Live now</p>
                      </div>
                      <Link href="/courses/nclex-rn" onClick={() => setCoursesOpen(false)} className="nav-btn-primary" style={{ fontSize: "12px", padding: "7px 14px" }}>Try free →</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* FOR EDUCATORS */}
            <Link href="/educators" className={`nav-btn${isActive(pathname, "/educators") ? " active" : ""}`}>For Educators</Link>

            {/* OUR FEATURES DROPDOWN */}
            <FeaturesDropdown pathname={pathname} />

            {/* TESTIMONIALS DROPDOWN */}
            <TestimonialsDropdown pathname={pathname} />

            {/* REST OF LINKS */}
            {featuredLinks.map((link) => (
              <Link key={link.label} href={link.href} className={`nav-btn${isActive(pathname, link.href) ? " active" : ""}`}>
                {link.label}
              </Link>
            ))}

            <span style={{ width: "1px", height: "16px", background: "rgba(255,255,255,.1)", margin: "0 2px", flexShrink: 0 }} />

            {appLinks.map((link) => (
              <Link key={link.label} href={link.href} className={`nav-btn${isActive(pathname, link.href) ? " active" : ""}`}>
                {link.label}
              </Link>
            ))}

            <span style={{ width: "1px", height: "16px", background: "rgba(255,255,255,.1)", margin: "0 2px", flexShrink: 0 }} />

            <div style={{ position: "relative" }}>
              <button className="nav-btn" onClick={() => setMoreOpen(!moreOpen)}>
                More
                <ChevronDown style={{ width: 12, height: 12, transition: "transform .2s", transform: moreOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
              </button>
              {moreOpen && (
                <>
                  <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setMoreOpen(false)} />
                  <div className="nav-dropdown" style={{ position: "absolute", right: 0, top: "100%", zIndex: 20, marginTop: "8px", width: "170px", background: "linear-gradient(160deg,#0d1f35,#0f2540)", border: "1px solid rgba(14,165,233,.15)", borderRadius: "14px", padding: "6px", boxShadow: "0 20px 50px rgba(0,0,0,.4)" }}>
                    {moreLinks.map((link) => (
                      <Link key={link.label} href={link.href} onClick={() => setMoreOpen(false)}
                        style={{ display: "block", padding: "9px 12px", borderRadius: "9px", fontSize: "13px", fontWeight: 500, color: "#94a3b8", textDecoration: "none", transition: "all .15s" }}
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
          <div id="desktop-actions" style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
            <button className="nav-btn" style={{ gap: "5px" }}>
              <ShoppingCart style={{ width: 13, height: 13 }} /> Cart
            </button>
            {user ? (
              <div style={{ position: "relative" }}>
                <button onClick={() => setAvatarOpen(!avatarOpen)}
                  style={{ display: "flex", alignItems: "center", gap: "5px", background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff", boxShadow: "0 4px 12px rgba(14,165,233,.35)" }}>
                    {initials}
                  </div>
                  <ChevronDown style={{ width: 12, height: 12, color: "#64748b", transition: "transform .2s", transform: avatarOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>
                {avatarOpen && (
                  <>
                    <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setAvatarOpen(false)} />
                    <div className="nav-dropdown" style={{ position: "absolute", right: 0, top: "100%", zIndex: 20, marginTop: "8px", width: "200px", background: "linear-gradient(160deg,#0d1f35,#0f2540)", border: "1px solid rgba(14,165,233,.15)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.45)" }}>
                      <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                        <p style={{ fontSize: "11px", color: "#475569", margin: 0 }}>Signed in as</p>
                        <p style={{ fontSize: "12px", fontWeight: 600, color: "#e2e8f0", margin: "3px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</p>
                      </div>
                      <div style={{ padding: "6px" }}>
                        <Link href="/dashboard" onClick={() => setAvatarOpen(false)}
                          style={{ display: "flex", alignItems: "center", gap: "9px", padding: "9px 11px", borderRadius: "9px", fontSize: "13px", fontWeight: 500, color: "#94a3b8", textDecoration: "none", transition: "all .15s" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; e.currentTarget.style.color = "#f1f5f9"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}>
                          <User style={{ width: 14, height: 14 }} /> My Dashboard
                        </Link>
                        <button onClick={handleLogout}
                          style={{ display: "flex", alignItems: "center", gap: "9px", width: "100%", padding: "9px 11px", borderRadius: "9px", fontSize: "13px", fontWeight: 500, color: "#f87171", background: "none", border: "none", cursor: "pointer", transition: "all .15s", fontFamily: "inherit" }}
                          onMouseEnter={e => (e.currentTarget.style.background = "rgba(248,113,113,.08)")}
                          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                          <LogOut style={{ width: 14, height: 14 }} /> Sign out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className="nav-btn">Sign in</Link>
            )}
            <Link href="/auth/signup" className="nav-btn-primary">Get started</Link>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            style={{ marginLeft: "auto", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "9px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.05)", color: "#94a3b8", cursor: "pointer", flexShrink: 0 }}
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X style={{ width: 17, height: 17 }} /> : <Menu style={{ width: 17, height: 17 }} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", background: "linear-gradient(160deg,#0d1f35,#0f2540)" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, color: "#334155", letterSpacing: ".16em", textTransform: "uppercase", padding: "4px 8px 2px" }}>Courses</p>
              {courseItems.map((course) => (
                <Link key={course.exam} href={course.href} onClick={() => setMobileOpen(false)}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "12px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", textDecoration: "none" }}>
                  <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: course.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: course.color, margin: 0 }}>{course.exam}</p>
                    <p style={{ fontSize: "11px", color: "#475569", margin: 0 }}>{course.title}</p>
                  </div>
                  {course.available && <span style={{ fontSize: "9px", fontWeight: 800, background: "rgba(14,165,233,.16)", color: "#7dd3fc", border: "1px solid rgba(14,165,233,.3)", padding: "2px 8px", borderRadius: "100px" }}>LIVE</span>}
                </Link>
              ))}

              <p style={{ fontSize: "10px", fontWeight: 700, color: "#334155", letterSpacing: ".16em", textTransform: "uppercase", padding: "10px 8px 2px" }}>Pages</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {[{ href: "/features", label: "Our Features" }, { href: "/testimonials", label: "Testimonials" }, ...featuredLinks].map((link) => (
                  <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                    style={{ display: "block", padding: "10px 14px", borderRadius: "10px", background: isActive(pathname, link.href) ? "rgba(14,165,233,.15)" : "rgba(255,255,255,.05)", border: `1px solid ${isActive(pathname, link.href) ? "rgba(14,165,233,.3)" : "rgba(255,255,255,.08)"}`, fontSize: "13px", fontWeight: 600, color: isActive(pathname, link.href) ? "#38bdf8" : "#94a3b8", textDecoration: "none" }}>
                    {link.label}
                  </Link>
                ))}
              </div>

              <p style={{ fontSize: "10px", fontWeight: 700, color: "#334155", letterSpacing: ".16em", textTransform: "uppercase", padding: "10px 8px 2px" }}>App</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {appLinks.map((link) => (
                  <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                    style={{ display: "block", padding: "10px 14px", borderRadius: "10px", background: isActive(pathname, link.href) ? "rgba(14,165,233,.15)" : "rgba(255,255,255,.05)", border: `1px solid ${isActive(pathname, link.href) ? "rgba(14,165,233,.3)" : "rgba(255,255,255,.08)"}`, fontSize: "13px", fontWeight: 600, color: isActive(pathname, link.href) ? "#38bdf8" : "#94a3b8", textDecoration: "none" }}>
                    {link.label}
                  </Link>
                ))}
              </div>

              <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 14px", borderRadius: "10px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", fontSize: "13px", fontWeight: 600, color: "#94a3b8", cursor: "pointer", fontFamily: "inherit" }}>
                  <ShoppingCart style={{ width: 13, height: 13 }} /> Cart
                </button>
                {user ? (
                  <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 14px", borderRadius: "10px", background: "rgba(248,113,113,.1)", border: "1px solid rgba(248,113,113,.2)", fontSize: "13px", fontWeight: 600, color: "#f87171", cursor: "pointer", fontFamily: "inherit" }}>
                    <LogOut style={{ width: 13, height: 13 }} /> Sign out
                  </button>
                ) : (
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 14px", borderRadius: "10px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", fontSize: "13px", fontWeight: 600, color: "#94a3b8", textDecoration: "none" }}>
                    Sign in
                  </Link>
                )}
                <Link href="/auth/signup" onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 14px", borderRadius: "10px", background: "#0ea5e9", fontSize: "13px", fontWeight: 700, color: "#fff", textDecoration: "none", boxShadow: "0 4px 14px rgba(14,165,233,.3)" }}>
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