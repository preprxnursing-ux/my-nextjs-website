const finishExam = (autoSubmitted = false) => {
  const total = activeQuestions.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const timeUsed =
    mode.timerEnabled && mode.duration !== null
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
          questionId: question.id,
          question: question.question,
          topic: question.topic,
          difficulty: question.difficulty,
          options: question.options,
          selectedAnswer,
          correctAnswer,
          selectedAnswerText:
            selectedAnswer !== undefined
              ? question.options[selectedAnswer] ?? "Not answered"
              : "Not answered",
          correctAnswerText:
            question.options[correctAnswer] ?? "Unavailable",
          isCorrect: selectedAnswer === correctAnswer,
          rationale: question.rationale,
        };
      });

  // ✅ KEEP EXISTING SYSTEM
  addExamAttempt({
    score,
    total,
    answers: selectedMap,
    flaggedQuestions,
    timeRemaining: mode.timerEnabled ? timeLeft : 0,
    timeUsed,
    mode:
      modeId === "timed" || modeId === "quick" || modeId === "tutor"
        ? modeId
        : "standard",
    reviewAnswers,
  });

  // ✅ SAVE FOR RESULTS PAGE
  localStorage.setItem(
    "quiz_last_result",
    JSON.stringify({
      score,
      total,
      percentage,
      completedAt: new Date().toISOString(),
    })
  );

  // ✅ SAFE HISTORY SAVE (FIXED)
  try {
    const existing = localStorage.getItem("examHistory");
    const history = existing ? JSON.parse(existing) : [];

    history.unshift({
      id: Date.now().toString(),
      completedAt: new Date().toISOString(),
      score,
      total,
      percentage,
      answeredCount: Object.keys(selectedMap).length,
      checkedCount,
      flaggedCount,
      timeRemaining: mode.timerEnabled ? timeLeft : 0,
      timeUsed,
      answers: selectedMap,
      checkedMap: checkedMap || {}, // ✅ SAFE FIX
      flaggedQuestions,
      reviewAnswers,
      mode: modeId,
    });

    localStorage.setItem("examHistory", JSON.stringify(history));
  } catch (err) {
    console.error("History save failed:", err);
  }

  // ✅ KEEP META + REVIEW
  localStorage.setItem(
    STORAGE_KEYS.lastAttemptMeta,
    JSON.stringify({
      autoSubmitted,
      completedAt: new Date().toISOString(),
      mode: modeId,
    })
  );

  saveLegacyReviewProgress(answerRecords);

  setExamFinished(true);
  clearActiveExamSession();
};