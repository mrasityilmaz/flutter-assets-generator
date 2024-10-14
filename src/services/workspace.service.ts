import * as fs from "fs";
import * as path from "path";
import { window, workspace } from "vscode";
import { ASSETS_KEY } from "../constants/app.constants";
import { AssetDirectoryDTO } from "../dtos/assets.dto";
import "./../extensions/extensions";

export class WorkSpaceAssetsService {
  /**
   * Retrieves the path to the assets folder within the workspace.
   *
   * @returns {string | undefined} The path to the assets folder if found, otherwise `undefined`.
   *
   * @throws Will show a warning message if an error occurs while reading the assets folder.
   */
  getAssetsPath(): string | undefined {
    try {
      let assetsFolderPath = undefined;
      const workspaceFolders = workspace.workspaceFolders;
      if (!workspaceFolders) {
        return undefined;
      }

      for (const folder of workspaceFolders) {
        const assetsPath = path.join(folder.uri.fsPath, ASSETS_KEY);
        const assetsStats = fs.statSync(assetsPath);
        if (assetsStats.isDirectory()) {
          assetsFolderPath = assetsPath;
          break;
        }
      }

      return assetsFolderPath;
    } catch (error) {
      window.showWarningMessage(
        `Something went wrong while reading assets folder`
      );
    }
  }

  /**
   * Reads the assets directory and returns an object representing the directory structure.
   *
   * @param dirPath - The path to the directory to read.
   * @returns An `AssetDirectoryDTO` object representing the directory structure, or `undefined` if an error occurs.
   *
   * The returned `AssetDirectoryDTO` object has keys representing directory names, and values which are arrays of file names within those directories.
   * If a file is in the root directory, its name is used as both the key and the value.
   *
   * @throws Will show a warning message if an error occurs while reading the directory.
   */
  readAssetsDirectory(dirPath: string): AssetDirectoryDTO | undefined {
    try {
      if (!fs.existsSync(dirPath)) {
        window.showWarningMessage(`Directory does not exist: ${dirPath}`);
        return undefined;
      }

      const result: AssetDirectoryDTO = {};

      function readDir(currentPath: string, parentObj: AssetDirectoryDTO) {
        const items = fs
          .readdirSync(currentPath, { withFileTypes: true })
          .filter((entry) => !entry.isIgnored());

        items.forEach((item) => {
          const itemPath = path.join(currentPath, item.name);
          const stats = fs.statSync(itemPath);

          if (stats.isDirectory()) {
            if (!parentObj[item.name]) {
              parentObj[item.name] = {};
            }

            readDir(itemPath, parentObj[item.name] as AssetDirectoryDTO);
          } else {
            parentObj[item.name] = itemPath;
          }
        });
      }

      readDir(dirPath, result);

      return result;
    } catch (error) {
      window.showWarningMessage(
        `Something went wrong while reading assets folder: ${error}`
      );
      return undefined;
    }
  }
}
