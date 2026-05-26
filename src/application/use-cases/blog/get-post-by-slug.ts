import { Post } from "@/domain/entities/post";
import { PostRepository } from "@/application/ports/post-repository";

export class GetPostBySlug {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(slug: string): Promise<Post | null> {
    const post = await this.postRepository.findBySlug(slug);
    if (post) {
      post.views += 1;
      await this.postRepository.update(post);
    }
    return post;
  }
}
