"use server";

import { revalidatePath } from "next/cache";

import { createContactSchema } from "@/application/dto/contact.dto";
import { requireAdmin } from "@/infrastructure/auth/require-admin";
import { container } from "@/infrastructure/di/container";
import { sanitize } from "@/shared/utils/sanitize";

// PII log masking helper for PDPA compliance
function maskPII(text: string | null | undefined, type: "email" | "phone"): string {
  if (!text) return "N/A";
  
  if (type === "email") {
    const parts = text.split("@");
    if (parts.length !== 2) return "***";
    const [name, domain] = parts;
    const maskedName = name.length > 2 ? `${name[0]}***${name[name.length - 1]}` : "***";
    const maskedDomain = domain.length > 2 ? `${domain[0]}***${domain[domain.length - 1]}` : "***";
    return `${maskedName}@${maskedDomain}`;
  }
  
  if (type === "phone") {
    const clean = text.replace(/[^0-9]/g, "");
    if (clean.length < 6) return "***";
    return `${clean.substring(0, 3)}***${clean.substring(clean.length - 3)}`;
  }
  
  return "***";
}

export async function createInquiryAction(input: unknown) {
  try {
    // 1. Zod input parsing
    const parsed = createContactSchema.parse(input);
    
    // 2. Telemetry logs with PII data masking
    const maskedEmail = maskPII(parsed.email, "email");
    const maskedPhone = maskPII(parsed.phone, "phone");
    console.log(`[Telemetry] Contact inquiry received. Name: ${parsed.name.substring(0, 1)}***, Email: ${maskedEmail}, Phone: ${maskedPhone}`);
    
    // 3. Security: sanitize HTML message body against XSS
    const cleanMessage = sanitize(parsed.message);
    const submissionData = { ...parsed, message: cleanMessage };
    
    // 4. Use case execution
    const inquiry = await container.createInquiry.execute(submissionData);
    
    revalidatePath("/admin/contacts");
    return { success: true, data: inquiry };
  } catch (error: unknown) {
    console.error("Error creating inquiry action:", error);
    const message = error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการส่งข้อความติดต่อ";
    return { error: message };
  }
}

export async function deleteInquiryAction(id: string) {
  try {
    await requireAdmin();

    if (!id || typeof id !== "string") {
      return { error: "รหัสข้อความไม่ถูกต้อง" };
    }

    await container.deleteInquiry.execute(id);

    revalidatePath("/admin/contacts");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting inquiry action:", error);
    const message = error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการลบข้อความ";
    return { error: message };
  }
}
