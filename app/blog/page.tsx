"use client";
import { useState } from "react";
import Link from "next/link";
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-18px); } }
  @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  .fade-up { animation: fadeUp .7s cubic-bezier(.22,1,.36,1) both; }
  .float { animation: float 6s ease-in-out infinite; }
  .fd { font-family: "Cormorant Garamond", serif; }
  .shimmer-text {
    background: linear-gradient(90deg, #38bdf8, #7dd3fc, #0ea5e9, #38bdf8);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }
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
  .blog-card:hover .blog-img { transform: scale(1.06); }
  .blog-card:hover .read-more { color: #38bdf8; gap: 10px; }
  .blog-img { transition: transform .5s ease; }
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
  .tag-btn:hover:not(.active) { background: rgba(255,255,255,.1); color: #cbd5e1; }
`;
const posts = [
  {
    slug: "how-to-pass-nclex-first-attempt",
    title: "How to Pass the NCLEX-RN on Your First Attempt",
    excerpt: "Most students who fail NCLEX do not fail because they do not know enough -- they fail because they do not know how to think like a nurse. Here is the strategic approach that works.",
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
    excerpt: "Pharmacology is the most feared topic on NCLEX. These five strategies will help you master drug classes, side effects, and nursing implications without memorizing everything.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    tag: "Pharmacology",
    tagColor: "#10b981",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "February 28, 2025",
    readTime: "10 min read",
    featured: false,
  },
  {
    slug: "clinical-reasoning-nclex",
    title: "Clinical Reasoning: The Skill That Separates Passers from Failers",
    excerpt: "NCLEX is not a knowledge test -- it is a clinical judgment test. Learn how to develop the reasoning framework that examiners are actually testing for.",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80",
    tag: "Clinical Reasoning",
    tagColor: "#f59e0b",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "February 14, 2025",
    readTime: "9 min read",
    featured: false,
  },
  {
    slug: "nclex-study-plan-8-weeks",
    title: "The 8-Week NCLEX Study Plan That Actually Works",
    excerpt: "Stop winging your NCLEX prep. This structured 8-week plan tells you exactly what to study each day so you walk into the exam fully prepared and confident.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
    tag: "Study Planning",
    tagColor: "#ec4899",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "January 30, 2025",
    readTime: "11 min read",
    featured: false,
  },
  {
    slug: "international-nurses-nclex",
    title: "International Nurses: Your Complete Guide to NCLEX Licensure in the US",
    excerpt: "Trained outside the US and want to practice as an RN in America? Here is everything you need to know about eligibility, CGFNS, the NCLEX, and getting your license.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80",
    tag: "International Nurses",
    tagColor: "#6366f1",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "January 20, 2025",
    readTime: "14 min read",
    featured: false,
  },
  {
    slug: "teas-7-complete-guide",
    title: "TEAS 7 Complete Guide: How to Ace Your Nursing School Entrance Exam",
    excerpt: "The TEAS 7 is the gateway to nursing school. This guide covers every section -- Science, Math, English, Reading -- with strategies and practice tips.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    tag: "Pre-Nursing",
    tagColor: "#fbbf24",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "January 12, 2025",
    readTime: "8 min read",
    featured: false,
  },
  {
    slug: "nurse-burnout-self-care",
    title: "Avoiding Burnout During NCLEX Prep: A Nurse's Guide to Self-Care",
    excerpt: "NCLEX prep is a marathon, not a sprint. Learn how to protect your mental health, manage anxiety, and stay motivated throughout your study journey.",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80",
    tag: "Wellbeing",
    tagColor: "#14b8a6",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "January 5, 2025",
    readTime: "7 min read",
    featured: false,
  },
];
const tags = ["All", "NCLEX Strategy", "NGN Prep", "Pharmacology", "Clinical Reasoning", "Study Planning", "International Nurses", "Pre-Nursing", "Wellbeing"];
export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");
  const [email, setEmail] = useState("");
  const filtered = activeTag === "All" ? posts : posts.filter(p => p.tag === activeTag);
  const featured = posts.filter(p => p.featured);
  return (
    <>
      <style>{fontStyle}</style>
      <main style={{ background: "#060f1e", minHeight: "100vh", color: "#f1f5f9" }}>
        {/* HERO */}
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
            <p className="fade-up" style={{ fontSize: "1.1rem", color: "#94a3b8", lineHeight: 1.85, maxWidth: "540px", margin: "0 auto 36px", animationDelay: ".2s" }}>
              Tips, strategies, and clinical insights written by licensed RNs -- built to help you prepare smarter and pass on your first attempt.
            </p>
          </div>
        </section>
        {/* FEATURED POSTS */}
        {activeTag === "All" && (
          <section style={{ background: "#0a1628", padding: "72px 20px" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
              <h2 className="fd" style={{ fontSize: "2rem", fontWeight: 700, color: "#f8fafc", marginBottom: "32px" }}>Featured Articles</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "20px" }}>
                {featured.map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                    <div style={{ overflow: "hidden", height: "220px" }}>
                      <img className="blog-img" src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: post.tagColor, textTransform: "uppercase", letterSpacing: ".1em" }}>{post.tag}</span>
                      <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.4, margin: 0 }}>{post.title}</h3>
                      <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.6, margin: 0, flex: 1 }}>{post.excerpt}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: `${post.tagColor}18`, border: `1.5px solid ${post.tagColor}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, color: post.tagColor }}>
                            {post.author[0]}
                          </div>
                          <div>
                            <p style={{ fontSize: "12px", fontWeight: 700, color: "#e2e8f0", margin: 0 }}>{post.author}</p>
                            <p style={{ fontSize: "10px", color: "#475569", margin: 0 }}>{post.date} . {post.readTime}</p>
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
        {/* TAG FILTER + ALL POSTS */}
        <section style={{ background: "#060f1e", padding: "72px 20px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
              {tags.map(t => (
                <button key={t} className={`tag-btn${activeTag === t ? " active" : ""}`} onClick={() => setActiveTag(t)}>
                  {t}
                </button>
              ))}
            </div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <p style={{ color: "#64748b" }}>No posts in this category yet.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "16px" }}>
                {filtered.map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                    <div style={{ overflow: "hidden", height: "180px" }}>
                      <img className="blog-img" src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: post.tagColor, textTransform: "uppercase", letterSpacing: ".1em" }}>{post.tag}</span>
                      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.4, margin: 0 }}>{post.title}</h3>
                      <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.6, margin: 0, flex: 1 }}>{post.excerpt}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
                        <p style={{ fontSize: "11px", color: "#475569", margin: 0 }}>{post.date} . {post.readTime}</p>
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
        {/* NEWSLETTER CTA */}
        <section style={{ background: "linear-gradient(135deg,#0a1628,#0e2540)", padding: "80px 20px", borderTop: "1px solid rgba(14,165,233,.1)" }}>
          <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
            <h2 className="fd" style={{ fontSize: "2.2rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px" }}>
              Get NCLEX tips in your inbox
            </h2>
            <p style={{ color: "#94a3b8", marginBottom: "32px", fontSize: "15px", lineHeight: 1.7 }}>
              Join thousands of nursing students getting weekly study strategies, NGN breakdowns, and exam-day tips.
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ flex: 1, minWidth: "220px", padding: "14px 18px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "10px", color: "#f1f5f9", fontSize: "15px", outline: "none", fontFamily: "inherit" }}
              />
              <button
                onClick={() => { alert("Thank you for subscribing!"); setEmail(""); }}
                style={{ padding: "14px 28px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "15px", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}
              >
                Subscribe Free
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
