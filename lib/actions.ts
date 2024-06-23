"use server";

import { z } from "zod";
import { signIn, signOut } from "@/auth";

import { AuthError } from "next-auth";

import { loginSchema } from "@/lib/schema";

export async function login(values: z.infer<typeof loginSchema>) {
  const validateFields = loginSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      status: -1,
      message: "Invalid Fields",
      errors: validateFields.error.errors,
    };
  }

  const { studentId, password } = validateFields.data;

  try {
    await signIn("credentials", {
      studentId,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: error.cause?.err?.message || "Invalid Credentials.",
            type: "error",
          };
        case "CallbackRouteError":
          return {
            error: error.cause?.err?.message || "Invalid Credentials.",
            type: "error",
          };
        default:
          return { error: "Something went wrong.", type: "error" };
      }
    }
    throw error;
  }
}

export async function logout() {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
}
