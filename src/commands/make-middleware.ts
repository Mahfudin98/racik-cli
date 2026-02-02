import fs from "fs";
import path from "path";
import { resolveTemplate } from "../utils/resolve-template";
import { writeFileSafe } from "../utils/write-file";

export function makeMiddleware(name: string) {
  if (!name) {
    console.error("Error: middleware name is required");
    process.exit(1);
  }

  const fnName = name.replace(/\.ts$/, "");
  const fileName = `${fnName}.ts`;

  const targetPath = path.resolve(process.cwd(), "src/middlewares", fileName);

  const templatePath = resolveTemplate("middleware.ts.stub");
  const template = fs.readFileSync(templatePath, "utf-8");

  const content = template.replace(/{{ name }}/g, fnName);

  writeFileSafe(targetPath, content);

  console.log("Middleware created:");
  console.log(" ", targetPath);
}
