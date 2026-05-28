import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const demoUserEmail = "demo@local.dev";

export default async function ReviewPage() {
  const user = await prisma.user.findUnique({ where: { email: demoUserEmail } });
  if (!user) {
    return (
      <main className="container">
        <h1>Review Queue</h1>
        <p>Sign in once to generate your review queue.</p>
      </main>
    );
  }

  const dueItems = await prisma.reviewSchedule.findMany({
    where: {
      userId: user.id,
      dueAt: { lte: new Date() }
    },
    orderBy: { dueAt: "asc" }
  });

  return (
    <main className="container">
      <h1>Review Queue</h1>
      <p>{dueItems.length} cards are due for review.</p>
      {dueItems.map((item) => (
        <div className="card" key={item.id}>
          <p>Card ID: {item.cardId}</p>
          <p>Due: {item.dueAt.toISOString()}</p>
          <p>Interval: {item.intervalDays} day(s)</p>
          <p>Ease: {item.easeFactor.toFixed(2)}</p>
        </div>
      ))}
    </main>
  );
}
