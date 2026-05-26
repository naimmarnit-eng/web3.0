import { Project } from "@/domain/entities/project";
import { ListProjectsQuery } from "@/application/dto/project.dto";
import { ProjectRepository } from "@/application/ports/project-repository";

export class ListProjects {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(query?: ListProjectsQuery): Promise<Project[]> {
    return this.projectRepository.findMany(query);
  }
}
