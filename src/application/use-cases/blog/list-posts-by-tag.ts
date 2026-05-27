import { Post } from "@/domain/entities/post";
import { PostRepository } from "@/application/ports/post-repository";

export class ListPostsByTag {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(tag: string): Promise<Post[]> {
    if (!tag || !tag.trim()) {
      return [];
    }
    return this.postRepository.findByTag(tag.trim());
  }
}
