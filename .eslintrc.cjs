module.exports = {
  extends: ["next/core-web-vitals", "plugin:unicorn/recommended"],
  ignorePatterns: [
    "graphql/*",
  ],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    semi: "error",
    quotes: "error",
    "max-len": ["error", {
      code: 80,
    }],
    "unicorn/filename-case": [
      "error",
      {
        "case": "kebabCase",
        "ignore": [
          // allow pascalCase in [dynamicRoutes]
          /^\[[a-z][A-Za-z]*]\.tsx$/,
        ],
      },
    ],
    "unicorn/no-null": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        allowList: {
          "props": true,
          "Props": true,
          "params": true,
          "Params": true,
        },
      },
    ],
  },
};
