import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	{
		rules: {
			// If there's a declared variable that is not accessed, warn about it
			'no-unused-vars': 'warn',
			// Same for a function
			'no-unused-expressions': 'warn',
			// Do not allow omitting curly braces in control structures
			curly: 'error',
			// Do not allow missing semicolons
			semi: 'error',
		},
	},
];
