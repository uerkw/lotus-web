import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/drizzle/schema.server.ts",
  out: "./app/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: String(process.env.PSQL_HOST),
    port: Number(process.env.PSQL_PORT),
    user: String(process.env.PSQL_USER),
    password: String(process.env.PSQL_PASSWORD),
    database: String(process.env.PSQL_DATABASE),
    ssl: false,
  },
  verbose: true,
  //strict: true,
});
