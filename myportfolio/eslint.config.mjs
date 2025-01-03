import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals", // Next.js recommended rules
    "next/typescript", // TypeScript rules
    "plugin:prettier/recommended" // Prettier integration
  ),
  {
    rules: {
      // Optional: Custom Prettier rules
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          semi: true,
          trailingComma: "es5",
        },
      ],
    },
  },
];

export default eslintConfig;