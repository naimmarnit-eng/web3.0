import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Calendar, Eye, ArrowLeft, User, MessageSquare, BookOpen } from "lucide-react";

import { container } from "@/infrastructure/di/container";
import { sanitize } from "@/shared/utils/sanitize";
import { Button } from "@/presentation/components/ui/button";
import { Badge } from "@/presentation/components/ui/badge";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await container.getPostBySlug.execute(decodedSlug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt || "อ่านบทความสาระความรู้เกี่ยวกับเทคโนโลยีการพิมพ์สกรีนและสื่อสิ่งพิมพ์",
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PublicPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // Fetch the current post (automatically increments views inside our use case!)
  const post = await container.getPostBySlug.execute(decodedSlug);

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  // Fetch other related articles for recommendations
  const allPosts = await container.listPosts.execute({
    status: "PUBLISHED",
    page: 1,
    limit: 4,
  });
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  // Sanitized content
  const cleanHtml = sanitize(post.content);

  // SEO structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.coverImage || "",
    "datePublished": post.publishedAt || post.createdAt,
    "dateModified": post.updatedAt,
    "description": post.excerpt || "",
    "author": {
      "@type": "Organization",
      "name": "บริการงานพิมพ์ครบวงจร",
    },
  };

  return (
    <div className="w-full flex flex-col items-center bg-zinc-50/20 dark:bg-zinc-950/20 pb-20 font-sans">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full mt-8 space-y-8">
        {/* 1. Breadcrumbs & Back Button */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-neutral-900 dark:hover:text-zinc-200">หน้าแรก</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-neutral-900 dark:hover:text-zinc-200">บทความ</Link>
          <span>/</span>
          <span className="text-zinc-500 dark:text-zinc-400 line-clamp-1">{post.title}</span>
        </div>

        {/* 2. Article Header */}
        <div className="space-y-4">
          {post.category && (
            <Badge className="bg-neutral-950 text-white dark:bg-zinc-100 dark:text-black border-none font-bold rounded-lg px-2.5 py-1 text-xs">
              {post.category}
            </Badge>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-zinc-100 tracking-tight leading-tight sm:leading-snug">
            {post.title}
          </h1>

          {/* Metadata banner */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 border-y border-neutral-200/60 dark:border-zinc-800/60 py-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-zinc-400" />
              <span>
                {new Date(post.createdAt).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-zinc-400" />
              <span>ผู้เชี่ยวชาญด้านงานพิมพ์</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-zinc-400" />
              <span>อ่าน {post.views} ครั้ง</span>
            </div>
          </div>
        </div>

        {/* 3. Hero Cover Image */}
        {post.coverImage && (
          <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-zinc-900 rounded-2xl border border-neutral-200/50 dark:border-zinc-800/80 shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* 4. Article content body with premium typography styling */}
        <article className="bg-white dark:bg-black border border-neutral-200/50 dark:border-zinc-800/80 rounded-2xl p-6 md:p-10 shadow-sm">
          {post.excerpt && (
            <div className="border-l-4 border-neutral-900 dark:border-zinc-200 pl-4 py-1.5 text-zinc-600 dark:text-zinc-400 italic text-base leading-relaxed mb-8 bg-neutral-50/50 dark:bg-zinc-950/20 rounded-r-lg pr-4">
              {post.excerpt}
            </div>
          )}

          {/* Elegant Custom Typography Styles injected inline */}
          <div
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
            className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed text-neutral-800 dark:text-zinc-300 space-y-6 
              [&>h2]:text-2xl [&>h2]:font-extrabold [&>h2]:text-neutral-900 [&>h2]:dark:text-zinc-100 [&>h2]:pt-6 [&>h2]:pb-2 [&>h2]:border-b [&>h2]:border-neutral-100 [&>h2]:dark:border-zinc-800/60
              [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-neutral-900 [&>h3]:dark:text-zinc-100 [&>h3]:pt-4 [&>h3]:pb-1
              [&>p]:text-base [&>p]:leading-relaxed [&>p]:text-zinc-600 [&>p]:dark:text-zinc-400
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul>li]:text-zinc-600 [&>ul>li]:dark:text-zinc-400
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol>li]:text-zinc-600 [&>ol>li]:dark:text-zinc-400
              [&>blockquote]:border-l-4 [&>blockquote]:border-zinc-300 [&>blockquote]:dark:border-zinc-700 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-zinc-500 [&>blockquote]:dark:text-zinc-400
              [&>pre]:bg-neutral-50 [&>pre]:dark:bg-zinc-900 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:border [&>pre]:border-neutral-200 [&>pre]:dark:border-neutral-800 [&>pre>code]:font-mono [&>pre>code]:text-sm
              [&>table]:w-full [&>table]:border-collapse [&>table]:border [&>table]:border-neutral-200 [&>table]:dark:border-neutral-800 [&>table_th]:bg-neutral-50 [&>table_th]:dark:bg-zinc-900 [&>table_th]:p-3 [&>table_th]:border [&>table_th]:border-neutral-200 [&>table_th]:dark:border-neutral-800 [&>table_th]:font-bold [&>table_th]:text-sm
              [&>table_td]:p-3 [&>table_td]:border [&>table_td]:border-neutral-200 [&>table_td]:dark:border-neutral-800 [&>table_td]:text-sm [&>table_td]:text-zinc-600 [&>table_td]:dark:text-zinc-400"
          />
        </article>

        {/* 5. Contact / CTA Banner */}
        <div className="bg-neutral-900 dark:bg-zinc-950 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-transparent to-transparent opacity-40 dark:from-zinc-900" />
          <div className="space-y-2 text-center md:text-left relative z-10">
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
              สนใจผลิตงานพิมพ์สกรีน หรือออกแบบสิ่งพิมพ์?
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-xl">
              ปรึกษาฝ่ายผลิตและออกแบบของเราได้ฟรี พร้อมประเมินราคาและขึ้นโครงสร้างตัวอย่างฟรี ไม่มีค่าใช้จ่ายแอบแฝง
            </p>
          </div>
          <Button
            asChild
            className="bg-white hover:bg-neutral-100 text-neutral-900 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black font-bold px-6 py-5 rounded-xl shadow-md shrink-0 flex items-center gap-1.5 relative z-10"
          >
            <Link href="/contact">
              <MessageSquare className="w-4 h-4" />
              <span>ติดต่อสอบถามฟรี</span>
            </Link>
          </Button>
        </div>

        {/* 6. Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6 pt-6">
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-zinc-100 tracking-tight">
              บทความอื่นๆ ที่เกี่ยวข้อง
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`/blog/${rPost.slug}`}
                  className="group flex flex-col bg-white dark:bg-black border border-neutral-200/50 dark:border-zinc-800/80 hover:border-neutral-300 dark:hover:border-zinc-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-zinc-900 relative">
                    {rPost.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={rPost.coverImage}
                        alt={rPost.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-zinc-300 dark:text-zinc-700">
                        <BookOpen className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <h4 className="font-extrabold text-neutral-900 dark:text-zinc-100 text-sm group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors line-clamp-2 leading-snug">
                      {rPost.title}
                    </h4>
                    <span className="text-[11px] text-zinc-400 mt-2 block">
                      {new Date(rPost.createdAt).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="pt-6 text-center">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-zinc-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-lg"
          >
            <Link href="/blog" className="flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              <span>กลับสู่หน้าหลักบทความ</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
