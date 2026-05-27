import type { Post } from "@/domain/entities/post";
import type { ListPostsQuery } from "@/application/dto/post.dto";

export interface PostRepository {
  create(
    post: Post,
  ): Promise<Post>;

  update(
    post: Post,
  ): Promise<Post>;

  delete(
    id: string,
  ): Promise<void>;

  findById(
    id: string,
  ): Promise<Post | null>;

  findBySlug(
    slug: string,
  ): Promise<Post | null>;

  findMany(query?: ListPostsQuery): Promise<Post[]>;

  search(query: string): Promise<Post[]>;

  findByTag(tag: string): Promise<Post[]>;
}

