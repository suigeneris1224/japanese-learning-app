import { prisma } from "@/lib/db";
import { QuizClient } from "./QuizClient";

export const dynamic = "force-dynamic";

export default async function QuizPage() {
  const cards = await prisma.card.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="container">
      <div className="page-header animate">
        <h1 className="page-title">Quick Quiz</h1>
        <p className="page-sub">Type the romaji for each kana character.</p>
      </div>
      <QuizClient cards={cards} />
    </div>
  );
}
