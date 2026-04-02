"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { questions } from "@/lib/questions";
import {
  ExamHistoryItem,
  getActiveAttemptId,
  getLastAttempt,
} from "@/lib/quiz-utils";

type FilterType = "all" | "incorrect" | "flagged";

type ReviewAnswer = {
  questionId: number;
  question: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  options: string[];
  selectedAnswer: number;
  correctAnswer: number;
  selectedAnswerText: string;
  correctAnswerText: string;
  isCorrect: boolean;
  rationale: string;
};

type QuestionShape = {
  id: number;
  question: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  options: string[];
  rationale: string;
  correctAnswer?: number;
  answer?: number;
};

type DisplayQuestion = {
  question: QuestionShape;
  originalIndex: number;
  selected: number | undefined;
  correctAnswer: number;
  isCorrect: boolean;
  isFlagged: boolean;
  reviewAnswer?: ReviewAnswer;
};

export default function ReviewPage() {
  const [attempt, setAttempt] = useState<ExamHistoryItem | null>(null);
  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [topicFilter, setTopicFilter] = useState("all");

  useEffect(() => {
    setAttempt(getLastAttempt());
    setActiveAttemptId(getActiveAttemptId());
  }, []);

  const isHistorySelected = useMemo(() => {
    if (!attempt || !activeAttemptId) return false;
    return attempt.id === activeAttemptId;
  }, [attempt, activeAttemptId]);

  const modeLabel = useMemo(() => {
    if (!(attempt as any)?.mode) return "Standard";
    if ((attempt as any).mode === "tutor") return "Tutor";
    if ((attempt as any).mode === "quick") return "Quick";
    if ((attempt as any).mode === "timed") return "Timed";
    return "Standard";
  }, [attempt]);

  const allAttemptQuestions = useMemo<DisplayQuestion[]>(() => {
    if (!attempt) return [];

    return (questions as QuestionShape[])
      .slice(0, attempt.total ?? questions.length)
      .map((question, index) => {
        const reviewAnswer = (attempt as any).reviewAnswers?.find(
          (item: ReviewAnswer) => item.questionId === question.id
        );

        const selectedByIndex =
          attempt.answers?.[index] ?? attempt.answers?.[question.id];

        const selected = reviewAnswer?.selectedAnswer ?? selectedByIndex;

        const resolvedCorrectAnswer =
          reviewAnswer?.correctAnswer ??
          question.correctAnswer ??
          question.answer ??
          -1;

        const isCorrect =
          reviewAnswer?.isCorrect ?? selected === resolvedCorrectAnswer;

        const isFlagged =
          attempt.flaggedQuestions?.includes(index) ||
          attempt.flaggedQuestions?.includes(question.id);

        return {
          question,
          originalIndex: index,
          selected,
          correctAnswer: resolvedCorrectAnswer,
          isCorrect,
          isFlagged,
          reviewAnswer,
        };
      });
  }, [attempt]);

  const topics = useMemo(() => {
    const uniqueTopics = Array.from(
      new Set(allAttemptQuestions.map((item) => item.question.topic).filter(Boolean))
    );
    return ["all", ...uniqueTopics];
  }, [allAttemptQuestions]);

  const filteredQuestions = useMemo(() => {
    return allAttemptQuestions.filter((item) => {
      const passesMainFilter =
        filter === "all"
          ? true
          : filter === "incorrect"
          ? !item.isCorrect
          : item.isFlagged;

      const passesTopic =
        topicFilter === "all" ? true : item.question.topic === topicFilter;

      return passesMainFilter && passesTopic;
    });
  }, [allAttemptQuestions, filter, topicFilter]);

  const stats = useMemo(() => {
    const total = allAttemptQuestions.length;
    const correct = allAttemptQuestions.filter((item) => item.isCorrect).length;
    const incorrect = total - correct;
    const flagged = allAttemptQuestions.filter((item) => item.isFlagged).length;
    const answered = allAttemptQuestions.filter(
      (item) => item.selected !== undefined && item.selected !== -1
    ).length;
    const unanswered = Math.max(total - answered, 0);
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;

    return { total, correct, incorrect, flagged, answered, unanswered, score };
  }, [allAttemptQuestions]);

  const filterSummary = useMemo(() => {
    const filterLabel =
      filter === "all"
        ? "all reviewed questions"
        : filter === "incorrect"
        ? "incorrect questions"
        : "flagged questions";

    const topicLabel = topicFilter === "all" ? "all topics" : topicFilter;

    return `${filteredQuestions.length} shown • ${filterLabel} • ${topicLabel}`;
  }, [filteredQuestions.length, filter, topicFilter]);

  if (!attempt) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 md:px-8 md:py-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-80px] top-[-50px] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute right-[-60px] top-24 h-80 w-80 rounded-full bg-violet-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-xl">
          <h1 className="text-3xl font-bold text-slate-900">
            No review available
          </h1>
          <p className="mt-3 text-slate-600">
            Complete an exam first to unlock review mode.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/quiz"
              className="rounded-2xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              Start Quiz
            </Link>
            <Link
              href="/"
              className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 md:px-8 md:py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-80px] top-[-50px] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-60px] top-24 h-80 w-80 rounded-full bg-violet-400/10 blur-3xl" />
        <div className="absolute bottom-[-40px] left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-6">
          <div className="mb-3 flex flex-wrap gap-2">
            <PageBadge>Review Mode</PageBadge>
            <PageBadge>{modeLabel}</PageBadge>
            <PageBadge>{stats.score}% Score</PageBadge>
            {isHistorySelected && (
              <PageBadge className="border-amber-400/20 bg-amber-500/15 text-amber-100">
                Selected from History
              </PageBadge>
            )}
          </div>

          <h1 className="text-3xl font-bold text-white md:text-5xl">
            Review your attempt
          </h1>
          <p className="mt-2 max-w-2xl text-slate-300">
            Compare your selections, see the correct answers, and study each
            rationale without losing the flow of the session.
          </p>
        </div>

        <section className="mb-6 rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl md:p-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            <StatCard label="Reviewed" value={stats.total} />
            <StatCard label="Answered" value={stats.answered} />
            <StatCard label="Correct" value={stats.correct} tone="emerald" />
            <StatCard label="Incorrect" value={stats.incorrect} tone="rose" />
            <StatCard label="Flagged" value={stats.flagged} tone="amber" />
            <StatCard label="Score" value={`${stats.score}%`} tone="sky" />
          </div>
        </section>

        <section className="mb-6 rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl md:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="xl:max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Review Filters
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Focus on all questions, only missed ones, flagged questions, or
                narrow the review by topic.
              </p>
            </div>

            <div className="flex flex-col gap-3 xl:items-end">
              <div className="flex flex-wrap gap-3">
                <FilterButton
                  active={filter === "all"}
                  onClick={() => setFilter("all")}
                >
                  All Questions
                </FilterButton>

                <FilterButton
                  active={filter === "incorrect"}
                  tone="rose"
                  onClick={() => setFilter("incorrect")}
                >
                  Incorrect Only
                </FilterButton>

                <FilterButton
                  active={filter === "flagged"}
                  tone="amber"
                  onClick={() => setFilter("flagged")}
                >
                  Flagged Only
                </FilterButton>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={topicFilter}
                  onChange={(e) => setTopicFilter(e.target.value)}
                  className="min-w-[210px] rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400/60 focus:bg-white/15"
                >
                  {topics.map((topic) => (
                    <option key={topic} value={topic} className="text-slate-900">
                      {topic === "all" ? "All Topics" : topic}
                    </option>
                  ))}
                </select>

                <Link
                  href="/results"
                  className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
                >
                  Back to Results
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
            {filterSummary}
          </div>
        </section>

        {filteredQuestions.length === 0 ? (
          <section className="rounded-[2rem] border border-dashed border-white/15 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white">
              No questions match this filter
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              Try switching the review filter or topic selection to see more of
              your attempt.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  setFilter("all");
                  setTopicFilter("all");
                }}
                className="rounded-2xl bg-white px-6 py-3 font-medium text-slate-900 transition hover:opacity-90"
              >
                Reset Filters
              </button>

              <Link
                href="/results"
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
              >
                View Results
              </Link>
            </div>
          </section>
        ) : (
          <div className="space-y-6">
            {filteredQuestions.map((item, filteredIndex) => {
              const {
                question,
                originalIndex,
                selected,
                correctAnswer,
                isCorrect,
                isFlagged,
                reviewAnswer,
              } = item;

              return (
                <section
                  key={question.id}
                  className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl"
                >
                  <div className="border-b border-slate-200 bg-slate-50 p-6">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <QuestionTag>Exam Q{originalIndex + 1}</QuestionTag>

                      {filteredQuestions.length !== allAttemptQuestions.length && (
                        <QuestionTag className="border-sky-200 bg-sky-50 text-sky-700">
                          Filtered #{filteredIndex + 1}
                        </QuestionTag>
                      )}

                      <QuestionTag>{question.topic}</QuestionTag>

                      <QuestionTag className="capitalize">
                        {question.difficulty}
                      </QuestionTag>

                      {isFlagged && (
                        <QuestionTag className="border-amber-200 bg-amber-50 text-amber-700">
                          Flagged
                        </QuestionTag>
                      )}

                      <QuestionTag
                        className={
                          isCorrect
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-rose-200 bg-rose-50 text-rose-700"
                        }
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </QuestionTag>
                    </div>

                    <h2 className="text-xl font-semibold leading-relaxed text-slate-900 md:text-2xl">
                      {question.question}
                    </h2>
                  </div>

                  <div className="p-6">
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => {
                        const isSelected = selected === optionIndex;
                        const isCorrectOption = correctAnswer === optionIndex;
                        const isWrongSelected = isSelected && !isCorrectOption;

                        return (
                          <div
                            key={optionIndex}
                            className={`rounded-2xl border px-4 py-4 transition ${
                              isCorrectOption
                                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                                : isWrongSelected
                                ? "border-rose-200 bg-rose-50 text-rose-900"
                                : isSelected
                                ? "border-sky-200 bg-sky-50 text-slate-900"
                                : "border-slate-200 bg-white text-slate-700"
                            }`}
                          >
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold">
                                {String.fromCharCode(65 + optionIndex)}.
                              </span>
                              <span>{option}</span>

                              {isSelected && (
                                <span
                                  className={`rounded-full px-2 py-1 text-xs ${
                                    isWrongSelected
                                      ? "border border-rose-200 bg-rose-100 text-rose-700"
                                      : isCorrectOption
                                      ? "border border-emerald-200 bg-emerald-100 text-emerald-700"
                                      : "border border-sky-200 bg-sky-100 text-sky-700"
                                  }`}
                                >
                                  Your Answer
                                </span>
                              )}

                              {isCorrectOption && (
                                <span className="rounded-full border border-emerald-200 bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
                                  Correct Answer
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 grid gap-4 lg:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          Your Selection
                        </p>
                        <p className="text-slate-700">
                          {selected !== undefined && selected >= 0
                            ? question.options[selected] ?? "Unavailable"
                            : "No answer selected"}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                          Correct Answer
                        </p>
                        <p className="text-emerald-900">
                          {correctAnswer >= 0
                            ? question.options[correctAnswer] ?? "Unavailable"
                            : "Correct answer unavailable"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-5">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                        Rationale
                      </p>
                      <p className="leading-7 text-slate-700">
                        {reviewAnswer?.rationale ?? question.rationale}
                      </p>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        )}

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Next step</h2>
              <p className="mt-1 text-sm text-slate-300">
                Return to results, retake the exam, review history, or go back home.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/results"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
              >
                View Results
              </Link>

              <Link
                href="/history"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
              >
                History
              </Link>

              <Link
                href="/quiz"
                className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-900 transition hover:opacity-90"
              >
                Retake Quiz
              </Link>

              <Link
                href="/"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
              >
                Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string | number;
  tone?: "default" | "emerald" | "rose" | "amber" | "sky";
}) {
  const toneClass =
    tone === "emerald"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
      : tone === "rose"
      ? "border-rose-400/20 bg-rose-400/10 text-rose-200"
      : tone === "amber"
      ? "border-amber-400/20 bg-amber-400/10 text-amber-200"
      : tone === "sky"
      ? "border-sky-400/20 bg-sky-400/10 text-sky-200"
      : "border-white/10 bg-white/5 text-white";

  return (
    <div className={`rounded-2xl border p-4 ${toneClass}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function PageBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur ${className}`}
    >
      {children}
    </span>
  );
}

function QuestionTag({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 ${className}`}
    >
      {children}
    </span>
  );
}

function FilterButton({
  children,
  active,
  onClick,
  tone = "default",
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  tone?: "default" | "rose" | "amber";
}) {
  const activeClass =
    tone === "rose"
      ? "border-rose-400/30 bg-rose-500/20 text-rose-100"
      : tone === "amber"
      ? "border-amber-400/30 bg-amber-500/20 text-amber-100"
      : "border-cyan-400/30 bg-cyan-500/20 text-cyan-100";

  const inactiveClass =
    "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10";

  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border px-5 py-3 font-medium transition ${
        active ? activeClass : inactiveClass
      }`}
    >
      {children}
    </button> 
  );
}