"use client";
import Link from "next/link";
import Image from "next/image";
export default function JamesProfile() {
  const badges = [
    { label: "RN", desc: "Registered Nurse", color: "#8b5cf6" },
    { label: "MSN", desc: "Master of Science in Nursing", color: "#0ea5e9" },
    { label: "CCRN", desc: "Critical Care RN", color: "#ef4444" },
    { label: "PhD(c)", desc: "Doctoral Candidate", color: "#10b981" },
    { label: "NPD-BC", desc: "Nursing Prof. Development", color: "#f59e0b" },
  ];
  const stats = [
    { val: "3,100+", label: "Questions authored" },
    { val: "98%", label: "Student pass rate" },
    { val: "6", label: "Certifications covered" },
  ];
  const expertise = [
    { title: "Curriculum Design", desc: "Every question is mapped to the official NCLEX test plan and written to develop clinical reasoning, not rote memorisation.", color: "#8b5cf6" },
    { title: "Clinical Rationales", desc: "James writes rationales that explain the why behind every answer -- the kind of deep reasoning that sticks on exam day.", color: "#0ea5e9" },
    { title: "Platform Strategy", desc: "From adaptive CAT simulation to NGN question formats, James leads the vision for where the platform is heading next.", color: "#10b981" },
  ];
  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg,#060f1e 0%,#0d1f35 50%,#0e2540 100%)", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#e2e8f0" }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp .6s ease both; }
        .card { background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); border-radius: 20px; transition: border-color .2s; }
        .card:hover { border-color: rgba(139,92,246,.25); }
      `}</style>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px" }}>
        <Link href="/" className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#64748b", textDecoration: "none", fontSize: "13px", fontWeight: 600, marginBottom: "40px" }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to Pre-NCLEX Nursing
        </Link>
        <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "48px", alignItems: "start", marginBottom: "40px" }}>
          <div>
            <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", aspectRatio: "4/5", border: "1px solid rgba(139,92,246,.2)", boxShadow: "0 32px 80px rgba(0,0,0,.4)" }}>
              <Image src="/james2.jpg" alt="Dr. James Whitfield" fill style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,15,30,.6) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(139,92,246,.15)", border: "1px solid rgba(139,92,246,.3)", borderRadius: "100px", padding: "5px 14px", fontSize: "11px", fontWeight: 700, color: "#c084fc" }}>
                  Founder & Educator
                </span>
              </div>
            </div>
            <div className="card" style={{ padding: "24px", marginTop: "20px" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: "16px" }}>Get in touch</p>
              <button onClick={() => window.open('https://mail.google.com/mail/?view=cm&to=prenclexreview@gmail.com', '_blank')}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: "13px", background: "linear-gradient(135deg,#8b5cf6,#c084fc)", color: "#fff", borderRadius: "12px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer", fontFamily: "inherit", marginBottom: "10px", boxShadow: "0 8px 24px rgba(139,92,246,.3)" }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Email Dr. Whitfield
              </button>
              <Link href="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: "13px", background: "rgba(255,255,255,.05)", color: "#94a3b8", borderRadius: "12px", fontWeight: 600, fontSize: "14px", textDecoration: "none", border: "1px solid rgba(255,255,255,.1)" }}>
                Contact form
              </Link>
            </div>
          </div>
          <div style={{ paddingTop: "8px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#8b5cf6", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>Founder & Educator</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.1, marginBottom: "20px" }}>
              Dr. James Whitfield, RN, MSN, CCRN
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "28px" }}>
              {badges.map(b => (
                <div key={b.label} title={b.desc} style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "100px", padding: "5px 14px", cursor: "default" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#c084fc", letterSpacing: ".08em" }}>{b.label}</span>
                  <span style={{ fontSize: "10px", color: "#64748b", fontWeight: 500 }}>{b.desc}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "16px", color: "#94a3b8", lineHeight: 1.85, marginBottom: "28px" }}>
              Dr. James Whitfield, RN, MSN, CCRN is a licensed Registered Nurse and the founder of Pre-NCLEX Nursing. He built this platform after watching too many brilliant nursing students fail their licensure exams -- not because they lacked knowledge, but because the tools available to them were outdated, uninspiring, and disconnected from how nurses actually think.
            </p>
            <p style={{ fontSize: "16px", color: "#94a3b8", lineHeight: 1.85, marginBottom: "36px" }}>
              With years of clinical experience and a deep passion for nursing education, James leads the content and curriculum strategy at Pre-NCLEX Nursing. Every question, every rationale, and every exam mode on the platform has been shaped by his vision: to build the prep tool he wished had existed when he was sitting that exam himself.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "36px" }}>
              {stats.map(s => (
                <div key={s.label} className="card" style={{ padding: "20px", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#8b5cf6", marginBottom: "4px" }}>{s.val}</p>
                  <p style={{ fontSize: "11px", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em" }}>{s.label}</p>
                </div>
              ))}
            </div>
            <div style={{ padding: "24px 28px", background: "rgba(139,92,246,.06)", border: "1px solid rgba(139,92,246,.15)", borderRadius: "16px" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontStyle: "italic", color: "#e2e8f0", lineHeight: 1.7, margin: 0 }}>
                "I built Pre-NCLEX Nursing because I believe every nurse deserves a fair shot at passing first time. The exam is hard. The preparation does not have to be."
              </p>
              <p style={{ fontSize: "12px", color: "#8b5cf6", fontWeight: 700, marginTop: "14px" }}>-- Dr. James Whitfield, RN, MSN, CCRN, Founder & Educator</p>
            </div>
          </div>
        </div>
        <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "40px" }}>
          {expertise.map(e => (
            <div key={e.title} className="card" style={{ padding: "28px" }}>
              <div style={{ width: "40px", height: "4px", background: e.color, borderRadius: "2px", marginBottom: "16px" }} />
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 700, color: "#f8fafc", marginBottom: "10px" }}>{e.title}</h3>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7 }}>{e.desc}</p>
            </div>
          ))}
        </div>
        <div className="fade-up card" style={{ padding: "40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px" }}>Built by a nurse. For nurses.</h2>
          <p style={{ fontSize: "15px", color: "#64748b", marginBottom: "24px" }}>Start with NCLEX-RN today -- free, no credit card, built by James himself.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#8b5cf6,#c084fc)", color: "#fff", padding: "13px 32px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none", boxShadow: "0 8px 24px rgba(139,92,246,.3)" }}>
              Get started free
            </Link>
            <Link href="/team/melissa" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.06)", color: "#94a3b8", padding: "13px 24px", borderRadius: "12px", fontWeight: 600, fontSize: "14px", textDecoration: "none", border: "1px solid rgba(255,255,255,.1)" }}>
              Meet Melissa Ainsley, Student Success Lead
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}