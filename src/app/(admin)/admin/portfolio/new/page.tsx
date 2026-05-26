import * as React from "react";
import Link from "next/link";
import { ArrowLeft, FolderOpen } from "lucide-react";

import { ProjectForm } from "@/presentation/components/portfolio/ProjectForm";
import { Button } from "@/presentation/components/ui/button";

export default function NewProjectPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header and Back button */}
      <div className="flex flex-col gap-2">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="w-fit -ml-2 text-zinc-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-lg"
        >
          <Link href="/admin/portfolio" className="flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            <span>กลับไปยังรายการผลงาน</span>
          </Link>
        </Button>
        <div className="flex items-center gap-3 mt-1">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-black shadow-sm">
            <FolderOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-zinc-100 tracking-tight">
              เพิ่มประวัติผลงานผลิตใหม่ (New Portfolio Project)
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              กรอกข้อมูลแบรนด์ ชนิดผ้า เทคนิคพิมพ์สกรีน และอัปโหลดแกลเลอรีรูปภาพจริงเพื่อสร้างผลงานแสดงหน้าเว็บไซต์
            </p>
          </div>
        </div>
      </div>

      {/* Main form container */}
      <div className="bg-white dark:bg-zinc-900/20 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-sm">
        <ProjectForm />
      </div>
    </div>
  );
}
