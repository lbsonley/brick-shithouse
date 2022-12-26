module.exports = {
  extends: ["next/core-web-vitals", "plugin:unicorn/recommended"],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    semi: "error",
    quotes: "error",
    "max-len": ["error", {
      code: 80,
    }],
    "unicorn/no-null": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        allowList: {
          "props": true,
          "Props": true,
        },
      },
    ],
  },
};
