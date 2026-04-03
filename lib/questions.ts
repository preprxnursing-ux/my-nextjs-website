export type Question = {
  id: number
  examType: "RN"
  topic: "Med-Surg"
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
      "Hypoglycemia triggers activation of the sympathetic (adrenergic) nervous system as the body attempts to raise blood glucose levels. This results in early warning signs such as diaphoresis, tremors, anxiety, palpitations, and tachycardia. Recognizing these early symptoms allows for prompt intervention before neurologic impairment occurs.\n\nWhy the other options are less appropriate:\nA. Warm, dry skin – More commonly associated with hyperglycemia or dehydration rather than low blood glucose.\nB. Bradycardia – Hypoglycemia typically causes tachycardia due to sympathetic stimulation, not a slowed heart rate.\nD. Deep, slow respirations – Seen in metabolic acidosis (e.g., diabetic ketoacidosis), not in hypoglycemia.",
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
      "Temperature of 99.5°F (37.5°C)",
      "Heart rate of 118/min",
      "Urine output of 35 mL/hr",
      "WBC 11,000/mm³",
    ],
    correctAnswer: 1,
    rationale:
      "An elevated heart rate in the early postoperative period is often the earliest indicator of hypovolemia or internal bleeding. The body compensates for decreased circulating volume by increasing heart rate before a drop in blood pressure occurs, making this a critical early warning sign.\n\nWhy the other options are less concerning at this time:\nA. Mild elevation in temperature – Low-grade fever is common within the first 24 hours postoperatively due to inflammatory response or atelectasis.\nC. Urine output of 35 mL/hr – This is slightly above the minimum acceptable output (30 mL/hr) and does not immediately indicate renal compromise.\nD. WBC 11,000/mm³ – Mild leukocytosis is expected as part of the normal stress response following surgery.",
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
      "Assessment is the priority when a client’s condition changes. Evaluating lung sounds helps determine the presence and severity of pulmonary congestion (e.g., crackles), which directly informs the urgency and type of intervention needed.\n\nWhy the other options are not the first priority:\nA. Encourage ambulation – Activity may worsen dyspnea in a client experiencing fluid overload.\nB. Restrict fluids – While appropriate in heart failure management, this is an intervention that should follow assessment.\nD. Notify dietary services – Dietary adjustments are important for long-term management but do not address the client’s immediate symptoms.",
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
      "Hyperkalemia affects cardiac conduction by altering myocardial repolarization. This produces tall, peaked T waves, which are a classic early ECG change and may progress to widening of the QRS complex and life-threatening dysrhythmias if untreated.\n\nWhy the other options are incorrect:\nA. Flattened T waves – More consistent with hypokalemia.\nB. U waves – Also associated with hypokalemia.\nD. ST-segment depression – Typically associated with myocardial ischemia rather than electrolyte imbalance.",
    nclexThinkingTip:
      "Think: “High potassium = peaked T waves” and increased risk for dysrhythmias.",
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
      "An improvement in oxygen saturation reflects enhanced gas exchange and oxygen delivery, which is the primary goal of oxygen therapy. In clients with COPD, even modest increases in SpO₂ can represent meaningful clinical improvement.\n\nWhy the other options indicate concern rather than improvement:\nA. Increased respiratory rate – May indicate ongoing respiratory distress or inadequate oxygenation.\nC. Restlessness – Often an early sign of hypoxia.\nD. Increased heart rate – Can also signal hypoxia or physiological stress.",
    nclexThinkingTip:
      "Evaluate effectiveness using objective data (e.g., SpO₂), not just observable effort or symptoms.",
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
      "Blurred vision and polyuria are classic manifestations of current hyperglycemia. A random blood glucose level provides immediate, real-time information needed to confirm the condition and guide prompt management.\n\nWhy the other options are less appropriate initially:\nA. Potassium – Important in diabetes management, especially in DKA, but not the first priority without evidence of severe imbalance.\nB. HbA1c – Reflects long-term glycemic control over 2–3 months and does not address the client’s acute symptoms.\nD. Urine ketones – Useful if diabetic ketoacidosis is suspected, but confirmation of hyperglycemia is the immediate priority.",
    nclexThinkingTip:
      "Acute symptoms → prioritize real-time diagnostic data over long-term indicators.",
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
      "A blood pressure of 84/50 mm Hg indicates hypotension and possible septic shock, reflecting inadequate tissue perfusion. This is life-threatening and requires immediate intervention such as fluid resuscitation and vasopressor support.\n\nWhy the other options are expected or less urgent findings:\nA. Fever – A common manifestation of infection and part of the systemic inflammatory response.\nC. Elevated WBC – Indicates immune activation but does not directly signal hemodynamic instability.\nD. Respiratory rate of 22/min – Mild tachypnea is expected in sepsis and is not immediately critical.",
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
      "Daily weight monitoring allows early detection of fluid retention, often before symptoms such as dyspnea develop. Reporting sudden weight gain enables timely intervention and helps prevent exacerbations.\n\nWhy the other options are incorrect:\nA. Weigh only when short of breath – Delays recognition of worsening fluid overload.\nC. Stop fluid limits when symptoms improve – Heart failure is a chronic condition requiring ongoing management.\nD. Avoid activity – Regular, moderate activity is encouraged as tolerated to improve cardiovascular function.",
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
      "The kidneys play a key role in potassium excretion. In chronic kidney disease, impaired filtration leads to potassium retention, increasing the risk of life-threatening cardiac dysrhythmias.\n\nWhy the other options are less likely primary complications:\nA. Metabolic alkalosis – CKD more commonly leads to metabolic acidosis due to impaired acid excretion.\nC. Hypoglycemia – Not a direct or primary complication of CKD.\nD. Thrombocytopenia – While platelet dysfunction may occur, it is not the most immediate or life-threatening risk.",
    nclexThinkingTip:
      "Renal failure → watch potassium closely — it directly affects the heart.",
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
      "Positioning the client on their side (lateral position) helps maintain airway patency and reduces the risk of aspiration from saliva or emesis during the seizure.\n\nWhy the other options are unsafe or inappropriate:\nA. Insert an oral airway – Placing objects in the mouth during a seizure can cause injury to the client or nurse.\nB. Restrain the client – Restraints increase the risk of musculoskeletal injury.\nD. Administer oral fluids – Contraindicated due to risk of aspiration.",
    nclexThinkingTip:
      "During a seizure → protect the airway and prevent injury; avoid inserting objects or restraining.",
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
      "Hypertension is defined as a sustained elevation in blood pressure over time. It is often asymptomatic but leads to progressive damage to organs such as the heart, kidneys, brain, and blood vessels if left untreated.\n\nWhy the other options are incorrect:\nA. Hypoglycemia – Not related to hypertension; refers to low blood glucose levels.\nC. Decreased vascular resistance – Hypertension is associated with increased, not decreased, vascular resistance.\nD. Bradycardia – Hypertension does not typically cause a decreased heart rate.",
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
      "Improved oxygen saturation indicates better alveolar gas exchange, reflecting resolution of inflammation and improved lung function.\n\nWhy the other options suggest ongoing or worsening illness:\nA. Rising WBC – May indicate persistent or worsening infection.\nC. Thicker sputum – Suggests continued inflammation or inadequate airway clearance.\nD. Respiratory rate 30/min – Indicates ongoing respiratory distress.",
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
      "Elevated ammonia levels result from impaired liver detoxification and can lead to hepatic encephalopathy, which presents as confusion, altered mental status, and decreased level of consciousness.\n\nWhy the other options are less directly related to confusion:\nB. Sodium – Imbalances can affect cognition but are not the primary cause in cirrhosis-related confusion.\nC. BUN – Reflects kidney function, not directly linked to hepatic encephalopathy.\nD. Platelets – Important for bleeding risk but unrelated to acute mental status changes.",
    nclexThinkingTip:
      "Liver dysfunction + mental status change → prioritize ammonia levels.",
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
      "Fecal-smelling emesis indicates that intestinal contents are backing up significantly, reflecting a late and severe obstruction requiring urgent intervention.\n\nWhy the other options are less specific or occur earlier:\nA. Abdominal distention – Common but not specific to severity.\nB. Decreased appetite – Nonspecific symptom.\nD. Hypoactive bowel sounds – May occur but do not indicate severity on their own.",
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
      "High-Fowler’s",
      "Trendelenburg",
    ],
    correctAnswer: 2,
    rationale:
      "High-Fowler’s position (sitting upright) maximizes diaphragmatic movement and lung expansion, improving ventilation and reducing the work of breathing.\n\nWhy the other positions are less appropriate:\nA. Supine – Limits lung expansion and may worsen dyspnea.\nB. Prone – Used in specific cases (e.g., ARDS), not general dyspnea management.\nD. Trendelenburg – Increases pressure on the diaphragm and impairs breathing.",
    nclexThinkingTip:
      "Difficulty breathing → optimize lung expansion by positioning upright.",
  },

  {
    id: 16,
    examType: "RN",
    topic: "Med-Surg",
    difficulty: "medium",
    question:
      "A client’s blood glucose is 48 mg/dL. What is the priority action?",
    options: [
      "Administer insulin",
      "Check HbA1c",
      "Give a fast-acting carbohydrate",
      "Notify the healthcare provider",
    ],
    correctAnswer: 2,
    rationale:
      "Hypoglycemia at this level is immediately life-threatening. Administering a fast-acting carbohydrate (e.g., glucose tablets, juice) rapidly raises blood glucose to prevent neurologic compromise.\n\nWhy the other options are not first priority:\nA. Insulin – Would worsen hypoglycemia; contraindicated.\nB. Check HbA1c – Provides long-term control information but is irrelevant in an acute crisis.\nD. Notify provider – Important after stabilizing the patient, but treatment comes first.",
    nclexThinkingTip:
      "Acute hypoglycemia → treat immediately, then evaluate cause.",
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
      "Opioid-induced respiratory depression is life-threatening. Naloxone reverses opioid effects and restores adequate ventilation rapidly.\n\nWhy the other options are secondary or insufficient:\nA. Provide supplemental oxygen – Does not address hypoventilation caused by opioids.\nB. Stimulate the client verbally – May temporarily increase RR but does not reverse the drug effect.\nD. Call rapid response – Appropriate in escalation but naloxone administration comes first.",
    nclexThinkingTip:
      "Slow RR on opioids → antagonist first, support second.",
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
      "Dry mucous membranes are an early, sensitive indicator of fluid deficit before vital signs become abnormal. Monitoring oral mucosa allows timely intervention.\n\nWhy the other options occur later or are less specific:\nA. Bounding pulse – May occur in overhydration, not dehydration.\nC. Crackles – Sign of fluid overload in lungs.\nD. Elevated BP – Often appears in later stages or with compensatory mechanisms.",
    nclexThinkingTip:
      "Early dehydration → look for subtle signs like dry mucosa or skin turgor.",
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
      "Deep breathing and incentive spirometry help inflate alveoli, improve oxygenation, and prevent postoperative atelectasis and pneumonia, especially after abdominal or thoracic surgery.\n\nWhy the other options are not the main purpose:\nA. To reduce pain – While deep breathing can support relaxation, analgesia is needed for pain control.\nC. To promote sleep – Not the primary rationale.\nD. To alleviate nausea – Ineffective for nausea prevention.",
    nclexThinkingTip:
      "Post-op lungs collapse silently → proactive alveolar expansion is essential.",
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
      "The body compensates for blood loss by increasing heart rate before blood pressure falls, making tachycardia the earliest and most sensitive indicator of hemorrhage.\n\nWhy the other options occur later:\nA. Pallor – Appears as perfusion decreases.\nB. Low urine output – Occurs when renal perfusion declines, later in blood loss.\nC. Hypotension – A late sign after significant volume depletion.",
    nclexThinkingTip:
      "Hemorrhage → tachycardia precedes hypotension; monitor vital signs closely.",
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
      "Fever increases insensible fluid losses through sweat and increased metabolic rate. Providing adequate hydration supports thermoregulation, perfusion, and cellular function.\n\nWhy the other options are incorrect or counterproductive:\nA. Apply blankets – Can worsen hyperthermia and discomfort.\nC. Restrict oral intake – Increases risk of dehydration.\nD. Keep room warm – Can exacerbate fever and heat retention.",
    nclexThinkingTip:
      "Fever → hydrate first to support physiological compensation.",
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
      "Pale conjunctiva reflects reduced hemoglobin/hematocrit, which diminishes oxygen-carrying capacity and is a classic clinical sign of anemia.\n\nWhy the other options are incorrect:\nA. High BP – Not typically related to anemia.\nC. Bounding pulses – More characteristic of hypervolemia or high-output states.\nD. Low urine output – Indicates renal perfusion issues, not anemia.",
    nclexThinkingTip:
      "Anemia → look for pallor and hypoxia-related signs.",
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
      "Continuous bubbling in the water-seal chamber signals a persistent air leak, which prevents complete lung re-expansion and requires assessment and possible intervention.\n\nWhy the other options are incorrect:\nA. Normal function – Tidaling, not continuous bubbling, is normal.\nB. Lung re-expansion – Continuous bubbling indicates incomplete expansion.\nD. Tidaling – Fluctuation with respiration is normal; continuous bubbling is not.",
    nclexThinkingTip:
      "Chest tube → continuous bubbling = problem, not normal.",
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
      "Melena indicates digested blood from the upper gastrointestinal tract, usually from bleeding in the esophagus, stomach, or duodenum.\n\nWhy the other options are incorrect:\nA. Hematochezia – Bright red blood from lower GI tract.\nC. Occult – Hidden blood, detectable only by testing.\nD. Steatorrhea – Fatty, greasy stools due to malabsorption.",
    nclexThinkingTip:
      "Black, tarry stool → upper GI bleeding until proven otherwise.",
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
      "Elderly clients often present atypically; confusion or altered mental status can be the first and only sign of a UTI, even without fever or dysuria.\n\nWhy the other options are less reliable:\nA. Fever – May be absent in older adults.\nC. Bradycardia – Not associated with UTI.\nD. Increased appetite – Not related to infection.",
    nclexThinkingTip:
      "In older adults → altered mental status often precedes classic infection signs.",
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
      "30 mL/hr is considered the minimum acceptable urine output. Consistent readings at this threshold warrant close monitoring for renal perfusion or early kidney injury.\n\nWhy the other options are acceptable:\nA. 50 mL/hr – Within normal range.\nC. 120 mL/2 hr – Equivalent to 60 mL/hr, acceptable.\nD. 400 mL/8 hr – 50 mL/hr, adequate.",
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
      "Trauma commonly causes blood or fluid loss, leading to hypovolemic shock. Rapid recognition and volume resuscitation are critical.\n\nWhy the other options are less likely:\nA. Cardiogenic – Usually from cardiac pump failure, not trauma.\nB. Neurogenic – Occurs after spinal cord injury with vasodilation.\nD. Anaphylactic – Due to severe allergic reaction, not trauma.",
    nclexThinkingTip:
      "Trauma + hypotension → think volume loss first.",
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
      "Hypokalemia increases the risk of life-threatening cardiac dysrhythmias, especially in patients taking loop or thiazide diuretics.\n\nWhy the other values are less critical:\nA. Sodium 140 – Normal.\nC. Calcium 9.2 – Within normal limits.\nD. Magnesium 1.9 – Acceptable; monitor if trend downward.",
    nclexThinkingTip:
      "Diuretics → monitor potassium closely; low K+ kills first.",
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
      "Elevating the head of the bed reduces reflux by using gravity, protecting the esophagus and preventing discomfort.\n\nWhy the other options are harmful:\nA. Large meals – Increase gastric pressure and reflux.\nB. Lie flat after meals – Worsens reflux.\nD. Spicy foods – Irritates esophageal lining.",
    nclexThinkingTip:
      "GERD management → positioning + dietary modification are key.",
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
      "Pressure injuries develop from prolonged pressure, moisture, and immobility. Clients who are both immobile and incontinent have highest susceptibility.\n\nWhy the other options are lower risk:\nA. Ambulatory – Pressure is redistributed regularly.\nB. Obese – Some risk, but mobility mitigates pressure.\nD. High-protein diet – Protective, not a risk factor.",
    nclexThinkingTip:
      "Pressure injury risk = pressure + moisture + immobility.",
  },
]