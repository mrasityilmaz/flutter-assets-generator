String.prototype.toUnixFileName = _toUnixFileName;
String.prototype.firstLetterToUpperCase = _firstLetterToUpperCase;

/**
 * Converts a string to a Unix-friendly file name.
 *
 * This function performs the following transformations:
 * - Extracts and removes the file extension if present.
 * - Replaces non-alphanumeric characters with an empty string.
 * - Converts the string to lowercase.
 * - Appends the formatted extension (if present) to the end of the string, separated by an underscore.
 *
 * @returns {string} The transformed Unix-friendly file name.
 */
function _toUnixFileName(this: any): string {
  let unixFileName = this as string;

  // Extract file extension if present
  const extensionMatch = unixFileName.match(/\.[a-zA-Z0-9]+$/);
  let extension = "";
  if (extensionMatch) {
    extension = extensionMatch[0].substring(1); // Remove the dot
    unixFileName = unixFileName.substring(
      0,
      unixFileName.length - extension.length - 1
    ); // Remove the extension from the filename
  }

  // Replace non-alphanumeric characters with an empty string
  unixFileName = unixFileName.replace(/[^a-zA-Z0-9]/g, " ");

  // Convert to lowercase
  unixFileName = unixFileName.toLowerCase();

  // Convert to snake_case
  unixFileName = toSnakeCase(unixFileName);

  // Check if filename starts with a number
  if (/^[0-9]/.test(unixFileName)) {
    unixFileName = "n" + unixFileName; // Add "n" if it starts with a number
  }

  // Append the formatted extension if present
  if (extension) {
    unixFileName += `_${extension.toLowerCase()}`;
  }

  return unixFileName;
}

// Function to convert to snake_case
function toSnakeCase(str: string): string {
  return str.replace(/\s+/g, "_"); // Replace spaces with underscores
}

/**
 * Converts the first letter of a string to uppercase.
 *
 * @returns {string} The string with the first letter in uppercase.
 */
function _firstLetterToUpperCase(this: string): string {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
