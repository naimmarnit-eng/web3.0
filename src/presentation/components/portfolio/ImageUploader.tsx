"use client";

import * as React from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { uploadImagesAction } from "@/presentation/actions/portfolio.actions";
import { Button } from "@/presentation/components/ui/button";

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  disabled?: boolean;
}

export function ImageUploader({ value = [], onChange, disabled }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    await uploadFiles(Array.from(files));
  };

  const uploadFiles = async (files: File[]) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const res = await uploadImagesAction(formData);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      if (res?.urls && res.urls.length > 0) {
        const newValue = [...value, ...res.urls];
        onChange(newValue);
        toast.success(`อัปโหลดรูปภาพสำเร็จ ${res.urls.length} รูป`);
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

  const removeImage = (indexToRemove: number) => {
    const newValue = value.filter((_, idx) => idx !== indexToRemove);
    onChange(newValue);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled || isUploading) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await uploadFiles(Array.from(files));
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Drag & Drop Area */}
      <div
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center gap-3 cursor-pointer transition-all
          ${isUploading ? "bg-neutral-50 dark:bg-zinc-900/10 border-neutral-300 dark:border-neutral-700 pointer-events-none" : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-zinc-700 hover:bg-neutral-50/50 dark:hover:bg-zinc-900/10"}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="hidden"
          disabled={disabled || isUploading}
        />

        {isUploading ? (
          <>
            <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
            <p className="text-sm font-semibold text-zinc-500">กำลังอัปโหลดรูปภาพ...</p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-900 dark:text-zinc-100">
                ลากรูปภาพมาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                รองรับไฟล์ PNG, JPG, JPEG, WEBP, GIF (สูงสุด 10MB ต่อรูป)
              </p>
            </div>
          </>
        )}
      </div>

      {/* Uploaded Previews List */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {value.map((url, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-zinc-900 shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Uploaded image ${idx + 1}`}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />

              {/* Tag for cover image (first image in the array) */}
              {idx === 0 && (
                <div className="absolute top-2 left-2 bg-neutral-900/90 dark:bg-zinc-100/90 text-white dark:text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
                  รูปหน้าปก
                </div>
              )}

              {/* Remove button */}
              {!disabled && (
                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(idx);
                  }}
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 w-7 h-7 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
