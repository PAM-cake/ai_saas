/**
 * ESLint configuration file
 * Configures linting rules for Next.js and TypeScript
 * Uses the new flat config format
 */

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Get current file and directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize ESLint compatibility layer
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * ESLint configuration array
 * Extends Next.js core web vitals and TypeScript rules
 * Uses the new flat config format for better performance
 */
const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",  // Next.js core web vitals rules
    "next/typescript"        // Next.js TypeScript rules
  ),
];

export default eslintConfig;
