"use client";
import Link from "next/link";
import { useState } from "react";

const domains = [
  { name: "Health Promotion & Disease Prevention", pct: 19, sub: ["Preventive care guidelines","Immunisation schedules","Screening recommendations","Healthy lifestyle counselling","Chronic disease risk reduction"] },
  { name: "Assessment", pct: 20, sub: ["Complete health history","Physical examination","Diagnostic reasoning","Functional status","Comprehensive geriatric assessment"] },
  { name: "Diagnosis", pct: 17, sub: ["Differential diagnosis","Diagnostic testing","Evidence-based criteria","ICD coding fundamentals","Clinical decision-making"] },
  { name: "Clinical Management", pct: 24, sub: ["Pharmacotherapy principles","Treatment protocols","Chronic disease management","Acute care management","Co-morbidity management"] },
  { name: "Professionalism", pct: 10, sub: ["Scope of practice","Collaboration & referral","Patient education","Healthcare systems","Quality improvement"] },
  { name: "Research & Evidence", pct: 10, sub: ["Critically appraising evidence","Applying EBP to practice","Clinical guidelines","Research methodology","Outcome measurement"] },
];

export default function FNPPage() {
  const [active, setActive] = useState(-1);

  return (
    <main style={{ background: "#060f1e", color: "#e2e8f0", fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh" }}>
      <section style={{ background: "linear-gradient(135deg, #060f1e 0%, #0d1f35 50%, #0e2540 100%)", padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: 999, padding: "6px 16px", marginBottom: 20 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
          <span style={{ color: "#38bdf8", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em" }}>AANPCP &amp; ANCC ALIGNED</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 16px" }}>Family Nurse Practitioner (FNP) Prep</h1>
        <p style={{ color: "#94a3b8", fontSize: "clamp(1rem, 2vw, 1.15rem)", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Prepare for both the AANPCP FNP-BC and ANCC FNP-BC certification exams with comprehensive content, clinical reasoning practice, and expert-led review sessions.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/pricing" style={{ background: "#0ea5e9", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Start Free</Link>
          <Link href="/quiz" style={{ background: "transparent", color: "#38bdf8", padding: "14px 28px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1px solid rgba(56,189,248,0.3)" }}>Practice Questions</Link>
        </div>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
          {[["1,500+","Practice Questions"],["AANPCP","& ANCC Aligned"],["Case-Based","Scenarios"],["Expert","Instructors"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ color: "#38bdf8", fontSize: "1.6rem", fontWeight: 800, fontFamily: "'Cormorant Garamond', serif" }}>{n}</div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>Two Exams. One Preparation.</h2>
        <p style={{ color: "#94a3b8", lineHeight: 1.8, maxWidth: 700, marginBottom: 32 }}>
          The FNP certification is offered by two bodies — the AANPCP (American Academy of Nurse Practitioners Certification Program) and the ANCC (American Nurses Credentialing Center). Our content covers both blueprints so you can choose the pathway that suits you.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
          {[
            { name: "AANPCP FNP-BC", items: ["175 questions (150 scored)","3 hours","Eligibility: MSN/DNP + 500 clinical hours","Validity: 5 years, 100 CE hours to renew"] },
            { name: "ANCC FNP-BC", items: ["150 questions","3.5 hours","Eligibility: MSN/DNP + 500 clinical hours","Validity: 5 years, 75 CE hours to renew"] },
          ].map(card => (
            <div key={card.name} style={{ background: "#0d1f35", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 12, padding: "24px" }}>
              <h3 style={{ color: "#38bdf8", fontWeight: 700, marginBottom: 12 }}>{card.name}</h3>
              <ul style={{ paddingLeft: 18, margin: 0 }}>{card.items.map(i => <li key={i} style={{ color: "#94a3b8", fontSize: 13, marginBottom: 6 }}>{i}</li>)}</ul>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>Competency Domains</h2>
        <p style={{ color: "#64748b", marginBottom: 24 }}>Click any domain to see key topics covered.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
          {domains.map((d, i) => (
            <div key={d.name} onClick={() => setActive(active === i ? -1 : i)}
              style={{ background: "#0d1f35", border: `1px solid ${active === i ? "#0ea5e9" : "rgba(14,165,233,0.12)"}`, borderRadius: 10, padding: "18px 20px", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13, flex: 1, paddingRight: 12 }}>{d.name}</span>
                <span style={{ background: "rgba(14,165,233,0.15)", color: "#38bdf8", borderRadius: 999, padding: "2px 10px", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{d.pct}%</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, margin: "10px 0" }}>
                <div style={{ height: "100%", width: `${d.pct * 4}%`, background: "#0ea5e9", borderRadius: 2 }} />
              </div>
              {active === i && <ul style={{ paddingLeft: 18, margin: 0 }}>{d.sub.map(s => <li key={s} style={{ color: "#94a3b8", fontSize: 13, marginBottom: 4 }}>{s}</li>)}</ul>}
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 80px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#f1f5f9", marginBottom: 20 }}>Explore Other Courses</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[["Pre-Nursing","/courses/pre-nursing"],["Nursing School","/courses/nursing-school"],["NCLEX-RN","/courses/nclex-rn"],["NCLEX-PN","/courses/nclex-pn"],["CCRN","/courses/ccrn"]].map(([name, href]) => (
            <Link key={name} href={href} style={{ background: "#0d1f35", color: "#94a3b8", border: "1px solid rgba(14,165,233,0.12)", borderRadius: 8, padding: "10px 18px", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>{name}</Link>
          ))}
        </div>
      </section>
    </main>
  );
}