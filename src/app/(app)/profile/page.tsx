import { prisma } from "@/lib/db";

const demoUserEmail = "demo@local.dev";

export default async function ProfilePage() {
  const user = await prisma.user.findUnique({
    where: { email: demoUserEmail },
    include: { progressItems: true }
  });

  if (!user) {
    return (
      <main className="container">
        <h1>Profile</h1>
        <p>Create a user by signing in with email first.</p>
      </main>
    );
  }

  const totalCorrect = user.progressItems.reduce((acc, item) => acc + item.correctAnswers, 0);
  const totalIncorrect = user.progressItems.reduce(
    (acc, item) => acc + item.incorrectAnswers,
    0
  );
  const completion = user.progressItems.reduce((acc, item) => acc + item.completedCards, 0);

  return (
    <main className="container">
      <h1>{user.name ?? "Learner"}'s Profile</h1>
      <div className="card">
        <p>Completion Count: {completion}</p>
        <p>Correct Answers: {totalCorrect}</p>
        <p>Incorrect Answers: {totalIncorrect}</p>
      </div>
    </main>
  );
}
