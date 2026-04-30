"use client";
import { useState } from "react";

const ORGANS = [
  { id:"heart", name:"Heart", frameId:"752aa7cc2c5d42fcb654645c599bf9dd", title:"Heart with Reflected Auricles", sys:"Cardiovascular System", color:"#E24B4A", vitals:"HR: 60-100 bpm  |  CO: 4-8 L/min", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"CCRN",bg:"#EEEDFE",text:"#534AB7"}], labs:[{n:"Troponin I",v:"<0.04 ng/mL",s:"ok"},{n:"BNP",v:"<100 pg/mL",s:"ok"},{n:"K+",v:"3.5-5.0 mEq/L",s:"ok"},{n:"PT/INR",v:"0.8-1.2",s:"ok"}], meds:[{n:"Metoprolol",c:"Beta blocker",note:"Hold if HR <60 or SBP <90"},{n:"Furosemide",c:"Loop diuretic",note:"Monitor K+ and urine output"},{n:"Warfarin",c:"Anticoagulant",note:"Target INR 2-3; check daily"}] },
  { id:"lungs", name:"Lungs", frameId:"7dcd1ef3ff0a42e1b10f90391c8cb1a2", title:"Human Right Lung: 3D Cadaver Scan", sys:"Respiratory System", color:"#378ADD", vitals:"SpO2: 95-100%  |  RR: 12-20/min", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"TEAS 7",bg:"#FAEEDA",text:"#854F0B"}], labs:[{n:"PaO2",v:"80-100 mmHg",s:"ok"},{n:"PaCO2",v:"35-45 mmHg",s:"ok"},{n:"pH",v:"7.35-7.45",s:"ok"},{n:"SpO2",v:"95-100%",s:"ok"}], meds:[{n:"Albuterol",c:"Beta-2 agonist",note:"Monitor HR; teach MDI technique"},{n:"Budesonide",c:"Inhaled corticosteroid",note:"Rinse mouth after use"},{n:"Tiotropium",c:"Anticholinergic",note:"COPD maintenance only"}] },
  { id:"brain", name:"Brain", frameId:"95b4e19bb32c4edeb46fcb3db048037c", title:"Human Brain with Internal Structures", sys:"Nervous System", color:"#7F77DD", vitals:"ICP: 5-15 mmHg  |  GCS: 15/15", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"CCRN",bg:"#EEEDFE",text:"#534AB7"},{l:"FNP",bg:"#E1F5EE",text:"#0F6E56"}], labs:[{n:"ICP",v:"5-15 mmHg",s:"ok"},{n:"GCS",v:"15/15",s:"ok"},{n:"Na+",v:"135-145 mEq/L",s:"ok"},{n:"Osmolality",v:"285-295 mOsm/kg",s:"ok"}], meds:[{n:"Mannitol",c:"Osmotic diuretic",note:"Monitor ICP and urine output hourly"},{n:"Phenytoin",c:"Anticonvulsant",note:"Level 10-20 mcg/mL"},{n:"Dexamethasone",c:"Corticosteroid",note:"Monitor blood glucose"}] },
  { id:"coronary", name:"Coronary Arteries", frameId:"ae519ae087124a79b40ef5eedb85992d", title:"Coronary Arteries", sys:"Cardiovascular System", color:"#E24B4A", vitals:"HR: 60-100 bpm  |  MAP: 70-100 mmHg", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"CCRN",bg:"#EEEDFE",text:"#534AB7"}], labs:[{n:"Troponin I",v:"<0.04 ng/mL",s:"ok"},{n:"CK-MB",v:"<6.3 ng/mL",s:"ok"},{n:"LDL",v:"<100 mg/dL",s:"ok"},{n:"HDL",v:">40 mg/dL",s:"ok"}], meds:[{n:"Aspirin",c:"Antiplatelet",note:"325mg stat for ACS; monitor GI bleed"},{n:"Nitroglycerin",c:"Vasodilator",note:"Hold if SBP <90; max 3 doses q5min"},{n:"Heparin",c:"Anticoagulant",note:"Monitor aPTT 60-100 sec"}] },
  { id:"skull", name:"Skull", frameId:"d1d1aed420424c8db784391ad8261a2f", title:"Human Skull: Schematically Colored", sys:"Musculoskeletal System", color:"#888780", vitals:"ICP: 5-15 mmHg  |  CSF: 60-150 mmH2O", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"TEAS 7",bg:"#FAEEDA",text:"#854F0B"},{l:"HESI A2",bg:"#EAF3DE",text:"#3B6D11"}], labs:[{n:"CSF pressure",v:"60-150 mmH2O",s:"ok"},{n:"CSF protein",v:"15-45 mg/dL",s:"ok"},{n:"Ca2+",v:"8.5-10.5 mg/dL",s:"ok"},{n:"CSF glucose",v:"50-80 mg/dL",s:"ok"}], meds:[{n:"Acetazolamide",c:"CA inhibitor",note:"Reduces CSF production; monitor K+"},{n:"Mannitol",c:"Osmotic diuretic",note:"Reduces ICP; monitor osmolality"},{n:"Morphine",c:"Opioid",note:"Monitor RR; keep above 12/min"}] },
  { id:"cerebellum", name:"Cerebellum", frameId:"3d882e787ca34acaa1e595d492938e1b", title:"Left Cerebellar Hemisphere", sys:"Nervous System", color:"#7F77DD", vitals:"ICP: 5-15 mmHg  |  GCS: 15/15", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"CCRN",bg:"#EEEDFE",text:"#534AB7"}], labs:[{n:"ICP",v:"5-15 mmHg",s:"ok"},{n:"GCS",v:"15/15",s:"ok"},{n:"Glucose",v:"70-100 mg/dL",s:"ok"},{n:"Na+",v:"135-145 mEq/L",s:"ok"}], meds:[{n:"Dexamethasone",c:"Corticosteroid",note:"Reduce cerebral edema; monitor glucose"},{n:"Ondansetron",c:"Antiemetic",note:"Cerebellar lesions cause severe nausea"},{n:"Mannitol",c:"Osmotic diuretic",note:"Elevated ICP management"}] },
  { id:"heart2", name:"Heart + Vessels", frameId:"e9dce4a4ec5e41d38d68f677da7aa0cc", title:"Heart with Pulmonary Vessels", sys:"Cardiovascular System", color:"#E24B4A", vitals:"PA: 15-25 mmHg  |  PCWP: 6-12 mmHg", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"CCRN",bg:"#EEEDFE",text:"#534AB7"}], labs:[{n:"BNP",v:"<100 pg/mL",s:"ok"},{n:"PA pressure",v:"15-25 mmHg",s:"ok"},{n:"PCWP",v:"6-12 mmHg",s:"ok"},{n:"SVR",v:"800-1200 dynes",s:"ok"}], meds:[{n:"Sildenafil",c:"PDE5 inhibitor",note:"Pulmonary HTN; monitor BP"},{n:"Epoprostenol",c:"Prostacyclin",note:"Continuous IV; never stop abruptly"},{n:"Furosemide",c:"Loop diuretic",note:"Right HF with congestion"}] },
  { id:"mandible", name:"Mandible", frameId:"d012ecee2fda4f4abcabb792e92aa9ed", title:"Human Mandible Anatomy", sys:"Musculoskeletal System", color:"#888780", vitals:"ROM: 35-55mm  |  TMJ: normal", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"TEAS 7",bg:"#FAEEDA",text:"#854F0B"}], labs:[{n:"Ca2+",v:"8.5-10.5 mg/dL",s:"ok"},{n:"Phosphorus",v:"2.5-4.5 mg/dL",s:"ok"},{n:"ALP",v:"44-147 IU/L",s:"ok"},{n:"PTH",v:"15-65 pg/mL",s:"ok"}], meds:[{n:"Alendronate",c:"Bisphosphonate",note:"Jaw osteonecrosis risk; dental check first"},{n:"Calcium carbonate",c:"Calcium supplement",note:"Take with food; constipation risk"},{n:"Vitamin D",c:"Fat-soluble vitamin",note:"Required for Ca absorption"}] },
  { id:"femoral", name:"Femoral Artery", frameId:"a7fa186b2bb141f183d4a277919fcc84", title:"Right Femoral Artery: Occlusion", sys:"Vascular System", color:"#E24B4A", vitals:"ABI: >0.9  |  Pulse: present", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"CCRN",bg:"#EEEDFE",text:"#534AB7"}], labs:[{n:"ABI",v:">0.9 normal",s:"ok"},{n:"PT/INR",v:"0.8-1.2",s:"ok"},{n:"aPTT",v:"25-35 seconds",s:"ok"},{n:"Hgb",v:"12-17 g/dL",s:"ok"}], meds:[{n:"Heparin",c:"Anticoagulant",note:"Monitor aPTT 60-100 sec; no IM"},{n:"tPA",c:"Thrombolytic",note:"Monitor bleeding q1h"},{n:"Clopidogrel",c:"Antiplatelet",note:"Hold 5-7 days pre-op"}] },
];

