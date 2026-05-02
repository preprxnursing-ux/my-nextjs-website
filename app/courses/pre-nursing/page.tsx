"use client";
import Link from "next/link";
import { useState } from "react";

export default function PreNursingPage() {
  const [activeExam, setActiveExam] = useState<"teas"|"hesi">("teas");

  const teasTopics = [
    { name: "Reading", pct: 31, sub: ["Key ideas & details","Craft & structure","Integration of knowledge","Informational sources"] },
    { name: "Mathematics", pct: 22, sub: ["Numbers & algebra","Measurement & data","Metric conversions","Fractions & percentages"] },
    { name: "Science", pct: 31, sub: ["Human anatomy & physiology","Life & physical science","Scientific reasoning","Biology fundamentals"] },
    { name: "English & Language Usage", pct: 16, sub: ["Conventions of Standard English","Knowledge of language","Vocabulary acquisition"] },
  ];

  const hesiTopics = [
    { name: "Math", pct: 25, sub: ["Basic operations","Fractions & decimals","Dosage calculation","Roman numerals"] },
    { name: "Reading Comprehension", pct: 25, sub: ["Identify main idea","Make inferences","Fact vs opinion","Passage analysis"] },
    { name: "Vocabulary & General Knowledge", pct: 20, sub: ["Medical terminology","Healthcare vocabulary","Context clues"] },
    { name: "Grammar", pct: 15, sub: ["Sentence structure","Punctuation","Parts of speech","Subject-verb agreement"] },
    { name: "Biology", pct: 8, sub: ["Cell biology","Metabolism","Genetics","Biological macromolecules"] },
    { name: "Chemistry", pct: 7, sub: ["Periodic table","Chemical bonding","Acids & bases","Nuclear chemistry"] },
  ];

  const topics = activeExam === "teas" ? teasTopics : hesiTopics;

  return (
    <main style={{ background: "#060f1e", color: "#e2e8f0", fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh" }}>
      <section style={{ background: "linear-gradient(135deg, #060f1e 0%, #0d1f35 50%, #0e2540 100%)", padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: 999, padding: "6px 16px", marginBottom: 20 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
          <span style={{ color: "#38bdf8", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em" }}>TEAS 7 &amp; HESI A2</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 16px" }}>Pre-Nursing Exam Prep</h1>
        <p style={{ color: "#94a3b8", fontSize: "clamp(1rem, 2vw, 1.15rem)", maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Your nursing school journey starts here. Comprehensive TEAS 7 and HESI A2 preparation — practice tests, video walkthroughs, and personalised study plans.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/pricing" style={{ background: "#0ea5e9", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Start Free Today</Link>
          <Link href="/quiz" style={{ background: "transparent", color: "#38bdf8", padding: "14px 28px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1px solid rgba(56,189,248,0.3)" }}>Try a Sample Question</Link>
        </div>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
          {[["1,800+","Practice Questions"],["TEAS 7","& HESI A2"],["Expert","Video Walkthroughs"],["Score","Improvement Guarantee"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ color: "#38bdf8", fontSize: "1.6rem", fontWeight: 800, fontFamily: "'Cormorant Garamond', serif" }}>{n}</div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EXAM SELECTOR */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 0" }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
          {(["teas","hesi"] as const).map(exam => (
            <button key={exam} onClick={() => setActiveExam(exam)}
              style={{ background: activeExam === exam ? "#0ea5e9" : "#0d1f35", color: activeExam === exam ? "#fff" : "#94a3b8", border: `1px solid ${activeExam === exam ? "#0ea5e9" : "rgba(14,165,233,0.2)"}`, borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontWeight: 700, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {exam === "teas" ? "TEAS 7" : "HESI A2"}
            </button>
          ))}
        </div>

        {activeExam === "teas" && (
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>TEAS 7 — Test of Essential Academic Skills</h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, maxWidth: 700, marginBottom: 24 }}>
              The ATI TEAS 7 is the most widely used nursing school entrance exam in the United States. It assesses academic readiness across four content areas — Reading, Mathematics, Science, and English & Language Usage. Most nursing programs require a minimum score of 65–70%.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 32 }}>
              {[["Questions","170 (150 scored + 20 unscored)"],["Time","209 minutes"],["Format","Multiple choice + ATI Technology-Enhanced"],["Sections","4 content areas"]].map(([k,v]) => (
                <div key={k} style={{ background: "#0d1f35", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 10, padding: "16px 18px" }}>
                  <div style={{ color: "#475569", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{k}</div>
                  <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeExam === "hesi" && (
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f1f5f9", marginBottom: 8 }}>HESI A2 — Admission Assessment Exam</h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, maxWidth: 700, marginBottom: 24 }}>
              The HESI A2 (Health Education Systems Incorporated Admissions Assessment) is used by nursing schools to evaluate a candidate's academic readiness. Unlike the TEAS, each school selects which subtests to require, so your preparation should match your specific program's requirements.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 32 }}>
              {[["Questions","Varies by subtest"],["Time","5+ hours (full exam)"],["Passing score","Varies by school (usually 75–80%)"],["Subtests","Up to 9 depending on program"]].map(([k,v]) => (
                <div key={k} style={{ background: "#0d1f35", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 10, padding: "16px 18px" }}>
                  <div style={{ color: "#475569", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{k}</div>
                  <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#f1f5f9", marginBottom: 16 }}>Content Breakdown</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          {topics.map((t, i) => (
            <div key={t.name} style={{ background: "#0d1f35", border: "1px solid rgba(14,165,233,0.12)", borderRadius: 10, padding: "18px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14 }}>{t.name}</span>
                <span style={{ background: "rgba(14,165,233,0.15)", color: "#38bdf8", borderRadius: 999, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{t.pct}%</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginBottom: 12 }}>
                <div style={{ height: "100%", width: `${t.pct * 3}%`, background: "#0ea5e9", borderRadius: 2 }} />
              </div>
              <ul style={{ paddingLeft: 18, margin: 0 }}>{t.sub.map(s => <li key={s} style={{ color: "#94a3b8", fontSize: 12, marginBottom: 3 }}>{s}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 80px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#f1f5f9", marginBottom: 20 }}>Continue Your Journey</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[["Nursing School","/courses/nursing-school"],["NCLEX-RN","/courses/nclex-rn"],["NCLEX-PN","/courses/nclex-pn"],["Nurse Practitioner","/courses/fnp"],["CCRN","/courses/ccrn"]].map(([name, href]) => (
            <Link key={name} href={href} style={{ background: "#0d1f35", color: "#94a3b8", border: "1px solid rgba(14,165,233,0.12)", borderRadius: 8, padding: "10px 18px", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>{name}</Link>
          ))}
        </div>
      </section>
    </main>
  );
}