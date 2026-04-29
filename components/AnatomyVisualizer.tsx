"use client";
import React, { useState } from "react";

const ORGANS = [
  { id:"heart", name:"Heart", frameId:"752aa7cc2c5d42fcb654645c599bf9dd", title:"Heart with Reflected Auricles", sys:"Cardiovascular System", color:"#E24B4A", vitals:"HR: 60-100 bpm  |  CO: 4-8 L/min", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"CCRN",bg:"#EEEDFE",text:"#534AB7"}], labs:[{n:"Troponin I",v:"<0.04 ng/mL",s:"ok"},{n:"BNP",v:"<100 pg/mL",s:"ok"},{n:"K+",v:"3.5-5.0 mEq/L",s:"ok"},{n:"PT/INR",v:"0.8-1.2",s:"ok"}], meds:[{n:"Metoprolol",c:"Beta blocker",note:"Hold if HR <60 or SBP <90"},{n:"Furosemide",c:"Loop diuretic",note:"Monitor K+ and urine output"},{n:"Warfarin",c:"Anticoagulant",note:"Target INR 2-3; check daily"}] },
  { id:"lungs", name:"Lungs", frameId:"7dcd1ef3ff0a42e1b10f90391c8cb1a2", title:"Human Right Lung: 3D Cadaver Scan", sys:"Respiratory System", color:"#378ADD", vitals:"SpO2: 95-100%  |  RR: 12-20/min", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"TEAS 7",bg:"#FAEEDA",text:"#854F0B"}], labs:[{n:"PaO2",v:"80-100 mmHg",s:"ok"},{n:"PaCO2",v:"35-45 mmHg",s:"ok"},{n:"pH",v:"7.35-7.45",s:"ok"},{n:"SpO2",v:"95-100%",s:"ok"}], meds:[{n:"Albuterol",c:"Beta-2 agonist",note:"Monitor HR; teach MDI technique"},{n:"Budesonide",c:"Inhaled corticosteroid",note:"Rinse mouth after use"},{n:"Tiotropium",c:"Anticholinergic",note:"COPD maintenance only"}] },
  { id:"brain", name:"Brain", frameId:"95b4e19bb32c4edeb46fcb3db048037c", title:"Human Brain with Internal Structures", sys:"Nervous System", color:"#7F77DD", vitals:"ICP: 5-15 mmHg  |  GCS: 15/15", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"CCRN",bg:"#EEEDFE",text:"#534AB7"},{l:"FNP",bg:"#E1F5EE",text:"#0F6E56"}], labs:[{n:"ICP",v:"5-15 mmHg",s:"ok"},{n:"GCS",v:"15/15",s:"ok"},{n:"Na+",v:"135-145 mEq/L",s:"ok"},{n:"Osmolality",v:"285-295 mOsm/kg",s:"ok"}], meds:[{n:"Mannitol",c:"Osmotic diuretic",note:"Monitor ICP and urine output hourly"},{n:"Phenytoin",c:"Anticonvulsant",note:"Level 10-20 mcg/mL"},{n:"Dexamethasone",c:"Corticosteroid",note:"Monitor blood glucose"}] },
  { id:"coronary", name:"Coronary", frameId:"ae519ae087124a79b40ef5eedb85992d", title:"Coronary Arteries", sys:"Cardiovascular System", color:"#E24B4A", vitals:"HR: 60-100 bpm  |  MAP: 70-100 mmHg", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"CCRN",bg:"#EEEDFE",text:"#534AB7"}], labs:[{n:"Troponin I",v:"<0.04 ng/mL",s:"ok"},{n:"CK-MB",v:"<6.3 ng/mL",s:"ok"},{n:"LDL",v:"<100 mg/dL",s:"ok"},{n:"HDL",v:">40 mg/dL",s:"ok"}], meds:[{n:"Aspirin",c:"Antiplatelet",note:"325mg stat for ACS; monitor GI bleed"},{n:"Nitroglycerin",c:"Vasodilator",note:"Hold if SBP <90; max 3 doses q5min"},{n:"Heparin",c:"Anticoagulant",note:"Monitor aPTT 60-100 sec"}] },
  { id:"skull", name:"Skull", frameId:"d1d1aed420424c8db784391ad8261a2f", title:"Human Skull: Schematically Colored", sys:"Musculoskeletal System", color:"#888780", vitals:"ICP: 5-15 mmHg  |  CSF: 60-150 mmH2O", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"TEAS 7",bg:"#FAEEDA",text:"#854F0B"},{l:"HESI A2",bg:"#EAF3DE",text:"#3B6D11"}], labs:[{n:"CSF pressure",v:"60-150 mmH2O",s:"ok"},{n:"CSF protein",v:"15-45 mg/dL",s:"ok"},{n:"Ca2+",v:"8.5-10.5 mg/dL",s:"ok"},{n:"CSF glucose",v:"50-80 mg/dL",s:"ok"}], meds:[{n:"Acetazolamide",c:"CA inhibitor",note:"Reduces CSF production; monitor K+"},{n:"Mannitol",c:"Osmotic diuretic",note:"Reduces ICP; monitor osmolality"},{n:"Morphine",c:"Opioid",note:"Monitor RR; keep above 12/min"}] },
  { id:"cerebellum", name:"Cerebellum", frameId:"3d882e787ca34acaa1e595d492938e1b", title:"Left Cerebellar Hemisphere", sys:"Nervous System", color:"#7F77DD", vitals:"ICP: 5-15 mmHg  |  GCS: 15/15", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"CCRN",bg:"#EEEDFE",text:"#534AB7"}], labs:[{n:"ICP",v:"5-15 mmHg",s:"ok"},{n:"GCS",v:"15/15",s:"ok"},{n:"Glucose",v:"70-100 mg/dL",s:"ok"},{n:"Na+",v:"135-145 mEq/L",s:"ok"}], meds:[{n:"Dexamethasone",c:"Corticosteroid",note:"Reduce cerebral edema; monitor glucose"},{n:"Ondansetron",c:"Antiemetic",note:"Cerebellar lesions cause severe nausea"},{n:"Mannitol",c:"Osmotic diuretic",note:"Elevated ICP management"}] },
  { id:"heart2", name:"Heart+PV", frameId:"e9dce4a4ec5e41d38d68f677da7aa0cc", title:"Heart with Pulmonary Vessels", sys:"Cardiovascular System", color:"#E24B4A", vitals:"PA: 15-25 mmHg  |  PCWP: 6-12 mmHg", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"CCRN",bg:"#EEEDFE",text:"#534AB7"}], labs:[{n:"BNP",v:"<100 pg/mL",s:"ok"},{n:"PA pressure",v:"15-25 mmHg",s:"ok"},{n:"PCWP",v:"6-12 mmHg",s:"ok"},{n:"SVR",v:"800-1200 dynes",s:"ok"}], meds:[{n:"Sildenafil",c:"PDE5 inhibitor",note:"Pulmonary HTN; monitor BP"},{n:"Epoprostenol",c:"Prostacyclin",note:"Continuous IV; never stop abruptly"},{n:"Furosemide",c:"Loop diuretic",note:"Right HF with congestion"}] },
  { id:"plastheart", name:"Plastinated", frameId:"752aa7cc2c5d42fcb654645c599bf9dd", title:"Human Plastinated Heart: 3D Scan", sys:"Cardiovascular System", color:"#E24B4A", vitals:"HR: 60-100 bpm  |  EF: 55-70%", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"CCRN",bg:"#EEEDFE",text:"#534AB7"}], labs:[{n:"Ejection fraction",v:"55-70%",s:"ok"},{n:"Troponin",v:"<0.04 ng/mL",s:"ok"},{n:"BNP",v:"<100 pg/mL",s:"ok"},{n:"K+",v:"3.5-5.0 mEq/L",s:"ok"}], meds:[{n:"Carvedilol",c:"Beta blocker",note:"HF; titrate slowly upward"},{n:"Sacubitril/Valsartan",c:"ARNI",note:"HFrEF; monitor K+ and BP"},{n:"Spironolactone",c:"Aldosterone antagonist",note:"Avoid if K+ >5.0 mEq/L"}] },
  { id:"mandible", name:"Mandible", frameId:"d012ecee2fda4f4abcabb792e92aa9ed", title:"Human Mandible Anatomy", sys:"Musculoskeletal System", color:"#888780", vitals:"ROM: 35-55mm  |  TMJ: normal", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"TEAS 7",bg:"#FAEEDA",text:"#854F0B"}], labs:[{n:"Ca2+",v:"8.5-10.5 mg/dL",s:"ok"},{n:"Phosphorus",v:"2.5-4.5 mg/dL",s:"ok"},{n:"ALP",v:"44-147 IU/L",s:"ok"},{n:"PTH",v:"15-65 pg/mL",s:"ok"}], meds:[{n:"Alendronate",c:"Bisphosphonate",note:"Jaw osteonecrosis risk; dental check first"},{n:"Calcium carbonate",c:"Calcium supplement",note:"Take with food; constipation risk"},{n:"Vitamin D",c:"Fat-soluble vitamin",note:"Required for Ca absorption"}] },
  { id:"femoral", name:"Femoral A.", frameId:"a7fa186b2bb141f183d4a277919fcc84", title:"Right Femoral Artery: Occlusion", sys:"Vascular System", color:"#E24B4A", vitals:"ABI: >0.9  |  Pulse: present", courses:[{l:"NCLEX-RN",bg:"#FCEBEB",text:"#A32D2D"},{l:"CCRN",bg:"#EEEDFE",text:"#534AB7"}], labs:[{n:"ABI",v:">0.9 normal",s:"ok"},{n:"PT/INR",v:"0.8-1.2",s:"ok"},{n:"aPTT",v:"25-35 seconds",s:"ok"},{n:"Hgb",v:"12-17 g/dL",s:"ok"}], meds:[{n:"Heparin",c:"Anticoagulant",note:"Monitor aPTT 60-100 sec; no IM"},{n:"tPA",c:"Thrombolytic",note:"Monitor bleeding q1h"},{n:"Clopidogrel",c:"Antiplatelet",note:"Hold 5-7 days pre-op"}] },
];

