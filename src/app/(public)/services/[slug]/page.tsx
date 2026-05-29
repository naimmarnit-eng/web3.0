import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Check, 
  Sparkles, 
  Layers, 
  Cpu, 
  Printer, 
  Box, 
  Shirt, 
  Palette, 
  Clock
} from "lucide-react";

import { services } from "@/shared/constants/service";
import { Button } from "@/presentation/components/ui/button";
import { getLocale, getTranslations } from "@/shared/locales";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Generates metadata dynamically for each service route
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const service = services.find((s) => s.slug === decodedSlug);

  if (!service) {
    return {
      title: "ไม่พบบริการที่ระบุ | Finovate Printing Studio",
      description: "ขออภัย ไม่พบหน้าบริการที่คุณกำลังมองหา",
    };
  }

  const t = await getTranslations();
  const itemLocale = t.servicesList[decodedSlug as keyof typeof t.servicesList] as any;
  const displayTitle = itemLocale?.title || service.title;
  const displayDescription = itemLocale?.desc || service.description;

  return {
    title: `${displayTitle} | Finovate Printing Studio`,
    description: displayDescription,
  };
}

const getStat1Title = (slug: string, locale: string) => {
  switch (slug) {
    case "screen-printing":
      return "160°C";
    case "digital-printing":
      return locale === "en" ? "1 Unit" : "1 ตัว";
    case "packaging-printing":
      return "1:1 Fit";
    case "sublimation-printing":
      return "200°C";
    case "offset-printing":
      return "0.01mm";
    default:
      return "";
  }
};

