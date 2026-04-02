export type Question = {
  id: number;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: string[];
  correctAnswer: number;
  rationale: string;
};

export const questions: Question[] = [
  {
    id: 1,
    topic: "Endocrine",
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
      "Hypoglycemia commonly causes diaphoresis, tremors, and anxiety because of sympathetic nervous system activation.",
  },
  {
    id: 2,
    topic: "Pharmacology",
    difficulty: "medium",
    question:
      "Which action is most important before administering IV potassium?",
    options: [
      "Check blood pressure",
      "Check urine output",
      "Check oxygen saturation",
      "Check temperature",
    ],
    correctAnswer: 1,
    rationale:
      "Potassium should never be given if urine output is inadequate because it can worsen hyperkalemia and lead to dangerous cardiac effects.",
  },
  {
    id: 3,
    topic: "Cardiovascular",
    difficulty: "easy",
    question:
      "Which assessment finding is most concerning in a client with heart failure?",
    options: [
      "Crackles in the lungs",
      "Heart rate of 88/min",
      "Blood pressure of 128/76 mm Hg",
      "Mild fatigue with activity",
    ],
    correctAnswer: 0,
    rationale:
      "Crackles indicate fluid accumulation in the lungs and may signal worsening heart failure.",
  },
  {
    id: 4,
    topic: "Respiratory",
    difficulty: "medium",
    question:
      "A client with COPD is receiving oxygen. Which finding indicates oxygen therapy is effective?",
    options: [
      "Respiratory rate increases from 18 to 28/min",
      "Oxygen saturation rises from 86% to 92%",
      "Client becomes restless and confused",
      "Heart rate increases significantly",
    ],
    correctAnswer: 1,
    rationale:
      "An increase in oxygen saturation toward the prescribed target range indicates improved oxygenation.",
  },
  {
    id: 5,
    topic: "Neurology",
    difficulty: "hard",
    question:
      "Which intervention is the priority for a client actively having a seizure?",
    options: [
      "Insert an oral airway",
      "Restrain the client's arms",
      "Turn the client to the side",
      "Offer fluids after the seizure begins",
    ],
    correctAnswer: 2,
    rationale:
      "Turning the client to the side helps maintain airway patency and reduces aspiration risk during a seizure.",
  },
  {
    id: 6,
    topic: "Maternity",
    difficulty: "easy",
    question:
      "Which finding should the nurse report immediately in a postpartum client?",
    options: [
      "Scant lochia rubra",
      "Fundus firm at midline",
      "Saturated perineal pad in 15 minutes",
      "Mild afterpains during breastfeeding",
    ],
    correctAnswer: 2,
    rationale:
      "Saturating a pad in 15 minutes suggests postpartum hemorrhage and requires immediate intervention.",
  },
  {
    id: 7,
    topic: "Pediatrics",
    difficulty: "medium",
    question:
      "Which statement by a parent of a child with asthma indicates understanding of discharge teaching?",
    options: [
      "We will use the rescue inhaler every morning.",
      "We will avoid known triggers when possible.",
      "Antibiotics should be started with every wheezing episode.",
      "Activity should always be restricted.",
    ],
    correctAnswer: 1,
    rationale:
      "Avoiding known triggers is a key part of asthma management and prevention of exacerbations.",
  },
  {
    id: 8,
    topic: "Infection Control",
    difficulty: "easy",
    question:
      "Which personal protective equipment is required when caring for a client on airborne precautions?",
    options: [
      "Surgical mask",
      "Face shield",
      "N95 respirator",
      "Sterile gloves only",
    ],
    correctAnswer: 2,
    rationale:
      "An N95 respirator is required for airborne precautions to protect against inhalation of infectious particles.",
  },
  {
    id: 9,
    topic: "Renal",
    difficulty: "medium",
    question:
      "Which laboratory value is most important to monitor in a client with chronic kidney disease?",
    options: [
      "Potassium",
      "Hemoglobin",
      "Platelet count",
      "Amylase",
    ],
    correctAnswer: 0,
    rationale:
      "Potassium imbalance is a major concern in kidney disease because the kidneys regulate potassium excretion.",
  },
  {
    id: 10,
    topic: "Delegation",
    difficulty: "hard",
    question:
      "Which task is appropriate for the nurse to delegate to an assistive personnel (AP)?",
    options: [
      "Assess pain after analgesic administration",
      "Teach a client how to use an incentive spirometer",
      "Obtain routine vital signs on a stable client",
      "Evaluate a client’s understanding of discharge instructions",
    ],
    correctAnswer: 2,
    rationale:
      "Routine vital signs on a stable client are within the typical scope of assistive personnel.",
  },
];