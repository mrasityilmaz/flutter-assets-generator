import * as vscode from "vscode";
import { COMMAND_GENERATE_ASSETS } from "./constants/ext.constants";
import { AssetsGeneratorService } from "./services/generator.service";
import { WorkSpaceAssetsService } from "./services/workspace.service";

export function activate(context: vscode.ExtensionContext) {
  try {
    const disposable = vscode.commands.registerCommand(
      `${COMMAND_GENERATE_ASSETS}`,
      () => {
        const workspaceService = new WorkSpaceAssetsService();
        const assetsPath = workspaceService.getAssetsPath();

        if (!assetsPath) {
          vscode.window.showWarningMessage("Not found assets folder.");
          return;
        }

        const assetsDTO = workspaceService.readAssetsDirectory(assetsPath);

        if (!assetsDTO || Object.keys(assetsDTO).length === 0) {
          vscode.window.showWarningMessage("Not found any assets.");
          return;
        }

        const assetsGeneratorService = new AssetsGeneratorService();

        assetsGeneratorService.generateAssetsFileFromDTO(assetsDTO, assetsPath);
      }
    );

    context.subscriptions.push(disposable);
  } catch (error) {
    vscode.window.showErrorMessage(
      `Something went wrong while activating the extension: ${error}`
    );
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
