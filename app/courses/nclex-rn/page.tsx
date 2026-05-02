"use client";
import Link from "next/link";
import { useState } from "react";

const topics = [
  { name: "Management of Care", pct: 17, sub: ["Prioritization & delegation","Ethical practice","Advance directives","Informed consent","Legal rights"] },
  { name: "Safety & Infection Control", pct: 9, sub: ["Standard precautions","Error prevention","Safe medication admin","Restraints & safety","Hazardous materials"] },
  { name: "Health Promotion", pct: 9, sub: ["Developmental stages","Immunizations","Lifestyle choices","Screening programs","Risk factor reduction"] },
  { name: "Psychosocial Integrity", pct: 9, sub: ["Coping mechanisms","Crisis intervention","Mental health concepts","Abuse & neglect","Cultural sensitivity"] },
  { name: "Basic Care & Comfort", pct: 9, sub: ["Personal hygiene","Non-pharmacological pain","Rest & sleep","Nutrition & hydration","Elimination patterns"] },
  { name: "Pharmacological Therapies", pct: 15, sub: ["Drug classifications","Expected effects","Adverse reactions","Calculation & dosage","High-alert medications"] },
  { name: "Reduction of Risk", pct: 12, sub: ["Diagnostic tests","Lab values","Vital sign monitoring","Pre/post-op care","Therapeutic procedures"] },
  { name: "Physiological Adaptation", pct: 15, sub: ["Fluid & electrolytes","Hemodynamics","Unexpected responses","Medical emergencies","Pathophysiology"] },
];

const plans = [
  { name: "Q-Bank", price: 29, per: "month", badge: "", features: ["3,100+ practice questions","Custom test builder","Detailed rationales","Performance analytics","Topic filtering","Mobile app access"] },
  { name: "Complete Prep", price: 79, per: "month", badge: "Most Popular", features: ["Everything in Q-Bank","110+ hours video library","Unlimited CAT exams","Readiness assessments","NGN item formats","Live webinar access"] },
  { name: "Sure PASS", price: 149, per: "one-time", badge: "Best Value", features: ["Everything in Complete","3-day 23-hour live review","Pass guarantee","Dedicated support","Study schedule","Pharmacology crash course"] },
];

