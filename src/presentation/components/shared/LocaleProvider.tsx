"use client";

import * as React from "react";
import { dictionary, type Locale } from "@/shared/locales/dictionary";
import { setLocaleAction } from "@/presentation/actions/locale.actions";
import { useRouter } from "next/navigation";

interface LocaleContextProps {
  locale: Locale;
  t: typeof dictionary.th;
  changeLocale: (lang: Locale) => Promise<void>;
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

  const changeLocale = async (lang: Locale) => {
    setLocale(lang);
    await setLocaleAction(lang);
    router.refresh();
  };

  const t = React.useMemo(() => dictionary[locale] as typeof dictionary.th, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, t, changeLocale }}>
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
