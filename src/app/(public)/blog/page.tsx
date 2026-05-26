import * as React from "react";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight, Search } from "lucide-react";

import { container } from "@/infrastructure/di/container";
import { Input } from "@/presentation/components/ui/input";
import { Button } from "@/presentation/components/ui/button";
import { Badge } from "@/presentation/components/ui/badge";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}

export default async function PublicBlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const category = params.category || "";

  // Fetch only PUBLISHED posts
  const posts = await container.listPosts.execute({
    status: "PUBLISHED",
    search,
    category,
    page: 1,
    limit: 50,
  });

  // Extract all categories to show quick filter tags
  const allPosts = await container.listPosts.execute({
    status: "PUBLISHED",
    page: 1,
    limit: 50,
  });
  const uniqueCategories = Array.from(
    new Set(allPosts.map((p) => p.category).filter(Boolean))
  ) as string[];

  return (
    <div className="w-full flex flex-col items-center bg-zinc-50/30 dark:bg-zinc-950/20 pb-20">
      {/* 1. Header Hero Banner */}
      <section className="relative w-full py-16 md:py-24 overflow-hidden flex items-center justify-center bg-gradient-to-b from-neutral-100/60 via-white to-transparent dark:from-zinc-900 dark:via-zinc-950 dark:to-transparent border-b border-neutral-100 dark:border-neutral-900/60">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-neutral-300/10 dark:bg-zinc-800/10 rounded-full blur-3xl -z-10" />

        <div className="mx-auto max-w-4xl px-6 text-center space-y-6 relative z-10">
          <Badge
            variant="secondary"
            className="px-3 py-1 bg-neutral-900/5 dark:bg-zinc-100/5 border border-neutral-200/50 dark:border-neutral-800/50 text-neutral-800 dark:text-zinc-300 font-semibold rounded-full text-xs"
          >
            บล็อก & สาระน่ารู้
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-zinc-100 sm:text-5xl leading-tight">
            บทความความรู้ด้านงานพิมพ์และสกรีนเสื้อ
          </h1>
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            รวบรวมเทคนิค เคล็ดลับ และเทคโนโลยีงานพิมพ์สกรีนเสื้อ บรรจุภัณฑ์ และสื่อการตลาดยุคใหม่ เพื่อสร้างภาพลักษณ์ระดับพรีเมียมให้ธุรกิจคุณ
          </p>
        </div>
      </section>

      {/* 2. Main Content & Search Filters */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 w-full mt-10 md:mt-16 space-y-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-neutral-200/60 dark:border-zinc-800/60 pb-6">
          {/* Quick Categories filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <Button
              asChild
              variant={!category ? "default" : "outline"}
              size="sm"
              className="rounded-full font-bold text-xs h-8"
            >
              <Link href="/blog">ทั้งหมด</Link>
            </Button>
            {uniqueCategories.map((cat) => (
              <Button
                key={cat}
                asChild
                variant={category === cat ? "default" : "outline"}
                size="sm"
                className="rounded-full font-bold text-xs h-8 whitespace-nowrap"
              >
                <Link href={`/blog?category=${encodeURIComponent(cat)}`}>
                  {cat}
                </Link>
              </Button>
            ))}
          </div>

          {/* Search bar */}
          <form method="GET" className="flex items-center gap-2 w-full md:w-80">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <Input
                name="search"
                placeholder="ค้นหาบทความ..."
                defaultValue={search}
                className="pl-9 h-9 bg-white dark:bg-black/50 border-neutral-200 dark:border-neutral-800/80 rounded-lg text-xs focus-visible:ring-1 focus-visible:ring-neutral-400"
              />
              {category && <input type="hidden" name="category" value={category} />}
            </div>
            <Button
              type="submit"
              size="sm"
              className="h-9 px-3 bg-neutral-900 text-white dark:bg-zinc-100 dark:text-black rounded-lg text-xs"
            >
              ค้นหา
            </Button>
          </form>
        </div>

        {/* 3. Grid of Posts */}
        {posts.length === 0 ? (
          <div className="py-20 text-center border border-neutral-200/50 dark:border-neutral-800 bg-white/50 dark:bg-black/20 rounded-2xl">
            <BookOpen className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-700" />
            <h3 className="mt-4 text-lg font-bold text-neutral-900 dark:text-zinc-100">
              ไม่พบข้อมูลบทความ
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {search || category ? "กรุณาลองระบุคำค้นหาหรือตัวกรองอื่น" : "ขณะนี้ยังไม่มีบทความที่เผยแพร่"}
            </p>
            {(search || category) && (
              <div className="mt-6">
                <Button asChild variant="outline" size="sm" className="rounded-lg">
                  <Link href="/blog">ดูบทความทั้งหมด</Link>
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group relative flex flex-col justify-between overflow-hidden border border-neutral-200/60 hover:border-neutral-300 dark:border-zinc-800/80 dark:hover:border-zinc-700 bg-white dark:bg-black rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* Thumbnail Cover Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-zinc-900">
                    {post.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-zinc-300 dark:text-zinc-700">
                        <BookOpen className="w-12 h-12" />
                      </div>
                    )}
                    {post.category && (
                      <Badge className="absolute top-3 left-3 bg-neutral-900/85 backdrop-blur-sm text-white dark:bg-zinc-100/90 dark:text-black border-none font-bold rounded-lg text-[10px] px-2 py-0.5 z-10">
                        {post.category}
                      </Badge>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(post.createdAt).toLocaleDateString("th-TH", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <h2 className="text-xl font-extrabold text-neutral-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors line-clamp-2 leading-snug">
                      <Link href={`/blog/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h2>

                    {post.excerpt && (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer details */}
                <div className="px-6 pb-6 pt-4 border-t border-neutral-100 dark:border-zinc-800/40 flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold text-neutral-900 dark:text-zinc-300 flex items-center gap-1 transition-all">
                    <span>อ่านต่อบทความ</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[11px] text-zinc-400 font-medium">
                    อ่าน {post.views} ครั้ง
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
