"use server";

import { cookies } from "next/headers";

export async function setLocaleAction(locale: "th" | "en") {
  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", locale, {
    maxAge: 365 * 24 * 60 * 60, // 1 year
    path: "/",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
