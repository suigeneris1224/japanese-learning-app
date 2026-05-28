"use client";
import { useState } from "react";

type Card = {
  id: string;
  lessonId: string;
  kana: string;
  romaji: string;
  meaning: string;
};

type Result = { isCorrect: boolean; expected: string };

export function QuizClient({ cards }: { cards: Card[] }) {
  const [shuffled] = useState<Card[]>(() =>
    [...cards].sort(() => Math.random() - 0.5)
  );
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  if (cards.length === 0) {
    return (
      <div className="empty animate">
        <div className="empty-icon">📚</div>
        <div className="empty-title">No cards found</div>
        <p className="empty-desc">Seed your database to start quizzing.</p>
      </div>
    );
  }

  const card = shuffled[index % shuffled.length];
  const accuracy =
    score.total > 0 ? Math.round((score.correct / score.total) * 100) : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!answer.trim() || loading) return;
    setLoading(true);
    const form = new FormData();
    form.set("cardId", card.id);
    form.set("lessonId", card.lessonId);
    form.set("answer", answer.trim().toLowerCase());
    const res = await fetch("/api/quiz", { method: "POST", body: form });
    const data: Result = await res.json();
    setResult(data);
    setScore((s) => ({
      correct: s.correct + (data.isCorrect ? 1 : 0),
      total: s.total + 1,
    }));
    setLoading(false);
  }

  function handleNext() {
    setResult(null);
    setAnswer("");
    setIndex((i) => i + 1);
  }

  return (
    <div className="quiz-wrap">
      {/* Score row */}
      {score.total > 0 && (
        <div className="row animate" style={{ marginBottom: "1rem" }}>
          <span className="badge badge-purple">
            {score.correct}/{score.total} correct
          </span>
          <span className="badge badge-gray">{accuracy}% accuracy</span>
          <span className="badge badge-gray">
            Card {(index % shuffled.length) + 1}/{shuffled.length}
          </span>
        </div>
      )}

      {result ? (
        <div className="quiz-card animate">
          <p className="quiz-label">Your answer</p>
          <span className="quiz-kana">{card.kana}</span>

          <div className="result-correct">
            {result.isCorrect ? (
              <>
                <div className="result-icon">✅</div>
                <div className="result-label" style={{ color: "var(--green)" }}>
                  Correct!
                </div>
                <div className="result-answer">{card.romaji}</div>
              </>
            ) : (
              <>
                <div className="result-icon">❌</div>
                <div className="result-label" style={{ color: "var(--red)" }}>
                  Incorrect
                </div>
                <div className="result-answer">
                  Correct answer:{" "}
                  <strong style={{ color: "var(--text)" }}>{result.expected}</strong>
                </div>
              </>
            )}
          </div>

          <button className="btn btn-primary btn-full btn-lg" onClick={handleNext}>
            Next Card →
          </button>
        </div>
      ) : (
        <div className="quiz-card animate">
          <p className="quiz-label">Translate to romaji</p>
          <span className="quiz-kana">{card.kana}</span>
          <p className="quiz-meaning">{card.meaning}</p>

          <form onSubmit={handleSubmit}>
            <input
              className="quiz-input"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="e.g. ka, shi, tsu…"
              autoComplete="off"
              autoFocus
              required
            />
            <button
              className="btn btn-primary btn-full btn-lg"
              type="submit"
              disabled={loading || !answer.trim()}
            >
              {loading ? "Checking…" : "Check Answer"}
            </button>
          </form>
        </div>
      )}

      {score.total === 0 && (
        <p style={{ textAlign: "center", color: "var(--text-3)", fontSize: "0.78rem", marginTop: "0.75rem" }}>
          Card {(index % shuffled.length) + 1} of {shuffled.length}
        </p>
      )}
    </div>
  );
}
