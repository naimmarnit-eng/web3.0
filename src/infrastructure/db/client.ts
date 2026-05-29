import { drizzle } from "drizzle-orm/mysql2";

import mysql from "mysql2/promise";

import * as schema from "./schema";

const pool =
  mysql.createPool({
    uri: process.env
      .DATABASE_URL!,
    connectionLimit: 5, // Limit connections per Next worker
    maxIdle: 5,
    idleTimeout: 30000, // Close idle connections after 30s
  });

export const db =
  drizzle(pool, {
    schema,
    mode: "default",
  });
