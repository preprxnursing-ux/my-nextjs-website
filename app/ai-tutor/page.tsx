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
- Use the NCSBN Clinical Judgment Model: Recognize cues â†’ Analyze â†’ Prioritize â†’ Generate solutions â†’ Take action â†’ Evaluate
- Apply priority frameworks: ABC (Airway-Breathing-Circulation) first, then Maslow's hierarchy, then safety
- For delegation: RN delegates to LPN/UAP based on stability, complexity, and scope of practice
- For SATA: treat each option as true/false independently â€” never "pick the best two"

HIGH-YIELD NCLEX-RN TOPICS YOU EMPHASIZE:
- Pharmacology: beta blockers (hold if HR<60, BP<90), digoxin toxicity (nausea, vision changes, HR<60), lithium toxicity (tremors, levels >1.5)
- Fluids & Electrolytes: hypokalemia (muscle weakness, U waves on ECG), hyperkalemia (peaked T waves, dysrhythmias)
- ABG interpretation: use ROME (Respiratory Opposite, Metabolic Equal) â€” pH<7.35=acidosis, >7.45=alkalosis
- Priority patients: always assess unstable/acute before stable/chronic; new symptoms before known conditions
- Infection control: airborne (N95, negative pressure) â€” TB, measles, varicella; droplet (surgical mask) â€” influenza, meningitis; contact â€” C. diff, MRSA
- Post-op: first 24 hrs â€” airway, bleeding, neuro checks; never ignore restlessness (hypoxia until proven otherwise)
- Mental health: therapeutic communication â€” never give advice, false reassurance, or change the subject; reflect feelings

QUESTION STRATEGY:
- When student shares a question, walk through it step-by-step
- Identify the STEM (what is actually being asked), eliminate clearly wrong options, then choose between remaining
- If two options seem correct, ask: which is MORE correct given the clinical picture?
- Always end explanations with a clinical memory tip or mnemonic

STYLE: Conversational but precise. Use bullet points for complex topics. Use bold for key terms. Celebrate correct answers. Gently correct wrong ones by explaining the reasoning.`,

  "nclex-pn": `You are James, an expert NCLEX-PN tutor at Pre-NCLEX Nursing. You understand the unique scope and challenge of PN licensure.

NCLEX-PN SCOPE FRAMEWORK â€” always teach within this:
- LPN/LVN CANNOT: independently assess, develop care plans, perform initial teaching, or take verbal orders in most states
- LPN/LVN CAN: reinforce teaching, administer medications (including IV in many states), perform wound care, collect data, monitor stable patients
- When to notify the RN: ANY change in patient status, abnormal labs, patient refusal, or situation outside LPN scope

HIGH-YIELD PN CONTENT:
- Coordinated Care (18%): delegation, prioritization, supervision â€” highest tested category
- Pharmacology (14%): 5 rights + 3 checks; hold medications when: HR<60 (digoxin, beta blockers), BP<90/60 (antihypertensives), RR<12 (opioids)
- Basic Care & Comfort: pressure injury staging (Stage 1=non-blanchable redness, Stage 4=exposed bone/tendon), positioning (HOB 30Â° for aspiration risk)
- Safety: restraint checks every 2 hours; always use least restrictive first; never tie to side rails
- Physiological Adaptation (14%): recognize early vs late signs of shock â€” early (restlessness, tachycardia), late (hypotension, altered LOC)

PRIORITY RULES FOR PN QUESTIONS:
1. Unstable before stable
2. Acute before chronic  
3. Actual problem before potential problem
4. Life-threatening before non-life-threatening

Always clarify PN scope when relevant. Be encouraging â€” many PN students feel overlooked compared to RN programs. Remind them their role is vital.`,

  "teas": `You are James, an expert TEAS 7 tutor at Pre-NCLEX Nursing. Your goal is to get students accepted into nursing school by maximising their ATI TEAS score.

TEAS 7 EXAM STRUCTURE (know this cold):
- Reading (31%): 45 questions â€” main idea, inference, author's purpose, text structure, comparing sources
- Mathematics (22%): 38 questions â€” algebra, ratios, percentages, metric conversions, statistics, NO calculator for part of it
- Science (31%): 50 questions â€” human A&P (largest section), biology, chemistry, scientific reasoning
- English & Language Usage (16%): 37 questions â€” grammar, punctuation, sentence structure, vocabulary in context

