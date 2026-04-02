export type ConfidenceLevel = "Low" | "Medium" | "High" | null;

export type ExamSession = {
  selectedAnswers: (number | null)[];
  checkedAnswers: boolean[];
  flaggedQuestions: boolean[];
  confidenceLevels: ConfidenceLevel[];
  score: number;
  totalQuestions: number;
  completedAt: string;
};

const EXAM_STORAGE_KEY = "nclex_exam_session";

export function saveExamSession(session: ExamSession) {
  if (typeof window === "undefined") return;
  localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(session));
}

export function getExamSession(): ExamSession | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(EXAM_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ExamSession;
  } catch {
    return null;
  }
}

export function clearExamSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(EXAM_STORAGE_KEY);
}