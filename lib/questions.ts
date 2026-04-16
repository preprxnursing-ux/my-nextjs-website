export type Question = {
  id: number
  examType: "RN" | "PN" | "CCRN" | "NP" | "TEAS" | "NURSING_SCHOOL"
  topic: string
  difficulty: "easy" | "medium" | "hard"
  question: string
  options: string[]
  correctAnswer: number
  rationale: string
  nclexThinkingTip: string
}

export const questions: Question[] = [
  {
    id: 1,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "easy",
    question:
      "A nurse is caring for a client with hypoglycemia. Which finding should the nurse expect?",
    options: [
      "Warm, dry skin",
      "Bradycardia",
      "Diaphoresis and tremors",
      "Deep, slow respirations",
    ],
    correctAnswer: 2,
    rationale:
      "Hypoglycemia triggers activation of the sympathetic (adrenergic) nervous system as the body attempts to raise blood glucose levels. This results in early warning signs such as diaphoresis, tremors, anxiety, palpitations, and tachycardia. Recognizing these early symptoms allows for prompt intervention before neurologic impairment occurs.\n\nWhy the other options are less appropriate:\nA. Warm, dry skin â€“ More commonly associated with hyperglycemia or dehydration rather than low blood glucose.\nB. Bradycardia â€“ Hypoglycemia typically causes tachycardia due to sympathetic stimulation, not a slowed heart rate.\nD. Deep, slow respirations â€“ Seen in metabolic acidosis (e.g., diabetic ketoacidosis), not in hypoglycemia.",
    nclexThinkingTip:
      "Early hypoglycemia = adrenergic (sympathetic) signs first, followed by neurologic symptoms if untreated.",
  },

  {
    id: 2,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "medium",
    question:
      "A client is 4 hours postoperative after abdominal surgery. Which finding is most concerning?",
    options: [
      "Temperature of 99.5Â°F (37.5Â°C)",
      "Heart rate of 118/min",
      "Urine output of 35 mL/hr",
      "WBC 11,000/mmÂ³",
    ],
    correctAnswer: 1,
    rationale:
      "An elevated heart rate in the early postoperative period is often the earliest indicator of hypovolemia or internal bleeding. The body compensates for decreased circulating volume by increasing heart rate before a drop in blood pressure occurs, making this a critical early warning sign.\n\nWhy the other options are less concerning at this time:\nA. Mild elevation in temperature â€“ Low-grade fever is common within the first 24 hours postoperatively due to inflammatory response or atelectasis.\nC. Urine output of 35 mL/hr â€“ This is slightly above the minimum acceptable output (30 mL/hr) and does not immediately indicate renal compromise.\nD. WBC 11,000/mmÂ³ â€“ Mild leukocytosis is expected as part of the normal stress response following surgery.",
    nclexThinkingTip:
      "In early complications, vital sign changes often appear before laboratory abnormalities.",
  },

  {
    id: 3,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "medium",
    question:
      "A client with heart failure reports sudden weight gain and increased shortness of breath. What should the nurse do first?",
    options: [
      "Encourage ambulation",
      "Restrict fluids",
      "Assess lung sounds",
      "Notify dietary services",
    ],
    correctAnswer: 2,
    rationale:
      "Assessment is the priority when a clientâ€™s condition changes. Evaluating lung sounds helps determine the presence and severity of pulmonary congestion (e.g., crackles), which directly informs the urgency and type of intervention needed.\n\nWhy the other options are not the first priority:\nA. Encourage ambulation â€“ Activity may worsen dyspnea in a client experiencing fluid overload.\nB. Restrict fluids â€“ While appropriate in heart failure management, this is an intervention that should follow assessment.\nD. Notify dietary services â€“ Dietary adjustments are important for long-term management but do not address the clientâ€™s immediate symptoms.",
    nclexThinkingTip:
      "When symptoms acutely worsen, assess first unless there is an immediate life-threatening condition requiring action.",
  },

  {
    id: 4,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "hard",
    question:
      "Which ECG finding is expected in hyperkalemia?",
    options: [
      "Flattened T waves",
      "U waves",
      "Peaked T waves",
      "ST-segment depression",
    ],
    correctAnswer: 2,
    rationale:
      "Hyperkalemia affects cardiac conduction by altering myocardial repolarization. This produces tall, peaked T waves, which are a classic early ECG change and may progress to widening of the QRS complex and life-threatening dysrhythmias if untreated.\n\nWhy the other options are incorrect:\nA. Flattened T waves â€“ More consistent with hypokalemia.\nB. U waves â€“ Also associated with hypokalemia.\nD. ST-segment depression â€“ Typically associated with myocardial ischemia rather than electrolyte imbalance.",
    nclexThinkingTip:
      "Think: â€œHigh potassium = peaked T wavesâ€ and increased risk for dysrhythmias.",
  },

  {
    id: 5,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "easy",
    question:
      "Which finding indicates effective oxygen therapy in a client with COPD?",
    options: [
      "Respiratory rate increases to 28/min",
      "Oxygen saturation improves from 86% to 92%",
      "Client becomes restless",
      "Heart rate increases",
    ],
    correctAnswer: 1,
    rationale:
      "An improvement in oxygen saturation reflects enhanced gas exchange and oxygen delivery, which is the primary goal of oxygen therapy. In clients with COPD, even modest increases in SpOâ‚‚ can represent meaningful clinical improvement.\n\nWhy the other options indicate concern rather than improvement:\nA. Increased respiratory rate â€“ May indicate ongoing respiratory distress or inadequate oxygenation.\nC. Restlessness â€“ Often an early sign of hypoxia.\nD. Increased heart rate â€“ Can also signal hypoxia or physiological stress.",
    nclexThinkingTip:
      "Evaluate effectiveness using objective data (e.g., SpOâ‚‚), not just observable effort or symptoms.",
  },

  {
    id: 6,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "medium",
    question:
      "A client with diabetes reports blurred vision and frequent urination. Which lab value is most important?",
    options: [
      "Potassium",
      "HbA1c",
      "Random blood glucose",
      "Urine ketones",
    ],
    correctAnswer: 2,
    rationale:
      "Blurred vision and polyuria are classic manifestations of current hyperglycemia. A random blood glucose level provides immediate, real-time information needed to confirm the condition and guide prompt management.\n\nWhy the other options are less appropriate initially:\nA. Potassium â€“ Important in diabetes management, especially in DKA, but not the first priority without evidence of severe imbalance.\nB. HbA1c â€“ Reflects long-term glycemic control over 2â€“3 months and does not address the clientâ€™s acute symptoms.\nD. Urine ketones â€“ Useful if diabetic ketoacidosis is suspected, but confirmation of hyperglycemia is the immediate priority.",
    nclexThinkingTip:
      "Acute symptoms â†’ prioritize real-time diagnostic data over long-term indicators.",
  },

  {
    id: 7,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "hard",
    question:
      "Which finding requires immediate intervention in a client with sepsis?",
    options: [
      "Fever",
      "Blood pressure 84/50 mm Hg",
      "Elevated WBC",
      "Respiratory rate 22/min",
    ],
    correctAnswer: 1,
    rationale:
      "A blood pressure of 84/50 mm Hg indicates hypotension and possible septic shock, reflecting inadequate tissue perfusion. This is life-threatening and requires immediate intervention such as fluid resuscitation and vasopressor support.\n\nWhy the other options are expected or less urgent findings:\nA. Fever â€“ A common manifestation of infection and part of the systemic inflammatory response.\nC. Elevated WBC â€“ Indicates immune activation but does not directly signal hemodynamic instability.\nD. Respiratory rate of 22/min â€“ Mild tachypnea is expected in sepsis and is not immediately critical.",
    nclexThinkingTip:
      "In sepsis, prioritize circulation and perfusion over infection indicators.",
  },

  {
    id: 8,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "easy",
    question:
      "Which statement indicates correct heart failure self-management?",
    options: [
      "Weigh only when short of breath",
      "Weigh daily and report sudden gains",
      "Stop fluid limits when symptoms improve",
      "Avoid activity",
    ],
    correctAnswer: 1,
    rationale:
      "Daily weight monitoring allows early detection of fluid retention, often before symptoms such as dyspnea develop. Reporting sudden weight gain enables timely intervention and helps prevent exacerbations.\n\nWhy the other options are incorrect:\nA. Weigh only when short of breath â€“ Delays recognition of worsening fluid overload.\nC. Stop fluid limits when symptoms improve â€“ Heart failure is a chronic condition requiring ongoing management.\nD. Avoid activity â€“ Regular, moderate activity is encouraged as tolerated to improve cardiovascular function.",
    nclexThinkingTip:
      "Heart failure management focuses on early detection and prevention, not reaction to symptoms.",
  },

  {
    id: 9,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "medium",
    question:
      "A client with chronic kidney disease is at greatest risk for which complication?",
    options: [
      "Metabolic alkalosis",
      "Hyperkalemia",
      "Hypoglycemia",
      "Thrombocytopenia",
    ],
    correctAnswer: 1,
    rationale:
      "The kidneys play a key role in potassium excretion. In chronic kidney disease, impaired filtration leads to potassium retention, increasing the risk of life-threatening cardiac dysrhythmias.\n\nWhy the other options are less likely primary complications:\nA. Metabolic alkalosis â€“ CKD more commonly leads to metabolic acidosis due to impaired acid excretion.\nC. Hypoglycemia â€“ Not a direct or primary complication of CKD.\nD. Thrombocytopenia â€“ While platelet dysfunction may occur, it is not the most immediate or life-threatening risk.",
    nclexThinkingTip:
      "Renal failure â†’ watch potassium closely â€” it directly affects the heart.",
  },

  {
    id: 10,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "hard",
    question:
      "What is the priority action during an active tonic-clonic seizure?",
    options: [
      "Insert an oral airway",
      "Restrain the client",
      "Turn the client onto the side",
      "Administer oral fluids",
    ],
    correctAnswer: 2,
    rationale:
      "Positioning the client on their side (lateral position) helps maintain airway patency and reduces the risk of aspiration from saliva or emesis during the seizure.\n\nWhy the other options are unsafe or inappropriate:\nA. Insert an oral airway â€“ Placing objects in the mouth during a seizure can cause injury to the client or nurse.\nB. Restrain the client â€“ Restraints increase the risk of musculoskeletal injury.\nD. Administer oral fluids â€“ Contraindicated due to risk of aspiration.",
    nclexThinkingTip:
      "During a seizure â†’ protect the airway and prevent injury; avoid inserting objects or restraining.",
  },

  {
    id: 11,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "easy",
    question:
      "Untreated hypertension is characterized by:",
    options: [
      "Hypoglycemia",
      "Persistent high blood pressure",
      "Decreased vascular resistance",
      "Bradycardia",
    ],
    correctAnswer: 1,
    rationale:
      "Hypertension is defined as a sustained elevation in blood pressure over time. It is often asymptomatic but leads to progressive damage to organs such as the heart, kidneys, brain, and blood vessels if left untreated.\n\nWhy the other options are incorrect:\nA. Hypoglycemia â€“ Not related to hypertension; refers to low blood glucose levels.\nC. Decreased vascular resistance â€“ Hypertension is associated with increased, not decreased, vascular resistance.\nD. Bradycardia â€“ Hypertension does not typically cause a decreased heart rate.",
    nclexThinkingTip:
      "Hypertension is a chronic, often silent elevation in blood pressure, not defined by symptoms.",
  },
{
    id: 12,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "easy",
    question:
      "Which finding shows pneumonia treatment is effective?",
    options: [
      "Rising WBC",
      "Oxygen saturation improves to 94%",
      "Thicker sputum",
      "Respiratory rate 30/min",
    ],
    correctAnswer: 1,
    rationale:
      "Improved oxygen saturation indicates better alveolar gas exchange, reflecting resolution of inflammation and improved lung function.\n\nWhy the other options suggest ongoing or worsening illness:\nA. Rising WBC â€“ May indicate persistent or worsening infection.\nC. Thicker sputum â€“ Suggests continued inflammation or inadequate airway clearance.\nD. Respiratory rate 30/min â€“ Indicates ongoing respiratory distress.",
    nclexThinkingTip:
      "For respiratory conditions, improvement is best reflected by oxygenation and work of breathing.",
  },

  {
    id: 13,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "medium",
    question:
      "A client with cirrhosis becomes confused. Which laboratory value is the priority to assess?",
    options: [
      "Ammonia",
      "Sodium",
      "BUN",
      "Platelets",
    ],
    correctAnswer: 0,
    rationale:
      "Elevated ammonia levels result from impaired liver detoxification and can lead to hepatic encephalopathy, which presents as confusion, altered mental status, and decreased level of consciousness.\n\nWhy the other options are less directly related to confusion:\nB. Sodium â€“ Imbalances can affect cognition but are not the primary cause in cirrhosis-related confusion.\nC. BUN â€“ Reflects kidney function, not directly linked to hepatic encephalopathy.\nD. Platelets â€“ Important for bleeding risk but unrelated to acute mental status changes.",
    nclexThinkingTip:
      "Liver dysfunction + mental status change â†’ prioritize ammonia levels.",
  },

  {
    id: 14,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "medium",
    question:
      "Which finding suggests a severe bowel obstruction?",
    options: [
      "Abdominal distention",
      "Decreased appetite",
      "Fecal-smelling vomit",
      "Hypoactive bowel sounds",
    ],
    correctAnswer: 2,
    rationale:
      "Fecal-smelling emesis indicates that intestinal contents are backing up significantly, reflecting a late and severe obstruction requiring urgent intervention.\n\nWhy the other options are less specific or occur earlier:\nA. Abdominal distention â€“ Common but not specific to severity.\nB. Decreased appetite â€“ Nonspecific symptom.\nD. Hypoactive bowel sounds â€“ May occur but do not indicate severity on their own.",
    nclexThinkingTip:
      "In GI conditions, abnormal odor or appearance often signals advanced pathology.",
  },

  {
    id: 15,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "easy",
    question:
      "Which position is best for a client experiencing dyspnea?",
    options: [
      "Supine",
      "Prone",
      "High-Fowlerâ€™s",
      "Trendelenburg",
    ],
    correctAnswer: 2,
    rationale:
      "High-Fowlerâ€™s position (sitting upright) maximizes diaphragmatic movement and lung expansion, improving ventilation and reducing the work of breathing.\n\nWhy the other positions are less appropriate:\nA. Supine â€“ Limits lung expansion and may worsen dyspnea.\nB. Prone â€“ Used in specific cases (e.g., ARDS), not general dyspnea management.\nD. Trendelenburg â€“ Increases pressure on the diaphragm and impairs breathing.",
    nclexThinkingTip:
      "Difficulty breathing â†’ optimize lung expansion by positioning upright.",
  },

  {
    id: 16,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "medium",
    question:
      "A clientâ€™s blood glucose is 48 mg/dL. What is the priority action?",
    options: [
      "Administer insulin",
      "Check HbA1c",
      "Give a fast-acting carbohydrate",
      "Notify the healthcare provider",
    ],
    correctAnswer: 2,
    rationale:
      "Hypoglycemia at this level is immediately life-threatening. Administering a fast-acting carbohydrate (e.g., glucose tablets, juice) rapidly raises blood glucose to prevent neurologic compromise.\n\nWhy the other options are not first priority:\nA. Insulin â€“ Would worsen hypoglycemia; contraindicated.\nB. Check HbA1c â€“ Provides long-term control information but is irrelevant in an acute crisis.\nD. Notify provider â€“ Important after stabilizing the patient, but treatment comes first.",
    nclexThinkingTip:
      "Acute hypoglycemia â†’ treat immediately, then evaluate cause.",
  },

  {
    id: 17,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "hard",
    question:
      "A client receiving opioids has a respiratory rate of 8/min. What is the priority intervention?",
    options: [
      "Provide supplemental oxygen",
      "Stimulate the client verbally",
      "Administer naloxone",
      "Call a rapid response team",
    ],
    correctAnswer: 2,
    rationale:
      "Opioid-induced respiratory depression is life-threatening. Naloxone reverses opioid effects and restores adequate ventilation rapidly.\n\nWhy the other options are secondary or insufficient:\nA. Provide supplemental oxygen â€“ Does not address hypoventilation caused by opioids.\nB. Stimulate the client verbally â€“ May temporarily increase RR but does not reverse the drug effect.\nD. Call rapid response â€“ Appropriate in escalation but naloxone administration comes first.",
    nclexThinkingTip:
      "Slow RR on opioids â†’ antagonist first, support second.",
  },

  {
    id: 18,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "easy",
    question:
      "Which is an early sign of dehydration?",
    options: [
      "Bounding pulse",
      "Dry mucous membranes",
      "Crackles in lungs",
      "Elevated blood pressure",
    ],
    correctAnswer: 1,
    rationale:
      "Dry mucous membranes are an early, sensitive indicator of fluid deficit before vital signs become abnormal. Monitoring oral mucosa allows timely intervention.\n\nWhy the other options occur later or are less specific:\nA. Bounding pulse â€“ May occur in overhydration, not dehydration.\nC. Crackles â€“ Sign of fluid overload in lungs.\nD. Elevated BP â€“ Often appears in later stages or with compensatory mechanisms.",
    nclexThinkingTip:
      "Early dehydration â†’ look for subtle signs like dry mucosa or skin turgor.",
  },

  {
    id: 19,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "easy",
    question:
      "Why is deep breathing encouraged postoperatively?",
    options: [
      "To reduce pain",
      "To prevent atelectasis",
      "To promote sleep",
      "To alleviate nausea",
    ],
    correctAnswer: 1,
    rationale:
      "Deep breathing and incentive spirometry help inflate alveoli, improve oxygenation, and prevent postoperative atelectasis and pneumonia, especially after abdominal or thoracic surgery.\n\nWhy the other options are not the main purpose:\nA. To reduce pain â€“ While deep breathing can support relaxation, analgesia is needed for pain control.\nC. To promote sleep â€“ Not the primary rationale.\nD. To alleviate nausea â€“ Ineffective for nausea prevention.",
    nclexThinkingTip:
      "Post-op lungs collapse silently â†’ proactive alveolar expansion is essential.",
  },

  {
    id: 20,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "hard",
    question:
      "Which sign is the strongest early indicator of hemorrhage?",
    options: [
      "Pallor",
      "Low urine output",
      "Hypotension",
      "Tachycardia",
    ],
    correctAnswer: 3,
    rationale:
      "The body compensates for blood loss by increasing heart rate before blood pressure falls, making tachycardia the earliest and most sensitive indicator of hemorrhage.\n\nWhy the other options occur later:\nA. Pallor â€“ Appears as perfusion decreases.\nB. Low urine output â€“ Occurs when renal perfusion declines, later in blood loss.\nC. Hypotension â€“ A late sign after significant volume depletion.",
    nclexThinkingTip:
      "Hemorrhage â†’ tachycardia precedes hypotension; monitor vital signs closely.",
  },

  {
    id: 21,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "easy",
    question:
      "What is the best intervention for a client with fever?",
    options: [
      "Apply blankets",
      "Provide adequate fluids",
      "Restrict oral intake",
      "Keep room warm",
    ],
    correctAnswer: 1,
    rationale:
      "Fever increases insensible fluid losses through sweat and increased metabolic rate. Providing adequate hydration supports thermoregulation, perfusion, and cellular function.\n\nWhy the other options are incorrect or counterproductive:\nA. Apply blankets â€“ Can worsen hyperthermia and discomfort.\nC. Restrict oral intake â€“ Increases risk of dehydration.\nD. Keep room warm â€“ Can exacerbate fever and heat retention.",
    nclexThinkingTip:
      "Fever â†’ hydrate first to support physiological compensation.",
  },
  {
    id: 22,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "easy",
    question:
      "Which finding supports the presence of anemia?",
    options: [
      "High blood pressure",
      "Pale conjunctiva",
      "Bounding pulses",
      "Low urine output",
    ],
    correctAnswer: 1,
    rationale:
      "Pale conjunctiva reflects reduced hemoglobin/hematocrit, which diminishes oxygen-carrying capacity and is a classic clinical sign of anemia.\n\nWhy the other options are incorrect:\nA. High BP â€“ Not typically related to anemia.\nC. Bounding pulses â€“ More characteristic of hypervolemia or high-output states.\nD. Low urine output â€“ Indicates renal perfusion issues, not anemia.",
    nclexThinkingTip:
      "Anemia â†’ look for pallor and hypoxia-related signs.",
  },

  {
    id: 23,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "medium",
    question:
      "A chest tube shows continuous bubbling in the water-seal chamber. What does this indicate?",
    options: [
      "Normal function",
      "Lung re-expansion",
      "Air leak",
      "Tidaling",
    ],
    correctAnswer: 2,
    rationale:
      "Continuous bubbling in the water-seal chamber signals a persistent air leak, which prevents complete lung re-expansion and requires assessment and possible intervention.\n\nWhy the other options are incorrect:\nA. Normal function â€“ Tidaling, not continuous bubbling, is normal.\nB. Lung re-expansion â€“ Continuous bubbling indicates incomplete expansion.\nD. Tidaling â€“ Fluctuation with respiration is normal; continuous bubbling is not.",
    nclexThinkingTip:
      "Chest tube â†’ continuous bubbling = problem, not normal.",
  },

  {
    id: 24,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "easy",
    question:
      "Black, tarry stool is termed:",
    options: [
      "Hematochezia",
      "Melena",
      "Occult",
      "Steatorrhea",
    ],
    correctAnswer: 1,
    rationale:
      "Melena indicates digested blood from the upper gastrointestinal tract, usually from bleeding in the esophagus, stomach, or duodenum.\n\nWhy the other options are incorrect:\nA. Hematochezia â€“ Bright red blood from lower GI tract.\nC. Occult â€“ Hidden blood, detectable only by testing.\nD. Steatorrhea â€“ Fatty, greasy stools due to malabsorption.",
    nclexThinkingTip:
      "Black, tarry stool â†’ upper GI bleeding until proven otherwise.",
  },

  {
    id: 25,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "medium",
    question:
      "Which sign is most indicative of a urinary tract infection in the elderly?",
    options: [
      "Fever",
      "Confusion",
      "Bradycardia",
      "Increased appetite",
    ],
    correctAnswer: 1,
    rationale:
      "Elderly clients often present atypically; confusion or altered mental status can be the first and only sign of a UTI, even without fever or dysuria.\n\nWhy the other options are less reliable:\nA. Fever â€“ May be absent in older adults.\nC. Bradycardia â€“ Not associated with UTI.\nD. Increased appetite â€“ Not related to infection.",
    nclexThinkingTip:
      "In older adults â†’ altered mental status often precedes classic infection signs.",
  },

  {
    id: 26,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "medium",
    question:
      "Which urine output requires follow-up?",
    options: [
      "50 mL/hr",
      "30 mL/hr",
      "120 mL/2 hr",
      "400 mL/8 hr",
    ],
    correctAnswer: 1,
    rationale:
      "30 mL/hr is considered the minimum acceptable urine output. Consistent readings at this threshold warrant close monitoring for renal perfusion or early kidney injury.\n\nWhy the other options are acceptable:\nA. 50 mL/hr â€“ Within normal range.\nC. 120 mL/2 hr â€“ Equivalent to 60 mL/hr, acceptable.\nD. 400 mL/8 hr â€“ 50 mL/hr, adequate.",
    nclexThinkingTip:
      "Know the 30 mL/hr rule for adult renal function monitoring.",
  },

  {
    id: 27,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "hard",
    question:
      "A trauma patient presents with hypotension. The most likely cause is:",
    options: [
      "Cardiogenic shock",
      "Neurogenic shock",
      "Hypovolemic shock",
      "Anaphylactic shock",
    ],
    correctAnswer: 2,
    rationale:
      "Trauma commonly causes blood or fluid loss, leading to hypovolemic shock. Rapid recognition and volume resuscitation are critical.\n\nWhy the other options are less likely:\nA. Cardiogenic â€“ Usually from cardiac pump failure, not trauma.\nB. Neurogenic â€“ Occurs after spinal cord injury with vasodilation.\nD. Anaphylactic â€“ Due to severe allergic reaction, not trauma.",
    nclexThinkingTip:
      "Trauma + hypotension â†’ think volume loss first.",
  },

  {
    id: 28,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "hard",
    question:
      "Which diuretic lab value is most concerning?",
    options: [
      "Sodium 140 mEq/L",
      "Potassium 3.1 mEq/L",
      "Calcium 9.2 mg/dL",
      "Magnesium 1.9 mEq/L",
    ],
    correctAnswer: 1,
    rationale:
      "Hypokalemia increases the risk of life-threatening cardiac dysrhythmias, especially in patients taking loop or thiazide diuretics.\n\nWhy the other values are less critical:\nA. Sodium 140 â€“ Normal.\nC. Calcium 9.2 â€“ Within normal limits.\nD. Magnesium 1.9 â€“ Acceptable; monitor if trend downward.",
    nclexThinkingTip:
      "Diuretics â†’ monitor potassium closely; low K+ kills first.",
  },

  {
    id: 29,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "easy",
    question:
      "Which is appropriate teaching for a client with GERD?",
    options: [
      "Eat large meals",
      "Lie flat after meals",
      "Elevate head of bed",
      "Consume spicy foods",
    ],
    correctAnswer: 2,
    rationale:
      "Elevating the head of the bed reduces reflux by using gravity, protecting the esophagus and preventing discomfort.\n\nWhy the other options are harmful:\nA. Large meals â€“ Increase gastric pressure and reflux.\nB. Lie flat after meals â€“ Worsens reflux.\nD. Spicy foods â€“ Irritates esophageal lining.",
    nclexThinkingTip:
      "GERD management â†’ positioning + dietary modification are key.",
  },

  {
    id: 30,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "easy",
    question:
      "Which client is at greatest risk for pressure injuries?",
    options: [
      "Ambulatory",
      "Obese",
      "Immobile and incontinent",
      "High-protein diet",
    ],
    correctAnswer: 2,
    rationale:
      "Pressure injuries develop from prolonged pressure, moisture, and immobility. Clients who are both immobile and incontinent have highest susceptibility.\n\nWhy the other options are lower risk:\nA. Ambulatory â€“ Pressure is redistributed regularly.\nB. Obese â€“ Some risk, but mobility mitigates pressure.\nD. High-protein diet â€“ Protective, not a risk factor.",
    nclexThinkingTip:
      "Pressure injury risk = pressure + moisture + immobility.",
  },
,
  // ── NCLEX-RN: Pharmacology ──
  {
    id: 31,
    examType: "RN",
    topic: "Pharmacology",
    difficulty: "medium",
    question: "A nurse is administering digoxin to a client. Which finding should prompt the nurse to hold the dose and notify the provider?",
    options: ["Heart rate of 68 bpm", "Heart rate of 52 bpm", "Blood pressure of 118/76 mmHg", "Respiratory rate of 16"],
    correctAnswer: 1,
    rationale: "Digoxin toxicity is associated with bradycardia. The nurse should hold digoxin and notify the provider if the apical pulse is below 60 bpm in adults.\n\nWhy the other options are incorrect:\nA. HR 68 bpm is within normal range -- digoxin can be given safely.\nC. BP 118/76 is normal.\nD. RR 16 is normal.",
    nclexThinkingTip: "Before giving digoxin: always check the apical pulse for a full minute. Hold if below 60 bpm.",
  },
  {
    id: 32,
    examType: "RN",
    topic: "Pharmacology",
    difficulty: "medium",
    question: "A nurse is teaching a client who is prescribed warfarin. Which statement by the client indicates a need for further teaching?",
    options: ["I will avoid eating large amounts of leafy green vegetables", "I will take aspirin for my headaches", "I will report any unusual bruising", "I will get regular INR blood tests"],
    correctAnswer: 1,
    rationale: "Aspirin is an antiplatelet agent that increases bleeding risk when combined with warfarin. The client should use acetaminophen for pain relief instead.\n\nWhy the other options are correct:\nA. Leafy greens contain vitamin K which reduces warfarin effectiveness.\nC. Bruising is a sign of bleeding.\nD. INR monitoring is essential for safe warfarin therapy.",
    nclexThinkingTip: "Warfarin + aspirin = double bleeding risk. Always check for drug interactions with anticoagulants.",
  },
  {
    id: 33,
    examType: "RN",
    topic: "Pharmacology",
    difficulty: "hard",
    question: "A client receiving IV vancomycin develops sudden flushing, erythema, and hypotension during the infusion. What is the nurse's priority action?",
    options: ["Administer epinephrine IM", "Stop the infusion immediately", "Slow the infusion rate", "Notify the provider and document the reaction"],
    correctAnswer: 1,
    rationale: "The client is experiencing Red Man Syndrome, a common adverse reaction to vancomycin caused by too-rapid infusion. The priority action is to STOP the infusion immediately, then slow the rate when restarted.\n\nWhy the other options are less appropriate:\nA. Epinephrine is for anaphylaxis, not Red Man Syndrome.\nC. Slowing alone without stopping first is insufficient when symptoms are present.\nD. Documentation is done after the intervention.",
    nclexThinkingTip: "Red Man Syndrome = flushing + hypotension during vancomycin. STOP the infusion first.",
  },
  // ── NCLEX-RN: Mental Health ──
  {
    id: 34,
    examType: "RN",
    topic: "Mental Health",
    difficulty: "medium",
    question: "A nurse is caring for a client with schizophrenia who is prescribed haloperidol. The client develops muscle rigidity, hyperthermia, and altered mental status. What condition should the nurse suspect?",
    options: ["Tardive dyskinesia", "Neuroleptic malignant syndrome", "Extrapyramidal side effects", "Serotonin syndrome"],
    correctAnswer: 1,
    rationale: "Neuroleptic Malignant Syndrome (NMS) is a life-threatening reaction to antipsychotics characterized by muscle rigidity, hyperthermia, altered mental status, and autonomic instability. It requires immediate discontinuation of the antipsychotic.\n\nWhy the other options are incorrect:\nA. Tardive dyskinesia involves involuntary movements after long-term use.\nC. EPS involves tremors or acute dystonia, not hyperthermia.\nD. Serotonin syndrome is caused by serotonergic drugs.",
    nclexThinkingTip: "NMS = HALT: Hyperthermia, Altered mental status, Lead-pipe rigidity, Tachycardia/autonomic instability.",
  },
  {
    id: 35,
    examType: "RN",
    topic: "Mental Health",
    difficulty: "easy",
    question: "A client with major depressive disorder tells the nurse 'I just feel like everyone would be better off without me.' What is the nurse's priority response?",
    options: ["That is not true -- your family loves you very much", "Are you having thoughts of suicide or harming yourself?", "Let us focus on the positive things in your life", "I will let the provider know how you are feeling"],
    correctAnswer: 1,
    rationale: "The client's statement is a veiled suicidal ideation. The nurse's priority is to directly and calmly assess for suicidal intent. Direct questioning does not increase risk -- it opens the conversation and enables intervention.\n\nWhy the other options are less appropriate:\nA. Dismissing feelings is not therapeutic.\nC. Redirecting avoids addressing the immediate safety concern.\nD. Notifying the provider is important but assessment comes first.",
    nclexThinkingTip: "Always assess for suicidal ideation directly. Safety is the priority before any other therapeutic intervention.",
  },
  // ── NCLEX-RN: Maternity ──
  {
    id: 36,
    examType: "RN",
    topic: "Maternity",
    difficulty: "medium",
    question: "A nurse is monitoring a client in active labor. The fetal heart rate drops to 90 bpm during a contraction and returns to baseline slowly after the contraction ends. How should the nurse document this finding?",
    options: ["Early deceleration", "Late deceleration", "Variable deceleration", "Acceleration"],
    correctAnswer: 1,
    rationale: "Late decelerations occur after the peak of a contraction and recover slowly -- they indicate uteroplacental insufficiency and fetal hypoxia. This is a non-reassuring finding requiring immediate intervention.\n\nWhy the other options are incorrect:\nA. Early decelerations mirror contractions and are caused by head compression -- benign.\nC. Variable decelerations are abrupt and associated with cord compression.\nD. Accelerations are reassuring signs of fetal well-being.",
    nclexThinkingTip: "Late decel = late bad news. Uteroplacental insufficiency. Reposition, O2, stop oxytocin, call provider.",
  },
  // ── NCLEX-PN Questions ──
  {
    id: 37,
    examType: "PN",
    topic: "Basic Care",
    difficulty: "easy",
    question: "A PN is caring for a client who is NPO after midnight for surgery scheduled at 8 AM. The client asks for a glass of water at 6 AM. What is the appropriate response?",
    options: ["Provide a small sip of water only", "Explain that nothing can be given by mouth before surgery", "Offer ice chips instead", "Check with the charge nurse first"],
    correctAnswer: 1,
    rationale: "NPO (nothing by mouth) means no food or fluids including water. This reduces the risk of aspiration during anesthesia. The PN should explain this clearly and supportively to the client.\n\nWhy other options are incorrect:\nA. Even small sips violate NPO status.\nC. Ice chips are still oral intake.\nD. This is within the PN's scope -- no need to escalate.",
    nclexThinkingTip: "NPO means nothing at all by mouth. Reinforce the reason to promote client cooperation.",
  },
  {
    id: 38,
    examType: "PN",
    topic: "Pharmacology",
    difficulty: "medium",
    question: "A PN is preparing to administer a medication and notes the prescription reads metformin 500mg twice daily but the available tablets are 1000mg. What should the nurse do?",
    options: ["Administer one 1000mg tablet since it is the closest dose", "Cut the tablet in half and administer 500mg", "Clarify the prescription with the provider before administration", "Hold the medication and document the discrepancy"],
    correctAnswer: 2,
    rationale: "Any discrepancy between a prescribed dose and available medication requires clarification with the provider before administration to prevent medication errors.\n\nWhy other options are incorrect:\nA. Administering a double dose is dangerous.\nB. Not all tablets are scored for safe splitting.\nD. Holding without clarification delays treatment.",
    nclexThinkingTip: "When in doubt about a medication dose -- STOP and clarify. Never guess with medications.",
  },
  {
    id: 39,
    examType: "PN",
    topic: "Safety",
    difficulty: "easy",
    question: "A PN is caring for a client who is confused and at risk for falls. Which intervention is the highest priority?",
    options: ["Apply a vest restraint", "Keep the bed in the lowest position with side rails up", "Ask family to stay with the client at all times", "Place a fall risk sign on the door"],
    correctAnswer: 1,
    rationale: "Keeping the bed in the lowest position with side rails up is the priority safety intervention for a confused fall-risk client. It minimizes injury if the client attempts to get out of bed.\n\nWhy other options are less appropriate:\nA. Restraints are a last resort and require a provider order.\nC. Family presence helps but is not always possible.\nD. Signage alone does not prevent falls.",
    nclexThinkingTip: "Lowest bed + side rails = first-line fall prevention. Restraints are always the last resort.",
  },
  // ── CCRN Questions ──
  {
    id: 40,
    examType: "CCRN",
    topic: "Cardiovascular",
    difficulty: "hard",
    question: "A critical care nurse is caring for a client post-CABG. The client develops new ST elevation in leads II, III, and aVF with hypotension and diaphoresis. What is the nurse's priority action?",
    options: ["Increase IV fluid rate", "Notify the provider immediately", "Obtain a 12-lead ECG and notify the provider", "Administer nitroglycerin sublingual"],
    correctAnswer: 2,
    rationale: "ST elevation in leads II, III, and aVF indicates an inferior MI -- a medical emergency. The priority is to obtain a 12-lead ECG to confirm the finding and notify the provider simultaneously for immediate intervention.\n\nWhy other options are less appropriate:\nA. Fluids alone do not address the MI.\nB. Notification without the 12-lead ECG delays definitive diagnosis.\nD. Nitroglycerin requires provider order and can worsen hypotension.",
    nclexThinkingTip: "II, III, aVF = inferior wall MI. STEMI = emergency. 12-lead ECG + provider notification simultaneously.",
  },
  {
    id: 41,
    examType: "CCRN",
    topic: "Pulmonary",
    difficulty: "hard",
    question: "A mechanically ventilated client has the following ABG results: pH 7.28, PaCO2 58, HCO3 24, PaO2 78. How should the nurse interpret these results?",
    options: ["Metabolic acidosis", "Respiratory acidosis", "Metabolic alkalosis", "Respiratory alkalosis"],
    correctAnswer: 1,
    rationale: "pH 7.28 = acidosis. PaCO2 58 = elevated (normal 35-45) indicating CO2 retention = respiratory cause. HCO3 24 = normal, no metabolic compensation yet. This is uncompensated respiratory acidosis.\n\nWhy other options are incorrect:\nA. Metabolic acidosis would show low HCO3.\nC. Alkalosis requires pH above 7.45.\nD. Respiratory alkalosis would show low PaCO2.",
    nclexThinkingTip: "ABG interpretation: check pH first, then match CO2 or HCO3 to the pH direction. CO2 up = acidosis.",
  },
  {
    id: 42,
    examType: "CCRN",
    topic: "Neuro",
    difficulty: "medium",
    question: "A client with a traumatic brain injury has ICP of 22 mmHg. Which intervention should the nurse implement first?",
    options: ["Elevate HOB to 30 degrees", "Administer mannitol IV", "Hyperventilate the client", "Notify the neurosurgeon"],
    correctAnswer: 0,
    rationale: "Elevating the HOB to 30 degrees promotes venous drainage from the brain, reducing ICP. This is the first-line nursing intervention.\n\nWhy other options are secondary:\nB. Mannitol requires a provider order.\nC. Hyperventilation is only used as a short-term bridge in herniation.\nD. Notification is important but comes after the initial nursing intervention.",
    nclexThinkingTip: "Elevated ICP = HOB 30 degrees first. Head midline, no hip flexion. Reduce stimulation.",
  },
  // ── TEAS 7 / Pre-Nursing Questions ──
  {
    id: 43,
    examType: "TEAS",
    topic: "Science",
    difficulty: "medium",
    question: "Which of the following best describes the function of the sodium-potassium pump?",
    options: ["It moves sodium and potassium down their concentration gradients", "It uses ATP to move 3 Na+ out and 2 K+ into the cell", "It equalizes sodium and potassium concentrations across the membrane", "It only functions during action potentials"],
    correctAnswer: 1,
    rationale: "The sodium-potassium pump (Na+/K+ ATPase) is an active transport protein that uses ATP to move 3 sodium ions out of the cell and 2 potassium ions into the cell against their concentration gradients. This maintains the resting membrane potential.\n\nWhy other options are incorrect:\nA. Active transport moves ions AGAINST gradients, not down.\nC. It maintains concentration differences, not equality.\nD. It functions continuously, not just during action potentials.",
    nclexThinkingTip: "Na/K pump: 3 Na OUT, 2 K IN, uses ATP. This is active transport -- against the gradient.",
  },
  {
    id: 44,
    examType: "TEAS",
    topic: "Math",
    difficulty: "easy",
    question: "A nurse needs to administer 0.5 mg of a medication. The available concentration is 2 mg/mL. How many mL should the nurse administer?",
    options: ["0.1 mL", "0.25 mL", "0.5 mL", "1 mL"],
    correctAnswer: 1,
    rationale: "Use the formula: Volume = Desired dose / Available concentration. Volume = 0.5 mg / 2 mg/mL = 0.25 mL.\n\nWhy other options are incorrect:\nA. 0.1 mL = 0.2 mg -- too little.\nC. 0.5 mL = 1 mg -- too much.\nD. 1 mL = 2 mg -- double the desired dose.",
    nclexThinkingTip: "Dose calculation: Desired / Have x Volume. Always label your units to avoid errors.",
  },
  {
    id: 45,
    examType: "TEAS",
    topic: "English",
    difficulty: "easy",
    question: "Which of the following sentences uses correct subject-verb agreement?",
    options: ["The group of nurses are ready for the briefing", "Each of the students have submitted their assignments", "Neither the doctor nor the nurses was available", "The team of doctors is preparing for rounds"],
    correctAnswer: 3,
    rationale: "Collective nouns like 'team' take a singular verb when acting as one unit. 'The team is' is correct.\n\nWhy other options are incorrect:\nA. 'Group' is singular -- should be 'is ready'.\nB. 'Each' is singular -- should be 'has submitted'.\nC. With 'neither/nor', the verb agrees with the nearer subject 'nurses' -- should be 'were available'.",
    nclexThinkingTip: "Collective nouns (team, group, staff) = singular verb. Each/every/neither = singular.",
  },
  // ── Nursing School Questions ──
  {
    id: 46,
    examType: "NURSING_SCHOOL",
    topic: "Fundamentals",
    difficulty: "easy",
    question: "A nursing student is performing hand hygiene. Which action indicates correct technique?",
    options: ["Rinsing hands before applying soap", "Scrubbing hands for at least 20 seconds", "Using hot water to kill bacteria more effectively", "Drying hands from wrist to fingertips"],
    correctAnswer: 1,
    rationale: "The CDC recommends scrubbing all surfaces of hands for at least 20 seconds with soap and water. This duration is necessary to reduce microbial counts effectively.\n\nWhy other options are incorrect:\nA. Soap is applied before rinsing, not after.\nC. Water temperature does not significantly affect bacterial killing -- friction does.\nD. Dry from fingertips to wrist to prevent recontamination.",
    nclexThinkingTip: "20 seconds minimum handwashing. Friction is what removes organisms -- not water temperature.",
  },
  {
    id: 47,
    examType: "NURSING_SCHOOL",
    topic: "Fundamentals",
    difficulty: "medium",
    question: "A student nurse is preparing to insert a urinary catheter. In what order should the following steps be performed? 1. Cleanse the urethral meatus 2. Open the sterile kit 3. Apply sterile gloves 4. Test balloon integrity",
    options: ["2, 3, 4, 1", "3, 2, 4, 1", "2, 4, 3, 1", "3, 4, 2, 1"],
    correctAnswer: 0,
    rationale: "Correct order: Open the sterile kit first (2), then apply sterile gloves (3), test balloon integrity (4), then cleanse the urethral meatus (1). Maintaining sterile technique throughout prevents catheter-associated UTIs.\n\nWhy other options are incorrect:\nB, C, D all violate sterile technique by applying gloves before opening the kit or skipping balloon testing.",
    nclexThinkingTip: "Sterile catheter insertion: open kit first, then gloves. Never contaminate your sterile field.",
  }
] as Question[]








