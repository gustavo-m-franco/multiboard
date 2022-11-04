module.exports = {
  root: true,
  extends: [
    '@react-native-community/eslint-config',
    'standard-with-typescript',
    'eslint-config-prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  env: {
    'react-native/react-native': true,
  },
  rules: {
    'prettier/prettier': 'error',
    // These are the rules that I use
    'react-native/no-unused-styles': 'error',
    'react-native/no-inline-styles': 'error',
    'react-native/no-raw-text': [
      'warn',
      {
        skip: ['CustomText'],
      },
    ],
    'react-native/no-single-element-style-arrays': 'warn',
    'object-curly-spacing': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowTypedFunctionExpressions: false,
      },
    ],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/require-array-sort-compare': [
      'error',
      {
        ignoreStringArrays: true,
      },
    ],
    'react/jsx-curly-spacing': [
      'error',
      {
        when: 'never',
        allowMultiline: true,
        children: true,
      },
    ],
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': 'error',
    semi: ['error', 'always'],
    'no-shadow': 'off',
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
  },
};
