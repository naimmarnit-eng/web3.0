import * as React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";

import { services } from "@/shared/constants/service";
import { SectionHeading } from "@/presentation/components/shared/SectionHeading";
import { Button } from "@/presentation/components/ui/button";

export const metadata: Metadata = {
  title: "บริการของเรา",
  description: "รับผลิตสกรีนเสื้อ พิมพ์ดิจิตอล พิมพ์ออฟเซ็ต กล่องบรรจุภัณฑ์ และสื่อการตลาดครบวงจร ราคาโรงงาน",
};

export default function ServicesPage() {
  return (
    <div className="w-full py-16 md:py-24 bg-white dark:bg-black space-y-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="บริการงานพิมพ์และออกแบบครบวงจร"
          description="เราส่งมอบสิ่งสิ่งพิมพ์ที่สวยงาม คมชัด ได้มาตรฐาน ควบคุมงานผลิตด้วยทีมงานผู้เชี่ยวชาญเพื่อช่วยเสริมความน่าเชื่อถือให้กับแบรนด์ของคุณ"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          {services.map((service, idx) => (
            <div
              key={service.slug}
              className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center py-10 border-b border-neutral-100 dark:border-neutral-900/60 last:border-0 ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Placeholder with high aesthetic styling */}
              <div className="w-full lg:w-1/2 aspect-video bg-gradient-to-br from-neutral-100 to-zinc-200/50 dark:from-zinc-950 dark:to-zinc-900/40 border border-neutral-200/50 dark:border-neutral-800/60 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-sm group">
                <div className="absolute inset-0 bg-neutral-900/[0.02] dark:bg-white/[0.02] group-hover:scale-105 transition-transform duration-300" />
                <span className="text-sm font-semibold tracking-wide uppercase text-zinc-400">
                  {service.title}
                </span>
              </div>

              {/* Text content details */}
              <div className="w-full lg:w-1/2 space-y-5">
                <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-zinc-100">
                  {service.title}
                </h3>
                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {service.details}
                </p>

                {/* Features Checkbox Bullet Items */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {service.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                      <Check className="w-4.5 h-4.5 text-zinc-600 dark:text-zinc-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 flex items-center gap-4">
                  <Button
                    asChild
                    className="h-10 px-5 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
                  >
                    <Link href={`/services/${service.slug}`}>
                      <span>อ่านรายละเอียดเพิ่มเติม</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    className="h-10 text-neutral-800 dark:text-zinc-300 hover:bg-neutral-50 dark:hover:bg-zinc-900/60 font-semibold"
                  >
                    <Link href="/contact">ติดต่อขอใบเสนอราคา</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
