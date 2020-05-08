module.exports = {
  env: {
    browser: true,
  },
  // parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['import'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    // 'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    // 'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    'func-style': ['warn', 'declaration'],
    'no-duplicate-imports': 'error',
    'no-unused-vars': ["error", { "argsIgnorePattern": "_" }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc', // sort in ascending order.
          caseInsensitive: true,
        },
        pathGroups: [
          // this would be where absolute imports are configured
        ]
          .sort()
          .map(folder => ({
            pattern: `${folder}/**`,
            group: 'parent',
            position: 'before',
          })),
        // reason for this explained here:
        // https://github.com/benmosher/eslint-plugin-import/issues/1565
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
}
