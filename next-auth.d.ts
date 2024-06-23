import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  user_fullname: string;
  user_studentId: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
    expires: any;
  }
}
