import { z } from "zod";

export const createContactSchema = z.object({
  name: z
    .string()
    .min(1, "กรุณากรอกชื่อ-นามสกุลของคุณ")
    .max(255, "ชื่อยาวเกินขีดจำกัด"),
  phone: z.string().max(50, "เบอร์โทรศัพท์ยาวเกินขีดจำกัด").optional().nullable(),
  email: z
    .string()
    .email("รูปแบบอีเมลไม่ถูกต้อง")
    .or(z.string().length(0))
    .optional()
    .nullable(),
  message: z
    .string()
    .min(1, "กรุณากรอกรายละเอียดเรื่องที่ต้องการติดต่อหรือสอบถาม"),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
