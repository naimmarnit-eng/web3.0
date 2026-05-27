"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, Phone, Printer, MapPin, Clock } from "lucide-react";
import { CookieConsent } from "./CookieConsent";
import { useLocale } from "./LocaleProvider";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { locale, t } = useLocale();

  const footerLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.services, href: "/services" },
    { name: t.nav.portfolio, href: "/portfolio" },
    { name: t.nav.blog, href: "/blog" },
    { name: t.nav.about, href: "/about" },
    { name: t.nav.faq, href: "/faq" },
    { name: t.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="w-full bg-brand-forest dark:bg-zinc-950 text-zinc-300 border-t border-brand-forest/10">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-white group">
              <div className="w-9 h-9 rounded-xl bg-brand-lime text-brand-forest flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
                <Printer className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base leading-none block text-white">ARRRGGGH</span>
                <span className="text-[9px] text-zinc-400 block mt-0.5 font-bold tracking-widest uppercase">Finishing</span>
              </div>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
              {locale === "en" 
                ? "Full-service commercial printing with high-resolution digital & offset options. On-time delivery at factory prices."
                : "บริการงานพิมพ์ครบวงจร ด้วยระบบดิจิตอลและออฟเซ็ตความละเอียดสูง รวดเร็ว ตรงเวลา ในราคาโรงงาน"}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">
              {locale === "en" ? "Quick Links" : "ลิงก์ด่วน"}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-brand-lime transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">
              {locale === "en" ? "Business Hours" : "เวลาทำการ"}
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex gap-2.5 text-xs text-zinc-400">
                <Clock className="w-4 h-4 shrink-0 text-zinc-400" />
                <div className="space-y-1">
                  <p className="font-bold text-zinc-300">
                    {locale === "en" ? "Monday - Saturday" : "วันจันทร์ - วันเสาร์"}
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    {locale === "en" ? "08:30 AM - 05:30 PM" : "08:30 น. - 17:30 น."}
                  </p>
                </div>
              </li>
              <li className="flex gap-2.5 text-xs text-zinc-400">
                <Clock className="w-4 h-4 shrink-0 text-zinc-600" />
                <div className="space-y-1">
                  <p className="font-bold text-zinc-500">
                    {locale === "en" ? "Sunday" : "วันอาทิตย์"}
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    {locale === "en" ? "Closed" : "ปิดทำการ"}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">
              {locale === "en" ? "Contact Us" : "ติดต่อเรา"}
            </h3>
            <ul className="mt-4 space-y-3 text-xs text-zinc-400">
              <li className="flex gap-2.5">
                <MapPin className="w-4.5 h-4.5 shrink-0 text-zinc-500" />
                <span className="leading-relaxed">
                  {locale === "en" 
                    ? "123 Petchkasem Road, Bang Khae, Bangkok 10160"
                    : "123 ถนนเพชรเกษม แขวงบางแค เขตบางแค กรุงเทพฯ 10160"}
                </span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="w-4.5 h-4.5 shrink-0 text-zinc-500" />
                <a href="tel:021234567" className="hover:text-brand-lime transition-colors">
                  02-123-4567
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="w-4.5 h-4.5 shrink-0 text-zinc-500" />
                <a href="mailto:info@yourbrand.com" className="hover:text-brand-lime transition-colors break-all">
                  info@yourbrand.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            &copy; {currentYear} ARRRGGGH. {locale === "en" ? "All Rights Reserved." : "สงวนลิขสิทธิ์ทั้งหมด."}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-xs text-zinc-500 hover:text-brand-lime transition-colors">
              {locale === "en" ? "Privacy Policy" : "นโยบายความเป็นส่วนตัว"}
            </Link>
          </div>
        </div>
      </div>
      <CookieConsent />
    </footer>
  );
}
