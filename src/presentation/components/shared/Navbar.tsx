"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Printer, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/presentation/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: "หน้าแรก", href: "/" },
    { name: "บริการของเรา", href: "/services" },
    { name: "ผลงาน", href: "/portfolio" },
    { name: "บทความ", href: "/blog" },
    { name: "เกี่ยวกับเรา", href: "/about" },
    { name: "คำถามที่พบบ่อย", href: "/faq" },
    { name: "ติดต่อเรา", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/75 dark:border-neutral-800/80 dark:bg-black/75 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-neutral-900 dark:text-zinc-100 group">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-black transition-transform group-hover:scale-105">
              <Printer className="w-4 h-4" />
            </div>
            <span>Your Brand</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-neutral-900 dark:hover:text-zinc-100",
                    isActive
                      ? "text-neutral-900 dark:text-zinc-100 font-semibold"
                      : "text-zinc-500 dark:text-zinc-400"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Call-to-action Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              asChild
              className="bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black font-medium h-9.5 px-4 text-sm rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Link href="/contact">
                <span>ขอใบเสนอราคา</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 h-6" /> : <Menu className="h-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-black/95 backdrop-blur-lg animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1.5 px-6 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-zinc-100/70 text-neutral-900 dark:bg-zinc-800/50 dark:text-zinc-100"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-neutral-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 px-3">
              <Button
                asChild
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black font-medium h-10.5 rounded-lg flex items-center justify-center gap-1.5"
              >
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <span>ขอใบเสนอราคา</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