const COURSES = [
  {id:"nclex-rn",label:"NCLEX-RN",color:"#0ea5e9",topics:["Priority nursing interventions","SATA questions","Pharmacology mnemonics","ABG interpretation","Fluid & electrolytes","Management of care"]},
  {id:"nclex-pn",label:"NCLEX-PN",color:"#6366f1",topics:["PN scope of practice","Basic nursing care","Medication administration","Patient education","Coordinated care"]},
  {id:"teas",label:"TEAS 7",color:"#f59e0b",topics:["A&P fundamentals","Biology concepts","Chemistry basics","Scientific reasoning","Human body systems"]},
  {id:"hesi",label:"HESI A2",color:"#10b981",topics:["Anatomy & physiology","Medical terminology","Biology review","Chemistry review","Health professions"]},
  {id:"ccrn",label:"CCRN",color:"#ef4444",topics:["Hemodynamic monitoring","Ventilator management","ICU pharmacology","Cardiac arrhythmias","Sepsis management","Neurological assessment"]},
  {id:"fnp",label:"FNP",color:"#8b5cf6",topics:["Primary care management","Advanced pharmacology","Differential diagnosis","Chronic disease management","Preventive care"]},
];

const TOPICS = [
  {id:"overview",label:"Overview — anatomy & location"},
  {id:"physiology",label:"Physiology — how it works"},
  {id:"pathology",label:"Key diseases & disorders"},
  {id:"nursing",label:"Nursing assessment & care"},
  {id:"nclex",label:"High-yield NCLEX facts"},
];

