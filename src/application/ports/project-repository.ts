import type { Project } from "@/domain/entities/project";
import type { ListProjectsQuery } from "@/application/dto/project.dto";

export interface ProjectRepository {
  create(project: Project): Promise<Project>;
  update(project: Project): Promise<Project>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Project | null>;
  findBySlug(slug: string): Promise<Project | null>;
  findMany(query?: ListProjectsQuery): Promise<Project[]>;
}
