import * as React from "react";
import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

import { SectionHeading } from "@/presentation/components/shared/SectionHeading";
import { Button } from "@/presentation/components/ui/button";
import { ContactForm } from "@/presentation/components/contact/ContactForm";
import { getLocale, getTranslations } from "@/shared/locales";

export const metadata: Metadata = {
  title: "ติดต่อเรา | Contact Us",
  description: "ติดต่อเพื่อขอรับบริการงานพิมพ์สกรีน เสื้อยืด นามบัตร หรือโบรชัวร์ สอบถามราคาและที่ตั้งโรงพิมพ์ได้สะดวกที่นี่",
};

export default async function ContactPage() {
  const locale = await getLocale();
  const t = await getTranslations();

  return (
    <div className="w-full py-16 md:py-24 bg-white dark:bg-black space-y-16">
      {/* 1. Heading */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title={t.contact.title}
          description={t.contact.subtitle}
        />
      </div>

      {/* 2. Grid Sections */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details & Info Card */}
          <div className="space-y-8">
            <div className="border border-neutral-200/60 dark:border-zinc-800/80 bg-neutral-50/40 dark:bg-zinc-950/20 rounded-2xl p-6 md:p-8 space-y-6">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-zinc-100">
                {locale === "en" ? "Factory Contact Information" : "ข้อมูลการติดต่อโรงพิมพ์"}
              </h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-900 border border-neutral-200/50 dark:border-neutral-800/80 flex items-center justify-center shrink-0">
                    <MapPin className="w-4.5 h-4.5 text-zinc-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-zinc-300">
                      {locale === "en" ? "Studio Address" : "ที่ตั้งสำนักงาน"}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {locale === "en" 
                        ? "123 Petchkasem Road, Bang Khae, Bangkok 10160, Thailand"
                        : "123 ถนนเพชรเกษม แขวงบางแค เขตบางแค กรุงเทพฯ 10160"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-900 border border-neutral-200/50 dark:border-neutral-800/80 flex items-center justify-center shrink-0">
                    <Phone className="w-4.5 h-4.5 text-zinc-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-zinc-300">
                      {locale === "en" ? "Sales Hotline" : "เบอร์โทรศัพท์ติดต่อ"}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      <a href="tel:021234567" className="hover:text-neutral-900 dark:hover:text-zinc-100 transition-colors">
                        02-123-4567
                      </a> {locale === "en" ? "(Hotline)" : "(สายด่วน)"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-900 border border-neutral-200/50 dark:border-neutral-800/80 flex items-center justify-center shrink-0">
                    <Mail className="w-4.5 h-4.5 text-zinc-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-zinc-300">
                      {locale === "en" ? "Service Email" : "อีเมลแผนกบริการ"}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      <a href="mailto:info@yourbrand.com" className="hover:text-neutral-900 dark:hover:text-zinc-100 transition-colors">
                        info@yourbrand.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-900 border border-neutral-200/50 dark:border-neutral-800/80 flex items-center justify-center shrink-0">
                    <Clock className="w-4.5 h-4.5 text-zinc-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-zinc-300">
                      {locale === "en" ? "Business Working Hours" : "วันและเวลาเปิดทำการ"}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {locale === "en" 
                        ? "Monday - Saturday: 08:30 AM - 05:30 PM (Closed on Sundays)"
                        : "วันจันทร์ - วันเสาร์: 08:30 น. - 17:30 น. (หยุดวันอาทิตย์)"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-200/60 dark:border-zinc-800/80 flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  className="bg-[#06C755] hover:bg-[#05b04b] text-white font-semibold rounded-lg flex items-center justify-center gap-1.5 h-10 px-5 shadow-sm"
                >
                  <a href="https://line.me" target="_blank" rel="noopener noreferrer">
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-4.5 h-4.5 fill-current shrink-0" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24 10.3c0-4.6-5.4-8.3-12-8.3S0 5.7 0 10.3c0 4.1 4.3 7.6 10.1 8.2.4.1.9.4.8.9l-.3 1.9c-.1.6.2.7.6.4l2.7-2.4c2.2-.2 4.1-1.3 5.4-3.1 3-1.6 4.7-3.6 4.7-5.9zM7.3 12.3H5.6c-.3 0-.5-.2-.5-.5V8.2c0-.3.2-.5.5-.5h.6c.3 0 .5.2.5.5v3.1h1.1c.3 0 .5.2.5.5v.5c0 .3-.2.5-.5.5zm2.7-.5c0 .3-.2.5-.5.5h-.6c-.3 0-.5-.2-.5-.5V8.2c0-.3.2-.5.5-.5h.6c.3 0 .5.2.5.5v3.6zm5.4.5h-1.7c-.3 0-.5-.2-.5-.5V8.2c0-.3.2-.5.5-.5h.6c.3 0 .5.2.5.5v2.8l1.3-2.9c.1-.2.3-.4.6-.4h.6c.4 0 .6.4.4.7l-1.3 2.7 1.4 3.1c.2.4-.1.7-.5.7h-.6c-.3 0-.5-.2-.6-.4l-1.2-2.9v2.4c0 .3-.2.5-.5.5zm4.2 0h-1.7c-.3 0-.5-.2-.5-.5V8.2c0-.3.2-.5.5-.5h1.7c.3 0 .5.2.5.5v.5c0 .3-.2.5-.5.5h-1.1v.6h1.1c.3 0 .5.2.5.5v.5c0 .3-.2.5-.5.5h-1.1v.7h1.1c.3 0 .5.2.5.5v.5c0 .3-.2.5-.5.5z" />
                    </svg>
                    <span>{locale === "en" ? "Add LINE" : "แอดไลน์"}</span>
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-10 px-5 border-neutral-300 dark:border-neutral-800 font-semibold text-neutral-800 dark:text-zinc-300 rounded-lg"
                >
                  <a href="tel:021234567">{locale === "en" ? "Call Sales Team" : "โทรด่วนฝ่ายขาย"}</a>
                </Button>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="w-full h-72 border border-neutral-200/60 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm relative">
              <iframe
                title="Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15505.748364893796!2d100.4075191285223!3d13.709923835824535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29623e1f0e123%3A0x123456789abcdef!2sBang%20Kae%2C%20Bangkok!5e0!3m2!1sen!2sth!4v1700000000000!5m2!1sen!2sth"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>

          {/* Interactive Form Component */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
