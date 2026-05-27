"use client";

import * as React from "react";
import { Upload, X, Loader2, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

import { uploadImagesAction } from "@/presentation/actions/portfolio.actions";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";

interface SingleImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export function SingleImageUploader({ value = "", onChange, disabled }: SingleImageUploaderProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    await uploadFile(files[0]);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("files", file);

      const res = await uploadImagesAction(formData);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      if (res?.urls && res.urls.length > 0) {
        onChange(res.urls[0]);
        toast.success("อัปโหลดรูปภาพสำเร็จ");
      }
    } catch (error) {
      console.error(error);
      toast.error("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled || isUploading) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await uploadFile(files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload box or Image preview */}
      {value ? (
        <div className="group relative aspect-video rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-zinc-900 shadow-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Cover preview"
            className="w-full h-full object-cover transition-transform group-hover:scale-103 duration-300"
          />

          {!disabled && (
            <Button
              type="button"
              onClick={() => onChange("")}
              variant="destructive"
              size="icon"
              className="absolute top-3 right-3 w-8 h-8 rounded-xl opacity-90 hover:opacity-100 shadow-md"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      ) : (
        <div
          onDragOver={onDragOver}
          onDrop={onDrop}
          onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all
            ${isUploading ? "bg-neutral-50 dark:bg-zinc-900/10 border-neutral-300 dark:border-neutral-700 pointer-events-none" : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-zinc-700 hover:bg-neutral-50/50 dark:hover:bg-zinc-900/10"}
          `}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            disabled={disabled || isUploading}
          />

          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
              <p className="text-xs font-semibold text-zinc-500">กำลังอัปโหลดรูปภาพ...</p>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-900 dark:text-zinc-150">
                  ลากรูปภาพปกมาวางที่นี่ หรือคลิกเพื่ออัปโหลดไฟล์
                </p>
                <p className="text-[10px] text-zinc-400 mt-1">
                  รองรับ PNG, JPG, JPEG, WEBP, GIF (สูงสุด 5MB)
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* URL Link Input */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
          <LinkIcon className="w-3.5 h-3.5" />
          <span>หรือใช้ลิงก์ภาพ / ลิงก์รูปภาพภายนอก</span>
        </label>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="เช่น /uploads/cover.jpg หรือ https://images.unsplash.com/..."
          className="bg-white dark:bg-zinc-900 border-neutral-200 dark:border-neutral-800 h-10 text-xs"
          disabled={disabled || isUploading}
        />
      </div>
    </div>
  );
}
