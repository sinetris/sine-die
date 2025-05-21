/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard"],
  rules: {
    "no-descending-specificity": null,
  },
  overrides: [
    {
      files: ["*.scss"],
      extends: ["stylelint-config-standard-scss"],
    },
  ],
};
