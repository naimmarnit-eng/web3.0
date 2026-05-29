"use client";

import * as React from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Plus, Save } from "lucide-react";

import { createProjectSchema, type CreateProjectInput } from "@/application/dto/project.dto";
import { createProjectAction, updateProjectAction } from "@/presentation/actions/portfolio.actions";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { ImageUploader } from "./ImageUploader";
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

// Dynamically import the TiptapEditor to reduce bundle size and prevent SSR hydration issues
const TiptapEditor = dynamic(() => import("../blog/TiptapEditor"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-48 bg-neutral-100 dark:bg-zinc-900 animate-pulse rounded-lg flex items-center justify-center text-sm text-zinc-400">
      กำลังโหลดเครื่องมือแก้ไขข้อความ...
    </div>
  ),
});

interface ProjectFormProps {
  initialValues?: {
    id: string;
    title: string;
    description: string;
    client?: string | null;
    category?: string | null;
    images: string[];
    coverImage?: string | null;
    date?: Date | null;
    status: "DRAFT" | "PUBLISHED";
  };
}

export function ProjectForm({ initialValues }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const isEdit = !!initialValues;

  // Safely fallback and parse array images if serialized from driver
  let parsedImages: string[] = [];
  if (initialValues?.images) {
    if (typeof initialValues.images === "string") {
      try {
        parsedImages = JSON.parse(initialValues.images);
      } catch (e) {
        parsedImages = [];
      }
    } else if (Array.isArray(initialValues.images)) {
      parsedImages = initialValues.images;
    }
  }

  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema) as unknown as Resolver<CreateProjectInput>,
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      client: initialValues?.client || "",
      category: initialValues?.category || "",
      images: parsedImages,
      coverImage: initialValues?.coverImage || "",
      date: initialValues?.date ? new Date(initialValues.date).toISOString().substring(0, 10) : "",
      status: initialValues?.status || "DRAFT",
    },
  });

  const onSubmit = (data: CreateProjectInput) => {
    startTransition(async () => {
      // UX Logic: Automatically set coverImage to the first image in gallery
      const images = data.images || [];
      const coverImage = images.length > 0 ? images[0] : null;
      const cleanDescription = sanitize(data.description);
      const submissionData = { ...data, coverImage, images, description: cleanDescription };

      let res;
      if (isEdit && initialValues) {
        res = await updateProjectAction({ ...submissionData, id: initialValues.id });
      } else {
        res = await createProjectAction(submissionData);
      }

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success(isEdit ? "บันทึกข้อมูลผลงานเสร็จสิ้น" : "สร้างผลงานเสร็จสิ้น");
      router.push("/admin/portfolio");
      router.refresh();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content inputs */}
          <div className="lg:col-span-2 space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-sm">หัวข้อผลงาน</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="เช่น เสื้อโปโลพิมพ์ลายทีมสโมสรฟุตบอล..."
                      className="h-11 bg-white dark:bg-zinc-950/40 border-neutral-200 dark:border-neutral-800"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-sm">รายละเอียดผลงาน (Rich Text)</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-destructive" />
                </FormItem>
              )}
            />

            {/* Gallery Images Uploader Section */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-sm">แกลเลอรีรูปภาพผลงาน</FormLabel>
                  <FormControl>
                    <ImageUploader
                      value={field.value || []}
                      onChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription className="text-[11px] text-zinc-400 mt-1">
                    อัปโหลดรูปภาพตัวอย่างชิ้นงานจริงได้หลายรูป รูปภาพแรกจะถูกตั้งเป็นภาพหน้าปกของผลงานโดยอัตโนมัติ
                  </FormDescription>
                  <FormMessage className="text-xs text-destructive" />
                </FormItem>
              )}
            />
          </div>

          {/* Sidebar Metadata configurations */}
          <div className="space-y-6">
            <div className="border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-zinc-950/20 rounded-xl p-5 space-y-5">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-zinc-200 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                การตั้งค่าข้อมูลผลงาน
              </h3>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-xs uppercase tracking-wider text-neutral-800 dark:text-zinc-300">
                      สถานะผลงาน
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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-xs uppercase tracking-wider text-neutral-800 dark:text-zinc-300">
                      หมวดหมู่ประเภทงาน
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="เช่น เสื้อโปโล, สกรีนเสื้อยืด, กล่องบรรจุภัณฑ์"
                        className="bg-white dark:bg-zinc-900 border-neutral-200 dark:border-neutral-800 h-10"
                        disabled={isPending}
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-xs uppercase tracking-wider text-neutral-800 dark:text-zinc-300">
                      ชื่อลูกค้า / แบรนด์ (Client)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="เช่น บจก. พลัสพริ้นท์ติ้ง"
                        className="bg-white dark:bg-zinc-900 border-neutral-200 dark:border-neutral-800 h-10"
                        disabled={isPending}
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-xs uppercase tracking-wider text-neutral-800 dark:text-zinc-300">
                      วันที่ดำเนินงานผลิต
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="bg-white dark:bg-zinc-900 border-neutral-200 dark:border-neutral-800 h-10"
                        disabled={isPending}
                        {...field}
                        value={field.value || ""}
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
                    บันทึกผลงานใหม่
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
