"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogOut, LayoutDashboard, BookOpen, ClipboardList, History, BarChart2, Tv, Star, DollarSign, Phone, HelpCircle, Newspaper, Zap } from "lucide-react";

function isActiveMob(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

const MOB_COURSES = [
  { id: "pre-nursing",        label: "Pre-Nursing",        sub: "TEAS 7 & HESI A2",        color: "#f59e0b", live: false, cat: "entrance"  },
  { id: "nursing-school",     label: "Nursing School",     sub: "School companion",          color: "#10b981", live: false, cat: "specialty" },
  { id: "nclex-rn",           label: "NCLEX-RN",           sub: "3,100+ questions - LIVE",  color: "#0ea5e9", live: true,  cat: "licensure" },
  { id: "nclex-pn",           label: "NCLEX-PN",           sub: "Full PN coverage",          color: "#6366f1", live: false, cat: "licensure" },
  { id: "nurse-practitioner", label: "Nurse Practitioner", sub: "FNP - AGPCNP",             color: "#8b5cf6", live: false, cat: "specialty" },
  { id: "ccrn",               label: "CCRN",               sub: "Critical care",             color: "#ef4444", live: false, cat: "specialty" },
];

const MOB_FILTERS = [
  { id: "all",       label: "All" },
  { id: "licensure", label: "Licensure" },
  { id: "specialty", label: "Specialty" },
  { id: "entrance",  label: "Entrance" },
];

const MOB_HINTS: Record<string, string> = {
  all:       "All 6 certification paths",
  licensure: "Showing: NCLEX-RN and NCLEX-PN",
  specialty: "Showing: Nursing School, NP, CCRN",
  entrance:  "Showing: Pre-Nursing, TEAS 7, HESI A2",
};

const MOB_CSS = `
  .mob-shell { display: none; }
  .mob-hide-on-mobile { display: none !important; }
  @media (max-width: 767px) {
    #desktop-nav { display: none !important; }
    #desktop-actions { display: none !important; }
    .hamburger-btn { display: none !important; }
    .mob-hide-on-mobile { display: none !important; }
    .mob-shell { display: block; width: 100%; background: #f8fafc; }

    .mob-topbar { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; background: #ffffff; border-bottom: 1px solid #f1f5f9; }
    .mob-live { display: flex; align-items: center; gap: 6px; padding: 5px 16px; background: #fff7ed; border-left: 3px solid #ef4444; border-bottom: 1px solid #fed7aa; }

    /* VISITOR HERO */
    .mob-hero-visitor { padding: 14px 16px 10px; background: #f8fafc; }
    
    /* LOGGED IN WELCOME */
    .mob-hero-user { padding: 12px 16px 10px; background: #f8fafc; }

    .mob-stats { display: flex; gap: 8px; padding: 0 16px 10px; }
    .mob-tv-card { margin: 0 16px 10px; background: #0d1f35; border-radius: 10px; padding: 11px 14px; border-left: 4px solid #ef4444; }

    .mob-section { padding: 0 16px 8px; }
    .mob-section-label { font-size: 9px; font-weight: 700; color: #94a3b8; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 6px; display: block; }
    
    .mob-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
    .mob-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }

    .mob-link-pill { display: flex; align-items: center; justify-content: center; gap: 5px; padding: 9px 10px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 11px; font-weight: 600; color: #334155; text-decoration: none; }
    .mob-link-pill-active { background: #e0f2fe; border-color: #bae6fd; color: #0369a1; }

    /* USER APP CARDS */
    .mob-app-card { display: flex; flex-direction: column; align-items: center; gap: 5px; padding: 12px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; text-decoration: none; transition: all .15s; overflow: hidden; }
    .mob-app-card-label { font-size: 10px; font-weight: 700; color: #334155; text-align: center; width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .mob-app-card-active { background: #e0f2fe; border-color: #0ea5e9; }
    .mob-app-card-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
    .mob-app-card-label { font-size: 10px; font-weight: 700; color: #334155; text-align: center; }
    .mob-app-card-sub { font-size: 8px; color: #94a3b8; text-align: center; font-weight: 500; }

    /* PERFORMANCE CARD */
    .mob-perf-card { margin: 0 16px 10px; background: linear-gradient(135deg,#0d1f35,#0f2540); border-radius: 12px; padding: 14px; border: 1px solid rgba(14,165,233,0.2); }

    .mob-app-row { display: flex; gap: 6px; padding: 0 16px 10px; overflow-x: auto; scrollbar-width: none; }
    .mob-app-row::-webkit-scrollbar { display: none; }
    .mob-app-pill { display: inline-flex; align-items: center; padding: 6px 14px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 20px; font-size: 11px; font-weight: 600; color: #0369a1; text-decoration: none; white-space: nowrap; flex-shrink: 0; }

    .mob-account-row { display: flex; gap: 8px; padding: 8px 16px 14px; border-top: 1px solid #f1f5f9; }

    .mob-tabbar { position: fixed; bottom: 0; left: 0; right: 0; height: 58px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; align-items: stretch; z-index: 997; }
    .mob-tab { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; background: transparent; border: none; cursor: pointer; font-family: inherit; text-decoration: none; -webkit-tap-highlight-color: transparent; padding: 5px 2px; }
    .mob-tab-label { font-size: 9px; font-weight: 600; color: #94a3b8; }
    .mob-tab-active .mob-tab-label { color: #0ea5e9; font-weight: 700; }
    .mob-tab-tv .mob-tab-label { color: #ef4444; font-weight: 700; }
    .mob-tab-pill { display: flex; align-items: center; justify-content: center; padding: 4px 10px; border-radius: 20px; background: #e0f2fe; }
    .mob-tab-pill-red { background: #fff7ed; }
    .mob-tab-pill-purple { background: #f5f3ff; }

    .mob-sheet-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.18); z-index: 995; }
    .mob-sheet { position: fixed; left: 0; right: 0; bottom: 58px; background: #f8fafc; border-top: 1px solid #e2e8f0; border-radius: 16px 16px 0 0; z-index: 996; max-height: 78vh; overflow-y: auto; -webkit-overflow-scrolling: touch; animation: mobSheetUp 0.28s cubic-bezier(0.32,0.72,0,1) forwards; }
    @keyframes mobSheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }

    .mob-filter-row { display: flex; gap: 6px; padding: 0 16px 8px; overflow-x: auto; scrollbar-width: none; }
    .mob-filter-row::-webkit-scrollbar { display: none; }
    .mob-filter-chip { display: inline-flex; align-items: center; padding: 5px 14px; border-radius: 20px; border: 1px solid #e2e8f0; background: #f1f5f9; font-size: 10px; font-weight: 600; color: #64748b; white-space: nowrap; cursor: pointer; font-family: inherit; }
    .mob-filter-active { background: #0ea5e9; border-color: #0ea5e9; color: #ffffff; }

    .mob-course-card { margin: 3px 16px; padding: 10px 12px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 9px; display: flex; align-items: center; gap: 10px; text-decoration: none; position: relative; overflow: hidden; }
    .mob-course-card-live { background: #e0f2fe; border-color: #bae6fd; }
    .mob-course-accent { position: absolute; left: 0; top: 0; bottom: 0; width: 4px; }
    .mob-sheet-tv { margin: 8px 16px; padding: 10px 12px; background: #fff7ed; border: 1px solid #fed7aa; border-left: 4px solid #ef4444; border-radius: 9px; display: flex; align-items: center; gap: 10px; }
    .mob-sheet-cta { margin: 10px 16px 16px; display: flex; align-items: center; justify-content: center; padding: 13px; background: #0ea5e9; border-radius: 10px; font-size: 13px; font-weight: 800; color: white; text-decoration: none; }

    main { padding-bottom: 70px !important; }
    .mob-page-content { display: none !important; }
    header { background: transparent !important; border: none !important; box-shadow: none !important; height: auto !important; }
    header { display: none !important; }
  }
`;

export default function MobileNav({ pathname, user, handleLogout }: { pathname: string; user: any; handleLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("home");
  const [filter, setFilter] = useState("all");
  const showSheet = activeTab === "courses";
  const filtered = filter === "all" ? MOB_COURSES : MOB_COURSES.filter(c => c.cat === filter);
  const isAuthPage = pathname.startsWith("/auth");
  if (isAuthPage) return null;

  return (
    <>
      <style>{MOB_CSS}</style>
      <div className="mob-shell">

        {/* ── TOP BAR ── */}
        <div className="mob-topbar">
          <Image src="/logo.png" alt="Pre-NCLEX Nursing" width={110} height={30} style={{ objectFit: "contain" }} />
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#fff" }}>
                {user.email?.[0]?.toUpperCase() ?? "U"}
              </div>
              <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "4px", padding: "5px 10px", borderRadius: "20px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", fontSize: "10px", fontWeight: 700, color: "#f87171", cursor: "pointer", fontFamily: "inherit" }}>
                <LogOut style={{ width: 10, height: 10 }} /> Out
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "6px" }}>
              <Link href="/auth/login" style={{ display: "inline-flex", alignItems: "center", padding: "6px 12px", borderRadius: "20px", background: "#f1f5f9", border: "1px solid #e2e8f0", fontSize: "11px", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
                Sign in
              </Link>
              <Link href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", padding: "6px 14px", borderRadius: "20px", background: "#0ea5e9", fontSize: "11px", fontWeight: 700, color: "#fff", textDecoration: "none" }}>
                Get started
              </Link>
            </div>
          )}
        </div>

        {/* ── LIVE BANNER ── */}
        <div className="mob-live">
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", flexShrink: 0, boxShadow: "0 0 6px #ef4444" }} />
          <span style={{ fontWeight: 800, color: "#ef4444", fontSize: "10px" }}>LIVE</span>
          <span style={{ color: "#92400e", fontSize: "11px" }}>Nursing TV now streaming</span>
          <Link href="/nursing-tv" style={{ marginLeft: "auto", color: "#0ea5e9", fontWeight: 700, fontSize: "11px", textDecoration: "none", flexShrink: 0 }}>Watch</Link>
        </div>

        {/* ══════════════════════════════
            VISITOR MODE
        ══════════════════════════════ */}
        {!user && (
          <>
            {/* Hero */}
            <div className="mob-hero-visitor">
              <p style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 600, marginBottom: "6px" }}>NCLEX-RN Live Now</p>
              <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.6rem,7vw,2.4rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1.1, marginBottom: "4px" }}>
                Your first attempt.
              </h1>
              <p style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.3rem,6vw,2rem)", fontWeight: 700, color: "#0ea5e9", fontStyle: "italic", lineHeight: 1.1, marginBottom: "14px" }}>
                Your last exam.
              </p>
              <Link href="/auth/signup" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "13px", borderRadius: "12px", background: "#0ea5e9", fontSize: "14px", fontWeight: 800, color: "#fff", textDecoration: "none", boxShadow: "0 4px 16px rgba(14,165,233,0.3)", marginBottom: "8px" }}>
                Start free today
              </Link>
              <Link href="/courses" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", borderRadius: "12px", background: "#f1f5f9", border: "1px solid #e2e8f0", fontSize: "13px", fontWeight: 600, color: "#475569", textDecoration: "none" }}>
                Explore courses
              </Link>
            </div>

            {/* Stats */}
            <div className="mob-stats">
              {([["50K+","Students","#0ea5e9","#f0f9ff","#bae6fd"],["98%","Pass rate","#10b981","#f0fdf4","#bbf7d0"],["3,100+","Questions","#8b5cf6","#fdf4ff","#e9d5ff"]] as const).map(([v,l,c,bg,br]) => (
                <div key={l} style={{ flex: 1, background: bg, border: "1px solid "+br, borderRadius: "8px", padding: "8px 6px", textAlign: "center" }}>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: c, margin: 0 }}>{v}</p>
                  <p style={{ fontSize: "9px", color: "#94a3b8", margin: 0, fontWeight: 500 }}>{l}</p>
                </div>
              ))}
            </div>

            {/* Nursing TV card */}
            <div className="mob-tv-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 6px #ef4444" }} />
                  <span style={{ fontSize: "10px", fontWeight: 900, color: "#ef4444", letterSpacing: "0.15em" }}>LIVE NOW</span>
                </div>
                <Link href="/nursing-tv" style={{ display: "inline-flex", alignItems: "center", padding: "4px 12px", borderRadius: "20px", background: "#ef4444", fontSize: "10px", fontWeight: 700, color: "#fff", textDecoration: "none" }}>Watch free</Link>
              </div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#f8fafc", margin: "0 0 2px" }}>Nursing TV</p>
              <p style={{ fontSize: "10px", color: "#64748b", margin: "0 0 8px" }}>6 channels · 140+ episodes · Free forever</p>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                {["#0ea5e9","#6366f1","#ef4444","#f59e0b","#8b5cf6","#10b981"].map((c,i) => (
                  <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, boxShadow: "0 0 4px "+c+"80" }} />
                ))}
                <span style={{ fontSize: "9px", color: "#64748b", marginLeft: "4px" }}>6 channels</span>
              </div>
            </div>

            {/* Quick Access */}
            <div className="mob-section">
              <span className="mob-section-label">Explore</span>
              <div className="mob-grid-2">
                {[
                  { href: "/features",     label: "Features",      icon: <Zap size={11}/> },
                  { href: "/testimonials", label: "Testimonials",  icon: <Star size={11}/> },
                  { href: "/pricing",      label: "Pricing",       icon: <DollarSign size={11}/> },
                  { href: "/contact",      label: "Contact Us",    icon: <Phone size={11}/> },
                  { href: "/blog",         label: "Blog",          icon: <Newspaper size={11}/> },
                  { href: "/faq",          label: "FAQ",           icon: <HelpCircle size={11}/> },
                ].map(l => (
                  <Link key={l.label} href={l.href} className={"mob-link-pill" + (isActiveMob(pathname, l.href) ? " mob-link-pill-active" : "")}>
                    {l.icon} {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Try quiz teaser */}
            <div style={{ padding: "0 16px 10px" }}>
              <Link href="/quiz/select" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: "10px", background: "linear-gradient(135deg,rgba(14,165,233,0.08),rgba(99,102,241,0.06))", border: "1px solid rgba(14,165,233,0.2)", textDecoration: "none" }}>
                <div>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", margin: "0 0 2px" }}>Try a practice question</p>
                  <p style={{ fontSize: "10px", color: "#64748b", margin: 0 }}>Free · No signup required · NCLEX-RN</p>
                </div>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#0ea5e9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </Link>
            </div>

            {/* Sign up CTA */}
            <div className="mob-account-row">
              <Link href="/auth/login" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", borderRadius: "10px", background: "#ffffff", border: "1px solid #e2e8f0", fontSize: "13px", fontWeight: 600, color: "#334155", textDecoration: "none" }}>Sign in</Link>
              <Link href="/auth/signup" style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", borderRadius: "10px", background: "#0ea5e9", fontSize: "13px", fontWeight: 700, color: "#fff", textDecoration: "none" }}>Get started free</Link>
            </div>
          </>
        )}

        {/* ══════════════════════════════
            LOGGED IN MODE
        ══════════════════════════════ */}
        {user && (
          <>
            {/* Welcome card */}
            <div className="mob-hero-user">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", borderRadius: "12px", background: "linear-gradient(135deg,#0d1f35,#0f2540)", border: "1px solid rgba(14,165,233,0.2)", marginBottom: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                  {user.email?.[0]?.toUpperCase() ?? "U"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "11px", color: "#64748b", margin: "0 0 2px" }}>Welcome back</p>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#f8fafc", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</p>
                </div>
                <Link href="/dashboard" style={{ display: "flex", alignItems: "center", padding: "6px 12px", borderRadius: "20px", background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)", fontSize: "11px", fontWeight: 700, color: "#38bdf8", textDecoration: "none", flexShrink: 0 }}>
                  Dashboard
                </Link>
              </div>
            </div>

            {/* App grid — 3 col */}
            <div className="mob-section">
              <span className="mob-section-label">Your Study Tools</span>
              <div className="mob-grid-3">
                {[
                  { href: "/quiz/select", label: "Quiz",      sub: "Practice",  color: "#0ea5e9", bg: "#f0f9ff", icon: <ClipboardList size={16} color="#0ea5e9"/> },
                  { href: "/results",     label: "Results",   sub: "Scores",    color: "#10b981", bg: "#f0fdf4", icon: <BarChart2 size={16} color="#10b981"/> },
                  { href: "/review",      label: "Review",    sub: "Flagged",   color: "#f59e0b", bg: "#fff7ed", icon: <BookOpen size={16} color="#f59e0b"/> },
                  { href: "/history",     label: "History",   sub: "Attempts",  color: "#8b5cf6", bg: "#fdf4ff", icon: <History size={16} color="#8b5cf6"/> },
                  { href: "/dashboard",   label: "Dashboard", sub: "Overview",  color: "#06b6d4", bg: "#ecfeff", icon: <LayoutDashboard size={16} color="#06b6d4"/> },
                  { href: "/nursing-tv",  label: "Nursing TV",sub: "Watch free",color: "#ef4444", bg: "#fff7ed", icon: <Tv size={16} color="#ef4444"/> },
                ].map(item => (
                  <Link key={item.label} href={item.href}
                    className={"mob-app-card" + (isActiveMob(pathname, item.href) ? " mob-app-card-active" : "")}>
                    <div className="mob-app-card-icon" style={{ background: item.bg }}>
                      {item.icon}
                    </div>
                    <span className="mob-app-card-label" style={{ color: isActiveMob(pathname, item.href) ? item.color : "#334155" }}>{item.label}</span>
                    <span className="mob-app-card-sub">{item.sub}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick start CTA */}
            <div style={{ padding: "0 16px 10px" }}>
              <Link href="/quiz/select" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", borderRadius: "12px", background: "#0ea5e9", textDecoration: "none", boxShadow: "0 4px 16px rgba(14,165,233,0.25)" }}>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 800, color: "#fff", margin: "0 0 2px" }}>Continue studying</p>
                  <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.75)", margin: 0 }}>Jump back into your NCLEX practice</p>
                </div>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </Link>
            </div>

            {/* Nursing TV card (compact) */}
            <div className="mob-tv-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 6px #ef4444" }} />
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "#f8fafc", margin: 0 }}>Nursing TV Live</p>
                    <p style={{ fontSize: "9px", color: "#64748b", margin: 0 }}>6 channels · 140+ episodes</p>
                  </div>
                </div>
                <Link href="/nursing-tv" style={{ display: "inline-flex", alignItems: "center", padding: "5px 12px", borderRadius: "20px", background: "#ef4444", fontSize: "10px", fontWeight: 700, color: "#fff", textDecoration: "none" }}>Watch</Link>
              </div>
            </div>

            {/* Quick links for logged in */}
            <div className="mob-section">
              <span className="mob-section-label">More</span>
              <div className="mob-grid-2">
                {[
                  { href: "/courses",      label: "All Courses" },
                  { href: "/pricing",      label: "Upgrade plan" },
                  { href: "/testimonials", label: "Testimonials" },
                  { href: "/contact",      label: "Get help" },
                ].map(l => (
                  <Link key={l.label} href={l.href} className={"mob-link-pill" + (isActiveMob(pathname, l.href) ? " mob-link-pill-active" : "")}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── COURSES SHEET OVERLAY ── */}
        {showSheet && <div className="mob-sheet-overlay" onClick={() => setActiveTab("home")} />}
        {showSheet && (
          <div className="mob-sheet">
            <div style={{ width: "44px", height: "4px", background: "#cbd5e1", borderRadius: "2px", margin: "10px auto 0" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 8px", fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>
              <span>All Certification Paths</span>
              <Link href="/courses" style={{ fontSize: "11px", fontWeight: 600, color: "#0ea5e9", textDecoration: "none" }} onClick={() => setActiveTab("home")}>See all</Link>
            </div>
            <div className="mob-filter-row">
              {MOB_FILTERS.map(f => (
                <button key={f.id} onClick={() => setFilter(f.id)} className={"mob-filter-chip" + (filter === f.id ? " mob-filter-active" : "")}>{f.label}</button>
              ))}
            </div>
            <p style={{ padding: "0 16px 8px", fontSize: "10px", fontWeight: 600, color: "#334155" }}>{MOB_HINTS[filter]}</p>
            {filtered.map(c => (
              <Link key={c.id} href={"/courses/"+c.id} onClick={() => setActiveTab("home")} className={"mob-course-card"+(c.live?" mob-course-card-live":"")}>
                <div className="mob-course-accent" style={{ background: c.color }} />
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: c.color+"18", border: "1px solid "+c.color+"30", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: c.color }} />
                </div>
                <div style={{ flex: 1, minWidth: 0, paddingLeft: "4px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: c.live?"#0c4a6e":"#0f172a", margin: 0 }}>{c.label}</p>
                  <p style={{ fontSize: "10px", color: c.live?"#0369a1":"#64748b", margin: 0 }}>{c.sub}</p>
                </div>
                {c.live
                  ? <span style={{ marginLeft: "auto", flexShrink: 0, background: "#0ea5e9", color: "white", fontSize: "9px", fontWeight: 800, padding: "2px 8px", borderRadius: "20px" }}>LIVE</span>
                  : <span style={{ marginLeft: "auto", flexShrink: 0, background: "#f1f5f9", color: "#64748b", fontSize: "9px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px" }}>Soon</span>
                }
              </Link>
            ))}
            <div className="mob-sheet-tv">
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", flexShrink: 0, boxShadow: "0 0 5px #ef4444" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#7c2d12", margin: "0 0 2px" }}>Nursing TV Live Now</p>
                <p style={{ fontSize: "10px", color: "#92400e", margin: 0 }}>6 channels · 140+ episodes · Free forever</p>
              </div>
              <Link href="/nursing-tv" onClick={() => setActiveTab("home")} style={{ fontSize: "11px", fontWeight: 700, color: "#ef4444", textDecoration: "none", flexShrink: 0 }}>Watch</Link>
            </div>
            {!user && <Link href="/auth/signup" className="mob-sheet-cta" onClick={() => setActiveTab("home")}>Get started free</Link>}
            {user && <Link href="/quiz/select" className="mob-sheet-cta" style={{ background: "#10b981" }} onClick={() => setActiveTab("home")}>Start practising now</Link>}
          </div>
        )}

        {/* ── BOTTOM TAB BAR ── */}
        <div className="mob-tabbar">
          <button className={"mob-tab"+(activeTab==="home"?" mob-tab-active":"")} onClick={() => setActiveTab("home")}>
            {activeTab==="home"
              ? <div className="mob-tab-pill"><svg width="15" height="15" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              : <svg width="15" height="15" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            }
            <span className="mob-tab-label">Home</span>
          </button>

          <button className={"mob-tab"+(activeTab==="courses"?" mob-tab-active":"")} onClick={() => setActiveTab(activeTab==="courses"?"home":"courses")}>
            {activeTab==="courses"
              ? <div className="mob-tab-pill"><svg width="15" height="15" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M2 7l10-5 10 5-10 5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
              : <svg width="15" height="15" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M2 7l10-5 10 5-10 5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            }
            <span className="mob-tab-label">Courses</span>
          </button>

          <Link href="/nursing-tv" className="mob-tab mob-tab-tv">
            <div className="mob-tab-pill mob-tab-pill-red">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#ef4444"><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/></svg>
            </div>
            <span className="mob-tab-label">TV LIVE</span>
          </Link>

          <Link href="/quiz/select" className={"mob-tab"+(isActiveMob(pathname,"/quiz")?" mob-tab-active":"")}>
            {isActiveMob(pathname,"/quiz")
              ? <div className="mob-tab-pill"><svg width="15" height="15" fill="none" stroke="#0ea5e9" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg></div>
              : <svg width="15" height="15" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>
            }
            <span className="mob-tab-label">Quiz</span>
          </Link>

          {user ? (
            <Link href="/dashboard" className={"mob-tab"+(isActiveMob(pathname,"/dashboard")?" mob-tab-active":"")}>
              {isActiveMob(pathname,"/dashboard")
                ? <div className="mob-tab-pill mob-tab-pill-purple"><svg width="15" height="15" fill="none" stroke="#8b5cf6" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div>
                : <svg width="15" height="15" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              }
              <span className="mob-tab-label">Dashboard</span>
            </Link>
          ) : (
            <Link href="/pricing" className={"mob-tab"+(isActiveMob(pathname,"/pricing")?" mob-tab-active":"")}>
              {isActiveMob(pathname,"/pricing")
                ? <div className="mob-tab-pill"><svg width="15" height="15" fill="none" stroke="#0ea5e9" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></div>
                : <svg width="15" height="15" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              }
              <span className="mob-tab-label">More</span>
            </Link>
          )}
        </div>

      </div>
    </>
  );
}
