import * as fs from "fs";

fs.Dirent.prototype.isIgnored = function (
  ignoredChars: string[] = ["."]
): boolean {
  return ignoredChars.some((char) => {
    return this.name.startsWith(char);
  });
};