// what is currently filling the main space
type View = "3d" | "learn" | "quiz" | "labs" | "meds";

async function callAI(prompt: string, jsonMode = false): Promise<string> {
  const system = jsonMode
    ? "Return only valid JSON. No backticks."
    : "You are a clinical nursing educator. Plain text only. No markdown. Use numbers for lists.";
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "system", content: system }, { role: "user", content: prompt }] }),
    });
    const d = await res.json();
    return d.reply ?? "Could not generate.";
  } catch {
    return "Connection error. Try again.";
  }
}

function Spinner() {
  return (
    <div style={{ display: "inline-flex", gap: 5, padding: "10px 0" }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#0ea5e9", display: "inline-block", animation: `dot .8s ease-in-out ${i * 0.15}s infinite` }} />
      ))}
    </div>
  );
}

export default function AnatomyVisualizer() {
  const [cur, setCur] = useState(ORGANS[0]);
  const [view, setView] = useState<View>("3d");
  const [frameLoad, setFrameLoad] = useState(true);

  // learn
  const [learnTxt, setLearnTxt] = useState("");
  const [learnLoad, setLearnLoad] = useState(false);
  const [activeTopic, setActiveTopic] = useState("");
  const [activeCourse, setActiveCourse] = useState("");

  // quiz
  const [diff, setDiff] = useState("medium");
  const [q, setQ] = useState<{ question: string; options: { A: string; B: string; C: string; D: string }; answer: string; rationale: string } | null>(null);
  const [qLoad, setQLoad] = useState(false);
  const [ans, setAns] = useState("");

  // labs/meds ai
  const [genTxt, setGenTxt] = useState("");
  const [genLoad, setGenLoad] = useState(false);

  function pickOrgan(o: typeof ORGANS[0]) {
    setCur(o);
    setFrameLoad(true);
    setView("3d"); // clicking organ → 3D takes over
    setLearnTxt(""); setGenTxt(""); setQ(null); setAns("");
    setActiveTopic(""); setActiveCourse("");
  }

  function goLearn() { setView("learn"); setLearnTxt(""); setActiveTopic(""); }
  function goQuiz() { setView("quiz"); setQ(null); setAns(""); }
  function goLabs() { setView("labs"); setGenTxt(""); }
  function goMeds() { setView("meds"); setGenTxt(""); }
  function go3D() { setView("3d"); }

  async function runLearn(topicId: string, customPrompt?: string) {
    setActiveTopic(topicId);
    setLearnLoad(true);
    setLearnTxt("");
    setView("learn");
    const ps: Record<string, string> = {
      overview: `Anatomy overview of the ${cur.name}: exact location, size, key structures. 90 words max.`,
      physiology: `Key physiology of the ${cur.name}: how it works, normal values. 100 words max.`,
      pathology: `4 most NCLEX-tested diseases of the ${cur.name}. Name, hallmark sign, priority nursing action. Numbered.`,
      nursing: `Nursing care priorities for ${cur.name} dysfunction: assessments, interventions, when to call provider. 100 words.`,
      nclex: `5 highest-yield NCLEX facts about the ${cur.name}. Numbered. One sentence each.`,
    };
    const prompt = customPrompt ?? ps[topicId] ?? ps.overview;
    setLearnTxt(await callAI(prompt));
    setLearnLoad(false);
  }

  async function runCourseTopic(course: string, topic: string) {
    setActiveCourse(course);
    setActiveTopic(topic);
    setLearnLoad(true);
    setLearnTxt("");
    setView("learn");
    const prompt = `You are an expert ${course} nursing educator. The student is studying the ${cur.name} (${cur.sys}). Topic: "${topic}". Provide a focused, exam-specific lesson for ${course}. 120 words max. Plain text only. Use numbers for lists.`;
    setLearnTxt(await callAI(prompt));
    setLearnLoad(false);
  }

  async function genQ() {
    setQLoad(true); setQ(null); setAns(""); setView("quiz");
    const dd: Record<string, string> = { easy: "straightforward recall", medium: "clinical application", hard: "complex priority with subtle distractors" };
    try {
      const raw = await callAI(`One ${diff}-difficulty NCLEX-RN question about the ${cur.name}. Difficulty: ${dd[diff]}. Return ONLY JSON: {"question":"...","options":{"A":"...","B":"...","C":"...","D":"..."},"answer":"A","rationale":"..."}`, true);
      setQ(JSON.parse(raw.replace(/```json|```/g, "").trim()));
    } catch { setLearnTxt("Error. Try again."); }
    setQLoad(false);
  }

  async function runGen(type: string) {
    setGenLoad(true); setGenTxt("");
    const ps: Record<string, string> = {
      labs: `When ${cur.name} lab values are abnormal, what does the nurse monitor and prioritize? Key actions for critical values. 90 words.`,
      meds: `Key nursing considerations when giving medications for ${cur.name} conditions: assess before giving, safety checks, patient teaching. 90 words.`,
    };
    setGenTxt(await callAI(ps[type]));
    setGenLoad(false);
  }

  const src = `https://sketchfab.com/models/${cur.frameId}/embed?autospin=0&autostart=1&preload=1&ui_theme=dark&ui_infos=0&ui_watermark=0&ui_watermark_link=0&ui_ar=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_annotations=0&ui_stop=0&dnt=1`;

  const BTN = (label: string, active: boolean, onClick: () => void, color = "#0ea5e9") => (
    <button onClick={onClick} style={{ padding: "9px 18px", borderRadius: 8, border: `1px solid ${active ? color : "rgba(255,255,255,0.1)"}`, background: active ? color + "22" : "rgba(255,255,255,0.03)", color: active ? color : "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 13, fontWeight: active ? 700 : 400, transition: "all .15s" }}>
      {label}
    </button>
  );

  return (
    <div style={{ display: "flex", height: "calc(100vh - 60px)", background: "#060d1a", fontFamily: "system-ui, sans-serif", overflow: "hidden" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes dot{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}@keyframes slideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>

      {/* ── LEFT SIDEBAR — organ list ── */}
      <div style={{ width: 160, flexShrink: 0, background: "#070e1d", borderRight: "1px solid rgba(255,255,255,0.06)", overflowY: "auto", display: "flex", flexDirection: "column", padding: "16px 10px", gap: 6 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 8, paddingLeft: 4 }}>Body structures</div>
        {ORGANS.map(o => (
          <button key={o.id} onClick={() => pickOrgan(o)}
            style={{ width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: 10, border: `2px solid ${cur.id === o.id ? o.color : "rgba(255,255,255,0.06)"}`, background: cur.id === o.id ? o.color + "18" : "rgba(255,255,255,0.02)", cursor: "pointer", transition: "all .15s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: o.color, flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: cur.id === o.id ? o.color : "white", lineHeight: 1.2 }}>{o.name}</span>
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", paddingLeft: 18 }}>{o.sys.split("/")[0]}</div>
          </button>
        ))}
      </div>

      {/* ── MAIN CONTENT — last clicked takes full space ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", background: "rgba(4,8,15,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0, flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: cur.color }} />
            <span style={{ fontSize: 15, fontWeight: 700, color: "white" }}>{cur.name}</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>{cur.sys}</span>
            <span style={{ fontSize: 9, color: "#5DCAA5", background: "rgba(29,158,117,0.08)", border: "1px solid rgba(29,158,117,0.2)", borderRadius: 20, padding: "2px 10px", fontFamily: "monospace" }}>SGU Medical School</span>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {BTN("3D Model", view === "3d", go3D, cur.color)}
            {BTN("Learn", view === "learn", goLearn)}
            {BTN("Quiz", view === "quiz", goQuiz, "#f59e0b")}
            {BTN("Lab values", view === "labs", goLabs, "#1D9E75")}
            {BTN("Medications", view === "meds", goMeds, "#8b5cf6")}
          </div>
          <div style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(14,165,233,0.5)" }}>{cur.vitals}</div>
        </div>

        {/* ── 3D VIEW — fills everything ── */}
        {view === "3d" && (
          <div style={{ flex: 1, position: "relative", background: "#04080f" }}>
            {frameLoad && (
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#04080f", zIndex: 2 }}>
                <div style={{ width: 44, height: 44, border: "2px solid rgba(14,165,233,0.15)", borderTopColor: "#0ea5e9", borderRadius: "50%", animation: "spin .8s linear infinite", marginBottom: 14 }} />
                <div style={{ fontSize: 12, fontFamily: "monospace", color: "rgba(14,165,233,0.6)", letterSpacing: ".1em", fontWeight: 600 }}>LOADING 3D MODEL</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 5 }}>St. Georges University Medical School</div>
              </div>
            )}
            <iframe key={cur.frameId} src={src} style={{ width: "100%", height: "100%", border: "none", display: "block" }} allow="autoplay; fullscreen; xr-spatial-tracking" allowFullScreen onLoad={() => setTimeout(() => setFrameLoad(false), 800)} title={cur.title} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", gap: 8, padding: "10px 16px", background: "rgba(4,8,15,0.9)", flexWrap: "wrap" }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", alignSelf: "center", fontFamily: "monospace" }}>CONTROLS:</span>
              {["Drag to rotate", "Scroll to zoom", "Right-click to pan"].map(t => (
                <span key={t} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* ── LEARN VIEW ── */}
        {view === "learn" && (
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "260px 1fr", overflow: "hidden", animation: "slideUp .25s ease" }}>
            {/* Learn sidebar */}
            <div style={{ background: "#070e1d", borderRight: "1px solid rgba(255,255,255,0.06)", overflowY: "auto", padding: "16px 12px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>General topics</div>
              {TOPICS.map(t => (
                <button key={t.id} onClick={() => runLearn(t.id)}
                  style={{ width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: 9, border: `1px solid ${activeTopic === t.id && !activeCourse ? "rgba(14,165,233,0.4)" : "rgba(255,255,255,0.06)"}`, background: activeTopic === t.id && !activeCourse ? "rgba(14,165,233,0.1)" : "rgba(255,255,255,0.02)", cursor: "pointer", fontSize: 13, color: activeTopic === t.id && !activeCourse ? "#38bdf8" : "rgba(255,255,255,0.7)", marginBottom: 5, fontWeight: activeTopic === t.id && !activeCourse ? 600 : 400 }}>
                  {t.label}
                </button>
              ))}
              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "14px 0" }} />
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>By course</div>
              {COURSES.map(c => (
                <div key={c.id} style={{ marginBottom: 8 }}>
                  <button onClick={() => setActiveCourse(activeCourse === c.id ? "" : c.id)}
                    style={{ width: "100%", textAlign: "left", padding: "9px 12px", borderRadius: 9, border: `1px solid ${activeCourse === c.id ? c.color : "rgba(255,255,255,0.06)"}`, background: activeCourse === c.id ? c.color + "18" : "rgba(255,255,255,0.02)", cursor: "pointer", fontSize: 13, color: activeCourse === c.id ? c.color : "rgba(255,255,255,0.6)", fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{c.label}</span>
                    <span style={{ fontSize: 10, opacity: .6 }}>{activeCourse === c.id ? "▲" : "▼"}</span>
                  </button>
                  {activeCourse === c.id && (
                    <div style={{ paddingTop: 5, display: "flex", flexDirection: "column", gap: 3 }}>
                      {c.topics.map(t => (
                        <button key={t} onClick={() => runCourseTopic(c.label, t)}
                          style={{ width: "100%", textAlign: "left", padding: "8px 14px", borderRadius: 8, border: `1px solid ${activeTopic === t ? c.color : "rgba(255,255,255,0.05)"}`, background: activeTopic === t ? c.color + "12" : "rgba(255,255,255,0.01)", cursor: "pointer", fontSize: 12, color: activeTopic === t ? c.color : "rgba(255,255,255,0.6)", fontWeight: activeTopic === t ? 600 : 400 }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Learn content */}
            <div style={{ overflowY: "auto", padding: "28px 36px", background: "#060d1a" }}>
              {learnLoad ? (
                <div><Spinner /></div>
              ) : learnTxt ? (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: ".1em" }}>{activeCourse || cur.sys}</span>
                    {activeTopic && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginLeft: 8 }}>→ {activeTopic}</span>}
                  </div>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 20, fontFamily: "Georgia, serif" }}>{cur.name}</h2>
                  <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.9, whiteSpace: "pre-wrap", fontFamily: "Georgia, serif" }}>{learnTxt}</p>
                  <div style={{ marginTop: 28, display: "flex", gap: 10 }}>
                    <button onClick={goQuiz} style={{ padding: "10px 22px", borderRadius: 8, background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", color: "#f59e0b", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Practice quiz →</button>
                    <button onClick={goLabs} style={{ padding: "10px 22px", borderRadius: 8, background: "rgba(29,158,117,0.1)", border: "1px solid rgba(29,158,117,0.3)", color: "#1D9E75", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Check lab values →</button>
                  </div>
                </>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center" }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>📖</div>
                  <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>Select a topic or course from the left panel<br />to generate your AI-powered lesson.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── QUIZ VIEW ── */}
        {view === "quiz" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#f8fafc", animation: "slideUp .25s ease", overflow: "hidden" }}>

            {/* Quiz header — always visible */}
            <div style={{ padding: "18px 28px 14px", background: "white", borderBottom: "1px solid #e2e8f0", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", fontFamily: "Georgia, serif", margin: 0 }}>{cur.name} — Exam Practice</h2>
                  <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Choose a course and topic to generate targeted NCLEX questions</p>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {["easy","medium","hard"].map(d => (
                    <button key={d} onClick={() => setDiff(d)}
                      style={{ padding: "6px 16px", borderRadius: 20, border: "2px solid " + (diff===d?"#f59e0b":"#e2e8f0"), background: diff===d?"#f59e0b":"white", color: diff===d?"#000":"#64748b", cursor: "pointer", fontSize: 12, fontWeight: 700, textTransform: "capitalize" as const }}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Course chips — always visible */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {COURSES.map(c => (
                  <button key={c.id} onClick={() => { setActiveCourse(activeCourse===c.id?"":c.id); setActiveTopic(""); setQ(null); setAns(""); }}
                    style={{ padding: "6px 16px", borderRadius: 20, border: "2px solid " + (activeCourse===c.id?c.color:"#e2e8f0"), background: activeCourse===c.id?c.color:"white", color: activeCourse===c.id?"white":"#475569", cursor: "pointer", fontSize: 12, fontWeight: 700, transition: "all .15s" }}>
                    {c.label}
                  </button>
                ))}
                {activeCourse && (
                  <button onClick={() => { setActiveCourse(""); setActiveTopic(""); setQ(null); setAns(""); }}
                    style={{ padding: "6px 14px", borderRadius: 20, border: "2px solid #e2e8f0", background: "white", color: "#94a3b8", cursor: "pointer", fontSize: 12 }}>
                    Clear ✕
                  </button>
                )}
              </div>
            </div>

            {/* Topic chips — shown when course selected */}
            {activeCourse && (
              <div style={{ padding: "12px 28px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", flexShrink: 0 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase" as const, letterSpacing: ".08em", marginBottom: 8 }}>
                  {COURSES.find(c=>c.id===activeCourse)?.label} — choose a topic:
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {COURSES.find(c=>c.id===activeCourse)?.topics.map(t => (
                    <button key={t} onClick={() => { setActiveTopic(t); setQ(null); setAns(""); }}
                      style={{ padding: "6px 14px", borderRadius: 20, border: "1.5px solid " + (activeTopic===t?(COURSES.find(c=>c.id===activeCourse)?.color||"#0ea5e9"):"#cbd5e1"), background: activeTopic===t?(COURSES.find(c=>c.id===activeCourse)?.color||"#0ea5e9")+"18":"white", color: activeTopic===t?(COURSES.find(c=>c.id===activeCourse)?.color||"#0ea5e9"):"#475569", cursor: "pointer", fontSize: 12, fontWeight: activeTopic===t?700:400, transition: "all .15s" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Generate button — shown when topic selected */}
            {activeCourse && activeTopic && !q && !qLoad && (
              <div style={{ padding: "16px 28px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", flexShrink: 0, display: "flex", alignItems: "center", gap: 12 }}>
                <button onClick={genQ}
                  style={{ padding: "10px 28px", borderRadius: 10, background: "#0f172a", border: "none", color: "white", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
                  Generate {diff} question →
                </button>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>{activeTopic} · {COURSES.find(c=>c.id===activeCourse)?.label}</span>
              </div>
            )}

            {/* Question display */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
              {!activeCourse && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
                  <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.7 }}>Select a course above to get started.<br/>Then choose a topic to generate your NCLEX question.</p>
                </div>
              )}
              {activeCourse && !activeTopic && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
                  <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.7 }}>Now select a topic from the list above<br/>to generate a targeted question.</p>
                </div>
              )}
              {qLoad && <div style={{ paddingTop: 20 }}><Spinner /></div>}
              {!qLoad && q && (
                <div style={{ maxWidth: 720, animation: "slideUp .25s ease" }}>
                  <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: "20px 24px", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: ".08em", marginBottom: 8 }}>
                      {COURSES.find(c=>c.id===activeCourse)?.label} · {activeTopic} · {diff}
                    </div>
                    <p style={{ fontSize: 16, color: "#0f172a", fontWeight: 600, lineHeight: 1.75, fontFamily: "Georgia, serif" }}>{q.question}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                    {(["A","B","C","D"] as const).map(k => {
                      let border="#e2e8f0", bg="white", color="#1e293b";
                      if(ans){if(k===q.answer){border="#16a34a";bg="#dcfce7";color="#15803d";}else if(k===ans){border="#dc2626";bg="#fee2e2";color="#dc2626";}else{bg="#f8fafc";color="#94a3b8";}}
                      return (
                        <button key={k} disabled={!!ans} onClick={()=>setAns(k)}
                          style={{ textAlign:"left", padding:"14px 16px", borderRadius:10, border:"1.5px solid "+border, background:bg, cursor:ans?"default":"pointer", fontSize:14, color, lineHeight:1.5, fontWeight:500, transition:"all .12s" }}>
                          <span style={{ fontWeight:800, marginRight:10 }}>{k})</span>{q.options[k]}
                        </button>
                      );
                    })}
                  </div>
                  {ans && (
                    <div style={{ padding:"16px 20px", borderRadius:12, background:ans===q.answer?"#dcfce7":"#fee2e2", border:"1.5px solid "+(ans===q.answer?"#16a34a":"#dc2626"), fontSize:15, color:ans===q.answer?"#15803d":"#dc2626", lineHeight:1.8, marginBottom:16, fontFamily:"Georgia, serif" }}>
                      <span style={{ fontWeight:800 }}>{ans===q.answer?"Correct! ":"Incorrect. "}</span>{q.rationale}
                    </div>
                  )}
                  {ans && (
                    <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                      <button onClick={genQ} style={{ padding:"11px 28px", borderRadius:8, background:"#0f172a", border:"none", color:"white", cursor:"pointer", fontSize:14, fontWeight:700 }}>Next question →</button>
                      <button onClick={goLearn} style={{ padding:"11px 22px", borderRadius:8, background:"white", border:"1.5px solid #e2e8f0", color:"#64748b", cursor:"pointer", fontSize:14 }}>Back to lessons</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── LABS VIEW ── */}
        {view === "labs" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px", background: "#060d1a", animation: "slideUp .25s ease" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 6, fontFamily: "Georgia, serif" }}>{cur.name} — Lab Values</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>Reference ranges · Clinical significance</p>
            <div style={{ maxWidth: 600, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, overflow: "hidden", marginBottom: 24 }}>
              {cur.labs.map((l, i) => (
                <div key={l.n} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: i < cur.labs.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <span style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{l.n}</span>
                  <span style={{ fontSize: 15, fontFamily: "monospace", fontWeight: 700, color: l.s === "ok" ? "#4ade80" : l.s === "warn" ? "#f59e0b" : "#f87171" }}>{l.v}</span>
                </div>
              ))}
            </div>
            <button onClick={() => { goLabs(); runGen("labs"); }} style={{ padding: "12px 28px", borderRadius: 8, background: "rgba(29,158,117,0.15)", border: "1px solid rgba(29,158,117,0.4)", color: "#4ade80", cursor: "pointer", fontSize: 14, fontWeight: 700, marginBottom: 20 }}>AI clinical interpretation →</button>
            {genLoad && <Spinner />}
            {!genLoad && genTxt && <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.9, whiteSpace: "pre-wrap", fontFamily: "Georgia, serif", maxWidth: 680 }}>{genTxt}</p>}
          </div>
        )}

        {/* ── MEDS VIEW ── */}
        {view === "meds" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px", background: "#060d1a", animation: "slideUp .25s ease" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 6, fontFamily: "Georgia, serif" }}>{cur.name} — Medications</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>Key drugs · Nursing considerations</p>
            <div style={{ maxWidth: 680, display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {cur.meds.map(m => (
                <div key={m.n} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px 20px" }}>
                  <div style={{ fontSize: 16, color: "white", fontWeight: 700, marginBottom: 4 }}>{m.n}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>{m.c}</div>
                  <div style={{ fontSize: 14, color: "rgba(56,189,248,0.8)", lineHeight: 1.6 }}>{m.note}</div>
                </div>
              ))}
            </div>
            <button onClick={() => { goMeds(); runGen("meds"); }} style={{ padding: "12px 28px", borderRadius: 8, background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.4)", color: "#a78bfa", cursor: "pointer", fontSize: 14, fontWeight: 700, marginBottom: 20 }}>AI pharmacology deep dive →</button>
            {genLoad && <Spinner />}
            {!genLoad && genTxt && <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.9, whiteSpace: "pre-wrap", fontFamily: "Georgia, serif", maxWidth: 680 }}>{genTxt}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
