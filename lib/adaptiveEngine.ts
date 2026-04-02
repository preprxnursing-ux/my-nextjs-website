import { questions } from "./questions";
import type { ConfidenceLevel } from "./examStorage";

export type AdaptiveInputs = {
  selectedAnswers: (number | null)[];
  checkedAnswers: boolean[];
  flaggedQuestions: boolean[];
  confidenceLevels: ConfidenceLevel[];
};

export function buildAdaptiveOrder({
  selectedAnswers,
  checkedAnswers,
  flaggedQuestions,
  confidenceLevels,
}: AdaptiveInputs): number[] {
  const scored = questions.map((question, index) => {
    const selected = selectedAnswers[index];
    const checked = checkedAnswers[index];
    const flagged = flaggedQuestions[index];
    const confidence = confidenceLevels[index];
    const isCorrect = selected === question.correctAnswer;

    let priority = 0;

    // unanswered gets medium priority
    if (!checked) priority += 2;

    // incorrect gets strong priority
    if (checked && !isCorrect) priority += 5;

    // flagged gets strong priority
    if (flagged) priority += 4;

    // low confidence gets strong priority
    if (confidence === "Low") priority += 4;

    // medium confidence gets some priority
    if (confidence === "Medium") priority += 2;

    return {
      index,
      priority,
    };
  });

  scored.sort((a, b) => b.priority - a.priority);

  return scored.map((item) => item.index);
}