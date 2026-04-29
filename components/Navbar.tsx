"use client";
import { useCart } from "@/lib/cartContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, X, Menu, LogOut, User } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

const courseItems = [
  { exam: "Pre-Nursing", title: "TEAS 7 & HESI A2 Success Toolkit", color: "#f59e0b", href: "/courses/pre-nursing", available: false, tag: "TEAS 7 . HESI A2 entrance exams" },
  { exam: "Nursing School", title: "Your Nursing School Companion", color: "#10b981", href: "/courses/nursing-school", available: false, tag: "Fundamentals to advanced topics" },
  { exam: "NCLEX-RN(R)", title: "NCLEX-RN Success Tools", color: "#0ea5e9", href: "/courses/nclex-rn", available: true, tag: "3,100+ questions . All 8 categories" },
  { exam: "NCLEX-PN(R)", title: "Effective NCLEX-PN Prep", color: "#6366f1", href: "/courses/nclex-pn", available: false, tag: "Full PN test plan coverage" },
  { exam: "Nurse Practitioner", title: "Expert NP Exam Resources", color: "#8b5cf6", href: "/courses/nurse-practitioner", available: false, tag: "FNP . AGPCNP certification prep" },
  { exam: "CCRN(R)", title: "Essential CCRN Success Resources", color: "#ef4444", href: "/courses/ccrn", available: false, tag: "ICU-level critical care prep" },
];

