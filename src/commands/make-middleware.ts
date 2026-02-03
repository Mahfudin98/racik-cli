import fs from "fs";
import path from "path";
import { resolveTemplate } from "../utils/resolve-template";
import { writeFileSafe } from "../utils/write-file";
import { parseInputPath } from "../utils/parse-input-path";

export function makeMiddleware(args: string[]) {
  const input = args[0];
  if (!input) {
    console.error("Error: middleware name is required");
    console.error("Example: make:middleware Auth/UserAdminMiddleware");
    process.exit(1);
  }

  const { name, dirPath } = parseInputPath(input);

  const targetDir = path.resolve(process.cwd(), "src/middlewares", dirPath);

  const targetPath = path.join(targetDir, `${name}.ts`);

  const templatePath = resolveTemplate("middleware.ts.stub");
  const template = fs.readFileSync(templatePath, "utf-8");

  const content = template.replace(/{{ name }}/g, name);

  writeFileSafe(targetPath, content);

  console.log("Middleware created:");
  console.log(" ", targetPath);
}
