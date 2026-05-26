import { z } from "zod";

export const projectStatusSchema = z.enum(["DRAFT", "PUBLISHED"]);

export const createProjectSchema = z.object({
  title: z
    .string()
    .min(1, "กรุณากรอกหัวข้อผลงาน")
    .max(255, "หัวข้อต้องไม่เกิน 255 ตัวอักษร"),
  description: z
    .string()
    .min(1, "กรุณากรอกรายละเอียดผลงาน"),
  client: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  images: z.array(z.string()).default([]),
  coverImage: z.string().optional().nullable(),
  date: z.string().optional().nullable(),
  status: projectStatusSchema.default("DRAFT"),
});

export const updateProjectSchema = createProjectSchema.extend({
  id: z.string().min(1, "รหัสผลงานไม่ถูกต้อง"),
});

export const listProjectsQuerySchema = z.object({
  page: z.coerce
    .number()
    .min(1)
    .default(1),
  limit: z.coerce
    .number()
    .min(1)
    .max(50)
    .default(10),
  category: z.string().optional(),
  status: projectStatusSchema.optional(),
  search: z.string().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ListProjectsQuery = z.infer<typeof listProjectsQuerySchema>;
