"use client";
import Link from "next/link";
import { useState } from "react";

const subjects = [
  { name: "Fundamentals of Nursing", icon: "🏥", sub: ["Nursing process (ADPIE)","Vital signs assessment","Patient hygiene & comfort","Documentation","Safety & environment"] },
  { name: "Medical-Surgical Nursing", icon: "💊", sub: ["Cardiovascular disorders","Respiratory conditions","GI & renal disorders","Neurological nursing","Oncology care"] },
  { name: "Pharmacology", icon: "⚗️", sub: ["Drug classifications","Mechanisms of action","Safe administration","Calculation practice","High-alert medications"] },
  { name: "Mental Health Nursing", icon: "🧠", sub: ["Therapeutic communication","Mood & anxiety disorders","Psychosis management","Substance use","Crisis intervention"] },
  { name: "Maternal-Newborn Nursing", icon: "👶", sub: ["Antepartum care","Labour & delivery","Postpartum nursing","Newborn assessment","High-risk pregnancy"] },
  { name: "Paediatric Nursing", icon: "🌱", sub: ["Growth & development","Immunisation schedules","Paediatric assessment","Common childhood illnesses","Family-centred care"] },
  { name: "Community Health", icon: "🌍", sub: ["Epidemiology","Home health nursing","Public health practice","Cultural competence","Health promotion"] },
  { name: "Leadership & Management", icon: "📋", sub: ["Delegation principles","Conflict resolution","Quality improvement","Evidence-based practice","Staffing & scheduling"] },
];

export default function NursingSchoolPage() {
  const [active, setActive] = useState(-1);

  return (
    <main style={{ background: "#060f1e", color: "#e2e8f0", fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh" }}>
      <section style={{ background: "linear-gradient(135deg, #060f1e 0%, #0d1f35 50%, #0e2540 100%)", padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: 999, padding: "6px 16px", marginBottom: 20 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
          <span style={{ color: "#38bdf8", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em" }}>ALL SEMESTERS COVERED</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 16px" }}>Nursing School Prep</h1>
        <p style={{ color: "#94a3b8", fontSize: "clamp(1rem, 2vw, 1.15rem)", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.7 }}>
          From Fundamentals to Senior Practicum — master every subject, ace every exam, and build the clinical reasoning skills that will carry you through your entire nursing career.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/pricing" style={{ background: "#0ea5e9", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Start Free</Link>
          <Link href="/quiz" style={{ background: "transparent", color: "#38bdf8", padding: "14px 28px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1px solid rgba(56,189,248,0.3)" }}>Practice Questions</Link>
        </div>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
          {[["8","Core Subjects"],["2,000+","Practice Questions"],["NCLEX-Aligned","Content"],["All Semesters","Covered"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ color: "#38bdf8", fontSize: "1.6rem", fontWeight: 800, fontFamily: "'Cormorant Garamond', serif" }}>{n}</div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>Why study with Pre-NCLEX Nursing?</h2>
        <p style={{ color: "#94a3b8", lineHeight: 1.8, maxWidth: 700, marginBottom: 40 }}>
          Nursing school exams don't just test facts — they test clinical judgement. Our content is aligned to the NCLEX Client Needs Framework from day one, so every question you practise in school also prepares you for your licensing exam. You'll study smarter, not longer.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 48 }}>
          {[["NCLEX-Aligned","Every question maps to NCLEX Client Needs categories"],["Rationale-Rich","Detailed explanations teach the why, not just the what"],["Progress Tracking","See exactly which subjects need more attention"],["Study Plans","Week-by-week schedules built around your exam dates"]].map(([title, desc]) => (
            <div key={title} style={{ background: "#0d1f35", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 12, padding: "20px" }}>
              <div style={{ color: "#38bdf8", fontWeight: 700, marginBottom: 8, fontSize: 14 }}>{title}</div>
              <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>Core Subject Areas</h2>
        <p style={{ color: "#64748b", marginBottom: 24 }}>Click any subject to see what&apos;s covered.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          {subjects.map((s, i) => (
            <div key={s.name} onClick={() => setActive(active === i ? -1 : i)}
              style={{ background: "#0d1f35", border: `1px solid ${active === i ? "#0ea5e9" : "rgba(14,165,233,0.12)"}`, borderRadius: 10, padding: "18px 20px", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: active === i ? 12 : 0 }}>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14 }}>{s.name}</span>
              </div>
              {active === i && <ul style={{ paddingLeft: 18, margin: 0 }}>{s.sub.map(x => <li key={x} style={{ color: "#94a3b8", fontSize: 13, marginBottom: 4 }}>{x}</li>)}</ul>}
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 80px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#f1f5f9", marginBottom: 20 }}>Your Full Learning Path</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[["Pre-Nursing","/courses/pre-nursing"],["NCLEX-RN","/courses/nclex-rn"],["NCLEX-PN","/courses/nclex-pn"],["Nurse Practitioner","/courses/fnp"],["CCRN","/courses/ccrn"]].map(([name, href]) => (
            <Link key={name} href={href} style={{ background: "#0d1f35", color: "#94a3b8", border: "1px solid rgba(14,165,233,0.12)", borderRadius: 8, padding: "10px 18px", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>{name}</Link>
          ))}
        </div>
      </section>
    </main>
  );
}