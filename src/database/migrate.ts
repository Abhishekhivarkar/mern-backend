import fs from "node:fs/promises";
import path from "node:path";

import { pool } from "../configs/db.config.js";

const migrate = async () => {
  try {
    // Migration tracking table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const migrationsDir = path.join(
      process.cwd(),
      "src",
      "database",
      "migrations"
    );

    
    const files = await fs.readdir(migrationsDir);


    const migrationFiles = files
      .filter(file => file.endsWith(".sql"))
      .sort();

    for (const file of migrationFiles) {

     
      const existingMigration = await pool.query(
        `
        SELECT *
        FROM migrations
        WHERE filename = $1
        LIMIT 1
        `,
        [file]
      );

      if (existingMigration.rows.length > 0) {
        console.log(`Skipping ${file}`);
        continue;
      }

      console.log(`Running ${file}`);

      const migrationPath = path.join(
        migrationsDir,
        file
      );

      const sql = await fs.readFile(
        migrationPath,
        "utf8"
      );

      await pool.query(sql);

      await pool.query(
        `
        INSERT INTO migrations(filename)
        VALUES($1)
        `,
        [file]
      );

      console.log(`completed ${file}`);
    }

    console.log("All migrations completed");

    process.exit(0);

  } catch (error) {

    console.error("migration failed");
    console.error(error);

    process.exit(1);
  }
};

migrate();