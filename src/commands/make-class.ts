import fs from "fs";
import path from "path";
import { resolveTemplate } from "../utils/resolve-template";
import { writeFileSafe } from "../utils/write-file";

export function makeClass(args: string[]) {
  const input = args[0];
  if (!input) {
    console.error("Error: class name is required");
    console.error("Example: make:class Services/UserService");
    process.exit(1);
  }

  // Normalize path (support Windows & Unix)
  const normalized = input.replace(/\\/g, "/");
  const parts = normalized.split("/");

  const className = parts.pop()!;
  const subPath = parts.join("/");

  const targetDir = path.resolve(process.cwd(), "src/app", subPath);

  const targetPath = path.join(targetDir, `${className}.ts`);

  const templatePath = resolveTemplate("class.ts.stub");
  const template = fs.readFileSync(templatePath, "utf-8");

  const content = template.replace(/{{ name }}/g, className);

  writeFileSafe(targetPath, content);

  console.log("Class created:");
  console.log(" ", targetPath);
}
