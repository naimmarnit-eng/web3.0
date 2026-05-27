import * as React from "react";
import type { Metadata } from "next";
import { ShieldCheck, UserCheck, Flame, Compass, Sparkles, ArrowUpRight, Printer } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/presentation/components/shared/SectionHeading";
import { getLocale, getTranslations } from "@/shared/locales";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | Finovate Printing Studio",
  description: "ทำความรู้จักประวัติการทำงาน ปรัชญา และคุณค่าหลักของโรงพิมพ์เราที่มุ่งเน้นส่งมอบชิ้นงานพิมพ์ระดับพรีเมียม",
};

// Clean, micro-animated Draft indicators to flag temporary mockup content
const DraftBadge = ({ locale, variant }: { locale: string; variant?: "dark-bg" }) => {
  if (variant === "dark-bg") {
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-black tracking-wider uppercase bg-amber-400/10 text-amber-400 border border-amber-400/30 mr-1.5 select-none shrink-0 animate-pulse">
        {locale === "en" ? "Draft" : "แบบร่าง"}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-black tracking-wider uppercase bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400 border border-amber-500/20 mr-1.5 select-none shrink-0 animate-pulse">
      {locale === "en" ? "Draft" : "แบบร่าง"}
    </span>
  );
};

const DraftBanner = ({ locale }: { locale: string }) => (
  <div className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs leading-relaxed max-w-2xl mx-auto shadow-sm select-none">
    <div className="flex items-center gap-2">
      <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500 animate-ping shrink-0" />
      <span>
        {locale === "en" 
          ? "📋 MOCK DRAFT INFO: The following section contains temporary demonstration content." 
          : "📋 ข้อมูลร่างจำลอง: ส่วนถัดไปด้านล่างนี้เป็นเพียงข้อมูลจำลองสำหรับนำเสนอชิ้นงานเพื่อแสดงการจัดวางองค์ประกอบ"}
      </span>
    </div>
  </div>
);

