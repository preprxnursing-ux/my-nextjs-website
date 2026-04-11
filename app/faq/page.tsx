"use client";

import { useState } from "react";
import Link from "next/link";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
  *, body { font-family: 'Plus Jakarta Sans', sans-serif; }
  .fd { font-family: 'Cormorant Garamond', Georgia, serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-12px); }
  }
  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .fade-up { animation: fadeUp .7s ease both; }
  .float   { animation: floatY 6s ease-in-out infinite; }

  .shimmer-text {
    background: linear-gradient(90deg, #38bdf8 0%, #e0f2fe 40%, #38bdf8 80%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
  }

  .ticker-wrap { overflow: hidden; white-space: nowrap; }
  .ticker-inner { display: inline-flex; animation: ticker 30s linear infinite; }
  .ticker-item {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 0 32px; font-size: 13px; font-weight: 600; color: #94a3b8;
  }
  .ticker-dot { width: 5px; height: 5px; border-radius: 50%; background: #0ea5e9; flex-shrink: 0; }

  .faq-item {
    border-radius: 18px;
    overflow: hidden;
    transition: all .3s ease;
  }
  .faq-item:hover {
    transform: translateY(-2px);
  }

  .category-btn {
    padding: 9px 20px;
    border-radius: 100px;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all .25s cubic-bezier(.34,1.56,.64,1);
    border: 1px solid rgba(255,255,255,.1);
    background: rgba(255,255,255,.05);
    color: #94a3b8;
    font-family: inherit;
    white-space: nowrap;
  }
  .category-btn.active {
    background: linear-gradient(135deg,rgba(14,165,233,.25),rgba(56,189,248,.15));
    border-color: rgba(14,165,233,.5);
    color: #e0f2fe;
    box-shadow: 0 0 20px rgba(14,165,233,.2);
    transform: scale(1.05);
  }
  .category-btn:hover:not(.active) {
    background: rgba(255,255,255,.1);
    color: #cbd5e1;
  }
`;

const categories = [
  { id: "all", label: "All Questions", icon: "🔍" },
  { id: "platform", label: "Platform", icon: "💻" },
  { id: "pricing", label: "Pricing", icon: "💳" },
  { id: "exams", label: "Exams & Content", icon: "📚" },
  { id: "account", label: "Account", icon: "👤" },
  { id: "international", label: "International", icon: "🌍" },
];

const faqs = [
  {
    category: "platform",
    q: "What exam modes are available on the platform?",
    a: "We offer three modes: Timed Mode (simulates real NCLEX pressure with a countdown), Tutor Mode (shows rationales after each answer so you learn as you go), and Quick Mode (10-question sprints perfect for busy schedules). You can switch between modes at any time.",
    color: "#0ea5e9",
  },
  {
    category: "platform",
    q: "How many questions are in the question bank?",
    a: "We currently have 3,100+ NCLEX-RN questions covering all 8 client needs categories. Premium subscribers also get access to NCLEX-PN, FNP, and CCRN question sets. New questions are added regularly by our team of licensed RNs.",
    color: "#0ea5e9",
  },
  {
    category: "platform",
    q: "What are the rationales and how do they help?",
    a: "After every question, we provide a full clinical rationale explaining not just why the correct answer is right, but why each incorrect option is wrong. This builds true clinical reasoning — the skill NCLEX actually tests — rather than simple memorisation.",
    color: "#0ea5e9",
  },
  {
    category: "platform",
    q: "Does the platform support NGN (Next Generation NCLEX) question formats?",
    a: "Yes. We include NGN-style question formats including bowtie, matrix, extended drag-and-drop, and enhanced hot spot questions. These formats are integrated throughout the question bank so you're fully prepared for the current NCLEX format.",
    color: "#0ea5e9",
  },
  {
    category: "platform",
    q: "Can I flag questions to review later?",
    a: "Yes. During any exam session you can flag any question. After completing the session, flagged questions are saved and accessible from your review page so you can revisit them with full rationales at any time.",
    color: "#0ea5e9",
  },
  {
    category: "pricing",
    q: "Is the platform really free to start?",
    a: "Absolutely. No credit card required. The Free plan gives you access to 30 NCLEX-RN questions, all three exam modes, basic score tracking, and full rationales. You can experience the full quality of the platform before deciding to upgrade.",
    color: "#34d399",
  },
  {
    category: "pricing",
    q: "How much does Premium cost?",
    a: "Premium is $29 per month and includes unlimited access to the full question bank, all topic categories, FNP and CCRN question sets, AI-powered study recommendations, and performance analytics. You can cancel at any time.",
    color: "#34d399",
  },
  {
    category: "pricing",
    q: "Can I switch plans at any time?",
    a: "Yes. You can upgrade or downgrade your plan at any time directly from your dashboard. Changes take effect immediately. If you upgrade mid-month, you are only charged for the remaining days.",
    color: "#34d399",
  },
  {
    category: "pricing",
    q: "What is your refund policy?",
    a: "If you are not satisfied within 7 days of upgrading to Premium, we will issue a full refund — no questions asked. Just contact Melissa at preprxnursing@gmail.com and we will process it within 24 hours.",
    color: "#34d399",
  },
  {
    category: "pricing",
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards via Stripe. Your payment information is fully encrypted and never stored on our servers. We do not store card numbers.",
    color: "#34d399",
  },
  {
    category: "exams",
    q: "Which exams does the platform cover?",
    a: "We currently have a live NCLEX-RN course. Coming soon: NCLEX-PN, Pre-Nursing (TEAS 7 and HESI A2), Nursing School Companion, Nurse Practitioner (FNP), and CCRN. Premium subscribers will get access to all new courses as they launch.",
    color: "#c084fc",
  },
  {
    category: "exams",
    q: "How closely does the platform match the real NCLEX?",
    a: "Very closely. Our questions are written and reviewed by licensed RNs and follow the official NCLEX-RN test plan published by the NCSBN. Students consistently report that our question difficulty and clinical reasoning style matches or exceeds the real exam.",
    color: "#c084fc",
  },
  {
    category: "exams",
    q: "How many questions does the real NCLEX have?",
    a: "The current NCLEX-RN (Next Generation NCLEX) has between 85 and 150 questions. The exam uses computerised adaptive testing (CAT) which adjusts difficulty based on your responses. Our platform simulates this adaptive experience.",
    color: "#c084fc",
  },
  {
    category: "exams",
    q: "What topics are covered in the question bank?",
    a: "All 8 NCLEX client needs categories: Safe and Effective Care Environment, Health Promotion and Maintenance, Psychosocial Integrity, Physiological Integrity (Basic Care, Pharmacological Therapies, Reduction of Risk, Physiological Adaptation). Every question is tagged by category and subtopic.",
    color: "#c084fc",
  },
  {
    category: "account",
    q: "How do I track my progress?",
    a: "Your dashboard shows your total attempts, average score, best score, and latest score. The History page shows a full performance graph over time with score trends, attempt breakdowns, and improvement insights. You can click any attempt to expand its full details.",
    color: "#fbbf24",
  },
  {
    category: "account",
    q: "Can I use the platform on mobile?",
    a: "Yes. The platform is fully responsive and works on all devices — phone, tablet, and desktop. We recommend the desktop experience for exam simulation, but mobile is perfect for quick practice sessions.",
    color: "#fbbf24",
  },
  {
    category: "account",
    q: "How do I sign in with Google?",
    a: "On the login page, click 'Continue with Google' and sign in with your Google account. If it's your first time, a profile is created automatically. Your exam history and progress are tied to your account across all devices.",
    color: "#fbbf24",
  },
  {
    category: "account",
    q: "How do I share my success story?",
    a: "Once you've completed a practice exam within the last 21 days, the 'Share My Story' button on the Testimonials page unlocks. You can submit your name, exam type, score, attempt number, and your full story. Stories are reviewed and published by our team.",
    color: "#fbbf24",
  },
  {
    category: "international",
    q: "Can international nurses use this platform?",
    a: "Absolutely. Our platform is used by nursing students and internationally trained nurses from over 40 countries. The content is aligned with the NCSBN NCLEX test plan which is the same standard used globally for NCLEX licensure.",
    color: "#f87171",
  },
  {
    category: "international",
    q: "Is the platform available in other languages?",
    a: "Currently the platform is in English only, as NCLEX is administered in English. However, our rationales are written in clear, accessible English designed to be easy to follow for non-native speakers.",
    color: "#f87171",
  },
  {
    category: "international",
    q: "I trained outside the US — will this platform still help me?",
    a: "Yes. Many of our most successful students are internationally trained nurses (ITNs) preparing for NCLEX licensure in the US, Canada, or Australia. The clinical reasoning approach we teach bridges the gap between international training and NCLEX expectations.",
    color: "#f87171",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter(f => {
    const matchesCategory = activeCategory === "all" || f.category === activeCategory;
    const matchesSearch = search === "" ||
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <style>{fontStyle}</style>
      <main style={{ background: "#060f1e", minHeight: "100vh", color: "#f1f5f9" }}>

        {/* ═══ HERO ═══ */}
        <section style={{ position: "relative", padding: "110px 20px 80px", overflow: "hidden", background: "linear-gradient(160deg,#060f1e 0%,#0c1f3a 60%,#0a2540 100%)" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(14,165,233,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,.03) 1px,transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />
          <div className="float" style={{ position: "absolute", top: "-60px", right: "8%", width: "480px", height: "480px", background: "radial-gradient(circle,rgba(14,165,233,.1) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-40px", left: "4%", width: "320px", height: "320px", background: "radial-gradient(circle,rgba(139,92,246,.07) 0%,transparent 65%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(14,165,233,.12)", border: "1px solid rgba(14,165,233,.3)", borderRadius: "100px", padding: "6px 18px", fontSize: "11px", fontWeight: 700, color: "#7dd3fc", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "28px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
              Help Centre
            </div>
            <h1 className="fd fade-up" style={{ fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 700, lineHeight: 1.08, color: "#f8fafc", marginBottom: "20px", animationDelay: ".1s" }}>
              Got questions?<br />
              <span className="shimmer-text">We have answers.</span>
            </h1>
            <p className="fade-up" style={{ fontSize: "1.1rem", color: "#94a3b8", lineHeight: 1.85, maxWidth: "540px", margin: "0 auto 36px", animationDelay: ".2s" }}>
              Everything you need to know about Pre-NCLEX Nursing — from platform features to pricing and exam content.
            </p>

            {/* Search */}
            <div className="fade-up" style={{ position: "relative", maxWidth: "520px", margin: "0 auto", animationDelay: ".3s" }}>
              <svg style={{ position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)", color: "#475569", flexShrink: 0 }} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setOpenIndex(null); }}
                placeholder="Search any question..."
                style={{ width: "100%", padding: "16px 20px 16px 48px", borderRadius: "14px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", color: "#e2e8f0", fontSize: "14px", outline: "none", fontFamily: "inherit", transition: "border-color .2s", boxSizing: "border-box" }}
                onFocus={e => e.currentTarget.style.borderColor = "#0ea5e9"}
                onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.12)"}
              />
              {search && (
                <button onClick={() => setSearch("")}
                  style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,.1)", border: "none", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#64748b" }}>
                  ×
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ═══ TICKER ═══ */}
        <div style={{ background: "#040d1a", borderTop: "1px solid rgba(14,165,233,.08)", borderBottom: "1px solid rgba(14,165,233,.08)", padding: "14px 0" }}>
          <div className="ticker-wrap">
            <div className="ticker-inner">
              {[...Array(2)].map((_, ri) => (
                <span key={ri} style={{ display: "inline-flex" }}>
                  {["20+ questions answered", "Platform · Pricing · Exams · Account", "International nurses welcome", "No credit card to start", "Cancel anytime", "Built by licensed RNs", "Still have questions? Contact Melissa"].map(t => (
                    <span key={t} className="ticker-item"><span className="ticker-dot" />{t}</span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ CATEGORY FILTER ═══ */}
        <section style={{ background: "linear-gradient(180deg,#0c1e35 0%,#0e2540 100%)", padding: "52px 20px 0" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginBottom: "48px" }}>
              {categories.map(c => (
                <button key={c.id} className={`category-btn${activeCategory === c.id ? " active" : ""}`}
                  onClick={() => { setActiveCategory(c.id); setOpenIndex(null); }}>
                  {c.icon} {c.label}
                </button>
              ))}
            </div>

            {/* Results count */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <p style={{ fontSize: "13px", color: "#475569", fontWeight: 500 }}>
                {filtered.length} question{filtered.length !== 1 ? "s" : ""} {search ? `matching "${search}"` : `in ${categories.find(c => c.id === activeCategory)?.label}`}
              </p>
              {search && (
                <button onClick={() => setSearch("")}
                  style={{ fontSize: "12px", color: "#38bdf8", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  Clear search
                </button>
              )}
            </div>

            {/* FAQ Items */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <p style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</p>
                <p style={{ fontSize: "16px", color: "#64748b" }}>No questions match your search.</p>
                <button onClick={() => { setSearch(""); setActiveCategory("all"); }}
                  style={{ marginTop: "16px", padding: "10px 24px", borderRadius: "10px", background: "rgba(14,165,233,.15)", border: "1px solid rgba(14,165,233,.3)", color: "#38bdf8", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  Show all questions
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingBottom: "60px" }}>
                {filtered.map((faq, i) => (
                  <div key={i} className="faq-item"
                    style={{ background: openIndex === i ? `linear-gradient(135deg,${faq.color}08 0%,rgba(255,255,255,.04) 100%)` : "rgba(255,255,255,.03)", border: `1px solid ${openIndex === i ? faq.color + "30" : "rgba(255,255,255,.07)"}`, transition: "all .3s ease" }}>
                    <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", gap: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1 }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: `${faq.color}15`, border: `1px solid ${faq.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: faq.color }} />
                        </div>
                        <p style={{ fontSize: "15px", fontWeight: 700, color: openIndex === i ? "#f8fafc" : "#e2e8f0", margin: 0, lineHeight: 1.4, transition: "color .2s" }}>{faq.q}</p>
                      </div>
                      <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: openIndex === i ? `${faq.color}15` : "rgba(255,255,255,.06)", border: `1px solid ${openIndex === i ? faq.color + "35" : "rgba(255,255,255,.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .3s", transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                        <svg width="12" height="12" fill="none" stroke={openIndex === i ? faq.color : "#64748b"} strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                      </div>
                    </button>
                    {openIndex === i && (
                      <div style={{ padding: "0 24px 22px 70px" }}>
                        <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.85, margin: 0, fontWeight: 400 }}>{faq.a}</p>
                        <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                          <span style={{ fontSize: "11px", fontWeight: 700, background: `${faq.color}12`, color: faq.color, border: `1px solid ${faq.color}25`, padding: "4px 12px", borderRadius: "100px", textTransform: "capitalize" }}>
                            {categories.find(c => c.id === faq.category)?.label}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══ STILL HAVE QUESTIONS ═══ */}
        <section style={{ background: "#060f1e", padding: "80px 20px", borderTop: "1px solid rgba(255,255,255,.04)" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { name: "Melissa", role: "Student Success Lead", email: "preprxnursing@gmail.com", color: "#0ea5e9", avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80", desc: "Platform questions, account help, getting started" },
                { name: "James", role: "Founder & Lead Educator", email: "prenclexreview@gmail.com", color: "#8b5cf6", avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80", desc: "Partnerships, educator plans, strategic questions" },
              ].map(p => (
                <div key={p.name}
                  style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "20px", padding: "28px", transition: "all .35s cubic-bezier(.34,1.56,.64,1)", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = `${p.color}35`; e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,.3)`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.07)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                    <div style={{ width: "52px", height: "52px", borderRadius: "50%", overflow: "hidden", border: `2px solid ${p.color}40`, flexShrink: 0 }}>
                      <img src={p.avatar} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                      <p style={{ fontSize: "15px", fontWeight: 800, color: "#f8fafc", margin: 0 }}>{p.name}</p>
                      <p style={{ fontSize: "11px", color: p.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", margin: 0 }}>{p.role}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.75, marginBottom: "18px" }}>{p.desc}</p>
                  <a href={`mailto:${p.email}`}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px", borderRadius: "12px", background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}25`, textDecoration: "none", fontSize: "13px", fontWeight: 700, transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = p.color; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = `${p.color}12`; e.currentTarget.style.color = p.color; }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    {p.email}
                  </a>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "48px" }}>
              <p style={{ fontSize: "13px", color: "#475569", marginBottom: "20px" }}>Or explore the platform directly</p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "13px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 24px rgba(14,165,233,.3)", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
                  Start free today →
                </Link>
                <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.07)", color: "#e2e8f0", padding: "13px 24px", borderRadius: "12px", fontSize: "14px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,.1)", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.13)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; }}>
                  View pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}