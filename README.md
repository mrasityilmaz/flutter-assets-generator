# Flutter-Assets-Generator
##### flutter-assets-generator 

Assets Class Generator is a Visual Studio Code extension for Flutter developers that quickly generates a Dart class for your `assets` files. This extension automatically transforms the paths and names of files in the `assets` folder of your Flutter project into a Dart class.

## How to Use

1. Open your Flutter project.

2. Prepare the files within the `assets` folder. These files can be images, documents, or any other resources you want to use in your project.

3. To use the extension, follow these steps:

   - Make sure you have an `assets` folder in your Flutter project.
   - Open your project's root directory in Visual Studio Code.

4. To run the extension's command, follow these steps:

   - Open the command palette in Visual Studio Code by pressing `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac).
   - Search and select the "Generate Assets Class" command.

5. The extension will create an `assets.dart` file in your `lib` folder.

6. You can import `assets.dart` in your Flutter project and use it as follows:

   ```dart
   import 'package:my_flutter_app/assets.dart';

   //...

   AssetImage(Assets.file1)
   ```
