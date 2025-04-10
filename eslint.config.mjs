import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disables all rules (wildcard not supported directly, so disable specific ones or use plugins)
      // Example: disable common rules manually
      "react/react-in-jsx-scope": "off",
      "react/jsx-key": "off",
      "no-unused-vars": "off",
      "react-hooks/rules-of-hooks": "off",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
// Note: This configuration is for ESLint v8 and above.
// If you're using an older version, you may need to adjust the syntax accordingly.

// To use this configuration, ensure you have the necessary ESLint plugins and configurations installed:
// npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-config-next
// Adjust the package versions as needed based on your project requirements.
// You can also add more rules or plugins as per your project's requirements.
// For more information on ESLint configuration, refer to the ESLint documentation:
// https://eslint.org/docs/user-guide/configuring
// For Next.js specific ESLint rules, refer to the Next.js documentation:
// https://nextjs.org/docs/api-reference/next/eslint
// For TypeScript specific ESLint rules, refer to the TypeScript ESLint documentation:
// https://typescript-eslint.io/docs/getting-started
// For React specific ESLint rules, refer to the React ESLint documentation:  