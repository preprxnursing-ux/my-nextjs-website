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
                    dangerouslySetInnerHTML={{__html:defaultSVG(selectedOrgan)}}/>
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
