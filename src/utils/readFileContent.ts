import * as fs from "fs";

export function readFileContent(filePath: string): string[] {
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  return lines;
}
