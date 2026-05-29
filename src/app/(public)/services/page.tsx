import * as React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Printer, Zap, BookOpen, Layers, Sparkles } from "lucide-react";

import { services } from "@/shared/constants/service";
import { SectionHeading } from "@/presentation/components/shared/SectionHeading";
import { getLocale, getTranslations } from "@/shared/locales";

export const metadata: Metadata = {
  title: "บริการของเรา | Our Services",
  description: "รับผลิตสกรีนเสื้อ พิมพ์ดิจิตอล พิมพ์ออฟเซ็ต กล่องบรรจุภัณฑ์ และสื่อการตลาดครบวงจร ราคาโรงงาน",
};

export default async function ServicesPage() {
  const locale = await getLocale();
  const t = await getTranslations();

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case "screen-printing":
        return <Printer className="w-5 h-5" />;
      case "digital-printing":
        return <Zap className="w-5 h-5" />;
      case "offset-printing":
        return <BookOpen className="w-5 h-5" />;
      case "packaging-printing":
        return <Layers className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const getServiceImage = (slug: string, title: string) => {
    let imgSrc = "";
    if (slug === "screen-printing") {
      imgSrc = "/uploads/screen_printing_squeegee.png";
    } else if (slug === "digital-printing") {
      imgSrc = "/uploads/digital_dtg_astronaut.png";
    } else if (slug === "packaging-printing") {
      imgSrc = "/uploads/packaging_boxes_mockup.png";
    } else if (slug === "sublimation-printing") {
      imgSrc = "/uploads/sublimation_jersey_samples.png";
    } else if (slug === "offset-printing") {
      imgSrc = "/uploads/digital_dtg_gorilla.png";
    }

    if (imgSrc) {
      return (
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      );
    }

    // Sleek solid color placeholders for other slots (like offset-printing)
    let bgClass = "bg-brand-forest-dark";
    let textClass = "text-brand-lime";
    if (slug === "digital-printing") { bgClass = "bg-brand-forest"; textClass = "text-brand-lime"; }
    else if (slug === "offset-printing") { bgClass = "bg-brand-cream-dark dark:bg-zinc-900"; textClass = "text-brand-forest dark:text-zinc-300"; }
    else if (slug === "packaging-printing") { bgClass = "bg-zinc-950"; textClass = "text-white"; }
    
    return (
      <div className={`absolute inset-0 ${bgClass} flex flex-col items-center justify-center p-6 transition-transform group-hover:scale-[1.02] duration-700`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:10px_10px]" />
        <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center ${textClass} mb-2`}>
          {getServiceIcon(slug)}
        </div>
        <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-400">Premium Printing Service</span>
      </div>
    );
  };

  return (
    <div className="w-full py-12 md:py-16 bg-brand-cream/20 dark:bg-zinc-950/20 space-y-12 min-h-[85vh] relative overflow-hidden">
      {/* Mesh background grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b3b3208_1px,transparent_1px),linear-gradient(to_bottom,#0b3b3208_1px,transparent_1px)] bg-[size:16px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] dark:bg-[linear-gradient(to_right,#b4e81e05_1px,transparent_1px),linear-gradient(to_bottom,#b4e81e05_1px,transparent_1px)] -z-10" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title={t.servicesList.title}
          description={t.servicesList.description}
        />
      </div>

      {/* Dynamic Grid Layout for services */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const itemLocale = t.servicesList[service.slug as keyof typeof t.servicesList] as any;
            const displayTitle = itemLocale?.title || service.title;
            const displayDesc = itemLocale?.desc || service.description;

            return (
              <div
                key={service.slug}
                className="bg-white dark:bg-zinc-900/60 border border-brand-forest/10 dark:border-zinc-850 hover:border-brand-forest/20 dark:hover:border-zinc-800 rounded-[30px] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Image slot */}
                  <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-zinc-950/20 border-b border-brand-forest/5 dark:border-zinc-850">
                    {getServiceImage(service.slug, displayTitle)}
                  </div>

                  {/* Body details */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-forest/5 dark:bg-brand-lime/10 flex items-center justify-center text-brand-forest dark:text-brand-lime shrink-0">
                        {getServiceIcon(service.slug)}
                      </div>
                      <h3 className="text-lg font-bold text-brand-forest dark:text-zinc-100">
                        {displayTitle}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                      {displayDesc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-3">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center justify-center h-10 px-4 bg-brand-forest hover:bg-brand-forest-dark text-brand-cream dark:bg-brand-lime dark:hover:bg-brand-lime-hover dark:text-brand-forest text-xs font-bold rounded-xl transition-all gap-1.5 shadow-sm"
                  >
                    <span>{t.servicesList.readMore}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center h-10 px-4 border border-brand-forest/10 hover:bg-brand-forest/5 dark:border-zinc-800 dark:hover:bg-zinc-800/50 text-brand-forest dark:text-zinc-300 text-xs font-bold rounded-xl transition-all"
                  >
                    {t.servicesList.getQuote}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
