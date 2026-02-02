import fs from "fs";
import path from "path";
import { resolveTemplate } from "../utils/resolve-template";
import { writeFileSafe } from "../utils/write-file";

export function makeController(name: string) {
  if (!name) {
    console.error("Error: controller name is required");
    process.exit(1);
  }

  const className = name.replace(/\.ts$/, "");
  const fileName = `${className}.ts`;

  const targetPath = path.resolve(
    process.cwd(),
    "src/app/Controllers",
    fileName,
  );

  const templatePath = resolveTemplate("controller.ts.stub");
  const template = fs.readFileSync(templatePath, "utf-8");

  const content = template.replace(/{{ name }}/g, className);

  writeFileSafe(targetPath, content);

  console.log("Controller created:");
  console.log(" ", targetPath);
}
