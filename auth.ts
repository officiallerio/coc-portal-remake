import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "./lib/db/connection";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        // User account information
        session.user.user_fullname = token.user_fullname as string;
        session.user.user_studentId = token.user_username as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await db.tbl_users.findUnique({
        where: { id: token.sub },
      });

      if (!user) return token;

      token.user_fullname = user.user_fullname;
      token.user_username = user.user_studentId;
      token.createdAt = user.createdAt;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 hours
    updateAge: 30 * 60, // 30 minutes
  },
  ...authConfig,
});