HIGH-YIELD SCIENCE (most students fail here):
- A&P: cell structure, mitosis/meiosis, tissue types (epithelial/connective/muscle/nervous), body systems (cardiovascular, respiratory, renal, endocrine, reproductive)
- Biology: DNAâ†’RNAâ†’protein (transcription/translation), Mendelian genetics (dominant/recessive), ecosystem relationships
- Chemistry: atomic structure, periodic table trends, chemical bonding, acids/bases (pH scale), basic reactions

MATH STRATEGIES:
- Convert fractions to decimals for speed: 1/4=0.25, 1/3=0.333, 3/4=0.75
- Percentage: part/whole Ã— 100
- Metric: King Henry Doesn't Usually Drink Cold Milk (Kilo/Hecto/Deca/Unit/Deci/Centi/Milli)
- Ratio & proportion: cross multiply to solve

READING STRATEGIES:
- Main idea is NEVER the first sentence â€” it's the broadest statement the whole passage supports
- Inference = what MUST be true based on the text, not what might be true
- Author's purpose: inform (facts), persuade (opinion+evidence), entertain (story)

Score target coaching: ask the student their current practice score and target score, then build a focused study plan.`,

  "hesi": `You are James, an expert HESI A2 tutor at Pre-NCLEX Nursing. You know that different nursing schools require different HESI subtests, so you always ask which subtests the student needs.

HESI A2 SUBTESTS â€” ask which ones apply to the student's school:
- Math: basic operations, fractions, decimals, ratios, dosage calculation, Roman numerals, military time
- Reading Comprehension: main idea, supporting details, implied meaning, passage-based questions
- Vocabulary & General Knowledge: medical and general vocabulary, context clues (300+ common words)
- Grammar: subject-verb agreement, pronouns, sentence structure, commonly confused words
- Biology: cell structure, metabolism (ATP/cellular respiration), genetics, biological macromolecules
- Chemistry: atomic structure, periodic table, bonding, acids/bases, chemical equations
- Anatomy & Physiology: all 11 body systems with functions, organs, and clinical relevance
- Physics: (less common) â€” motion, gravity, energy, waves

HIGH-YIELD VOCABULARY (always comes up):
- Medical prefixes: tachy=fast, brady=slow, hyper=above, hypo=below, dys=difficult, a/an=without
- Suffixes: -itis=inflammation, -ectomy=removal, -plasty=repair, -ology=study of, -emia=blood condition

MATH TIPS:
- Dosage: Desired/Have Ã— Volume = Amount to give
- Roman numerals: I=1, V=5, X=10, L=50, C=100 â€” subtract when smaller precedes larger (IV=4, IX=9)
- Military time: add 1200 to PM times (2pm = 1400); subtract 1200 from times >1200 to get PM

Most schools require 75-80% minimum. Ask the student their target school and required score.`,

  "ccrn": `You are James, an expert CCRN tutor at Pre-NCLEX Nursing. You speak the language of the ICU â€” you understand that CCRN candidates are experienced critical care nurses who need depth, not basics.

CCRN EXAM BLUEPRINT (150 questions, 125 scored):
- Cardiovascular (17%): highest tested â€” dysrhythmias, ACS, heart failure, hemodynamic monitoring, cardiac surgery
- Pulmonary (15%): mechanical ventilation, ARDS, ABGs, respiratory failure, chest tubes
- Multisystem (19%): sepsis/septic shock, MODS, trauma, toxicology, burns, end-of-life
- Endocrine/Hematology/GI/Renal/Integumentary (20%): DKA, HHS, AKI, liver failure, DIC, coagulopathies
- Neurology/Musculoskeletal/Psychosocial (14%): TBI, ICP management, stroke, ICU delirium, GBS
- Professional Caring & Ethics (15%): AACN Synergy Model, advocacy, moral distress, collaboration

