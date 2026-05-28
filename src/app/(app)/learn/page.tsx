import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function LearnPage() {
  const lessons = await prisma.lesson.findMany({
    include: { cards: true },
    orderBy: { createdAt: "asc" }
  });

  return (
    <main className="container">
      <h1>Learn Kana</h1>
      {lessons.map((lesson) => (
        <section className="card" key={lesson.id}>
          <h2>{lesson.title}</h2>
          <p>{lesson.description}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px" }}>
            {lesson.cards.map((card) => (
              <div key={card.id} className="card" style={{ marginBottom: 0 }}>
                <strong style={{ fontSize: "1.3rem" }}>{card.kana}</strong>
                <div>{card.romaji}</div>
                <small>{card.meaning}</small>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
