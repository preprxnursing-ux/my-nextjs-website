"use client";
import Link from "next/link";
import { useState } from "react";

const domains = [
  { name: "Cardiovascular", pct: 17, sub: ["Acute coronary syndromes","Heart failure management","Dysrhythmia recognition","Haemodynamic monitoring","Cardiovascular surgical care"] },
  { name: "Pulmonary", pct: 15, sub: ["Mechanical ventilation","ARDS management","Respiratory failure","Chest drainage","Arterial blood gas interpretation"] },
  { name: "Endocrine / Haematology / GI / Renal / Integumentary", pct: 20, sub: ["DKA & HHS","AKI & CKD management","Liver failure","Coagulopathies","Burns & wound care"] },
  { name: "Musculoskeletal / Neurological / Psychosocial", pct: 14, sub: ["Traumatic brain injury","Status epilepticus","ICU-acquired weakness","Delirium management","Family-centred care"] },
  { name: "Multisystem", pct: 19, sub: ["Sepsis & septic shock","MODS","Trauma resuscitation","Toxicology","End-of-life care"] },
  { name: "Professional Caring & Ethics", pct: 15, sub: ["Advocacy & moral distress","Clinical inquiry","Systems thinking","Response to diversity","Collaboration"] },
];

export default function CCRNPage() {
  const [active, setActive] = useState(-1);

  return (
    <main style={{ background: "#060f1e", color: "#e2e8f0", fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh" }}>
      <section style={{ background: "linear-gradient(135deg, #060f1e 0%, #0d1f35 50%, #0e2540 100%)", padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: 999, padding: "6px 16px", marginBottom: 20 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
          <span style={{ color: "#38bdf8", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em" }}>AACN ACCREDITED · CE CREDITS</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 16px" }}>CCRN® Critical Care Certification Prep</h1>
        <p style={{ color: "#94a3b8", fontSize: "clamp(1rem, 2vw, 1.15rem)", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.7 }}>
          The definitive preparation for AACN's CCRN certification. Master the synergy model, critical care pharmacology, and complex multi-system patient management — and earn CE contact hours as you study.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/pricing" style={{ background: "#0ea5e9", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Start Free</Link>
          <Link href="/quiz" style={{ background: "transparent", color: "#38bdf8", padding: "14px 28px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1px solid rgba(56,189,248,0.3)" }}>Try Practice Questions</Link>
        </div>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
          {[["1,000+","Practice Questions"],["13+ hrs","Video Library"],["13.75","CE Contact Hours"],["AACN","Synergy Model"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ color: "#38bdf8", fontSize: "1.6rem", fontWeight: 800, fontFamily: "'Cormorant Garamond', serif" }}>{n}</div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>About the CCRN® Exam</h2>
        <p style={{ color: "#94a3b8", lineHeight: 1.8, maxWidth: 700, marginBottom: 32 }}>
          The CCRN (Critical Care Registered Nurse) certification by AACN validates expertise in the care of acutely and critically ill patients. It is one of the most respected specialty certifications in nursing. Eligibility requires 1,750 hours of direct care of acutely or critically ill patients within the last 2 years, with 875 of those hours in the most recent year preceding application.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 48 }}>
          {[["Questions","150 (125 scored + 25 unscored)"],["Time","3 hours"],["Eligibility","1,750 direct care hours"],["Renewal","Every 3 years (100 pts)"]].map(([k,v]) => (
            <div key={k} style={{ background: "#0d1f35", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 10, padding: "18px 20px" }}>
              <div style={{ color: "#475569", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{k}</div>
              <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* CE Credits callout */}
        <div style={{ background: "linear-gradient(135deg, #0d1f35, #0e2540)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 14, padding: "32px", marginBottom: 48 }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#f1f5f9", marginBottom: 10 }}>Earn CE Credits While You Study</h3>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
            Our CCRN video library is AACN-accredited, meaning you earn 13.75 contact hours just by watching — certificates issued instantly upon completion and accepted in all states.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {["13.75 CE contact hours","AACN-accredited content","Instant certificate download","Accepted in all US states"].map(f => (
              <span key={f} style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)", color: "#94a3b8", borderRadius: 8, padding: "6px 14px", fontSize: 12 }}>✓ {f}</span>
            ))}
          </div>
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>Exam Content Areas</h2>
        <p style={{ color: "#64748b", marginBottom: 24 }}>Click any area to explore subtopics.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
          {domains.map((d, i) => (
            <div key={d.name} onClick={() => setActive(active === i ? -1 : i)}
              style={{ background: "#0d1f35", border: `1px solid ${active === i ? "#0ea5e9" : "rgba(14,165,233,0.12)"}`, borderRadius: 10, padding: "18px 20px", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13, flex: 1, paddingRight: 10 }}>{d.name}</span>
                <span style={{ background: "rgba(14,165,233,0.15)", color: "#38bdf8", borderRadius: 999, padding: "2px 10px", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{d.pct}%</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, margin: "10px 0" }}>
                <div style={{ height: "100%", width: `${d.pct * 5}%`, background: "#0ea5e9", borderRadius: 2 }} />
              </div>
              {active === i && <ul style={{ paddingLeft: 18, margin: 0 }}>{d.sub.map(s => <li key={s} style={{ color: "#94a3b8", fontSize: 13, marginBottom: 4 }}>{s}</li>)}</ul>}
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 80px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#f1f5f9", marginBottom: 20 }}>Explore Other Courses</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[["Pre-Nursing","/courses/pre-nursing"],["Nursing School","/courses/nursing-school"],["NCLEX-RN","/courses/nclex-rn"],["NCLEX-PN","/courses/nclex-pn"],["Nurse Practitioner (FNP)","/courses/fnp"]].map(([name, href]) => (
            <Link key={name} href={href} style={{ background: "#0d1f35", color: "#94a3b8", border: "1px solid rgba(14,165,233,0.12)", borderRadius: 8, padding: "10px 18px", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>{name}</Link>
          ))}
        </div>
      </section>
    </main>
  );
}