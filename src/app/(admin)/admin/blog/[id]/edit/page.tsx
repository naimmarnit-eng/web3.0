import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Edit3 } from "lucide-react";

import { container } from "@/infrastructure/di/container";
import { PostForm } from "@/presentation/components/blog/PostForm";
import { Button } from "@/presentation/components/ui/button";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;

  // Retrieve post
  const post = await container.postRepository.findById(id);

  if (!post) {
    notFound();
  }

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
          <Link href="/admin/blog" className="flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            <span>กลับไปยังรายการบทความ</span>
          </Link>
        </Button>
        <div className="flex items-center gap-3 mt-1">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-black shadow-sm">
            <Edit3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-zinc-100 tracking-tight">
              แก้ไขบทความ (Edit Article)
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              อัปเดตข้อมูลบทความ ปรับปรุงเนื้อหา หรือเปลี่ยนสถานะการเผยแพร่ของชิ้นงาน
            </p>
          </div>
        </div>
      </div>

      {/* Main form container */}
      <div className="bg-white dark:bg-zinc-900/20 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-sm">
        <PostForm initialValues={post} />
      </div>
    </div>
  );
}
