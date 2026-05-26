"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Edit2, Trash2, Loader2 } from "lucide-react";

import { deletePostAction } from "@/presentation/actions/blog.actions";
import { Button } from "@/presentation/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/presentation/components/ui/alert-dialog";

interface RowActionsProps {
  id: string;
  title: string;
}

export function RowActions({ id, title }: RowActionsProps) {
  const [isPending, startTransition] = React.useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deletePostAction(id);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("ลบบทความสำเร็จ");
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="h-8 w-8 hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded-md text-zinc-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <Link href={`/admin/blog/${id}/edit`}>
          <Edit2 className="h-4 w-4" />
        </Link>
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive rounded-md text-zinc-500 dark:text-zinc-400"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white dark:bg-zinc-950 border-neutral-200 dark:border-neutral-800">
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบบทความ?</AlertDialogTitle>
            <AlertDialogDescription>
              คุณต้องการลบบทความเรื่อง &quot;{title}&quot; ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-zinc-900">
              ยกเลิก
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90 text-white"
            >
              ยืนยันการลบ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
