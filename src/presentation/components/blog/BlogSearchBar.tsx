"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";

interface BlogSearchBarProps {
  placeholder: string;
  initialValue?: string;
  category?: string;
  searchLabel: string;
}

export function BlogSearchBar({ placeholder, initialValue = "", category = "", searchLabel }: BlogSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [value, setValue] = React.useState(initialValue);

  // Sync state if initialValue changes
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Handle changes with debounce
  React.useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (value === currentSearch) return;

    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set("search", value.trim());
      } else {
        params.delete("search");
      }
      
      const activeCat = searchParams.get("category");
      if (activeCat) {
        params.set("category", activeCat);
      } else if (category) {
        params.set("category", category);
      }

      const queryStr = params.toString();
      const nextUrl = queryStr ? `${pathname}?${queryStr}` : pathname;
      router.push(nextUrl, { scroll: false });
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [value, pathname, router, searchParams, category]);

  const handleClear = () => {
    setValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    const activeCat = searchParams.get("category") || category;
    if (activeCat) {
      params.set("category", activeCat);
    }
    const queryStr = params.toString();
    const nextUrl = queryStr ? `${pathname}?${queryStr}` : pathname;
    router.push(nextUrl, { scroll: false });
  };

  return (
    <div className="relative w-full max-w-xl mx-auto group mt-2">
      {/* Decorative backdrop glow */}
      <div className="absolute inset-0 bg-brand-lime/10 dark:bg-brand-lime/5 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-lime dark:group-focus-within:text-brand-lime/80 transition-colors">
          <Search className="w-4 h-4" />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-24 py-3 h-12 rounded-full border border-brand-forest/10 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime text-brand-forest dark:text-zinc-100 shadow-sm"
        />

        {value ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 hover:text-rose-500 transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-zinc-800 cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-brand-forest/5 dark:bg-zinc-900 border border-brand-forest/10 dark:border-zinc-800 text-[10px] uppercase font-bold px-3 py-1 rounded-full text-brand-forest dark:text-zinc-400 select-none">
            {searchLabel}
          </div>
        )}
      </div>
    </div>
  );
}
