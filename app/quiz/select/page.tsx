"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Suspense } from "react";

const courses = [
  {
    examType: "RN",
    label: "NCLEX-RN",
    subtitle: "Registered Nurse",
    color: "#0ea5e9",
    goal: "nclex-rn",
    topics: ["Med-Surg", "Pharmacology", "Mental Health", "Maternity"],
  },
  {
    examType: "PN",
    label: "NCLEX-PN",
    subtitle: "Practical Nurse",
    color: "#8b5cf6",
    goal: "nclex-pn",
    topics: ["Basic Care", "Pharmacology", "Safety"],
  },
  {
    examType: "CCRN",
    label: "CCRN",
    subtitle: "Critical Care",
    color: "#ef4444",
    goal: "ccrn",
    topics: ["Cardiovascular", "Pulmonary", "Neuro"],
  },
  {
    examType: "TEAS",
    label: "TEAS 7",
    subtitle: "Pre-Nursing",
    color: "#f59e0b",
    goal: "pre-nursing",
    topics: ["Science", "Math", "English"],
  },
  {
    examType: "NURSING_SCHOOL",
    label: "Nursing School",
    subtitle: "Fundamentals",
    color: "#10b981",
    goal: "nursing-school",
    topics: ["Fundamentals"],
  },
  {
    examType: "NP",
    label: "Nurse Practitioner",
    subtitle: "NP / FNP",
    color: "#6366f1",
    goal: "np",
    topics: ["Pharmacology", "Diagnostics"],
  },
];

function QuizSelectInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [examGoal, setExamGoal] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push("/auth/login"); return; }
      const { data: profile } = await supabase
        .from("profiles")
        .select("exam_goal")
        .eq("id", data.user.id)
        .single();
      if (profile?.exam_goal) setExamGoal(profile.exam_goal);
    });
    const preselect = searchParams.get("examType");
    if (preselect) setSelectedCourse(preselect);
  }, []);

  const activeCourse = courses.find(c => c.examType === selectedCourse);
  const canStart = !!selectedCourse && !!selectedTopic;

  function startQuiz() {
    if (!canStart) return;
    const params = new URLSearchParams({ examType: selectedCourse! });
    if (selectedTopic) params.set("topic", selectedTopic);
    router.push(`/quiz?${params.toString()}`);
  }

  const step1Done = !!selectedCourse;
  const step2Done = !!selectedTopic;

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #060f1e 0%, #0d1f35 50%, #0e2540 100%)", fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#e2e8f0", padding: "80px 24px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px", fontSize: "13px", color: "#38bdf8", fontWeight: 500 }}>
            Quiz Setup
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: "#f8fafc", margin: "0 0 12px" }}>
            Set up your quiz
          </h1>
          <p style={{ color: "#64748b", fontSize: "15px", margin: 0 }}>
            Complete all steps below before starting your quiz.
          </p>
        </div>

        {/* Step 1 - Course */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: step1Done ? "#0ea5e9" : "rgba(255,255,255,0.08)", border: step1Done ? "none" : "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: step1Done ? "#fff" : "#475569", flexShrink: 0 }}>
              {step1Done ? "" : "1"}
            </div>
            <p style={{ fontSize: "13px", fontWeight: 700, color: step1Done ? "#f8fafc" : "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
              Select Course {!step1Done && <span style={{ color: "#ef4444", marginLeft: "4px" }}>*Required</span>}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
            {courses.map(c => {
              const isSelected = selectedCourse === c.examType;
              const isRecommended = examGoal === c.goal;
              return (
                <button key={c.examType}
                  onClick={() => { setSelectedCourse(c.examType); setSelectedTopic(null); }}
                  style={{ padding: "16px 20px", borderRadius: "14px", border: isSelected ? `2px solid ${c.color}` : "1px solid rgba(255,255,255,0.08)", background: isSelected ? `${c.color}15` : "rgba(255,255,255,0.03)", cursor: "pointer", textAlign: "left", fontFamily: "inherit", position: "relative", transition: "all 0.2s" }}>
                  {isRecommended && (
                    <span style={{ position: "absolute", top: "8px", right: "8px", fontSize: "9px", fontWeight: 700, color: c.color, background: `${c.color}18`, border: `1px solid ${c.color}40`, borderRadius: "100px", padding: "2px 7px" }}>
                      Your goal
                    </span>
                  )}
                  <p style={{ fontSize: "15px", fontWeight: 700, color: isSelected ? "#f8fafc" : "#94a3b8", margin: "0 0 3px" }}>{c.label}</p>
                  <p style={{ fontSize: "11px", color: isSelected ? c.color : "#334155", margin: 0 }}>{c.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2 - Topic */}
        <div style={{ marginBottom: "40px", opacity: step1Done ? 1 : 0.35, pointerEvents: step1Done ? "auto" : "none", transition: "opacity 0.3s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: step2Done ? "#0ea5e9" : "rgba(255,255,255,0.08)", border: step2Done ? "none" : "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: step2Done ? "#fff" : "#475569", flexShrink: 0 }}>
              {step2Done ? "" : "2"}
            </div>
            <p style={{ fontSize: "13px", fontWeight: 700, color: step2Done ? "#f8fafc" : "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
              Select Topic {step1Done && !step2Done && <span style={{ color: "#ef4444", marginLeft: "4px" }}>*Required</span>}
            </p>
          </div>
          {activeCourse && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {activeCourse.topics.map(t => {
                const isSelected = selectedTopic === t;
                return (
                  <button key={t} onClick={() => setSelectedTopic(t)}
                    style={{ padding: "11px 24px", borderRadius: "100px", border: isSelected ? `2px solid ${activeCourse.color}` : "1px solid rgba(255,255,255,0.1)", background: isSelected ? `${activeCourse.color}20` : "rgba(255,255,255,0.04)", color: isSelected ? activeCourse.color : "#94a3b8", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
                    {t}
                  </button>
                );
              })}
            </div>
          )}
          {!activeCourse && (
            <p style={{ color: "#334155", fontSize: "14px" }}>Select a course above to see available topics.</p>
          )}
        </div>

        {/* Step 3 - Start */}
        <div style={{ opacity: canStart ? 1 : 0.4, transition: "opacity 0.3s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#475569", flexShrink: 0 }}>
              3
            </div>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>Start Quiz</p>
          </div>
          <button onClick={startQuiz} disabled={!canStart}
            style={{ width: "100%", padding: "18px", borderRadius: "14px", background: canStart ? `linear-gradient(135deg, ${activeCourse?.color}, ${activeCourse?.color}cc)` : "rgba(255,255,255,0.05)", color: canStart ? "#fff" : "#334155", fontSize: "16px", fontWeight: 700, border: "none", cursor: canStart ? "pointer" : "not-allowed", fontFamily: "inherit", transition: "all 0.3s", boxShadow: canStart ? `0 8px 28px ${activeCourse?.color}40` : "none" }}>
            {canStart
              ? `Start ${activeCourse?.label} Quiz -- ${selectedTopic}`
              : "Complete steps 1 and 2 to continue"}
          </button>
        </div>

      </div>
    </main>
  );
}

export default function QuizSelectPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#060f1e" }} />}>
      <QuizSelectInner />
    </Suspense>
  );
}
