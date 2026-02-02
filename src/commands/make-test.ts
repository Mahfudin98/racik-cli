import fs from "fs";
import path from "path";
import { resolveTemplate } from "../utils/resolve-template";
import { writeFileSafe } from "../utils/write-file";

export function makeTest(name: string) {
  if (!name) {
    console.error("Error: test name is required");
    process.exit(1);
  }

  const baseName = name.replace(/\.test\.ts$/, "");
  const fileName = `${baseName}.test.ts`;

  const targetPath = path.resolve(process.cwd(), "tests", fileName);

  const templatePath = resolveTemplate("test.ts.stub");
  const template = fs.readFileSync(templatePath, "utf-8");

  const content = template.replace(/{{ name }}/g, baseName);

  writeFileSafe(targetPath, content);

  console.log("Test created:");
  console.log(" ", targetPath);
}
