"use client";

import * as React from "react";
import { dictionary, type Locale } from "@/shared/locales/dictionary";
import { setLocaleAction } from "@/presentation/actions/locale.actions";
import { useRouter } from "next/navigation";

interface LocaleContextProps {
  locale: Locale;
  t: typeof dictionary.th;
  changeLocale: (lang: Locale) => Promise<void>;
  l: (path: string) => string; // Link helper to automatically prefix paths for English support
}

const LocaleContext = React.createContext<LocaleContextProps | null>(null);

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocale] = React.useState<Locale>(initialLocale);
  const router = useRouter();

  // Redirect to English prefixed URL (/en/...) or default Thai URL on language switch
  const changeLocale = async (lang: Locale) => {
    setLocale(lang);
    await setLocaleAction(lang);

    const pathname = window.location.pathname;
    const search = window.location.search;

    if (lang === "en") {
      if (!pathname.startsWith("/en/") && pathname !== "/en") {
        const newPath = `/en${pathname === "/" ? "" : pathname}${search}`;
        router.push(newPath);
      } else {
        router.refresh();
      }
    } else {
      if (pathname.startsWith("/en")) {
        let newPath = pathname.replace(/^\/en/, "");
        if (newPath === "") {
          newPath = "/";
        }
        router.push(`${newPath}${search}`);
      } else {
        router.refresh();
      }
    }
  };

  // Memoized link prefix helper to automatically add '/en' prefix for English users
  const l = React.useCallback((path: string) => {
    if (!path) return "";
    
    // Skip prefixing for external links, admin routes, logins, or already-prefixed paths
    if (
      path.startsWith("http") ||
      path.startsWith("mailto") ||
      path.startsWith("tel") ||
      path.startsWith("/en/") ||
      path === "/en" ||
      path.startsWith("/admin") ||
      path === "/login"
    ) {
      return path;
    }

    if (locale === "en") {
      return `/en${path === "/" ? "" : path}`;
    }
    return path;
  }, [locale]);

  const t = React.useMemo(() => dictionary[locale] as typeof dictionary.th, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, t, changeLocale, l }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = React.useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
