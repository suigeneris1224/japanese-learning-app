import { describe, expect, it } from "vitest";
import { calculateNextReview } from "./review";

describe("calculateNextReview", () => {
  it("increases interval when answer is correct", () => {
    const result = calculateNextReview({
      isCorrect: true,
      easeFactor: 2.5,
      intervalDays: 2
    });

    expect(result.intervalDays).toBeGreaterThan(2);
    expect(result.easeFactor).toBeGreaterThan(2.5);
  });

  it("resets interval when answer is incorrect", () => {
    const result = calculateNextReview({
      isCorrect: false,
      easeFactor: 2.5,
      intervalDays: 8
    });

    expect(result.intervalDays).toBe(1);
    expect(result.easeFactor).toBeLessThan(2.5);
  });
});
