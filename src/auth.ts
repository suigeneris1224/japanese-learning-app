import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  providers: [
    Credentials({
      name: "Guest",
      credentials: {
        email: { label: "Email", type: "email" }
      },
      async authorize(credentials) {
        const email = credentials?.email;
        if (typeof email !== "string" || !email.includes("@")) {
          return null;
        }

        const existing = await prisma.user.upsert({
          where: { email },
          update: {},
          create: {
            email,
            name: email.split("@")[0]
          }
        });

        return {
          id: existing.id,
          email: existing.email,
          name: existing.name
        };
      }
    })
  ]
});
