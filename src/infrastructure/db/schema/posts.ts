import {
  index,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const posts =
  mysqlTable(
    "posts",
    {
      id: varchar("id", {
        length: 36,
      }).primaryKey(),

      title: varchar("title", {
        length: 255,
      }).notNull(),

      slug: varchar("slug", {
        length: 255,
      })
        .notNull()
        .unique(),

      excerpt: varchar(
        "excerpt",
        {
          length: 500,
        },
      ),

      content: text(
        "content",
      ).notNull(),

      coverImage: varchar(
        "cover_image",
        {
          length: 500,
        },
      ),

      category: varchar(
        "category",
        {
          length: 100,
        },
      ),

      tags: json(
        "tags",
      )
        .$type<string[]>()
        .default([]),

      status: mysqlEnum(
        "status",
        [
          "DRAFT",
          "PUBLISHED",
        ],
      )
        .notNull()
        .default("DRAFT"),

      views: int("views")
        .notNull()
        .default(0),

      publishedAt:
        timestamp(
          "published_at",
        ),

      createdAt:
        timestamp(
          "created_at",
        )
          .notNull()
          .defaultNow(),

      updatedAt:
        timestamp(
          "updated_at",
        )
          .notNull()
          .defaultNow()
          .onUpdateNow(),
    },
    (table) => ({
      statusIdx: index(
        "posts_status_idx",
      ).on(table.status),

      publishedAtIdx:
        index(
          "posts_published_at_idx",
        ).on(
          table.publishedAt,
        ),
    }),
  );
