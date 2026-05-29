import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  FolderOpen,
  MessageSquare,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  ExternalLink,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { desc } from "drizzle-orm";

import { requireAdmin } from "@/infrastructure/auth/require-admin";
import { db } from "@/infrastructure/db/client";
import { contacts, posts } from "@/infrastructure/db/schema";
import { container } from "@/infrastructure/di/container";
import { Button } from "@/presentation/components/ui/button";
import { Badge } from "@/presentation/components/ui/badge";
import { OverviewChart } from "@/presentation/components/dashboard/OverviewChart";
import { getLocale, getTranslations } from "@/shared/locales";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components/ui/table";

export const metadata: Metadata = {
  title: "แผงควบคุมหลัก (Admin Overview Dashboard)",
  description: "สรุปผลการดำเนินงาน จัดการเนื้อหา และการควบคุมระบบหลังบ้าน",
};

export default async function AdminDashboardPage() {
  const session = await requireAdmin();
  const userName = session?.user?.name || "ผู้ดูแลระบบ";
  const locale = await getLocale();
  const t = await getTranslations();

  // Load aggregated stats using clean architecture use case
  const stats = await container.getAdminStats.execute();

  // Take the 3 most recent contact inquiries
  const recentInquiries = await db.select()
    .from(contacts)
    .orderBy(desc(contacts.createdAt))
    .limit(3);

  // Take the 3 most recent blog posts
  const recentPosts = await db.select()
    .from(posts)
    .orderBy(desc(posts.createdAt))
    .limit(3);

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* 1. Header Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-brand-forest/10 dark:border-zinc-800/80 bg-linear-to-br from-brand-forest to-brand-forest-dark dark:from-zinc-950 dark:to-neutral-900 p-6 sm:p-8 shadow-sm">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-lime/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 shrink-0 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-lime dark:text-brand-lime/80 text-xs font-bold tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.admin.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.admin.welcome}, {userName}!
            </h1>
            <p className="text-sm text-zinc-300 dark:text-zinc-400 max-w-xl leading-relaxed">
              {t.admin.subtitle}
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <Button
              asChild
              className="bg-brand-lime hover:bg-brand-lime/90 text-brand-forest font-black rounded-xl shadow-xs"
            >
              <Link href="/" target="_blank" className="flex items-center gap-1.5 h-10 px-5">
                <span>{locale === "en" ? "Open Main Website" : "เปิดหน้าเว็บไซต์หลัก"}</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Blog Post Metric */}
        <div className="border border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/20 rounded-2xl p-6 shadow-xs relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:scale-110 transition-transform pointer-events-none" />
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                {locale === "en" ? "Blog Articles" : "บทความบล็อก"}
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-zinc-100 tracking-tight block">
                {stats.totalPosts}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-55/10 dark:bg-indigo-950/30 flex items-center justify-center border border-indigo-100/50 dark:border-indigo-900/50">
              <BookOpen className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-zinc-900 flex justify-between items-center text-xs">
            <span className="text-zinc-500 dark:text-zinc-400">
              {locale === "en" ? "Published" : "เผยแพร่แล้ว"} <strong className="text-neutral-900 dark:text-zinc-200 font-bold">{stats.publishedPosts}</strong> | {locale === "en" ? "Drafts" : "ฉบับร่าง"} <strong className="text-neutral-900 dark:text-zinc-200 font-bold">{stats.draftPosts}</strong>
            </span>
            <span className="text-indigo-500 dark:text-indigo-400 font-bold flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {stats.totalViews} views
            </span>
          </div>
        </div>

        {/* Portfolio Metric */}
        <div className="border border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/20 rounded-2xl p-6 shadow-xs relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:scale-110 transition-transform pointer-events-none" />
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                {locale === "en" ? "Portfolio Projects" : "ชิ้นงานผลงาน"}
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-zinc-100 tracking-tight block">
                {stats.totalProjects}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-55/10 dark:bg-emerald-950/30 flex items-center justify-center border border-emerald-100/50 dark:border-emerald-900/50">
              <FolderOpen className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-zinc-900 flex justify-between items-center text-xs">
            <span className="text-zinc-500 dark:text-zinc-400">
              {locale === "en" ? "Published" : "เผยแพร่แล้ว"} <strong className="text-neutral-900 dark:text-zinc-200 font-bold">{stats.publishedProjects}</strong> | {locale === "en" ? "Drafts" : "ฉบับร่าง"} <strong className="text-neutral-900 dark:text-zinc-200 font-bold">{stats.draftProjects}</strong>
            </span>
            <span className="text-emerald-500 dark:text-emerald-400 font-bold flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {stats.totalProjectViews} views
            </span>
          </div>
        </div>

        {/* Inquiries Metric */}
        <div className="border border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/20 rounded-2xl p-6 shadow-xs relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:scale-110 transition-transform pointer-events-none" />
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                {locale === "en" ? "Customer Inquiries" : "ข้อความติดต่อ"}
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-zinc-100 tracking-tight block">
                {stats.totalContacts}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-55/10 dark:bg-amber-950/30 flex items-center justify-center border border-amber-100/50 dark:border-amber-900/50">
              <MessageSquare className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-zinc-900 flex justify-between items-center text-xs">
            <span className="text-zinc-500 dark:text-zinc-400">
              {locale === "en" ? "Accumulated count" : "ข้อความสะสมทั้งหมด"}
            </span>
            <Link
              href="/admin/contacts"
              className="text-amber-500 dark:text-amber-400 font-bold hover:underline flex items-center gap-0.5"
            >
              {locale === "en" ? "Check Inbox" : "ตรวจกล่องข้อความ"} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Shadcn Interactive Growth Chart */}
      <OverviewChart data={stats.monthlyStats} />

      {/* 4. Action Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-extrabold text-neutral-900 dark:text-zinc-100 tracking-tight">
          {t.admin.quickActions}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/blog/new"
            className="border border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 rounded-xl p-4 flex items-center gap-3.5 hover:border-brand-lime transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-neutral-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-black shrink-0">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-neutral-900 dark:text-zinc-100 block group-hover:underline">
                {t.admin.writePost}
              </span>
              <span className="text-xs text-zinc-400 block mt-0.5">
                {t.admin.writePostDesc}
              </span>
            </div>
          </Link>

          <Link
            href="/admin/portfolio/new"
            className="border border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 rounded-xl p-4 flex items-center gap-3.5 hover:border-brand-lime transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-neutral-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-black shrink-0">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-neutral-900 dark:text-zinc-100 block group-hover:underline">
                {t.admin.addProject}
              </span>
              <span className="text-xs text-zinc-400 block mt-0.5">
                {t.admin.addProjectDesc}
              </span>
            </div>
          </Link>

          <Link
            href="/admin/contacts"
            className="border border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 rounded-xl p-4 flex items-center gap-3.5 hover:border-brand-lime transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-neutral-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-black shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-neutral-900 dark:text-zinc-100 block group-hover:underline">
                {t.admin.readMessages}
              </span>
              <span className="text-xs text-zinc-400 block mt-0.5">
                {t.admin.readMessagesDesc}
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* 5. Top Articles & Activity Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Blog Posts by Views */}
        <div className="lg:col-span-2 border border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/20 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-100 dark:border-zinc-900">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              <span>{t.admin.topPostsTitle}</span>
            </h3>
            <Link
              href="/admin/blog"
              className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 hover:underline"
            >
              {locale === "en" ? "Manage All" : "จัดการทั้งหมด"}
            </Link>
          </div>

          {stats.topPosts.length === 0 ? (
            <div className="py-12 text-center text-xs text-zinc-400 font-medium">
              {locale === "en" ? "No popular articles statistics yet" : "ยังไม่มีสถิติบทความยอดนิยมในขณะนี้"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-neutral-50/50 dark:bg-zinc-950/40">
                  <TableRow className="border-neutral-200 dark:border-neutral-800">
                    <TableHead className="font-bold">{locale === "en" ? "Cover" : "รูปปก"}</TableHead>
                    <TableHead className="font-bold">{locale === "en" ? "Headline" : "หัวข้อบทความ"}</TableHead>
                    <TableHead className="font-bold">{t.common.category}</TableHead>
                    <TableHead className="font-bold text-center">{locale === "en" ? "Total Views" : "ยอดเข้าชม"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.topPosts.map((post) => (
                    <TableRow
                      key={post.id}
                      className="border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50/50 dark:hover:bg-zinc-900/10 transition-colors"
                    >
                      <TableCell className="py-2.5">
                        {post.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-12 h-8 object-cover rounded-md border border-neutral-100 dark:border-zinc-800"
                          />
                        ) : (
                          <div className="w-12 h-8 bg-neutral-100 dark:bg-zinc-800 rounded-md flex items-center justify-center text-zinc-400 text-[10px]">
                            No cover
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-bold py-2.5 max-w-[200px] truncate text-neutral-900 dark:text-zinc-150">
                        {post.title}
                      </TableCell>
                      <TableCell className="py-2.5">
                        {post.category ? (
                          <Badge variant="secondary" className="text-[10px] font-semibold">
                            {post.category}
                          </Badge>
                        ) : (
                          <span className="text-zinc-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center font-extrabold text-brand-forest dark:text-brand-lime py-2.5">
                        {post.views}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Recent Inquiries List */}
        <div className="border border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/20 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-100 dark:border-zinc-900">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-500" />
              <span>{t.admin.recentContacts}</span>
            </h3>
            <Link
              href="/admin/contacts"
              className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 hover:underline"
            >
              {locale === "en" ? "View All" : "ดูทั้งหมด"}
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="py-12 text-center text-xs text-zinc-400 font-medium">
              {t.admin.noRecentContacts}
            </div>
          ) : (
            <ul className="space-y-3.5">
              {recentInquiries.map((inquiry) => (
                <li
                  key={inquiry.id}
                  className="rounded-xl border border-neutral-100 dark:border-zinc-900 bg-neutral-50/20 dark:bg-zinc-950/10 p-3 flex flex-col gap-1.5"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-neutral-900 dark:text-zinc-100">{inquiry.name}</span>
                    <span className="text-zinc-400 font-mono tracking-tight flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(inquiry.createdAt).toLocaleDateString(locale === "en" ? "en-US" : "th-TH")}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 leading-relaxed">
                    {inquiry.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
