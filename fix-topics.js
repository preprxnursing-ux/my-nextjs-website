const fs = require('fs');
let f = fs.readFileSync('app/quiz/select/page.tsx','utf8');

f = f.replace(
`const courses = [
  {
    examType: "RN",
    label: "NCLEX-RN",
    subtitle: "Registered Nurse",
    color: "#0ea5e9",
    goal: "nclex-rn",
    topics: ["Med-Surg", "Pharmacology", "Mental Health", "Maternity"],
  },
  {
    examType: "PN",
    label: "NCLEX-PN",
    subtitle: "Practical Nurse",
    color: "#8b5cf6",
    goal: "nclex-pn",
    topics: ["Basic Care", "Pharmacology", "Safety"],
  },
  {
    examType: "CCRN",
    label: "CCRN",
    subtitle: "Critical Care",
    color: "#ef4444",
    goal: "ccrn",
    topics: ["Cardiovascular", "Pulmonary", "Neuro"],
  },
  {
    examType: "TEAS",
    label: "TEAS 7",
    subtitle: "Pre-Nursing",
    color: "#f59e0b",
    goal: "pre-nursing",
    topics: ["Science", "Math", "English"],
  },
  {
    examType: "NURSING_SCHOOL",
    label: "Nursing School",
    subtitle: "Fundamentals",
    color: "#10b981",
    goal: "nursing-school",
    topics: ["Fundamentals"],
  },
  {
    examType: "NP",
    label: "Nurse Practitioner",
    subtitle: "NP / FNP",
    color: "#6366f1",
    goal: "np",
    topics: ["Pharmacology", "Diagnostics"],
  },
];`,
`const courses = [
  {
    examType: "RN",
    label: "NCLEX-RN",
    subtitle: "Registered Nurse",
    color: "#0ea5e9",
    goal: "nclex-rn",
    topics: ["All Topics","Management of Care","Safety & Infection Control","Health Promotion","Psychosocial Integrity","Basic Care & Comfort","Pharmacology","Reduction of Risk","Physiological Adaptation","Med-Surg","Maternity","Mental Health","Pediatrics"],
  },
  {
    examType: "PN",
    label: "NCLEX-PN",
    subtitle: "Practical Nurse",
    color: "#8b5cf6",
    goal: "nclex-pn",
    topics: ["All Topics","Basic Care & Comfort","Pharmacology","Safety & Infection Control","Coordinated Care","Health Promotion","Psychosocial Integrity","Physiological Adaptation"],
  },
  {
    examType: "CCRN",
    label: "CCRN",
    subtitle: "Critical Care",
    color: "#ef4444",
    goal: "ccrn",
    topics: ["All Topics","Cardiovascular","Pulmonary","Neuro","Renal","Endocrine","Hematology","Multisystem","Behavioural & Psychosocial"],
  },
  {
    examType: "TEAS",
    label: "TEAS 7",
    subtitle: "Pre-Nursing",
    color: "#f59e0b",
    goal: "pre-nursing",
    topics: ["All Topics","Science","Math","English & Language Arts","Reading"],
  },
  {
    examType: "NURSING_SCHOOL",
    label: "Nursing School",
    subtitle: "Fundamentals",
    color: "#10b981",
    goal: "nursing-school",
    topics: ["All Topics","Fundamentals","Pharmacology","Med-Surg","Nutrition","Patient Safety","Documentation"],
  },
  {
    examType: "NP",
    label: "Nurse Practitioner",
    subtitle: "NP / FNP",
    color: "#6366f1",
    goal: "np",
    topics: ["All Topics","Pharmacology","Diagnostics","Primary Care","Women\u2019s Health","Cardiology","Endocrinology","Dermatology"],
  },
];`
);

fs.writeFileSync('app/quiz/select/page.tsx', f, 'utf8');
console.log('Done');
