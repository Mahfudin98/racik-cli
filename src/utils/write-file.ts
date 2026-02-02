import fs from "fs";
import path from "path";

export function writeFileSafe(targetPath: string, content: string) {
  if (fs.existsSync(targetPath)) {
    console.error("Error: file already exists");
    console.error("Path:", targetPath);
    console.error("Tip: use a different name or create it manually.");
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, content);
}
