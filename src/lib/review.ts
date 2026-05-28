type ReviewInput = {
  isCorrect: boolean;
  easeFactor: number;
  intervalDays: number;
};

export type ReviewResult = {
  easeFactor: number;
  intervalDays: number;
  dueAt: Date;
};

export function calculateNextReview(input: ReviewInput): ReviewResult {
  const easeDelta = input.isCorrect ? 0.15 : -0.2;
  const nextEase = Math.max(1.3, input.easeFactor + easeDelta);
  const nextInterval = input.isCorrect
    ? Math.max(1, Math.round(input.intervalDays * nextEase))
    : 1;

  const dueAt = new Date();
  dueAt.setDate(dueAt.getDate() + nextInterval);

  return {
    easeFactor: nextEase,
    intervalDays: nextInterval,
    dueAt
  };
}
