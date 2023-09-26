// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
	root: true,
	overrides: [
		{
			files: ['*.tsx'],
			rules: {
				'max-lines-per-function': 'off',
			},
		},
		{
			files: ['*.cjs'],
			rules: {
				'max-lines': 'off',
			},
		},
		{
			extends: [
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
			],
			files: ["*.ts", "*.tsx"],
			parserOptions: {
				project: path.join(__dirname, "tsconfig.json"),
			},
		},
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: path.join(__dirname, "tsconfig.json"),
	},
	plugins: ["@typescript-eslint"],
	extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
	rules: {
		'max-lines': [
			'error',
			{
				max: 50,
				skipBlankLines: true,
				skipComments: true,
			},
		],
		'max-lines-per-function': [
			'error',
			{
				max: 20,
				skipBlankLines: true,
				skipComments: true,
				IIFEs: true,
			}],
		"@typescript-eslint/consistent-type-imports": [
			"warn",
			{
				prefer: "type-imports",
				fixStyle: "inline-type-imports",
			},
		],
		"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
	},
};

module.exports = config;
