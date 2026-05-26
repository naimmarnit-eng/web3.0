import * as React from "react";
import type { Metadata } from "next";
import { ShieldCheck, UserCheck, Flame, Compass, Sparkles, ArrowUpRight, Award, Zap, Printer } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/presentation/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | Finovate Printing Studio",
  description: "ทำความรู้จักประวัติการทำงาน ปรัชญา และคุณค่าหลักของโรงพิมพ์เราที่มุ่งเน้นส่งมอบชิ้นงานพิมพ์ระดับพรีเมียม",
};

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col items-center bg-brand-cream/40 dark:bg-brand-forest-dark/10 transition-colors duration-300 relative overflow-hidden">
      {/* Mesh background grid consistent with homepage */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b3b3208_1px,transparent_1px),linear-gradient(to_bottom,#0b3b3208_1px,transparent_1px)] bg-[size:16px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] dark:bg-[linear-gradient(to_right,#b4e81e05_1px,transparent_1px),linear-gradient(to_bottom,#b4e81e05_1px,transparent_1px)] -z-10" />

      {/* Decorative gradient blobs */}
      <div className="absolute top-20 right-10 w-[350px] h-[350px] bg-brand-lime/10 dark:bg-brand-lime/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-40 left-10 w-[400px] h-[400px] bg-brand-forest/5 dark:bg-brand-forest/10 rounded-full blur-3xl -z-10" />

      {/* 1. Main Heading & Intro */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full py-16 md:py-24 space-y-16">
        <div className="space-y-4">
          {/* Tag Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-forest/5 dark:bg-brand-lime/10 border border-brand-forest/10 dark:border-brand-lime/20 rounded-full text-xs font-bold text-brand-forest dark:text-brand-lime">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>FINOVATE PRINTING HOUSE</span>
          </div>
          <SectionHeading
            title="เกี่ยวกับเรา (About Us)"
            description="มุ่งมั่นพัฒนาเทคโนโลยีสิ่งพิมพ์และมาตรฐานการบริการ เพื่อเคียงข้างความสำเร็จของธุรกิจคุณ"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Image Showcase with Organic Pinterest Curves */}
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
              จุดเริ่มต้น ปรัชญาการทำงาน <br />
              และความเชี่ยวชาญระดับพรีเมียมของเรา
            </h3>
            <p className="text-base text-brand-forest/85 dark:text-zinc-300 leading-relaxed">
              เราเริ่มต้นธุรกิจด้วยความมุ่งมั่นที่จะส่งมอบงานสกรีนเสื้อยืด งานปักผ้า และงานพิมพ์สื่อการตลาดทุกชนิดในคุณภาพที่ดีที่สุดในราคาที่จับต้องได้ ด้วยประสบการณ์การดูแลแบรนด์เสื้อผ้าและธุรกิจกว่า 10 ปี ทำให้เราเข้าใจความสำคัญของความเพี้ยนสีและรายละเอียดงานสกรีนบล็อกเป็นอย่างดี
            </p>
            <p className="text-base text-brand-forest/85 dark:text-zinc-300 leading-relaxed">
              ปัจจุบัน เราก้าวไปอีกขั้นด้วยการรวมการพิมพ์ระบบบล็อกออฟเซ็ตและเทคโนโลยีดิจิตอล DTG / DFT เต็มรูปแบบ ทำให้เราสามารถตอบสนองความต้องการได้ไม่มีขั้นต่ำ (1 ตัวก็สกรีนได้) ไปจนถึงงานพิมพ์ปริมาณระดับองค์กรขนาดใหญ่
            </p>

            <div className="pt-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-forest hover:bg-brand-forest-dark text-white dark:bg-brand-lime dark:text-brand-forest dark:hover:bg-brand-lime-hover font-bold text-xs rounded-full shadow-sm group transition-all"
              >
                <span>สำรวจบริการพิมพ์ทั้งหมด</span>
                <div className="w-6 h-6 rounded-full bg-brand-lime text-brand-forest dark:bg-brand-forest dark:text-brand-lime flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Core Values Grid */}
      <div className="w-full py-20 bg-brand-forest/[0.02] dark:bg-zinc-950/40 border-y border-brand-forest/10 dark:border-zinc-900/80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
          <SectionHeading
            title="คุณค่าหลักที่เรายึดถือ"
            description="ทุกขั้นตอนการบริการและการทำงานของเราอยู่ภายใต้เสาหลัก 4 ประการนี้"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-5.5 h-5.5 text-brand-forest dark:text-brand-lime" />,
                title: "งานคุณภาพระดับพรีเมียม",
                description: "ตรวจสอบความประณีตคมชัดและรายละเอียดของสีตั้งแต่ขั้นตอนออกแบบ ไฟล์งานผลิต จนถึงการส่งมอบสินค้า",
              },
              {
                icon: <Compass className="w-5.5 h-5.5 text-brand-forest dark:text-brand-lime" />,
                title: "นวัตกรรมล้ำสมัย",
                description: "นำเข้าเทคโนโลยีเครื่องสกรีนดิจิตอล หมึกพิมพ์กันน้ำที่เป็นมิตรต่อสิ่งแวดล้อมเพื่อประสิทธิภาพงานพิมพ์สูงสุด",
              },
              {
                icon: <UserCheck className="w-5.5 h-5.5 text-brand-forest dark:text-brand-lime" />,
                title: "บริการด้วยความซื่อสัตย์",
                description: "เสนอราคาตรงไปตรงมา อธิบายค่าใช้จ่ายและบล็อกสกรีนอย่างชัดเจน ไม่มีค่าใช้จ่ายแอบแฝง",
              },
              {
                icon: <Flame className="w-5.5 h-5.5 text-brand-forest dark:text-brand-lime" />,
                title: "ส่งมอบรวดเร็ว ตรงเวลา",
                description: "บริหารตารางงานอย่างแม่นยำ พร้อมบริการจัดส่งด่วนพิเศษเพื่อให้ชิ้นงานถึงมือลูกค้าทันเวลา",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900/90 border border-brand-forest/10 dark:border-zinc-800/60 rounded-3xl p-6 shadow-sm flex flex-col items-start gap-4 hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-brand-lime/5 rounded-full blur-lg group-hover:scale-110 transition-transform" />
                <div className="w-11 h-11 rounded-2xl bg-brand-forest/5 dark:bg-brand-lime/10 flex items-center justify-center relative z-10">
                  {value.icon}
                </div>
                <h4 className="text-base font-bold text-brand-forest dark:text-zinc-100 relative z-10">
                  {value.title}
                </h4>
                <p className="text-sm text-brand-forest/70 dark:text-zinc-400 leading-relaxed relative z-10">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Studio Statistics (Finovate Style Overlapping Metrics) */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full py-20">
        <div className="bg-brand-forest dark:bg-zinc-950 border border-brand-forest-dark dark:border-zinc-900 rounded-[40px] p-8 md:p-12 shadow-xl relative overflow-hidden group">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-lime/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-forest/40 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Experience</span>
              <span className="text-4xl md:text-5xl font-black text-brand-lime tracking-tight block">10+ Years</span>
              <p className="text-xs text-zinc-400">ควบคุมคุณภาพด้วยฝีมือช่างสกรีนและพิมพ์ออฟเซ็ตมืออาชีพ</p>
            </div>
            
            <div className="space-y-2 pt-6 lg:pt-0 lg:pl-8">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Quality Inspected</span>
              <span className="text-4xl md:text-5xl font-black text-brand-cream tracking-tight block">100%</span>
              <p className="text-xs text-zinc-400">คัดแยกและตรวจสอบตำหนิอย่างเข้มข้นทีละชิ้นก่อนแพ็กจัดส่ง</p>
            </div>

            <div className="space-y-2 pt-6 lg:pt-0 lg:pl-8">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Minimum Order</span>
              <span className="text-4xl md:text-5xl font-black text-brand-cream tracking-tight block">0 Qty</span>
              <p className="text-xs text-zinc-400">มีทางเลือกระบบพิมพ์ดิจิตอล DTG / DFT ไม่มีขั้นต่ำ 1 ตัวก็ทำได้</p>
            </div>

            <div className="space-y-2 pt-6 lg:pt-0 lg:pl-8">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Eco Inks Friendly</span>
              <span className="text-4xl md:text-5xl font-black text-brand-lime tracking-tight block">Green certified</span>
              <p className="text-xs text-zinc-400">ใช้หมึกและสารเคมีที่ได้รับรองมาตรฐานความปลอดภัยต่อผิวสัมผัส</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
