import Link from "next/link";
import { notFound } from "next/navigation";

const posts = [
  {
    slug: "how-to-pass-nclex-first-attempt",
    title: "How to Pass the NCLEX-RN on Your First Attempt",
    excerpt: "Most students who fail NCLEX do not fail because they do not know enough -- they fail because they do not know how to think like a nurse.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80",
    tag: "NCLEX Strategy",
    tagColor: "#0ea5e9",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "March 15, 2025",
    readTime: "8 min read",
    content: `
      <h2>Why Students Fail the NCLEX</h2>
      <p>The NCLEX-RN is not a knowledge test in the traditional sense. You can memorize every drug, every disease, and every nursing intervention and still fail. Why? Because the NCLEX tests <strong>clinical judgment</strong> — your ability to think like a nurse, not just recall like a student.</p>
      <p>Most students who fail NCLEX do not fail because they do not know enough. They fail because they approach questions looking for the "right answer" instead of asking "what would a safe, competent nurse do right now?"</p>

      <h2>The Clinical Judgment Framework</h2>
      <p>The Next Generation NCLEX (NGN) is built around the NCSBN Clinical Judgment Measurement Model (NCJMM). This model has six cognitive skills:</p>
      <ul>
        <li><strong>Recognize Cues</strong> — What information matters?</li>
        <li><strong>Analyze Cues</strong> — What does the information mean?</li>
        <li><strong>Prioritize Hypotheses</strong> — What is most likely happening?</li>
        <li><strong>Generate Solutions</strong> — What can be done?</li>
        <li><strong>Take Action</strong> — What should be done first?</li>
        <li><strong>Evaluate Outcomes</strong> — Did the intervention work?</li>
      </ul>
      <p>Every NCLEX question — whether it is a simple multiple choice or a complex case study — is testing one or more of these skills. Once you understand this, the exam becomes less intimidating.</p>

      <h2>Strategy 1: Always Ask "What Is the Priority?"</h2>
      <p>NCLEX loves priority questions. When you see multiple correct-sounding options, use the ABC framework (Airway, Breathing, Circulation) and Maslow's Hierarchy of Needs. Physiological needs come before psychological needs. Actual problems come before potential problems.</p>
      <p>Example: A client is anxious about their upcoming surgery AND has oxygen saturation of 91%. Which do you address first? Always the oxygen saturation — that is an actual, life-threatening physiological problem.</p>

      <h2>Strategy 2: Read the Question Stem Carefully</h2>
      <p>The question stem contains everything you need. Do not add information that is not there. Do not assume the client is sicker or healthier than described. Answer based on what is written, not what you imagine.</p>
      <p>Pay attention to key words: "first," "priority," "most important," "immediately," "initially." These words change the correct answer completely.</p>

      <h2>Strategy 3: Practice Daily with Rationales</h2>
      <p>Doing 75 questions in one sitting without reading rationales is the least effective study strategy. Instead, do 20-30 questions daily and read every single rationale — especially for questions you got right. Understanding why an answer is correct is just as important as understanding why the others are wrong.</p>

      <h2>Strategy 4: Build a Study Plan</h2>
      <p>Structure your preparation into phases. The first two weeks should cover content review of high-yield topics: pharmacology, respiratory, cardiac, and neurological nursing. The next two weeks should be question-focused practice across all content areas. The final week should be dedicated to full practice exams and reviewing weak areas.</p>

      <h2>The Bottom Line</h2>
      <p>Passing NCLEX on your first attempt is absolutely achievable. Thousands of nurses do it every week. The key is to study smart, practice consistently, and trust the clinical reasoning process. You have trained for this. Now think like a nurse.</p>
    `,
  },
  {
    slug: "ngn-next-generation-nclex-guide",
    title: "The Complete Guide to Next Generation NCLEX (NGN)",
    excerpt: "The NGN introduced new question formats that many students find intimidating. We break down every format with examples and strategies.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&q=80",
    tag: "NGN Prep",
    tagColor: "#8b5cf6",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "March 8, 2025",
    readTime: "12 min read",
    content: `
      <h2>What Is the Next Generation NCLEX?</h2>
      <p>The Next Generation NCLEX (NGN) launched in April 2023 and represents the most significant change to the licensure exam in decades. The NGN moves beyond simple recall to test <strong>clinical judgment</strong> — how nurses think, prioritize, and act in real patient care situations.</p>

      <h2>New Question Types</h2>
      <p>The NGN introduces six new question formats alongside traditional multiple choice:</p>

      <h3>1. Extended Multiple Response</h3>
      <p>Select all that apply, but with a twist — you must select a specific number of answers. For example, "Select 3" means selecting 2 or 4 will cost you points. Read carefully.</p>

      <h3>2. Extended Drag and Drop</h3>
      <p>Match items from one column to another. Common formats include matching interventions to problems or ordering steps in a procedure. Focus on understanding relationships between concepts.</p>

      <h3>3. Cloze (Drop-Down)</h3>
      <p>Complete a sentence or paragraph by selecting from dropdown menus. Often used in documentation scenarios. Example: "The nurse determines the client is experiencing ___ based on ___."</p>

      <h3>4. Enhanced Hot Spot</h3>
      <p>Click on specific areas of an image, chart, or text. Used to identify abnormal findings, relevant assessment data, or areas of concern in a medical record.</p>

      <h3>5. Matrix/Grid</h3>
      <p>A table with rows and columns. You select one answer per row or check all that apply across multiple columns. Used for comparing multiple clients or interventions.</p>

      <h3>6. Bow-Tie</h3>
      <p>The signature NGN question. Shows a client condition in the center with potential causes on the left and nursing actions on the right. Tests your ability to connect assessment findings to interventions.</p>

      <h2>Case Studies</h2>
      <p>NGN includes unfolding case studies — a series of 6 questions following one client across multiple points in time. The client's condition evolves and you must adapt your clinical reasoning as new information appears. These are worth more points than standalone questions.</p>

      <h2>How to Prepare for NGN</h2>
      <p>Practice with all six question formats. Do not just focus on traditional multiple choice. Read every rationale. Focus on understanding clinical scenarios holistically rather than memorizing isolated facts. The NGN rewards nurses who think, not nurses who memorize.</p>
    `,
  },
  {
    slug: "pharmacology-nclex-tips",
    title: "5 Pharmacology Strategies That Actually Work for NCLEX",
    excerpt: "Pharmacology is the most feared topic on NCLEX. These five strategies will help you master drug classes without memorizing everything.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80",
    tag: "Pharmacology",
    tagColor: "#10b981",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "February 28, 2025",
    readTime: "10 min read",
    content: `
      <h2>Why Pharmacology Feels Overwhelming</h2>
      <p>There are thousands of medications a nurse might encounter. Memorizing every drug, dose, and side effect is impossible — and unnecessary. The NCLEX does not test whether you have memorized a drug handbook. It tests whether you can apply pharmacology knowledge safely in clinical situations.</p>

      <h2>Strategy 1: Learn Drug Classes, Not Individual Drugs</h2>
      <p>If you understand how beta-blockers work as a class, you can answer questions about metoprolol, atenolol, and carvedilol without memorizing each one separately. Focus on: mechanism of action, therapeutic use, major side effects, and nursing considerations for each drug class.</p>
      <p>High-yield drug classes for NCLEX: beta-blockers, ACE inhibitors, diuretics, anticoagulants, antibiotics, antidiabetics, psychotropics, and opioids.</p>

      <h2>Strategy 2: Use the "-olol," "-pril," "-sartan" System</h2>
      <p>Drug suffixes tell you the class. Once you know the class, you know the nursing considerations.</p>
      <ul>
        <li><strong>-olol</strong> = beta-blocker (check pulse, monitor for bradycardia)</li>
        <li><strong>-pril</strong> = ACE inhibitor (monitor for cough, hyperkalemia)</li>
        <li><strong>-sartan</strong> = ARB (similar to ACE inhibitors, no cough)</li>
        <li><strong>-statin</strong> = cholesterol-lowering (monitor liver enzymes, myopathy)</li>
        <li><strong>-mycin</strong> = antibiotic (monitor renal function, hearing)</li>
      </ul>

      <h2>Strategy 3: Always Ask "What Could Go Wrong?"</h2>
      <p>NCLEX pharmacology questions often focus on adverse effects and nursing interventions. For every drug you study, ask: what is the most dangerous side effect? What should I assess before giving this drug? What would make me hold this medication?</p>

      <h2>Strategy 4: Connect Drugs to Disease Processes</h2>
      <p>Do not study pharmacology in isolation. Connect drugs to the conditions they treat. When studying heart failure, learn the drugs used: diuretics, ACE inhibitors, beta-blockers, digoxin. Understanding the disease makes the drug rationale logical, not arbitrary.</p>

      <h2>Strategy 5: Practice Pharmacology Questions Daily</h2>
      <p>Pharmacology requires repetition. Do at least 10 pharmacology-specific questions every day. Read every rationale. Over six weeks of consistent practice, patterns emerge and the subject becomes manageable.</p>

      <h2>High-Yield NCLEX Pharmacology Topics</h2>
      <p>Focus your energy on: anticoagulants (heparin, warfarin, NOACs), insulin types and timing, digoxin toxicity, lithium toxicity, antihypertensives, pain management (opioids and non-opioids), and psychiatric medications.</p>
    `,
  },
  {
    slug: "clinical-reasoning-nclex",
    title: "Clinical Reasoning: The Skill That Separates Passers from Failers",
    excerpt: "NCLEX is not a knowledge test -- it is a clinical judgment test. Learn how to develop the reasoning framework that examiners are actually testing for.",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1200&q=80",
    tag: "Clinical Reasoning",
    tagColor: "#f59e0b",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "February 14, 2025",
    readTime: "9 min read",
    content: `
      <h2>What Is Clinical Reasoning?</h2>
      <p>Clinical reasoning is the process nurses use to gather and interpret patient information, identify problems, plan interventions, and evaluate outcomes. It is the cognitive engine behind safe nursing practice — and it is exactly what the NCLEX measures.</p>

      <h2>The Difference Between Knowledge and Reasoning</h2>
      <p>A student with excellent knowledge knows that digoxin can cause bradycardia. A student with excellent clinical reasoning knows to check the apical pulse before administering digoxin, recognizes a heart rate of 52 bpm as a reason to hold the dose, understands that hypokalemia increases digoxin toxicity risk, and knows to notify the provider and document the findings.</p>
      <p>Clinical reasoning connects isolated facts into a coherent clinical picture.</p>

      <h2>How to Develop Clinical Reasoning</h2>
      <p>Clinical reasoning improves with deliberate practice. When you answer practice questions, do not just check if you got the answer right. Ask yourself: what cues did I notice? What did I think was happening? What actions did I consider? Why did I choose one action over another?</p>

      <h2>The SBAR Framework for Reasoning</h2>
      <p>SBAR (Situation, Background, Assessment, Recommendation) is not just a communication tool — it is a clinical reasoning framework. Practice applying it to case scenarios to organize your thinking systematically.</p>

      <h2>Common Clinical Reasoning Errors</h2>
      <p>Students often make these reasoning errors on NCLEX: anchoring on the first answer that seems right, ignoring abnormal vital signs, failing to prioritize acute over chronic problems, and selecting interventions before completing assessment. Awareness of these traps helps you avoid them.</p>

      <h2>Practice with Unfolding Cases</h2>
      <p>The best way to build clinical reasoning is through unfolding case studies — scenarios where patient conditions evolve over time. NGN case studies are structured this way intentionally. Practice following a patient from admission through discharge, making decisions at each stage.</p>
    `,
  },
  {
    slug: "nclex-study-plan-8-weeks",
    title: "The 8-Week NCLEX Study Plan That Actually Works",
    excerpt: "Stop winging your NCLEX prep. This structured 8-week plan tells you exactly what to study each day.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80",
    tag: "Study Planning",
    tagColor: "#ec4899",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "January 30, 2025",
    readTime: "11 min read",
    content: `
      <h2>Why You Need a Study Plan</h2>
      <p>NCLEX preparation without a plan is one of the most common reasons students fail. Without structure, students over-study comfortable topics, neglect difficult areas, run out of time, and feel unprepared on exam day. A structured 8-week plan eliminates guesswork and ensures comprehensive coverage.</p>

      <h2>Weeks 1-2: Content Foundation</h2>
      <p>Focus on high-yield content areas. Spend the first two weeks reviewing core med-surg topics: cardiovascular, respiratory, neurological, renal, and endocrine nursing. Do 20-30 practice questions daily focused on these areas. Goal: build a solid clinical knowledge foundation.</p>

      <h2>Weeks 3-4: Pharmacology and Safety</h2>
      <p>Dedicate weeks 3 and 4 to pharmacology and safety topics. Review major drug classes, high-alert medications, infection control, and safety priorities. Continue daily practice questions. Goal: feel confident with medication administration and safety scenarios.</p>

      <h2>Weeks 5-6: Specialty Areas and NGN</h2>
      <p>Cover maternal-newborn, pediatric, mental health, and community nursing. Begin intensive NGN question practice including case studies, bow-tie questions, and matrix items. Goal: eliminate gaps in specialty content and build NGN fluency.</p>

      <h2>Weeks 7-8: Full Practice Exams</h2>
      <p>Stop content review. Take full-length practice exams (75-150 questions) under timed conditions. Review every wrong answer. Identify patterns in your weak areas and do targeted practice. Goal: build exam stamina and confidence.</p>

      <h2>Daily Study Schedule</h2>
      <p>Recommended daily schedule: 1 hour content review, 1-2 hours practice questions with rationale review, 30 minutes weak area focus. Take one full day off per week. Sleep 7-8 hours nightly — sleep consolidates memory and improves reasoning.</p>

      <h2>The Week Before the Exam</h2>
      <p>Do light review only. No intensive studying. Take care of logistics: confirm your testing appointment, plan your route, prepare your ID. Focus on rest, nutrition, and confidence. You have prepared for this.</p>
    `,
  },
  {
    slug: "international-nurses-nclex",
    title: "International Nurses: Your Complete Guide to NCLEX Licensure in the US",
    excerpt: "Trained outside the US and want to practice as an RN in America? Here is everything you need to know.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&q=80",
    tag: "International Nurses",
    tagColor: "#6366f1",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "January 20, 2025",
    readTime: "14 min read",
    content: `
      <h2>Overview: The Path to US Nursing Licensure</h2>
      <p>International nurses seeking to practice in the United States must complete several steps: credential evaluation, English proficiency testing, NCLEX-RN examination, and state licensure application. The process takes time, but thousands of internationally trained nurses successfully complete it every year.</p>

      <h2>Step 1: Credential Evaluation</h2>
      <p>Most US states require internationally educated nurses to have their credentials evaluated by CGFNS International (Commission on Graduates of Foreign Nursing Schools). CGFNS verifies that your nursing education and licensure meet US standards. Some states accept evaluations from other approved agencies — check your target state's requirements.</p>

      <h2>Step 2: English Proficiency</h2>
      <p>Non-native English speakers must demonstrate English proficiency through TOEFL (Test of English as a Foreign Language) or IELTS (International English Language Testing System). Minimum score requirements vary by state. Some nurses from certain English-speaking countries may be exempt — verify with your state board.</p>

      <h2>Step 3: VisaScreen Certificate</h2>
      <p>To work in the US as a nurse, you need a VisaScreen certificate from CGFNS. This certificate verifies your credentials, licensure, and English proficiency for immigration purposes. Processing takes several months, so apply early.</p>

      <h2>Step 4: Apply to Take the NCLEX-RN</h2>
      <p>Apply to the Board of Nursing in the state where you intend to work. Pay the application fee and submit required documents. Once approved, register with Pearson VUE and schedule your NCLEX-RN examination at an approved testing center.</p>

      <h2>Step 5: Prepare for the NCLEX</h2>
      <p>The NCLEX-RN tests US nursing standards, which may differ from your home country's practice. Focus on: infection control procedures, scope of practice boundaries, documentation standards, patient rights, and pharmacology as practiced in the US. Allow 2-3 months for dedicated NCLEX preparation.</p>

      <h2>Common Challenges for International Nurses</h2>
      <p>International nurses often struggle with: US-specific scope of practice questions, cultural communication scenarios, unfamiliar medication names (US brand names vs generic), and the clinical judgment focus of NGN questions. Targeted practice in these areas significantly improves performance.</p>

      <h2>Resources and Support</h2>
      <p>Connect with other internationally educated nurses through professional associations and online communities. Many states have resources specifically for internationally educated nurses. Pre-NCLEX Nursing offers comprehensive preparation for nurses from all backgrounds preparing for US licensure.</p>
    `,
  },
  {
    slug: "teas-7-complete-guide",
    title: "TEAS 7 Complete Guide: How to Ace Your Nursing School Entrance Exam",
    excerpt: "The TEAS 7 is the gateway to nursing school. This guide covers every section with strategies and practice tips.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80",
    tag: "Pre-Nursing",
    tagColor: "#fbbf24",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "January 12, 2025",
    readTime: "8 min read",
    content: `
      <h2>What Is the TEAS 7?</h2>
      <p>The Test of Essential Academic Skills Version 7 (TEAS 7) is a standardized admissions exam used by nursing and allied health programs across the United States. It measures academic readiness in four subject areas: Science, Mathematics, English and Language Usage, and Reading. Your TEAS score is a key component of nursing school applications.</p>

      <h2>TEAS 7 Structure</h2>
      <p>The TEAS 7 contains 170 questions (150 scored, 20 unscored pretest items) administered over 209 minutes. The four sections are: Science (50 questions, 60 minutes), Mathematics (38 questions, 54 minutes), English and Language Usage (37 questions, 37 minutes), and Reading (45 questions, 55 minutes).</p>

      <h2>Science Section Strategy</h2>
      <p>The Science section is the most heavily weighted and covers human anatomy and physiology, biology, chemistry, and scientific reasoning. Focus your study time here. Key topics: body systems (cardiovascular, respiratory, digestive, reproductive, nervous), cell biology, genetics, and chemistry fundamentals. Understanding body systems will also give you a head start on nursing school content.</p>

      <h2>Mathematics Section Strategy</h2>
      <p>TEAS 7 math covers numbers and algebra, measurement and data. No calculus or trigonometry. Focus on: fractions and decimals, ratios and proportions, percentages, basic algebra, and reading graphs and charts. Practice mental math and estimation skills. Calculators are provided for some sections.</p>

      <h2>English and Language Usage Strategy</h2>
      <p>This section tests grammar, vocabulary, and sentence structure. Review: subject-verb agreement, punctuation rules, commonly confused words, and vocabulary in context. Read widely in the weeks before your exam to build vocabulary naturally.</p>

      <h2>Reading Section Strategy</h2>
      <p>The Reading section tests comprehension, inference, and information integration. Practice reading passages and answering questions without re-reading the entire passage. Develop the skill of identifying main ideas, author's purpose, and implied meanings quickly.</p>

      <h2>How to Prepare</h2>
      <p>Allow 6-8 weeks for TEAS preparation. Take a diagnostic practice test first to identify weak areas. Study weak areas systematically. Take full practice tests under timed conditions weekly. Review every wrong answer. Most students improve their TEAS score significantly with structured preparation.</p>
    `,
  },
  {
    slug: "nurse-burnout-self-care",
    title: "Avoiding Burnout During NCLEX Prep: A Nurse's Guide to Self-Care",
    excerpt: "NCLEX prep is a marathon, not a sprint. Learn how to protect your mental health and stay motivated throughout your study journey.",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=80",
    tag: "Wellbeing",
    tagColor: "#14b8a6",
    author: "James",
    authorRole: "Founder & Lead Educator",
    date: "January 5, 2025",
    readTime: "7 min read",
    content: `
      <h2>The Reality of NCLEX Prep Burnout</h2>
      <p>NCLEX preparation is intense. Many students study for 8-12 hours daily, isolate themselves from friends and family, neglect sleep and exercise, and push themselves to exhaustion. This approach is counterproductive. Burnout impairs memory, reasoning, and exam performance — the opposite of what you need.</p>

      <h2>Signs You Are Burning Out</h2>
      <p>Watch for these warning signs: difficulty concentrating during study sessions, feeling anxious or hopeless about the exam, physical exhaustion despite adequate sleep, loss of interest in activities you normally enjoy, and declining practice exam scores despite continued studying.</p>

      <h2>Strategy 1: Protect Your Sleep</h2>
      <p>Sleep is not optional — it is a study strategy. During sleep, your brain consolidates memories and processes information learned during the day. Students who sleep 7-8 hours consistently perform better on practice exams than those who sacrifice sleep for extra study time. Establish a consistent sleep schedule and protect it.</p>

      <h2>Strategy 2: Exercise Regularly</h2>
      <p>Physical activity reduces stress hormones, improves mood, and enhances cognitive function. Even 30 minutes of walking daily makes a measurable difference. Schedule exercise into your study plan as a non-negotiable appointment, not an optional activity.</p>

      <h2>Strategy 3: Maintain Social Connection</h2>
      <p>Complete isolation during NCLEX prep is harmful. Maintain some connection with friends, family, and fellow nursing students. Study groups can provide accountability, emotional support, and perspective. You do not have to go through this alone.</p>

      <h2>Strategy 4: Use Time-Blocked Studying</h2>
      <p>Study in focused blocks of 45-60 minutes followed by 10-15 minute breaks. This approach, based on the Pomodoro Technique, maintains focus and prevents mental fatigue. After four focused blocks, take a longer break of 30-60 minutes.</p>

      <h2>Strategy 5: Celebrate Small Wins</h2>
      <p>Acknowledge your progress. Completed a difficult pharmacology module? That deserves recognition. Improved your practice score by 5%? Celebrate it. The NCLEX preparation journey is long — maintaining motivation requires recognizing progress along the way.</p>

      <h2>When to Seek Help</h2>
      <p>If anxiety about the NCLEX is significantly interfering with your daily life, sleep, or relationships, please reach out to a mental health professional. NCLEX anxiety is real and treatable. Many nursing students benefit from counseling, and seeking help is a sign of strength, not weakness.</p>
    `,
  },
];

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #060f1e 0%, #0d1f35 50%, #0e2540 100%)", fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#e2e8f0" }}>

      {/* Hero */}
      <section style={{ position: "relative", height: "480px", overflow: "hidden" }}>
        <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #060f1e 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "48px 24px" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto", width: "100%" }}>
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#64748b", textDecoration: "none", fontSize: "13px", fontWeight: 600, marginBottom: "20px" }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Back to Blog
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: post.tagColor, background: `${post.tagColor}20`, border: `1px solid ${post.tagColor}40`, padding: "4px 12px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{post.tag}</span>
              <span style={{ color: "#475569", fontSize: "13px" }}>{post.date}</span>
              <span style={{ color: "#475569", fontSize: "13px" }}>{post.readTime}</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2, margin: 0 }}>
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Author */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "48px", paddingBottom: "32px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: `${post.tagColor}20`, border: `2px solid ${post.tagColor}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 800, color: post.tagColor, flexShrink: 0 }}>
            {post.author[0]}
          </div>
          <div>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#f1f5f9", margin: 0 }}>{post.author}</p>
            <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>{post.authorRole}</p>
          </div>
        </div>

        {/* Article Body */}
        <div
          style={{ color: "#cbd5e1", lineHeight: 1.9, fontSize: "16px" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div style={{ marginTop: "64px", background: "linear-gradient(135deg, rgba(14,165,233,0.1), rgba(56,189,248,0.05))", border: "1px solid rgba(14,165,233,0.2)", borderRadius: "20px", padding: "40px", textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 700, color: "#f8fafc", margin: "0 0 12px" }}>
            Ready to start preparing?
          </h3>
          <p style={{ color: "#94a3b8", margin: "0 0 24px", fontSize: "15px" }}>
            Practice with real NCLEX-style questions and track your progress.
          </p>
          <Link href="/quiz/select" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #0ea5e9, #38bdf8)", color: "#fff", padding: "14px 32px", borderRadius: "10px", fontWeight: 700, fontSize: "15px", textDecoration: "none" }}>
            Start Practicing Free
          </Link>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div style={{ marginTop: "64px" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 700, color: "#f8fafc", marginBottom: "24px" }}>Related Articles</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)", textDecoration: "none", display: "flex", flexDirection: "column", transition: "all 0.3s" }}>
                  <img src={r.image} alt={r.title} style={{ width: "100%", height: "140px", objectFit: "cover" }} />
                  <div style={{ padding: "16px" }}>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: r.tagColor, textTransform: "uppercase", letterSpacing: "0.1em" }}>{r.tag}</span>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#f1f5f9", margin: "6px 0 0", lineHeight: 1.4 }}>{r.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </section>

      <style>{`
        article h2, div h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 700; color: #f8fafc; margin: 40px 0 16px; line-height: 1.3; }
        article h3, div h3 { font-size: 1.1rem; font-weight: 700; color: #e2e8f0; margin: 28px 0 12px; }
        article p, div[dangerouslySetInnerHTML] p { margin: 0 0 20px; }
        article ul, div[dangerouslySetInnerHTML] ul { margin: 0 0 20px; padding-left: 24px; }
        article li, div[dangerouslySetInnerHTML] li { margin-bottom: 8px; }
        article strong, div[dangerouslySetInnerHTML] strong { color: #f1f5f9; font-weight: 700; }
      `}</style>
    </main>
  );
}