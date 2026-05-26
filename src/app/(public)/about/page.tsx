import * as React from "react";
import type { Metadata } from "next";
import { ShieldCheck, UserCheck, Flame, Compass } from "lucide-react";
import { SectionHeading } from "@/presentation/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description: "ทำความรู้จักประวัติการทำงาน ปรัชญา และคุณค่าหลักของโรงพิมพ์เราที่มุ่งเน้นส่งมอบชิ้นงานพิมพ์ระดับพรีเมียม",
};

export default function AboutPage() {
  return (
    <div className="w-full py-16 md:py-24 bg-white dark:bg-black space-y-20">
      {/* 1. Main Heading & Intro */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="เกี่ยวกับเรา (About Us)"
          description="มุ่งมั่นพัฒนาเทคโนโลยีสิ่งสิ่งพิมพ์และมาตรฐานการบริการ เพื่อเคียงข้างความสำเร็จของธุรกิจคุณ"
        />

        <div className="mt-16 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="w-full lg:w-1/2 aspect-[4/3] bg-gradient-to-tr from-neutral-100 to-zinc-200/50 dark:from-zinc-950 dark:to-zinc-900/40 border border-neutral-200/50 dark:border-neutral-800/60 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-neutral-900/[0.01] dark:bg-white/[0.01]" />
            <span className="text-sm font-semibold tracking-wide uppercase text-zinc-400">
              โรงพิมพ์คุณภาพมาตรฐาน
            </span>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-zinc-100">
              จุดเริ่มต้นและความเชี่ยวชาญของเรา
            </h3>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              เราเริ่มต้นธุรกิจด้วยความมุ่งมั่นที่จะส่งมอบงานสกรีนเสื้อ งานปักผ้า และงานพิมพ์สื่อการตลาดทุกชนิดในคุณภาพที่ดีที่สุดในราคาที่จับต้องได้ ด้วยประสบการณ์การดูแลแบรนด์เสื้อผ้าและธุรกิจกว่า 10 ปี ทำให้เราเข้าใจความสำคัญของความเพี้ยนสีและรายละเอียดงานสกรีนบล็อกเป็นอย่างดี
            </p>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              ปัจจุบัน เราก้าวไปอีกขั้นด้วยการรวมการพิมพ์ระบบบล็อกออฟเซ็ตและเทคโนโลยีดิจิตอล DTG / DFT เต็มรูปแบบ ทำให้เราสามารถตอบสนองความต้องการได้ไม่มีขั้นต่ำ (1 ตัวก็สกรีนได้) ไปจนถึงงานพิมพ์ปริมาณระดับองค์กรขนาดใหญ่
            </p>
          </div>
        </div>
      </div>

      {/* 2. Core Values Grid */}
      <div className="w-full py-20 bg-neutral-50/50 dark:bg-zinc-950/20 border-y border-neutral-200/50 dark:border-neutral-900/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
          <SectionHeading
            title="คุณค่าหลักที่เรายึดถือ"
            description="ทุกขั้นตอนการบริการและการทำงานของเราอยู่ภายใต้เสาหลัก 4 ประการนี้"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-5.5 h-5.5 text-zinc-600 dark:text-zinc-300" />,
                title: "งานคุณภาพระดับพรีเมียม",
                description: "ตรวจสอบความประณีตคมชัดและรายละเอียดของสีตั้งแต่ขั้นตอนออกแบบ ไฟล์งานผลิต จนถึงการส่งมอบสินค้า",
              },
              {
                icon: <Compass className="w-5.5 h-5.5 text-zinc-600 dark:text-zinc-300" />,
                title: "นวัตกรรมล้ำสมัย",
                description: "นำเข้าเทคโนโลยีเครื่องสกรีนดิจิตอล หมึกพิมพ์กันน้ำที่เป็นมิตรต่อสิ่งแวดล้อมเพื่อประสิทธิภาพงานพิมพ์สูงสุด",
              },
              {
                icon: <UserCheck className="w-5.5 h-5.5 text-zinc-600 dark:text-zinc-300" />,
                title: "บริการด้วยความซื่อสัตย์",
                description: "เสนอราคาตรงไปตรงมา อธิบายค่าใช้จ่ายและบล็อกสกรีนอย่างชัดเจน ไม่มีค่าใช้จ่ายแอบแฝง",
              },
              {
                icon: <Flame className="w-5.5 h-5.5 text-zinc-600 dark:text-zinc-300" />,
                title: "ส่งมอบรวดเร็ว ตรงเวลา",
                description: "บริหารตารางงานอย่างแม่นยำ พร้อมบริการจัดส่งด่วนพิเศษเพื่อให้ชิ้นงานถึงมือลูกค้าทันเวลา",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-black border border-neutral-200/50 dark:border-neutral-800/80 rounded-2xl p-6 shadow-sm flex flex-col items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-zinc-900 flex items-center justify-center">
                  {value.icon}
                </div>
                <h4 className="text-base font-bold text-neutral-900 dark:text-zinc-100">
                  {value.title}
                </h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
