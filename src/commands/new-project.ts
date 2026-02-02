import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { copyTemplateDir } from "../utils/copy-template";
import { resolveTemplate } from "../utils/resolve-template";

export function newProject(name: string) {
  if (!name) {
    console.error("Error: project name is required");
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), name);
  if (fs.existsSync(targetDir)) {
    console.error("Error: directory already exists");
    console.error("Path:", targetDir);
    process.exit(1);
  }

  const templateDir = resolveTemplate("project");
  copyTemplateDir(templateDir, targetDir, { name });

  console.log("Project created:");
  console.log(" ", targetDir);
  console.log("");
  console.log("Installing dependencies...");

  const result = spawnSync("bun", ["install"], {
    cwd: targetDir,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    console.error("");
    console.error("Dependency installation failed.");
    console.error("You can try running `bun install` manually.");
    process.exit(1);
  }

  console.log("");
  console.log("Done.");
  console.log("");
  console.log("Next steps:");
  console.log(`  cd ${name}`);
  console.log("  bun run dev");
}
