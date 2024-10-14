// fs-extension.d.ts
import 'fs';

declare module 'fs' {
    interface Dirent {
        /**
         * Check if the dirent is a hidden/ignored file or directory
         *
         * @param ignoredChars - Characters to be ignored
         * @returns boolean
         * @example
         * File or Directory -> .git , .idea, .vscode etc.
         * const dirent = fs.readdirSync('path', { withFileTypes: true });
         * dirent.isIgnored();  // .git - true
         * dirent.isIgnored(['.']); // .git - true
         * dirent.isIgnored(); // /lib - false
        */
        isIgnored(ignoredChars?: string[]): boolean;
    }
}
