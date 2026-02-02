import fs from "fs";
import path from "path";

export function resolveTemplate(name: string): string {
  const projectTemplate = path.resolve(process.cwd(), ".racik/templates", name);

  if (fs.existsSync(projectTemplate)) {
    return projectTemplate;
  }

  return path.resolve(import.meta.dir, "../templates", name);
}
