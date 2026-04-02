import { questions } from "@/lib/questions";

export type SelectedAnswers = Record<number, number>;

export type ReviewAnswer = {
  questionId: number;
  question: string;
  topic: string;
  difficulty: string;
  options: string[];
  selectedAnswer: number;
  correctAnswer: number;
  selectedAnswerText: string;
  correctAnswerText: string;
  isCorrect: boolean;
  rationale: string;
};

export type ExamMode = "standard" | "timed" | "quick" | "tutor";

export type ExamHistoryItem = {
  id: string;
  completedAt: string;
  score: number;
  total: number;
  percentage: number;
  answeredCount: number;
  flaggedCount: number;
  timeRemaining: number;
  timeUsed: number;
  answers: SelectedAnswers;
  flaggedQuestions: number[];
  mode?: ExamMode;
  reviewAnswers?: ReviewAnswer[];
};

export type TopicStat = {
  topic: string;
  total: number;
  correct: number;
  incorrect: number;
  percentage: number;
};

const LAST_ATTEMPT_KEY = "quiz_lastAttempt";
const EXAM_HISTORY_KEY = "quiz_examHistory";
const QUIZ_ANSWERS_KEY = "quiz_answers";
const ACTIVE_ATTEMPT_KEY = "quiz_activeAttemptId";

function getQuestionCorrectAnswer(question: any): number {
  if (typeof question?.correctAnswer === "number") return question.correctAnswer;
  if (typeof question?.answer === "number") return question.answer;
  return -1;
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error("Failed to parse saved quiz data:", error);
    return fallback;
  }
}

function normalizeSelectedAnswers(value: unknown): SelectedAnswers {
  if (!value || typeof value !== "object") return {};

  const normalized: SelectedAnswers = {};

  for (const [key, rawAnswer] of Object.entries(value as Record<string, unknown>)) {
    const questionId = Number(key);
    const answerIndex = Number(rawAnswer);

    if (!Number.isNaN(questionId) && !Number.isNaN(answerIndex)) {
      normalized[questionId] = answerIndex;
    }
  }

  return normalized;
}

function buildReviewAnswersFromSelectedAnswers(
  answers: SelectedAnswers
): ReviewAnswer[] {
  return (questions as any[])
    .filter((question) => answers[question.id] !== undefined)
    .map((question) => {
      const selectedAnswer = answers[question.id];
      const correctAnswer = getQuestionCorrectAnswer(question);

      return {
        questionId: question.id,
        question: question.question ?? "",
        topic: question.topic ?? "General",
        difficulty: question.difficulty ?? "medium",
        options: Array.isArray(question.options) ? question.options : [],
        selectedAnswer,
        correctAnswer,
        selectedAnswerText:
          Array.isArray(question.options) && question.options[selectedAnswer] !== undefined
            ? question.options[selectedAnswer]
            : "Not answered",
        correctAnswerText:
          Array.isArray(question.options) && question.options[correctAnswer] !== undefined
            ? question.options[correctAnswer]
            : "Unavailable",
        isCorrect: selectedAnswer === correctAnswer,
        rationale: question.rationale ?? "",
      };
    });
}

