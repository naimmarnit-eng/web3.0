import * as React from "react";
import Link from "next/link";
import { FolderOpen, Briefcase, Calendar, ArrowRight, X } from "lucide-react";

import { container } from "@/infrastructure/di/container";
import { Badge } from "@/presentation/components/ui/badge";
import { Button } from "@/presentation/components/ui/button";
import { getLocale, getTranslations } from "@/shared/locales";

interface PageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

export default async function PublicPortfolioPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category || "";
  const search = params.search || "";
  const locale = await getLocale();
  const t = await getTranslations();

  // Fetch only PUBLISHED projects filtering by category and search dynamically
  const projects = await container.listProjects.execute({
    status: "PUBLISHED",
    category: category || undefined,
    search: search || undefined,
    page: 1,
    limit: 50,
  });

  // Extract all categories under PUBLISHED status to show dynamic filter tabs
  const allProjects = await container.listProjects.execute({ status: "PUBLISHED", page: 1, limit: 100 });
  const uniqueCategories = Array.from(
    new Set(allProjects.map((p) => p.category).filter(Boolean))
  ) as string[];

  return (
    <div className="w-full flex flex-col items-center bg-brand-cream/40 dark:bg-brand-forest-dark/10 transition-colors duration-300 pb-20">
      {/* 1. Header Hero Banner with Integrated Search Input Form */}
      <section className="relative w-full py-16 md:py-24 overflow-hidden flex items-center justify-center bg-gradient-to-b from-neutral-100/60 via-white to-transparent dark:from-zinc-900 dark:via-zinc-950 dark:to-transparent border-b border-neutral-100 dark:border-neutral-900/60">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-brand-lime/10 dark:bg-brand-lime/5 rounded-full blur-3xl -z-10" />

        <div className="mx-auto max-w-4xl px-6 text-center space-y-6 relative z-10 w-full flex flex-col items-center">
          <Badge
            variant="secondary"
            className="px-3 py-1 bg-brand-forest/5 dark:bg-brand-lime/10 border border-brand-forest/10 dark:border-brand-lime/20 text-brand-forest dark:text-brand-lime font-bold rounded-full text-xs"
          >
            {t.portfolio.badge}
          </Badge>
          
          <h1 className="text-3xl font-extrabold tracking-tight text-brand-forest dark:text-zinc-150 sm:text-5xl leading-tight">
            {t.portfolio.title}
          </h1>
          
          <p className="text-base md:text-lg text-brand-forest/80 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {t.portfolio.description}
          </p>

          {/* Premium Search form */}
          <form action="/portfolio" method="GET" className="relative w-full max-w-xl mx-auto mt-2">
            {category && <input type="hidden" name="category" value={category} />}
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder={t.portfolio.searchPlaceholder}
              className="w-full pl-11 pr-24 py-3 rounded-full border border-brand-forest/10 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime text-brand-forest dark:text-zinc-100 shadow-sm"
            />
            {/* Search Icon */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {/* Search Button */}
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-brand-forest hover:bg-brand-forest-dark text-white dark:bg-brand-lime dark:text-brand-forest dark:hover:bg-brand-lime-hover text-xs font-bold px-4.5 py-1.5 rounded-full cursor-pointer transition-all shadow-sm"
            >
              {t.common.search}
            </button>
          </form>
        </div>
      </section>

      {/* 2. Category Filters & Active Search Badge */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 w-full mt-8 md:mt-12 space-y-8">
        <div className="flex flex-col gap-3.5 border-b border-brand-forest/5 dark:border-zinc-800/60 pb-4">
          
          {/* Active Search indicators with clear action */}
          {search && (
            <div className="flex items-center gap-2 text-xs font-bold text-brand-forest/70 dark:text-zinc-400">
              <span>{t.portfolio.searchResults}</span>
              <span className="bg-brand-forest/5 dark:bg-zinc-900 border border-brand-forest/10 dark:border-zinc-800 px-3 py-1 rounded-full text-brand-forest dark:text-brand-lime font-black flex items-center gap-1.5">
                <span>"{search}"</span>
                <Link 
                  href={`/portfolio${category ? `?category=${encodeURIComponent(category)}` : ""}`} 
                  className="text-zinc-400 hover:text-rose-500 transition-colors"
                  title="ล้างคำค้นหา"
                >
                  <X className="w-3.5 h-3.5" />
                </Link>
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <Button
              asChild
              variant={!category ? "default" : "outline"}
              size="sm"
              className="rounded-full font-bold text-xs h-8"
            >
              <Link href={`/portfolio${search ? `?search=${encodeURIComponent(search)}` : ""}`}>
                {t.common.all}
              </Link>
            </Button>
            {uniqueCategories.map((cat) => (
              <Button
                key={cat}
                asChild
                variant={category === cat ? "default" : "outline"}
                size="sm"
                className="rounded-full font-bold text-xs h-8 whitespace-nowrap"
              >
                <Link href={`/portfolio?category=${encodeURIComponent(cat)}${search ? `&search=${encodeURIComponent(search)}` : ""}`}>
                  {cat}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* 3. Grid Layout Showcase */}
        {projects.length === 0 ? (
          <div className="py-20 text-center border border-brand-forest/10 dark:border-zinc-800 bg-white/40 dark:bg-black/20 rounded-3xl">
            <FolderOpen className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-700" />
            <h3 className="mt-4 text-lg font-bold text-brand-forest dark:text-zinc-150">
              {t.portfolio.noResults}
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
              {search 
                ? (locale === "en" 
                    ? `We could not find any project with "${search}" in this category. Please try another search keyword.`
                    : `ไม่พบผลงานที่มีข้อความ "${search}" ในหมวดหมู่ผลงานที่คุณเลือก กรุณาลองใช้คำอื่นสืบค้นใหม่`)
                : t.portfolio.noResultsDesc}
            </p>
            {(category || search) && (
              <div className="mt-6">
                <Button asChild variant="outline" size="sm" className="rounded-lg">
                  <Link href="/portfolio">{t.common.clearFilters}</Link>
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group relative flex flex-col justify-between overflow-hidden border border-brand-forest/10 hover:border-brand-forest/20 dark:border-zinc-850 dark:hover:border-zinc-800 bg-white dark:bg-zinc-900/60 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* Visual cover representation */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100 dark:bg-zinc-950/20 border-b border-brand-forest/5 dark:border-zinc-850">
                    {project.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-zinc-300 dark:text-zinc-700">
                        <FolderOpen className="w-12 h-12" />
                      </div>
                    )}
                    {project.category && (
                      <Badge className="absolute top-3.5 left-3.5 bg-brand-forest/90 backdrop-blur-xs text-brand-cream dark:bg-zinc-150/90 dark:text-brand-forest border-none font-bold rounded-lg text-[9px] uppercase tracking-wider px-2.5 py-1 z-10 shadow-sm">
                        {project.category}
                      </Badge>
                    )}
                  </div>

                  {/* Body Copy Info */}
                  <div className="p-6 space-y-3">
                    <h2 className="text-xl font-extrabold text-brand-forest dark:text-zinc-100 group-hover:text-brand-lime transition-colors line-clamp-2 leading-snug">
                      <Link href={`/portfolio/${project.slug}`}>
                        <span className="absolute inset-0" />
                        {project.title}
                      </Link>
                    </h2>

                    <div className="flex flex-col gap-1.5 pt-1">
                      {project.client && (
                        <div className="flex items-center gap-1.5 text-xs text-brand-forest/70 dark:text-zinc-400 font-medium">
                          <Briefcase className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                          <span>{locale === "en" ? "Client:" : "ลูกค้า:"} {project.client}</span>
                        </div>
                      )}
                      {project.date && (
                        <div className="flex items-center gap-1.5 text-xs text-brand-forest/70 dark:text-zinc-400 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                          <span>
                            {locale === "en" ? "Date:" : "วันที่ผลิต:"}{" "}
                            {new Date(project.date).toLocaleDateString(locale === "en" ? "en-US" : "th-TH", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer read details */}
                <div className="px-6 pb-6 pt-4 border-t border-brand-forest/5 dark:border-zinc-800/40 flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold text-brand-forest dark:text-zinc-300 flex items-center gap-1 transition-all">
                    <span>{t.portfolio.readPhotos}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] text-zinc-400 font-bold bg-neutral-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full">
                    {project.images?.length || 0} {locale === "en" ? "Images" : "รูปภาพ"}
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
