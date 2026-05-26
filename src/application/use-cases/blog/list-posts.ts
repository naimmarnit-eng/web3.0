import { Post } from "@/domain/entities/post";
import { ListPostsQuery } from "@/application/dto/post.dto";
import { PostRepository } from "@/application/ports/post-repository";

export class ListPosts {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(query?: ListPostsQuery): Promise<Post[]> {
    return this.postRepository.findMany(query);
  }
}
