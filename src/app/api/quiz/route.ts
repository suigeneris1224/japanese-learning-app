import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { calculateNextReview } from "@/lib/review";

const demoUserEmail = "demo@local.dev";

export async function POST(request: Request) {
  const form = await request.formData();
  const cardId = String(form.get("cardId") ?? "");
  const lessonId = String(form.get("lessonId") ?? "");
  const answer = String(form.get("answer") ?? "").trim().toLowerCase();

  const user = await prisma.user.upsert({
    where: { email: demoUserEmail },
    update: {},
    create: {
      email: demoUserEmail,
      name: "Demo Learner"
    }
  });

  const card = await prisma.card.findUnique({ where: { id: cardId } });
  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  const isCorrect = card.romaji.toLowerCase() === answer;

  await prisma.quizAttempt.create({
    data: {
      userId: user.id,
      cardId: card.id,
      answer,
      isCorrect
    }
  });

  const progress = await prisma.userProgress.upsert({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId
      }
    },
    update: {
      completedCards: { increment: 1 },
      correctAnswers: { increment: isCorrect ? 1 : 0 },
      incorrectAnswers: { increment: isCorrect ? 0 : 1 },
      streakDays: isCorrect ? { increment: 1 } : 0
    },
    create: {
      userId: user.id,
      lessonId,
      completedCards: 1,
      correctAnswers: isCorrect ? 1 : 0,
      incorrectAnswers: isCorrect ? 0 : 1,
      streakDays: isCorrect ? 1 : 0
    }
  });

  const existingSchedule = await prisma.reviewSchedule.findUnique({
    where: {
      userId_cardId: {
        userId: user.id,
        cardId: card.id
      }
    }
  });

  const nextReview = calculateNextReview({
    isCorrect,
    easeFactor: existingSchedule?.easeFactor ?? 2.5,
    intervalDays: existingSchedule?.intervalDays ?? 1
  });

  await prisma.reviewSchedule.upsert({
    where: {
      userId_cardId: {
        userId: user.id,
        cardId: card.id
      }
    },
    update: {
      easeFactor: nextReview.easeFactor,
      intervalDays: nextReview.intervalDays,
      dueAt: nextReview.dueAt
    },
    create: {
      userId: user.id,
      cardId: card.id,
      easeFactor: nextReview.easeFactor,
      intervalDays: nextReview.intervalDays,
      dueAt: nextReview.dueAt
    }
  });

  return NextResponse.json({
    isCorrect,
    expected: card.romaji,
    progress
  });
}
