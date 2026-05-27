import { cookies } from "next/headers";
import { dictionary, type Locale } from "./dictionary";

export async function getLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const value = cookieStore.get("NEXT_LOCALE")?.value;
    return value === "en" ? "en" : "th";
  } catch (error) {
    return "th";
  }
}

export async function getTranslations() {
  const locale = await getLocale();
  return dictionary[locale];
}

export { dictionary };
export type { Locale };
