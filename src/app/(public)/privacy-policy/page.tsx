import * as React from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/presentation/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว",
  description: "นโยบายความเป็นส่วนตัวและแนวทางการคุ้มครองข้อมูลส่วนบุคคล (PDPA) ของโรงพิมพ์เราในการจัดเก็บข้อมูลผู้ติดต่อ",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full py-16 md:py-24 bg-white dark:bg-black space-y-16">
      {/* Heading */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="นโยบายความเป็นส่วนตัว"
          description="การคุ้มครองข้อมูลส่วนบุคคล (PDPA) และสิทธิ์การใช้งานข้อมูลของคุณบนเว็บไซต์ของเรา"
        />
      </div>

      {/* Policy Text Content */}
      <div className="mx-auto max-w-3xl px-6 text-neutral-800 dark:text-zinc-300 space-y-8 leading-relaxed">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-zinc-150">
            1. บทนำและการเก็บรวบรวมข้อมูล
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            เราให้ความสำคัญกับความเป็นส่วนตัวของข้อมูลผู้ติดต่ออย่างสูงสุด นโยบายฉบับนี้มีวัตถุประสงค์เพื่อชี้แจงขั้นตอนการเก็บรวบรวมข้อมูลส่วนบุคคล การกรอกฟอร์มติดต่อสอบถามเพื่อประเมินราคาสิ่งพิมพ์ การจัดสเปกสกรีนเสื้อ ตลอดจนการปกป้องสิทธิ์ผู้ใช้บริการตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-zinc-150">
            2. ข้อมูลส่วนบุคคลที่เราจัดเก็บ
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            เมื่อคุณทำการกรอกข้อมูลลงบนฟอร์มการติดต่อในหน้าเว็บไซต์ หรือขอรับการประเมินราคา เราจะทำการขออนุญาตและบันทึกข้อมูลดังต่อไปนี้:
          </p>
          <ul className="list-disc pl-5 text-sm text-zinc-500 dark:text-zinc-400 space-y-1">
            <li>ชื่อ-นามสกุล หรือชื่อบริษัท/องค์กรผู้จ้างงาน</li>
            <li>เบอร์โทรศัพท์ติดต่อและอีเมลสำหรับติดต่อกลับ</li>
            <li>รายละเอียดสเปกงานพิมพ์ ลายสกรีน ขนาดผ้า และจำนวนผลิต</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-zinc-150">
            3. วัตถุประสงค์ในการนำข้อมูลไปใช้งาน
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            ข้อมูลส่วนบุคคลที่ได้รับการเก็บรวบรวมจะถูกนำมาใช้งานเฉพาะในขอบเขตการทำงานดังต่อไปนี้เท่านั้น:
          </p>
          <ul className="list-disc pl-5 text-sm text-zinc-500 dark:text-zinc-400 space-y-1">
            <li>เพื่อจัดทำใบเสนอราคา ประเมินราคาบล็อกสกรีน และค่าขนส่งสิ่งพิมพ์</li>
            <li>เพื่อติดต่อกลับในการแก้ไขปรับปรุงไฟล์งานสเปกสกรีนของลูกค้า</li>
            <li>เพื่อประสานงานจัดส่งและยืนยันการผลิตสิ่งพิมพ์</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-zinc-150">
            4. สิทธิ์ของเจ้าของข้อมูลส่วนบุคคล
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            ตามสิทธิ์ภายใต้ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) คุณมีสิทธิ์ที่จะขอเข้าถึงข้อมูลส่วนบุคคลที่เราจัดเก็บไว้ ขอยกเลิกความยินยอมในการจัดเก็บ ตลอดจนขอปรับปรุงแก้ไข หรือขอให้ลบทำลายข้อมูลของคุณออกจากฐานระบบของเราได้ทุกเมื่อ โดยสามารถแจ้งความประสงค์ผ่านเจ้าหน้าที่แผนกบริการทางอีเมลหรือหมายเลขโทรศัพท์หลักของบริษัท
          </p>
        </div>
      </div>
    </div>
  );
}
