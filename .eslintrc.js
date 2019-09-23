module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      node: {
        extensions: [".js", ".ts", ".d.ts"]
      },
      typescript: {},
    },
  },
  rules: {
    "import/prefer-default-export": "off",
    "prettier/prettier": ["error", {
      "printWidth": 140,
      "semi": true,
      "singleQuote": true,
      "useTabs": false,
      "tabWidth": 2,
      "trailingComma": "all",
      "quoteProps": "consistent"
    }],
    // TODO: remove at the end of prototyping
    "@typescript-eslint/no-explicit-any": "off",
  },
};