import js from '@eslint/js';
import globals from 'globals';

export default [
	{
		ignores: ['dist/**', 'node_modules/**'],
	},
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.browser,
			},
		},
		rules: {
			'no-mixed-spaces-and-tabs': 'off',
			indent: ['error', 'tab'],
			'linebreak-style': ['error', 'unix'],
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
		},
	},
];
