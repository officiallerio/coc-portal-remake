import type { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";

import { loginSchema } from "./lib/schema";
import { verifyPassword } from "./lib/utils";
import { getUser } from "./lib/helper-actions";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          if (!credentials) return null;

          // Validate input using Zod
          const { studentId, password } = loginSchema.parse(credentials);

          // Find user by studentId
          const user = await getUser(studentId);

          if (!user) throw new Error("No student found.");

          if (user.user_password && password) {
            const isValid = await verifyPassword(password, user.user_password);
            if (!isValid) throw new Error("Password is incorrect.");

            // Return user if the password is correct
            return user;
          } else {
            throw new Error("Passwords must not be null.");
          }
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
