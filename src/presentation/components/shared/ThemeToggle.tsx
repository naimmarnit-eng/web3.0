"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [mounted, setMounted] = React.useState(false);

  // Read theme from document class on mount (client-side only)
  React.useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  // Prevent layout shift/flash by rendering a skeleton placeholder of exact same dimensions during SSR/hydration
  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-brand-forest/5 border border-brand-forest/10 dark:bg-zinc-900/50 dark:border-zinc-800" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-full bg-brand-forest/5 text-brand-forest hover:bg-brand-forest/10 border border-brand-forest/10 dark:bg-zinc-900/50 dark:text-brand-lime dark:hover:bg-zinc-900 dark:border-zinc-800 flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-95 group focus:outline-none hover:shadow-sm"
      aria-label="Toggle theme"
    >
      <div className="relative w-5.5 h-5.5 flex items-center justify-center overflow-hidden">
        {theme === "dark" ? (
          <Sun className="w-5.5 h-5.5 transform rotate-0 scale-100 transition-all duration-500 ease-out text-brand-lime group-hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 transform rotate-0 scale-100 transition-all duration-500 ease-out text-brand-forest group-hover:-rotate-12 group-hover:scale-105" />
        )}
      </div>
    </button>
  );
}
