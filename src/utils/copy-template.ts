import fs from "fs";
import path from "path";

export function copyTemplateDir(
  srcDir: string,
  destDir: string,
  vars: Record<string, string>,
) {
  fs.mkdirSync(destDir, { recursive: true });

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destName = entry.name.endsWith(".stub")
      ? entry.name.replace(".stub", "")
      : entry.name;
    const destPath = path.join(destDir, destName);

    if (entry.isDirectory()) {
      copyTemplateDir(srcPath, destPath, vars);
    } else {
      let content = fs.readFileSync(srcPath, "utf-8");
      for (const [k, v] of Object.entries(vars)) {
        content = content.replaceAll(`{{ ${k} }}`, v);
      }
      fs.writeFileSync(destPath, content);
    }
  }
}
