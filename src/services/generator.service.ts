import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import {
  ASSETS_FILE_PATH,
  ASSETS_KEY,
  LIB_PATH,
} from "../constants/app.constants";
import {
  ASSET_VARIABLE_KEY,
  ASSET_VARIABLE_VALUE,
  CLASS_DEFINITION_CONSTRUCTER_KEY,
  CLASS_DEFINITION_TEMPLATE,
  CLASS_DEFINITION_TEMPLATE_KEY,
  CLASS_INNER_CLASSES_KEY,
  CLASS_INNER_CODE_KEY,
  F_VARIABLE_TEMPLATE,
  GENERATED_TEMPLATE,
  IGNORED_LINTS,
  INNER_CLASS_NAME_KEY,
  INNER_CLASS_TEMPLATE,
  INNER_CLASS_TYPE_KEY,
  S_C_S_VARIABLE_TEMPLATE,
  STATIC_INNER_CLASS_TEMPLATE,
} from "../constants/generator.constants";
import { AssetDirectoryDTO } from "../dtos/assets.dto";

export class AssetsGeneratorService {
  generateAssetsFileFromDTO(
    assetsDTO: AssetDirectoryDTO,
    assetsDirPath: string
  ) {
    try {
      const workspaceFolder = vscode.workspace.getWorkspaceFolder(
        vscode.Uri.file(assetsDirPath)
      );

      if (!workspaceFolder) {
        vscode.window.showWarningMessage(`Assets directory does not exist!`);
        return;
      }

      if (!fs.existsSync(assetsDirPath)) {
        vscode.window.showWarningMessage(`Assets directory does not exist!`);
        return;
      }

      const libFolder = path.join(workspaceFolder.uri.fsPath, LIB_PATH);
      const assetsFilePath = path.join(libFolder, ASSETS_FILE_PATH);

      let generatedClasses: string[] = [];

      let mainAssetsClassContent = "";
      let mainAssetsClassInnerCode = "";
      let mainAssetsClassInnerClasses = "";

      // Add the ignore lints
      mainAssetsClassContent += IGNORED_LINTS;

      // Add the generated code header
      mainAssetsClassContent += GENERATED_TEMPLATE;

      // Add the `Assets` class definition
      mainAssetsClassContent += this.generateClass({
        className: ASSETS_KEY.firstLetterToUpperCase(),
        isPrivate: false,
      });

      // Function to generate class content recursively
      const generateClassContent = (
        obj: AssetDirectoryDTO,
        className: string
      ): string => {
        let classContent = this.generateClass({
          className: className,
          isPrivate: true,
        });

        let innerCode = "";
        let innerClasses = "";

        Object.entries(obj).forEach(([key, value]) => {
          if (typeof value === "string") {
            const relativePath = value.substring(value.indexOf(ASSETS_KEY));
            // If it's a file, add to the inner code
            innerCode += this.variableGenerator({
              name: key,
              value: relativePath,
              isStaticConst: false,
            });
          } else {
            // If it's a directory, generate a new class
            innerClasses += this.generateInnerClass({
              className: key,
              isPrivate: true,
            });

            generatedClasses.push(
              generateClassContent(value as AssetDirectoryDTO, key)
            );
          }
        });

        classContent = classContent
          .replace(CLASS_INNER_CLASSES_KEY, innerClasses)
          .replace(CLASS_INNER_CODE_KEY, innerCode);

        return classContent;
      };

      // Iterate over assetsDTO and generate code for each file or directory
      Object.entries(assetsDTO).forEach(([key, value]) => {
        if (typeof value === "string") {
          const relativePath = value.substring(value.indexOf(ASSETS_KEY));
          // Add file directly to the Assets class
          mainAssetsClassInnerCode += this.variableGenerator({
            name: key,
            value: relativePath,
            isStaticConst: true,
          });
        } else {
          // Generate class for directory
          mainAssetsClassInnerClasses += this.generateInnerClass({
            className: key,
            isPrivate: true,
            isStatic: true,
          });
          generatedClasses.push(
            generateClassContent(value as AssetDirectoryDTO, key)
          );
        }
      });

      // Finalize the `Assets` class
      mainAssetsClassContent = mainAssetsClassContent
        .replace(CLASS_INNER_CLASSES_KEY, mainAssetsClassInnerClasses)
        .replace(CLASS_INNER_CODE_KEY, mainAssetsClassInnerCode);

      // Append generated classes
      generatedClasses.forEach((classContent) => {
        mainAssetsClassContent += classContent;
      });

      // Write the final content to file
      fs.writeFileSync(assetsFilePath, mainAssetsClassContent, "utf8");

      vscode.window.showInformationMessage(
        `Assets file "${ASSETS_FILE_PATH}" created successfully!`
      );
    } catch (error) {
      vscode.window.showErrorMessage(`Error creating assets.dart`);
    }
  }

  // Method to generate the class definition
  private generateClass({
    className,
    isPrivate = true,
  }: {
    className: string;
    isPrivate?: boolean;
  }): string {
    let modifiedClassName = className.toUnixFileName().firstLetterToUpperCase();
    if (isPrivate) {
      modifiedClassName = `_${modifiedClassName}`;
    }

    const generatedClass = CLASS_DEFINITION_TEMPLATE.replace(
      CLASS_DEFINITION_TEMPLATE_KEY,
      modifiedClassName
    ).replace(CLASS_DEFINITION_CONSTRUCTER_KEY, modifiedClassName);
    return generatedClass;
  }

  private generateInnerClass({
    className,
    isPrivate = true,
    isStatic = false,
  }: {
    className: string;
    isPrivate?: boolean;
    isStatic?: boolean;
  }): string {
    let modifiedClassName = className.toUnixFileName().firstLetterToUpperCase();
    if (isPrivate) {
      modifiedClassName = `_${modifiedClassName}`;
    }

    const temp = isStatic ? STATIC_INNER_CLASS_TEMPLATE : INNER_CLASS_TEMPLATE;
    const generatedInnerClass = temp
      .replace(INNER_CLASS_TYPE_KEY, modifiedClassName)
      .replace(INNER_CLASS_NAME_KEY, className.toUnixFileName())
      .replace(INNER_CLASS_TYPE_KEY, modifiedClassName);
    return generatedInnerClass;
  }

  // Method to generate variable definitions
  private variableGenerator({
    name,
    value,
    isStaticConst,
  }: {
    name: string;
    value: string;
    isStaticConst: boolean;
  }): string {
    let variable = "";

    if (isStaticConst) {
      variable = S_C_S_VARIABLE_TEMPLATE;
    } else {
      variable = F_VARIABLE_TEMPLATE;
    }

    return variable
      .replace(ASSET_VARIABLE_KEY, name.toUnixFileName())
      .replace(ASSET_VARIABLE_VALUE, value);
  }
}
