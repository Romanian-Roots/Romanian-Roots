import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma"; // ✅ shared Prisma instance
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        const isValid = user && (await bcrypt.compare(credentials.password, user.password));
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          isPremium: user.isPremium,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isPremium = user.isPremium;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.isPremium = token.isPremium;
      return session;
    },
  },
  pages: { signIn: "/login" },
});

export { handler as GET, handler as POST };
