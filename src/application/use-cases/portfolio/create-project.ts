import { Project } from "@/domain/entities/project";
import { CreateProjectInput } from "@/application/dto/project.dto";
import { ProjectRepository } from "@/application/ports/project-repository";
import { Slug } from "@/domain/value-objects/slug";

export class CreateProject {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(input: CreateProjectInput): Promise<Project> {
    let slugValue = Slug.create(input.title);

    // Verify slug uniqueness
    const existing = await this.projectRepository.findBySlug(slugValue);
    if (existing) {
      const suffix = Math.random().toString(36).substring(2, 6);
      slugValue = `${slugValue}-${suffix}`;
    }

    const project: Project = {
      id: crypto.randomUUID(),
      title: input.title,
      slug: slugValue,
      description: input.description,
      client: input.client ?? null,
      category: input.category ?? null,
      images: input.images ?? [],
      coverImage: input.coverImage ?? null,
      date: (input.date && input.date.trim() !== "") ? new Date(input.date) : null,
      status: input.status ?? "DRAFT",
      createdAt: new Date(),
    };

    return this.projectRepository.create(project);
  }
}
