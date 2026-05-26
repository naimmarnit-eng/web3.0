import * as React from "react";
import Link from "next/link";
import { Printer, BookOpen, FolderOpen, LogOut, ExternalLink, MessageSquare } from "lucide-react";
import { requireAdmin } from "@/infrastructure/auth/require-admin";
import { logoutAction } from "@/presentation/actions/auth.actions";
import { Button } from "@/presentation/components/ui/button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();
  const userName = session?.user?.name || "ผู้ดูแลระบบ";
  const userEmail = session?.user?.email || "admin@example.com";

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
                    แผงควบคุมระบบพิมพ์
                  </span>
                  <span className="text-[10px] text-zinc-400 block -mt-1 font-medium tracking-wider uppercase">
                    Admin Portal
                  </span>
                </div>
              </Link>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-1">
                <Link
                  href="/admin"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-neutral-900 hover:bg-neutral-100 dark:text-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
                >
                  <Printer className="w-4 h-4 text-zinc-500" />
                  แผงควบคุม
                </Link>
                <Link
                  href="/admin/blog"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-neutral-900 hover:bg-neutral-100 dark:text-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-zinc-500" />
                  จัดการบทความ
                </Link>
                <Link
                  href="/admin/portfolio"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-neutral-900 hover:bg-neutral-100 dark:text-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
                >
                  <FolderOpen className="w-4 h-4 text-zinc-500" />
                  จัดการผลงาน
                </Link>
                <Link
                  href="/admin/contacts"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-neutral-900 hover:bg-neutral-100 dark:text-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-zinc-500" />
                  จัดการข้อความ
                </Link>
              </nav>
            </div>

            {/* User Session Info & Action buttons */}
            <div className="flex items-center gap-4">
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
                  <span>ดูหน้าเว็บ</span>
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
                  <span className="hidden sm:inline">ออกจากระบบ</span>
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