export default async function AboutPage() {
  const locale = await getLocale();
  const t = await getTranslations();

  // Mapping icons to value items
  const getValueIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <ShieldCheck className="w-5.5 h-5.5 text-brand-forest dark:text-brand-lime" />;
      case 1:
        return <Compass className="w-5.5 h-5.5 text-brand-forest dark:text-brand-lime" />;
      case 2:
        return <UserCheck className="w-5.5 h-5.5 text-brand-forest dark:text-brand-lime" />;
      default:
        return <Flame className="w-5.5 h-5.5 text-brand-forest dark:text-brand-lime" />;
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-brand-cream/40 dark:bg-brand-forest-dark/10 transition-colors duration-300 relative overflow-hidden">
      {/* Mesh background grid consistent with homepage */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b3b3208_1px,transparent_1px),linear-gradient(to_bottom,#0b3b3208_1px,transparent_1px)] bg-[size:16px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] dark:bg-[linear-gradient(to_right,#b4e81e05_1px,transparent_1px),linear-gradient(to_bottom,#b4e81e05_1px,transparent_1px)] -z-10" />

      {/* Decorative gradient blobs */}
      <div className="absolute top-20 right-10 w-[350px] h-[350px] bg-brand-lime/10 dark:bg-brand-lime/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-40 left-10 w-[400px] h-[400px] bg-brand-forest/5 dark:bg-brand-forest/10 rounded-full blur-3xl -z-10" />

      {/* Draft banner notice at top */}
      <div className="w-full px-6 pt-10">
        <DraftBanner locale={locale} />
      </div>

      {/* 1. Main Heading & Intro */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full py-10 md:py-16 space-y-16">
        <div className="space-y-4">
          {/* Tag Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-forest/5 dark:bg-brand-lime/10 border border-brand-forest/10 dark:border-brand-lime/20 rounded-full text-xs font-bold text-brand-forest dark:text-brand-lime">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>{t.about.badge}</span>
          </div>
          <SectionHeading
            title={t.about.title}
            description={t.about.description}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Image Showcase with Organic Curves */}
          <div className="w-full lg:w-1/2 aspect-[4/3] border-4 border-brand-forest dark:border-brand-lime rounded-[80px_20px_80px_20px] overflow-hidden relative shadow-2xl group transition-all duration-500 hover:shadow-brand-forest/10 dark:hover:shadow-brand-lime/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/uploads/screen_printing_pinterest.jpg"
              alt="โรงพิมพ์คุณภาพมาตรฐาน Finovate"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Elegant glassmorphic overlay revealing title on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-brand-forest/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
              <span className="text-brand-lime font-bold text-xs uppercase tracking-widest mb-1">Our Workshop Studio</span>
              <h4 className="text-brand-cream text-xl font-extrabold tracking-tight">
                สตูดิโอพิมพ์สกรีนและควบคุมการผลิตพรีเมียม
              </h4>
            </div>
            <div className="absolute inset-0 bg-brand-forest/5 pointer-events-none" />
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-lime/10 dark:bg-brand-lime/20 text-brand-forest dark:text-brand-lime rounded-lg text-xs font-bold uppercase tracking-wider">
              <Printer className="w-3.5 h-3.5" />
              <span>10+ Years of Craftsmanship</span>
            </div>
            <h3 className="text-3xl font-extrabold text-brand-forest dark:text-zinc-100 tracking-tight leading-tight">
              {t.about.historyTitle}
            </h3>
            <p className="text-base text-brand-forest/85 dark:text-zinc-300 leading-relaxed flex items-start">
              <DraftBadge locale={locale} />
              <span>{t.about.historyText1}</span>
            </p>
            <p className="text-base text-brand-forest/85 dark:text-zinc-300 leading-relaxed flex items-start">
              <DraftBadge locale={locale} />
              <span>{t.about.historyText2}</span>
            </p>

            <div className="pt-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-forest hover:bg-brand-forest-dark text-white dark:bg-brand-lime dark:text-brand-forest dark:hover:bg-brand-lime-hover font-bold text-xs rounded-full shadow-sm group transition-all"
              >
                <span>{t.about.btnText}</span>
                <div className="w-6 h-6 rounded-full bg-brand-lime text-brand-forest dark:bg-brand-forest dark:text-brand-lime flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Core Values Grid */}
      <div className="w-full py-16 bg-brand-forest/[0.02] dark:bg-zinc-950/40 border-y border-brand-forest/10 dark:border-zinc-900/80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
          <SectionHeading
            title={t.about.valuesTitle}
            description={t.about.valuesDesc}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.about.values.map((val, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900/90 border border-brand-forest/10 dark:border-zinc-800/60 rounded-3xl p-6 shadow-sm flex flex-col items-start gap-4 hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-brand-lime/5 rounded-full blur-lg group-hover:scale-110 transition-transform" />
                <div className="w-11 h-11 rounded-2xl bg-brand-forest/5 dark:bg-brand-lime/10 flex items-center justify-center relative z-10">
                  {getValueIcon(idx)}
                </div>
                <h4 className="text-base font-bold text-brand-forest dark:text-zinc-100 relative z-10">
                  {val.title}
                </h4>
                <p className="text-sm text-brand-forest/70 dark:text-zinc-400 leading-relaxed relative z-10 flex items-start">
                  <DraftBadge locale={locale} />
                  <span>{val.desc}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Studio Statistics */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full py-16">
        <div className="bg-brand-forest dark:bg-zinc-950 border border-brand-forest-dark dark:border-zinc-900 rounded-[40px] p-8 md:p-12 shadow-xl relative overflow-hidden group">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-lime/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-forest/40 rounded-full blur-3xl" />
          
          <div className="relative z-10 space-y-8">
            <h3 className="text-xl font-bold text-brand-lime select-none">{t.about.statsTitle}</h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Experience</span>
                <span className="text-3xl md:text-4xl font-black text-brand-lime tracking-tight block">
                  {t.about.stats.experience}
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed flex items-start">
                  <DraftBadge locale={locale} variant="dark-bg" />
                  <span>{t.about.stats.experienceDesc}</span>
                </p>
              </div>
              
              <div className="space-y-2 pt-6 lg:pt-0 lg:pl-8">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Quality Inspected</span>
                <span className="text-3xl md:text-4xl font-black text-brand-cream tracking-tight block">
                  {t.about.stats.quality}
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed flex items-start">
                  <DraftBadge locale={locale} variant="dark-bg" />
                  <span>{t.about.stats.qualityDesc}</span>
                </p>
              </div>

              <div className="space-y-2 pt-6 lg:pt-0 lg:pl-8">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Minimum Order</span>
                <span className="text-3xl md:text-4xl font-black text-brand-cream tracking-tight block">
                  {t.about.stats.minimum}
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed flex items-start">
                  <DraftBadge locale={locale} variant="dark-bg" />
                  <span>{t.about.stats.minimumDesc}</span>
                </p>
              </div>

              <div className="space-y-2 pt-6 lg:pt-0 lg:pl-8">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Eco Inks Friendly</span>
                <span className="text-3xl md:text-4xl font-black text-brand-lime tracking-tight block">
                  {t.about.stats.eco}
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed flex items-start">
                  <DraftBadge locale={locale} variant="dark-bg" />
                  <span>{t.about.stats.ecoDesc}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
