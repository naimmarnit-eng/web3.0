export type PostStatus =
  | "DRAFT"
  | "PUBLISHED";

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  coverImage?: string | null;
  category?: string | null;
  tags: string[] | null;
  status: PostStatus;
  views: number;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export function isPublished(
  post: Post,
) {
  return (
    post.status ===
    "PUBLISHED"
  );
}
