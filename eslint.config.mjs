import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  { ignores: ['node_modules/', 'docs/', 'coverage/', 'metro.config.js', '.eslintrc.js', ".prettierrc.js", 'babel.config.js', 'jest.config.js'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ["**/*.jsx"], languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  pluginReactConfig,
];