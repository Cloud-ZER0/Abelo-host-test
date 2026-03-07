/**
 * @type {import("prettier").Config}
 */
const config = {
  semi: true,
  useTabs: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-pkg"],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrder: [
    "<BUILT_IN_MODULES>",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/(?!public/).*$",
    "",
    "^@/public/.*$",
    "",
    "^(?!.*[.]s?css$)[./].*$",
    "",
    ".s?css$",
  ],
};

export default config;
