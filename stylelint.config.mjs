/** @type {import('stylelint').Config} */
const stylelintConfig = {
	extends: [
		"stylelint-config-recommended-scss",
		"stylelint-config-clean-order/error",
	],
	plugins: ["stylelint-scss"],
	customSyntax: "postcss-scss",
	rules: {
		"selector-class-pattern": "^[a-z][a-zA-Z0-9]+$",
		"scss/no-duplicate-dollar-variables": true,
		"no-descending-specificity": null,
	},
	ignoreFiles: ["node_modules/**/*", ".next/**/*", "out/**/*"],
};

export default stylelintConfig;