async function callAI(prompt: string, jsonMode = false): Promise<string> {
  const system = jsonMode ? "Return only valid JSON. No backticks." : "You are a clinical nursing educator. Plain text only. No markdown. Use numbers for lists.";
  try {
    const res = await fetch("/api/chat", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ messages:[{role:"system",content:system},{role:"user",content:prompt}] }) });
    const d = await res.json();
    return d.reply ?? "Could not generate.";
  } catch { return "Connection error. Try again."; }
}

function Dots() {
  return <div style={{display:"inline-flex",gap:4,padding:"8px 0"}}>{[0,1,2].map(i=><span key={i} style={{width:5,height:5,borderRadius:"50%",background:"#38bdf8",display:"inline-block",animation:`dot .8s ease-in-out ${i*.15}s infinite`}}/>)}</div>;
}

function GBtn({onClick,label}:{onClick:()=>void;label:string}) {
  return <button onClick={onClick} style={{width:"100%",padding:8,borderRadius:8,background:"rgba(14,165,233,0.1)",border:"1px solid rgba(14,165,233,0.25)",color:"#38bdf8",cursor:"pointer",fontSize:11,fontWeight:500,marginTop:8}}>{label}</button>;
}

export default function AnatomyVisualizer() {
  const [cur, setCur] = useState(ORGANS[0]);
  const [tab, setTab] = useState("learn");
  const [diff, setDiff] = useState("medium");
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState("");
  const [learnTxt, setLearnTxt] = useState("");
  const [learnLoad, setLearnLoad] = useState(false);
  const [q, setQ] = useState<{question:string;options:{A:string;B:string;C:string;D:string};answer:string;rationale:string}|null>(null);
  const [qLoad, setQLoad] = useState(false);
  const [ans, setAns] = useState("");
  const [genTxt, setGenTxt] = useState("");
  const [genLoad, setGenLoad] = useState(false);

  function pick(o: typeof ORGANS[0]) { setCur(o); setLoading(true); setLearnTxt(""); setGenTxt(""); setQ(null); setAns(""); setTopic(""); }
  function swTab(t: string) { setTab(t); setLearnTxt(""); setGenTxt(""); setQ(null); setAns(""); setTopic(""); }

  async function runLearn(t: string) {
    setTopic(t); setLearnLoad(true); setLearnTxt("");
    const ps: Record<string,string> = {
      overview:`Anatomy overview of the ${cur.name}: exact location, size, key structures. 90 words max.`,
      physiology:`Key physiology of the ${cur.name}: how it works, normal values. 100 words max.`,
      pathology:`4 most NCLEX-tested diseases of the ${cur.name}. Name, hallmark sign, priority nursing action. Numbered.`,
      nursing:`Nursing care priorities for ${cur.name} dysfunction: assessments, interventions, when to call provider. 100 words.`,
      nclex:`5 highest-yield NCLEX facts about the ${cur.name}. Numbered. One sentence each.`,
    };
    setLearnTxt(await callAI(ps[t])); setLearnLoad(false);
  }

  async function genQ() {
    setQLoad(true); setQ(null); setAns("");
    const dd: Record<string,string> = {easy:"straightforward recall",medium:"clinical application",hard:"complex priority with subtle distractors"};
    try {
      const raw = await callAI(`One ${diff}-difficulty NCLEX-RN question about the ${cur.name}. Difficulty: ${dd[diff]}. Return ONLY JSON: {"question":"...","options":{"A":"...","B":"...","C":"...","D":"..."},"answer":"A","rationale":"..."}`, true);
      setQ(JSON.parse(raw.replace(/```json|```/g,"").trim()));
    } catch { setLearnTxt("Error. Try again."); }
    setQLoad(false);
  }

  async function runGen(t: string) {
    setGenLoad(true); setGenTxt("");
    const ps: Record<string,string> = {
      labs:`When ${cur.name} lab values are abnormal, what does the nurse monitor and prioritize? Key actions for critical values. 90 words.`,
      meds:`Key nursing considerations when giving medications for ${cur.name} conditions: assess before giving, safety checks, patient teaching. 90 words.`,
    };
    setGenTxt(await callAI(ps[t])); setGenLoad(false);
  }

  const src = `https://sketchfab.com/models/${cur.frameId}/embed?autospin=0&autostart=1&preload=1&ui_theme=dark&ui_infos=0&ui_watermark=0&ui_watermark_link=0&ui_ar=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_annotations=0&ui_stop=0&dnt=1`;
  const TOPICS = [{id:"overview",l:"Overview - anatomy & location"},{id:"physiology",l:"Physiology - how it works"},{id:"pathology",l:"Key diseases & disorders"},{id:"nursing",l:"Nursing assessment & care"},{id:"nclex",l:"High-yield NCLEX facts"}];

  return (
    <div style={{width:"100%",background:"#060d1a",borderRadius:16,overflow:"hidden",border:"1px solid rgba(255,255,255,0.06)",fontFamily:"system-ui,sans-serif"}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes dot{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}`}</style>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",background:"rgba(4,8,15,0.95)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{fontSize:9,fontFamily:"monospace",color:"rgba(14,165,233,0.6)",background:"rgba(14,165,233,0.08)",border:"1px solid rgba(14,165,233,0.15)",borderRadius:4,padding:"3px 8px",letterSpacing:".1em"}}>SGU MEDART LAB</div>
          <div>
            <div style={{fontSize:13,fontWeight:500,color:"white"}}>{cur.title}</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,0.25)",fontFamily:"monospace"}}>St. Georges University - Certified Medical Model</div>
          </div>
        </div>
        <div style={{fontSize:9,fontFamily:"monospace",color:"rgba(14,165,233,0.5)",textAlign:"right",lineHeight:1.8}}>{cur.vitals.split("|").map((v,i)=><div key={i}>{v.trim()}</div>)}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"72px 1fr 300px",minHeight:580}}>
        <div style={{background:"#070e1d",borderRight:"1px solid rgba(255,255,255,0.05)",display:"flex",flexDirection:"column",alignItems:"center",padding:"12px 0",gap:3,overflowY:"auto"}}>
          <div style={{fontSize:8,color:"rgba(255,255,255,0.2)",textTransform:"uppercase",letterSpacing:".1em",marginBottom:8}}>Organs</div>
          {ORGANS.map(o=>(
            <button key={o.id} onClick={()=>pick(o)} style={{width:56,height:56,borderRadius:10,border:`1px solid ${cur.id===o.id?"rgba(14,165,233,0.4)":"transparent"}`,background:cur.id===o.id?"rgba(14,165,233,0.08)":"rgba(255,255,255,0.02)",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,padding:4}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:o.color}}/>
              <div style={{fontSize:8,color:cur.id===o.id?"#38bdf8":"rgba(255,255,255,0.35)",textAlign:"center",lineHeight:1.2}}>{o.name}</div>
            </button>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",background:"#04080f"}}>
          <div style={{flex:1,position:"relative"}}>
            {loading&&<div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#04080f",zIndex:2}}>
              <div style={{width:36,height:36,border:"2px solid rgba(14,165,233,0.15)",borderTopColor:"#0ea5e9",borderRadius:"50%",animation:"spin .8s linear infinite",marginBottom:12}}/>
              <div style={{fontSize:10,fontFamily:"monospace",color:"rgba(14,165,233,0.5)",letterSpacing:".1em"}}>LOADING 3D MODEL</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.2)",marginTop:4,fontFamily:"monospace"}}>St. Georges University Medical School</div>
            </div>}
            <iframe key={cur.frameId} src={src} style={{width:"100%",height:"100%",minHeight:460,border:"none",display:"block"}} allow="autoplay; fullscreen; xr-spatial-tracking" allowFullScreen onLoad={()=>setTimeout(()=>setLoading(false),800)} title={cur.title}/>
          </div>
          <div style={{display:"flex",gap:6,padding:"10px 14px",background:"rgba(4,8,15,0.95)",borderTop:"1px solid rgba(255,255,255,0.04)",flexWrap:"wrap",flexShrink:0}}>
            <span style={{fontSize:9,color:"rgba(255,255,255,0.2)",fontFamily:"monospace",alignSelf:"center"}}>CONTROLS:</span>
            {["Drag to rotate","Scroll to zoom","Right-click to pan"].map(t=><div key={t} style={{fontSize:10,padding:"4px 10px",borderRadius:6,border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.4)",fontFamily:"monospace"}}>{t}</div>)}
          </div>
        </div>
        <div style={{background:"#070e1d",borderLeft:"1px solid rgba(255,255,255,0.05)",display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{padding:"12px 14px",borderBottom:"1px solid rgba(255,255,255,0.05)",flexShrink:0}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:cur.color}}/>
              <div style={{fontSize:16,fontWeight:500,color:"white"}}>{cur.name}</div>
            </div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>{cur.sys}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>{cur.courses.map(c=><span key={c.l} style={{fontSize:9,padding:"2px 8px",borderRadius:20,fontWeight:500,background:c.bg+"33",color:c.text,border:`1px solid ${c.text}44`}}>{c.l}</span>)}</div>
            <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(29,158,117,0.08)",border:"1px solid rgba(29,158,117,0.2)",borderRadius:20,padding:"3px 10px"}}>
              <span style={{fontSize:9,color:"#5DCAA5",fontFamily:"monospace"}}>Verified - SGU Medical School</span>
            </div>
          </div>
          <div style={{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.05)",flexShrink:0}}>
            {["learn","quiz","labs","meds"].map(t=><button key={t} onClick={()=>swTab(t)} style={{flex:1,padding:"9px 4px",fontSize:10,textAlign:"center",cursor:"pointer",color:tab===t?"#38bdf8":"rgba(255,255,255,0.3)",border:"none",background:"none",borderBottom:`2px solid ${tab===t?"#38bdf8":"transparent"}`,textTransform:"capitalize"}}>{t}</button>)}
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"12px 14px"}}>
            {tab==="learn"&&<>
              <div style={{fontSize:9,fontWeight:500,color:"rgba(255,255,255,0.2)",textTransform:"uppercase",letterSpacing:".1em",marginBottom:8}}>Learning mode</div>
              {TOPICS.map(t=><button key={t.id} onClick={()=>runLearn(t.id)} style={{width:"100%",textAlign:"left",padding:"8px 10px",borderRadius:8,border:`1px solid ${topic===t.id?"rgba(14,165,233,0.3)":"rgba(255,255,255,0.06)"}`,background:topic===t.id?"rgba(14,165,233,0.08)":"rgba(255,255,255,0.02)",cursor:"pointer",fontSize:11,color:topic===t.id?"#38bdf8":"rgba(255,255,255,0.55)",marginBottom:5}}>{t.l}</button>)}
              <div style={{height:1,background:"rgba(255,255,255,0.05)",margin:"10px 0"}}/>
              {learnLoad&&<Dots/>}
              {!learnLoad&&learnTxt&&<p style={{fontSize:11,color:"rgba(255,255,255,0.7)",lineHeight:1.75,whiteSpace:"pre-wrap"}}>{learnTxt}</p>}
              {!learnLoad&&!learnTxt&&<p style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>Choose a topic above to generate your AI lesson.</p>}
            </>}
            {tab==="quiz"&&<>
              <div style={{fontSize:9,fontWeight:500,color:"rgba(255,255,255,0.2)",textTransform:"uppercase",letterSpacing:".1em",marginBottom:8}}>Exam practice</div>
              <div style={{display:"flex",gap:4,marginBottom:10}}>
                {["easy","medium","hard"].map(d=><button key={d} onClick={()=>setDiff(d)} style={{flex:1,padding:5,borderRadius:6,border:`1px solid ${diff===d?"rgba(14,165,233,0.3)":"rgba(255,255,255,0.06)"}`,background:diff===d?"rgba(14,165,233,0.12)":"rgba(255,255,255,0.02)",color:diff===d?"#38bdf8":"rgba(255,255,255,0.35)",fontSize:10,cursor:"pointer",textTransform:"capitalize"}}>{d}</button>)}
              </div>
              {qLoad&&<Dots/>}
              {!qLoad&&q&&<>
                <p style={{fontSize:11,color:"rgba(255,255,255,0.85)",lineHeight:1.7,fontWeight:500,marginBottom:10}}>{q.question}</p>
                {(["A","B","C","D"] as const).map(k=>{
                  let border="rgba(255,255,255,0.07)",bg="rgba(255,255,255,0.02)",color="rgba(255,255,255,0.65)";
                  if(ans){if(k===q.answer){border="rgba(29,158,117,0.4)";bg="rgba(29,158,117,0.1)";color="#5DCAA5";}else if(k===ans){border="rgba(226,75,74,0.35)";bg="rgba(226,75,74,0.08)";color="#F09595";}else color="rgba(255,255,255,0.3)";}
                  return <button key={k} disabled={!!ans} onClick={()=>setAns(k)} style={{width:"100%",textAlign:"left",padding:"8px 10px",borderRadius:8,border:`1px solid ${border}`,background:bg,cursor:ans?"default":"pointer",fontSize:11,color,marginBottom:5,lineHeight:1.4}}><span style={{fontWeight:500,marginRight:6}}>{k})</span>{q.options[k]}</button>;
                })}
                {ans&&<div style={{marginTop:8,padding:10,borderRadius:8,background:ans===q.answer?"rgba(29,158,117,0.08)":"rgba(226,75,74,0.07)",border:`1px solid ${ans===q.answer?"rgba(29,158,117,0.25)":"rgba(226,75,74,0.2)"}`,fontSize:11,color:"rgba(255,255,255,0.65)",lineHeight:1.65}}><span style={{fontWeight:600}}>{ans===q.answer?"Correct. ":"Incorrect. "}</span>{q.rationale}</div>}
                {ans&&<GBtn onClick={genQ} label="Next question"/>}
              </>}
              {!qLoad&&!q&&<GBtn onClick={genQ} label="Generate NCLEX question"/>}
            </>}
            {tab==="labs"&&<>
              <div style={{fontSize:9,fontWeight:500,color:"rgba(255,255,255,0.2)",textTransform:"uppercase",letterSpacing:".1em",marginBottom:8}}>Reference lab values</div>
              {cur.labs.map(l=><div key={l.n} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,0.04)",fontSize:11}}><span style={{color:"rgba(255,255,255,0.35)"}}>{l.n}</span><span style={{fontFamily:"monospace",color:l.s==="ok"?"#5DCAA5":l.s==="warn"?"#EF9F27":"#E24B4A"}}>{l.v}</span></div>)}
              <div style={{height:1,background:"rgba(255,255,255,0.05)",margin:"10px 0"}}/>
              <GBtn onClick={()=>runGen("labs")} label="AI clinical interpretation"/>
              {genLoad&&<Dots/>}
              {!genLoad&&genTxt&&<p style={{fontSize:11,color:"rgba(255,255,255,0.7)",lineHeight:1.75,whiteSpace:"pre-wrap",marginTop:8}}>{genTxt}</p>}
            </>}
            {tab==="meds"&&<>
              <div style={{fontSize:9,fontWeight:500,color:"rgba(255,255,255,0.2)",textTransform:"uppercase",letterSpacing:".1em",marginBottom:8}}>Key medications</div>
              {cur.meds.map(m=><div key={m.n} style={{padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}><div style={{fontSize:11,color:"white",fontWeight:500,marginBottom:2}}>{m.n}</div><div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginBottom:3}}>{m.c}</div><div style={{fontSize:10,color:"rgba(56,189,248,0.65)",lineHeight:1.5}}>{m.note}</div></div>)}
              <div style={{height:1,background:"rgba(255,255,255,0.05)",margin:"10px 0"}}/>
              <GBtn onClick={()=>runGen("meds")} label="AI pharmacology deep dive"/>
              {genLoad&&<Dots/>}
              {!genLoad&&genTxt&&<p style={{fontSize:11,color:"rgba(255,255,255,0.7)",lineHeight:1.75,whiteSpace:"pre-wrap",marginTop:8}}>{genTxt}</p>}
            </>}
          </div>
        </div>
      </div>
    </div>
  );
}



