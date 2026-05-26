import { Project } from "@/domain/entities/project";
import { UpdateProjectInput } from "@/application/dto/project.dto";
import { ProjectRepository } from "@/application/ports/project-repository";
import { Slug } from "@/domain/value-objects/slug";

export class UpdateProject {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(input: UpdateProjectInput): Promise<Project> {
    const existing = await this.projectRepository.findById(input.id);
    if (!existing) {
      throw new Error("ไม่พบข้อมูลผลงานที่ต้องการแก้ไข");
    }

    let slugValue = existing.slug;
    if (existing.title !== input.title) {
      slugValue = Slug.create(input.title);
      const conflict = await this.projectRepository.findBySlug(slugValue);
      if (conflict && conflict.id !== existing.id) {
        const suffix = Math.random().toString(36).substring(2, 6);
        slugValue = `${slugValue}-${suffix}`;
      }
    }

    const updated: Project = {
      ...existing,
      title: input.title,
      slug: slugValue,
      description: input.description,
      client: input.client ?? null,
      category: input.category ?? null,
      images: input.images ?? [],
      coverImage: input.coverImage ?? null,
      date: (input.date && input.date.trim() !== "") ? new Date(input.date) : null,
      status: input.status,
    };

    return this.projectRepository.update(updated);
  }
}
