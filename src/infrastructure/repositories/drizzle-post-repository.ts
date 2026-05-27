import { eq, and, like, desc, lte, or, isNull, sql } from "drizzle-orm";

import type { Post } from "@/domain/entities/post";
import type { PostRepository } from "@/application/ports/post-repository";
import type { ListPostsQuery } from "@/application/dto/post.dto";

import { db } from "@/infrastructure/db/client";
import { posts } from "@/infrastructure/db/schema";

export class DrizzlePostRepository
  implements PostRepository
{
async create(
  post: Post,
): Promise<Post> {
  await db
    .insert(posts)
    .values({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt:
        post.excerpt,
      content:
        post.content,
      coverImage:
        post.coverImage,
      category:
        post.category,
      tags: post.tags,
      status:
        post.status,
      views: post.views,
      publishedAt:
        post.publishedAt,
    });

  return post;
}
async update(
  post: Post,
): Promise<Post> {
  await db
    .update(posts)
    .set({
      title: post.title,
      slug: post.slug,
      excerpt:
        post.excerpt,
      content:
        post.content,
      coverImage:
        post.coverImage,
      category:
        post.category,
      tags: post.tags,
      status:
        post.status,
      publishedAt:
        post.publishedAt,
    })
    .where(
      eq(posts.id, post.id),
    );

  return post;
}
async delete(
  id: string,
): Promise<void> {
  await db
    .delete(posts)
    .where(
      eq(posts.id, id),
    );
}
async findById(
  id: string,
): Promise<Post | null> {
  const result =
    await db.query.posts.findFirst(
      {
        where: eq(
          posts.id,
          id,
        ),
      },
    );

  return result ?? null;
}
async findBySlug(
  slug: string,
): Promise<Post | null> {
  const result =
    await db.query.posts.findFirst(
      {
        where: eq(
          posts.slug,
          slug,
        ),
      },
    );

  return result ?? null;
}
async findMany(query?: ListPostsQuery): Promise<
  Post[]
> {
  const conditions = [];

  if (query?.status === "PUBLISHED") {
    conditions.push(
      eq(posts.status, "PUBLISHED"),
      or(
        isNull(posts.publishedAt),
        lte(posts.publishedAt, new Date())
      )
    );
  } else if (query?.status) {
    conditions.push(eq(posts.status, query.status));
  }
  if (query?.category) {
    conditions.push(eq(posts.category, query.category));
  }
  if (query?.search) {
    conditions.push(like(posts.title, `%${query.search}%`));
  }

  const limitVal = query?.limit ?? 10;
  const offsetVal = ((query?.page ?? 1) - 1) * limitVal;

  const results = await db.query.posts.findMany({
    where: conditions.length > 0 ? and(...conditions) : undefined,
    limit: limitVal,
    offset: offsetVal,
    orderBy: [desc(posts.createdAt)],
  });

  return results as Post[];
}

async search(query: string): Promise<Post[]> {
  const results = await db.query.posts.findMany({
    where: and(
      eq(posts.status, "PUBLISHED"),
      or(
        isNull(posts.publishedAt),
        lte(posts.publishedAt, new Date())
      ),
      or(
        like(posts.title, `%${query}%`),
        like(posts.excerpt, `%${query}%`),
        like(posts.content, `%${query}%`)
      )
    ),
    orderBy: [desc(posts.createdAt)],
  });

  return results as Post[];
}

async findByTag(tag: string): Promise<Post[]> {
  const results = await db.query.posts.findMany({
    where: and(
      eq(posts.status, "PUBLISHED"),
      or(
        isNull(posts.publishedAt),
        lte(posts.publishedAt, new Date())
      ),
      sql`JSON_CONTAINS(${posts.tags}, JSON_ARRAY(${tag}))`
    ),
    orderBy: [desc(posts.createdAt)],
  });

  return results as Post[];
}
}

