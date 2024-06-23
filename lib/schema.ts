import { z } from "zod";

export const loginSchema = z.object({
  studentId: z.string().min(1, { message: "Student ID is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});
