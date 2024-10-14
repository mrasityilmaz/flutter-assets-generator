export {};

declare global {
  interface String {
    /**
     * Extends the String prototype with additional utility methods.
     *
     * @interface String
     */

    /**
     * Convert the string to a Unix-compatible file name format.
     *
     * @returns {string} The converted string in Unix-compatible file name format.
     * @example
     * const fileName = "çÇğĞıİöÖşŞüÜ example.txt";
     * console.log(fileName.toUnixFileName()); // Output: "ccggiioossuu_example_txt"
     * @function
     */
    toUnixFileName(): string;

    /**
     * Convert the first letter of the string to uppercase.
     *
     * @returns {string}
     * @example
     * const text = "hello world";
     * console.log(text.firstLetterToUpperCase()); // Output: "Hello world"
     * @function
     */
    firstLetterToUpperCase(): string;
  }
}
