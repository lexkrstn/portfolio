const { rules } = require('eslint-config-airbnb-base/rules/style');

module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    project: 'api/tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    'object-curly-newline': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    '@typescript-eslint/indent': ['error', 2, {
      ...rules.indent[2],
      ignoredNodes: [
        ...rules.indent[2].ignoredNodes,
        // Ignore the decorators
        'FunctionExpression > .params[decorators.length > 0]',
        'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
        'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
      ],
      MemberExpression: 1,
    }],
  },
};