function normalizeHistoryItem(raw: any): ExamHistoryItem | null {
  if (!raw || typeof raw !== "object") return null;

  const answers = normalizeSelectedAnswers(raw.answers);

  const flaggedQuestions = Array.isArray(raw.flaggedQuestions)
    ? raw.flaggedQuestions.filter((item) => typeof item === "number")
    : [];

  const reviewAnswers: ReviewAnswer[] = Array.isArray(raw.reviewAnswers)
    ? raw.reviewAnswers
    : buildReviewAnswersFromSelectedAnswers(answers);

  const total =
    typeof raw.total === "number" ? raw.total : (questions as any[]).length;

  const score =
    typeof raw.score === "number" ? raw.score : calculateScore(answers);

  const answeredCount =
    typeof raw.answeredCount === "number"
      ? raw.answeredCount
      : Object.keys(answers).length;

  const flaggedCount =
    typeof raw.flaggedCount === "number"
      ? raw.flaggedCount
      : flaggedQuestions.length;

  const percentage =
    typeof raw.percentage === "number"
      ? raw.percentage
      : total > 0
      ? Math.round((score / total) * 100)
      : 0;

  const mode =
    raw.mode === "standard" ||
    raw.mode === "timed" ||
    raw.mode === "quick" ||
    raw.mode === "tutor"
      ? raw.mode
      : undefined;

  return {
    id:
      typeof raw.id === "string" && raw.id.trim().length > 0
        ? raw.id
        : `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    completedAt:
      typeof raw.completedAt === "string" && raw.completedAt.trim().length > 0
        ? raw.completedAt
        : new Date().toISOString(),
    score,
    total,
    percentage,
    answeredCount,
    flaggedCount,
    timeRemaining: typeof raw.timeRemaining === "number" ? raw.timeRemaining : 0,
    timeUsed: typeof raw.timeUsed === "number" ? raw.timeUsed : 0,
    answers,
    flaggedQuestions,
    mode,
    reviewAnswers,
  };
}

export function calculateScore(answers: SelectedAnswers) {
  let score = 0;

  (questions as any[]).forEach((question) => {
    if (answers[question.id] === getQuestionCorrectAnswer(question)) {
      score += 1;
    }
  });

  return score;
}

export function buildTopicStats(answers: SelectedAnswers): TopicStat[] {
  const statsMap: Record<string, TopicStat> = {};

  (questions as any[]).forEach((question) => {
    const topic = question.topic ?? "General";

    if (!statsMap[topic]) {
      statsMap[topic] = {
        topic,
        total: 0,
        correct: 0,
        incorrect: 0,
        percentage: 0,
      };
    }

    statsMap[topic].total += 1;

    if (answers[question.id] === getQuestionCorrectAnswer(question)) {
      statsMap[topic].correct += 1;
    } else {
      statsMap[topic].incorrect += 1;
    }
  });

  return Object.values(statsMap)
    .map((item) => ({
      ...item,
      percentage: item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0,
    }))
    .sort((a, b) => a.percentage - b.percentage);
}

export function getPerformanceLabel(percentage: number) {
  if (percentage >= 85) return "Excellent";
  if (percentage >= 70) return "Strong";
  if (percentage >= 50) return "Developing";
  return "Needs Review";
}

export function getPerformanceGradient(percentage: number) {
  if (percentage >= 85) return "from-emerald-500 to-teal-600";
  if (percentage >= 70) return "from-blue-500 to-indigo-600";
  if (percentage >= 50) return "from-amber-500 to-orange-600";
  return "from-rose-500 to-red-600";
}

export function formatSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function getActiveAttemptId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACTIVE_ATTEMPT_KEY);
}

export function setActiveAttemptId(attemptId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACTIVE_ATTEMPT_KEY, attemptId);
}

export function clearActiveAttemptId() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACTIVE_ATTEMPT_KEY);
}

export function getLastAttempt(): ExamHistoryItem | null {
  if (typeof window === "undefined") return null;

  const activeAttemptId = getActiveAttemptId();
  const history = getExamHistory();

  if (activeAttemptId && history.length > 0) {
    const matched = history.find((item) => item.id === activeAttemptId);
    if (matched) return matched;
  }

  const raw = safeParse<any | null>(localStorage.getItem(LAST_ATTEMPT_KEY), null);
  const normalized = normalizeHistoryItem(raw);

  if (normalized) return normalized;
  return history[0] ?? null;
}

export function getExamHistory(): ExamHistoryItem[] {
  if (typeof window === "undefined") return [];

  const raw = safeParse<any[]>(localStorage.getItem(EXAM_HISTORY_KEY), []);
  return raw
    .map(normalizeHistoryItem)
    .filter((item): item is ExamHistoryItem => item !== null)
    .sort(
      (a, b) =>
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
}

export function saveLastAttempt(attempt: ExamHistoryItem) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LAST_ATTEMPT_KEY, JSON.stringify(attempt));
}

export function saveExamHistory(history: ExamHistoryItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(history));
}

export function addExamAttempt(input: {
  score: number;
  total: number;
  answers: SelectedAnswers;
  flaggedQuestions?: number[];
  timeRemaining?: number;
  timeUsed?: number;
  mode?: ExamMode;
  reviewAnswers?: ReviewAnswer[];
}) {
  const answers = normalizeSelectedAnswers(input.answers);
  const flaggedQuestions = Array.isArray(input.flaggedQuestions)
    ? input.flaggedQuestions
    : [];

  const reviewAnswers =
    Array.isArray(input.reviewAnswers)
      ? input.reviewAnswers
      : buildReviewAnswersFromSelectedAnswers(answers);

  const attempt: ExamHistoryItem = {
    id: `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    completedAt: new Date().toISOString(),
    score: input.score,
    total: input.total,
    percentage: input.total > 0 ? Math.round((input.score / input.total) * 100) : 0,
    answeredCount: Object.keys(answers).length,
    flaggedCount: flaggedQuestions.length,
    timeRemaining: input.timeRemaining ?? 0,
    timeUsed: input.timeUsed ?? 0,
    answers,
    flaggedQuestions,
    mode: input.mode ?? "standard",
    reviewAnswers,
  };

  const history = getExamHistory();
  const nextHistory = [attempt, ...history];

  saveLastAttempt(attempt);
  saveExamHistory(nextHistory);
  setActiveAttemptId(attempt.id);

  return attempt;
}

export function clearSavedExamData() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("quizScore");
  localStorage.removeItem("quizReview");
  localStorage.removeItem("quiz_review_answers");
  localStorage.removeItem(QUIZ_ANSWERS_KEY);
  localStorage.removeItem(LAST_ATTEMPT_KEY);
  localStorage.removeItem(EXAM_HISTORY_KEY);
  localStorage.removeItem(ACTIVE_ATTEMPT_KEY);
}

export function hasSavedSession() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(QUIZ_ANSWERS_KEY);
}