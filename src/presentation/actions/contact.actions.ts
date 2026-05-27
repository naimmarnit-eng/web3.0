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
    // 1. Honeypot check for automated spam bot prevention
    const rawInput = input as Record<string, unknown>;
    if (rawInput && rawInput.website && typeof rawInput.website === "string" && rawInput.website.trim() !== "") {
      console.warn(`[Spam Blocked] Automated bot detected via honeypot field. Suppressing database insert.`);
      // Trick the bot into thinking it succeeded to prevent it from retrying
      return { success: true };
    }

    // 2. Zod input parsing
    const parsed = createContactSchema.parse(input);
    
    // 3. Content Similarity & Rate Limiting Spam Check
    // Query recent inquiries from Drizzle DB to check for repeating duplicate requests in the last 60 seconds
    const recentInquiries = await container.contactRepository.findMany();
    const now = new Date();
    
    const duplicate = recentInquiries.find((item) => {
      const timeDiffSeconds = (now.getTime() - new Date(item.createdAt).getTime()) / 1000;
      
      // If submitted in the last 60 seconds
      if (timeDiffSeconds < 60) {
        const emailMatch = parsed.email && item.email && parsed.email.trim().toLowerCase() === item.email.trim().toLowerCase();
        const phoneMatch = parsed.phone && item.phone && parsed.phone.trim() === item.phone.trim();
        const messageMatch = parsed.message && item.message && parsed.message.trim() === item.message.trim();
        
        return emailMatch || phoneMatch || messageMatch;
      }
      return false;
    });

    if (duplicate) {
      console.warn(`[Spam Blocked] Duplicate or rapid rate-limit submission detected from: ${parsed.email || parsed.phone || "unknown"}`);
      return { error: "คุณส่งข้อความติดต่อเร็วเกินไปหรือส่งซ้ำซ้อน โปรดรอสักครู่ก่อนลองอีกครั้งเพื่อป้องกันสแปม" };
    }
    
    // 4. Telemetry logs with PII data masking
    const maskedEmail = maskPII(parsed.email, "email");
    const maskedPhone = maskPII(parsed.phone, "phone");
    console.log(`[Telemetry] Contact inquiry received. Name: ${parsed.name.substring(0, 1)}***, Email: ${maskedEmail}, Phone: ${maskedPhone}`);
    
    // 5. Security: sanitize HTML message body against XSS
    const cleanMessage = sanitize(parsed.message);
    const submissionData = { ...parsed, message: cleanMessage };
    
    // 6. Use case execution
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

export async function markInquiryReadAction(id: string) {
  try {
    await requireAdmin();

    if (!id || typeof id !== "string") {
      return { error: "รหัสข้อความไม่ถูกต้อง" };
    }

    await container.markInquiryRead.execute(id);

    revalidatePath("/admin/contacts");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error marking inquiry as read action:", error);
    const message = error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการทำเครื่องหมายว่าอ่านแล้ว";
    return { error: message };
  }
}
