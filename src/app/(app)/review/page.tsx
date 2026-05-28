import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const demoUserEmail = "demo@local.dev";

function formatDue(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return `${Math.abs(diffDays)}d overdue`;
  if (diffDays === 0) return "Due today";
  return `Due in ${diffDays}d`;
}

export default async function ReviewPage() {
  const user = await prisma.user.findUnique({ where: { email: demoUserEmail } });

  if (!user) {
    return (
      <div className="container">
        <div className="page-header animate">
          <h1 className="page-title">Review Queue</h1>
          <p className="page-sub">Your spaced repetition schedule.</p>
        </div>
        <div className="empty animate anim-d1">
          <div className="empty-icon">🔄</div>
          <div className="empty-title">No review data yet</div>
          <p className="empty-desc">Complete a quiz to start building your review queue.</p>
        </div>
      </div>
    );
  }

  const dueItems = await prisma.reviewSchedule.findMany({
    where: { userId: user.id, dueAt: { lte: new Date() } },
    orderBy: { dueAt: "asc" },
  });

  const upcomingItems = await prisma.reviewSchedule.findMany({
    where: { userId: user.id, dueAt: { gt: new Date() } },
    orderBy: { dueAt: "asc" },
    take: 5,
  });

  const allItems = [...dueItems, ...upcomingItems];
  const cardIds = allItems.map((i) => i.cardId);
  const cards =
    cardIds.length > 0
      ? await prisma.card.findMany({ where: { id: { in: cardIds } } })
      : [];
  const cardMap = Object.fromEntries(cards.map((c) => [c.id, c]));

  return (
    <div className="container">
      <div className="page-header animate">
        <div className="row">
          <div>
            <h1 className="page-title">Review Queue</h1>
            <p className="page-sub">Cards scheduled for today.</p>
          </div>
          {dueItems.length > 0 && (
            <span className="badge badge-red">{dueItems.length} due</span>
          )}
        </div>
      </div>

      {dueItems.length === 0 && upcomingItems.length === 0 ? (
        <div className="empty animate anim-d1">
          <div className="empty-icon">🎉</div>
          <div className="empty-title">All caught up!</div>
          <p className="empty-desc">No cards due right now. Check back later or do a quiz.</p>
        </div>
      ) : (
        <>
          {dueItems.length > 0 && (
            <div className="animate anim-d1">
              <div className="row" style={{ marginBottom: "0.6rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Due Now
                </span>
              </div>
              {dueItems.map((item) => {
                const card = cardMap[item.cardId];
                return (
                  <div className="review-item" key={item.id}>
                    <div className="review-kana-box">{card?.kana ?? "?"}</div>
                    <div className="review-info">
                      <div className="review-romaji">{card?.romaji ?? "—"}</div>
                      <div className="review-due">{formatDue(item.dueAt)}</div>
                    </div>
                    <span className="badge badge-red">{item.intervalDays}d interval</span>
                  </div>
                );
              })}
            </div>
          )}

          {upcomingItems.length > 0 && (
            <div className="animate anim-d2" style={{ marginTop: dueItems.length > 0 ? "1.25rem" : 0 }}>
              <div className="row" style={{ marginBottom: "0.6rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Coming Up
                </span>
              </div>
              {upcomingItems.map((item) => {
                const card = cardMap[item.cardId];
                return (
                  <div className="review-item" key={item.id}>
                    <div className="review-kana-box">{card?.kana ?? "?"}</div>
                    <div className="review-info">
                      <div className="review-romaji">{card?.romaji ?? "—"}</div>
                      <div className="review-due">{formatDue(item.dueAt)}</div>
                    </div>
                    <span className="badge badge-purple">{item.intervalDays}d interval</span>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
