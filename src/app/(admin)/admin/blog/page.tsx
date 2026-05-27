import * as React from "react";
import Link from "next/link";
import { Plus, Search, Eye, Calendar, BookOpen, Tag } from "lucide-react";

import { container } from "@/infrastructure/di/container";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Badge } from "@/presentation/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components/ui/table";
import { RowActions } from "./_components/RowActions";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    status?: "DRAFT" | "PUBLISHED";
  }>;
}

export default async function AdminBlogDashboard({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const category = params.category || "";
  const status = params.status || undefined;

  // Fetch posts from DI container
  const posts = await container.listPosts.execute({
    search,
    category,
    status,
    page: 1,
    limit: 50, // Show up to 50 posts in admin list (max limit)
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-zinc-100 tracking-tight">
            จัดการบทความ (Blog Management)
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            สร้าง แก้ไข และบริหารจัดการบทความและข่าวสารสำหรับธุรกิจของคุณ
          </p>
        </div>
        <Button
          asChild
          className="bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black font-semibold rounded-lg shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Link href="/admin/blog/new">
            <Plus className="w-4.5 h-4.5" />
            <span>เขียนบทความใหม่</span>
          </Link>
        </Button>
      </div>

      {/* Filter and search bar */}
      <div className="bg-white dark:bg-zinc-900/40 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4">
        <form method="GET" className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
            <Input
              name="search"
              placeholder="ค้นหาตามหัวข้อบทความ..."
              defaultValue={search}
              className="pl-9 h-10 bg-neutral-50 dark:bg-zinc-950 border-neutral-200 dark:border-neutral-800 focus-visible:ring-1 focus-visible:ring-neutral-400"
            />
          </div>
          <div className="relative w-full sm:w-48">
            <Input
              name="category"
              placeholder="หมวดหมู่..."
              defaultValue={category}
              className="h-10 bg-neutral-50 dark:bg-zinc-950 border-neutral-200 dark:border-neutral-800 focus-visible:ring-1 focus-visible:ring-neutral-400"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              type="submit"
              className="flex-1 sm:flex-initial h-10 px-4 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black font-medium rounded-lg"
            >
              ค้นหา
            </Button>
            {(search || category) && (
              <Button
                asChild
                variant="outline"
                className="h-10 px-4 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-zinc-800"
              >
                <Link href="/admin/blog">ล้างค่า</Link>
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Table listing */}
      <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-zinc-900/20 rounded-xl overflow-hidden shadow-sm">
        {posts.length === 0 ? (
          <div className="py-16 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-700" />
            <h3 className="mt-4 text-sm font-semibold text-neutral-900 dark:text-zinc-100">
              ไม่พบข้อมูลบทความ
            </h3>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              เริ่มต้นเขียนบทความเพื่อเพิ่มเนื้อหาในหน้าเว็บไซต์ของคุณ
            </p>
            <div className="mt-6">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-neutral-300 dark:border-neutral-800 rounded-lg"
              >
                <Link href="/admin/blog/new">เขียนบทความชิ้นแรก</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-neutral-50/50 dark:bg-zinc-950/40">
                <TableRow className="border-neutral-200 dark:border-neutral-800">
                  <TableHead className="w-[100px] font-bold">รูปหน้าปก</TableHead>
                  <TableHead className="font-bold">หัวข้อ</TableHead>
                  <TableHead className="font-bold">หมวดหมู่</TableHead>
                  <TableHead className="font-bold">สถานะ</TableHead>
                  <TableHead className="font-bold text-center">ยอดเข้าชม</TableHead>
                  <TableHead className="font-bold">วันที่สร้าง</TableHead>
                  <TableHead className="font-bold text-right">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow
                    key={post.id}
                    className="border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50/50 dark:hover:bg-zinc-900/10 transition-colors"
                  >
                    <TableCell className="align-middle">
                      {post.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-16 h-10 object-cover rounded-md border border-neutral-200 dark:border-neutral-800 shadow-sm"
                        />
                      ) : (
                        <div className="w-16 h-10 bg-neutral-100 dark:bg-zinc-800 rounded-md flex items-center justify-center text-zinc-400 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                          <BookOpen className="w-4.5 h-4.5" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium align-middle">
                      <div className="flex flex-col gap-0.5 max-w-[300px] sm:max-w-md">
                        <span className="text-neutral-900 dark:text-zinc-100 font-bold line-clamp-1">
                          {post.title}
                        </span>
                        <span className="text-[11px] text-zinc-400 font-mono tracking-tight line-clamp-1">
                          {post.slug}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="align-middle">
                      {post.category ? (
                        <Badge
                          variant="secondary"
                          className="bg-neutral-100 text-neutral-800 dark:bg-zinc-800 dark:text-zinc-300 border-none font-semibold rounded-md flex items-center gap-1 w-fit"
                        >
                          <Tag className="w-3 h-3 text-zinc-400" />
                          {post.category}
                        </Badge>
                      ) : (
                        <span className="text-xs text-zinc-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="align-middle">
                      {post.status === "PUBLISHED" ? (
                        post.publishedAt && new Date(post.publishedAt) > new Date() ? (
                          <Badge className="bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/15 dark:bg-indigo-500/10 dark:text-indigo-400 border-none font-bold rounded-md flex items-center gap-1.5 w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shrink-0" />
                            <span>ตั้งเวลาเผยแพร่</span>
                          </Badge>
                        ) : (
                          <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/15 dark:bg-emerald-500/10 dark:text-emerald-400 border-none font-bold rounded-md">
                            เผยแพร่แล้ว
                          </Badge>
                        )
                      ) : (
                        <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/15 dark:bg-amber-500/10 dark:text-amber-400 border-none font-bold rounded-md">
                          ฉบับร่าง
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center align-middle font-semibold text-zinc-600 dark:text-zinc-300">
                      <div className="flex items-center justify-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{post.views}</span>
                      </div>
                    </TableCell>
                    <TableCell className="align-middle text-zinc-500 dark:text-zinc-400 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        <span>
                          {new Date(post.createdAt).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right align-middle">
                      <div className="flex justify-end">
                        <RowActions id={post.id} title={post.title} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
