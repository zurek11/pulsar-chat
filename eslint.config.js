import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tsParser,
			globals: { ...globals.browser, ...globals.node }
		},
		plugins: { '@typescript-eslint': ts },
		rules: {
			...ts.configs.recommended.rules
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: { parser: tsParser },
			globals: { ...globals.browser }
		},
		rules: {
			// TypeScript interfaces with function-type params are falsely flagged
			// svelte-check / tsc handle unused-var detection for Svelte files
			'no-unused-vars': 'off'
		}
	},
	{
		// Svelte 5 rune globals for .svelte.ts state modules
		files: ['**/*.svelte.ts'],
		languageOptions: {
			globals: {
				$state: 'readonly',
				$derived: 'readonly',
				$effect: 'readonly',
				$props: 'readonly',
				$bindable: 'readonly',
				$inspect: 'readonly',
				$host: 'readonly'
			}
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'node_modules/']
	}
];
