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

  .blog-card {
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.07);
    background: rgba(255,255,255,.03);
    transition: all .4s cubic-bezier(.34,1.56,.64,1);
    cursor: pointer;
    text-decoration: none;
    display: flex;
    flex-direction: column;
  }
  .blog-card:hover {
    transform: translateY(-8px) scale(1.01);
    border-color: rgba(14,165,233,.25);
    box-shadow: 0 24px 60px rgba(0,0,0,.35);
    background: rgba(255,255,255,.05);
  }
  .blog-card:hover .blog-img {
    transform: scale(1.06);
  }
  .blog-card:hover .read-more {
    color: #38bdf8;
    gap: 10px;
  }

  .blog-img {
    transition: transform .5s ease;
  }

  .read-more {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 700;
    color: #475569;
    transition: all .3s ease;
  }

  .tag-btn {
    padding: 7px 16px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all .25s cubic-bezier(.34,1.56,.64,1);
    border: 1px solid rgba(255,255,255,.1);
    background: rgba(255,255,255,.05);
    color: #94a3b8;
    font-family: inherit;
    white-space: nowrap;
  }
  .tag-btn.active {
    background: rgba(14,165,233,.2);
    border-color: rgba(14,165,233,.45);
    color: #e0f2fe;
    transform: scale(1.05);
  }
  .tag-btn:hover:not(.active) {
    background: rgba(255,255,255,.1);
    color: #cbd5e1;
  }
