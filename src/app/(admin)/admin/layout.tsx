import * as React from "react";
import Link from "next/link";
import { Printer, BookOpen, FolderOpen, LogOut, ExternalLink, MessageSquare } from "lucide-react";
import { requireAdmin } from "@/infrastructure/auth/require-admin";
import { logoutAction } from "@/presentation/actions/auth.actions";
import { Button } from "@/presentation/components/ui/button";
import { container } from "@/infrastructure/di/container";
import { ThemeToggle } from "@/presentation/components/shared/ThemeToggle";
import { LanguageToggle } from "@/presentation/components/shared/LanguageToggle";
import { getLocale, getTranslations } from "@/shared/locales";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();
  const userName = session?.user?.name || "ผู้ดูแลระบบ";
  const userEmail = session?.user?.email || "admin@example.com";
  const locale = await getLocale();
  const t = await getTranslations();

  // Fetch inquiries count dynamically for unread real-time notifications
  const inquiries = await container.listInquiries.execute();
  const newInquiriesCount = inquiries.filter((inquiry) => !inquiry.isRead).length;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-zinc-950 flex flex-col font-sans">
      {/* Premium Admin Header */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 dark:bg-zinc-900/85 backdrop-blur-md dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-black shadow-sm group-hover:scale-105 transition-transform">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-neutral-900 dark:text-zinc-100 tracking-tight text-base block">
                    {locale === "en" ? "Print Console" : "แผงควบคุมระบบพิมพ์"}
                  </span>
                  <span className="text-[10px] text-zinc-400 block -mt-1 font-medium tracking-wider uppercase">
                    Admin Portal
                  </span>
                </div>
              </Link>

              {/* Navigation Links with clear borders to differentiate tab areas */}
              <nav className="hidden md:flex items-center gap-2">
                <Link
                  href="/admin"
                  className="px-3.5 py-1.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 hover:bg-neutral-100 dark:bg-zinc-900/30 dark:hover:bg-zinc-900 rounded-lg text-xs font-semibold text-neutral-900 dark:text-zinc-200 transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4 text-zinc-500" />
                  {t.nav.dashboard}
                </Link>
                <Link
                  href="/admin/blog"
                  className="px-3.5 py-1.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 hover:bg-neutral-100 dark:bg-zinc-900/30 dark:hover:bg-zinc-900 rounded-lg text-xs font-semibold text-neutral-900 dark:text-zinc-200 transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4 text-zinc-500" />
                  {t.nav.manageBlogs}
                </Link>
                <Link
                  href="/admin/portfolio"
                  className="px-3.5 py-1.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 hover:bg-neutral-100 dark:bg-zinc-900/30 dark:hover:bg-zinc-900 rounded-lg text-xs font-semibold text-neutral-900 dark:text-zinc-200 transition-colors flex items-center gap-1.5"
                >
                  <FolderOpen className="w-4 h-4 text-zinc-500" />
                  {t.nav.managePortfolio}
                </Link>
                <Link
                  href="/admin/contacts"
                  className="px-3.5 py-1.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 hover:bg-neutral-100 dark:bg-zinc-900/30 dark:hover:bg-zinc-900 rounded-lg text-xs font-semibold text-neutral-900 dark:text-zinc-200 transition-colors flex items-center gap-1.5 relative group"
                >
                  <MessageSquare className="w-4 h-4 text-zinc-500" />
                  <span>{t.nav.manageMessages}</span>
                  {newInquiriesCount > 0 && (
                    <span className="bg-red-500 text-white rounded-full px-1.5 py-0.5 text-[8px] font-extrabold flex items-center justify-center min-w-[16px] h-[16px] animate-pulse">
                      {newInquiriesCount}
                    </span>
                  )}
                </Link>
              </nav>
            </div>

            {/* User Session Info & Action buttons */}
            <div className="flex items-center gap-4">
              {/* Dynamic Language Mode Toggle & Theme Mode */}
              <LanguageToggle />
              <ThemeToggle />

              <div className="w-px h-6 bg-neutral-200 dark:bg-zinc-800" />

              <div className="hidden lg:flex flex-col text-right">
                <span className="text-sm font-bold text-neutral-900 dark:text-zinc-100 leading-tight">
                  {userName}
                </span>
                <span className="text-xs text-zinc-400">
                  {userEmail}
                </span>
              </div>

              <div className="w-px h-6 bg-neutral-200 dark:bg-zinc-800 hidden lg:block" />

              <Button
                asChild
                variant="outline"
                size="sm"
                className="hidden sm:flex border-neutral-300 dark:border-neutral-800 gap-1.5 h-9 rounded-lg"
              >
                <Link href="/" target="_blank">
                  <span>{locale === "en" ? "View Site" : "ดูหน้าเว็บ"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </Button>

              <form action={logoutAction}>
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="h-9 px-3 text-zinc-500 hover:text-destructive dark:text-zinc-400 dark:hover:text-red-400 rounded-lg flex items-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.nav.logout}</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
