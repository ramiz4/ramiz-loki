/* eslint-env node */
import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

// Function to check if a file ends with .tsx or .jsx
const isReactFile = file => file.endsWith('.tsx') || file.endsWith('.jsx');

// Function to process each file
async function processFile(filePath) {
  try {
    // Read file content
    const content = await readFile(filePath, 'utf8');

    // Check if it has the React import but doesn't use React or JSX in content
    const hasUnusedReactImport = /import React from ['"]react['"];/.test(
      content,
    );

    // Check if there's no blank line between imports and component
    const missingLineBreak =
      /import .+;(\r?\n)(export|const|function|class)/.test(content);

    if (hasUnusedReactImport || missingLineBreak) {
      console.log(`Processing ${filePath}`);

      // Remove unused React import
      let newContent = content;

      if (hasUnusedReactImport) {
        newContent = newContent.replace(
          /import React from ['"]react['"];\r?\n/,
          '',
        );
      }

      // Add blank line between imports and component if needed
      if (missingLineBreak) {
        newContent = newContent.replace(
          /(import .+;\r?\n)(export|const|function|class)/,
          '$1\n$2',
        );
      }

      // Write the updated content back to the file
      await writeFile(filePath, newContent, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Function to scan directory recursively for React files
async function scanDirectory(directory) {
  const files = await readdir(directory, { withFileTypes: true });
  let changedFiles = 0;

  for (const file of files) {
    const fullPath = path.join(directory, file.name);

    if (file.isDirectory()) {
      changedFiles += await scanDirectory(fullPath);
    } else if (isReactFile(file.name)) {
      const changed = await processFile(fullPath);
      if (changed) changedFiles++;
    }
  }

  return changedFiles;
}

// Entry point
async function main() {
  try {
    const srcDir = path.join(process.cwd(), 'src');
    console.log('Scanning directory for React files:', srcDir);

    const changedFiles = await scanDirectory(srcDir);
    console.log(`Done! ${changedFiles} files updated.`);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
