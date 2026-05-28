import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function LearnPage() {
  const lessons = await prisma.lesson.findMany({
    include: { cards: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="container">
      <div className="page-header animate">
        <div className="row">
          <div>
            <h1 className="page-title">Learn Kana</h1>
            <p className="page-sub">Tap a character to study its pronunciation.</p>
          </div>
          <span className="badge badge-purple">{lessons.length} lessons</span>
        </div>
      </div>

      {lessons.length === 0 ? (
        <div className="empty animate">
          <div className="empty-icon">📚</div>
          <div className="empty-title">No lessons yet</div>
          <p className="empty-desc">Seed your database to populate lessons.</p>
        </div>
      ) : (
        lessons.map((lesson, i) => (
          <div
            key={lesson.id}
            className={`lesson-card animate anim-d${Math.min(i + 1, 3) as 1 | 2 | 3}`}
          >
            <div className="lesson-head">
              <div>
                <div className="lesson-title">{lesson.title}</div>
                <div className="lesson-desc">{lesson.description}</div>
              </div>
              <span className="badge badge-gray">{lesson.cards.length} cards</span>
            </div>

            <div className="kana-grid">
              {lesson.cards.map((card) => (
                <div className="kana-tile" key={card.id} title={card.meaning}>
                  <span className="kana-char">{card.kana}</span>
                  <span className="kana-rom">{card.romaji}</span>
                </div>
              ))}
            </div>

            <div className="prog-bar" style={{ marginTop: "0.875rem" }}>
              <div className="prog-fill" style={{ width: "0%" }} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
