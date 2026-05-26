import { z } from "zod";

export const postStatusSchema =
  z.enum([
    "DRAFT",
    "PUBLISHED",
  ]);

export const createPostSchema =
  z.object({
    title: z
      .string()
      .min(1)
      .max(255),

    excerpt: z
      .string()
      .max(500)
      .optional(),

    content: z
      .string()
      .min(1),

    coverImage:
      z.string().optional(),

    category:
      z.string().optional(),

    tags: z
      .array(z.string())
      .default([]),

    status:
      postStatusSchema.default(
        "DRAFT",
      ),
  });

export const updatePostSchema =
  createPostSchema.extend({
    id: z.string(),
  });

export const listPostsQuerySchema =
  z.object({
    page: z.coerce
      .number()
      .min(1)
      .default(1),

    limit: z.coerce
      .number()
      .min(1)
      .max(50)
      .default(10),

    category:
      z.string().optional(),

    status:
      postStatusSchema.optional(),

    search:
      z.string().optional(),
  });

export type CreatePostInput =
  z.infer<
    typeof createPostSchema
  >;

export type UpdatePostInput =
  z.infer<
    typeof updatePostSchema
  >;

export type ListPostsQuery =
  z.infer<
    typeof listPostsQuerySchema
  >;
