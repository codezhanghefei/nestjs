module.exports = {
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "project": "tsconfig.json",
      "sourceType": "module",
      "ecmaVersion": 2020,
      "ecmaFeatures": {
        "experimentalObjectRestSpread": true
      }
    },
    "plugins": ["@typescript-eslint/eslint-plugin"],
    "extends": [
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
      "prettier/@typescript-eslint"
    ],
    "root": true,
    "env": {
      "node": true,
      "jest": true
    },
    "rules": {
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "semi": [
        "error",
        "always"
      ],
      "eqeqeq": [
        "error",
        "always",
        {
          "null": "ignore"
        }
      ],
      "arrow-parens": [
        "error",
        "always"
      ],
      "arrow-spacing": [
        "error",
        {
          "before": true,
          "after": true
        }
      ],
      "block-spacing": [
        "error",
        "always"
      ],
      "brace-style": [
        "error",
        "1tbs",
        {
          "allowSingleLine": true
        }
      ],
      "comma-dangle": [
        "error",
        "always-multiline"
      ],
      "comma-spacing": [
        "error",
        {
          "before": false,
          "after": true
        }
      ],
      "comma-style": [
        "error",
        "last"
      ],
      "array-bracket-spacing": [
        "error",
        "always"
      ],
      "no-trailing-spaces": "error",
      "quotes": [
        2,
        "single",
        {
          "avoidEscape": true,
          "allowTemplateLiterals": true
        }
      ]
    } 
};
