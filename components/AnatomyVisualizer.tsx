"use client";
import { useState, useRef } from "react";

interface Organ {
  id: string; name: string; sys: string; color: string; bgColor: string;
  desc: string; courses: string[]; labels: string[];
}
type TabType = "visual"|"learn"|"quiz"|"labs"|"meds";
type LearnTopic = "overview"|"functions"|"pathology"|"physiology"|"nursing";
type Difficulty = "easy"|"medium"|"hard";
interface QuestionData {
  question: string;
  options: {A:string;B:string;C:string;D:string};
  answer: "A"|"B"|"C"|"D";
  rationale: string;
}

const ORGANS: Organ[] = [
  {id:"heart",name:"Heart",sys:"Cardiovascular",color:"#E24B4A",bgColor:"#FCEBEB",desc:"SA node pacemaker · 60-100 bpm · 4 chambers · Lub-dub heart sounds",courses:["NCLEX-RN","CCRN"],labels:["Right atrium","Left atrium","Right ventricle","Left ventricle","Aorta","SA node","Tricuspid valve","Mitral valve"]},
  {id:"lungs",name:"Lungs",sys:"Respiratory",color:"#378ADD",bgColor:"#E6F1FB",desc:"Gas exchange at alveoli · Right = 3 lobes, Left = 2 lobes · SpO₂ 95-100% normal",courses:["NCLEX-RN","NCLEX-PN","TEAS 7","HESI A2"],labels:["Right lung (3 lobes)","Left lung (2 lobes)","Trachea","Bronchi","Bronchioles","Alveoli","Diaphragm","Pleura"]},
  {id:"brain",name:"Brain",sys:"Nervous",color:"#7F77DD",bgColor:"#EEEDFE",desc:"100B neurons · 4 lobes · Blood-brain barrier · GCS assessment scale",courses:["NCLEX-RN","CCRN","FNP"],labels:["Frontal lobe","Parietal lobe","Temporal lobe","Occipital lobe","Cerebellum","Brainstem","Hypothalamus"]},
  {id:"kidney",name:"Kidneys",sys:"Urinary/Renal",color:"#1D9E75",bgColor:"#E1F5EE",desc:"1M nephrons each · Filters 180L/day → 1-2L urine · EPO + RAAS + Vit D activation",courses:["NCLEX-RN","NCLEX-PN","FNP","CCRN"],labels:["Cortex","Medulla","Renal pelvis","Ureter","Nephron","Glomerulus","Loop of Henle"]},
  {id:"liver",name:"Liver",sys:"Digestive/Hepatic",color:"#EF9F27",bgColor:"#FAEEDA",desc:"500+ functions · Clotting factors · Detoxification · Bile production · Albumin",courses:["NCLEX-RN","NCLEX-PN","FNP"],labels:["Right lobe","Left lobe","Portal vein","Hepatic artery","Bile ducts","Gallbladder","Hepatocytes"]},
  {id:"stomach",name:"Stomach",sys:"Digestive/GI",color:"#639922",bgColor:"#EAF3DE",desc:"HCl pH 1.5-3.5 · Parietal cells (HCl + intrinsic factor) · Chief cells (pepsinogen)",courses:["NCLEX-RN","TEAS 7","HESI A2"],labels:["Fundus","Body","Antrum","Pylorus","Rugae","Parietal cells","Chief cells","G cells"]},
  {id:"pancreas",name:"Pancreas",sys:"Endocrine/GI",color:"#EF9F27",bgColor:"#FAEEDA",desc:"Beta cells → insulin · Alpha cells → glucagon · Acinar cells → digestive enzymes",courses:["NCLEX-RN","NCLEX-PN","FNP"],labels:["Head","Body","Tail","Islets of Langerhans","Beta cells","Alpha cells","Pancreatic duct"]},
  {id:"skin",name:"Skin",sys:"Integumentary",color:"#888780",bgColor:"#F1EFE8",desc:"Largest organ · 3 layers: epidermis, dermis, hypodermis · Thermoregulation + barrier",courses:["NCLEX-RN","NCLEX-PN","TEAS 7","CCRN"],labels:["Epidermis","Dermis","Hypodermis","Hair follicle","Sweat glands","Sebaceous glands","Melanocytes"]},
];

