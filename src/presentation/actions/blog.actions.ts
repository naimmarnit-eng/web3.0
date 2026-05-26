"use server";

import { revalidatePath } from "next/cache";

import { createPostSchema, updatePostSchema } from "@/application/dto/post.dto";
import { requireAdmin } from "@/infrastructure/auth/require-admin";
import { container } from "@/infrastructure/di/container";

export async function createPostAction(input: unknown) {
  try {
    await requireAdmin();

    const parsed = createPostSchema.parse(input);
    const post = await container.createPost.execute(parsed);

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { data: post };
  } catch (error: unknown) {
    console.error("Error creating post action:", error);
    const message = error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการสร้างบทความ";
    return { error: message };
  }
}

export async function updatePostAction(input: unknown) {
  try {
    await requireAdmin();

    const parsed = updatePostSchema.parse(input);
    const post = await container.updatePost.execute(parsed);

    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/admin/blog");
    return { data: post };
  } catch (error: unknown) {
    console.error("Error updating post action:", error);
    const message = error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการแก้ไขบทความ";
    return { error: message };
  }
}

export async function deletePostAction(id: string) {
  try {
    await requireAdmin();

    if (!id || typeof id !== "string") {
      return { error: "รหัสบทความไม่ถูกต้อง" };
    }

    await container.deletePost.execute(id);

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting post action:", error);
    const message = error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการลบบทความ";
    return { error: message };
  }
}
