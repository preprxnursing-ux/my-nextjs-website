export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  tag: string;
  tagColor: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  featured: boolean;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-pass-nclex-first-attempt",
    title: "How to Pass the NCLEX-RN on Your First Attempt",
    excerpt: "Most students who fail NCLEX don't fail because they don't know enough — they fail because they don't know how to think like a nurse. Here's the strategic approach that works.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    tag: "NCLEX Strategy",
    tagColor: "#0ea5e9",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "March 15, 2025",
    readTime: "8 min read",
    featured: true,
    content: `
## The #1 Reason Students Fail NCLEX

After working with thousands of nursing students, the pattern is clear: most students who fail NCLEX are not failing because they lack clinical knowledge. They're failing because the exam tests something different — it tests **clinical reasoning**, not memorisation.

NCLEX wants to know: *Can this person think like a safe, entry-level nurse?*

That shift in understanding changes everything about how you prepare.

---

## What "Thinking Like a Nurse" Actually Means

In nursing school, a question might ask: *"What is the normal potassium level?"*

On NCLEX, the question asks: *"Your patient has a potassium of 2.8 mEq/L and is prescribed digoxin. What do you do first?"*

The first question tests recall. The second tests judgement. NCLEX is almost entirely the second type.

To pass, you need to train your brain to:

1. **Identify what the question is actually asking** — most wrong answers come from answering a different question than the one written
2. **Eliminate clearly wrong options first** — you're rarely choosing the best answer from four good ones; usually two are clearly wrong
3. **Apply the ABCs and Maslow's hierarchy** — airway, breathing, circulation always come before psychosocial needs
4. **Think about the safest action** — NCLEX nurses are cautious, methodical, and follow protocol

---

## The 3-Phase Study Plan That Works

### Phase 1: Foundation (Weeks 1-2)
Focus entirely on high-yield content areas: pharmacology, fluid and electrolytes, acid-base balance, and prioritisation frameworks (ABC, SBAR, Maslow). These areas account for the majority of NCLEX questions.

### Phase 2: Practice (Weeks 3-5)
Do at least 75-100 questions per day. Review every single rationale, even for questions you got right. You may have chosen the right answer for the wrong reason.

### Phase 3: Simulation (Week 6)
Take full-length timed practice exams under real conditions. After each exam, identify your three weakest topic areas and spend 30 minutes reviewing each one.

---

## The Day Before the Exam

Do not study the day before. Sleep 8 hours. Eat a proper breakfast. Arrive 30 minutes early.

Trust your training. Read every question twice. Eliminate wrong answers methodically. You've prepared for this.
    `,
  },
  {
    slug: "ngn-next-generation-nclex-guide",
    title: "The Complete Guide to Next Generation NCLEX (NGN)",
    excerpt: "The NGN introduced new question formats that many students find intimidating. We break down every format with examples and strategies to tackle each one confidently.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80",
    tag: "NGN Prep",
    tagColor: "#8b5cf6",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "March 8, 2025",
    readTime: "12 min read",
    featured: true,
    content: `
## What Is Next Generation NCLEX?

In April 2023, the NCSBN launched the Next Generation NCLEX (NGN), designed to measure clinical judgement skills the old exam couldn't capture.

---

## The 6 New NGN Question Formats

**1. Extended Multiple Response (EMR):** Select all answers that apply — partial credit is possible.

**2. Extended Drag and Drop:** Drag items into correct order or category.

**3. Cloze (Drop-Down):** Complete clinical sentences using drop-down menus embedded in the text.

**4. Enhanced Hot Spot:** Highlight relevant findings in a clinical document.

**5. Matrix (Grid):** Check boxes at intersections in a table — one row at a time.

**6. Bowtie:** The most complex format. Identify causes on the left, a condition at centre, and nursing actions on the right.

---

## Case Study Format

Many NGN questions come in case study clusters — one patient scenario followed by 6 questions testing all phases of the NCSBN Clinical Judgement Measurement Model: recognise cues, analyse cues, prioritise hypotheses, generate solutions, take action, and evaluate outcomes.

---

## How to Prepare

Practise with actual NGN-format questions. Focus especially on Bowtie (highest failure rate), Matrix (easy to rush), and full case study clusters.
    `,
  },
  {
    slug: "pharmacology-nclex-tips",
    title: "5 Pharmacology Strategies That Actually Work for NCLEX",
    excerpt: "Pharmacology is the most feared topic on NCLEX. These five clinical reasoning strategies will help you answer pharm questions even when you don't remember the specific drug.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    tag: "Pharmacology",
    tagColor: "#10b981",
    author: "Melissa",
    authorRole: "Student Success Lead",
    date: "February 28, 2025",
    readTime: "6 min read",
    featured: false,
    content: `
## Strategy 1: Know Drug Classes by Suffix

- *-olol* = beta-blocker (monitor HR, hold if <60)
- *-pril* = ACE inhibitor (watch for dry cough, hyperkalemia)
- *-sartan* = ARB (similar to ACE inhibitor, no cough)
- *-statin* = cholesterol lowering (monitor liver enzymes)
- *-mycin* = antibiotic (check allergies, monitor for C. diff)

## Strategy 2: Understand the Mechanism

Before memorising side effects, understand what a drug blocks or activates. Beta-blockers slow the heart — so bradycardia and hypotension are logical, not arbitrary, side effects.

## Strategy 3: Focus on High-Yield Categories

Cardiac drugs, anticoagulants, psychiatric medications, antibiotics, insulin, and opioids account for the majority of pharmacology questions on NCLEX.

## Strategy 4: Use the Safe Nurse Framework

The safe nurse always checks vitals, verifies the last relevant lab value, checks allergies, reviews interactions, and holds the medication if something is out of range.

## Strategy 5: Memorise These Antidotes

| Drug/Toxin | Antidote |
|---|---|
| Opioids | Naloxone (Narcan) |
| Benzodiazepines | Flumazenil |
| Heparin | Protamine sulfate |
| Warfarin | Vitamin K |
| Acetaminophen overdose | N-acetylcysteine |
| Digoxin toxicity | Digibind |
| Magnesium sulfate toxicity | Calcium gluconate |
    `,
  },
  {
    slug: "international-nurses-nclex",
    title: "International Nurses: What You Need to Know Before Taking NCLEX",
    excerpt: "If you trained outside the US, NCLEX can feel like a completely different style of thinking. Here's exactly what international nurses need to focus on to pass.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
    tag: "International Nurses",
    tagColor: "#f59e0b",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "February 18, 2025",
    readTime: "10 min read",
    featured: false,
    content: `
## The International Nurse Challenge

If you trained as a nurse outside the United States, you already have real clinical skills. But NCLEX tests whether you can think like a US entry-level nurse — in the context of US healthcare culture, scope of practice, and legal framework.

---

## Key Difference 1: The Nurse's Role

In the US model, nurses are expected to be active clinical decision-makers who assess independently, act before calling the doctor, refuse unsafe orders, and advocate for patients.

## Key Difference 2: Scope of Practice

- Do not call the doctor too quickly — assess thoroughly first
- Delegate routine tasks to UAPs, but never assessment, teaching, or complex care
- Question orders that seem wrong or potentially harmful

## Key Difference 3: Language

- "Provider" = any licensed prescriber
- "UAP" = unlicensed assistive personnel
- "Client" = patient
- "Primary nurse" = nurse responsible for overall care

---

## Study Recommendations

Add 2-4 extra weeks to your study plan. Focus heavily on delegation, scope of practice, legal and ethical concepts, and communication frameworks (SBAR, chain of command).
    `,
  },
  {
    slug: "nclex-study-schedule",
    title: "The 6-Week NCLEX Study Schedule That Actually Works",
    excerpt: "A week-by-week breakdown of how to structure your study time in the six weeks before your NCLEX exam — including what to focus on, when to take practice exams, and how to avoid burnout.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    tag: "Study Planning",
    tagColor: "#34d399",
    author: "Melissa",
    authorRole: "Student Success Lead",
    date: "February 10, 2025",
    readTime: "9 min read",
    featured: false,
    content: `
## Week 1: Clinical Foundations
Fluid and electrolytes, acid-base balance, lab values, vital signs. 50 questions/day, read every rationale.

## Week 2: Pharmacology Blitz
Top 10 drug classes, antidotes, safe administration. 75 questions/day, start timing yourself at 60 seconds per question.

## Week 3: System-by-System Review
One body system per day: cardiovascular, respiratory, neurological, renal, musculoskeletal, endocrine. Day 7 = rest.

## Week 4: Mental Health and Specialty Areas
Psychiatric nursing, maternal/newborn, paediatric, oncology. These are under-studied and heavily weighted.

## Week 5: NGN and Prioritisation
All 6 NGN formats, delegation, triage. Take one full 145-question practice exam on Day 5.

## Week 6: Simulation
Full practice exams Days 1-3. Light review Days 4-5. Complete rest Day 6. Exam Day 7.

The most important rule of Week 6: do not introduce new content.
    `,
  },
  {
    slug: "clinical-priority-questions",
    title: "How to Answer Clinical Priority Questions Every Time",
    excerpt: "Priority questions are the hardest type on NCLEX. The ABC framework is helpful, but there's a deeper logic that most students miss. We explain the decision tree that works.",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800&q=80",
    tag: "Clinical Reasoning",
    tagColor: "#c084fc",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "January 30, 2025",
    readTime: "7 min read",
    featured: false,
    content: `
## The Priority Decision Tree

**Step 1:** Is there an immediate threat to life? (Airway obstruction, anaphylaxis, cardiac arrest — always first.)

**Step 2:** Is there an acute change from baseline? A patient who was stable and is now deteriorating takes priority over a chronically ill but stable patient.

**Step 3:** Apply ABCs in order — airway before breathing before circulation.

**Step 4:** Apply Maslow's Hierarchy — physiological needs before safety needs before psychological needs.

**Step 5:** Who can wait? The communicative, stable patient waits while you assess the post-op patient you haven't seen.

---

## The Acute vs Chronic Rule

A patient with a new, acute problem takes priority over a patient with an expected, chronic finding — even if the chronic finding sounds more dramatic.

A COPD patient at their usual 90% saturation waits. A post-op patient who just dropped from 98% to 94% does not.

---

## Trigger Words to Watch

"First," "most important," "immediately," "priority" — these signal that the question is specifically testing prioritisation. Apply the decision tree deliberately every time you see them.
    `,
  },
  {
    slug: "mental-health-nclex-exam-day",
    title: "Managing Exam Anxiety: How to Stay Calm on NCLEX Day",
    excerpt: "Exam anxiety is real and it affects performance. These evidence-based techniques — used by students who passed at 85 questions — will help you walk into the testing centre calm and focused.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    tag: "Wellbeing",
    tagColor: "#f87171",
    author: "Melissa",
    authorRole: "Student Success Lead",
    date: "January 22, 2025",
    readTime: "5 min read",
    featured: false,
    content: `
## Before the Exam

Reduce caffeine gradually. Maintain your sleep schedule. Reduce study intensity in the final week. Prepare everything the night before — clothes, ID, route, parking.

---

## Exam Morning

Eat a proper breakfast. Arrive 30 minutes before your appointment. Don't discuss the exam with other candidates in the waiting room.

---

## During the Exam

**Box Breathing:** Inhale 4 counts, hold 4, exhale 4, hold 4. Activates the parasympathetic nervous system within 60 seconds.

**The Permission Statement:** "I give myself permission not to know everything. I will reason through this." Interrupts the shame spiral.

**Flag and Move:** If completely stuck, make your best choice, flag it, and move on. Don't lose momentum.

**Celebrate Small Wins:** After every 25 questions, take a 30-second mental break. Roll your shoulders. Breathe.

---

## If the Exam Stops at 85 Questions

Both pass and fail are possible at 85. Do not assume failure. Get out of the testing centre, do something enjoyable, and wait for your official result.

You've already done the hard part.
    `,
  },
  {
    slug: "teas-hesi-difference",
    title: "TEAS vs HESI: Which Pre-Nursing Exam Do You Need?",
    excerpt: "If you're applying to nursing school, you'll likely need to take either the TEAS 7 or HESI A2. We break down the differences, what each exam tests, and how to prepare for both.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    tag: "Pre-Nursing",
    tagColor: "#fbbf24",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "January 12, 2025",
    readTime: "8 min read",
    featured: false,
    content: `
## Check Your School First

Before anything else, confirm which exam your target programme requires. Many accept both; some specify one.

---

## TEAS 7

**Duration:** ~3.5 hours | **Questions:** 170 (150 scored)

- Reading (45 questions) — comprehension, inference, evaluating arguments
- Mathematics (38 questions) — algebra, ratios, proportions, data interpretation
- Science (50 questions) — anatomy, biology, chemistry, scientific reasoning
- English (37 questions) — grammar, vocabulary, conventions

Most programmes require 60-70%+. Competitive programmes: 70%+.

---

## HESI A2

**Duration:** Variable | **Sections:** School chooses which to require

Common sections: Mathematics, Reading Comprehension, Vocabulary, Grammar, Anatomy and Physiology.

Most programmes require 75%+.

---

## Key Differences

TEAS is fixed and standardised. HESI is modular — your school picks the sections. HESI has dedicated medical vocabulary and more clinical math. TEAS science is broader; HESI A&P goes deeper.

---

## Recommendation

If your school accepts both, prepare for TEAS first. The skills transfer well to HESI, with targeted supplemental study for medical vocabulary and dosage calculations.
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((p) => p.tag === tag);
}