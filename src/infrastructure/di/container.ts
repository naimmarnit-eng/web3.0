import { VerifyCredentials } from "@/application/use-cases/auth/verify-credentials";
import { CreatePost } from "@/application/use-cases/blog/create-post";
import { UpdatePost } from "@/application/use-cases/blog/update-post";
import { DeletePost } from "@/application/use-cases/blog/delete-post";
import { ListPosts } from "@/application/use-cases/blog/list-posts";
import { GetPostBySlug } from "@/application/use-cases/blog/get-post-by-slug";

import { BcryptPasswordHasher } from "@/infrastructure/auth/bcrypt-password-hasher";
import { DrizzleUserRepository } from "@/infrastructure/repositories/drizzle-user-repository";
import { DrizzlePostRepository } from "@/infrastructure/repositories/drizzle-post-repository";

const userRepository = new DrizzleUserRepository();
const passwordHasher = new BcryptPasswordHasher();
const postRepository = new DrizzlePostRepository();

export const container = {
  userRepository,
  passwordHasher,
  postRepository,

  // Auth use cases
  verifyCredentials: new VerifyCredentials(userRepository, passwordHasher),

  // Blog use cases
  createPost: new CreatePost(postRepository),
  updatePost: new UpdatePost(postRepository),
  deletePost: new DeletePost(postRepository),
  listPosts: new ListPosts(postRepository),
  getPostBySlug: new GetPostBySlug(postRepository),
};