const appLinks = [
  { href: "/ai-tutor", label: "AI Tutor" },
  { href: "/anatomy", label: "Anatomy Lab" },
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
  @keyframes cartBounce {
    0% { transform: scale(1) translateY(0); }
    40% { transform: scale(1.2) translateY(-4px); }
    70% { transform: scale(0.95) translateY(0); }
    100% { transform: scale(1) translateY(0); }
  }
  .nav-dropdown { animation: dropIn .18s ease both; }
  .nav-btn {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 10px 16px; border-radius: 9px; font-size: 14px; font-weight: 600;
    color: #334155; background: transparent; border: none; cursor: pointer;
    text-decoration: none; white-space: nowrap; flex-shrink: 0;
    transition: background .15s, color .15s; font-family: inherit;
  }
  .nav-btn:hover { background: rgba(14,165,233,.08); color: #0ea5e9; }
  .nav-btn.active { background: rgba(14,165,233,.1); color: #0ea5e9; }
  .nav-btn-primary {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 18px; border-radius: 9px; font-size: 13px; font-weight: 700;
    color: #fff; background: #0ea5e9; border: none; cursor: pointer;
    text-decoration: none; white-space: nowrap; flex-shrink: 0;
    transition: all .18s; box-shadow: 0 4px 14px rgba(14,165,233,.3); font-family: inherit;
  }
  .nav-btn-primary:hover { background: #38bdf8; transform: translateY(-1px); }
  .hamburger-btn { display: none !important; }
  @media (max-width: 767px) { .hamburger-btn { display: flex !important; } }
  .cart-btn { transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), filter 0.3s ease; }
  .cart-btn:hover { transform: scale(1.18) translateY(-3px); filter: drop-shadow(0 6px 16px rgba(14,165,233,0.5)); }
  .cart-btn.has-item { animation: cartBounce 0.5s cubic-bezier(.34,1.56,.64,1); }
  @media (max-width: 767px) {
    #desktop-nav { display: none !important; }
    #desktop-actions { display: none !important; }
  }
`;

function CoursesDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  function handleEnter() { if (timeout.current) clearTimeout(timeout.current); setOpen(true); }
  function handleLeave() { timeout.current = setTimeout(() => setOpen(false), 140); }
  return (
    <div style={{ position: 'relative' }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link href='/courses' className={'nav-btn' + (isActive(pathname, '/courses') ? ' active' : '')}>
        Courses <ChevronDown style={{ width: 12, height: 12, transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </Link>
      {open && (
        <div className='nav-dropdown' style={{ position: 'absolute', left: 0, top: '100%', zIndex: 1001, paddingTop: 28, width: 520 }}>
          <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,.08)', borderRadius: 20, boxShadow: '0 32px 80px rgba(0,0,0,.2)', overflow: 'hidden', padding: 10 }}>
            {courseItems.map((item) => (
              <Link key={item.exam} href={item.href} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 14px', borderRadius: 12, textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,0,0,.04)'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0, marginTop: 6 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>{item.exam}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{item.tag}</div>
                </div>
                {item.available && <div style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, color: '#0ea5e9', background: 'rgba(14,165,233,.1)', borderRadius: 20, padding: '2px 8px' }}>Available</div>}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FeaturesDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  function handleEnter() { if (timeout.current) clearTimeout(timeout.current); setOpen(true); }
  function handleLeave() { timeout.current = setTimeout(() => setOpen(false), 140); }
  const featureItems = [
    { title: "Three Exam Modes", desc: "Timed, Tutor, and Quick practice modes built for real NCLEX pressure", color: "#0ea5e9", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>) },
    { title: "Deep Clinical Rationales", desc: "Every answer explained with full clinical reasoning", color: "#8b5cf6", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>) },
    { title: "Performance Dashboard", desc: "Track every attempt, spot weak topics, measure improvement", color: "#10b981", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>) },
    { title: "Flag & Review System", desc: "Flag tough questions and study them with full breakdowns", color: "#f59e0b", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>) },
    { title: "Adaptive Timer", desc: "Build mental endurance NCLEX demands with real timed pressure", color: "#ef4444", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>) },
    { title: "AI Tutor - Coming Soon", desc: "Personalised study plans that adapt to where you struggle", color: "#c084fc", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>) },
  ];
  return (
    <div style={{ position: "relative" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link href="/features" className={`nav-btn${isActive(pathname, "/features") ? " active" : ""}`}>
        Our Features
        <ChevronDown style={{ width: 12, height: 12, transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </Link>
      {open && (
        <div className="nav-dropdown" style={{ position: "absolute", left: "-160px", top: "100%", zIndex: 1001, paddingTop: "10px", width: "700px" }}>
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
                  style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "22px 18px", borderRadius: "12px", textDecoration: "none", transition: "all .2s", background: "transparent" }}
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
                <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>Interactive demos . Comparison table . Full breakdown</p>
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
  function handleEnter() { if (timeout.current) clearTimeout(timeout.current); setOpen(true); }
  function handleLeave() { timeout.current = setTimeout(() => setOpen(false), 140); }
  const previews = [
    { initials: "SG", name: "Stephanie G.", score: "Passed 85Q", exam: "NCLEX-RN", attempt: "1st attempt", color: "#0ea5e9", quote: "The questions felt exactly like the real exam. The rationales changed how I think clinically." },
    { initials: "MT", name: "Marcus T.", score: "1st attempt", exam: "NCLEX-RN", attempt: "1st attempt", color: "#059669", quote: "Three weeks of study using only this platform. I felt completely calm walking into the exam." },
    { initials: "AN", name: "Amara N.", score: "Passed 110Q", exam: "NCLEX-RN", attempt: "2nd attempt", color: "#7c3aed", quote: "After failing once with another platform, I switched here and passed comfortably." },
    { initials: "DW", name: "Denise W.", score: "Passed 85Q", exam: "NCLEX-PN", attempt: "1st attempt", color: "#4f46e5", quote: "Quick mode 10-question sprints were perfect for my schedule." },
  ];
  const active = previews[activeCard];
  return (
    <div style={{ position: "relative" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link href="/testimonials" className={`nav-btn${isActive(pathname, "/testimonials") ? " active" : ""}`}>
        Testimonials
        <ChevronDown style={{ width: 12, height: 12, transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </Link>
      {open && (
        <div className="nav-dropdown" style={{ position: "absolute", left: "-160px", top: "100%", zIndex: 1001, paddingTop: "10px", width: "580px" }}>
          <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,.08)", borderRadius: "20px", boxShadow: "0 32px 80px rgba(0,0,0,.2)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(0,0,0,.07)", background: "linear-gradient(135deg,rgba(14,165,233,.06) 0%,rgba(139,92,246,.04) 100%)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", margin: "0 0 2px" }}>Student Stories</p>
                <p style={{ fontSize: "11px", color: "#64748b", margin: 0, fontWeight: 500 }}>Real nurses . Real results . Verified</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "rgba(251,191,36,.1)", border: "1px solid rgba(251,191,36,.3)", borderRadius: "100px", padding: "5px 12px" }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#d97706", fontSize: "11px" }}>*</span>)}
                <span style={{ fontSize: "11px", color: "#92400e", fontWeight: 800, marginLeft: "4px" }}>4.9</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "190px 1fr", minHeight: "240px" }}>
              <div style={{ background: "rgba(248,249,251,1)", borderRight: "1px solid rgba(0,0,0,.06)", padding: "10px" }}>
                <p style={{ fontSize: "0px", fontWeight: 800, color: "#94a3b8", letterSpacing: ".16em", textTransform: "uppercase", padding: "4px 8px 10px" }}>Hover to preview</p>
                {previews.map((p, i) => (
                  <div key={p.name} onMouseEnter={() => setActiveCard(i)}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "12px", background: activeCard === i ? "#ffffff" : "transparent", border: `1px solid ${activeCard === i ? "rgba(0,0,0,.08)" : "transparent"}`, boxShadow: activeCard === i ? "0 2px 8px rgba(0,0,0,.06)" : "none", cursor: "pointer", transition: "all .2s ease", marginBottom: "4px" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: `${p.color}15`, border: `2px solid ${activeCard === i ? p.color + "60" : p.color + "25"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, color: p.color, flexShrink: 0, transition: "all .2s", transform: activeCard === i ? "scale(1.08)" : "scale(1)" }}>{p.initials}</div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: "12px", fontWeight: 700, color: activeCard === i ? "#0f172a" : "#475569", margin: 0, transition: "color .2s" }}>{p.name}</p>
                      <p style={{ fontSize: "10px", color: activeCard === i ? p.color : "#94a3b8", margin: 0, fontWeight: 600, transition: "color .2s" }}>{p.exam}</p>
                    </div>
                    {activeCard === i && <svg style={{ marginLeft: "auto", flexShrink: 0 }} width="12" height="12" fill="none" stroke={p.color} strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>}
                  </div>
                ))}
              </div>
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#ffffff", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "160px", height: "160px", borderRadius: "50%", background: `radial-gradient(circle,${active.color}12 0%,transparent 70%)`, pointerEvents: "none", transition: "background .3s ease" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ height: "3px", width: "40px", background: active.color, borderRadius: "3px", marginBottom: "14px", transition: "background .3s ease" }} />
                  <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                    {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#d97706", fontSize: "13px" }}>*</span>)}
                  </div>
                  <p style={{ fontSize: "13px", color: "#334155", fontStyle: "italic", lineHeight: 1.8, marginBottom: "16px", fontWeight: 500 }}>"{active.quote}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: `${active.color}15`, border: `2px solid ${active.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: active.color, flexShrink: 0 }}>{active.initials}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{active.name}</p>
                      <p style={{ fontSize: "10px", color: "#64748b", margin: 0, fontWeight: 500 }}>{active.exam} . {active.attempt}</p>
                    </div>
                    <span style={{ fontSize: "10px", fontWeight: 700, background: `${active.color}12`, color: active.color, border: `1px solid ${active.color}30`, padding: "5px 12px", borderRadius: "100px", whiteSpace: "nowrap" }}>{active.score}</span>
                  </div>
                </div>
                <Link href="/testimonials"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "rgba(14,165,233,.05)", border: "1px solid rgba(14,165,233,.15)", borderRadius: "12px", textDecoration: "none", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(14,165,233,.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(14,165,233,.05)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", margin: "0 0 2px" }}>Read all 22+ stories</p>
                    <p style={{ fontSize: "10px", color: "#64748b", margin: 0, fontWeight: 500 }}>NCLEX-RN . NCLEX-PN . Nursing School</p>
                  </div>
                  <svg width="16" height="16" fill="none" stroke="#0ea5e9" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
            <div style={{ borderTop: "1px solid rgba(0,0,0,.06)", padding: "12px 20px", background: "rgba(248,249,251,1)", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
              {[{ val: "50K+", label: "Students", color: "#0369a1" }, { val: "98%", label: "Pass rate", color: "#065f46" }, { val: "4.9*", label: "Rating", color: "#92400e" }, { val: "22+", label: "Stories", color: "#5b21b6" }].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px", fontWeight: 800, color: s.color, margin: "0 0 2px" }}>{s.val}</p>
                  <p style={{ fontSize: "10px", color: "#64748b", margin: 0, fontWeight: 600 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ContactDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  function handleEnter() { if (timeout.current) clearTimeout(timeout.current); setOpen(true); }
  function handleLeave() { timeout.current = setTimeout(() => setOpen(false), 800); }
  const people = [
    { name: "Melissa Ainsley", role: "Student Success Lead", email: "preprxnursing@gmail.com", color: "#0ea5e9", initials: "M", avatar: "/melissa-new.png", topics: "Platform . Courses . Account", response: "Within 4 hours", href: "/team/melissa" },
    { name: "Dr. James Whitfield", role: "Founder & Educator", email: "prenclexreview@gmail.com", color: "#8b5cf6", initials: "J", avatar: "/james2.jpg", topics: "Partnerships . Media . Strategy", response: "Within 24 hours", href: "/team/james" },
  ];
  return (
    <div style={{ position: "relative" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link href="/contact" className={`nav-btn${isActive(pathname, "/contact") ? " active" : ""}`}>
        Contact Us
        <ChevronDown style={{ width: 12, height: 12, transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </Link>
      {open && (
        <div className="nav-dropdown" style={{ position: "absolute", left: "-120px", top: "100%", zIndex: 1001, paddingTop: "10px", width: "480px" }}>
          <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,.08)", borderRadius: "20px", boxShadow: "0 32px 80px rgba(0,0,0,.2)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(0,0,0,.06)", background: "linear-gradient(135deg,rgba(14,165,233,.05) 0%,rgba(139,92,246,.04) 100%)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", margin: "0 0 2px" }}>Talk to a real person</p>
                <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>No bots . Real humans . Fast responses</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.2)", borderRadius: "100px", padding: "5px 12px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a" }}>Online now</span>
              </div>
            </div>
            <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {people.map(p => (
                <div key={p.name}
                  style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: "14px", padding: "14px 16px", borderRadius: "14px", background: "rgba(248,249,251,1)", border: "1px solid rgba(0,0,0,.06)", transition: "all .25s cubic-bezier(.34,1.56,.64,1)", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,.1)`; e.currentTarget.style.background = `linear-gradient(135deg,${p.color}08 0%,rgba(248,249,251,1) 100%)`; e.currentTarget.style.borderColor = `${p.color}30`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "rgba(248,249,251,1)"; e.currentTarget.style.borderColor = "rgba(0,0,0,.06)"; }}>
                  <div style={{ position: "relative" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", overflow: "hidden", border: `2px solid ${p.color}30` }}>
                      <img src={p.avatar} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }} onClick={() => window.location.href = p.href} />
                    </div>
                    <div style={{ position: "absolute", bottom: "1px", right: "1px", width: "12px", height: "12px", borderRadius: "50%", background: "#22c55e", border: "2px solid white" }} />
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                      <p style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", margin: 0, cursor: "pointer", textDecoration: "underline", textDecorationColor: "transparent" }} onClick={() => window.location.href = p.href} onMouseEnter={e => (e.currentTarget.style.textDecorationColor = p.color)} onMouseLeave={e => (e.currentTarget.style.textDecorationColor = "transparent")}>{p.name}</p>
                      <span style={{ fontSize: "0px", fontWeight: 700, background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}25`, padding: "2px 8px", borderRadius: "100px" }}>{p.role}</span>
                    </div>
                    <p style={{ fontSize: "11px", color: "#64748b", margin: "0 0 4px", fontWeight: 400 }}>{p.topics}</p>
                    <p style={{ fontSize: "10px", color: "#94a3b8", margin: 0, fontWeight: 500 }}>{p.response}</p>
                  </div>
                  <button onClick={() => window.open('https://mail.google.com/mail/?view=cm&to=' + p.email, '_blank')}
                    style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "10px", background: p.color, color: "#fff", textDecoration: "none", fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap", boxShadow: `0 4px 12px ${p.color}40`, transition: "all .2s", flexShrink: 0, position: "relative", zIndex: 10, border: "none", cursor: "pointer", fontFamily: "inherit" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
                    <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    Email
                  </button>
                </div>
              ))}
            </div>
            <div style={{ margin: "0 12px 12px", padding: "12px 16px", background: "rgba(14,165,233,.04)", border: "1px solid rgba(14,165,233,.12)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", margin: "0 0 2px" }}>Prefer a contact form?</p>
                <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>Send us a detailed message on the contact page</p>
              </div>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#0ea5e9", color: "#fff", padding: "8px 16px", borderRadius: "9px", fontSize: "11px", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(14,165,233,.3)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#38bdf8"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#0ea5e9"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Contact page
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NursingTVDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeChannel, setActiveChannel] = useState(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  function handleEnter() { if (timeout.current) clearTimeout(timeout.current); setOpen(true); }
  function handleLeave() { timeout.current = setTimeout(() => setOpen(false), 200); }
  const groups = [
    { label: "Licensure", color: "#0ea5e9", channels: [
      { title: "NCLEX-RN TV", tag: "Registered Nurse", color: "#0ea5e9", lessons: 24, live: true, desc: "Full NCLEX-RN prep with NGN-style questions, rationales, and live walkthroughs by licensed RNs.", icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" },
      { title: "NCLEX-PN TV", tag: "Practical Nurse", color: "#6366f1", lessons: 18, live: true, desc: "Targeted PN content covering pharmacology, safety, and clinical decision-making for LPN/LVN candidates.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
    ]},
    { label: "Specialty", color: "#ef4444", channels: [
      { title: "CCRN TV", tag: "Critical Care RN", color: "#ef4444", lessons: 20, live: true, desc: "ICU-focused content covering hemodynamics, ventilators, and high-acuity clinical scenarios.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
      { title: "CEN TV", tag: "Emergency Nurse", color: "#f97316", lessons: 14, live: false, desc: "Emergency nursing certification prep covering triage, trauma, and rapid assessment skills.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
      { title: "PCCN TV", tag: "Progressive Care", color: "#ec4899", lessons: 12, live: false, desc: "Step-down unit nursing content for intermediate care and progressive care certification.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
      { title: "FNP TV", tag: "Nurse Practitioner", color: "#8b5cf6", lessons: 16, live: false, desc: "Family nurse practitioner board prep with pharmacology, diagnostics, and clinical management.", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    ]},
    { label: "Entrance", color: "#f59e0b", channels: [
      { title: "TEAS 7 TV", tag: "Pre-Nursing Exam", color: "#f59e0b", lessons: 12, live: false, desc: "ATI TEAS 7 prep covering science, math, reading, and English for nursing school admission.", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
      { title: "HESI A2 TV", tag: "Admission Exam", color: "#10b981", lessons: 10, live: false, desc: "HESI A2 exam prep with subject-specific lessons and practice to secure your nursing school spot.", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
    ]},
    { label: "Life Support", color: "#06b6d4", channels: [
      { title: "ACLS TV", tag: "Advanced Cardiac", color: "#06b6d4", lessons: 8, live: false, desc: "ACLS certification prep covering algorithms, pharmacology, and advanced cardiac life support skills.", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" },
      { title: "BLS TV", tag: "Basic Life Support", color: "#84cc16", lessons: 6, live: false, desc: "BLS certification training with CPR techniques, AED use, and airway management fundamentals.", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
    ]},
  ];
  const group = groups[activeGroup];
  const channel = group.channels[Math.min(activeChannel, group.channels.length - 1)];
  return (
    <div style={{ position: "relative" }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button onClick={() => window.location.href="/nursing-tv"} className={`nav-btn${isActive(pathname, "/nursing-tv") ? " active" : ""}`} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444" style={{ flexShrink: 0 }}><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/></svg>
        Nursing TV
        <ChevronDown style={{ width: 12, height: 12, transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      {open && (
        <div className="nav-dropdown" style={{ position: "absolute", right: "-80px", top: "100%", zIndex: 1001, paddingTop: "10px", width: "720px" }}>
          <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,.08)", borderRadius: "20px", boxShadow: "0 32px 80px rgba(0,0,0,.18)", overflow: "hidden" }}>
            {/* HEADER */}
            <div style={{ padding: "14px 22px", borderBottom: "1px solid rgba(0,0,0,.06)", background: "linear-gradient(135deg,rgba(239,68,68,.05),rgba(14,165,233,.04))", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "100px", padding: "4px 12px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", display: "inline-block", boxShadow: "0 0 5px #ef4444" }} />
                  <span style={{ fontSize: "9px", fontWeight: 900, color: "#ef4444", letterSpacing: ".22em" }}>NURSING TV</span>
                </div>
                <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>10 channels &middot; 140+ lessons &middot; Free forever</span>
              </div>
              <Link href="/nursing-tv" style={{ fontSize: "11px", fontWeight: 700, color: "#0ea5e9", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
                Browse all
                <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            {/* GROUP TABS */}
            <div style={{ display: "flex", gap: "2px", padding: "10px 16px 0", background: "#f8f9fb", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
              {groups.map((g, i) => (
                <button key={g.label} onMouseEnter={() => { setActiveGroup(i); setActiveChannel(0); }}
                  style={{ padding: "8px 18px", borderRadius: "8px 8px 0 0", background: activeGroup === i ? "#ffffff" : "transparent", border: activeGroup === i ? "1px solid rgba(0,0,0,.08)" : "1px solid transparent", borderBottom: activeGroup === i ? "1px solid #fff" : "1px solid transparent", cursor: "pointer", fontFamily: "inherit", fontSize: "12px", fontWeight: activeGroup === i ? 700 : 500, color: activeGroup === i ? g.color : "#94a3b8", transition: "all .15s", marginBottom: "-1px", whiteSpace: "nowrap" }}>
                  {g.label}
                </button>
              ))}
            </div>
            {/* BODY */}
            <div style={{ display: "grid", gridTemplateColumns: "210px 1fr", minHeight: "230px" }}>
              {/* LEFT LIST */}
              <div style={{ background: "linear-gradient(180deg,#f8fafc 0%,#f1f5f9 100%)", borderRight: "1px solid rgba(0,0,0,.07)", padding: "10px" }}>
                {group.channels.map((c, i) => (
                  <div key={c.title} onMouseEnter={() => setActiveChannel(i)}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 11px", borderRadius: "11px", background: activeChannel === i ? "#ffffff" : "transparent", border: "1px solid " + (activeChannel === i ? "rgba(0,0,0,.08)" : "transparent"), boxShadow: activeChannel === i ? "0 2px 10px rgba(0,0,0,.07)" : "none", cursor: "pointer", transition: "all .18s", marginBottom: "3px" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: activeChannel === i ? c.color + "18" : c.color + "0e", border: "1px solid " + c.color + (activeChannel === i ? "35" : "18"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .18s" }}>
                      <svg width="15" height="15" fill="none" stroke={c.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={c.icon}/></svg>
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "1px" }}>
                        <p style={{ fontSize: "11.5px", fontWeight: 700, color: activeChannel === i ? "#0f172a" : "#334155", margin: 0, transition: "color .18s", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.title}</p>
                        {c.live && <span style={{ fontSize: "7px", fontWeight: 900, background: "rgba(239,68,68,.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,.25)", padding: "1px 4px", borderRadius: "100px", letterSpacing: ".1em", flexShrink: 0 }}>LIVE</span>}
                      </div>
                      <p style={{ fontSize: "10px", color: activeChannel === i ? c.color : "#94a3b8", margin: 0, fontWeight: 500, transition: "color .18s", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.tag}</p>
                    </div>
                    {activeChannel === i && <svg style={{ marginLeft: "auto", flexShrink: 0 }} width="11" height="11" fill="none" stroke={c.color} strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>}
                  </div>
                ))}
              </div>
              {/* RIGHT DETAIL */}
              <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#ffffff", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle," + channel.color + "12 0%,transparent 70%)", pointerEvents: "none", transition: "background .3s" }} />
                <div style={{ position: "absolute", bottom: "-30px", left: "-30px", width: "120px", height: "120px", borderRadius: "50%", background: "radial-gradient(circle," + channel.color + "08 0%,transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: channel.color + "15", border: "1px solid " + channel.color + "30", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="18" height="18" fill="none" stroke={channel.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={channel.icon}/></svg>
                    </div>
                    <div>
                      <p style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: "0 0 2px", fontFamily: "'Cormorant Garamond',serif", letterSpacing: ".01em" }}>{channel.title}</p>
                      <p style={{ fontSize: "10px", fontWeight: 700, color: channel.color, margin: 0, letterSpacing: ".08em", textTransform: "uppercase" }}>{channel.tag}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: "12px", color: "#334155", lineHeight: 1.7, margin: "0 0 14px", fontWeight: 400 }}>{channel.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", background: channel.color + "10", border: "1px solid " + channel.color + "25", borderRadius: "100px", padding: "4px 12px" }}>
                      <svg width="11" height="11" fill="none" stroke={channel.color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: channel.color }}>{channel.lessons} lessons</span>
                    </div>
                    {channel.live && (
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.18)", borderRadius: "100px", padding: "4px 12px" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ef4444", display: "inline-block", boxShadow: "0 0 4px #ef4444" }} />
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#ef4444" }}>Live now</span>
                      </div>
                    )}
                  </div>
                </div>
                <Link href="/nursing-tv"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", background: channel.color + "08", border: "1px solid " + channel.color + "20", borderRadius: "12px", textDecoration: "none", transition: "all .2s", marginTop: "16px" }}
                  onMouseEnter={e => { e.currentTarget.style.background = channel.color + "14"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 16px " + channel.color + "18"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = channel.color + "08"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", margin: "0 0 1px" }}>Watch {channel.title}</p>
                    <p style={{ fontSize: "10px", color: "#64748b", margin: 0, fontWeight: 500 }}>Free &middot; No signup required</p>
                  </div>
                  <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: channel.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="12" height="12" fill="white" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" fill="none"/></svg>
                  </div>
                </Link>
              </div>
            </div>
            {/* FOOTER */}
            <div style={{ borderTop: "1px solid rgba(0,0,0,.06)", padding: "11px 22px", background: "linear-gradient(135deg,rgba(239,68,68,.03),rgba(14,165,233,.03))", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
              {[{ val: "10", label: "Channels", color: "#0ea5e9" }, { val: "140+", label: "Lessons", color: "#0ea5e9" }, { val: "Free", label: "Forever", color: "#0ea5e9" }, { val: "Live", label: "Streaming", color: "#ef4444" }].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "15px", fontWeight: 800, color: s.color, margin: "0 0 1px", fontFamily: "'Cormorant Garamond',serif" }}>{s.val}</p>
                  <p style={{ fontSize: "10px", color: "#94a3b8", margin: 0, fontWeight: 600 }}>{s.label}</p>
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
  const { cartPlan, setCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [initials, setInitials] = useState("?");
  const [cartAnimating, setCartAnimating] = useState(false);
  const coursesTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moreTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevCartPlan = useRef<any>(null);

  useEffect(() => {
    if (cartPlan && !prevCartPlan.current) {
      setCartAnimating(true);
      setTimeout(() => setCartAnimating(false), 500);
    }
    prevCartPlan.current = cartPlan;
  }, [cartPlan]);

  useEffect(() => {
    const supabase = createClient();
    const otpVerified = () => document.cookie.includes("otp_verified=true");
    supabase.auth.getUser().then(({ data }) => {
      if (data.user && otpVerified()) {
        setUser(data.user);
        setInitials(getInitials(data.user.user_metadata?.full_name ?? data.user.email ?? ""));
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      const verified = document.cookie.includes("otp_verified=true");
      if (session?.user && verified) {
        setUser(session.user);
        setInitials(getInitials(session.user.user_metadata?.full_name ?? session.user.email ?? ""));
      } else { setUser(null); setInitials("?"); }
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
    await fetch("/api/auth/logout", { method: "POST" });
    setAvatarOpen(false);
    window.location.href = "/";
  }

  function handleCoursesEnter() { if (coursesTimeout.current) clearTimeout(coursesTimeout.current); setCoursesOpen(true); }
  function handleCoursesLeave() { coursesTimeout.current = setTimeout(() => setCoursesOpen(false), 140); }

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
      <header style={{ position: "sticky", top: 0, zIndex: 1000, background: "#ffffff", borderBottom: "3px solid #0ea5e9", backdropFilter: "blur(20px)", boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth: "100%", margin: "0 auto", display: "flex", alignItems: "center", padding: "0 32px", height: "80px", gap: "0px" }}>
          {/* LOGO */}
          <Link href="/" style={{ flexShrink: 0, display: "flex", alignItems: "center", textDecoration: "none", opacity: .92, transition: "opacity .15s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = ".92")}>
            <Image src="/logo.png" alt="Pre-NCLEX Nursing" width={130} height={34} style={{ objectFit: "contain" }} />
          </Link>

          {/* DESKTOP NAV */}
          <div id="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "0px", flex: 1, justifyContent: "space-evenly" }}>
            {/* COURSES DROPDOWN */}
            <div style={{ position: "relative" }} onMouseEnter={handleCoursesEnter} onMouseLeave={handleCoursesLeave}>
              <button className={`nav-btn${pathname.startsWith("/courses") ? " active" : ""}`}>
                Courses
                <ChevronDown style={{ width: 12, height: 12, transition: "transform .2s", transform: coursesOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
              </button>
              {coursesOpen && (
                <div className="nav-dropdown" style={{ position: "absolute", left: 0, top: "100%", zIndex: 1001, paddingTop: "10px", width: "720px" }}
                  onMouseEnter={handleCoursesEnter} onMouseLeave={handleCoursesLeave}>
                  <div style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,.08)", borderRadius: "20px", boxShadow: "0 32px 80px rgba(0,0,0,.18)", overflow: "hidden" }}>
                    <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(0,0,0,.07)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(14,165,233,.04)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9" }} />
                        <span style={{ fontSize: "11px", fontWeight: 800, color: "#64748b", letterSpacing: ".18em", textTransform: "uppercase" }}>Certification Paths</span>
                      </div>
                      <Link href="/courses" onClick={() => setCoursesOpen(false)} style={{ fontSize: "12px", fontWeight: 700, color: "#0ea5e9", textDecoration: "none" }}>View all</Link>
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
                                <span style={{ fontSize: "0px", fontWeight: 800, background: "rgba(14,165,233,.12)", color: "#0ea5e9", border: "1px solid rgba(14,165,233,.25)", padding: "2px 7px", borderRadius: "100px" }}>LIVE</span>
                              ) : (
                                <span style={{ fontSize: "0px", fontWeight: 600, background: "rgba(0,0,0,.04)", color: "#94a3b8", border: "1px solid rgba(0,0,0,.06)", padding: "2px 7px", borderRadius: "100px" }}>SOON</span>
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
                        <p style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", margin: 0 }}>Start with NCLEX-RN - it is free</p>
                        <p style={{ fontSize: "11px", color: "#64748b", margin: "2px 0 0", fontWeight: 500 }}>No credit card . No commitment . Live now</p>
                      </div>
                      <Link href="/courses/nclex-rn" onClick={() => setCoursesOpen(false)} className="nav-btn-primary" style={{ fontSize: "12px", padding: "7px 14px" }}>Try free</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {user ? (
              <>
                <Link href="/dashboard" className={`nav-btn${isActive(pathname, "/dashboard") ? " active" : ""}`}>Dashboard</Link>
                {appLinks.map((link) => (
                  <Link key={link.label} href={link.href} className={`nav-btn${isActive(pathname, link.href) ? " active" : ""}`}>{link.label}</Link>
                ))}
                <span style={{ width: "1px", height: "16px", background: "rgba(255,255,255,.1)", margin: "0 2px", flexShrink: 0 }} />
                <ContactDropdown pathname={pathname} />
                <NursingTVDropdown pathname={pathname} />
                <Link href="/pricing" className={`nav-btn${isActive(pathname, "/pricing") ? " active" : ""}`}>Pricing</Link>
              </>
            ) : (
              <>
                <CoursesDropdown pathname={pathname} />
                <FeaturesDropdown pathname={pathname} />
                <TestimonialsDropdown pathname={pathname} />
                <NursingTVDropdown pathname={pathname} />
                <ContactDropdown pathname={pathname} />
                <Link href="/pricing" className={`nav-btn${isActive(pathname, "/pricing") ? " active" : ""}`}>Pricing</Link>
              </>
            )}

            {/* MORE DROPDOWN */}
            <div style={{ position: "relative" }}
              onMouseEnter={() => { if (moreTimeout.current) clearTimeout(moreTimeout.current); setMoreOpen(true); }}
              onMouseLeave={() => { moreTimeout.current = setTimeout(() => setMoreOpen(false), 140); }}>
              <button className="nav-btn">
                More
                <ChevronDown style={{ width: 12, height: 12, transition: "transform .2s", transform: moreOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
              </button>
              {moreOpen && (
                <div className="nav-dropdown" style={{ position: "absolute", right: 0, top: "100%", zIndex: 1001, marginTop: "8px", width: "420px", background: "#ffffff", border: "1px solid rgba(0,0,0,.08)", borderRadius: "20px", boxShadow: "0 32px 80px rgba(0,0,0,.2)", overflow: "hidden" }}>
                  <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(0,0,0,.06)", background: "linear-gradient(135deg,rgba(14,165,233,.05) 0%,rgba(139,92,246,.04) 100%)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "12px", fontWeight: 800, color: "#0f172a", margin: 0 }}>More from Pre-NCLEX Nursing</p>
                    <span style={{ fontSize: "10px", fontWeight: 700, background: "rgba(14,165,233,.1)", color: "#0ea5e9", border: "1px solid rgba(14,165,233,.2)", padding: "3px 10px", borderRadius: "100px" }}>Resources</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", padding: "10px" }}>
                    {[
                      { href: "#", label: "Private Tutors", desc: "1-on-1 expert nursing tutors", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>), color: "#0ea5e9" },
                      { href: "/blog", label: "Blog", desc: "Nursing tips, study guides & news", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>), color: "#10b981" },
                      { href: "/faq", label: "FAQ", desc: "Answers to common questions", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>), color: "#f59e0b" },
                      { href: "/pricing", label: "Pricing", desc: "Free and premium plan details", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>), color: "#8b5cf6" },
                      { href: "/nursing-tv", label: "Nursing TV", desc: "Video lessons by licensed RNs", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>), color: "#ef4444" },
                      { href: "/contact", label: "Contact Us", desc: "Talk to Melissa or James directly", icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>), color: "#06b6d4" },
                    ].map((item) => (
                      <Link key={item.label} href={item.href}
                        style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px", borderRadius: "12px", textDecoration: "none", background: "rgba(248,249,251,1)", border: "1px solid rgba(0,0,0,.05)", transition: "all .25s cubic-bezier(.34,1.56,.64,1)" }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.background = `${item.color}08`; e.currentTarget.style.borderColor = `${item.color}25`; e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,.08)`; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.background = "rgba(248,249,251,1)"; e.currentTarget.style.borderColor = "rgba(0,0,0,.05)"; e.currentTarget.style.boxShadow = "none"; }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `${item.color}12`, border: `1px solid ${item.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: item.color, flexShrink: 0 }}>{item.icon}</div>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: "0 0 3px", lineHeight: 1.3 }}>{item.label}</p>
                          <p style={{ fontSize: "11px", color: "#64748b", margin: 0, fontWeight: 400, lineHeight: 1.4 }}>{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div style={{ margin: "0 10px 10px", padding: "14px 16px", background: "linear-gradient(135deg,rgba(14,165,233,.08) 0%,rgba(139,92,246,.06) 100%)", border: "1px solid rgba(14,165,233,.15)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: 800, color: "#0f172a", margin: "0 0 2px" }}>Ready to start preparing?</p>
                      <p style={{ fontSize: "11px", color: "#64748b", margin: 0, fontWeight: 400 }}>Free . No credit card . Live now</p>
                    </div>
                    <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#0ea5e9", color: "#fff", padding: "8px 16px", borderRadius: "9px", fontSize: "12px", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(14,165,233,.3)", transition: "all .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#38bdf8"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#0ea5e9"; e.currentTarget.style.transform = "translateY(0)"; }}>
                      Get started
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* FAR RIGHT */}
          <div id="desktop-actions" style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <button onClick={() => setCartOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 8px", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "1px", transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1), filter 0.3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.18) translateY(-3px)"; e.currentTarget.style.filter = "drop-shadow(0 6px 16px rgba(14,165,233,0.5))"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.filter = "none"; }}>
              <div style={{ position: "relative" }}>
                <svg width="38" height="36" viewBox="0 0 200 190" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="20" y1="20" x2="38" y2="20" stroke={cartPlan ? "#8b5cf6" : "#0ea5e9"} strokeWidth="10" strokeLinecap="round" style={{ transition: "stroke 0.3s" }}/>
                  <line x1="38" y1="20" x2="55" y2="100" stroke={cartPlan ? "#8b5cf6" : "#0ea5e9"} strokeWidth="10" strokeLinecap="round" style={{ transition: "stroke 0.3s" }}/>
                  <path d="M55 100 L55 148 L168 148 L185 75 L55 75 Z" fill={cartPlan ? "rgba(139,92,246,0.08)" : "rgba(14,165,233,0.08)"} stroke={cartPlan ? "#8b5cf6" : "#0ea5e9"} strokeWidth="8" strokeLinejoin="round" style={{ transition: "all 0.3s" }}/>
                  <line x1="57" y1="100" x2="181" y2="100" stroke={cartPlan ? "#8b5cf6" : "#0ea5e9"} strokeWidth="3" opacity="0.5"/>
                  <line x1="58" y1="120" x2="176" y2="120" stroke={cartPlan ? "#8b5cf6" : "#0ea5e9"} strokeWidth="3" opacity="0.5"/>
                  <line x1="85" y1="75" x2="80" y2="148" stroke={cartPlan ? "#8b5cf6" : "#0ea5e9"} strokeWidth="3" opacity="0.5"/>
                  <line x1="115" y1="75" x2="110" y2="148" stroke={cartPlan ? "#8b5cf6" : "#0ea5e9"} strokeWidth="3" opacity="0.5"/>
                  <line x1="145" y1="75" x2="138" y2="148" stroke={cartPlan ? "#8b5cf6" : "#0ea5e9"} strokeWidth="3" opacity="0.5"/>
                  <circle cx="82" cy="166" r="14" fill="none" stroke={cartPlan ? "#8b5cf6" : "#0ea5e9"} strokeWidth="7" style={{ transition: "stroke 0.3s" }}/>
                  <circle cx="82" cy="166" r="4" fill={cartPlan ? "#8b5cf6" : "#0ea5e9"} style={{ transition: "fill 0.3s" }}/>
                  <circle cx="148" cy="166" r="14" fill="none" stroke={cartPlan ? "#8b5cf6" : "#0ea5e9"} strokeWidth="7" style={{ transition: "stroke 0.3s" }}/>
                  <circle cx="148" cy="166" r="4" fill={cartPlan ? "#8b5cf6" : "#0ea5e9"} style={{ transition: "fill 0.3s" }}/>
                  <circle cx="138" cy="68" r="32" fill="#060f1e" stroke="#f59e0b" strokeWidth="5"/>
                  <path d="M152 52 A20 20 0 1 0 152 84" fill="none" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round"/>
                  <polyline points="126,68 134,78 154,56" fill="none" stroke="#0ea5e9" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {cartPlan && (
                  <span style={{ position: "absolute", top: "-2px", right: "-4px", width: "15px", height: "15px", borderRadius: "50%", background: "#ef4444", color: "#fff", fontSize: "8px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(239,68,68,0.6)" }}>1</span>
                )}
              </div>
              <span style={{ fontSize: "0px", fontWeight: 700, color: cartPlan ? "#8b5cf6" : "#0ea5e9", letterSpacing: ".06em", textTransform: "uppercase", transition: "color 0.3s" }}>Cart</span>
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
                    <div className="nav-dropdown" style={{ position: "absolute", right: 0, top: "100%", zIndex: 1001, marginTop: "8px", width: "200px", background: "#ffffff", border: "1px solid rgba(14,165,233,.15)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.45)" }}>
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
              <Link href="/auth/login" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", padding: "6px 14px", borderRadius: "9px", textDecoration: "none", transition: "background .15s", color: "#334155" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(14,165,233,.08)"; e.currentTarget.style.color = "#0ea5e9"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#334155"; }}>
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              <span style={{ fontSize: "11px", fontWeight: 600 }}>Sign in</span>
            </Link>
            )}
            
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            style={{ marginLeft: "auto", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "9px", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.05)", color: "#94a3b8", cursor: "pointer", flexShrink: 0 }}
            className="hamburger-btn"
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X style={{ width: 17, height: 17 }} /> : <Menu style={{ width: 17, height: 17 }} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", background: "#ffffff" }}>
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
                  {course.available && <span style={{ fontSize: "0px", fontWeight: 800, background: "rgba(14,165,233,.16)", color: "#7dd3fc", border: "1px solid rgba(14,165,233,.3)", padding: "2px 8px", borderRadius: "100px" }}>LIVE</span>}
                </Link>
              ))}
              <p style={{ fontSize: "10px", fontWeight: 700, color: "#334155", letterSpacing: ".16em", textTransform: "uppercase", padding: "10px 8px 2px" }}>Pages</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {[
                  { href: "/features", label: "Our Features" },
                  { href: "/testimonials", label: "Testimonials" },
                  { href: "/contact", label: "Contact Us" },
                  { href: "/pricing", label: "Pricing" },
                  { href: "/faq", label: "FAQ" },
                  { href: "/blog", label: "Blog" },
                  { href: "/nursing-tv", label: "Nursing TV" },
                ].map((link) => (
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





