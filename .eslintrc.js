module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'semi': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    "class-name": true,
    "comment-format": [
      true,
      "check-space"
    ],
    "indent": [
      true,
      "spaces"
    ],
    "no-duplicate-variable": true,
    "no-eval": true,
    "no-internal-module": false,
    "no-trailing-whitespace": false,
    "no-var-keyword": true,
    "one-line": [
      true,
      "check-open-brace",
      "check-whitespace"
    ],
    "quotemark": [
      true,
      "single"
    ],
    "semicolon": [
      true
    ],
    "triple-equals": [
      true,
      "allow-null-check"
    ],
    "typedef-whitespace": [
      true,
      {
        "call-signature": "nospace",
        "index-signature": "nospace",
        "parameter": "nospace",
        "property-declaration": "nospace",
        "variable-declaration": "nospace"
      }
    ],
    "variable-name": [
      true,
      "ban-keywords"
    ],
    "whitespace": [
      true,
      "check-branch",
      "check-decl",
      "check-operator",
      "check-separator",
      "check-type"
    ]
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  overrides: [
    {
      files: [
        '*/_tests_/.{j,t}s?(x)',
        '*/tests/unit//.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}