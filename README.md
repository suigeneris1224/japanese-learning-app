# Japanese Learning App

A Next.js PWA MVP for learning Japanese (Hiragana + Katakana) on desktop and mobile, designed for Vercel deployment.

## MVP Features

- Email-based sign-in bootstrap with NextAuth Credentials.
- Lesson browser for Hiragana/Katakana starter content.
- Quiz endpoint that stores attempts and updates progress.
- Spaced-repetition review scheduling.
- Mobile-ready PWA manifest and service worker.
- CI pipeline for lint, typecheck, tests, and build.

## Tech Stack

- Next.js App Router + TypeScript
- Prisma + PostgreSQL
- NextAuth/Auth.js
- Vitest
- GitHub Actions
- Vercel

## Local Setup

1. Install dependencies:
   - `npm install`
2. Copy env:
   - `cp .env.example .env.local`
3. Generate Prisma client:
   - `npm run prisma:generate`
4. Run migrations:
   - `npm run prisma:migrate`
5. Seed starter lessons:
   - `npm run prisma:seed`
6. Start app:
   - `npm run dev`

## Create GitHub Repository

Run this inside the `japanese-learning-app` folder:

1. `git init`
2. `git add .`
3. `git commit -m "Initial Japanese learning MVP scaffold"`
4. `gh repo create japanese-learning-app --public --source=. --remote=origin --push`

## Deploy to Vercel

1. Create/import project in Vercel.
2. Set environment variables:
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `AUTH_TRUST_HOST=true`
   - `NEXTAUTH_URL`
3. Deploy:
   - `vercel --prod`

## Notes

- Replace `public/icons/icon-192.png` and `public/icons/icon-512.png` with real PNG assets.
- Credentials provider is a fast MVP auth bootstrap; upgrade to OAuth/email magic links for production.
