module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-idiomatic-order",
    "stylelint-config-css-modules",
  ],
  rules: {
    "selector-class-pattern":
      "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$|^[a-z][a-zA-Z0-9]+$",
  },
};
