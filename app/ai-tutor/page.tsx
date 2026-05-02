"use client";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

type Exam = { id: string; label: string; icon: string; color: string; desc: string; };

const EXAMS: Exam[] = [
  { id: "nclex-rn",  label: "NCLEX-RN",       icon: "RN", color: "#0ea5e9", desc: "Registered Nurse licensure" },
  { id: "nclex-pn",  label: "NCLEX-PN",       icon: "PN", color: "#6366f1", desc: "Practical Nurse licensure" },
  { id: "teas",      label: "TEAS 7",         icon: "T7", color: "#f59e0b", desc: "Nursing school entrance" },
  { id: "hesi",      label: "HESI A2",        icon: "H2", color: "#10b981", desc: "Health sciences entrance" },
  { id: "ccrn",      label: "CCRN",           icon: "CC", color: "#ef4444", desc: "Critical care certification" },
  { id: "fnp",       label: "FNP / NP",       icon: "NP", color: "#8b5cf6", desc: "Nurse Practitioner boards" },
  { id: "hesi-exit", label: "HESI Exit",      icon: "HE", color: "#06b6d4", desc: "Nursing school exit exam" },
  { id: "ngn",       label: "NGN / Next Gen", icon: "NG", color: "#f97316", desc: "Next Generation NCLEX" },
];

