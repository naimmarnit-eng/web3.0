"use server";

import { revalidatePath } from "next/cache";

import { createProjectSchema, updateProjectSchema } from "@/application/dto/project.dto";
import { requireAdmin } from "@/infrastructure/auth/require-admin";
import { container } from "@/infrastructure/di/container";

export async function createProjectAction(input: unknown) {
  try {
    await requireAdmin();

    const parsed = createProjectSchema.parse(input);
    const project = await container.createProject.execute(parsed);

    revalidatePath("/portfolio");
    revalidatePath("/admin/portfolio");
    return { data: project };
  } catch (error: unknown) {
    console.error("Error creating project action:", error);
    const message = error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการสร้างผลงาน";
    return { error: message };
  }
}

export async function updateProjectAction(input: unknown) {
  try {
    await requireAdmin();

    const parsed = updateProjectSchema.parse(input);
    const project = await container.updateProject.execute(parsed);

    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${project.slug}`);
    revalidatePath("/admin/portfolio");
    return { data: project };
  } catch (error: unknown) {
    console.error("Error updating project action:", error);
    const message = error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการแก้ไขผลงาน";
    return { error: message };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    await requireAdmin();

    if (!id || typeof id !== "string") {
      return { error: "รหัสผลงานไม่ถูกต้อง" };
    }

    await container.deleteProject.execute(id);

    revalidatePath("/portfolio");
    revalidatePath("/admin/portfolio");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting project action:", error);
    const message = error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการลบผลงาน";
    return { error: message };
  }
}

export async function uploadImagesAction(formData: FormData) {
  try {
    await requireAdmin();

    const files = formData.getAll("files") as File[];
    if (files.length === 0) {
      return { error: "กรุณาเลือกไฟล์เพื่ออัปโหลด" };
    }

    const urls: string[] = [];

    for (const file of files) {
      if (file.size === 0) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const url = await container.uploadService.validateAndSaveFile(buffer, file.name);
      urls.push(url);
    }

    return { urls };
  } catch (error: unknown) {
    console.error("Error uploading images action:", error);
    const message = error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ";
    return { error: message };
  }
}
