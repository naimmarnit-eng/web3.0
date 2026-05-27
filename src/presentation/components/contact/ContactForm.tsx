"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

import { createContactSchema, type CreateContactInput } from "@/application/dto/contact.dto";
import { createInquiryAction } from "@/presentation/actions/contact.actions";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { useLocale } from "@/presentation/components/shared/LocaleProvider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/presentation/components/ui/form";

export function ContactForm() {
  const [isPending, startTransition] = React.useTransition();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [website, setWebsite] = React.useState(""); // Honeypot state for spam bot detection
  const { locale, t } = useLocale();

  const form = useForm<CreateContactInput>({
    resolver: zodResolver(createContactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: CreateContactInput) => {
    const submissionData = {
      name: data.name,
      phone: data.phone || null,
      email: data.email || null,
      message: data.message,
      website: website, // Pass honeypot input value
    };

    startTransition(async () => {
      const res = await createInquiryAction(submissionData);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success(locale === "en" ? "Message sent successfully!" : "ส่งข้อมูลการติดต่อสำเร็จ เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด");
      setIsSuccess(true);
      setWebsite(""); // Clear honeypot
      form.reset();
    });
  };

  if (isSuccess) {
    return (
      <div className="border border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-black rounded-2xl p-8 text-center space-y-6 shadow-sm flex flex-col items-center justify-center min-h-[400px] animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/50">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-zinc-100">
            {locale === "en" ? "Message Sent Successfully!" : "ส่งข้อมูลติดต่อเรียบร้อยแล้ว!"}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
            {locale === "en" 
              ? "Thank you for contacting us. Our sales specialists will inspect the details and get back to you shortly."
              : "ขอบคุณสำหรับการติดต่อเรา เจ้าหน้าที่ฝ่ายบริการลูกค้ากำลังตรวจสอบรายละเอียด และจะติดต่อคุณกลับโดยเร็วที่สุด"}
          </p>
        </div>
        <Button
          onClick={() => setIsSuccess(false)}
          className="bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black font-semibold rounded-lg px-6 shadow-sm"
        >
          {locale === "en" ? "Send Another Message" : "ส่งข้อความใหม่อีกครั้ง"}
        </Button>
      </div>
    );
  }

  return (
    <div className="border border-neutral-200/60 dark:border-zinc-800/80 bg-white dark:bg-black rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
      <div className="space-y-1.5">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-zinc-100">
          {locale === "en" ? "Inquiry Form" : "ส่งข้อความสอบถาม"}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {locale === "en" 
            ? "To receive a price quote, please specify size details, count, and print techniques below."
            : "หากต้องการให้ประเมินราคา กรุณากรอกรายละเอียดสินค้า ขนาด และจำนวนพิมพ์ที่สนใจ"}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Honeypot field - completely invisible to human users but filled by automated spam bots */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Leave this field blank</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-800 dark:text-zinc-300">
                    {t.contact.nameLabel} <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.contact.namePlaceholder}
                      className="h-10.5 border-neutral-200 dark:border-zinc-800 bg-neutral-50/20 dark:bg-zinc-950/20 focus-visible:ring-1 focus-visible:ring-neutral-400 text-xs"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-800 dark:text-zinc-300">
                    {t.contact.phoneLabel}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.contact.phonePlaceholder}
                      className="h-10.5 border-neutral-200 dark:border-zinc-800 bg-neutral-50/20 dark:bg-zinc-950/20 focus-visible:ring-1 focus-visible:ring-neutral-400 text-xs"
                      disabled={isPending}
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-destructive" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-800 dark:text-zinc-300">
                  {t.contact.emailLabel}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t.contact.emailPlaceholder}
                    type="email"
                    className="h-10.5 border-neutral-200 dark:border-zinc-800 bg-neutral-50/20 dark:bg-zinc-950/20 focus-visible:ring-1 focus-visible:ring-neutral-400 text-xs"
                    disabled={isPending}
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-semibold uppercase tracking-wider text-neutral-800 dark:text-zinc-300">
                  {locale === "en" ? "Inquiry / Custom Specs" : "รายละเอียดที่สนใจสอบถาม / งานพิมพ์"} <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <textarea
                    placeholder={t.contact.messagePlaceholder}
                    rows={5}
                    className="w-full rounded-lg border border-neutral-200 dark:border-zinc-800 bg-neutral-50/20 dark:bg-zinc-950/20 px-3.5 py-2.5 text-xs outline-ring/50 focus-visible:ring-1 focus-visible:ring-neutral-400 resize-none text-neutral-900 dark:text-zinc-100"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-11 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{locale === "en" ? "Submitting..." : "กำลังส่งข้อมูล..."}</span>
              </>
            ) : (
              <>
                <span>{t.contact.submitBtn}</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
