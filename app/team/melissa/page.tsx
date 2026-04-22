"use client";
import Link from "next/link";
import Image from "next/image";

export default function MelissaProfile() {
  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg,#060f1e 0%,#0d1f35 50%,#0e2540 100%)", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#e2e8f0" }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp .6s ease both; }
        .card { background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); border-radius: 20px; transition: border-color .2s; }
        .card:hover { border-color: rgba(14,165,233,.25); }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px" }}>

        {/* Back */}
        <Link href="/" className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#64748b", textDecoration: "none", fontSize: "13px", fontWeight: 600, marginBottom: "40px" }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to Pre-NCLEX Nursing
        </Link>

        {/* Hero */}
        <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "48px", alignItems: "start", marginBottom: "40px" }}>
          <div>
            <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", aspectRatio: "4/5", border: "1px solid rgba(14,165,233,.2)", boxShadow: "0 32px 80px rgba(0,0,0,.4)" }}>
              <Image src="/melissa2.jpg" alt="Melissa Ainsley" fill style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,15,30,.6) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(14,165,233,.15)", border: "1px solid rgba(14,165,233,.3)", borderRadius: "100px", padding: "5px 14px", fontSize: "11px", fontWeight: 700, color: "#38bdf8" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                  Online now
                </span>
              </div>
            </div>

            {/* Contact card */}
            <div className="card" style={{ padding: "24px", marginTop: "20px" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: "16px" }}>Get in touch</p>
              <button onClick={() => window.open('https://mail.google.com/mail/?view=cm&to=preprxnursing@gmail.com', '_blank')}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: "13px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", borderRadius: "12px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer", fontFamily: "inherit", marginBottom: "10px", boxShadow: "0 8px 24px rgba(14,165,233,.3)" }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Email Melissa Ainsley
              </button>
              <Link href="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: "13px", background: "rgba(255,255,255,.05)", color: "#94a3b8", borderRadius: "12px", fontWeight: 600, fontSize: "14px", textDecoration: "none", border: "1px solid rgba(255,255,255,.1)" }}>
                Contact form
              </Link>
            </div>
          </div>

          <div style={{ paddingTop: "8px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#0ea5e9", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>Student Success Lead . BSN, RN</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.1, marginBottom: "20px" }}>
              Melissa Ainsley
            </h1>
            <p style={{ fontSize: "16px", color: "#94a3b8", lineHeight: 1.85, marginBottom: "28px" }}>
              Melissa is the heartbeat of the Pre-NCLEX Nursing student experience. Having walked the path of nursing education herself, she understands the pressure, the sleepless nights, and the quiet terror of sitting down to an NCLEX exam. That lived experience is exactly what she brings to every student interaction.
            </p>
            <p style={{ fontSize: "16px", color: "#94a3b8", lineHeight: 1.85, marginBottom: "36px" }}>
              As Student Success Lead, Melissa oversees everything that touches the learner journey -- from onboarding and platform support to course guidance and account help. She believes that behind every exam attempt is a real person with a real dream, and she treats every question and concern with that same care.
            </p>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "36px" }}>
              {[
                { val: "4hrs", label: "Avg response time" },
                { val: "98%", label: "Student satisfaction" },
                { val: "3yrs", label: "In nursing education" },
              ].map(s => (
                <div key={s.label} className="card" style={{ padding: "20px", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#0ea5e9", marginBottom: "4px" }}>{s.val}</p>
                  <p style={{ fontSize: "11px", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em" }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div style={{ padding: "24px 28px", background: "rgba(14,165,233,.06)", border: "1px solid rgba(14,165,233,.15)", borderRadius: "16px" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontStyle: "italic", color: "#e2e8f0", lineHeight: 1.7, margin: 0 }}>
                "Every student who reaches out to me deserves to feel heard. Passing NCLEX is hard enough -- navigating the platform should never be the hard part."
              </p>
              <p style={{ fontSize: "12px", color: "#0ea5e9", fontWeight: 700, marginTop: "14px", margin: "14px 0 0" }}>-- Melissa Ainsley Carter, BSN, RN, Student Success Lead</p>
            </div>
          </div>
        </div>

        {/* Expertise */}
        <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "40px" }}>
          {[
            { title: "Student Support", desc: "From first login to exam day, Melissa is available to guide students through every step of the platform.", color: "#0ea5e9" },
            { title: "Course Guidance", desc: "Helping students choose the right certification path and study approach based on their background and goals.", color: "#8b5cf6" },
            { title: "Account & Billing", desc: "Plan upgrades, access issues, and account questions handled with care and fast turnaround.", color: "#10b981" },
          ].map(e => (
            <div key={e.title} className="card" style={{ padding: "28px" }}>
              <div style={{ width: "40px", height: "4px", background: e.color, borderRadius: "2px", marginBottom: "16px" }} />
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 700, color: "#f8fafc", marginBottom: "10px" }}>{e.title}</h3>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7 }}>{e.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="fade-up card" style={{ padding: "40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#f8fafc", marginBottom: "12px" }}>Ready to start your NCLEX journey?</h2>
          <p style={{ fontSize: "15px", color: "#64748b", marginBottom: "24px" }}>Melissa and the team are here to support you every step of the way.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", color: "#fff", padding: "13px 32px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none", boxShadow: "0 8px 24px rgba(14,165,233,.3)" }}>
              Get started free
            </Link>
            <Link href="/team/james" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,.06)", color: "#94a3b8", padding: "13px 24px", borderRadius: "12px", fontWeight: 600, fontSize: "14px", textDecoration: "none", border: "1px solid rgba(255,255,255,.1)" }}>
              Meet Dr. James Whitfield, our founder
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
