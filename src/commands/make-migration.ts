import fs from "fs";
import path from "path";
import { resolveTemplate } from "../utils/resolve-template";
import { writeFileSafe } from "../utils/write-file";
import { timestamp } from "../utils/timestamp";

type DbType = "mongo" | "mysql" | "pgsql";

export function makeMigration(args: string[]) {
  if (!args.length) {
    console.error("Error: migration name is required");
    console.error("Example: make:migration create_users --db=mysql");
    process.exit(1);
  }

  // 1. Ambil nama migration (arg pertama)
  const name = args[0];

  // 2. Default db
  let db: DbType = "mongo";

  // 3. Cari --db=xxx
  const dbArg = args.find((arg) => arg.startsWith("--db="));
  if (dbArg) {
    const value = dbArg.split("=")[1] as DbType;

    if (!["mongo", "mysql", "pgsql"].includes(value)) {
      console.error(`Error: unsupported db type "${value}"`);
      console.error("Supported: mongo, mysql, pgsql");
      process.exit(1);
    }

    db = value;
  }

  // 4. Tentukan folder & template
  const fileName = `${timestamp()}_${name}.ts`;

  const targetPath = path.resolve(
    process.cwd(),
    "src/database/migrations",
    db,
    fileName,
  );

  const templateName =
    db === "mongo" ? "migration.mongo.ts.stub" : "migration.sql.ts.stub";

  const templatePath = resolveTemplate(templateName);
  const template = fs.readFileSync(templatePath, "utf-8");

  writeFileSafe(targetPath, template);

  console.log("Migration created:");
  console.log(" ", targetPath);
}
