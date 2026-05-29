export type ProjectStatus =
  | "DRAFT"
  | "PUBLISHED";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  client: string | null;
  category: string | null;
  images: string[]; // Array of image URLs
  coverImage: string | null;
  date: Date | null;
  status: ProjectStatus;
  views: number;
  createdAt: Date;
}

export function isPublished(project: Project): boolean {
  return project.status === "PUBLISHED";
}
