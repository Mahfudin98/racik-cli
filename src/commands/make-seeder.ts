import fs from "fs";
import path from "path";
import { resolveTemplate } from "../utils/resolve-template";
import { writeFileSafe } from "../utils/write-file";
import { parseInputPath } from "../utils/parse-input-path";

export function makeSeeder(args: string[]) {
  const input = args[0];
  if (!input) {
    console.error("Error: seeder name is required");
    console.error("Example: make:seeder Auth/RoleSeeder");
    process.exit(1);
  }

  const { name, dirPath } = parseInputPath(input);

  const targetDir = path.resolve(
    process.cwd(),
    "src/database/seeders",
    dirPath,
  );

  const targetPath = path.join(targetDir, `${name}.ts`);

  const templatePath = resolveTemplate("seeder.ts.stub");
  const template = fs.readFileSync(templatePath, "utf-8");

  const content = template.replace(/{{ name }}/g, name);

  writeFileSafe(targetPath, content);

  console.log("Seeder created:");
  console.log(" ", targetPath);
}
