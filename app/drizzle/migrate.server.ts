import pg from "pg";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";

const { Pool } = pg;

async function main() {
  const pool = new Pool({
    host: process.env.PSQL_HOST,
    port: Number(process.env.PSQL_PORT),
    user: process.env.PSQL_USER,
    password: process.env.PSQL_PASSWORD,
    database: process.env.PSQL_DATABASE,
  });

  const db: NodePgDatabase = drizzle(pool, {
    logger: true,
  });

  console.log("[migrate] Running migrations...");

  await migrate(db, { migrationsFolder: "app/drizzle/migrations" });
}

main();
