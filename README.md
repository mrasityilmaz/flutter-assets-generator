# Flutter Assets Generator

### 🚀 Assets Class Generator for Flutter

**Flutter Assets Generator** is a Visual Studio Code extension designed specifically for Flutter developers. This powerful tool streamlines the process of generating a Dart class for your asset files, transforming the paths and names of files in your `assets` folder into a convenient Dart class.

---

## 📋 How to Use

### Step 1: Prepare Your Project

1. Open your Flutter project.
2. Ensure you have an `assets` folder in your Flutter project containing images, documents, or any other resources you wish to use.

### Step 2: Open Your Project in Visual Studio Code

- Launch Visual Studio Code and open your project’s root directory.

### Step 3: Run the Extension Command

1. Open the command palette by pressing:

   - `Ctrl + Shift + P` (Windows/Linux)
   - `Cmd + Shift + P` (Mac)

2. Search for and select the **"Generate Assets"** command.

### Step 4: Check Your Generated Assets File

- The extension will automatically create an `assets.dart` file in your `lib` folder.

### Step 5: Use the Generated Class in Your Project

- You can now import the generated `assets.dart` file in your Flutter project:

```dart
import 'package:my_flutter_app/assets.dart';

// Use the assets in your widgets
AssetImage(Assets.file1);
```

### 🎉 Benefits of Using This Extension

- Efficiency: Quickly generate Dart classes for all your asset files.
- Consistency: Ensure uniform naming conventions and paths for your assets.
- Convenience: Simplify the process of managing assets within your Flutter application.

### 💻 Connect with Me

- You can find me on GitHub: [@mrasityilmaz](https://github.com/mrasityilmaz/)

### 💻 Open Source

- You can access this project on GitHub: [Flutter Assets Generator](https://github.com/mrasityilmaz/flutter-assets-generator)
- Feel free to customize further based on your preferences!
