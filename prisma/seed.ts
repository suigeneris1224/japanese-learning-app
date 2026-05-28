import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const hiraganaCards = [
  { kana: "あ", romaji: "a", meaning: "a" },
  { kana: "い", romaji: "i", meaning: "i" },
  { kana: "う", romaji: "u", meaning: "u" },
  { kana: "え", romaji: "e", meaning: "e" },
  { kana: "お", romaji: "o", meaning: "o" }
];

const katakanaCards = [
  { kana: "ア", romaji: "a", meaning: "a" },
  { kana: "イ", romaji: "i", meaning: "i" },
  { kana: "ウ", romaji: "u", meaning: "u" },
  { kana: "エ", romaji: "e", meaning: "e" },
  { kana: "オ", romaji: "o", meaning: "o" }
];

async function main() {
  const lessons = [
    {
      slug: "hiragana-basics",
      title: "Hiragana Basics",
      description: "Learn the first Hiragana sounds.",
      cards: hiraganaCards
    },
    {
      slug: "katakana-basics",
      title: "Katakana Basics",
      description: "Learn the first Katakana sounds.",
      cards: katakanaCards
    }
  ];

  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: { slug: lesson.slug },
      update: {
        title: lesson.title,
        description: lesson.description
      },
      create: {
        slug: lesson.slug,
        title: lesson.title,
        description: lesson.description,
        cards: {
          create: lesson.cards
        }
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