`;

const posts = [
  {
    slug: "how-to-pass-nclex-first-attempt",
    title: "How to Pass the NCLEX-RN on Your First Attempt",
    excerpt: "Most students who fail NCLEX don't fail because they don't know enough — they fail because they don't know how to think like a nurse. Here's the strategic approach that works.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    tag: "NCLEX Strategy",
    tagColor: "#0ea5e9",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "March 15, 2025",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "ngn-next-generation-nclex-guide",
    title: "The Complete Guide to Next Generation NCLEX (NGN)",
    excerpt: "The NGN introduced new question formats that many students find intimidating. We break down every format with examples and strategies to tackle each one confidently.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80",
    tag: "NGN Prep",
    tagColor: "#8b5cf6",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "March 8, 2025",
    readTime: "12 min read",
    featured: true,
  },
  {
    slug: "pharmacology-nclex-tips",
    title: "5 Pharmacology Strategies That Actually Work for NCLEX",
    excerpt: "Pharmacology is the most feared topic on NCLEX. These five clinical reasoning strategies will help you answer pharm questions even when you don't remember the specific drug.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    tag: "Pharmacology",
    tagColor: "#10b981",
    author: "Melissa",
    authorRole: "Student Success Lead",
    date: "February 28, 2025",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "international-nurses-nclex",
    title: "International Nurses: What You Need to Know Before Taking NCLEX",
    excerpt: "If you trained outside the US, NCLEX can feel like a completely different style of thinking. Here's exactly what international nurses need to focus on to pass.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
    tag: "International Nurses",
    tagColor: "#f59e0b",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "February 18, 2025",
    readTime: "10 min read",
    featured: false,
  },
  {
    slug: "nclex-study-schedule",
    title: "The 6-Week NCLEX Study Schedule That Actually Works",
    excerpt: "A week-by-week breakdown of how to structure your study time in the six weeks before your NCLEX exam — including what to focus on, when to take practice exams, and how to avoid burnout.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    tag: "Study Planning",
    tagColor: "#34d399",
    author: "Melissa",
    authorRole: "Student Success Lead",
    date: "February 10, 2025",
    readTime: "9 min read",
    featured: false,
  },
  {
    slug: "clinical-priority-questions",
    title: "How to Answer Clinical Priority Questions Every Time",
    excerpt: "Priority questions are the hardest type on NCLEX. The ABC framework is helpful, but there's a deeper logic that most students miss. We explain the decision tree that works.",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800&q=80",
    tag: "Clinical Reasoning",
    tagColor: "#c084fc",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "January 30, 2025",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "mental-health-nclex-exam-day",
    title: "Managing Exam Anxiety: How to Stay Calm on NCLEX Day",
    excerpt: "Exam anxiety is real and it affects performance. These evidence-based techniques — used by students who passed at 85 questions — will help you walk into the testing centre calm and focused.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    tag: "Wellbeing",
    tagColor: "#f87171",
    author: "Melissa",
    authorRole: "Student Success Lead",
    date: "January 22, 2025",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "teas-hesi-difference",
    title: "TEAS vs HESI: Which Pre-Nursing Exam Do You Need?",
    excerpt: "If you're applying to nursing school, you'll likely need to take either the TEAS 7 or HESI A2. We break down the differences, what each exam tests, and how to prepare for both.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    tag: "Pre-Nursing",
    tagColor: "#fbbf24",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "January 12, 2025",
    readTime: "8 min read",
    featured: false,
  },
];

const tags = ["All", "NCLEX Strategy", "NGN Prep", "Pharmacology", "Clinical Reasoning", "Study Planning", "International Nurses", "Pre-Nursing", "Wellbeing"];

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All" ? posts : posts.filter(p => p.tag === activeTag);
  const featured = posts.filter(p => p.featured);
  const rest = filtered.filter(p => !p.featured || activeTag !== "All");

  return (
    <>
      <style>{fontStyle}</style>
      <main style={{ background: "#060f1e", minHeight: "100vh", color: "#f1f5f9" }}>

        {/* ═══ HERO ═══ */}
        <section style={{ position: "relative", padding: "110px 20px 80px", overflow: "hidden", background: "linear-gradient(160deg,#060f1e 0%,#0c1f3a 60%,#0a2540 100%)" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(14,165,233,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,.03) 1px,transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />
          <div className="float" style={{ position: "absolute", top: "-60px", right: "8%", width: "480px", height: "480px", background: "radial-gradient(circle,rgba(14,165,233,.1) 0%,transparent 65%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(14,165,233,.12)", border: "1px solid rgba(14,165,233,.3)", borderRadius: "100px", padding: "6px 18px", fontSize: "11px", fontWeight: 700, color: "#7dd3fc", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "28px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
              Nursing Insights
            </div>
            <h1 className="fd fade-up" style={{ fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 700, lineHeight: 1.08, color: "#f8fafc", marginBottom: "20px", animationDelay: ".1s" }}>
              Study smarter.<br />
              <span className="shimmer-text">Pass with confidence.</span>
            </h1>
            <p className="fade-up" style={{ fontSize: "1.1rem", color: "#94a3b8", lineHeight: 1.85, maxWidth: "540px", margin: "0 auto", animationDelay: ".2s" }}>
              Tips, strategies, and clinical insights written by licensed RNs — built to help you prepare smarter and pass on your first attempt.
            </p>
          </div>
        </section>

        {/* ═══ TICKER ═══ */}
        <div style={{ background: "#040d1a", borderTop: "1px solid rgba(14,165,233,.08)", borderBottom: "1px solid rgba(14,165,233,.08)", padding: "14px 0" }}>
          <div className="ticker-wrap">
            <div className="ticker-inner">
              {[...Array(2)].map((_, ri) => (
                <span key={ri} style={{ display: "inline-flex" }}>
                  {["NCLEX Strategy", "NGN Question Formats", "Pharmacology Tips", "Study Schedules", "International Nurses", "Clinical Priority", "Exam Day Wellbeing", "Pre-Nursing Prep"].map(t => (
                    <span key={t} className="ticker-item"><span className="ticker-dot" />{t}</span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ FEATURED POSTS ═══ */}
        {activeTag === "All" && (
          <section style={{ background: "linear-gradient(180deg,#0c1e35 0%,#0e2540 100%)", padding: "72px 20px" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
              <div style={{ marginBottom: "36px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px" }}>Featured Articles</p>
                <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 700, color: "#f8fafc" }}>Start here.</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))", gap: "20px" }}>
                {featured.map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                    <div style={{ height: "240px", overflow: "hidden", position: "relative" }}>
                      <img src={post.image} alt={post.title} className="blog-img" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.65)" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(6,15,30,.9) 0%,transparent 60%)" }} />
                      <div style={{ position: "absolute", top: "16px", left: "16px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 800, background: post.tagColor, color: "#fff", padding: "5px 12px", borderRadius: "100px", letterSpacing: ".06em" }}>{post.tag}</span>
                      </div>
                      <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px" }}>
                        <p style={{ fontSize: "11px", color: "rgba(255,255,255,.6)", margin: "0 0 6px", fontWeight: 500 }}>{post.date} · {post.readTime}</p>
                        <h3 className="fd" style={{ fontSize: "1.4rem", fontWeight: 700, color: "#f8fafc", margin: 0, lineHeight: 1.3 }}>{post.title}</h3>
                      </div>
                    </div>
                    <div style={{ padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.75, flex: 1, marginBottom: "16px" }}>{post.excerpt}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: `${post.tagColor}18`, border: `1.5px solid ${post.tagColor}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, color: post.tagColor }}>
                            {post.author[0]}
                          </div>
                          <div>
                            <p style={{ fontSize: "12px", fontWeight: 700, color: "#e2e8f0", margin: 0 }}>{post.author}</p>
                            <p style={{ fontSize: "10px", color: "#475569", margin: 0 }}>{post.authorRole}</p>
                          </div>
                        </div>
                        <span className="read-more">
                          Read article
                          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ TAG FILTER + ALL POSTS ═══ */}
        <section style={{ background: "#060f1e", padding: "72px 20px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
              {tags.map(t => (
                <button key={t} className={`tag-btn${activeTag === t ? " active" : ""}`}
                  onClick={() => setActiveTag(t)}>
                  {t}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <p style={{ fontSize: "40px", marginBottom: "12px" }}>📭</p>
                <p style={{ color: "#64748b" }}>No posts in this category yet.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "16px" }}>
                {(activeTag === "All" ? posts.filter(p => !p.featured) : filtered).map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                    <div style={{ height: "180px", overflow: "hidden", position: "relative" }}>
                      <img src={post.image} alt={post.title} className="blog-img" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.6)" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(6,15,30,.85) 0%,transparent 60%)" }} />
                      <div style={{ position: "absolute", top: "12px", left: "12px" }}>
                        <span style={{ fontSize: "9px", fontWeight: 800, background: post.tagColor, color: "#fff", padding: "4px 10px", borderRadius: "100px" }}>{post.tag}</span>
                      </div>
                    </div>
                    <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <p style={{ fontSize: "11px", color: "#334155", margin: "0 0 8px", fontWeight: 500 }}>{post.date} · {post.readTime}</p>
                      <h3 className="fd" style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f8fafc", margin: "0 0 10px", lineHeight: 1.35 }}>{post.title}</h3>
                      <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.75, flex: 1, marginBottom: "16px" }}>{post.excerpt}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: `${post.tagColor}18`, border: `1.5px solid ${post.tagColor}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, color: post.tagColor }}>
                            {post.author[0]}
                          </div>
                          <p style={{ fontSize: "12px", fontWeight: 600, color: "#64748b", margin: 0 }}>{post.author}</p>
                        </div>
                        <span className="read-more">
                          Read
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══ NEWSLETTER CTA ═══ */}
        <section style={{ background: "linear-gradient(135deg,#071428 0%,#0e2240 100%)", padding: "80px 20px", borderTop: "1px solid rgba(255,255,255,.04)" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px" }}>Stay Updated</p>
            <h2 className="fd" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2, marginBottom: "14px" }}>
              New articles every week.
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.8, marginBottom: "32px" }}>
              NCLEX tips, study strategies, and clinical insights delivered straight from our team of licensed RNs.
            </p>
            <div style={{ display: "flex", gap: "10px", maxWidth: "440px", margin: "0 auto 28px" }}>
              <input type="email" placeholder="Your email address"
                style={{ flex: 1, padding: "13px 18px", borderRadius: "12px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#e2e8f0", fontSize: "14px", outline: "none", fontFamily: "inherit" }}
                onFocus={e => e.currentTarget.style.borderColor = "#0ea5e9"}
                onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"} />
              <button style={{ padding: "13px 24px", borderRadius: "12px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", fontSize: "14px", fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", boxShadow: "0 4px 14px rgba(14,165,233,.3)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
                Subscribe →
              </button>
            </div>
            <p style={{ fontSize: "11px", color: "#334155" }}>No spam. Unsubscribe any time. We respect your inbox.</p>
          </div>
        </section>

        {/* ═══ BOTTOM CTA ═══ */}
        <section style={{ position: "relative", padding: "80px 20px", overflow: "hidden", background: "#060f1e", textAlign: "center" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "500px", background: "radial-gradient(circle,rgba(14,165,233,.07) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "560px", margin: "0 auto" }}>
            <h2 className="fd" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.15, marginBottom: "16px" }}>
              Ready to put it into practice?
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.85, marginBottom: "32px" }}>
              Reading about NCLEX strategy is the first step. Practising it is what gets you there.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/quiz" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "14px 32px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 28px rgba(14,165,233,.3)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
                Try a practice exam →
              </Link>
              <Link href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.07)", color: "#e2e8f0", padding: "14px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,.12)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.13)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; }}>
                Start free today
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}