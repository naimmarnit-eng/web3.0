"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Printer, ArrowRight, ArrowUpRight } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b border-brand-forest/5 bg-brand-cream/80 dark:bg-brand-forest-dark/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with clean corporate style */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-brand-forest dark:text-zinc-100 group">
            <div className="w-8.5 h-8.5 rounded-xl bg-brand-forest dark:bg-brand-lime flex items-center justify-center text-white dark:text-brand-forest shadow-sm transition-transform group-hover:scale-105">
              <Printer className="w-4.5 h-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base leading-none block">Your Brand</span>
              <span className="text-[9px] text-zinc-400 block mt-0.5 font-bold tracking-widest uppercase">Finishing</span>
            </div>
          </Link>

          {/* Desktop Nav Links (Screenshot 1-3 style) */}
          <nav className="hidden md:flex items-center gap-7">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-xs font-bold uppercase tracking-wider transition-colors hover:text-brand-lime dark:hover:text-brand-lime",
                    isActive
                      ? "text-brand-forest dark:text-zinc-100 font-extrabold border-b-2 border-brand-lime pb-1"
                      : "text-brand-forest/60 dark:text-zinc-400"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Call-to-action Button with Circular Arrow */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-4.5 py-2 bg-brand-forest hover:bg-brand-forest-dark text-white dark:bg-brand-lime dark:text-brand-forest dark:hover:bg-brand-lime-hover font-bold text-xs rounded-full shadow-sm group transition-all cursor-pointer"
            >
              <span>ขอเสนอราคา</span>
              <div className="w-5.5 h-5.5 rounded-full bg-brand-lime text-brand-forest dark:bg-brand-forest dark:text-brand-lime flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-brand-forest dark:text-zinc-400 hover:text-brand-lime transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-brand-forest/5 bg-brand-cream/95 dark:bg-brand-forest-dark/95 backdrop-blur-lg animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1.5 px-6 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 text-sm font-bold uppercase tracking-wider rounded-lg transition-colors",
                    isActive
                      ? "bg-brand-forest/5 text-brand-forest dark:bg-zinc-800/50 dark:text-zinc-100"
                      : "text-brand-forest/70 hover:bg-brand-forest/5 hover:text-brand-forest dark:text-zinc-400 dark:hover:bg-zinc-900"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-brand-forest/5 px-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2.5 px-4.5 py-3 bg-brand-forest text-white dark:bg-brand-lime dark:text-brand-forest font-bold text-sm rounded-full shadow-sm cursor-pointer"
              >
                <span>ขอใบเสนอราคา</span>
                <div className="w-5.5 h-5.5 rounded-full bg-brand-lime text-brand-forest dark:bg-brand-forest dark:text-brand-lime flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
