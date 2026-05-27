import { Post } from "@/domain/entities/post";
import { PostRepository } from "@/application/ports/post-repository";

export class SearchPosts {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(query: string): Promise<Post[]> {
    if (!query || !query.trim()) {
      return [];
    }
    return this.postRepository.search(query.trim());
  }
}
