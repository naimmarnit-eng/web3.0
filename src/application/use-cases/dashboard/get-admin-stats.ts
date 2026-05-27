import { db } from "@/infrastructure/db/client";
import { posts, projects, contacts } from "@/infrastructure/db/schema";
import { count, desc, sum, sql } from "drizzle-orm";
import type { Post } from "@/domain/entities/post";

export interface MonthlyStat {
  month: string;
  posts: number;
  projects: number;
  contacts: number;
}

export interface AdminStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  totalContacts: number;
  totalViews: number;
  topPosts: Post[];
  monthlyStats: MonthlyStat[];
}

export class GetAdminStats {
  async execute(): Promise<AdminStats> {
    // 1. Fetch counts and aggregates
    const [postsCountResult] = await db.select({
      total: count(),
      published: sql<number>`SUM(CASE WHEN ${posts.status} = 'PUBLISHED' THEN 1 ELSE 0 END)`,
      draft: sql<number>`SUM(CASE WHEN ${posts.status} = 'DRAFT' THEN 1 ELSE 0 END)`,
      totalViews: sum(posts.views)
    }).from(posts);

    const [projectsCountResult] = await db.select({
      total: count(),
      published: sql<number>`SUM(CASE WHEN ${projects.status} = 'PUBLISHED' THEN 1 ELSE 0 END)`,
      draft: sql<number>`SUM(CASE WHEN ${projects.status} = 'DRAFT' THEN 1 ELSE 0 END)`
    }).from(projects);

    const [contactsCountResult] = await db.select({
      total: count()
    }).from(contacts);

    const totalPosts = Number(postsCountResult?.total || 0);
    const publishedPosts = Number(postsCountResult?.published || 0);
    const draftPosts = Number(postsCountResult?.draft || 0);
    const totalViews = Number(postsCountResult?.totalViews || 0);

    const totalProjects = Number(projectsCountResult?.total || 0);
    const publishedProjects = Number(projectsCountResult?.published || 0);
    const draftProjects = Number(projectsCountResult?.draft || 0);

    const totalContacts = Number(contactsCountResult?.total || 0);

    // 2. Fetch top 5 posts by views descending
    const topPosts = (await db.select()
      .from(posts)
      .orderBy(desc(posts.views))
      .limit(5)) as Post[];

    // 3. Fetch monthly counts for posts, projects, contacts
    const postsMonthly = await db.select({
      month: sql<string>`DATE_FORMAT(${posts.createdAt}, '%Y-%m')`,
      count: count()
    })
    .from(posts)
    .groupBy(sql`DATE_FORMAT(${posts.createdAt}, '%Y-%m')`);

    const projectsMonthly = await db.select({
      month: sql<string>`DATE_FORMAT(${projects.createdAt}, '%Y-%m')`,
      count: count()
    })
    .from(projects)
    .groupBy(sql`DATE_FORMAT(${projects.createdAt}, '%Y-%m')`);

    const contactsMonthly = await db.select({
      month: sql<string>`DATE_FORMAT(${contacts.createdAt}, '%Y-%m')`,
      count: count()
    })
    .from(contacts)
    .groupBy(sql`DATE_FORMAT(${contacts.createdAt}, '%Y-%m')`);

    // 4. Merge monthly stats in memory
    const monthlyMap = new Map<string, { month: string; posts: number; projects: number; contacts: number }>();

    const getOrCreate = (month: string) => {
      if (!monthlyMap.has(month)) {
        monthlyMap.set(month, { month, posts: 0, projects: 0, contacts: 0 });
      }
      return monthlyMap.get(month)!;
    };

    postsMonthly.forEach((item) => {
      if (item.month) {
        getOrCreate(item.month).posts = Number(item.count);
      }
    });

    projectsMonthly.forEach((item) => {
      if (item.month) {
        getOrCreate(item.month).projects = Number(item.count);
      }
    });

    contactsMonthly.forEach((item) => {
      if (item.month) {
        getOrCreate(item.month).contacts = Number(item.count);
      }
    });

    const monthlyStats = Array.from(monthlyMap.values())
      .sort((a, b) => a.month.localeCompare(b.month));

    // Fallback if no monthly stats exist (e.g. fresh DB)
    if (monthlyStats.length === 0) {
      const currentMonth = new Date().toISOString().slice(0, 7);
      monthlyStats.push({ month: currentMonth, posts: 0, projects: 0, contacts: 0 });
    }

    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      totalProjects,
      publishedProjects,
      draftProjects,
      totalContacts,
      totalViews,
      topPosts,
      monthlyStats
    };
  }
}
