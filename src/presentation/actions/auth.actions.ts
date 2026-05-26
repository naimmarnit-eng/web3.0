"use server";

import { AuthError } from "next-auth";

import { loginSchema } from "@/application/dto/auth.dto";
import { signIn, signOut } from "@/infrastructure/auth/auth";

export async function loginAction(values: unknown) {
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "ข้อมูลไม่ถูกต้องตามรูปแบบที่กำหนด" };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false, // Prevent NextAuth from doing dynamic edge redirection in action to handle transition gracefully
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
        default:
          return { error: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" };
      }
    }
    // For other unexpected errors, log and return safe response
    console.error("Login action unexpected error:", error);
    return { error: "ระบบขัดข้อง กรุณาลองใหม่อีกครั้ง" };
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}

