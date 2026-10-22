require("dotenv").config();
const fs = require("node:fs/promises");
const path = require("node:path");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set to a PostgreSQL connection string");
}

const { pool } = require("../db/pool");

async function initializeDatabase() {
  const schema = await fs.readFile(path.join(__dirname, "..", "db", "schema.sql"), "utf8");
  await pool.query(schema);
  console.log("Database schema is ready.");
}

initializeDatabase()
  .catch((error) => {
    console.error("Unable to initialize database:", error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