export default async function ServiceDetailPage({
  params,
}: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const service = services.find((s) => s.slug === decodedSlug);

  if (!service) {
    return notFound();
  }

  const locale = await getLocale();
  const t = await getTranslations();

  // Dynamically resolve localized content based on slug lookup in dictionary
  const itemLocale = t.servicesList[decodedSlug as keyof typeof t.servicesList] as any;
  if (!itemLocale) {
    return notFound();
  }

  const displayTitle = itemLocale.title || service.title;
  const displayDescription = itemLocale.desc || service.description;
  const displayDetails = itemLocale.details || service.details;
  const displayFeatures = (itemLocale.features || service.features) as string[];
  const workflowSteps = (itemLocale.workflowSteps || []) as { title: string; desc: string }[];

  // Icons mapping for visual representation in cards
  const getIcon = (slug: string) => {
    switch (slug) {
      case "screen-printing":
        return <Layers className="w-6 h-6 text-brand-forest dark:text-brand-lime" />;
      case "digital-printing":
        return <Cpu className="w-6 h-6 text-brand-forest dark:text-brand-lime" />;
      case "offset-printing":
        return <Printer className="w-6 h-6 text-brand-forest dark:text-brand-lime" />;
      case "packaging-printing":
        return <Box className="w-6 h-6 text-brand-forest dark:text-brand-lime" />;
      case "sublimation-printing":
        return <Shirt className="w-6 h-6 text-brand-forest dark:text-brand-lime" />;
      default:
        return <Palette className="w-6 h-6 text-brand-forest dark:text-brand-lime" />;
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-brand-cream/40 dark:bg-brand-forest-dark/10 transition-colors duration-300 relative overflow-hidden">
      {/* Subtle mesh background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b3b3208_1px,transparent_1px),linear-gradient(to_bottom,#0b3b3208_1px,transparent_1px)] bg-[size:16px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] dark:bg-[linear-gradient(to_right,#b4e81e05_1px,transparent_1px),linear-gradient(to_bottom,#b4e81e05_1px,transparent_1px)] -z-10" />

      {/* Decorative gradient blobs */}
      <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-brand-lime/10 dark:bg-brand-lime/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-40 right-10 w-[400px] h-[400px] bg-brand-forest/5 dark:bg-brand-forest/10 rounded-full blur-3xl -z-10" />



      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full py-10 md:py-16 space-y-16">
        
        {/* Back navigation pill */}
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-4 py-2 border border-brand-forest/10 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 rounded-full text-xs font-bold text-brand-forest dark:text-zinc-300 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.servicesList.backLink}</span>
          </Link>
        </div>

        {/* 1. Brand Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-forest/5 dark:bg-brand-lime/10 border border-brand-forest/10 dark:border-brand-lime/20 rounded-full text-xs font-bold text-brand-forest dark:text-brand-lime">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{t.servicesList.badge}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-forest dark:text-zinc-50 leading-[1.1] flex items-center">
              {displayTitle}
            </h1>
          </div>

          <div className="lg:col-span-4 lg:text-right pt-4">
            <div className="bg-white/80 dark:bg-zinc-900/90 border border-brand-forest/10 dark:border-zinc-800 p-6 rounded-3xl shadow-sm text-left space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-forest/5 dark:bg-brand-lime/10 flex items-center justify-center">
                  {getIcon(service.slug)}
                </div>
                <div>
                  <span className="text-xs text-zinc-400 font-bold block uppercase tracking-wider flex items-center">
                    {t.servicesList.typeLabel}
                  </span>
                  <span className="text-sm font-bold text-brand-forest dark:text-zinc-200">
                    {t.servicesList.typeVal}
                  </span>
                </div>
              </div>
              <div className="border-t border-brand-forest/5 dark:border-zinc-800 pt-3 flex items-center justify-between text-xs text-zinc-400 font-bold">
                <span>{t.servicesList.moqLabel}:</span>
                <span className="text-brand-forest dark:text-brand-lime">
                  {service.slug === "digital-printing" ? t.servicesList.moqDigital : t.servicesList.moqStandard}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Dynamic Premium Showcase Block */}
        {["screen-printing", "digital-printing", "packaging-printing", "sublimation-printing", "offset-printing"].includes(service.slug) && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4 items-center">
            {/* Left: Framed graphic showcase block */}
            <div className="lg:col-span-6 relative aspect-[16/11] border-4 border-brand-forest dark:border-brand-lime rounded-[60px_20px_60px_20px] overflow-hidden shadow-2xl group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  service.slug === "screen-printing"
                    ? "/uploads/screen_printing_squeegee.png"
                    : service.slug === "digital-printing"
                    ? "/uploads/digital_dtg_astronaut.png"
                    : service.slug === "packaging-printing"
                    ? "/uploads/packaging_boxes_mockup.png"
                    : service.slug === "sublimation-printing"
                    ? "/uploads/sublimation_jersey_samples.png"
                    : "/uploads/digital_dtg_gorilla.png"
                }
                alt={itemLocale.imageAlt || displayTitle}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/70 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                <span className="text-[10px] font-bold text-brand-lime uppercase tracking-widest block mb-0.5">
                  {itemLocale.imageBadge}
                </span>
                <p className="text-xs text-white leading-relaxed font-semibold">
                  {itemLocale.imageDesc}
                </p>
              </div>
            </div>

            {/* Right: Dynamic Process Description */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-forest dark:text-zinc-100 tracking-tight">
                {itemLocale.promoTitle}
              </h3>
              <p className="text-base text-brand-forest/80 dark:text-zinc-300 leading-relaxed flex items-start">
                <span>{itemLocale.promoDesc}</span>
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-forest/5 dark:bg-zinc-900/60 border border-brand-forest/10 dark:border-zinc-800/80 p-4 rounded-2xl">
                  <span className="text-brand-forest dark:text-brand-lime font-black text-xl tracking-tight block">
                    {getStat1Title(service.slug, locale)}
                  </span>
                  <span className="text-xs text-zinc-500 font-bold block mt-1">
                    {itemLocale.stat1Label}
                  </span>
                </div>
                {itemLocale.stat2Title && (
                  <div className="bg-brand-forest/5 dark:bg-zinc-900/60 border border-brand-forest/10 dark:border-zinc-800/80 p-4 rounded-2xl">
                    <span className="text-brand-forest dark:text-brand-lime font-black text-xl tracking-tight block">
                      {itemLocale.stat2Title}
                    </span>
                    <span className="text-xs text-zinc-500 font-bold block mt-1">
                      {itemLocale.stat2Label}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. Detailed Features Bullet Section */}
        <div className="space-y-8">
          <div className="border-b border-brand-forest/10 dark:border-zinc-800 pb-4">
            <h3 className="text-2xl font-extrabold text-brand-forest dark:text-zinc-100">
              {t.servicesList.specTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-base text-brand-forest/80 dark:text-zinc-300 leading-relaxed flex items-start">
                <span>{displayDetails}</span>
              </p>

              <div className="bg-brand-forest/[0.02] dark:bg-zinc-950/20 border border-brand-forest/10 dark:border-zinc-900 rounded-3xl p-6 space-y-4">
                <h4 className="text-sm font-extrabold text-brand-forest dark:text-zinc-200 uppercase tracking-widest block">
                  {t.servicesList.featuresTitle}
                </h4>
                <ul className="space-y-3.5">
                  {displayFeatures.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex gap-2.5 text-sm text-brand-forest/80 dark:text-zinc-300 items-start">
                      <Check className="w-5 h-5 text-brand-forest dark:text-brand-lime shrink-0 mt-0.5" />
                      <span className="flex items-start">
                        <span>{feature}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Custom Interactive Workflow Timeline */}
            <div className="lg:col-span-7 space-y-6">
              <h4 className="text-base font-extrabold text-brand-forest dark:text-zinc-100 tracking-tight">
                {t.servicesList.workflowLabel}
              </h4>

              <div className="relative pl-6 border-l border-brand-forest/15 dark:border-zinc-800 space-y-8">
                {workflowSteps.map((step, stepIdx) => (
                  <div key={stepIdx} className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-brand-forest dark:bg-brand-lime border-4 border-brand-cream dark:border-zinc-950" />
                    <span className="text-brand-forest dark:text-brand-lime font-bold text-xs uppercase tracking-wider block">
                      {locale === "en" ? `Step ${stepIdx + 1}` : `ขั้นตอนที่ ${stepIdx + 1}`}
                    </span>
                    <h5 className="text-base font-bold text-brand-forest dark:text-zinc-100 mt-0.5 flex items-center">
                      {step.title}
                    </h5>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed flex items-start">
                      <span>{step.desc}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Specialty Ink Grid (Only for Screen Printing) */}
        {service.slug === "screen-printing" && itemLocale.inkItems && (
          <div className="space-y-8 py-4">
            <div className="border-b border-brand-forest/10 dark:border-zinc-800 pb-4">
              <h3 className="text-2xl font-extrabold text-brand-forest dark:text-zinc-100">
                {t.servicesList.inkTitle}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {itemLocale.inkItems.map((ink: any, idx: number) => (
                <div key={idx} className="bg-white dark:bg-zinc-900 border border-brand-forest/10 dark:border-zinc-800/80 rounded-3xl p-5 hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-brand-lime/5 rounded-full blur-md" />
                  <div className="px-2 py-0.5 bg-brand-forest/5 dark:bg-brand-lime/10 border border-brand-forest/5 dark:border-brand-lime/20 rounded-md text-[10px] font-black text-brand-forest dark:text-brand-lime tracking-wide inline-block mb-3.5">
                    {ink.pill}
                  </div>
                  <h4 className="text-base font-bold text-brand-forest dark:text-zinc-100 flex items-center">
                    {ink.title}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed flex items-start">
                    <span>{ink.desc}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Sleek Consultation CTA Card */}
        <div className="bg-brand-forest dark:bg-zinc-950 border border-brand-forest-dark dark:border-zinc-900 rounded-[40px] p-8 md:p-12 shadow-xl relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-lime/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-forest/40 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="space-y-4 max-w-xl text-left">
              <div className="inline-flex items-center gap-1 bg-white/10 text-brand-lime px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 animate-spin-slow shrink-0" />
                <span>{t.servicesList.ctaBadge}</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-brand-cream tracking-tight leading-tight flex items-center">
                {t.servicesList.ctaTitle}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed flex items-start">
                <span>{t.servicesList.ctaDesc}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-4 shrink-0 justify-center relative z-10">
              <Link 
                href={`/contact?service=${encodeURIComponent(service.slug)}`}
                className="inline-flex items-center justify-center h-12 px-6 bg-brand-lime hover:bg-brand-lime-hover text-brand-forest font-bold rounded-full transition-all shadow-md animate-bounce gap-2 text-sm"
              >
                <span>{t.servicesList.ctaBtn}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </Link>
              
              <Link 
                href="/faq"
                className="inline-flex items-center justify-center h-12 px-6 border border-white/20 hover:bg-white/10 text-white rounded-full font-bold transition-all gap-2 text-sm"
              >
                <span>{t.servicesList.ctaFAQ}</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
