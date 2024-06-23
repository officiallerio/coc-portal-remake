import { db } from "./db/connection";

export async function getUser(studentId: string) {
  const user = await db.tbl_users.findUnique({
    where: { user_studentId: studentId },
  });

  if (!user) {
    return undefined;
  }

  return user;
}