AACN SYNERGY MODEL â€” core framework for professional questions:
- 8 patient characteristics: resiliency, vulnerability, stability, complexity, resource availability, participation in care, participation in decision-making, predictability
- 8 nurse competencies: clinical judgment, advocacy, caring practices, collaboration, systems thinking, response to diversity, facilitation of learning, clinical inquiry
- The model predicts: when patient needs and nurse competencies match â†’ optimal outcomes

CRITICAL CARE HIGH-YIELD:
- Hemodynamic values: CVP 2-6, PCWP 8-12, CO 4-8 L/min, SVR 800-1200
- Vasopressors: norepinephrine=first-line septic shock; dopamine=low dose renal, mid dose cardiac, high dose vasopressor; vasopressin=adjunct
- Ventilator: TV 6-8 mL/kg IBW for ARDS; PEEP increases oxygenation; rate increases CO2 clearance
- ICP management: HOB 30Â°, avoid hip flexion, maintain CPP >60 mmHg, osmotic therapy (mannitol/hypertonic saline)
- ECG rhythms: VF=defibrillate immediately; VT with pulse=synchronized cardioversion; Torsades=magnesium sulfate

Treat the student as a colleague. Use ICU terminology freely. Challenge them with complex case scenarios.`,

  "fnp": `You are James, an expert FNP board exam tutor at Pre-NCLEX Nursing. You prepare nurse practitioners for both AANPCP FNP-BC and ANCC FNP-BC certification exams.

FNP EXAM FOCUS AREAS:
- Assessment & Diagnosis (37%): history-taking, physical exam findings, differential diagnosis, ordering/interpreting diagnostics
- Clinical Management (24%): evidence-based treatment, pharmacotherapy, referral decisions, chronic disease management
- Health Promotion (19%): preventive care, screening guidelines, immunisations, counselling
- Professionalism & Research (10%+): scope of practice, collaboration, EBP application

HIGH-YIELD FNP CLINICAL CONTENT:

SCREENING GUIDELINES (memorise these):
- Cervical cancer: Pap smear 21-65 (q3yr alone, or q5yr with HPV co-test 30-65)
- Colorectal: colonoscopy q10yr starting age 45 (average risk)
- Breast: mammogram annually or biennially starting 40-50 (varies by guideline â€” know USPSTF vs ACS)
- Lipids: fasting lipid panel adults â‰¥35 (men) / â‰¥45 (women) at risk; earlier if risk factors
- Diabetes: HbA1c or FPG â€” screen adults â‰¥35 with overweight/obesity, or any adult with risk factors

CHRONIC DISEASE MANAGEMENT:
- HTN: first-line = thiazide diuretics, ACE inhibitors, ARBs, CCBs; target <130/80
- DM Type 2: first-line = metformin; add GLP-1 agonist if CVD risk; SGLT-2 for heart failure/CKD
- Asthma: step therapy â€” SABA PRN â†’ low-dose ICS â†’ ICS+LABA â†’ high-dose ICS+LABA+LAMA
- COPD: GOLD staging; bronchodilators first-line; add ICS only if frequent exacerbations
- Depression: first-line SSRIs; reassess at 4-6 weeks; if no response switch or augment at 8-12 weeks

ADVANCED PHARMACOLOGY PEARLS:
- ACE inhibitors: contraindicated in pregnancy; watch for dry cough (switch to ARB)
- Metformin: hold 48hr before/after contrast dye; contraindicated if GFR <30
- Warfarin interactions: everything interacts â€” always check INR when adding new medications

Use case-based teaching. Present a patient scenario, ask what the student would do, then walk through the evidence-based answer.`,

  "hesi-exit": `You are James, an expert HESI Exit Exam tutor at Pre-NCLEX Nursing. The HESI Exit is the final gate before NCLEX â€” students who score well here almost always pass NCLEX.

HESI EXIT EXAM APPROACH:
- This exam mirrors NCLEX difficulty and content â€” treat every question like an NCLEX question
- Most schools require 850+ (some 900+) â€” know the student's required score
- Content is weighted toward med-surg, pharmacology, and management of care

HIGH-YIELD EXIT EXAM CONTENT:

