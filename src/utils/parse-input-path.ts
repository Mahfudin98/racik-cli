import path from "path";

export function parseInputPath(input: string) {
  const normalized = input.replace(/\\/g, "/");
  const parts = normalized.split("/");

  const name = parts.pop()!;
  const subPath = parts.join("/");

  return {
    name,
    subPath,
    dirPath: subPath ? path.join(...subPath.split("/")) : "",
  };
}
