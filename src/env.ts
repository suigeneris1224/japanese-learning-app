import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string().min(20),
  AUTH_TRUST_HOST: z.enum(["true", "false"]).default("true"),
  NEXTAUTH_URL: z.string().url().optional()
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
  AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST ?? "true",
  NEXTAUTH_URL: process.env.NEXTAUTH_URL
});
