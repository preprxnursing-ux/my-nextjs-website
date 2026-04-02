export type ExamModeId = "timed" | "tutor" | "quick";

export type QuestionDifficulty = "easy" | "medium" | "hard";

export type ExamMode = {
  id: ExamModeId;
  name: string;
  shortName: string;
  description: string;
  duration: number | null;
  questionCount: number | null;
  accent: string;
  surface: string;
  timerEnabled: boolean;
  tutorMode: boolean;
  reviewModeLabel: string;
};

export type QuizSessionConfig = {
  modeId: ExamModeId;
  topicFilter: string[];
  difficultyFilter: QuestionDifficulty[];
};

export const STORAGE_KEYS = {
  mode: "quiz_mode",
  sessionConfig: "quiz_session_config",
  currentIndex: "quiz_currentIndex",
  answers: "quiz_answers",
  flagged: "quiz_flagged",
  timeLeft: "quiz_timeLeft",
  examHistory: "quiz_examHistory",
  lastAttempt: "quiz_lastAttempt",
  lastAttemptMeta: "quiz_lastAttemptMeta",
} as const;

export const EXAM_MODES: ExamMode[] = [
  {
    id: "timed",
    name: "Timed Mode",
    shortName: "Timed",
    description:
      "Classic NCLEX-style session with the full question flow and active countdown.",
    duration: 30 * 60,
    questionCount: null,
    accent: "from-blue-500 to-indigo-600",
    surface: "from-blue-500/15 to-indigo-500/15",
    timerEnabled: true,
    tutorMode: false,
    reviewModeLabel: "Timed attempt",
  },
  {
    id: "tutor",
    name: "Tutor Mode",
    shortName: "Tutor",
    description:
      "Learning-first mode with flexible pacing and no countdown pressure.",
    duration: null,
    questionCount: null,
    accent: "from-emerald-500 to-teal-600",
    surface: "from-emerald-500/15 to-teal-500/15",
    timerEnabled: false,
    tutorMode: true,
    reviewModeLabel: "Tutor attempt",
  },
  {
    id: "quick",
    name: "Quick 10",
    shortName: "Quick",
    description:
      "A short sprint for fast practice, momentum building, and daily repetition.",
    duration: 10 * 60,
    questionCount: 10,
    accent: "from-amber-500 to-orange-600",
    surface: "from-amber-500/15 to-orange-500/15",
    timerEnabled: true,
    tutorMode: false,
    reviewModeLabel: "Quick sprint",
  },
];

export const DEFAULT_MODE_ID: ExamModeId = "timed";

export const DEFAULT_SESSION_CONFIG: QuizSessionConfig = {
  modeId: DEFAULT_MODE_ID,
  topicFilter: [],
  difficultyFilter: [],
};

export function getExamMode(modeId?: string | null): ExamMode {
  return EXAM_MODES.find((mode) => mode.id === modeId) ?? EXAM_MODES[0];
}

export function getAllExamModes(): ExamMode[] {
  return EXAM_MODES;
}

export function isValidExamModeId(value: unknown): value is ExamModeId {
  return EXAM_MODES.some((mode) => mode.id === value);
}

export function getDefaultSessionConfig(): QuizSessionConfig {
  return { ...DEFAULT_SESSION_CONFIG };
}

export function normalizeSessionConfig(
  value: Partial<QuizSessionConfig> | null | undefined
): QuizSessionConfig {
  const modeId = isValidExamModeId(value?.modeId)
    ? value!.modeId
    : DEFAULT_MODE_ID;

  const topicFilter = Array.isArray(value?.topicFilter)
    ? value!.topicFilter.filter((item): item is string => typeof item === "string")
    : [];

  const difficultyFilter = Array.isArray(value?.difficultyFilter)
    ? value!.difficultyFilter.filter(
        (item): item is QuestionDifficulty =>
          item === "easy" || item === "medium" || item === "hard"
      )
    : [];

  return {
    modeId,
    topicFilter,
    difficultyFilter,
  };
}

export function buildSessionConfig(
  overrides?: Partial<QuizSessionConfig>
): QuizSessionConfig {
  return normalizeSessionConfig({
    ...DEFAULT_SESSION_CONFIG,
    ...overrides,
  });
}

export function getModeDurationLabel(mode: ExamMode): string {
  if (!mode.timerEnabled || mode.duration === null) return "Flexible";
  const minutes = Math.floor(mode.duration / 60);
  return `${minutes} min`;
}

export function getModeQuestionCountLabel(mode: ExamMode): string {
  if (mode.questionCount === null) return "Full set";
  return `${mode.questionCount} questions`;
}

export function getModeBadge(modeId?: string | null): string {
  return getExamMode(modeId).shortName;
}