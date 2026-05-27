import * as React from "react";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight, ArrowLeft } from "lucide-react";

import { container } from "@/infrastructure/di/container";
import { Button } from "@/presentation/components/ui/button";
import { Badge } from "@/presentation/components/ui/badge";
import { getLocale, getTranslations } from "@/shared/locales";

interface PageProps {
  params: Promise<{
    tag: string;
  }>;
}

export default async function BlogTagListingPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const locale = await getLocale();
  const t = await getTranslations();

  // Fetch only PUBLISHED posts matching this tag
  const posts = await container.listPostsByTag.execute(decodedTag);

  return (
    <div className="w-full flex flex-col items-center bg-zinc-50/30 dark:bg-zinc-950/20 pb-20">
      {/* 1. Header Hero Banner */}
      <section className="relative w-full py-16 md:py-24 overflow-hidden flex items-center justify-center bg-gradient-to-b from-neutral-100/60 via-white to-transparent dark:from-zinc-900 dark:via-zinc-950 dark:to-transparent border-b border-neutral-100 dark:border-neutral-900/60">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-brand-lime/5 dark:bg-brand-lime/5 rounded-full blur-3xl -z-10" />

        <div className="mx-auto max-w-4xl px-6 text-center space-y-6 relative z-10">
          <Badge
            variant="secondary"
            className="px-3 py-1 bg-brand-lime/10 dark:bg-brand-lime/20 border border-brand-lime/30 text-brand-forest dark:text-brand-lime font-bold rounded-full text-xs"
          >
            {locale === "en" ? "Article Tag" : "แท็กบทความ"}
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-zinc-100 sm:text-5xl leading-tight">
            #{decodedTag}
          </h1>
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {locale === "en" 
              ? `Displaying all articles tagged with #${decodedTag}`
              : `แสดงบทความทั้งหมดที่ติดแท็ก #${decodedTag}`}
          </p>
        </div>
      </section>

      {/* 2. Main Content */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 w-full mt-10 md:mt-16 space-y-8">
        <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-zinc-800/60 pb-6">
          <Button asChild variant="ghost" size="sm" className="rounded-lg text-xs font-bold text-zinc-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-zinc-200">
            <Link href="/blog" className="flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              <span>{locale === "en" ? "Back to All Articles" : "กลับไปหน้าบทความทั้งหมด"}</span>
            </Link>
          </Button>
          <span className="text-xs text-zinc-400 font-semibold">
            {locale === "en" ? `Found ${posts.length} articles` : `พบบทความทั้งหมด ${posts.length} รายการ`}
          </span>
        </div>

        {/* 3. Grid of Posts */}
        {posts.length === 0 ? (
          <div className="py-20 text-center border border-neutral-200/50 dark:border-neutral-800 bg-white/50 dark:bg-black/20 rounded-2xl">
            <BookOpen className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-700" />
            <h3 className="mt-4 text-lg font-bold text-neutral-900 dark:text-zinc-100">
              {locale === "en" ? "No Articles Found" : "ไม่พบข้อมูลบทความ"}
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {locale === "en" ? `There are no articles tagged with #${decodedTag} yet.` : `ขณะนี้ยังไม่มีบทความที่ติดแท็ก #${decodedTag}`}
            </p>
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
                      <Link
                        href={`/blog/category/${encodeURIComponent(post.category)}`}
                        className="absolute top-3 left-3 z-20"
                      >
                        <Badge className="bg-neutral-900/85 backdrop-blur-sm text-white dark:bg-zinc-100/90 dark:text-black border-none font-bold rounded-lg text-[10px] px-2 py-0.5 hover:bg-neutral-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer">
                          {post.category}
                        </Badge>
                      </Link>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString(locale === "en" ? "en-US" : "th-TH", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <h2 className="text-xl font-extrabold text-neutral-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors line-clamp-2 leading-snug">
                      <Link href={`/blog/${post.slug}`}>
                        <span className="absolute inset-0 z-0" />
                        {post.title}
                      </Link>
                    </h2>

                    {post.excerpt && (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Interactive tags listed inside cards */}
                    {(() => {
                      let parsedTags: string[] = [];
                      if (post.tags) {
                        if (Array.isArray(post.tags)) {
                          parsedTags = post.tags;
                        } else if (typeof post.tags === "string") {
                          try {
                            parsedTags = JSON.parse(post.tags);
                          } catch (_) {
                            parsedTags = [];
                          }
                        }
                      }
                      if (!parsedTags || !Array.isArray(parsedTags) || parsedTags.length === 0) return null;
                      return (
                        <div className="flex flex-wrap gap-1.5 pt-2 relative z-10">
                          {parsedTags.map((tag) => (
                            <Link
                              key={tag}
                              href={`/blog/tag/${encodeURIComponent(tag)}`}
                              className="inline-block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 hover:text-brand-lime dark:hover:text-brand-lime hover:underline transition-colors"
                            >
                              #{tag}
                            </Link>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Footer details */}
                <div className="px-6 pb-6 pt-4 border-t border-neutral-100 dark:border-zinc-800/40 flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold text-neutral-900 dark:text-zinc-300 flex items-center gap-1 transition-all">
                    <span>{t.blog.readBlog}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[11px] text-zinc-400 font-medium">
                    {locale === "en" ? "Read" : "อ่าน"} {post.views} {locale === "en" ? "times" : "ครั้ง"}
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
