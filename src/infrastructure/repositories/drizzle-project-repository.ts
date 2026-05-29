import { eq, and, like, desc, or } from "drizzle-orm";

import type { Project } from "@/domain/entities/project";
import type { ProjectRepository } from "@/application/ports/project-repository";
import type { ListProjectsQuery } from "@/application/dto/project.dto";

import { db } from "@/infrastructure/db/client";
import { projects } from "@/infrastructure/db/schema";

export class DrizzleProjectRepository implements ProjectRepository {
  async create(project: Project): Promise<Project> {
    await db.insert(projects).values({
      id: project.id,
      title: project.title,
      slug: project.slug,
      description: project.description,
      client: project.client,
      category: project.category,
      images: project.images,
      coverImage: project.coverImage,
      date: project.date,
      status: project.status,
      views: project.views ?? 0,
      createdAt: project.createdAt,
    });

    return project;
  }

  async update(project: Project): Promise<Project> {
    await db
      .update(projects)
      .set({
        title: project.title,
        slug: project.slug,
        description: project.description,
        client: project.client,
        category: project.category,
        images: project.images,
        coverImage: project.coverImage,
        date: project.date,
        status: project.status,
        views: project.views,
      })
      .where(eq(projects.id, project.id));

    return project;
  }

  async delete(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  async findById(id: string): Promise<Project | null> {
    const result = await db.query.projects.findFirst({
      where: eq(projects.id, id),
    });

    return (result as Project) ?? null;
  }

  async findBySlug(slug: string): Promise<Project | null> {
    const result = await db.query.projects.findFirst({
      where: eq(projects.slug, slug),
    });

    return (result as Project) ?? null;
  }

  async findMany(query?: ListProjectsQuery): Promise<Project[]> {
    const conditions = [];

    if (query?.status) {
      conditions.push(eq(projects.status, query.status));
    }
    if (query?.category) {
      conditions.push(eq(projects.category, query.category));
    }
    if (query?.search) {
      conditions.push(
        or(
          like(projects.title, `%${query.search}%`),
          like(projects.description, `%${query.search}%`),
          like(projects.client, `%${query.search}%`),
          like(projects.category, `%${query.search}%`)
        )
      );
    }

    const limitVal = query?.limit ?? 10;
    const offsetVal = ((query?.page ?? 1) - 1) * limitVal;

    const results = await db.query.projects.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      limit: limitVal,
      offset: offsetVal,
      orderBy: [desc(projects.createdAt)],
    });

    return results as Project[];
  }
}
