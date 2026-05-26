import type { MetadataRoute } from "next";
import { db } from "@/infrastructure/db/client";
import { posts, projects } from "@/infrastructure/db/schema";
import { eq } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourbrand.com";

  // Static routes
  const staticRoutes = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  // Dynamic published blogs
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const publishedPosts = await db
      .select()
      .from(posts)
      .where(eq(posts.status, "PUBLISHED"));

    blogRoutes = publishedPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error generating sitemap blogs:", error);
  }

  // Dynamic published projects
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const publishedProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.status, "PUBLISHED"));

    projectRoutes = publishedProjects.map((proj) => ({
      url: `${baseUrl}/portfolio/${proj.slug}`,
      lastModified: new Date(proj.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error generating sitemap portfolio projects:", error);
  }

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
