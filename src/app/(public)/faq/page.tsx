import * as React from "react";
import type { Metadata } from "next";
import { Sparkles, HelpCircle } from "lucide-react";
import { SectionHeading } from "@/presentation/components/shared/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/presentation/components/ui/accordion";
import { getLocale, getTranslations } from "@/shared/locales";

export const metadata: Metadata = {
  title: "คำถามที่พบบ่อย (FAQ) | Finovate Printing Studio",
  description: "รวบรวมคำถามที่พบบ่อยเกี่ยวกับการสกรีนเสื้อ งานพิมพ์ออฟเซ็ต กล่องบรรจุภัณฑ์ ยอดสั่งผลิตขั้นต่ำ และเวลาในการจัดส่ง",
};

export default async function FAQPage() {
  const locale = await getLocale();
  const t = await getTranslations();

  return (
    <div className="w-full flex flex-col items-center bg-brand-cream/40 dark:bg-brand-forest-dark/10 transition-colors duration-300 relative overflow-hidden min-h-[80vh]">
      {/* Mesh background grid consistent with premium theme */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b3b3208_1px,transparent_1px),linear-gradient(to_bottom,#0b3b3208_1px,transparent_1px)] bg-[size:16px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] dark:bg-[linear-gradient(to_right,#b4e81e05_1px,transparent_1px),linear-gradient(to_bottom,#b4e81e05_1px,transparent_1px)] -z-10" />

      {/* Decorative gradient blobs */}
      <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-brand-lime/10 dark:bg-brand-lime/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-[350px] h-[350px] bg-brand-forest/5 dark:bg-brand-forest/10 rounded-full blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full py-10 md:py-16 space-y-16">
        {/* Heading Panel */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-forest/5 dark:bg-brand-lime/10 border border-brand-forest/10 dark:border-brand-lime/20 rounded-full text-xs font-bold text-brand-forest dark:text-brand-lime">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>{t.faq.badge}</span>
          </div>
          <SectionHeading
            title={t.faq.title}
            description={t.faq.description}
          />
        </div>

        {/* Accordion Questions */}
        <div className="mx-auto max-w-3xl w-full">
          <Accordion type="single" collapsible className="w-full space-y-5">
            {t.faq.items.map((faq: { q: string; a: string }, index: number) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-brand-forest/10 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 rounded-[20px] px-6 hover:border-brand-forest/20 dark:hover:border-zinc-700 hover:shadow-md hover:shadow-brand-forest/[0.01] transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-brand-lime/5 rounded-full blur-md group-hover:scale-110 transition-transform" />
                
                <AccordionTrigger className="text-left font-extrabold text-base py-5 text-brand-forest dark:text-zinc-100 hover:no-underline hover:text-brand-lime dark:hover:text-brand-lime transition-colors duration-300 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-forest/5 dark:bg-brand-lime/10 flex items-center justify-center text-brand-forest dark:text-brand-lime shrink-0">
                      <HelpCircle className="w-4.5 h-4.5" />
                    </div>
                    <span className="flex items-center">
                      {faq.q}
                    </span>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="text-brand-forest/80 dark:text-zinc-300 leading-relaxed text-sm pb-5 pl-11 flex items-start">
                  <span>{faq.a}</span>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
