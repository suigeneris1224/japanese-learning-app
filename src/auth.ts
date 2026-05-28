import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt"
  },
  secret: process.env.AUTH_SECRET ?? "local-dev-auth-secret-change-me",
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

        return {
          id: email,
          email,
          name: email.split("@")[0]
        };
      }
    })
  ]
});
