"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
const courses = [
  {
    examType: "RN",
    label: "NCLEX-RN",
    color: "#0ea5e9",
    goal: "nclex-rn",
    topics: ["Med-Surg", "Pharmacology", "Mental Health", "Maternity", "All Topics"],
  },
  {
    examType: "PN",
    label: "NCLEX-PN",
    color: "#8b5cf6",
    goal: "nclex-pn",
    topics: ["Basic Care", "Pharmacology", "Safety", "All Topics"],
  },
  {
    examType: "CCRN",
    label: "CCRN",
    color: "#ef4444",
    goal: "ccrn",
    topics: ["Cardiovascular", "Pulmonary", "Neuro", "All Topics"],
  },
  {
    examType: "TEAS",
    label: "TEAS 7 / Pre-Nursing",
    color: "#f59e0b",
    goal: "pre-nursing",
    topics: ["Science", "Math", "English", "All Topics"],
  },
  {
    examType: "NURSING_SCHOOL",
    label: "Nursing School",
    color: "#10b981",
    goal: "nursing-school",
    topics: ["Fundamentals", "All Topics"],
  },
  {
    examType: "NP",
    label: "Nurse Practitioner",
    color: "#6366f1",
    goal: "np",
    topics: ["All Topics"],
  },
];
export default function QuizSelectPage() {
  const router = useRouter();
  const [examGoal, setExamGoal] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>("All Topics");
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push("/auth/login"); return; }
      const { data: profile } = await supabase
        .from("profiles")
        .select("exam_goal")
        .eq("id", data.user.id)
        .single();
      if (profile?.exam_goal) {
        setExamGoal(profile.exam_goal);
        const match = courses.find(c => c.goal === profile.exam_goal);
        if (match) setSelectedCourse(match.examType);
      }
    });
  }, []);
  const activeCourse = courses.find(c => c.examType === selectedCourse);
  function startQuiz() {
    if (!selectedCourse) return;
    const params = new URLSearchParams({ examType: selectedCourse });
    if (selectedTopic !== "All Topics") params.set("topic", selectedTopic);
    router.push(`/quiz?${params.toString()}`);
  }
  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #060f1e 0%, #0d1f35 50%, #0e2540 100%)", fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#e2e8f0", padding: "80px 24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px", fontSize: "13px", color: "#38bdf8", fontWeight: 500 }}>
            Start a Quiz
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: "#f8fafc", margin: "0 0 12px" }}>
            Choose your course and topic
          </h1>
          <p style={{ color: "#64748b", fontSize: "15px" }}>
            Your recommended course is highlighted based on your exam goal.
          </p>
        </div>
        {/* Course Selection */}
        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>Select Course</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
            {courses.map(c => {
              const isSelected = selectedCourse === c.examType;
              const isRecommended = examGoal === c.goal;
              return (
                <button key={c.examType} onClick={() => { setSelectedCourse(c.examType); setSelectedTopic("All Topics"); }}
                  style={{ padding: "16px 20px", borderRadius: "14px", border: isSelected ? `1px solid ${c.color}` : "1px solid rgba(255,255,255,0.08)", background: isSelected ? `${c.color}18` : "rgba(255,255,255,0.03)", cursor: "pointer", textAlign: "left", fontFamily: "inherit", position: "relative", transition: "all 0.2s" }}>
                  {isRecommended && (
                    <span style={{ position: "absolute", top: "10px", right: "10px", fontSize: "10px", fontWeight: 700, color: c.color, background: `${c.color}18`, border: `1px solid ${c.color}40`, borderRadius: "100px", padding: "2px 8px" }}>
                      Your goal
                    </span>
                  )}
                  <p style={{ fontSize: "15px", fontWeight: 700, color: isSelected ? "#f8fafc" : "#94a3b8", margin: "0 0 4px" }}>{c.label}</p>
                  <p style={{ fontSize: "12px", color: isSelected ? c.color : "#475569", margin: 0 }}>{c.topics.length - 1} topics</p>
                </button>
              );
            })}
          </div>
        </div>
        {/* Topic Selection */}
        {activeCourse && (
          <div style={{ marginBottom: "40px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>Select Topic</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {activeCourse.topics.map(t => {
                const isSelected = selectedTopic === t;
                return (
                  <button key={t} onClick={() => setSelectedTopic(t)}
                    style={{ padding: "9px 20px", borderRadius: "100px", border: isSelected ? `1px solid ${activeCourse.color}` : "1px solid rgba(255,255,255,0.1)", background: isSelected ? `${activeCourse.color}20` : "rgba(255,255,255,0.04)", color: isSelected ? activeCourse.color : "#94a3b8", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {/* Start Button */}
        <button onClick={startQuiz} disabled={!selectedCourse}
          style={{ width: "100%", padding: "16px", borderRadius: "14px", background: selectedCourse ? `linear-gradient(135deg, ${activeCourse?.color}, ${activeCourse?.color}cc)` : "rgba(255,255,255,0.05)", color: selectedCourse ? "#fff" : "#475569", fontSize: "16px", fontWeight: 700, border: "none", cursor: selectedCourse ? "pointer" : "not-allowed", fontFamily: "inherit", transition: "all 0.2s" }}>
          {selectedCourse ? `Start ${activeCourse?.label} Quiz${selectedTopic !== "All Topics" ? ` - ${selectedTopic}` : ""}` : "Select a course to continue"}
        </button>
      </div>
    </main>
  );
}