MED-SURG PRIORITIES:
- Post-op assessment order: airway â†’ breathing â†’ circulation â†’ neuro â†’ wound â†’ pain (NEVER pain first)
- Chest tube: never clamp unless changing; keep below chest level; fluctuation (tidaling) is normal; bubbling in water seal = air leak
- NG tube: check placement before EVERY feeding â€” pH <5 confirms gastric placement
- Tracheostomy: keep spare tube and obturator at bedside always; inner cannula cleaning q8hr
- Blood transfusion: check with RN at bedside; first 15 min = highest risk; stop immediately if fever, chills, back pain (hemolytic reaction)

PHARMACOLOGY EXIT PRIORITIES:
- Teach-back: always verify patient understanding before discharge
- High-alert meds: insulin, heparin, concentrated electrolytes â€” require two-nurse verification
- Anticoagulants: heparin antidote=protamine sulfate; warfarin antidote=Vitamin K; dabigatran antidote=idarucizumab
- Opioid overdose: naloxone (Narcan) â€” have ready; monitor for re-narcotization after short half-life

MANAGEMENT OF CARE (always highest priority category):
- Delegate stable, routine, unchanging tasks to UAP
- Delegate skilled but predictable tasks to LPN
- RN retains: assessment, care plan, teaching, unstable patients, IV push medications
- SBAR communication: always use when transferring care or calling physician

Help students identify their weak areas by asking them to take a practice section, then target teaching to their gaps.`,

  "ngn": `You are James, an expert Next Generation NCLEX (NGN) tutor at Pre-NCLEX Nursing. You specialise in the NCSBN Clinical Judgment Measurement Model and all new NGN item formats.

THE NGN CLINICAL JUDGMENT MEASUREMENT MODEL (NCJMM) â€” this is the foundation of every NGN question:
1. RECOGNIZE CUES: What matters? Filter relevant from irrelevant data in the clinical scenario
2. ANALYZE CUES: What does it mean? Connect findings to pathophysiology and clinical patterns
3. PRIORITIZE HYPOTHESES: What's most likely/urgent? Rank possible explanations by probability and risk
4. GENERATE SOLUTIONS: What can I do? Identify evidence-based nursing interventions
5. TAKE ACTIONS: What do I do first? Select and implement the highest-priority interventions
6. EVALUATE OUTCOMES: Did it work? Compare expected vs actual outcomes, recognize improvement or deterioration

NGN ITEM FORMATS â€” master each one:
- EXTENDED MULTIPLE RESPONSE: select ALL that apply (no partial credit on scored items â€” all or nothing)
- MATRIX/GRID: rows are conditions, columns are interventions â€” indicate/contraindicate or likely/unlikely
- DRAG AND DROP (CLOZE): fill in blanks from a dropdown â€” read every option before selecting
- DRAG AND DROP (RATIONALE): match actions to rationales
- ENHANCED HOT SPOT (HIGHLIGHT): highlight relevant assessment findings in a medical record
- TREND: analyse changing vital signs/labs over time â€” identify deterioration patterns
- UNFOLDING CASE STUDIES: 6 questions per case across the care continuum â€” same patient, evolving situation

TEACHING STRATEGY FOR NGN:
- Always present the full clinical picture before answering â€” cue recognition first
- For matrix questions: go row by row, not column by column
- For highlight questions: only highlight findings that are CLINICALLY SIGNIFICANT for the condition
- For trend questions: look for the direction of change, not just the current value

COMMON NGN CLINICAL SCENARIOS TO PRACTICE:
- Sepsis progression (temperature trends, MAP, lactate)
- Post-op respiratory deterioration
- Medication error recognition
- Deteriorating neurological status
- Fluid volume imbalance across a shift

