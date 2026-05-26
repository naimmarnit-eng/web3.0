import { Post } from "@/domain/entities/post";
import { UpdatePostInput } from "@/application/dto/post.dto";
import { PostRepository } from "@/application/ports/post-repository";
import { Slug } from "@/domain/value-objects/slug";

export class UpdatePost {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(input: UpdatePostInput): Promise<Post> {
    const existingPost = await this.postRepository.findById(input.id);
    if (!existingPost) {
      throw new Error("ไม่พบหลักฐานบทความที่ต้องการแก้ไข");
    }

    let slugValue = existingPost.slug;
    if (existingPost.title !== input.title) {
      slugValue = Slug.create(input.title);
      const conflict = await this.postRepository.findBySlug(slugValue);
      if (conflict && conflict.id !== existingPost.id) {
        const suffix = Math.random().toString(36).substring(2, 6);
        slugValue = `${slugValue}-${suffix}`;
      }
    }

    let publishedAt = existingPost.publishedAt;
    if (input.status === "PUBLISHED" && existingPost.status === "DRAFT") {
      publishedAt = new Date();
    } else if (input.status === "DRAFT") {
      publishedAt = null;
    }

    const updatedPost: Post = {
      ...existingPost,
      title: input.title,
      slug: slugValue,
      excerpt: input.excerpt ?? null,
      content: input.content,
      coverImage: input.coverImage ?? null,
      category: input.category ?? null,
      tags: input.tags ?? [],
      status: input.status,
      publishedAt,
      updatedAt: new Date(),
    };

    return this.postRepository.update(updatedPost);
  }
}
