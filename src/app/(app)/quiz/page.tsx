import { prisma } from "@/lib/db";

export default async function QuizPage() {
  const card = await prisma.card.findFirst({ orderBy: { createdAt: "asc" } });

  return (
    <main className="container">
      <h1>Quick Quiz</h1>
      {!card ? (
        <p>No cards found. Seed your database first.</p>
      ) : (
        <form className="card" action="/api/quiz" method="POST">
          <input type="hidden" name="cardId" value={card.id} />
          <input type="hidden" name="lessonId" value={card.lessonId} />
          <label>
            What is the romaji for <strong>{card.kana}</strong>?
            <input
              name="answer"
              required
              autoComplete="off"
              style={{ display: "block", marginTop: "0.5rem", padding: "0.5rem" }}
            />
          </label>
          <button className="button" type="submit" style={{ marginTop: "0.75rem" }}>
            Submit
          </button>
        </form>
      )}
    </main>
  );
}
