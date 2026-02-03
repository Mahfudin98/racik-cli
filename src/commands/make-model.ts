import fs from "fs";
import path from "path";
import { resolveTemplate } from "../utils/resolve-template";
import { writeFileSafe } from "../utils/write-file";
import { parseInputPath } from "../utils/parse-input-path";

export function makeModel(args: string[]) {
  const input = args[0];
  if (!input) {
    console.error("Error: model name is required");
    console.error("Example: make:model Auth/Users");
    process.exit(1);
  }

  const { name, dirPath } = parseInputPath(input);

  const targetDir = path.resolve(process.cwd(), "src/app/models", dirPath);

  const targetPath = path.join(targetDir, `${name}.ts`);

  const templatePath = resolveTemplate("model.ts.stub");
  const template = fs.readFileSync(templatePath, "utf-8");

  const content = template.replace(/{{ name }}/g, name);

  writeFileSafe(targetPath, content);

  console.log("Model created:");
  console.log(" ", targetPath);
}
