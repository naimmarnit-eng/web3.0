import * as React from "react";
import type { Metadata } from "next";

import { SectionHeading } from "@/presentation/components/shared/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/presentation/components/ui/accordion";

export const metadata: Metadata = {
  title: "คำถามที่พบบ่อย (FAQ)",
  description: "รวบรวมคำถามที่พบบ่อยเกี่ยวกับการสกรีนเสื้อ งานพิมพ์ออฟเซ็ต กล่องบรรจุภัณฑ์ ยอดสั่งผลิตขั้นต่ำ และเวลาในการจัดส่ง",
};

export default function FAQPage() {
  const faqs = [
    {
      question: "มียอดสั่งสกรีนเสื้อขั้นต่ำหรือไม่?",
      answer: "หากพิมพ์ด้วยระบบดิจิตอล DTG หรือ DFT เราไม่มีข้อกำหนดขั้นต่ำครับ ลูกค้าสามารถสั่งสกรีนเสื้อเพียง 1 ตัวได้เลย แต่หากเป็นการสกรีนบล็อกสีทั่วไป แนะนำเริ่มต้นที่ 30-50 ตัวขึ้นไป เพื่อเฉลี่ยค่าจัดทำบล็อกสกรีนให้ราคาต่อตัวคุ้มค่าที่สุดครับ",
    },
    {
      question: "ใช้ระยะเวลาในการผลิตและพิมพ์นานเท่าไหร่?",
      answer: "โดยทั่วไปงานพิมพ์สกรีนหรืองานพิมพ์ดิจิตอลจำนวนไม่เกิน 100 ชิ้น จะใช้ระยะเวลาผลิตประมาณ 5-7 วันทำการครับ หากเป็นงานผลิตกล่องบรรจุภัณฑ์หรืองานพิมพ์ออฟเซ็ตปริมาณมาก จะใช้เวลาผลิตประมาณ 7-14 วันหลังสรุปไฟล์งานและตัวอย่างสำเร็จรูป ทั้งนี้ขึ้นอยู่กับคิวงาน ณ ขณะนั้นด้วยครับ",
    },
    {
      question: "ต้องเตรียมไฟล์งานอย่างไรสำหรับการพิมพ์สกรีน?",
      answer: "เพื่อความคมชัดสูงสุดในการสกรีนและการพิมพ์ แนะนำเป็นไฟล์เวกเตอร์ (Vector) เช่น .AI, .EPS, .PDF หรือหากเป็นไฟล์รูปภาพปกติ (เช่น ภาพวาด ลายกราฟิกแบบภาพถ่าย) แนะนำเป็นไฟล์ .PNG หรือ .PSD ที่มีความละเอียดภาพไม่ต่ำกว่า 300 DPI และตัดพื้นหลังออกเรียบร้อยแล้วครับ",
    },
    {
      question: "มีบริการออกแบบลวดลายหรือขึ้นรูปโครงสร้างกล่องให้ก่อนหรือไม่?",
      answer: "ทางเรามีบริการประเมินสัดส่วนและจัดทำ Mock-up แบบจำลองโครงสร้างกล่องให้ลูกค้าได้ตรวจสอบก่อนเริ่มพิมพ์จริงครับ สำหรับงานพิมพ์เสื้อยืด ลูกค้าสามารถส่งแบบอ้างอิงเพื่อให้ทีมกราฟิกช่วยตรวจไฟล์และปรับแต่งระยะให้อย่างสมบูรณ์ฟรีไม่มีค่าใช้จ่ายเพิ่มเติมครับ",
    },
    {
      question: "มีบริการจัดส่งสิ่งพิมพ์อย่างไร?",
      answer: "เรามีบริการจัดส่งผ่านขนส่งเอกชนชั้นนำทั่วประเทศ (เช่น Kerry Express, Flash, J&T) สำหรับพื้นที่กรุงเทพฯ และปริมณฑลที่ต้องการงานด่วน สามารถเรียกบริการส่งแมสเซนเจอร์ (Lalamove, Grab) ด่วนพิเศษได้โดยคิดค่าจัดส่งตามระยะทางจริงครับ",
    },
  ];

  return (
    <div className="w-full py-16 md:py-24 bg-white dark:bg-black space-y-16">
      {/* Heading */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="คำถามที่พบบ่อย"
          description="รวบรวมข้อสงสัยและคำตอบยอดนิยมเกี่ยวกับระบบงานพิมพ์สกรีน บล็อกสี และขั้นตอนการผลิตสิ่งพิมพ์สำเร็จรูปเพื่อช่วยให้คุณวางแผนสั่งผลิตได้ง่ายขึ้น"
        />
      </div>

      {/* Accordion Questions */}
      <div className="mx-auto max-w-3xl px-6">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-neutral-200/60 dark:border-zinc-800/80 rounded-xl px-5 hover:border-neutral-300 dark:hover:border-zinc-700 transition-colors bg-neutral-50/10"
            >
              <AccordionTrigger className="text-left font-bold text-base py-4 text-neutral-900 hover:no-underline dark:text-zinc-150">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
