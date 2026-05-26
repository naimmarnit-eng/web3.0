import { VerifyCredentials } from "@/application/use-cases/auth/verify-credentials";
import { CreatePost } from "@/application/use-cases/blog/create-post";
import { UpdatePost } from "@/application/use-cases/blog/update-post";
import { DeletePost } from "@/application/use-cases/blog/delete-post";
import { ListPosts } from "@/application/use-cases/blog/list-posts";
import { GetPostBySlug } from "@/application/use-cases/blog/get-post-by-slug";

import { CreateProject } from "@/application/use-cases/portfolio/create-project";
import { UpdateProject } from "@/application/use-cases/portfolio/update-project";
import { DeleteProject } from "@/application/use-cases/portfolio/delete-project";
import { ListProjects } from "@/application/use-cases/portfolio/list-projects";
import { GetProjectBySlug } from "@/application/use-cases/portfolio/get-project-by-slug";

import { CreateInquiry } from "@/application/use-cases/contact/create-inquiry";
import { ListInquiries } from "@/application/use-cases/contact/list-inquiries";
import { DeleteInquiry } from "@/application/use-cases/contact/delete-inquiry";

import { BcryptPasswordHasher } from "@/infrastructure/auth/bcrypt-password-hasher";
import { DrizzleUserRepository } from "@/infrastructure/repositories/drizzle-user-repository";
import { DrizzlePostRepository } from "@/infrastructure/repositories/drizzle-post-repository";
import { DrizzleProjectRepository } from "@/infrastructure/repositories/drizzle-project-repository";
import { DrizzleContactRepository } from "@/infrastructure/repositories/drizzle-contact-repository";
import { UploadService } from "@/infrastructure/services/upload-service";

const userRepository = new DrizzleUserRepository();
const passwordHasher = new BcryptPasswordHasher();
const postRepository = new DrizzlePostRepository();
const projectRepository = new DrizzleProjectRepository();
const contactRepository = new DrizzleContactRepository();
const uploadService = new UploadService();

export const container = {
  userRepository,
  passwordHasher,
  postRepository,
  projectRepository,
  contactRepository,
  uploadService,

  // Auth use cases
  verifyCredentials: new VerifyCredentials(userRepository, passwordHasher),

  // Blog use cases
  createPost: new CreatePost(postRepository),
  updatePost: new UpdatePost(postRepository),
  deletePost: new DeletePost(postRepository),
  listPosts: new ListPosts(postRepository),
  getPostBySlug: new GetPostBySlug(postRepository),

  // Portfolio use cases
  createProject: new CreateProject(projectRepository),
  updateProject: new UpdateProject(projectRepository),
  deleteProject: new DeleteProject(projectRepository),
  listProjects: new ListProjects(projectRepository),
  getProjectBySlug: new GetProjectBySlug(projectRepository),

  // Contact use cases
  createInquiry: new CreateInquiry(contactRepository),
  listInquiries: new ListInquiries(contactRepository),
  deleteInquiry: new DeleteInquiry(contactRepository),
};
