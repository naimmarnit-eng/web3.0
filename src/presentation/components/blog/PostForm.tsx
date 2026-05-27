"use client";

import * as React from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Plus, Save } from "lucide-react";

import { createPostSchema, type CreatePostInput } from "@/application/dto/post.dto";
import { createPostAction, updatePostAction } from "@/presentation/actions/blog.actions";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Textarea } from "@/presentation/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/presentation/components/ui/form";
import { sanitize } from "@/shared/utils/sanitize";
import { SingleImageUploader } from "./SingleImageUploader";

// Dynamically import the TiptapEditor to reduce bundle size and prevent SSR issues
const TiptapEditor = dynamic(() => import("./TiptapEditor"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-48 bg-neutral-100 dark:bg-zinc-900 animate-pulse rounded-lg flex items-center justify-center text-sm text-zinc-400">
      กำลังโหลดเครื่องมือแก้ไขข้อความ...
    </div>
  ),
});

interface PostFormProps {
  initialValues?: {
    id: string;
    title: string;
    excerpt?: string | null;
    content: string;
    coverImage?: string | null;
    category?: string | null;
    status: "DRAFT" | "PUBLISHED";
    publishedAt?: Date | string | null;
  };
}

export function PostForm({ initialValues }: PostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const isEdit = !!initialValues;

  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema) as unknown as Resolver<CreatePostInput>,
    defaultValues: {
      title: initialValues?.title || "",
      excerpt: initialValues?.excerpt || "",
      content: initialValues?.content || "",
      coverImage: initialValues?.coverImage || "",
      category: initialValues?.category || "",
      tags: [],
      status: initialValues?.status || "DRAFT",
      publishedAt: initialValues?.publishedAt
        ? (() => {
            const d = new Date(initialValues.publishedAt);
            const tzoffset = d.getTimezoneOffset() * 60000;
            return new Date(d.getTime() - tzoffset).toISOString().slice(0, 16);
          })()
        : "",
    },
  });

  const onSubmit = (data: CreatePostInput) => {
    startTransition(async () => {
      // Security: Sanitize HTML content before sending to the backend Server Action
      const cleanContent = sanitize(data.content);
      const submissionData = { ...data, content: cleanContent };

      let res;
      if (isEdit && initialValues) {
        res = await updatePostAction({ ...submissionData, id: initialValues.id });
      } else {
        res = await createPostAction(submissionData);
      }

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success(isEdit ? "บันทึกข้อมูลบทความเสร็จสิ้น" : "สร้างบทความเสร็จสิ้น");
      router.push("/admin/blog");
      router.refresh();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Areas */}
          <div className="lg:col-span-2 space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-sm">หัวข้อบทความ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="เช่น แนะนำเทคนิคการเลือกสกรีนเสื้อยืดทีมกีฬา..."
                      className="h-11 bg-white dark:bg-zinc-950/40 border-neutral-200 dark:border-neutral-800"
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-sm">เนื้อหาบทความ (Rich Text)</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-sm">บทคัดย่อ / คำโปรย (Excerpt)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="อธิบายสรุปย่อสั้นๆ สำหรับแสดงหน้าแสดงรายการบทความ..."
                      rows={3}
                      className="bg-white dark:bg-zinc-950/40 border-neutral-200 dark:border-neutral-800 resize-none"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-[11px] text-zinc-400">
                    คำสรุปสั้นๆ สูงสุด 500 ตัวอักษร
                  </FormDescription>
                  <FormMessage className="text-xs text-destructive" />
                </FormItem>
              )}
            />
          </div>

          {/* Sidebar / Meta configurations */}
          <div className="space-y-6">
            <div className="border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-zinc-950/20 rounded-xl p-5 space-y-5">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-zinc-200 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                การตั้งค่าบทความ
              </h3>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-xs uppercase tracking-wider text-neutral-800 dark:text-zinc-300">
                      สถานะบทความ
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white dark:bg-zinc-900 border-neutral-200 dark:border-neutral-800 h-10">
                          <SelectValue placeholder="เลือกสถานะ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white dark:bg-zinc-900 border-neutral-200 dark:border-neutral-800">
                        <SelectItem value="DRAFT">ฉบับร่าง (Draft)</SelectItem>
                        <SelectItem value="PUBLISHED">เผยแพร่สาธารณะ (Published)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="publishedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-xs uppercase tracking-wider text-neutral-800 dark:text-zinc-300">
                      วันที่เผยแพร่ (กำหนดเวลาได้)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        className="bg-white dark:bg-zinc-900 border-neutral-200 dark:border-neutral-800 h-10 text-xs"
                        disabled={isPending}
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription className="text-[10px] text-zinc-400">
                      ปล่อยว่างเพื่อเผยแพร่ทันที หรือระบุเวลาล่วงหน้าเพื่อตั้งเวลาเผยแพร่
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-xs uppercase tracking-wider text-neutral-800 dark:text-zinc-300">
                      หมวดหมู่บทความ
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="เช่น ความรู้เรื่องสกรีน, เทคโนโลยี"
                        className="bg-white dark:bg-zinc-900 border-neutral-200 dark:border-neutral-800 h-10"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-xs uppercase tracking-wider text-neutral-800 dark:text-zinc-300">
                      รูปภาพปกบทความ (Cover Image)
                    </FormLabel>
                    <FormControl>
                      <SingleImageUploader
                        value={field.value || ""}
                        onChange={field.onChange}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-11 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-sm mt-4"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    กำลังบันทึกข้อมูล...
                  </>
                ) : isEdit ? (
                  <>
                    <Save className="w-4.5 h-4.5" />
                    บันทึกการแก้ไข
                  </>
                ) : (
                  <>
                    <Plus className="w-4.5 h-4.5" />
                    สร้างบทความ
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
