module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: [
    'src/js/*',
    'dev/**',
    'node_modules/**',
    'public/**',
    '!.eleventy.js',
  ],
  rules: {
    'require-jsdoc': 'off',
    indent: ['error', 2],
    'linebreak-style': 0,
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-trailing-spaces': 'error',
    'new-cap': 0,
    'object-curly-spacing': [2, 'always'],
    'space-before-function-paren': 0,
  },
}
