import { prisma } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

const demoUserEmail = "demo@local.dev";

export default async function ProfilePage() {
  const user = await prisma.user.findUnique({
    where: { email: demoUserEmail },
    include: { progressItems: true },
  });

  if (!user) {
    return (
      <div className="container">
        <div className="page-header animate">
          <h1 className="page-title">Profile</h1>
          <p className="page-sub">Your learning stats at a glance.</p>
        </div>
        <div className="empty animate anim-d1">
          <div className="empty-icon">👤</div>
          <div className="empty-title">No progress yet</div>
          <p className="empty-desc">
            Complete a quiz to start tracking your progress.
          </p>
          <Link href="/quiz" className="btn btn-primary" style={{ marginTop: "1.25rem" }}>
            Start a Quiz
          </Link>
        </div>
      </div>
    );
  }

  const totalCorrect = user.progressItems.reduce(
    (acc, item) => acc + item.correctAnswers,
    0
  );
  const totalIncorrect = user.progressItems.reduce(
    (acc, item) => acc + item.incorrectAnswers,
    0
  );
  const totalAttempts = totalCorrect + totalIncorrect;
  const accuracy =
    totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  const completedCards = user.progressItems.reduce(
    (acc, item) => acc + item.completedCards,
    0
  );
  const maxStreak = user.progressItems.reduce(
    (acc, item) => Math.max(acc, item.streakDays),
    0
  );

  return (
    <div className="container">
      <div className="page-header animate">
        <h1 className="page-title">{user.name ?? "Learner"}&apos;s Profile</h1>
        <p className="page-sub">Your learning stats at a glance.</p>
      </div>

      <div className="streak-banner animate anim-d1">
        <div className="streak-icon">🔥</div>
        <div>
          <div className="streak-val">{maxStreak}</div>
          <div className="streak-lbl">Day streak</div>
        </div>
      </div>

      <div className="stat-grid animate anim-d2">
        <div className="stat-card">
          <div className="stat-val sv-purple">{completedCards}</div>
          <div className="stat-lbl">Cards Studied</div>
        </div>
        <div className="stat-card">
          <div className="stat-val sv-yellow">{accuracy}%</div>
          <div className="stat-lbl">Accuracy</div>
        </div>
        <div className="stat-card">
          <div className="stat-val sv-green">{totalCorrect}</div>
          <div className="stat-lbl">Correct</div>
        </div>
        <div className="stat-card">
          <div className="stat-val sv-red">{totalIncorrect}</div>
          <div className="stat-lbl">Incorrect</div>
        </div>
      </div>

      {user.progressItems.length > 0 && (
        <div className="animate anim-d3" style={{ marginTop: "1rem" }}>
          <div
            className="row"
            style={{
              marginBottom: "0.75rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "var(--text-2)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            <span>Lesson Progress</span>
            <span>{user.progressItems.length} lessons</span>
          </div>
          {user.progressItems.map((item) => {
            const total = item.correctAnswers + item.incorrectAnswers;
            const pct = total > 0 ? Math.round((item.correctAnswers / total) * 100) : 0;
            return (
              <div className="card" key={item.id} style={{ padding: "0.875rem 1rem" }}>
                <div className="row">
                  <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                    Lesson #{item.lessonId.slice(-4)}
                  </span>
                  <span className="badge badge-purple">{pct}%</span>
                </div>
                <div className="prog-bar">
                  <div className="prog-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
