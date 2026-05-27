import * as React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";

import { services } from "@/shared/constants/service";
import { SectionHeading } from "@/presentation/components/shared/SectionHeading";
import { Button } from "@/presentation/components/ui/button";
import { getLocale, getTranslations } from "@/shared/locales";

export const metadata: Metadata = {
  title: "บริการของเรา | Our Services",
  description: "รับผลิตสกรีนเสื้อ พิมพ์ดิจิตอล พิมพ์ออฟเซ็ต กล่องบรรจุภัณฑ์ และสื่อการตลาดครบวงจร ราคาโรงงาน",
};

// Clean, micro-animated Draft indicators to flag temporary mockup content
const DraftBadge = ({ locale }: { locale: string }) => (
  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-black tracking-wider uppercase bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400 border border-amber-500/20 mr-1.5 select-none shrink-0 animate-pulse">
    {locale === "en" ? "Draft" : "แบบร่าง"}
  </span>
);

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

export default async function ServicesPage() {
  const locale = await getLocale();
  const t = await getTranslations();

  return (
    <div className="w-full py-12 md:py-16 bg-white dark:bg-black space-y-12">
      {/* Draft banner notice at top */}
      <div className="w-full px-6">
        <DraftBanner locale={locale} />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title={t.servicesList.title}
          description={t.servicesList.description}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          {services.map((service, idx) => {
            // Dynamically resolve localized content based on slug lookup in dictionary
            const itemLocale = t.servicesList[service.slug as keyof typeof t.servicesList] as any;
            const displayTitle = itemLocale?.title || service.title;
            const displayDetails = itemLocale?.details || service.details;
            const displayFeatures = (itemLocale?.features || service.features) as string[];

            return (
              <div
                key={service.slug}
                className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center py-10 border-b border-neutral-100 dark:border-neutral-900/60 last:border-0 ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image Placeholder with high aesthetic styling */}
                <div className="w-full lg:w-1/2 aspect-video bg-gradient-to-br from-neutral-100 to-zinc-200/50 dark:from-zinc-950 dark:to-zinc-900/40 border border-neutral-200/50 dark:border-neutral-800/60 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-sm group">
                  <div className="absolute inset-0 bg-neutral-900/[0.02] dark:bg-white/[0.02] group-hover:scale-105 transition-transform duration-300" />
                  <span className="text-sm font-semibold tracking-wide uppercase text-zinc-400 flex items-center">
                    <DraftBadge locale={locale} />
                    {displayTitle}
                  </span>
                </div>

                {/* Text content details */}
                <div className="w-full lg:w-1/2 space-y-5">
                  <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-zinc-100 flex items-center">
                    <DraftBadge locale={locale} />
                    {displayTitle}
                  </h3>
                  <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed flex items-start">
                    <DraftBadge locale={locale} />
                    <span>{displayDetails}</span>
                  </p>

                  {/* Features Checkbox Bullet Items */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {displayFeatures.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex gap-2 text-sm text-zinc-500 dark:text-zinc-400 items-start">
                        <Check className="w-4.5 h-4.5 text-zinc-600 dark:text-zinc-400 shrink-0 mt-0.5" />
                        <span className="flex items-start">
                          <DraftBadge locale={locale} />
                          <span>{feature}</span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 flex items-center gap-4">
                    <Button
                      asChild
                      className="h-10 px-5 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
                    >
                      <Link href={`/services/${service.slug}`}>
                        <span>{t.servicesList.readMore}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      className="h-10 text-neutral-800 dark:text-zinc-300 hover:bg-neutral-50 dark:hover:bg-zinc-900/60 font-semibold"
                    >
                      <Link href="/contact">{t.servicesList.getQuote}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
