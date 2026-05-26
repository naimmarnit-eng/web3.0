"use client";

import * as React from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";

export function CookieConsent() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    // Check if consent is already saved in localStorage
    const consent = localStorage.getItem("cookie-consent-accepted");
    if (!consent) {
      // Delay presentation slightly for premium entrance feel
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie-consent-accepted", "all");
    setIsOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent-accepted", "essential");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in slide-in-from-bottom-8 duration-500 ease-out">
      <div className="bg-white/85 dark:bg-zinc-950/85 backdrop-blur-xl border border-neutral-200/60 dark:border-zinc-800/80 rounded-2xl p-5 md:p-6 shadow-2xl space-y-4 relative">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 transition-colors"
          aria-label="ปิดกล่องตอบรับคุกกี้"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-zinc-900 flex items-center justify-center shrink-0 border border-neutral-200/40 dark:border-zinc-800/50">
            <Cookie className="w-5 h-5 text-neutral-800 dark:text-zinc-300" />
          </div>
          <div className="space-y-1.5 pr-4">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-zinc-100">
              การยินยอมใช้งานคุกกี้ (Cookie Consent)
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              เราใช้คุกกี้เพื่อพัฒนาประสิทธิภาพการใช้งาน และวิเคราะห์สถิติบริการของเราให้ดียิ่งขึ้น คุณสามารถเลือกยินยอมหรือตั้งค่านโยบายได้ทุกเมื่อ 
              อ่านเพิ่มเติมใน{" "}
              <Link href="/privacy-policy" className="underline text-neutral-900 dark:text-zinc-100 hover:text-neutral-500 font-medium">
                นโยบายความเป็นส่วนตัว
              </Link>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <Button
            onClick={handleDecline}
            variant="outline"
            className="w-full h-9 text-xs border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-zinc-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-zinc-900/50 font-medium shrink-0 cursor-pointer"
          >
            ปฏิเสธคุกกี้ที่ไม่จำเป็น
          </Button>
          <Button
            onClick={handleAcceptAll}
            className="w-full h-9 text-xs bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black font-semibold rounded-lg shadow-sm cursor-pointer"
          >
            ยอมรับทั้งหมด
          </Button>
        </div>
      </div>
    </div>
  );
}
