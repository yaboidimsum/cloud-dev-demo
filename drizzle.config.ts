import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env" });

// Check if DATABASE_URL is loaded
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

export default {
  schema: "./db/schema/*",
  out: "./db/migrations",
  dialect: "postgresql", // Changed from "pg" to "postgresql"
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
} satisfies Config;
