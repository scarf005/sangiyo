// @ts-check

/** @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	env: { browser: true, es2020: true },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: [ "./tsconfig.json", "./tsconfig.node.json" ],
        tsconfigRootDir: __dirname,
    },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/strict-type-checked",
		"plugin:react-hooks/recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
	],
    settings: {
        react: {
            version: "detect",
        }
    },
	ignorePatterns: ["dist", "scripts", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh"],
	rules: {
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
        "@typescript-eslint/no-confusing-void-expression": "off"
	},
}
