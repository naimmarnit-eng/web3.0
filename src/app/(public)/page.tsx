import * as React from "react";
import Link from "next/link";
import {
  Printer,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  PhoneCall,
  Calendar,
  Layers,
  Award,
  Users,
  BookOpen,
} from "lucide-react";

import { services } from "@/shared/constants/service";
import { Button } from "@/presentation/components/ui/button";
import { Badge } from "@/presentation/components/ui/badge";
import { getLocale, getTranslations } from "@/shared/locales";
import { container } from "@/infrastructure/di/container";
import { HeroPortfolioShowcase } from "@/presentation/components/portfolio/HeroPortfolioShowcase";

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourbrand.com";

  // Fetch recommended published articles (sorted by views descending)
  const posts = await container.listPosts.execute({
    status: "PUBLISHED",
    page: 1,
    limit: 50,
  });
  const recommendedPosts = [...posts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  // Fetch published projects for hero showcase slideshow
  const showcaseProjects = await container.listProjects.execute({
    status: "PUBLISHED",
    page: 1,
    limit: 8,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Finovate Printing Studio",
    "image": `${baseUrl}/uploads/screen_printing_pinterest.jpg`,
    "telephone": "02-123-4567",
    "url": baseUrl,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "บริการงานพิมพ์สกรีนเสื้อผ้าครบวงจร",
      "addressLocality": "Bangkok",
      "addressRegion": "Bangkok",
      "postalCode": "10000",
      "addressCountry": "TH"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:30",
      "closes": "18:00"
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-brand-cream/40 dark:bg-brand-forest-dark/10 transition-colors duration-300">
      {/* JSON-LD Structured Data */}
      <script
        id="homepage-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      
      {/* 1. Hero Section (Inspiration from Screenshot 1 & 3) */}
      <section className="relative w-full py-16 lg:py-28 overflow-hidden flex flex-col items-center justify-center border-b border-brand-forest/5 dark:border-brand-lime/5">
        {/* Subtle mesh background grid matching screenshot 3 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b3b3208_1px,transparent_1px),linear-gradient(to_bottom,#0b3b3208_1px,transparent_1px)] bg-[size:16px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] dark:bg-[linear-gradient(to_right,#b4e81e05_1px,transparent_1px),linear-gradient(to_bottom,#b4e81e05_1px,transparent_1px)]" />
        
        {/* Organic background gradient blobs */}
        <div className="absolute top-16 left-1/4 w-[380px] h-[380px] bg-brand-lime/10 dark:bg-brand-lime/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-brand-forest/5 dark:bg-brand-forest/10 rounded-full blur-3xl -z-10" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full relative z-10 space-y-12">
          {/* Asymmetric Header Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-6 text-left">
              {/* Premium Tag Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-forest/5 dark:bg-brand-lime/10 border border-brand-forest/10 dark:border-brand-lime/20 rounded-full text-xs font-bold text-brand-forest dark:text-brand-lime">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>FOUNDED BY INDUSTRY TRAILBLAZERS</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-brand-forest dark:text-zinc-50 leading-[1.08] max-w-4xl">
                Investing For <br />
                Tomorrow, <span className="text-brand-lime dark:text-brand-lime font-black">Together.</span>
              </h1>
            </div>

            <div className="lg:col-span-4 text-left lg:text-right pb-2 space-y-5">
              <p className="text-sm md:text-base text-brand-forest/70 dark:text-zinc-400 leading-relaxed max-w-md lg:ml-auto">
                {t.home.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                {/* Special circular-pill button matching Finovate style */}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-forest hover:bg-brand-forest-dark text-white dark:bg-brand-lime dark:text-brand-forest dark:hover:bg-brand-lime-hover font-bold text-xs rounded-full shadow-sm group transition-all cursor-pointer"
                >
                  <span>{locale === "en" ? "Get Free Quote" : "ขอใบเสนอราคาด่วน"}</span>
                  <div className="w-6 h-6 rounded-full bg-brand-lime text-brand-forest dark:bg-brand-forest dark:text-brand-lime flex items-center justify-center group-hover:rotate-45 transition-transform">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-5 py-2.5 border border-brand-forest/20 hover:bg-brand-forest/5 dark:border-zinc-700 dark:hover:bg-zinc-800/40 text-brand-forest dark:text-zinc-300 font-bold text-xs rounded-full transition-all"
                >
                  {t.nav.services}
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Hero Overlapping Cards Grid (Exact matching from screenshot 3) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
            
            {/* Main Visual Frame - Dynamic Rotating Portfolio Showcase */}
            <HeroPortfolioShowcase projects={showcaseProjects} />

            {/* Metric Tab 1 */}
            <div className="md:col-span-3 bg-white dark:bg-zinc-950 border border-brand-forest/10 dark:border-zinc-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-lime/5 rounded-full blur-xl group-hover:scale-110 transition-transform" />
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-brand-forest/5 dark:bg-brand-lime/10 flex items-center justify-center text-brand-forest dark:text-brand-lime shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                    {locale === "en" ? "Manufactured Count" : "ยอดผลิตสะสม (AUM)"}
                  </span>
                  <span className="text-2xl font-black text-brand-forest dark:text-zinc-50 tracking-tight mt-1 block">
                    {locale === "en" ? "28.9M+ pcs" : "28.9M+ ชิ้น"}
                  </span>
                </div>
              </div>
              <Link href="/portfolio" className="text-xs font-bold text-brand-lime dark:text-brand-lime hover:underline flex items-center gap-1 mt-6">
                <span>{locale === "en" ? "Feature Showcases" : "ผลงานผลิตชิ้นเด่น"}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Metric Tab 2 */}
            <div className="md:col-span-3 bg-white dark:bg-zinc-950 border border-brand-forest/10 dark:border-zinc-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-forest/5 rounded-full blur-xl group-hover:scale-110 transition-transform" />
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-brand-forest/5 dark:bg-brand-lime/10 flex items-center justify-center text-brand-forest dark:text-brand-lime shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                    {locale === "en" ? "Expert Team" : "ผู้เชี่ยวชาญ (Team)"}
                  </span>
                  <span className="text-2xl font-black text-brand-forest dark:text-zinc-50 tracking-tight mt-1 block">
                    {locale === "en" ? "120+ Members" : "120+ นาย"}
                  </span>
                </div>
              </div>
              <div className="flex -space-x-2 mt-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="w-7 h-7 rounded-full bg-brand-cream border-2 border-white dark:border-zinc-950 flex items-center justify-center text-[9px] font-bold text-brand-forest shrink-0">
                    {n}
                  </div>
                ))}
                <div className="text-[10px] text-zinc-400 pl-4 flex items-center font-bold">
                  {locale === "en" ? "Refined Team" : "ทีมงานประณีต"}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Premium Overhaul Services Grid (Inspiration from Screenshot 2) */}
      <section className="w-full py-20 lg:py-28 bg-brand-cream dark:bg-brand-forest-dark border-t border-brand-forest/5 dark:border-brand-lime/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full space-y-16">
          
          {/* Asymmetric Section Title */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-forest/5 dark:bg-brand-lime/10 rounded-full text-xs font-bold text-brand-forest dark:text-brand-lime">
                <span>OUR EXPERTISE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-forest dark:text-zinc-50 leading-tight">
                Covering the Full Spectrum <br />
                of <span className="text-brand-lime dark:text-brand-lime font-black">Global Printing</span> Services
              </h2>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Button asChild className="rounded-full bg-brand-forest hover:bg-brand-forest-dark text-white dark:bg-brand-lime dark:text-brand-forest dark:hover:bg-brand-lime-hover font-bold text-xs h-10 px-5">
                <Link href="/services">{locale === "en" ? "View All Services" : "ดูบริการทั้งหมด"}</Link>
              </Button>
            </div>
          </div>

          {/* Cards Overhaul Layout (Exact styling from Screenshot 2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Primary Dark Forest Green Card */}
            <div className="bg-brand-forest dark:bg-zinc-950/80 rounded-[32px] p-8 text-white relative overflow-hidden group min-h-[320px] flex flex-col justify-between border border-brand-forest/10">
              <div className="absolute top-4 right-6 text-brand-lime text-3xl font-black shrink-0">*</div>
              <div className="space-y-4 pt-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-zinc-50">
                  {locale === "en" ? "Screen Printing Services" : "งานพิมพ์สกรีน (Screen Printing)"}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-xs font-medium">
                  {t.servicesList["screen-printing"].desc}
                </p>
              </div>
              <Link
                href="/services/screen-printing"
                className="w-10 h-10 rounded-full bg-white text-brand-forest flex items-center justify-center hover:scale-105 transition-transform self-start mt-6 shadow-sm"
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Primary Neon Lime Card */}
            <div className="bg-brand-lime rounded-[32px] p-8 text-brand-forest relative overflow-hidden group min-h-[320px] flex flex-col justify-between shadow-md">
              <div className="absolute top-4 right-6 text-brand-forest-dark text-xl shrink-0">
                <Printer className="w-6 h-6" />
              </div>
              <div className="space-y-4 pt-4">
                <div className="inline-flex items-center px-2.5 py-0.5 bg-brand-forest/10 rounded-full text-[10px] font-black uppercase tracking-wider">
                  {locale === "en" ? "SUCCESS STORY" : "ความสำเร็จเด่น"}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-brand-forest-dark">
                  {locale === "en" ? "Digital DTG / DFT Printing" : "งานพิมพ์ดิจิตอล DTG / DFT"}
                </h3>
              </div>
              <div className="flex items-end justify-between mt-6">
                <div>
                  <span className="text-3xl font-black block leading-none">1.6x</span>
                  <span className="text-[10px] font-bold text-brand-forest/70 block mt-1">
                    {locale === "en" ? "Average client growth" : "ยอดขายที่ลูกค้าเติบโตเฉลี่ย"}
                  </span>
                </div>
                <Link
                  href="/services/digital-printing"
                  className="px-4 py-2 bg-brand-forest hover:bg-brand-forest-dark text-white rounded-full text-[11px] font-bold shadow-sm transition-all"
                >
                  {locale === "en" ? "Read Details" : "อ่านรายละเอียด"}
                </Link>
              </div>
            </div>

            {/* Cream Card: Fiduciary */}
            <div className="bg-white dark:bg-zinc-950 border border-brand-forest/10 dark:border-zinc-800 rounded-[32px] p-8 flex flex-col justify-between hover:shadow-md transition-all group min-h-[320px]">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-brand-forest/5 dark:bg-brand-lime/10 flex items-center justify-center text-brand-forest dark:text-brand-lime">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-extrabold text-neutral-900 dark:text-zinc-100">
                  {locale === "en" ? "Fiduciary Quality Standards" : "แนวคิดสกรีนคุณภาพพรีเมียม"}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                  {locale === "en" 
                    ? "We ensure absolute color precision and zero screen deviation to make your brand look highly premium." 
                    : "เรายึดมั่นความถูกต้องของเม็ดสีสกรีนและความเพี้ยนสีที่เกณฑ์ศูนย์ เพื่อให้แบรนด์ของลูกค้าดูเป็นมืออาชีพและพรีเมียมที่สุดในตลาด"}
                </p>
              </div>
              <Link href="/about" className="text-xs font-bold text-brand-forest dark:text-zinc-300 hover:underline flex items-center gap-1 self-start mt-6">
                <span>{locale === "en" ? "Read Brand Vision" : "อ่านแนวคิดงานแบรนด์"}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Remaining Custom Cards mapped from constants */}
            {services.slice(2, 5).map((service, idx) => {
              const itemLocale = t.servicesList[service.slug as keyof typeof t.servicesList] as any;
              const displayTitle = itemLocale?.title || service.title;
              const displayDesc = itemLocale?.desc || service.description;
              return (
                <div
                  key={service.slug}
                  className="bg-white dark:bg-zinc-950 border border-brand-forest/10 dark:border-zinc-800 rounded-[32px] p-8 flex flex-col justify-between hover:shadow-md transition-all group min-h-[320px]"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-forest/5 dark:bg-brand-lime/10 flex items-center justify-center text-brand-forest dark:text-brand-lime">
                      {idx === 0 ? <Zap className="w-5 h-5" /> : idx === 1 ? <Layers className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                    </div>
                    <h4 className="text-xl font-extrabold text-neutral-900 dark:text-zinc-100">
                      {displayTitle}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                      {displayDesc}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-neutral-100 dark:border-zinc-900 flex items-center justify-between mt-6">
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-xs font-bold text-brand-forest dark:text-zinc-300 flex items-center gap-1 group-hover:gap-1.5 transition-all"
                    >
                      <span>{t.servicesList.readMore}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                    </Link>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>


      {/* Recommended Resource Blog section */}
      {recommendedPosts.length > 0 && (
        <section className="w-full py-20 lg:py-28 bg-brand-cream/20 dark:bg-brand-forest-dark/5 border-t border-brand-forest/5 dark:border-brand-lime/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full space-y-16">
            
            {/* Header section with view all button */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-forest/5 dark:bg-brand-lime/10 rounded-full text-xs font-bold text-brand-forest dark:text-brand-lime">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{locale === "en" ? "KNOWLEDGE BASE" : "สาระและคลังความรู้"}</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-forest dark:text-zinc-50 leading-tight">
                  {locale === "en" ? "Recommended Articles" : "บทความและสาระแนะนำ"}
                </h2>
                <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium max-w-2xl">
                  {locale === "en"
                    ? "Explore our master printers' guides, screen printing hacks, and packaging tips to level up your brand."
                    : "รวบรวมเทคนิคและเคล็ดลับจากผู้เชี่ยวชาญงานสกรีน เพื่อเสริมแกร่งภาพลักษณ์และแบรนด์สิ่งพิมพ์ของคุณ"}
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Button asChild className="rounded-full bg-brand-forest hover:bg-brand-forest-dark text-white dark:bg-brand-lime dark:text-brand-forest dark:hover:bg-brand-lime-hover font-bold text-xs h-10 px-5 cursor-pointer shadow-sm">
                  <Link href="/blog">{locale === "en" ? "Explore All Insights" : "ดูบทความทั้งหมด"}</Link>
                </Button>
              </div>
            </div>

            {/* Grid of posts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendedPosts.map((post) => (
                <article
                  key={post.id}
                  className="group relative flex flex-col justify-between overflow-hidden border border-brand-forest/10 dark:border-zinc-850 hover:border-brand-forest/20 dark:hover:border-zinc-800 bg-white dark:bg-zinc-900/60 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <div>
                    {/* Cover image */}
                    <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-zinc-950/20 border-b border-brand-forest/5 dark:border-zinc-850">
                      {post.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-zinc-300 dark:text-zinc-700">
                          <BookOpen className="w-10 h-10" />
                        </div>
                      )}
                      {post.category && (
                        <Badge className="absolute top-3 left-3 bg-brand-forest/95 backdrop-blur-xs text-brand-cream border-none font-bold rounded-lg text-[9px] uppercase tracking-wider px-2 py-0.5 z-10 shadow-sm">
                          {post.category}
                        </Badge>
                      )}
                    </div>

                    {/* Content body */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        <span>
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString(locale === "en" ? "en-US" : "th-TH", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <h4 className="text-lg font-extrabold text-brand-forest dark:text-zinc-100 group-hover:text-brand-lime transition-colors line-clamp-2 leading-snug">
                        <Link href={`/blog/${post.slug}`}>
                          <span className="absolute inset-0 z-0" />
                          {post.title}
                        </Link>
                      </h4>

                      {post.excerpt && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Interactive Tags parsing */}
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
                            {parsedTags.slice(0, 3).map((tag) => (
                              <Link
                                key={tag}
                                href={`/blog/tag/${encodeURIComponent(tag)}`}
                                className="inline-block text-[9px] font-bold text-zinc-400 dark:text-zinc-550 hover:text-brand-lime dark:hover:text-brand-lime hover:underline transition-colors"
                              >
                                #{tag}
                              </Link>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Read Article Details footer */}
                  <div className="px-6 pb-6 pt-4 border-t border-brand-forest/5 dark:border-zinc-800/40 flex items-center justify-between mt-auto">
                    <span className="text-xs font-bold text-brand-forest dark:text-zinc-300 flex items-center gap-1 transition-all">
                      <span>{locale === "en" ? "Read Guide" : "อ่านบทความ"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-450" />
                    </span>
                    <span className="text-[10px] text-zinc-400 font-bold bg-neutral-100 dark:bg-zinc-850 px-2 py-0.5 rounded-full">
                      {locale === "en" ? "Read" : "อ่าน"} {post.views} {locale === "en" ? "times" : "ครั้ง"}
                    </span>
                  </div>

                </article>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* 5. Sleek Consultation CTA Banner (Same styling as screenshot 3 bottom) */}
      <section className="w-full py-20 bg-brand-forest dark:bg-zinc-950 text-white relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-forest/30 via-transparent to-transparent opacity-60 dark:from-brand-lime/5" />
        <div className="mx-auto max-w-5xl px-6 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            {locale === "en" ? "Ready for Premium High-Quality Printing?" : "พร้อมสัมผัสสิ่งพิมพ์คุณภาพพรีเมียมแล้วหรือยัง?"}
          </h2>
          <p className="text-sm md:text-base text-zinc-300 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {locale === "en" 
              ? "Contact our consultation team for free pricing estimation, technique advice, and structure mockups. No hidden conditions."
              : "ติดต่อฝ่ายให้คำปรึกษาประเมินราคาและเทคนิคพิมพ์สกรีนฟรี ขึ้นโครงสร้างตัวอย่างฟรี ไม่มีเงื่อนไขแอบแฝง"}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Special circular-pill button */}
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-lime hover:bg-brand-lime-hover text-brand-forest font-bold text-sm rounded-full shadow-md group transition-all cursor-pointer"
            >
              <span>{locale === "en" ? "Get Free Quote" : "ขอใบเสนอราคาฟรี"}</span>
              <div className="w-6 h-6 rounded-full bg-brand-forest text-white flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </Link>
            <a
              href="tel:021234567"
              className="text-sm font-bold text-zinc-300 hover:text-white transition-colors"
            >
              {locale === "en" ? "Or call hotline: 02-123-4567" : "หรือโทรสายด่วน: 02-123-4567"}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
