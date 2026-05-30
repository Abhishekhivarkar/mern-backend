import fs from "node:fs/promises";
import path from "node:path";
import { pool } from "../configs/db.config.js";

const migrate = async () => {
  try {
    const migrationPath = path.join(
      process.cwd(),
      "src",
      "database",
      "migrations",
      "001_create_users.sql"
    );

    const sql = await fs.readFile(migrationPath, "utf8");

    await pool.query(sql);

    console.log("✅ Migration executed successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed");
    console.error(error);

    process.exit(1);
  }
};

migrate();