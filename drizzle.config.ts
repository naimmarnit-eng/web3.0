import { config as dotenvConfig } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { env } from "@/shared/config/env";

dotenvConfig();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error(
    "Missing DATABASE_URL environment variable. Set it in your shell or create a .env file with DATABASE_URL=<your mysql url>."
  );
}

export default defineConfig({
  dialect: "mysql",
  schema: "./src/infrastructure/db/schema/*",
  out: "./drizzle",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});