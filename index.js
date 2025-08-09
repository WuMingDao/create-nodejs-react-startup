#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

// --- 1. Initialize variables ---

const projectName = process.argv[2];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatePath = path.resolve(__dirname, "template");

// --- 2. Validate input and define target path ---

if (!projectName) {
  console.error(chalk.red("❌ Error: Please specify the project name!"));
  console.log(
    chalk.yellow("Usage example: pnpm create cool-starter my-project")
  );
  console.log(
    chalk.yellow("Or to use the current directory: pnpm create cool-starter .")
  );
  process.exit(1); // Exit with an error code
}

// Define the target path based on the project name
const targetPath = path.resolve(process.cwd(), projectName);

// Check if the target directory is valid
if (projectName === ".") {
  // If using the current directory, check if it's empty
  const files = fs.readdirSync(targetPath);
  if (files.length > 0) {
    console.error(
      chalk.red(
        "❌ Error: The current directory is not empty! Please use an empty folder."
      )
    );
    process.exit(1);
  }
} else if (fs.existsSync(targetPath)) {
  // If creating a new directory, check if it already exists
  console.error(
    chalk.red(`❌ Error: Directory "${projectName}" already exists!`)
  );
  process.exit(1);
}

// --- 3. Execute core logic ---

// Create a user-friendly location string for the log message
const locationString =
  projectName === "." ? `the current folder "./"` : `"./${projectName}"`;

console.log(
  chalk.blue(
    `🚀 Creating a new project for you in ${chalk.bold(locationString)}`
  )
);

try {
  // Create the target directory only if it's not the current one
  if (projectName !== ".") {
    fs.mkdirSync(targetPath);
  }

  // Use fs-extra.copySync to recursively copy the template files
  fs.copySync(templatePath, targetPath);

  // --- 4. Provide friendly instructions upon completion ---

  console.log(chalk.green("👌 Project created successfully!"));
  console.log("");
  console.log(chalk.cyan("Now, follow these steps to get started 👇"));

  // Only show the 'cd' command if a new directory was created
  if (projectName !== ".") {
    console.log(chalk.bold(`👉  cd ${projectName}`));

    console.log("");

    console.log("Select backend part: ");
    console.log(`  1. cd backend-app`);
    console.log(`  2. pnpm i`);
    console.log(`  3. pnpm run dev`);

    console.log("");

    console.log("Select frontend part: ");
    console.log(`  1. cd frontend-app`);
    console.log(`  2. pnpm i`);
    console.log(`  3. pnpm run dev`);
  } else {
    console.log("");

    console.log("Select backend part: ");
    console.log(`  1. cd backend-app`);
    console.log(`  2. pnpm i`);
    console.log(`  3. pnpm run dev`);

    console.log("");

    console.log("Select frontend part: ");
    console.log(`  1. cd frontend-app`);
    console.log(`  2. pnpm i`);
    console.log(`  3. pnpm run dev`);
  }

  console.log("");
  console.log(chalk.magenta("😉 Happy coding! 🎉"));
} catch (error) {
  console.error(chalk.red("❌ An error occurred during creation:"));
  console.error(error);
  // If an error occurs, remove the created empty directory if it's a new one
  if (projectName !== "." && fs.existsSync(targetPath)) {
    fs.removeSync(targetPath);
  }
  process.exit(1);
}
