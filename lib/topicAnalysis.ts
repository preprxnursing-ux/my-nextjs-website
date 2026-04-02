import { questions } from "./questions";
import { ExamSession } from "./examStorage";

export type TopicSummary = {
  topic: string;
  total: number;
  correct: number;
  incorrect: number;
  accuracy: number;
};

export function getTopicSummaries(session: ExamSession): TopicSummary[] {
  const topicMap: Record<
    string,
    { total: number; correct: number; incorrect: number }
  > = {};

  questions.forEach((question, index) => {
    const topic = question.topic;

    if (!topicMap[topic]) {
      topicMap[topic] = { total: 0, correct: 0, incorrect: 0 };
    }

    const selectedAnswer = session.selectedAnswers[index];
    const isCorrect = selectedAnswer === question.correctAnswer;

    topicMap[topic].total += 1;

    if (isCorrect) {
      topicMap[topic].correct += 1;
    } else {
      topicMap[topic].incorrect += 1;
    }
  });

  return Object.entries(topicMap).map(([topic, stats]) => ({
    topic,
    total: stats.total,
    correct: stats.correct,
    incorrect: stats.incorrect,
    accuracy:
      stats.total === 0 ? 0 : Math.round((stats.correct / stats.total) * 100),
  }));
}