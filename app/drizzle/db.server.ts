import pg from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema.server";

const { Pool } = pg;
const pool = new Pool({
  host: process.env.PSQL_HOST,
  port: Number(process.env.PSQL_PORT),
  user: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWORD,
  database: process.env.PSQL_DATABASE,
});

export const db: NodePgDatabase<typeof schema> = drizzle(pool, {
  schema,
  logger: true,
});
