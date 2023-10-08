// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("node:path");

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
	"env": {
		"es2024": true
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: path.join(__dirname, "tsconfig.json"),
		"ecmaVersion": "latest",
		"sourceType": "module",
	},
	plugins: ["@typescript-eslint", "unicorn", "sonarjs"],
	extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended", "plugin:unicorn/recommended", "plugin:sonarjs/recommended"],
	rules: {
		"unicorn/no-useless-undefined": "off",
		"unicorn/no-null": "off",
		"@typescript-eslint/no-unsafe-call": "warn",
		"@typescript-eslint/no-misused-promises": [2, {
			"checksVoidReturn": {
				"attributes": false
			}
		}],
		"unicorn/prevent-abbreviations": [
			"error",
			{
				"replacements": {
					"props": false,
					"ref": false
				}
			}
		],
		"unicorn/no-keyword-prefix": "off",
		"unicorn/no-array-for-each": "off",
		"unicorn/better-regex": "error",
		'max-lines': [
			'error',
			{
				max: 100,
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
