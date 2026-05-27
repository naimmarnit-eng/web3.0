"use client";

import * as React from "react";
import { useLocale } from "./LocaleProvider";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { locale, changeLocale } = useLocale();

  return (
    <div className="flex items-center bg-brand-forest/5 dark:bg-zinc-900/50 p-0.5 rounded-full border border-brand-forest/5 dark:border-zinc-800/50">
      <button
        type="button"
        onClick={() => changeLocale("th")}
        className={cn(
          "px-2.5 py-0.8 text-[9px] font-black tracking-wider rounded-full transition-all cursor-pointer outline-none select-none",
          locale === "th"
            ? "bg-brand-forest text-white dark:bg-brand-lime dark:text-brand-forest shadow-sm scale-102"
            : "text-brand-forest/60 dark:text-zinc-400 hover:text-brand-forest dark:hover:text-zinc-200"
        )}
      >
        TH
      </button>
      <button
        type="button"
        onClick={() => changeLocale("en")}
        className={cn(
          "px-2.5 py-0.8 text-[9px] font-black tracking-wider rounded-full transition-all cursor-pointer outline-none select-none",
          locale === "en"
            ? "bg-brand-forest text-white dark:bg-brand-lime dark:text-brand-forest shadow-sm scale-102"
            : "text-brand-forest/60 dark:text-zinc-400 hover:text-brand-forest dark:hover:text-zinc-200"
        )}
      >
        EN
      </button>
    </div>
  );
}