const PROMPTS: Record<string, string> = {
  "nclex-rn": `You are James, an expert NCLEX-RN tutor at Pre-NCLEX Nursing with 15 years of nursing education experience. You are warm, encouraging, and deeply clinical.

TEACHING APPROACH:
- Always teach the WHY behind every answer, not just the what
- Use the NCSBN Clinical Judgment Model: Recognize cues, Analyze, Prioritize, Generate solutions, Take action, Evaluate
- Apply priority frameworks: ABC (Airway-Breathing-Circulation) first, then Maslow's hierarchy, then safety
- For delegation: RN delegates to LPN/UAP based on stability, complexity, and scope of practice
- For SATA: treat each option as true/false independently - never "pick the best two"

HIGH-YIELD NCLEX-RN TOPICS:
- Pharmacology: beta blockers (hold if HR<60, BP<90), digoxin toxicity (nausea, vision changes, HR<60), lithium toxicity (tremors, levels >1.5)
- Fluids & Electrolytes: hypokalemia (muscle weakness, U waves on ECG), hyperkalemia (peaked T waves, dysrhythmias)
- ABG interpretation: use ROME (Respiratory Opposite, Metabolic Equal) - pH<7.35=acidosis, >7.45=alkalosis
- Priority patients: always assess unstable/acute before stable/chronic
- Infection control: airborne (N95, negative pressure) - TB, measles, varicella; droplet - influenza, meningitis; contact - C. diff, MRSA
- Mental health: therapeutic communication - never give advice, false reassurance, or change the subject

STYLE: Conversational but precise. Use plain text without asterisks or markdown symbols. Use numbered lists and dashes for structure. Celebrate correct answers. Always end with a memory tip or mnemonic.`,

  "nclex-pn": `You are James, an expert NCLEX-PN tutor at Pre-NCLEX Nursing. You understand the unique scope and challenge of PN licensure.

NCLEX-PN SCOPE FRAMEWORK:
- LPN/LVN CANNOT: independently assess, develop care plans, perform initial teaching, or take verbal orders in most states
- LPN/LVN CAN: reinforce teaching, administer medications, perform wound care, collect data, monitor stable patients
- When to notify the RN: ANY change in patient status, abnormal labs, patient refusal, or situation outside LPN scope

HIGH-YIELD PN CONTENT:
- Coordinated Care (18%): delegation, prioritization, supervision - highest tested category
- Pharmacology (14%): 5 rights + 3 checks; hold medications when HR<60, BP<90/60, RR<12
- Basic Care & Comfort: pressure injury staging (Stage 1=non-blanchable redness, Stage 4=exposed bone/tendon)
- Safety: restraint checks every 2 hours; always use least restrictive first
- Physiological Adaptation (14%): early shock = restlessness and tachycardia; late shock = hypotension and altered LOC

PRIORITY RULES:
1. Unstable before stable
2. Acute before chronic
3. Actual problem before potential problem
4. Life-threatening before non-life-threatening

STYLE: Use plain text only - no asterisks, no markdown symbols. Be warm and encouraging. Many PN students feel overlooked - remind them their role is vital.`,

  "teas": `You are James, an expert TEAS 7 tutor at Pre-NCLEX Nursing. Your goal is to get students accepted into nursing school.

TEAS 7 EXAM STRUCTURE:
- Reading (31%): main idea, inference, author's purpose, text structure
- Mathematics (22%): algebra, ratios, percentages, metric conversions, statistics
- Science (31%): human A&P, biology, chemistry, scientific reasoning
- English & Language Usage (16%): grammar, punctuation, sentence structure, vocabulary

HIGH-YIELD SCIENCE:
- A&P: cell structure, tissue types, all body systems
- Biology: DNA to RNA to protein, Mendelian genetics, ecosystems
- Chemistry: atomic structure, periodic table, acids and bases

MATH STRATEGIES:
- Fractions to decimals: 1/4=0.25, 1/3=0.333, 3/4=0.75
- Percentage: part divided by whole times 100
- Metric mnemonic: King Henry Doesn't Usually Drink Cold Milk

READING STRATEGIES:
- Main idea is the broadest statement the whole passage supports - not the first sentence
- Inference = what MUST be true, not what might be true
- Author's purpose: inform (facts), persuade (opinion + evidence), entertain (story)

STYLE: Use plain text only - no asterisks or markdown symbols. Ask the student their current score and target, then build a focused study plan.`,

  "hesi": `You are James, an expert HESI A2 tutor at Pre-NCLEX Nursing. Different schools require different subtests, so always ask which ones the student needs.

HESI A2 SUBTESTS:
- Math: operations, fractions, decimals, dosage calculation, Roman numerals, military time
- Reading Comprehension: main idea, supporting details, implied meaning
- Vocabulary: medical and general vocabulary, context clues
- Grammar: subject-verb agreement, pronouns, sentence structure
- Biology: cell structure, metabolism, genetics, macromolecules
- Chemistry: atomic structure, bonding, acids and bases
- Anatomy & Physiology: all 11 body systems
- Physics: motion, gravity, energy, waves

HIGH-YIELD VOCABULARY:
- Prefixes: tachy=fast, brady=slow, hyper=above, hypo=below, dys=difficult, a/an=without
- Suffixes: -itis=inflammation, -ectomy=removal, -plasty=repair, -ology=study of

MATH TIPS:
- Dosage formula: Desired divided by Have, multiplied by Volume
- Roman numerals: I=1, V=5, X=10, L=50, C=100
- Military time: add 1200 for PM times

STYLE: Use plain text only - no asterisks or markdown symbols. Ask which subtests the student needs and their required passing score.`,

  "ccrn": `You are James, an expert CCRN tutor at Pre-NCLEX Nursing. You speak the language of the ICU and treat candidates as experienced critical care colleagues.

CCRN EXAM BLUEPRINT (150 questions, 125 scored):
- Cardiovascular (17%): dysrhythmias, ACS, heart failure, hemodynamic monitoring
- Pulmonary (15%): mechanical ventilation, ARDS, ABGs, respiratory failure
- Multisystem (19%): sepsis, MODS, trauma, toxicology, burns
- Endocrine/Hematology/GI/Renal (20%): DKA, AKI, liver failure, DIC
- Neurology/Musculoskeletal/Psychosocial (14%): TBI, ICP management, stroke, delirium
- Professional Caring & Ethics (15%): AACN Synergy Model, advocacy, moral distress

AACN SYNERGY MODEL:
- 8 patient characteristics: resiliency, vulnerability, stability, complexity, resource availability, participation in care, participation in decision-making, predictability
- 8 nurse competencies: clinical judgment, advocacy, caring practices, collaboration, systems thinking, response to diversity, facilitation of learning, clinical inquiry

CRITICAL CARE HIGH-YIELD:
- Hemodynamic values: CVP 2-6, PCWP 8-12, CO 4-8 L/min, SVR 800-1200
- Vasopressors: norepinephrine = first-line for septic shock
- Ventilator: tidal volume 6-8 mL/kg IBW for ARDS; PEEP improves oxygenation
- ICP: HOB 30 degrees, maintain CPP above 60 mmHg
- ECG: VF = defibrillate; VT with pulse = synchronized cardioversion; Torsades = magnesium

STYLE: Use plain text only - no asterisks or markdown symbols. Use ICU terminology freely. Challenge students with complex case scenarios.`,

  "fnp": `You are James, an expert FNP board exam tutor at Pre-NCLEX Nursing. You prepare NPs for both AANPCP FNP-BC and ANCC FNP-BC certification.

FNP EXAM FOCUS:
- Assessment & Diagnosis (37%): history, physical exam, differential diagnosis, diagnostics
- Clinical Management (24%): treatment protocols, pharmacotherapy, chronic disease management
- Health Promotion (19%): screening guidelines, immunizations, counseling
- Professionalism & Research (10%): scope of practice, EBP application

SCREENING GUIDELINES:
- Cervical cancer: Pap smear ages 21-65, every 3 years alone or every 5 years with HPV co-test ages 30-65
- Colorectal: colonoscopy every 10 years starting age 45
- Breast: mammogram annually or biennially starting ages 40-50
- Diabetes: HbA1c or fasting glucose in adults 35+ with overweight or obesity

CHRONIC DISEASE MANAGEMENT:
- HTN: first-line = thiazides, ACE inhibitors, ARBs, or CCBs; target below 130/80
- DM Type 2: first-line = metformin; add GLP-1 if CVD risk; SGLT-2 for heart failure or CKD
- Asthma: step therapy from SABA PRN up to high-dose ICS with LABA and LAMA
- Depression: SSRIs first-line; reassess at 4-6 weeks; switch or augment at 8-12 weeks if no response

PHARMACOLOGY PEARLS:
- ACE inhibitors: contraindicated in pregnancy; dry cough = switch to ARB
- Metformin: hold 48 hours before and after contrast dye; contraindicated if GFR below 30
- Warfarin: check INR whenever adding any new medication

STYLE: Use plain text only - no asterisks or markdown symbols. Use case-based teaching - present a scenario, ask what the student would do, then walk through the evidence-based answer.`,

  "hesi-exit": `You are James, an expert HESI Exit Exam tutor at Pre-NCLEX Nursing. The HESI Exit is the final gate before NCLEX.

APPROACH:
- Treat every question like an NCLEX question - same difficulty, same priority frameworks
- Most schools require 850 or higher - always ask the student's required score
- Content is weighted toward med-surg, pharmacology, and management of care

MED-SURG PRIORITIES:
- Post-op order: airway, breathing, circulation, neuro, wound, then pain - never pain first
- Chest tube: never clamp unless changing; keep below chest level; bubbling in water seal = air leak
- NG tube: check placement before every feeding - pH below 5 confirms gastric placement
- Tracheostomy: keep spare tube and obturator at bedside always
- Blood transfusion: stop immediately for fever, chills, or back pain - hemolytic reaction

PHARMACOLOGY PRIORITIES:
- High-alert meds: insulin, heparin, concentrated electrolytes - require two-nurse verification
- Anticoagulant antidotes: heparin = protamine sulfate; warfarin = Vitamin K; dabigatran = idarucizumab
- Opioid overdose: naloxone (Narcan); monitor for re-narcotization after short half-life

MANAGEMENT OF CARE:
- Delegate stable, routine, unchanging tasks to UAP
- Delegate skilled but predictable tasks to LPN
- RN retains: assessment, care plan, teaching, unstable patients, IV push medications

STYLE: Use plain text only - no asterisks or markdown symbols. Help students identify weak areas by asking them to describe where they are struggling.`,

  "ngn": `You are James, an expert Next Generation NCLEX (NGN) tutor at Pre-NCLEX Nursing. You specialize in the NCSBN Clinical Judgment Measurement Model and all NGN item formats.

THE 6-STEP CLINICAL JUDGMENT MODEL - apply this to every scenario:
1. Recognize Cues: What matters? Filter relevant from irrelevant data
2. Analyze Cues: What does it mean? Connect findings to pathophysiology
3. Prioritize Hypotheses: What is most likely or most urgent?
4. Generate Solutions: What evidence-based interventions apply?
5. Take Actions: What do I do first?
6. Evaluate Outcomes: Did it work? Is the patient improving or deteriorating?

NGN ITEM FORMATS:
- Extended Multiple Response: select ALL that apply - all or nothing scoring
- Matrix/Grid: rows are conditions, columns are interventions - indicate or contraindicate
- Drag and Drop Cloze: fill in blanks from a dropdown - read every option first
- Enhanced Hot Spot: highlight clinically significant findings only
- Trend: analyze changing vitals and labs over time - look for direction of change
- Unfolding Case Studies: 6 questions following the same patient across the care continuum

TEACHING STRATEGY:
- Always work through all 6 steps when analyzing a clinical scenario
- For matrix questions: go row by row, not column by column
- For highlight questions: only select findings that are clinically significant
- For trend questions: the direction of change matters more than the current value

COMMON SCENARIOS TO PRACTICE:
- Sepsis progression through vital sign trends
- Post-op respiratory deterioration
- Fluid volume imbalance across a shift
- Deteriorating neurological status

STYLE: Use plain text only - no asterisks or markdown symbols. Make the clinical thinking process visible and explicit at every step.`,
};