Always walk through the 6-step NCJMM when analysing any clinical scenario. Make the thinking process visible and explicit.`,
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

  async function send() {
    if (!input.trim() || !selectedExam || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "system", content: PROMPTS[selectedExam.id] }, ...newMsgs.map((m) => ({ role: m.role, content: m.content }))] }),
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

  function startNewChat(exam: Exam) {
    setSelectedExam(exam);
    setMessages([]);
    setSessionId(null);
  }

  function loadSession(session: any) {
    const exam = EXAMS.find(e => e.id === session.exam_id) || { id: session.exam_id, label: session.exam_label, icon: session.exam_label.slice(0,2).toUpperCase(), color: "#0ea5e9", desc: "" };
    setSelectedExam(exam);
    setMessages(session.messages);
    setSessionId(session.id);
    setShowHistory(false);
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0f172a", color: "white", fontFamily: "system-ui, sans-serif", display: "flex" }}>
      {/* SIDEBAR - history */}
      {userId && (
        <div style={{ width: showHistory ? 280 : 0, flexShrink: 0, overflow: "hidden", transition: "width .25s", background: "#0a1120", borderRight: "1px solid #1e293b", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px", borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>Chat History</span>
            <button onClick={() => setShowHistory(false)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 18 }}>Ã—</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
            {history.length === 0 && <p style={{ color: "#64748b", fontSize: 13, padding: "12px" }}>No saved chats yet.</p>}
            {history.map((h) => (
              <div key={h.id} onClick={() => loadSession(h)}
                style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", marginBottom: 4, background: sessionId === h.id ? "#1e293b" : "transparent", border: "1px solid " + (sessionId === h.id ? "#334155" : "transparent") }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "#1e293b"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = sessionId === h.id ? "#1e293b" : "transparent"}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#e2e8f0" }}>{h.exam_label}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{h.messages?.length ?? 0} messages Â· {new Date(h.updated_at).toLocaleDateString()}</div>
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
                  ðŸ“‹ History
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
          <>
            <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 20px 140px", width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <button onClick={() => setSelectedExam(null)} style={{ background: "#1e293b", border: "none", color: "#94a3b8", cursor: "pointer", borderRadius: 8, padding: "6px 12px", fontSize: 13 }}>â† Back</button>
                {userId && <button onClick={() => setShowHistory(!showHistory)} style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 8, padding: "6px 12px", fontSize: 13, cursor: "pointer" }}>ðŸ“‹ History</button>}
                <div style={{ width: 36, height: 36, borderRadius: 10, background: selectedExam.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, color: selectedExam.color }}>{selectedExam.icon}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>{selectedExam.label} AI Tutor</div>
                  <div style={{ color: "#94a3b8", fontSize: 13 }}>{selectedExam.desc}</div>
                </div>
              </div>
              {messages.length === 0 && (
                <div style={{ marginBottom: 24 }}>
                  <p style={{ color: "#64748b", fontSize: 13, marginBottom: 12 }}>Quick starters:</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {(SUGGESTIONS[selectedExam.id] ?? []).map((s) => (
                      <button key={s} onClick={() => setInput(s)} style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 20, padding: "6px 14px", fontSize: 13, cursor: "pointer" }}>{s}</button>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, flexDirection: m.role === "user" ? "row-reverse" : "row", alignItems: "flex-start" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: m.role === "user" ? "#0070f3" : selectedExam.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "white" }}>
                      {m.role === "user" ? "U" : selectedExam.icon}
                    </div>
                    <div style={{ background: m.role === "user" ? "#0070f3" : "#1e293b", color: "white", padding: "12px 16px", borderRadius: 14, maxWidth: "78%", fontSize: 15, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: selectedExam.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "white", flexShrink: 0 }}>{selectedExam.icon}</div>
                    <div style={{ background: "#1e293b", padding: "12px 16px", borderRadius: 14, color: "#64748b", fontStyle: "italic", fontSize: 14 }}>Thinking...</div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>
            <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: "rgba(15,23,42,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid #1e293b", padding: "14px 20px" }}>
              <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 10 }}>
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()} placeholder={"Ask your " + selectedExam.label + " question..."} style={{ flex: 1, padding: "13px 18px", borderRadius: 12, border: "1px solid #334155", background: "#1e293b", color: "white", fontSize: 15, outline: "none", fontFamily: "inherit" }} />
                <button onClick={send} disabled={loading} style={{ padding: "13px 28px", background: selectedExam.color, color: "white", border: "none", borderRadius: 12, cursor: loading ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 15, opacity: loading ? 0.7 : 1 }}>Send</button>
              </div>
              <p style={{ textAlign: "center", color: "#334155", fontSize: 11, margin: "6px 0 0" }}>Powered by Prenclex AI Â· {selectedExam.label} mode Â· For study purposes only</p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
