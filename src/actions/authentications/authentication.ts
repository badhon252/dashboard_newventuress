"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function SignInWithEmailAndPassword(data: any) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/",
    });

    return { success: true, message: "Login successful." };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };

        default:
          return {
            message: "Something went wrong.",
          };
      }
    }
    throw error;
  }
}