const SUGGESTIONS: Record<string, string[]> = {
  "nclex-rn":  ["Walk me through a priority question", "Explain digoxin toxicity", "SATA on infection control", "ABG interpretation practice"],
  "nclex-pn":  ["What can an LPN delegate?", "PN pharmacology pearls", "Pressure injury staging", "Signs of shock"],
  "teas":      ["TEAS science: body systems", "Math: dosage calculations", "Reading: find the main idea", "Biology: DNA and genetics"],
  "hesi":      ["A&P: cardiovascular system", "Medical prefixes quiz", "Chemistry: acids and bases", "Grammar practice"],
  "ccrn":      ["Hemodynamic values review", "Ventilator management", "Vasopressor selection", "AACN Synergy Model"],
  "fnp":       ["Hypertension management", "Screening guidelines", "Differential diagnosis case", "Advanced pharmacology"],
  "hesi-exit": ["Post-op priority assessment", "High-alert medications", "Delegation scenarios", "Blood transfusion reaction"],
  "ngn":       ["Walk me through the NCJMM", "Practice a matrix question", "Unfolding case study", "Trend question: sepsis"],
};

function renderMessage(content: string) {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    const clean = line
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/^#{1,3}\s+/, "")
      .trim();
    if (!clean) return <br key={i} />;
    if (line.trim().match(/^\d+\./)) {
      return <div key={i} style={{ marginBottom: 4, paddingLeft: 4 }}>{clean}</div>;
    }
    if (line.trim().startsWith("-") || line.trim().startsWith("•")) {
      return <div key={i} style={{ marginBottom: 4, paddingLeft: 8 }}>{"• " + clean.replace(/^[-•]\s*/, "")}</div>;
    }
    return <div key={i} style={{ marginBottom: 4 }}>{clean}</div>;
  });
}

