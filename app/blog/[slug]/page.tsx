"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, blogPosts } from "@/lib/blogPosts";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
  *, body { font-family: 'Plus Jakarta Sans', sans-serif; }
  .fd { font-family: 'Cormorant Garamond', Georgia, serif; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  .fade-up { animation: fadeUp .6s ease both; }
  .back-btn:hover { color: #38bdf8 !important; gap: 10px !important; }
  .share-btn:hover { background: rgba(14,165,233,.2) !important; border-color: rgba(14,165,233,.5) !important; color: #e0f2fe !important; }
  .related-card:hover { transform: translateY(-6px) !important; border-color: rgba(14,165,233,.3) !important; background: rgba(255,255,255,.06) !important; }
  .progress-bar { position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg,#0ea5e9,#8b5cf6); z-index: 9999; transition: width .1s linear; pointer-events: none; }
  .prose h2 { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.7rem; font-weight: 700; color: #f1f5f9; margin: 2.5rem 0 1rem; line-height: 1.25; }
  .prose p { color: #94a3b8; line-height: 1.9; margin-bottom: 1.1rem; font-size: 1rem; }
  .prose li { color: #94a3b8; line-height: 1.85; margin-bottom: 0.4rem; margin-left: 1.4rem; list-style: disc; }
  .prose strong { color: #e2e8f0; font-weight: 700; }
  .prose hr { border: none; border-top: 1px solid rgba(255,255,255,.07); margin: 2rem 0; }
  .prose table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
  .prose th { background: rgba(14,165,233,.1); color: #7dd3fc; font-size: 12px; font-weight: 700; padding: 10px 14px; text-align: left; border-bottom: 1px solid rgba(14,165,233,.2); }
  .prose td { color: #94a3b8; font-size: 14px; padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,.05); }
  .prose tr:last-child td { border-bottom: none; }
`;

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let tableBuffer: string[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} style={{ marginBottom: "1rem" }}>
          {listBuffer.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  const flushTable = () => {
    if (tableBuffer.length > 0) {
      const rows = tableBuffer.filter(r => !r.match(/^\|[-| ]+\|$/));
      const headers = rows[0]?.split("|").filter(Boolean).map(h => h.trim());
      const bodyRows = rows.slice(1);
      elements.push(
        <table key={`table-${elements.length}`}>
          <thead>
            <tr>{headers?.map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {bodyRows.map((row, ri) => (
              <tr key={ri}>
                {row.split("|").filter(Boolean).map((cell, ci) => (
                  <td key={ci}>{cell.trim()}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
      tableBuffer = [];
    }
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("|")) {
      flushList();
      tableBuffer.push(trimmed);
      return;
    } else {
      flushTable();
    }

    if (trimmed.startsWith("- ")) {
      const html = trimmed.slice(2).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
      listBuffer.push(html);
      return;
    } else {
      flushList();
    }

    if (!trimmed) return;

    if (trimmed === "---") {
      elements.push(<hr key={i} />);
    } else if (trimmed.startsWith("## ")) {
      elements.push(<h2 key={i}>{trimmed.slice(3)}</h2>);
    } else if (trimmed.startsWith("### ")) {
      elements.push(<h2 key={i} style={{ fontSize: "1.2rem" }}>{trimmed.slice(4)}</h2>);
    } else {
      const html = trimmed
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>");
      elements.push(<p key={i} dangerouslySetInnerHTML={{ __html: html }} />);
    }
  });

  flushList();
  flushTable();
  return elements;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <main style={{ minHeight: "100vh", background: "#060f1e", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", color: "#f1f5f9", marginBottom: "16px" }}>Post not found</h1>
          <Link href="/blog" style={{ color: "#38bdf8", textDecoration: "none", fontWeight: 600 }}>← Back to Blog</Link>
        </div>
      </main>
    );
  }

  const related = blogPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <style>{fontStyle}</style>
      <div className="progress-bar" id="progress-bar" />

      <main style={{ minHeight: "100vh", background: "#060f1e", color: "#f1f5f9", paddingTop: "80px" }}>

        {/* HERO */}
        <section style={{ background: "linear-gradient(160deg,#060f1e 0%,#0c1f3a 100%)", padding: "60px 20px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-80px", right: "5%", width: "500px", height: "500px", background: "radial-gradient(circle,rgba(14,165,233,.07) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: "820px", margin: "0 auto", position: "relative" }}>

            <Link href="/blog" className="back-btn fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "7px", color: "#475569", fontSize: "13px", fontWeight: 600, textDecoration: "none", marginBottom: "28px", transition: "all .2s" }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back to Blog
            </Link>

            <div className="fade-up" style={{ animationDelay: ".1s", marginBottom: "18px" }}>
              <span style={{ padding: "5px 14px", borderRadius: "100px", fontSize: "10px", fontWeight: 800, background: `${post.tagColor}22`, color: post.tagColor, border: `1px solid ${post.tagColor}44`, letterSpacing: ".08em", textTransform: "uppercase" }}>
                {post.tag}
              </span>
            </div>

            <h1 className="fd fade-up" style={{ animationDelay: ".15s", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.15, marginBottom: "18px" }}>
              {post.title}
            </h1>

            <p className="fade-up" style={{ animationDelay: ".2s", fontSize: "1.1rem", color: "#64748b", lineHeight: 1.75, marginBottom: "32px", maxWidth: "680px" }}>
              {post.excerpt}
            </p>

            <div className="fade-up" style={{ animationDelay: ".25s", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", paddingBottom: "36px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: `linear-gradient(135deg,${post.tagColor},#8b5cf6)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: 800, color: "#fff" }}>
                  {post.author[0]}
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#e2e8f0", margin: 0 }}>{post.author}</p>
                  <p style={{ fontSize: "11px", color: "#475569", margin: 0 }}>{post.authorRole}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "16px", color: "#334155", fontSize: "12px", fontWeight: 600 }}>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* COVER IMAGE */}
        <div style={{ maxWidth: "820px", margin: "0 auto", padding: "0 20px" }}>
          <div className="fade-up" style={{ animationDelay: ".3s", borderRadius: "20px", overflow: "hidden", height: "400px", margin: "40px 0" }}>
            <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        {/* ARTICLE BODY */}
        <article style={{ maxWidth: "820px", margin: "0 auto", padding: "0 20px 80px" }}>
          <div className="prose fade-up" style={{ animationDelay: ".35s", background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", borderRadius: "24px", padding: "48px 44px" }}>
            {renderContent(post.content)}
          </div>

          {/* SHARE ROW */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginTop: "36px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#334155", marginRight: "4px" }}>Share:</span>
            {[
              { label: "Twitter / X", action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`) },
              { label: "LinkedIn", action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`) },
              { label: "Copy link", action: () => { navigator.clipboard.writeText(window.location.href); alert("Link copied!"); } },
            ].map(btn => (
              <button key={btn.label} className="share-btn" onClick={btn.action}
                style={{ padding: "8px 18px", borderRadius: "100px", fontSize: "12px", fontWeight: 600, background: "rgba(255,255,255,.05)", color: "#64748b", border: "1px solid rgba(255,255,255,.1)", cursor: "pointer", fontFamily: "inherit", transition: "all .2s" }}>
                {btn.label}
              </button>
            ))}
          </div>
        </article>

        {/* RELATED POSTS */}
        <section style={{ maxWidth: "820px", margin: "0 auto", padding: "0 20px 80px" }}>
          <h2 className="fd" style={{ fontSize: "1.6rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "24px" }}>Continue reading</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "16px" }}>
            {related.map(r => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="related-card"
                style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,.07)", background: "rgba(255,255,255,.03)", textDecoration: "none", display: "block", transition: "all .3s ease" }}>
                <div style={{ height: "160px", overflow: "hidden" }}>
                  <img src={r.image} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.6)" }} />
                </div>
                <div style={{ padding: "18px 20px" }}>
                  <span style={{ fontSize: "9px", fontWeight: 800, color: r.tagColor, textTransform: "uppercase", letterSpacing: ".08em" }}>{r.tag}</span>
                  <h3 className="fd" style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f1f5f9", margin: "8px 0 6px", lineHeight: 1.35 }}>{r.title}</h3>
                  <span style={{ fontSize: "11px", color: "#334155", fontWeight: 500 }}>{r.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section style={{ background: "linear-gradient(135deg,#071428 0%,#0e2240 100%)", borderTop: "1px solid rgba(255,255,255,.04)", padding: "72px 20px", textAlign: "center" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>Put it into practice</p>
          <h2 className="fd" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2, marginBottom: "14px" }}>
            Ready to try a real question?
          </h2>
          <p style={{ fontSize: "15px", color: "#64748b", marginBottom: "32px", lineHeight: 1.8 }}>
            Apply what you just learned with a free NCLEX practice exam — no credit card needed.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/quiz" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "14px 32px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 28px rgba(14,165,233,.3)" }}>
              Start practice exam →
            </Link>
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.07)", color: "#e2e8f0", padding: "14px 28px", borderRadius: "12px", fontSize: "14px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,.12)" }}>
              ← More articles
            </Link>
          </div>
        </section>

      </main>

      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll', function() {
          var el = document.getElementById('progress-bar');
          if (!el) return;
          var pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
          el.style.width = Math.min(pct, 100) + '%';
        });
      `}} />
    </>
  );
}