const COURSE_COLORS: Record<string,{bg:string;text:string}> = {
  "NCLEX-RN":{bg:"#FCEBEB",text:"#A32D2D"},
  "NCLEX-PN":{bg:"#E6F1FB",text:"#185FA5"},
  "TEAS 7":{bg:"#EAF3DE",text:"#3B6D11"},
  "HESI A2":{bg:"#FAEEDA",text:"#854F0B"},
  "CCRN":{bg:"#EEEDFE",text:"#534AB7"},
  "FNP":{bg:"#E1F5EE",text:"#0F6E56"},
};

const ORGAN_SVGS: Record<string, string> = {
  heart: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%"><rect width="240" height="200" fill="#060f1e"/><style>@keyframes beat{0%,100%{transform:scale(1)}50%{transform:scale(1.08) translate(0,-3px)}}@keyframes flow{0%{stroke-dashoffset:200}100%{stroke-dashoffset:0}}@keyframes ripple{0%{r:4;opacity:1}100%{r:20;opacity:0}}</style><g style="transform-origin:120px 100px;animation:beat 1s ease-in-out infinite"><path d="M120 175 C55 135 22 92 32 62 C44 30 82 26 104 50 C112 59 117 68 120 76 C123 68 128 59 136 50 C158 26 196 30 208 62 C218 92 185 135 120 175Z" fill="#c0392b" stroke="#e74c3c" stroke-width="1.5"/><ellipse cx="97" cy="100" rx="20" ry="24" fill="#2980b9" opacity=".9"/><ellipse cx="143" cy="100" rx="20" ry="24" fill="#c0392b" opacity=".9"/><ellipse cx="97" cy="78" rx="20" ry="16" fill="#3498db" opacity=".9"/><ellipse cx="143" cy="78" rx="20" ry="16" fill="#a93226" opacity=".9"/><line x1="97" y1="94" x2="97" y2="96" stroke="#060f1e" stroke-width="1.5"/><line x1="143" y1="94" x2="143" y2="96" stroke="#060f1e" stroke-width="1.5"/><text x="83" y="104" font-size="8" fill="white" font-family="monospace" font-weight="bold">RV</text><text x="136" y="104" font-size="8" fill="white" font-family="monospace" font-weight="bold">LV</text><text x="83" y="81" font-size="8" fill="white" font-family="monospace" font-weight="bold">RA</text><text x="136" y="81" font-size="8" fill="white" font-family="monospace" font-weight="bold">LA</text></g><path d="M97 62 L97 44 C97 36 88 32 86 26" fill="none" stroke="#3498db" stroke-width="3" stroke-linecap="round" stroke-dasharray="8 4" style="animation:flow 1.2s linear infinite"/><path d="M143 62 L143 40 C143 30 152 24 154 16" fill="none" stroke="#e74c3c" stroke-width="3" stroke-linecap="round" stroke-dasharray="8 4" style="animation:flow 1s linear infinite"/><circle cx="120" cy="88" r="4" fill="none" stroke="#f1c40f" stroke-width="1.5" style="animation:ripple 1s ease-out infinite"/><text x="30" y="190" font-size="7.5" fill="#3498db" font-family="monospace">Right: deoxygenated</text><text x="138" y="190" font-size="7.5" fill="#e74c3c" font-family="monospace">Left: oxygenated</text></svg>`,
  lungs: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%"><rect width="240" height="200" fill="#060f1e"/><style>@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}@keyframes pulse{0%,100%{opacity:.4}50%{opacity:.9}}</style><rect x="113" y="8" width="14" height="52" rx="7" fill="#78909c"/><path d="M120 36 L104 46 L90 50" fill="none" stroke="#78909c" stroke-width="3" stroke-linecap="round"/><path d="M120 36 L136 46 L150 50" fill="none" stroke="#78909c" stroke-width="3" stroke-linecap="round"/><path d="M90 50 L76 58 L68 70" fill="none" stroke="#78909c" stroke-width="2.5" stroke-linecap="round"/><path d="M150 50 L164 58 L172 70" fill="none" stroke="#78909c" stroke-width="2.5" stroke-linecap="round"/><g style="transform-origin:72px 118px;animation:breathe 3.5s ease-in-out infinite"><path d="M72 58 C36 62 20 82 22 118 C24 152 40 174 72 178 C86 178 96 166 102 150 C106 140 108 126 108 116 L108 58 C96 56 84 56 72 58Z" fill="#c0392b" opacity=".75" stroke="#e74c3c" stroke-width="1"/><circle cx="52" cy="92" r="6" fill="#ff8a80" style="animation:pulse 3.5s ease-in-out infinite"/><circle cx="72" cy="108" r="5" fill="#ff8a80" style="animation:pulse 3.5s ease-in-out infinite .4s"/><circle cx="50" cy="128" r="6" fill="#ff8a80" style="animation:pulse 3.5s ease-in-out infinite .8s"/><circle cx="76" cy="146" r="5" fill="#ff8a80" style="animation:pulse 3.5s ease-in-out infinite 1.2s"/><text x="42" y="78" font-size="7.5" fill="white" font-family="monospace">Left lung</text><text x="44" y="88" font-size="7" fill="#ffccbc" font-family="monospace">2 lobes</text></g><g style="transform-origin:168px 118px;animation:breathe 3.5s ease-in-out infinite .15s"><path d="M168 58 C204 62 220 82 218 118 C216 152 200 174 168 178 C154 178 144 166 138 150 C134 140 132 126 132 116 L132 58 C144 56 156 56 168 58Z" fill="#c0392b" opacity=".75" stroke="#e74c3c" stroke-width="1"/><circle cx="188" cy="92" r="6" fill="#ff8a80" style="animation:pulse 3.5s ease-in-out infinite .2s"/><circle cx="168" cy="108" r="5" fill="#ff8a80" style="animation:pulse 3.5s ease-in-out infinite .6s"/><circle cx="190" cy="128" r="6" fill="#ff8a80" style="animation:pulse 3.5s ease-in-out infinite 1s"/><text x="155" y="78" font-size="7.5" fill="white" font-family="monospace">Right lung</text><text x="158" y="88" font-size="7" fill="#ffccbc" font-family="monospace">3 lobes</text></g><text x="60" y="195" font-size="7.5" fill="#78909c" font-family="monospace">Alveoli pulse with each breath cycle</text></svg>`,
  brain: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%"><rect width="240" height="200" fill="#060f1e"/><style>@keyframes signal{0%{opacity:0;r:3}50%{opacity:1;r:5}100%{opacity:0;r:3}}</style><ellipse cx="120" cy="88" rx="90" ry="70" fill="#4a235a" stroke="#8e44ad" stroke-width="1.5"/><path d="M46 84 C52 64 64 50 80 44" fill="none" stroke="#7d3c98" stroke-width="2.5" stroke-linecap="round"/><path d="M194 84 C188 64 176 50 160 44" fill="none" stroke="#7d3c98" stroke-width="2.5" stroke-linecap="round"/><path d="M80 44 C90 36 104 30 120 28 C136 30 150 36 160 44" fill="none" stroke="#7d3c98" stroke-width="2" stroke-linecap="round"/><line x1="120" y1="28" x2="120" y2="158" stroke="#2c3e50" stroke-width="1" stroke-dasharray="4 3"/><rect x="58" y="50" width="56" height="14" rx="4" fill="#6c3483" opacity=".7"/><text x="86" y="61" font-size="8" fill="#e8daef" font-family="monospace" text-anchor="middle">Frontal lobe</text><rect x="126" y="50" width="56" height="14" rx="4" fill="#76448a" opacity=".7"/><text x="154" y="61" font-size="8" fill="#e8daef" font-family="monospace" text-anchor="middle">Parietal lobe</text><rect x="38" y="106" width="56" height="14" rx="4" fill="#5b2c6f" opacity=".8"/><text x="66" y="117" font-size="8" fill="#e8daef" font-family="monospace" text-anchor="middle">Temporal lobe</text><rect x="166" y="98" width="56" height="14" rx="4" fill="#5b2c6f" opacity=".8"/><text x="194" y="109" font-size="8" fill="#e8daef" font-family="monospace" text-anchor="middle">Occipital lobe</text><ellipse cx="120" cy="148" rx="54" ry="20" fill="#3b1f4e" stroke="#7d3c98" stroke-width="1"/><text x="120" y="152" font-size="8" fill="#d7bde2" font-family="monospace" text-anchor="middle">Cerebellum</text><rect x="108" y="162" width="24" height="18" rx="4" fill="#1a0a2e" stroke="#7d3c98" stroke-width="1"/><text x="120" y="174" font-size="7.5" fill="#d7bde2" font-family="monospace" text-anchor="middle">Brainstem</text><circle cx="76" cy="72" r="5" fill="#f1c40f" style="animation:signal 1.6s ease-in-out infinite"/><circle cx="100" cy="60" r="5" fill="#f1c40f" style="animation:signal 1.6s ease-in-out infinite .3s"/><circle cx="148" cy="68" r="5" fill="#f1c40f" style="animation:signal 1.6s ease-in-out infinite .6s"/><circle cx="162" cy="58" r="5" fill="#f1c40f" style="animation:signal 1.6s ease-in-out infinite .9s"/><circle cx="90" cy="100" r="4" fill="#f1c40f" style="animation:signal 1.6s ease-in-out infinite 1.1s"/><circle cx="150" cy="100" r="4" fill="#f1c40f" style="animation:signal 1.6s ease-in-out infinite 1.4s"/><text x="120" y="195" font-size="7.5" fill="#78909c" font-family="monospace" text-anchor="middle">Yellow dots = neural firing signals</text></svg>`,
  kidney: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%"><rect width="240" height="200" fill="#060f1e"/><style>@keyframes flow{0%{stroke-dashoffset:200}100%{stroke-dashoffset:0}}@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}</style><path d="M65 35 C35 38 16 60 16 95 C16 130 35 158 65 162 C82 162 93 146 96 130 C98 120 98 108 96 97 C93 82 87 68 85 56 C82 40 76 35 65 35Z" fill="#0d6e56" opacity=".85" stroke="#1D9E75" stroke-width="1.5"/><path d="M68 52 C54 56 44 72 44 95 C44 118 54 138 68 148" fill="none" stroke="#085041" stroke-width="7" stroke-linecap="round"/><circle cx="69" cy="95" r="20" fill="#060f1e" stroke="#1D9E75" stroke-width="1"/><text x="69" y="91" font-size="7.5" fill="#5DCAA5" font-family="monospace" text-anchor="middle">Renal</text><text x="69" y="102" font-size="7.5" fill="#5DCAA5" font-family="monospace" text-anchor="middle">pelvis</text><path d="M175 35 C205 38 224 60 224 95 C224 130 205 158 175 162 C158 162 147 146 144 130 C142 120 142 108 144 97 C147 82 153 68 155 56 C158 40 164 35 175 35Z" fill="#0d6e56" opacity=".85" stroke="#1D9E75" stroke-width="1.5"/><path d="M172 52 C186 56 196 72 196 95 C196 118 186 138 172 148" fill="none" stroke="#085041" stroke-width="7" stroke-linecap="round"/><circle cx="171" cy="95" r="20" fill="#060f1e" stroke="#1D9E75" stroke-width="1"/><text x="171" y="91" font-size="7.5" fill="#5DCAA5" font-family="monospace" text-anchor="middle">Renal</text><text x="171" y="102" font-size="7.5" fill="#5DCAA5" font-family="monospace" text-anchor="middle">pelvis</text><path d="M88 92 L120 92 L152 92" fill="none" stroke="#e74c3c" stroke-width="2.5" stroke-dasharray="6 3" style="animation:flow 1.5s linear infinite"/><path d="M88 98 L120 98 L152 98" fill="none" stroke="#3498db" stroke-width="2.5" stroke-dasharray="6 3" style="animation:flow 1.5s linear infinite reverse"/><text x="120" y="86" font-size="7" fill="#e74c3c" font-family="monospace" text-anchor="middle">Afferent (blood in)</text><text x="120" y="112" font-size="7" fill="#3498db" font-family="monospace" text-anchor="middle">Efferent (filtered out)</text><path d="M69 115 L69 138 L120 138 L171 138 L171 115" fill="none" stroke="#f1c40f" stroke-width="2" stroke-dasharray="4 3" style="animation:flow 2s linear infinite"/><text x="120" y="152" font-size="7.5" fill="#f1c40f" font-family="monospace" text-anchor="middle">Ureters to bladder</text><text x="120" y="192" font-size="7.5" fill="#78909c" font-family="monospace" text-anchor="middle">Filtering 180L blood daily into 1-2L urine</text></svg>`,
};
function defaultSVG(o:Organ):string{
  return `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%"><rect width="240" height="200" fill="#060f1e"/><style>@keyframes pulse{0%,100%{opacity:.3}50%{opacity:.8}}</style><circle cx="120" cy="90" r="60" fill="${o.color}" opacity=".2" stroke="${o.color}" stroke-width="1.5"/><circle cx="120" cy="90" r="40" fill="${o.color}" opacity=".3" stroke="${o.color}" stroke-width="1" style="animation:pulse 2s ease-in-out infinite"/><circle cx="120" cy="90" r="20" fill="${o.color}" opacity=".5" style="animation:pulse 2s ease-in-out infinite .5s"/><text x="120" y="94" font-size="13" fill="white" font-family="monospace" font-weight="bold" text-anchor="middle">${o.name}</text><text x="120" y="168" font-size="9" fill="#78909c" font-family="monospace" text-anchor="middle">${o.sys}</text></svg>`;
}