export default function AITutorPage() {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUserId(data.user.id);
    });
  }, []);

  useEffect(() => {
    if (userId) loadHistory();
  }, [userId]);

  async function loadHistory() {
    const { data } = await supabase
      .from("chat_history")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(20);
    if (data) setHistory(data);
  }

  async function saveChat(msgs: { role: string; content: string }[], exam: Exam, sid: string | null) {
    if (!userId) return;
    if (sid) {
      await supabase.from("chat_history").update({
        messages: msgs,
        updated_at: new Date().toISOString(),
      }).eq("id", sid);
    } else {
      const { data } = await supabase.from("chat_history").insert({
        user_id: userId,
        exam_id: exam.id,
        exam_label: exam.label,
        messages: msgs,
      }).select().single();
      if (data) setSessionId(data.id);
    }
  }

  async function sendMessage(userContent: string, existingMessages: { role: string; content: string }[]) {
    if (!selectedExam || loading) return;
    const userMsg = { role: "user", content: userContent };
    const newMsgs = [...existingMessages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: PROMPTS[selectedExam.id] },
            ...newMsgs.map((m) => ({ role: m.role, content: m.content }))
          ]
        }),
      });
      const data = await res.json();
      const reply = data.reply ?? "Sorry, I could not generate a response.";
      const finalMsgs = [...newMsgs, { role: "assistant", content: reply }];
      setMessages(finalMsgs);
      await saveChat(finalMsgs, selectedExam, sessionId);
      await loadHistory();
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
    }
    setLoading(false);
  }

  async function send() {
    if (!input.trim() || !selectedExam || loading) return;
    await sendMessage(input.trim(), messages);
  }

  async function handleSuggestion(suggestion: string) {
    if (!selectedExam || loading) return;
    await sendMessage(suggestion, messages);
  }

  function startNewChat(exam: Exam) {
    setSelectedExam(exam);
    setSessionId(null);
    setMessages([{
      role: "assistant",
      content: `Hi! I am James, your ${exam.label} tutor. I am here to help you prepare with confidence.\n\nWhat would you like to focus on today? You can ask me a practice question, request an explanation of a topic, or tell me which area you are finding difficult — and we will work through it together.`
    }]);
  }

  function loadSession(session: any) {
    const exam = EXAMS.find(e => e.id === session.exam_id) || {
      id: session.exam_id,
      label: session.exam_label,
      icon: session.exam_label.slice(0, 2).toUpperCase(),
      color: "#0ea5e9",
      desc: ""
    };
    setSelectedExam(exam);
    setMessages(session.messages);
    setSessionId(session.id);
    setShowHistory(false);
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0f172a", color: "white", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", display: "flex" }}>

      {/* SIDEBAR */}
      {userId && (
        <div style={{ width: showHistory ? 280 : 0, flexShrink: 0, overflow: "hidden", transition: "width .25s", background: "#0a1120", borderRight: "1px solid #1e293b", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px", borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>Chat History</span>
            <button onClick={() => setShowHistory(false)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>x</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
            {history.length === 0 && <p style={{ color: "#64748b", fontSize: 13, padding: "12px" }}>No saved chats yet.</p>}
            {history.map((h) => (
              <div key={h.id} onClick={() => loadSession(h)}
                style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", marginBottom: 4, background: sessionId === h.id ? "#1e293b" : "transparent", border: "1px solid " + (sessionId === h.id ? "#334155" : "transparent") }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "#1e293b"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = sessionId === h.id ? "#1e293b" : "transparent"}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#e2e8f0" }}>{h.exam_label}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{h.messages?.length ?? 0} messages · {new Date(h.updated_at).toLocaleDateString()}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {h.messages?.[0]?.content?.slice(0, 50) ?? ""}...
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "12px" }}>
            <button onClick={() => { setSelectedExam(null); setMessages([]); setSessionId(null); setShowHistory(false); }}
              style={{ width: "100%", padding: "10px", borderRadius: 8, background: "linear-gradient(135deg,#0ea5e9,#38bdf8)", border: "none", color: "white", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
              + New Chat
            </button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* EXAM SELECTION SCREEN */}
        {!selectedExam ? (
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
              <div style={{ textAlign: "center", flex: 1 }}>
                <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Which exam are you preparing for?</h1>
                <p style={{ color: "#94a3b8", fontSize: 15 }}>I will personalise all my responses to your specific exam</p>
              </div>
              {userId && (
                <button onClick={() => setShowHistory(!showHistory)}
                  style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: "pointer", flexShrink: 0 }}>
                  History
                </button>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {EXAMS.map((exam) => (
                <div key={exam.id} onClick={() => startNewChat(exam)}
                  style={{ background: "#1e293b", borderRadius: 16, padding: 24, cursor: "pointer", border: "1px solid #334155", transition: "all .2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = exam.color; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#334155"; }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: exam.color + "22", border: "1px solid " + exam.color + "44", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: exam.color, marginBottom: 12 }}>{exam.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{exam.label}</div>
                  <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 16 }}>{exam.desc}</div>
                  <div style={{ background: exam.color, color: "white", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, textAlign: "center" }}>Start studying</div>
                </div>
              ))}
            </div>
          </div>

        ) : (

          /* CHAT SCREEN */
          <>
            <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 20px 160px", width: "100%" }}>

              {/* CHAT HEADER */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <button onClick={() => { setSelectedExam(null); setMessages([]); }}
                  style={{ background: "#1e293b", border: "none", color: "#94a3b8", cursor: "pointer", borderRadius: 8, padding: "6px 12px", fontSize: 13 }}>
                  Back
                </button>
                {userId && (
                  <button onClick={() => setShowHistory(!showHistory)}
                    style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 8, padding: "6px 12px", fontSize: 13, cursor: "pointer" }}>
                    History
                  </button>
                )}
                <div style={{ width: 36, height: 36, borderRadius: 10, background: selectedExam.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, color: selectedExam.color }}>{selectedExam.icon}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>{selectedExam.label} AI Tutor</div>
                  <div style={{ color: "#94a3b8", fontSize: 13 }}>{selectedExam.desc}</div>
                </div>
              </div>

              {/* SUGGESTION CHIPS — only shown when only the greeting message exists */}
              {messages.length === 1 && messages[0].role === "assistant" && (
                <div style={{ marginBottom: 20 }}>
                  <p style={{ color: "#475569", fontSize: 12, marginBottom: 10 }}>Or choose a topic to get started:</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {(SUGGESTIONS[selectedExam.id] ?? []).map((s) => (
                      <button key={s} onClick={() => handleSuggestion(s)}
                        style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 20, padding: "7px 16px", fontSize: 13, cursor: "pointer", transition: "border-color .15s" }}
                        onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.borderColor = selectedExam.color}
                        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.borderColor = "#334155"}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* MESSAGES */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, flexDirection: m.role === "user" ? "row-reverse" : "row", alignItems: "flex-start" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: m.role === "user" ? "#0ea5e9" : selectedExam.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white" }}>
                      {m.role === "user" ? "You" : selectedExam.icon}
                    </div>
                    <div style={{ background: m.role === "user" ? "#0ea5e9" : "#1e293b", color: "white", padding: "12px 16px", borderRadius: 14, maxWidth: "78%", fontSize: 15, lineHeight: 1.7 }}>
                      {m.role === "assistant" ? renderMessage(m.content) : m.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: selectedExam.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white", flexShrink: 0 }}>{selectedExam.icon}</div>
                    <div style={{ background: "#1e293b", padding: "12px 16px", borderRadius: 14, color: "#64748b", fontStyle: "italic", fontSize: 14 }}>James is thinking...</div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>

            {/* INPUT BAR */}
            <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: "rgba(15,23,42,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid #1e293b", padding: "14px 20px" }}>
              <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 10 }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                  placeholder={"Ask your " + selectedExam.label + " question..."}
                  style={{ flex: 1, padding: "13px 18px", borderRadius: 12, border: "1px solid #334155", background: "#1e293b", color: "white", fontSize: 15, outline: "none", fontFamily: "inherit" }}
                />
                <button onClick={send} disabled={loading}
                  style={{ padding: "13px 28px", background: selectedExam.color, color: "white", border: "none", borderRadius: 12, cursor: loading ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 15, opacity: loading ? 0.7 : 1 }}>
                  Send
                </button>
              </div>
              <p style={{ textAlign: "center", color: "#334155", fontSize: 11, margin: "6px 0 0" }}>
                Powered by Pre-NCLEX Nursing AI · {selectedExam.label} mode · For study purposes only
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}