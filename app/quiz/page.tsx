"use client";
import { Suspense } from "react";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addExamAttempt, type ReviewAnswer } from "@/lib/quiz-utils";
import {
  DEFAULT_MODE_ID,
  STORAGE_KEYS,
  type ExamModeId,
  getExamMode,
} from "@/lib/quiz-config";


type SelectedMap = Record<number, number>;
type CheckedMap = Record<number, boolean>;
type AnswerRecordMap = Record<number, ReviewAnswer>;

type ExamHistoryItem = {
  id: string;
  completedAt: string;
  score: number;
  total: number;
  percentage: number;
  answeredCount: number;
  checkedCount: number;
  flaggedCount: number;
  timeRemaining: number;
  timeUsed: number;
  answers: SelectedMap;
  checkedMap: CheckedMap;
  flaggedQuestions: number[];
  reviewAnswers: ReviewAnswer[];
  mode: ExamModeId;
};

const DEFAULT_TIMED_SECONDS = 15 * 60;

function getCorrectAnswer(question: any) {
  if (typeof question?.correct_answer === "number") return question.correct_answer;
  if (typeof question?.correctAnswer === "number") return question.correctAnswer;
  return -1;
}

function QuizPageInner() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [modeId, setModeId] = useState<ExamModeId>(DEFAULT_MODE_ID);
  const searchParams = useSearchParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMap, setSelectedMap] = useState<SelectedMap>({});
  const [checkedMap, setCheckedMap] = useState<CheckedMap>({});
  const [answerRecords, setAnswerRecords] = useState<AnswerRecordMap>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIMED_SECONDS);
  const [examFinished, setExamFinished] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Fetch questions from Supabase via API
    fetch(`/api/questions?${searchParams.toString()}`)
      .then((res) => res.json())
     .then((json) => {
        const loaded = json.questions ?? [];
        setQuestions(loaded);
        setQuestionsLoading(false);
        const storedMode2 = localStorage.getItem(STORAGE_KEYS.mode);
        const resolvedMode2 = getExamMode(storedMode2 as ExamModeId);
        const savedTimeLeft2 = Number(localStorage.getItem(STORAGE_KEYS.timeLeft));
        if (resolvedMode2.timerEnabled) {
          setTimeLeft(savedTimeLeft2 > 0 ? savedTimeLeft2 : loaded.length * 60);
        }
      })
      .catch(() => setQuestionsLoading(false));

    const storedMode = localStorage.getItem(STORAGE_KEYS.mode);
    const resolvedModeId = (storedMode as ExamModeId) || DEFAULT_MODE_ID;
    const resolvedMode = getExamMode(resolvedModeId);

    const savedCurrentIndex = Number(localStorage.getItem(STORAGE_KEYS.currentIndex));
    const savedAnswers = localStorage.getItem(STORAGE_KEYS.answers);
    const savedChecked = localStorage.getItem("quiz_checkedMap");
    const savedReviewRecords = localStorage.getItem("quiz_reviewRecords");
    const savedFlagged = localStorage.getItem(STORAGE_KEYS.flagged);
    const savedTimeLeft = Number(localStorage.getItem(STORAGE_KEYS.timeLeft));

    setModeId(resolvedModeId);
    setCurrentIndex(Number.isFinite(savedCurrentIndex) ? savedCurrentIndex : 0);
    setSelectedMap(savedAnswers ? JSON.parse(savedAnswers) : {});
    setCheckedMap(savedChecked ? JSON.parse(savedChecked) : {});
    setAnswerRecords(savedReviewRecords ? JSON.parse(savedReviewRecords) : {});
    setFlaggedQuestions(savedFlagged ? JSON.parse(savedFlagged) : []);

    if (resolvedMode.timerEnabled) {
      setTimeLeft(
        savedTimeLeft > 0
          ? savedTimeLeft
          : resolvedMode.duration ?? DEFAULT_TIMED_SECONDS
      );
    } else {
      setTimeLeft(0);
    }
  }, []);

  const mode = useMemo(() => getExamMode(modeId), [modeId]);

  const activeQuestions = useMemo(() => {
    if (mode.questionCount === null) return questions;
    return questions.slice(0, mode.questionCount);
  }, [mode.questionCount, questions]);

  const currentQuestion = activeQuestions[currentIndex];
  const selected = selectedMap[currentIndex] ?? null;
  const showFeedback = checkedMap[currentIndex] ?? false;

  useEffect(() => {
    if (!mounted || examFinished || !mode.timerEnabled) return;
    if (timeLeft <= 0) {
      finishExam(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [mounted, timeLeft, examFinished, mode.timerEnabled]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEYS.mode, modeId);
    localStorage.setItem(STORAGE_KEYS.currentIndex, String(currentIndex));
    localStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(selectedMap));
    localStorage.setItem("quiz_checkedMap", JSON.stringify(checkedMap));
    localStorage.setItem("quiz_reviewRecords", JSON.stringify(answerRecords));
    localStorage.setItem(STORAGE_KEYS.flagged, JSON.stringify(flaggedQuestions));
    if (mode.timerEnabled) {
      localStorage.setItem(STORAGE_KEYS.timeLeft, String(timeLeft));
    } else {
      localStorage.removeItem(STORAGE_KEYS.timeLeft);
    }
  }, [mounted, mode.timerEnabled, modeId, currentIndex, selectedMap, checkedMap, answerRecords, flaggedQuestions, timeLeft]);

  useEffect(() => {
    if (!mounted) return;
    if (currentIndex > Math.max(activeQuestions.length - 1, 0)) {
      setCurrentIndex(0);
    }
  }, [mounted, currentIndex, activeQuestions.length]);

  const orderedAnswers = useMemo(() => {
    return Object.keys(answerRecords)
      .map((key) => Number(key))
      .sort((a, b) => a - b)
      .map((key) => answerRecords[key]);
  }, [answerRecords]);

  const score = useMemo(() => {
    if (mode.tutorMode) {
      return orderedAnswers.filter((item) => item.isCorrect).length;
    }
    return activeQuestions.filter((question, index) => {
      const selectedAnswer = selectedMap[index];
      return selectedAnswer === getCorrectAnswer(question);
    }).length;
  }, [mode.tutorMode, orderedAnswers, activeQuestions, selectedMap]);

  const checkedCount = useMemo(() => {
    return Object.keys(checkedMap).filter((key) => checkedMap[Number(key)]).length;
  }, [checkedMap]);

  const selectedCount = useMemo(() => {
    return Object.keys(selectedMap).filter((key) => {
      const questionIndex = Number(key);
      return questionIndex >= 0 && questionIndex < activeQuestions.length;
    }).length;
  }, [selectedMap, activeQuestions.length]);

  const progressPercent = useMemo(() => {
    return activeQuestions.length
      ? Math.round(((currentIndex + 1) / activeQuestions.length) * 100)
      : 0;
  }, [currentIndex, activeQuestions.length]);

  const completionPercent = useMemo(() => {
    const numerator = mode.tutorMode ? checkedCount : selectedCount;
    return activeQuestions.length > 0
      ? Math.round((numerator / activeQuestions.length) * 100)
      : 0;
  }, [mode.tutorMode, checkedCount, selectedCount, activeQuestions.length]);

  const accuracyPercent = useMemo(() => {
    const denominator = mode.tutorMode ? checkedCount : selectedCount;
    return denominator > 0 ? Math.round((score / denominator) * 100) : 0;
  }, [mode.tutorMode, score, checkedCount, selectedCount]);

  const flaggedCount = useMemo(() => {
    return flaggedQuestions.filter(
      (index) => index >= 0 && index < activeQuestions.length
    ).length;
  }, [flaggedQuestions, activeQuestions.length]);

  const currentIsCorrect =
    selected !== null && currentQuestion
      ? selected === getCorrectAnswer(currentQuestion)
      : false;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(Math.max(seconds, 0) / 60);
    const secs = Math.max(seconds, 0) % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const timerDisplay = mode.timerEnabled ? formatTime(timeLeft) : "Flexible";

  const saveLegacyReviewProgress = (records: AnswerRecordMap) => {
    const answers = Object.keys(records)
      .map((key) => Number(key))
      .sort((a, b) => a - b)
      .map((key) => records[key]);
    const updatedScore = answers.filter((item) => item.isCorrect).length;
    localStorage.setItem("quizReview", JSON.stringify(answers));
    localStorage.setItem("quizScore", JSON.stringify({ score: updatedScore, total: activeQuestions.length }));
  };

  const handleSelect = (optionIndex: number) => {
    if (!currentQuestion) return;
    if (mode.tutorMode && showFeedback) return;
    setSelectedMap((prev) => ({ ...prev, [currentIndex]: optionIndex }));
  };

  const handleCheckAnswer = () => {
    if (!mode.tutorMode || !currentQuestion || selected === null) return;
    const resolvedCorrectAnswer = getCorrectAnswer(currentQuestion);
    const isCorrect = selected === resolvedCorrectAnswer;
    const answerRecord: ReviewAnswer = {
      questionId: Number(currentQuestion.id),
      question: currentQuestion.question,
      topic: currentQuestion.topic,
      difficulty: currentQuestion.difficulty,
      options: currentQuestion.options,
      selectedAnswer: selected,
      correctAnswer: resolvedCorrectAnswer,
      selectedAnswerText: currentQuestion.options[selected],
      correctAnswerText: currentQuestion.options[resolvedCorrectAnswer],
      isCorrect,
      rationale: currentQuestion.rationale,
    };
    const updatedRecords = { ...answerRecords, [currentIndex]: answerRecord };
    const updatedChecked = { ...checkedMap, [currentIndex]: true };
    setAnswerRecords(updatedRecords);
    setCheckedMap(updatedChecked);
    saveLegacyReviewProgress(updatedRecords);
  };

  const clearActiveExamSession = () => {
    localStorage.removeItem(STORAGE_KEYS.currentIndex);
    localStorage.removeItem(STORAGE_KEYS.answers);
    localStorage.removeItem(STORAGE_KEYS.flagged);
    localStorage.removeItem(STORAGE_KEYS.timeLeft);
    localStorage.removeItem("quiz_checkedMap");
    localStorage.removeItem("quiz_reviewRecords");
  };

  const finishExam = async (autoSubmitted = false) => {
    const total = activeQuestions.length;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    const timeUsed = mode.timerEnabled && mode.duration !== null
      ? Math.max(0, mode.duration - timeLeft)
      : 0;

    const reviewAnswers: ReviewAnswer[] = mode.tutorMode
      ? Object.keys(answerRecords)
          .map((key) => Number(key))
          .sort((a, b) => a - b)
          .map((key) => answerRecords[key])
      : activeQuestions.map((question, index) => {
          const selectedAnswer = selectedMap[index];
          const correctAnswer = getCorrectAnswer(question);
          return {
            questionId: Number(question.id),
            question: question.question,
            topic: question.topic,
            difficulty: question.difficulty,
            options: question.options,
            selectedAnswer,
            correctAnswer,
            selectedAnswerText: selectedAnswer !== undefined
              ? question.options[selectedAnswer] ?? "Not answered"
              : "Not answered",
            correctAnswerText: question.options[correctAnswer] ?? "Unavailable",
            isCorrect: selectedAnswer === correctAnswer,
            rationale: question.rationale,
          };
        });

    addExamAttempt({
      score,
      total,
      answers: selectedMap,
      flaggedQuestions,
      timeRemaining: mode.timerEnabled ? timeLeft : 0,
      timeUsed,
      mode: modeId === "timed" || modeId === "quick" || modeId === "tutor" ? modeId : "standard",
      reviewAnswers,
    });
    // Save to Supabase
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabaseClient = createClient();
      const { data: { user } } = await supabaseClient.auth.getUser();
      const { error } = await supabaseClient
        .from("exam_attempts")
        .insert([{
          user_id: user?.id ?? null,
          exam_type: "NCLEX-RN",
          mode: modeId,
          total_questions: total,
          correct: score,
          time_used: timeUsed,
          time_remaining: mode.timerEnabled ? timeLeft : 0,
          answers: selectedMap,
          flagged_questions: flaggedQuestions,
          status: "completed",
        }]);
      if (error) console.error("âŒ INSERT ERROR:", error);
      else console.log("âœ… Attempt saved to Supabase");
    } catch (err) {
      console.error("ðŸ’¥ INSERT CRASH:", err);
    }

    localStorage.setItem(STORAGE_KEYS.lastAttemptMeta, JSON.stringify({
      autoSubmitted,
      completedAt: new Date().toISOString(),
      mode: modeId,
    }));

    saveLegacyReviewProgress(answerRecords);
    setExamFinished(true);
    clearActiveExamSession();
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedMap({});
    setCheckedMap({});
    setAnswerRecords({});
    setFlaggedQuestions([]);
    setTimeLeft(mode.timerEnabled ? mode.duration ?? DEFAULT_TIMED_SECONDS : 0);
    setExamFinished(false);
    localStorage.removeItem("quizReview");
    localStorage.removeItem("quizScore");
    clearActiveExamSession();
  };

  const goToPrevious = () => { if (currentIndex > 0) setCurrentIndex((prev) => prev - 1); };
  const goToNext = () => { if (currentIndex < activeQuestions.length - 1) setCurrentIndex((prev) => prev + 1); };
  const toggleFlagQuestion = () => {
    setFlaggedQuestions((prev) =>
      prev.includes(currentIndex)
        ? prev.filter((index) => index !== currentIndex)
        : [...prev, currentIndex]
    );
  };

  const performanceTone = accuracyPercent >= 85 ? "excellent" : accuracyPercent >= 70 ? "good" : accuracyPercent >= 50 ? "warning" : "danger";
  const performanceBadgeClass = performanceTone === "excellent" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : performanceTone === "good" ? "border-sky-200 bg-sky-50 text-sky-700" : performanceTone === "warning" ? "border-amber-200 bg-amber-50 text-amber-700" : "border-rose-200 bg-rose-50 text-rose-700";
  const completionBarClass = performanceTone === "excellent" ? "bg-emerald-500" : performanceTone === "good" ? "bg-sky-500" : performanceTone === "warning" ? "bg-amber-500" : "bg-slate-900";

  if (!mounted || questionsLoading || !currentQuestion) {
    return (
      <main className="px-4 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center text-slate-900 shadow-xl">
          {questionsLoading ? "Loading questions..." : "Loading exam workspace..."}
        </div>
      </main>
    );
  }

  if (examFinished) {
    return (
      <main className="px-4 py-8 md:px-8 md:py-10">
        <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-4xl items-center justify-center">
          <div className="w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-200 bg-slate-50 p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Exam Complete</p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">Your session is finished</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">Review your results, inspect rationales, or restart with a fresh attempt.</p>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <ResultMetric label="Mode" value={mode.shortName} />
                <ResultMetric label="Score" value={`${score}/${activeQuestions.length}`} />
                <ResultMetric label="Accuracy" value={`${accuracyPercent}%`} />
                <ResultMetric label="Time Left" value={timerDisplay} />
              </div>
              <div className="mt-8 grid gap-3 md:grid-cols-3">
                <Link href="/results" className="rounded-2xl bg-slate-900 px-5 py-3 text-center font-semibold text-white transition hover:opacity-90">View Results</Link>
                <Link href="/review" className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-center font-semibold text-slate-900 transition hover:bg-slate-50">Review Answers</Link>
                <button onClick={handleRestart} className="rounded-2xl border border-slate-300 bg-slate-50 px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100">Restart Exam</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
          <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-6 md:px-8 md:py-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <ModeBadge>{mode.name}</ModeBadge>
                    <ModeBadge>{mode.tutorMode ? "Guided feedback" : "Exam simulation"}</ModeBadge>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">NCLEX Practice Workspace</p>
                  <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Question {currentIndex + 1}</h1>
                  <p className="mt-2 text-sm text-slate-600">
                    {mode.tutorMode ? "Check answers, read rationale, then move with confidence." : "Stay focused, answer decisively, and submit when ready."}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:min-w-[260px]">
                  <TopMiniMetric label="Timer" value={timerDisplay} />
                  <TopMiniMetric label="Accuracy" value={`${accuracyPercent}%`} />
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {mode.tutorMode && (
                <div className="mb-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
                  Tutor Mode is active. You can check each answer, see feedback, and learn question by question.
                </div>
              )}
              {!mode.tutorMode && (
                <div className="mb-6 rounded-3xl border border-sky-200 bg-sky-50 p-4 text-sky-800">
                  Timed exam mode is active. You can select answers, navigate the session, and submit when ready.
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-4">
                <TopMetric label="Current" value={`${currentIndex + 1}/${activeQuestions.length}`} />
                <TopMetric label={mode.tutorMode ? "Checked" : "Answered"} value={String(mode.tutorMode ? checkedCount : selectedCount)} />
                <TopMetric label="Selected" value={String(selectedCount)} />
                <TopMetric label="Score" value={`${score}/${activeQuestions.length}`} />
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                    <span>Question progress</span><span>{progressPercent}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-slate-900 transition-all" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                    <span>{mode.tutorMode ? "Learning completion" : "Answer completion"}</span><span>{completionPercent}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                    <div className={`h-full rounded-full transition-all ${completionBarClass}`} style={{ width: `${completionPercent}%` }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge>{currentQuestion.topic}</Badge>
                <Badge className="capitalize">{currentQuestion.difficulty}</Badge>
                <Badge className={performanceBadgeClass}>{accuracyPercent >= 70 ? "On track" : "Keep improving"}</Badge>
                {flaggedQuestions.includes(currentIndex) && <Badge className="border-amber-200 bg-amber-50 text-amber-700">Flagged</Badge>}
              </div>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Question Prompt</p>
                <h2 className="mt-3 text-xl font-semibold leading-8 text-slate-900 md:text-2xl">{currentQuestion.question}</h2>
              </div>

              <div className="mt-6 space-y-3">
                {currentQuestion.options.map((option: string, index: number) => {
                  const resolvedCorrectAnswer = getCorrectAnswer(currentQuestion);
                  let optionClass = "w-full rounded-2xl border p-4 text-left transition md:p-5 ";
                  if (mode.tutorMode && showFeedback) {
                    if (index === resolvedCorrectAnswer) optionClass += "border-emerald-300 bg-emerald-50 text-emerald-900";
                    else if (index === selected) optionClass += "border-rose-300 bg-rose-50 text-rose-900";
                    else optionClass += "border-slate-200 bg-white text-slate-500";
                  } else {
                    optionClass += selected === index
                      ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50";
                  }
                  return (
                    <button key={index} onClick={() => handleSelect(index)} className={optionClass}>
                      <div className="flex items-start gap-3">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          mode.tutorMode && showFeedback
                            ? index === resolvedCorrectAnswer ? "bg-emerald-100 text-emerald-700" : index === selected ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-500"
                            : selected === index ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div className="flex-1">
                          <p className="text-left text-sm font-medium leading-7 md:text-base">{option}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {mode.tutorMode && showFeedback && (
                <div className={`mt-6 rounded-3xl border p-5 md:p-6 ${currentIsCorrect ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}>
                  <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${currentIsCorrect ? "text-emerald-700" : "text-rose-700"}`}>
                    {currentIsCorrect ? "Correct Answer" : "Incorrect Answer"}
                  </p>
                  {!currentIsCorrect && selected !== null && (
                    <p className="mt-3 text-sm leading-7 text-slate-700"><span className="font-semibold">You chose:</span> {currentQuestion.options[selected]}</p>
                  )}
                  <p className="mt-3 text-sm leading-7 text-slate-700"><span className="font-semibold">Correct answer:</span> {currentQuestion.options[getCorrectAnswer(currentQuestion)]}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-700"><span className="font-semibold">Rationale:</span> {currentQuestion.rationale}</p>
                  {currentQuestion.nclex_tip && (
                    <p className="mt-3 text-sm leading-7 text-slate-700"><span className="font-semibold">NCLEX tip:</span> {currentQuestion.nclex_tip}</p>
                  )}
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button onClick={goToPrevious} disabled={currentIndex === 0} className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-[140px]">Previous</button>
                <button onClick={toggleFlagQuestion} className={`w-full rounded-2xl px-5 py-3 font-medium transition sm:w-auto sm:min-w-[160px] ${flaggedQuestions.includes(currentIndex) ? "bg-amber-500 text-white" : "border border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100"}`}>
                  {flaggedQuestions.includes(currentIndex) ? "Unflag Question" : "Flag for Review"}
                </button>
                {mode.tutorMode && !showFeedback ? (
                  <button onClick={handleCheckAnswer} disabled={selected === null} className="w-full rounded-2xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1">Check Answer</button>
                ) : currentIndex === activeQuestions.length - 1 ? (
                  <button onClick={() => finishExam(false)} className="w-full rounded-2xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:opacity-90 sm:flex-1">Submit Exam</button>
                ) : (
                  <button onClick={goToNext} className="w-full rounded-2xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:opacity-90 sm:flex-1">Next Question</button>
                )}
                <button onClick={() => finishExam(false)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-3 font-medium text-slate-800 transition hover:bg-slate-100 sm:w-auto sm:min-w-[140px]">End Exam</button>
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl xl:sticky xl:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Exam Controls</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Session navigator</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">Jump to any question, monitor progress, flag items for later, and submit whenever you are ready.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <SideMetric label="Score" value={`${score}/${activeQuestions.length}`} />
              <SideMetric label={mode.tutorMode ? "Checked" : "Answered"} value={String(mode.tutorMode ? checkedCount : selectedCount)} />
              <SideMetric label="Flagged" value={String(flaggedCount)} />
              <SideMetric label="Timer" value={timerDisplay} />
            </div>
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">Question map</span>
                <span className="text-slate-500">{activeQuestions.length} total</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {activeQuestions.map((_: any, index: number) => {
                  const checked = checkedMap[index];
                  const active = index === currentIndex;
                  const selectedButUnchecked = selectedMap[index] !== undefined && !checkedMap[index];
                  const flagged = flaggedQuestions.includes(index);
                  return (
                    <button key={index} onClick={() => setCurrentIndex(index)}
                      className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                        active ? "bg-slate-900 text-white" : flagged ? "bg-amber-100 text-amber-700 hover:bg-amber-200" : checked ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : selectedButUnchecked ? "bg-sky-100 text-sky-700 hover:bg-sky-200" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}>
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <button onClick={handleRestart} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-medium text-slate-800 transition hover:bg-slate-50">Restart Exam</button>
              <button onClick={() => finishExam(false)} className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:opacity-90">Submit Now</button>
              <Link href="/review" className="block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-center font-medium text-slate-800 transition hover:bg-slate-100">Open Review Page</Link>
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Legend</p>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <LegendItem tone="bg-slate-900" label="Current question" dark />
                <LegendItem tone="bg-emerald-100" label="Checked question" />
                <LegendItem tone="bg-sky-100" label="Selected, not checked" />
                <LegendItem tone="bg-amber-100" label="Flagged question" />
                <LegendItem tone="bg-slate-100" label="Not started" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function TopMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function TopMiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}

function ResultMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function SideMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-base font-bold text-slate-900">{value}</p>
    </div>
  );
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ${className}`}>{children}</span>;
}

function ModeBadge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">{children}</span>;
}

function LegendItem({ tone, label, dark = false }: { tone: string; label: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`inline-flex h-4 w-4 rounded-full ${tone} ${dark ? "border border-slate-900" : "border border-slate-200"}`} />
      <span>{label}</span>
    </div>
  );
}





export default function QuizPage() { return <Suspense fallback={<div style={{minHeight:'100vh',background:'#060f1e'}}/>}><QuizPageInner /></Suspense>; }


