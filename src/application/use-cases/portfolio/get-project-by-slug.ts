import { Project } from "@/domain/entities/project";
import { ProjectRepository } from "@/application/ports/project-repository";

export class GetProjectBySlug {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(slug: string): Promise<Project | null> {
    return this.projectRepository.findBySlug(slug);
  }
}
