import { NextResponse } from "next/server";
import { db } from "@/infrastructure/db/client";
import { posts } from "@/infrastructure/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourbrand.com";

  try {
    // Fetch published posts ordered by creation time
    const publishedPosts = await db
      .select()
      .from(posts)
      .where(eq(posts.status, "PUBLISHED"))
      .orderBy(desc(posts.createdAt));

    const latestPostDate = publishedPosts.length > 0
      ? new Date(publishedPosts[0].createdAt).toUTCString()
      : new Date().toUTCString();

    // Map posts to RSS item elements
    const rssItemsXml = publishedPosts
      .map((post) => {
        const itemLink = `${baseUrl}/blog/${post.slug}`;
        const pubDate = new Date(post.createdAt).toUTCString();
        const excerptText = post.excerpt || "";

        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${itemLink}</link>
      <guid isPermaLink="true">${itemLink}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${excerptText}]]></description>
      ${post.category ? `<category><![CDATA[${post.category}]]></category>` : ""}
    </item>`;
      })
      .join("");

    // Full RSS 2.0 Feed wrapper
    const rssFeedXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[ARRRGGGH Blog - บทความและข่าวสาร]]></title>
    <link>${baseUrl}</link>
    <description><![CDATA[ติดตามข่าวสาร เทรนด์การพิมพ์ และงานพิมพ์สกรีน เสื้อยืด ของพรีเมียมจากผู้เชี่ยวชาญ]]></description>
    <language>th-th</language>
    <pubDate>${latestPostDate}</pubDate>
    <lastBuildDate>${latestPostDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItemsXml}
  </channel>
</rss>`;

    return new NextResponse(rssFeedXml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error generating RSS Feed:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel><title>Error</title><link>${baseUrl}</link><description>Failed to generate feed</description></channel></rss>`,
      {
        status: 500,
        headers: { "Content-Type": "application/xml; charset=utf-8" },
      }
    );
  }
}
