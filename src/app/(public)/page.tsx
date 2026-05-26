import * as React from "react";
import Link from "next/link";
import {
  Printer,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  PhoneCall,
  Calendar,
} from "lucide-react";

import { services } from "@/shared/constants/service";
import { Button } from "@/presentation/components/ui/button";
import { SectionHeading } from "@/presentation/components/shared/SectionHeading";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Hero Section */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden flex items-center justify-center bg-gradient-to-b from-neutral-100/60 via-white to-white dark:from-zinc-950 dark:via-zinc-900/40 dark:to-black">
        {/* Subtle decorative mesh background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neutral-300/10 dark:bg-zinc-800/10 rounded-full blur-3xl -z-10" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10 space-y-8">
          <div className="mx-auto max-w-fit px-3 py-1 bg-neutral-900/5 dark:bg-zinc-100/5 border border-neutral-200/50 dark:border-neutral-800/50 rounded-full flex items-center gap-1.5 shadow-sm text-xs font-semibold text-neutral-800 dark:text-zinc-300 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
            <span>บริการงานพิมพ์ครบวงจร ในราคาโรงงาน</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-zinc-100 sm:text-6xl max-w-4xl mx-auto leading-[1.15]">
            สร้างความประทับใจให้ธุรกิจของคุณ ด้วยสิ่งพิมพ์คุณภาพสูง
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            เรารับผลิตและออกแบบเสื้อผ้าพิมพ์ลาย งานสกรีนเสื้อ พิมพ์กล่องบรรจุภัณฑ์ โบรชัวร์ นามบัตร และสื่อการตลาดครบวงจร สีสดคมชัด รวดเร็ว ทันใจ
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              asChild
              className="w-full sm:w-auto h-12 px-6 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Link href="/contact">
                <span>ติดต่อขอใบเสนอราคา</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto h-12 px-6 border-neutral-300/80 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-black/50 dark:hover:bg-zinc-900 text-neutral-800 dark:text-zinc-300 font-semibold rounded-xl transition-all"
            >
              <Link href="/services">ดูบริการทั้งหมด</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Featured Services Section */}
      <section className="w-full py-20 bg-white dark:bg-black border-t border-neutral-100 dark:border-neutral-900/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
          <SectionHeading
            title="บริการยอดนิยมของเรา"
            description="เรามีโซลูชันงานพิมพ์ครบถ้วนครอบคลุมทุกความต้องการด้านสื่อการตลาดและสิ่งสิ่งพิมพ์เพื่อผลลัพธ์ที่ดีที่สุด"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service, idx) => (
              <div
                key={service.slug}
                className="group relative flex flex-col justify-between border border-neutral-200/60 hover:border-neutral-300 dark:border-zinc-800/80 dark:hover:border-zinc-700 bg-neutral-50/40 dark:bg-zinc-950/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900/5 dark:bg-zinc-100/5 flex items-center justify-center text-neutral-800 dark:text-zinc-300 font-bold group-hover:scale-105 transition-transform">
                    {idx === 0 ? <Printer className="w-5 h-5" /> : idx === 1 ? <Sparkles className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-zinc-100">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-neutral-200/50 dark:border-zinc-800/60 flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm font-semibold text-neutral-800 dark:text-zinc-300 flex items-center gap-1 group-hover:gap-1.5 transition-all"
                  >
                    <span>อ่านรายละเอียด</span>
                    <ArrowRight className="w-4 h-4 text-zinc-400" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-neutral-950 hover:underline dark:text-zinc-200"
            >
              <span>ดูบริการด้านการพิมพ์ทั้งหมด</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Unique Selling Points Section */}
      <section className="w-full py-20 bg-neutral-50/50 dark:bg-zinc-950/20 border-t border-neutral-200/50 dark:border-neutral-900/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
          <SectionHeading
            title="ทำไมต้องเลือกเรา?"
            description="เราพร้อมส่งมอบสิ่งสิ่งพิมพ์ที่คุ้มค่า คมชัด ได้มาตรฐานเพื่อส่งเสริมภาพลักษณ์ธุรกิจของคุณให้เติบโต"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />,
                title: "คุณภาพมาตรฐานโรงงาน",
                description:
                  "เราควบคุมมาตรฐานการพิมพ์และใช้หมึกพิมพ์คุณภาพเกรดพรีเมียม ผ่านการตรวจสอบความละเอียดและความเพี้ยนสีทุกชิ้นงาน",
              },
              {
                icon: <Zap className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />,
                title: "ผลิตด่วน รวดเร็ว ตรงเวลา",
                description:
                  "ด้วยระบบเครื่องจักรอันทันสมัย ทำให้เราสามารถจัดการกระบวนการทำงานได้อย่างกระชับ มั่นใจได้ว่าส่งมอบชิ้นงานได้ทันกำหนด",
              },
              {
                icon: <Calendar className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />,
                title: "สั่งสะดวก ไม่มีขั้นต่ำ",
                description:
                  "รองรับการผลิตสำหรับทั้งร้านค้ารายย่อย (DTG/DFT ไม่มีขั้นต่ำ) ไปจนถึงคำสั่งซื้อปริมาณมากสำหรับแบรนด์และองค์กรชั้นนำ",
              },
            ].map((usp, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 bg-white dark:bg-black border border-neutral-200/50 dark:border-neutral-800/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-neutral-100 dark:bg-zinc-900 rounded-xl flex items-center justify-center mb-5">
                  {usp.icon}
                </div>
                <h4 className="text-lg font-bold text-neutral-900 dark:text-zinc-100 mb-3">
                  {usp.title}
                </h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
                  {usp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Call-To-Action (CTA) Section */}
      <section className="w-full py-16 bg-neutral-900 dark:bg-zinc-950 text-white relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-transparent to-transparent opacity-50 dark:from-zinc-900" />
        <div className="mx-auto max-w-5xl px-6 text-center relative z-10 space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            พร้อมเริ่มต้นโครงการงานพิมพ์ของคุณแล้วหรือยัง?
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            ปรึกษาฝ่ายผู้เชี่ยวชาญด้านงานพิมพ์ ออกแบบโครงสร้างกล่อง หรือคำนวณราคาบล็อกสกรีนฟรี ไม่มีค่าใช้จ่ายแอบแฝง
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              asChild
              className="w-full sm:w-auto h-11 px-5 bg-white hover:bg-neutral-100 text-neutral-900 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black font-semibold rounded-lg flex items-center gap-2"
            >
              <Link href="/contact">
                <span>ติดต่อผู้ดูแล</span>
                <PhoneCall className="w-4 h-4" />
              </Link>
            </Button>
            <a
              href="tel:021234567"
              className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors"
            >
              หรือโทรด่วน: 02-123-4567
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
