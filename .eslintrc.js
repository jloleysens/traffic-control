module.exports = {
  env: {
    browser: true,
    es2018: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json']
  },
  plugins: [
    'react'
  ],
  rules: {
    semi: ['error', 'always']
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      rules: {
        // Already handled by TS
        'no-dupe-class-members': 'off',
        'no-undef': 'off',
        'space-before-function-paren': ['error', 'never'],
        'react/prop-types': 'off',

        // Add TypeScript specific rules (and turn off ESLint equivalents)
        '@typescript-eslint/prefer-includes': 'off',
        '@typescript-eslint/consistent-type-assertions': 'warn',
        '@typescript-eslint/semi': 'off',
        'no-array-constructor': 'off',
        '@typescript-eslint/space-before-function-paren': 'off',
        '@typescript-eslint/no-array-constructor': 'warn',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/ban-types': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'warn',
          {
            functions: true,
            classes: true,
            variables: true,
            enums: true,
            typedefs: true
          }
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            args: 'none',
            ignoreRestSiblings: true
          }
        ],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true
          }
        ],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'warn',
        '@typescript-eslint/prefer-literal-enum-member': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error'
      }
    }
  ],
  settings: {
    react: {
      version: 'detect'
    }
  }
};