async function callAI(prompt:string,jsonMode=false):Promise<string>{
  const system=jsonMode
    ?"You are an NCLEX question writer. Return only valid JSON. No backticks, no markdown."
    :"You are an expert nursing educator for Pre-NCLEX Nursing. Write in plain text only, no markdown, no symbols. Use numbers for lists.";
  try{
    const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,system,messages:[{role:"user",content:prompt}]})});
    const data=await res.json();
    return data.content?.find((b:{type:string;text?:string})=>b.type==="text")?.text??"Could not generate response.";
  }catch{return "Connection error. Please try again.";}
}

export default function AnatomyVisualizer(){
  const [selectedOrgan,setSelectedOrgan]=useState<Organ|null>(null);
  const [activeTab,setActiveTab]=useState<TabType>("visual");
  const [difficulty,setDifficulty]=useState<Difficulty>("medium");
  const [search,setSearch]=useState("");
  const [learnContent,setLearnContent]=useState("");
  const [learnLoading,setLearnLoading]=useState(false);
  const [genContent,setGenContent]=useState("");
  const [genLoading,setGenLoading]=useState(false);
  const [question,setQuestion]=useState<QuestionData|null>(null);
  const [quizLoading,setQuizLoading]=useState(false);
  const [selectedAnswer,setSelectedAnswer]=useState<string|null>(null);
  const [showRationale,setShowRationale]=useState(false);
  const learnTopicRef=useRef<LearnTopic|null>(null);

  const filteredOrgans=ORGANS.filter(o=>!search||o.name.toLowerCase().includes(search.toLowerCase())||o.sys.toLowerCase().includes(search.toLowerCase()));

  function pickOrgan(o:Organ){
    setSelectedOrgan(o);setActiveTab("visual");setLearnContent("");
    setGenContent("");setQuestion(null);setSelectedAnswer(null);
    setShowRationale(false);learnTopicRef.current=null;
  }

  function switchTab(t:TabType){
    setActiveTab(t);setLearnContent("");setGenContent("");
    setQuestion(null);setSelectedAnswer(null);setShowRationale(false);
  }

  async function runLearn(topic:LearnTopic){
    if(!selectedOrgan)return;
    learnTopicRef.current=topic;setLearnLoading(true);setLearnContent("");
    const prompts:Record<LearnTopic,string>={
      overview:`Overview of the ${selectedOrgan.name} (${selectedOrgan.sys}) for nursing students: location, structure, key features. 110 words max.`,
      functions:`5 key functions of the ${selectedOrgan.name} for ${selectedOrgan.courses[0]}. Number 1-5, one sentence each.`,
      pathology:`4 most tested diseases of the ${selectedOrgan.name} on ${selectedOrgan.courses[0]}. Name, hallmark sign, priority nursing action. Numbered.`,
      physiology:`Key physiology of the ${selectedOrgan.name}: how it works at cellular and organ level with normal values. 120 words max.`,
      nursing:`Nursing care priorities for ${selectedOrgan.name} dysfunction: assessments, interventions, when to escalate. 120 words max.`,
    };
    const result=await callAI(prompts[topic]);
    setLearnContent(result);setLearnLoading(false);
  }

  async function generateQuestion(){
    if(!selectedOrgan)return;
    setQuizLoading(true);setQuestion(null);setSelectedAnswer(null);setShowRationale(false);
    const diffDesc={easy:"straightforward recall",medium:"clinical application requiring analysis",hard:"complex priority with subtle distractors"};
    const prompt=`One ${difficulty}-difficulty NCLEX-RN question about the ${selectedOrgan.name}. Difficulty: ${diffDesc[difficulty]}.\n\nReturn ONLY this JSON:\n{"question":"clinical stem","options":{"A":"text","B":"text","C":"text","D":"text"},"answer":"A","rationale":"Why correct and why distractors wrong. 3 sentences."}`;
    try{
      const raw=await callAI(prompt,true);
      const parsed:QuestionData=JSON.parse(raw.replace(/```json|```/g,"").trim());
      setQuestion(parsed);
    }catch{setLearnContent("Error generating question. Please try again.");}
    setQuizLoading(false);
  }

  async function runGen(type:"labs"|"meds"){
    if(!selectedOrgan)return;
    setGenLoading(true);setGenContent("");
    const prompts={
      labs:`5-6 key lab values for the ${selectedOrgan.name} on ${selectedOrgan.courses[0]}: name, normal range with units, critical high/low meaning. Numbered.`,
      meds:`Top 5 medications for ${selectedOrgan.name} on ${selectedOrgan.courses[0]}: drug name, class, mechanism, critical nursing consideration. Numbered.`,
    };
    const result=await callAI(prompts[type]);
    setGenContent(result);setGenLoading(false);
  }

  const TABS:{id:TabType;label:string}[]=[
    {id:"visual",label:"Visual"},{id:"learn",label:"Learn"},
    {id:"quiz",label:"Quiz"},{id:"labs",label:"Lab values"},{id:"meds",label:"Medications"},
  ];

  const LEARN_TOPICS:{id:LearnTopic;label:string}[]=[
    {id:"overview",label:"Overview"},{id:"functions",label:"Functions"},
    {id:"pathology",label:"Diseases"},{id:"physiology",label:"Physiology"},
    {id:"nursing",label:"Nursing care"},
  ];

  return(
    <div className="min-h-screen bg-[#060f1e] text-white">
      <div className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-xl font-bold" style={{fontFamily:"'Cormorant Garamond',serif"}}>Anatomy Visualizer</h1>
            <p className="text-xs text-slate-400 mt-0.5">AI-animated illustrations · Real-time physiology · Exam practice</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>switchTab(t.id)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${activeTab===t.id?"bg-[#0ea5e9] border-[#0ea5e9] text-white":"border-white/20 text-slate-400 hover:border-white/40 hover:text-white"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6 items-start">
        <div className="w-52 flex-shrink-0">
          <input type="text" placeholder="Search organ..." value={search} onChange={e=>setSearch(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 mb-3 focus:outline-none focus:border-[#0ea5e9]/50"/>
          <div className="flex flex-col gap-1.5 max-h-[520px] overflow-y-auto">
            {filteredOrgans.map(o=>(
              <button key={o.id} onClick={()=>pickOrgan(o)}
                className={`flex items-center gap-2 w-full text-left px-2.5 py-2 rounded-lg border transition-all ${selectedOrgan?.id===o.id?"border-[#0ea5e9]/60 bg-[#0ea5e9]/10":"border-white/5 bg-white/[0.02] hover:bg-white/5"}`}>
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{background:o.color}}/>
                <div className="min-w-0">
                  <div className={`text-xs font-medium truncate ${selectedOrgan?.id===o.id?"text-[#38bdf8]":"text-white"}`}>{o.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{o.sys}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {!selectedOrgan?(
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
              <p className="text-base font-medium text-white mb-2">Select a body part to begin</p>
              <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto leading-relaxed">AI-animated organ illustrations, NCLEX questions, lab values, and medications — all in one place.</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["NCLEX-RN","NCLEX-PN","TEAS 7","HESI A2","CCRN","FNP"].map(c=>(
                  <span key={c} className="text-xs px-3 py-1 rounded-full" style={{background:COURSE_COLORS[c].bg+"22",color:COURSE_COLORS[c].text,border:`1px solid ${COURSE_COLORS[c].text}44`}}>{c}</span>
                ))}
              </div>
            </div>
          ):(
            <>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="rounded-xl overflow-hidden" style={{width:200,height:170,background:"#060f1e"}}
                    dangerouslySetInnerHTML={{__html:ORGAN_SVGS[selectedOrgan.id] ?? defaultSVG(selectedOrgan)}}/>
                  <p className="text-[9px] text-slate-600 mt-1 text-center">AI-generated · animated</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="text-lg font-semibold">{selectedOrgan.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{background:selectedOrgan.color+"22",color:selectedOrgan.color,border:`1px solid ${selectedOrgan.color}44`}}>{selectedOrgan.sys}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{selectedOrgan.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {selectedOrgan.courses.map(c=>(
                      <span key={c} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{background:COURSE_COLORS[c]?.bg+"33",color:COURSE_COLORS[c]?.text,border:`1px solid ${COURSE_COLORS[c]?.text}44`}}>{c}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedOrgan.labels.map(l=>(
                      <span key={l} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">{l}</span>
                    ))}
                  </div>
                </div>
              </div>

              {activeTab==="visual"&&(
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-3">What you are seeing</p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">Custom AI-generated animated illustration of the {selectedOrgan.name}. Key physiological processes are animated in real time.</p>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={()=>switchTab("learn")} className="text-xs px-3 py-1.5 rounded-lg bg-[#0ea5e9]/20 border border-[#0ea5e9]/40 text-[#38bdf8] hover:bg-[#0ea5e9]/30 transition-all">Get full lesson</button>
                    <button onClick={()=>switchTab("quiz")} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:border-white/20 hover:text-white transition-all">Practice questions</button>
                    <button onClick={()=>switchTab("labs")} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:border-white/20 hover:text-white transition-all">Lab values</button>
                  </div>
                </div>
              )}

              {activeTab==="learn"&&(
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex gap-2 flex-wrap mb-4">
                    {LEARN_TOPICS.map(t=>(
                      <button key={t.id} onClick={()=>runLearn(t.id)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${learnTopicRef.current===t.id?"bg-[#0ea5e9]/20 border-[#0ea5e9]/50 text-[#38bdf8]":"border-white/10 text-slate-400 hover:border-white/20 hover:text-white"}`}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                  {learnLoading?(
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <div className="w-4 h-4 border-2 border-slate-600 border-t-[#0ea5e9] rounded-full animate-spin"/>Generating lesson...
                    </div>
                  ):learnContent?(
                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{learnContent}</p>
                  ):(
                    <p className="text-sm text-slate-500">Choose a topic above to generate your AI-powered lesson.</p>
                  )}
                </div>
              )}

              {activeTab==="quiz"&&(
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                    <p className="text-sm font-medium text-white">NCLEX-style practice question</p>
                    <div className="flex gap-1.5">
                      {(["easy","medium","hard"] as Difficulty[]).map(d=>(
                        <button key={d} onClick={()=>setDifficulty(d)}
                          className={`text-xs px-3 py-1 rounded-full border transition-all capitalize ${difficulty===d?"bg-[#0ea5e9]/20 border-[#0ea5e9]/50 text-[#38bdf8]":"border-white/10 text-slate-500 hover:border-white/20"}`}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  {quizLoading?(
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                      <div className="w-4 h-4 border-2 border-slate-600 border-t-[#0ea5e9] rounded-full animate-spin"/>Writing question...
                    </div>
                  ):question?(
                    <>
                      <p className="text-sm text-white leading-relaxed font-medium mb-4">{question.question}</p>
                      <div className="flex flex-col gap-2 mb-4">
                        {(["A","B","C","D"] as const).map(k=>{
                          let cls="border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/5";
                          if(selectedAnswer){
                            if(k===question.answer)cls="border-green-500/60 bg-green-500/10 text-green-300";
                            else if(k===selectedAnswer)cls="border-red-500/60 bg-red-500/10 text-red-300";
                            else cls="border-white/5 text-slate-600";
                          }
                          return(
                            <button key={k} onClick={()=>{if(!selectedAnswer){setSelectedAnswer(k);setShowRationale(true);}}} disabled={!!selectedAnswer}
                              className={`text-left text-xs px-4 py-3 rounded-xl border transition-all leading-relaxed ${cls}`}>
                              <span className="font-medium mr-2">{k})</span>{question.options[k]}
                            </button>
                          );
                        })}
                      </div>
                      {showRationale&&(
                        <div className={`text-xs p-4 rounded-xl leading-relaxed mb-4 ${selectedAnswer===question.answer?"bg-green-500/10 border border-green-500/20 text-green-200":"bg-red-500/10 border border-red-500/20 text-red-200"}`}>
                          <span className="font-semibold">{selectedAnswer===question.answer?"Correct! ":"Incorrect. "}</span>{question.rationale}
                        </div>
                      )}
                      <button onClick={generateQuestion} className="text-xs px-4 py-2 rounded-lg bg-[#0ea5e9]/20 border border-[#0ea5e9]/40 text-[#38bdf8] hover:bg-[#0ea5e9]/30 transition-all">Next question</button>
                    </>
                  ):(
                    <p className="text-sm text-slate-500 mb-4">Click Generate to get a fresh NCLEX question.</p>
                  )}
                  {!quizLoading&&!question&&(
                    <button onClick={generateQuestion} className="text-xs px-4 py-2 rounded-lg bg-[#0ea5e9]/20 border border-[#0ea5e9]/40 text-[#38bdf8] hover:bg-[#0ea5e9]/30 transition-all">Generate question</button>
                  )}
                </div>
              )}

              {(activeTab==="labs"||activeTab==="meds")&&(
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-sm font-medium text-white mb-4">{activeTab==="labs"?"Key lab values":"Medications"} — {selectedOrgan.name}</p>
                  {genLoading?(
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                      <div className="w-4 h-4 border-2 border-slate-600 border-t-[#0ea5e9] rounded-full animate-spin"/>Generating...
                    </div>
                  ):genContent?(
                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap mb-4">{genContent}</p>
                  ):(
                    <p className="text-sm text-slate-500 mb-4">Click below to generate AI-powered {activeTab==="labs"?"lab value reference":"medication guide"}.</p>
                  )}
                  {!genLoading&&(
                    <button onClick={()=>runGen(activeTab as "labs"|"meds")} className="text-xs px-4 py-2 rounded-lg bg-[#0ea5e9]/20 border border-[#0ea5e9]/40 text-[#38bdf8] hover:bg-[#0ea5e9]/30 transition-all">
                      {genContent?"Regenerate":`Generate ${activeTab==="labs"?"lab values":"medications"}`}
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

