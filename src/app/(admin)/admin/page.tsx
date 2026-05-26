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
} from "lucide-react";

import { requireAdmin } from "@/infrastructure/auth/require-admin";
import { db } from "@/infrastructure/db/client";
import { posts, projects, contacts } from "@/infrastructure/db/schema";
import { Button } from "@/presentation/components/ui/button";

export const metadata: Metadata = {
  title: "แผงควบคุมหลัก (Admin Overview Dashboard)",
  description: "สรุปผลการดำเนินงาน จัดการเนื้อหา และการควบคุมระบบหลังบ้าน",
};

export default async function AdminDashboardPage() {
  const session = await requireAdmin();
  const userName = session?.user?.name || "ผู้ดูแลระบบ";

  // Safe dialect-agnostic count loading
  const allPosts = await db.select().from(posts);
  const totalPosts = allPosts.length;
  const publishedPosts = allPosts.filter((p) => p.status === "PUBLISHED").length;
  const draftPosts = allPosts.filter((p) => p.status === "DRAFT").length;

  const allProjects = await db.select().from(projects);
  const totalProjects = allProjects.length;
  const publishedProjects = allProjects.filter((p) => p.status === "PUBLISHED").length;
  const draftProjects = allProjects.filter((p) => p.status === "DRAFT").length;

  const allInquiries = await db.select().from(contacts);
  const totalInquiries = allInquiries.length;

  // Compute total article views
  const totalPostViews = allPosts.reduce((sum, p) => sum + (p.views || 0), 0);

  // Take the 3 most recent contact inquiries
  const recentInquiries = [...allInquiries]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  // Take the 3 most recent blog posts
  const recentPosts = [...allPosts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Header Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200/60 dark:border-zinc-800/80 bg-linear-to-br from-neutral-900 to-zinc-950 dark:from-zinc-950 dark:to-neutral-900 p-6 sm:p-8 shadow-md">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-zinc-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 shrink-0 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4 text-zinc-500" />
              <span>แผงควบคุมผู้ดูแลระบบ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              สวัสดี, ยินดีต้อนรับกลับ คุณ {userName}!
            </h1>
            <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
              ภาพรวมประสิทธิภาพการเข้าชมและสถิติคลังบทความ ผลงานที่จัดแสดง และความต้องการติดต่อสื่อสารจากลูกค้าของคุณ
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <Button
              asChild
              className="bg-white hover:bg-zinc-100 text-neutral-950 font-bold rounded-lg shadow-sm"
            >
              <Link href="/" target="_blank" className="flex items-center gap-1.5 h-10 px-5">
                <span>เปิดหน้าเว็บไซต์หลัก</span>
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
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">บทความบล็อก</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-zinc-100 tracking-tight block">
                {totalPosts}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center border border-indigo-100/55 dark:border-indigo-900/50">
              <BookOpen className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-zinc-900 flex justify-between items-center text-xs">
            <span className="text-zinc-500 dark:text-zinc-400">
              เผยแพร่แล้ว <strong className="text-neutral-900 dark:text-zinc-200 font-bold">{publishedPosts}</strong> | ฉบับร่าง <strong className="text-neutral-900 dark:text-zinc-200 font-bold">{draftPosts}</strong>
            </span>
            <span className="text-indigo-500 dark:text-indigo-400 font-medium flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              {totalPostViews} views
            </span>
          </div>
        </div>

        {/* Portfolio Metric */}
        <div className="border border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/20 rounded-2xl p-6 shadow-xs relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:scale-110 transition-transform pointer-events-none" />
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">ชิ้นงานผลงาน</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-zinc-100 tracking-tight block">
                {totalProjects}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center border border-emerald-100/55 dark:border-emerald-900/50">
              <FolderOpen className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-zinc-900 flex justify-between items-center text-xs">
            <span className="text-zinc-500 dark:text-zinc-400">
              เผยแพร่แล้ว <strong className="text-neutral-900 dark:text-zinc-200 font-bold">{publishedProjects}</strong> | ฉบับร่าง <strong className="text-neutral-900 dark:text-zinc-200 font-bold">{draftProjects}</strong>
            </span>
            <Link
              href="/admin/portfolio"
              className="text-emerald-500 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-0.5"
            >
              ดูทั้งหมด <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Inquiries Metric */}
        <div className="border border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/20 rounded-2xl p-6 shadow-xs relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:scale-110 transition-transform pointer-events-none" />
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">ข้อความติดต่อ</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-zinc-100 tracking-tight block">
                {totalInquiries}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center border border-amber-100/55 dark:border-amber-900/50">
              <MessageSquare className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-zinc-900 flex justify-between items-center text-xs">
            <span className="text-zinc-500 dark:text-zinc-400">
              ข้อความสะสมทั้งหมด
            </span>
            <Link
              href="/admin/contacts"
              className="text-amber-500 dark:text-amber-400 font-semibold hover:underline flex items-center gap-0.5"
            >
              ตรวจกล่องรับจดหมาย <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Action Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-zinc-100 tracking-tight">
          การดำเนินการด่วน (Quick Actions)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/blog/new"
            className="border border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/10 rounded-xl p-4 flex items-center gap-3.5 hover:border-neutral-400 dark:hover:border-zinc-600 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-neutral-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-black shrink-0">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-neutral-900 dark:text-zinc-100 block group-hover:underline">
                เขียนบทความใหม่
              </span>
              <span className="text-xs text-zinc-400 block mt-0.5">
                เขียนบล็อกและข่าวประชาสัมพันธ์
              </span>
            </div>
          </Link>

          <Link
            href="/admin/portfolio/new"
            className="border border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/10 rounded-xl p-4 flex items-center gap-3.5 hover:border-neutral-400 dark:hover:border-zinc-600 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-neutral-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-black shrink-0">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-neutral-900 dark:text-zinc-100 block group-hover:underline">
                เพิ่มชิ้นงานใหม่
              </span>
              <span className="text-xs text-zinc-400 block mt-0.5">
                อวดโปรเจกต์งานพิมพ์และฝีมือสกรีน
              </span>
            </div>
          </Link>

          <Link
            href="/admin/contacts"
            className="border border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/10 rounded-xl p-4 flex items-center gap-3.5 hover:border-neutral-400 dark:hover:border-zinc-600 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-neutral-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-black shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-neutral-900 dark:text-zinc-100 block group-hover:underline">
                อ่านข้อความลูกค้า
              </span>
              <span className="text-xs text-zinc-400 block mt-0.5">
                ติดต่อประเมินราคาและคุยฝ่ายขาย
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* 4. Recent Activity Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries List */}
        <div className="border border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/20 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-100 dark:border-zinc-900">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-500" />
              <span>ข้อความติดต่อล่าสุด</span>
            </h3>
            <Link
              href="/admin/contacts"
              className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 hover:underline flex items-center gap-0.5"
            >
              ดูทั้งหมด ({totalInquiries}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="py-12 text-center text-xs text-zinc-400 font-medium">
              ยังไม่มีข้อความติดต่อในขณะนี้
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
                      {new Date(inquiry.createdAt).toLocaleDateString("th-TH")}
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

        {/* Recent Blog Posts List */}
        <div className="border border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/20 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-100 dark:border-zinc-900">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>บทความล่าสุด</span>
            </h3>
            <Link
              href="/admin/blog"
              className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 hover:underline flex items-center gap-0.5"
            >
              ดูทั้งหมด ({totalPosts}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <div className="py-12 text-center text-xs text-zinc-400 font-medium">
              ยังไม่มีบทความในขณะนี้
            </div>
          ) : (
            <ul className="space-y-3.5">
              {recentPosts.map((post) => (
                <li
                  key={post.id}
                  className="rounded-xl border border-neutral-100 dark:border-zinc-900 bg-neutral-50/20 dark:bg-zinc-950/10 p-3 flex flex-col gap-1.5"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-neutral-900 dark:text-zinc-100 line-clamp-1 flex-1 pr-4">
                      {post.title}
                    </span>
                    <span className="text-zinc-400 shrink-0 font-mono tracking-tight flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(post.createdAt).toLocaleDateString("th-TH")}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    {post.status === "PUBLISHED" ? (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md font-bold shrink-0">
                        เผยแพร่แล้ว
                      </span>
                    ) : (
                      <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-md font-bold shrink-0">
                        ฉบับร่าง
                      </span>
                    )}
                    {post.category && (
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 line-clamp-1">
                        • {post.category}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