export default function NCLEXRNPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main style={{ background: "#060f1e", color: "#e2e8f0", fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #060f1e 0%, #0d1f35 50%, #0e2540 100%)", padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: 999, padding: "6px 16px", marginBottom: 20 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
          <span style={{ color: "#38bdf8", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em" }}>2026 NGN UPDATED</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 16px" }}>
          NCLEX-RN® Exam Prep
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "clamp(1rem, 2vw, 1.15rem)", maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.7 }}>
          The most comprehensive NCLEX-RN preparation platform — built around NGN item formats, adaptive testing, and real clinical reasoning.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/pricing" style={{ background: "#0ea5e9", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Start Preparing — Free</Link>
          <Link href="/quiz" style={{ background: "transparent", color: "#38bdf8", padding: "14px 28px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1px solid rgba(56,189,248,0.3)" }}>Take a Practice Question</Link>
        </div>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
          {[["3,100+","Practice Questions"],["99%","First-Attempt Pass Rate"],["NGN Ready","2026 Updated"],["110+ hrs","Video Library"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ color: "#38bdf8", fontSize: "1.6rem", fontWeight: 800, fontFamily: "'Cormorant Garamond', serif" }}>{n}</div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EXAM OVERVIEW */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>What is the NCLEX-RN®?</h2>
        <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 40, maxWidth: 700 }}>
          The NCLEX-RN is the national licensing examination for registered nurses in the US and Canada. It uses Computer Adaptive Testing (CAT) to assess clinical decision-making across 8 client needs categories. The 2023 NGN update introduced new item types — unfolding case studies, bow-tie questions, extended drag-and-drop, and matrix questions — that require deep clinical reasoning, not memorisation.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {[
            { label: "Question count", value: "85–145 questions (CAT)" },
            { label: "Time limit", value: "Up to 5 hours" },
            { label: "Passing standard", value: "Next Generation NCLEX (NGN)" },
            { label: "Eligibility", value: "BSN or ADN graduate" },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: "#0d1f35", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 10, padding: "18px 20px" }}>
              <div style={{ color: "#475569", fontSize: 12, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
              <div style={{ color: "#e2e8f0", fontWeight: 600 }}>{value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TOPIC BREAKDOWN */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>Client Needs Categories</h2>
        <p style={{ color: "#64748b", marginBottom: 32 }}>Click any category to explore subtopics covered in our Q-Bank.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
          {topics.map((t, i) => (
            <div key={t.name} onClick={() => setActiveTab(activeTab === i ? -1 : i)}
              style={{ background: "#0d1f35", border: `1px solid ${activeTab === i ? "#0ea5e9" : "rgba(14,165,233,0.12)"}`, borderRadius: 10, padding: "18px 20px", cursor: "pointer", transition: "border-color 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: activeTab === i ? 12 : 0 }}>
                <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14 }}>{t.name}</span>
                <span style={{ background: "rgba(14,165,233,0.15)", color: "#38bdf8", borderRadius: 999, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{t.pct}%</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, margin: "10px 0" }}>
                <div style={{ height: "100%", width: `${t.pct * 5}%`, background: "#0ea5e9", borderRadius: 2, transition: "width 0.4s" }} />
              </div>
              {activeTab === i && (
                <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
                  {t.sub.map(s => <li key={s} style={{ color: "#94a3b8", fontSize: 13, marginBottom: 4 }}>{s}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* NGN SECTION */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <div style={{ background: "linear-gradient(135deg, #0d1f35, #0e2540)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 16, padding: "40px 36px" }}>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <span style={{ background: "rgba(14,165,233,0.15)", color: "#38bdf8", borderRadius: 999, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>NGN READY</span>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#f1f5f9", margin: "14px 0 12px" }}>Next Generation NCLEX® Item Types</h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: 14 }}>Our Q-Bank is fully updated for 2026 with all NGN question formats. You won't face surprises on exam day.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, minWidth: 280 }}>
              {["Unfolding Case Studies","Bow-Tie Questions","Extended Drag & Drop","Matrix Multiple Response","Enhanced Hot Spot","Highlight Text"].map(item => (
                <div key={item} style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#cbd5e1" }}>
                  <span style={{ color: "#0ea5e9", marginRight: 6 }}>✓</span>{item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", textAlign: "center", marginBottom: 8 }}>Choose Your Plan</h2>
        <p style={{ color: "#64748b", textAlign: "center", marginBottom: 40 }}>All plans include a free trial. No credit card required.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {plans.map((p) => (
            <div key={p.name} style={{ background: p.badge === "Most Popular" ? "linear-gradient(135deg, #0d2a40, #0e2a3a)" : "#0d1f35", border: `1px solid ${p.badge ? "#0ea5e9" : "rgba(14,165,233,0.12)"}`, borderRadius: 14, padding: "28px 24px", position: "relative" }}>
              {p.badge && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#0ea5e9", color: "#fff", borderRadius: 999, padding: "3px 14px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>{p.badge}</div>}
              <h3 style={{ color: "#f1f5f9", fontWeight: 700, marginBottom: 4 }}>{p.name}</h3>
              <div style={{ marginBottom: 20 }}>
                <span style={{ color: "#38bdf8", fontSize: "2rem", fontWeight: 800 }}>${p.price}</span>
                <span style={{ color: "#475569", fontSize: 13 }}> / {p.per}</span>
              </div>
              <ul style={{ paddingLeft: 0, listStyle: "none", marginBottom: 24 }}>
                {p.features.map(f => <li key={f} style={{ color: "#94a3b8", fontSize: 13, marginBottom: 8, display: "flex", gap: 8 }}><span style={{ color: "#0ea5e9", flexShrink: 0 }}>✓</span>{f}</li>)}
              </ul>
              <Link href="/pricing" style={{ display: "block", textAlign: "center", background: p.badge === "Most Popular" ? "#0ea5e9" : "transparent", color: p.badge === "Most Popular" ? "#fff" : "#38bdf8", border: `1px solid ${p.badge === "Most Popular" ? "#0ea5e9" : "rgba(56,189,248,0.3)"}`, borderRadius: 8, padding: "12px", fontWeight: 700, textDecoration: "none", fontSize: 14 }}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* OTHER COURSES */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 80px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#f1f5f9", marginBottom: 20 }}>Explore Other Courses</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[["Pre-Nursing","/courses/pre-nursing"],["Nursing School","/courses/nursing-school"],["NCLEX-PN","/courses/nclex-pn"],["Nurse Practitioner (FNP)","/courses/fnp"],["CCRN","/courses/ccrn"]].map(([name, href]) => (
            <Link key={name} href={href} style={{ background: "#0d1f35", color: "#94a3b8", border: "1px solid rgba(14,165,233,0.12)", borderRadius: 8, padding: "10px 18px", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>{name}</Link>
          ))}
        </div>
      </section>
    </main>
  );
}