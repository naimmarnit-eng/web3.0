import * as React from "react";
import Link from "next/link";
import { Mail, Phone, Printer, MapPin, Clock } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800/80 dark:bg-black/60 backdrop-blur-md">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-neutral-900 dark:text-zinc-100">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-black">
                <Printer className="w-4 h-4" />
              </div>
              <span>Your Brand</span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
              บริการงานพิมพ์ครบวงจร ด้วยระบบดิจิตอลและออฟเซ็ตความละเอียดสูง รวดเร็ว ตรงเวลา ในราคาโรงงาน
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-zinc-100 uppercase tracking-wider">
              ลิงก์ด่วน
            </h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { name: "หน้าแรก", href: "/" },
                { name: "เกี่ยวกับเรา", href: "/about" },
                { name: "บริการของเรา", href: "/services" },
                { name: "คำถามที่พบบ่อย", href: "/faq" },
                { name: "ติดต่อเรา", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-zinc-100 uppercase tracking-wider">
              เวลาทำการ
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex gap-2.5 text-sm text-zinc-500 dark:text-zinc-400">
                <Clock className="w-4 h-4 shrink-0 text-zinc-400" />
                <div className="space-y-1">
                  <p className="font-medium text-neutral-800 dark:text-zinc-300">วันจันทร์ - วันเสาร์</p>
                  <p className="text-xs">08:30 น. - 17:30 น.</p>
                </div>
              </li>
              <li className="flex gap-2.5 text-sm text-zinc-500 dark:text-zinc-400">
                <Clock className="w-4 h-4 shrink-0 text-zinc-400/50" />
                <div className="space-y-1">
                  <p className="font-medium text-zinc-400 dark:text-zinc-500">วันอาทิตย์</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">ปิดทำการ</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-zinc-100 uppercase tracking-wider">
              ติดต่อเรา
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex gap-2.5 text-sm text-zinc-500 dark:text-zinc-400">
                <MapPin className="w-4.5 h-4.5 shrink-0 text-zinc-400" />
                <span className="leading-relaxed">123 ถนนเพชรเกษม แขวงบางแค เขตบางแค กรุงเทพฯ 10160</span>
              </li>
              <li className="flex gap-2.5 text-sm text-zinc-500 dark:text-zinc-400">
                <Phone className="w-4.5 h-4.5 shrink-0 text-zinc-400" />
                <a href="tel:021234567" className="hover:text-neutral-900 dark:hover:text-zinc-100 transition-colors">
                  02-123-4567
                </a>
              </li>
              <li className="flex gap-2.5 text-sm text-zinc-500 dark:text-zinc-400">
                <Mail className="w-4.5 h-4.5 shrink-0 text-zinc-400" />
                <a href="mailto:info@yourbrand.com" className="hover:text-neutral-900 dark:hover:text-zinc-100 transition-colors break-all">
                  info@yourbrand.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            &copy; {currentYear} Your Brand. สงวนลิขสิทธิ์ทั้งหมด.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-xs text-zinc-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
              นโยบายความเป็นส่วนตัว
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
