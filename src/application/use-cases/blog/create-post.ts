import { Post } from "@/domain/entities/post";
import { CreatePostInput } from "@/application/dto/post.dto";
import { PostRepository } from "@/application/ports/post-repository";
import { Slug } from "@/domain/value-objects/slug";

export class CreatePost {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(input: CreatePostInput): Promise<Post> {
    let slugValue = Slug.create(input.title);

    // Verify slug uniqueness
    const existing = await this.postRepository.findBySlug(slugValue);
    if (existing) {
      // Append unique random suffix to resolve conflict
      const suffix = Math.random().toString(36).substring(2, 6);
      slugValue = `${slugValue}-${suffix}`;
    }

    const post: Post = {
      id: crypto.randomUUID(),
      title: input.title,
      slug: slugValue,
      excerpt: input.excerpt ?? null,
      content: input.content,
      coverImage: input.coverImage ?? null,
      category: input.category ?? null,
      tags: input.tags ?? [],
      status: input.status ?? "DRAFT",
      views: 0,
      publishedAt: input.status === "PUBLISHED" ? new Date() : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.postRepository.create(post);
  }
}
