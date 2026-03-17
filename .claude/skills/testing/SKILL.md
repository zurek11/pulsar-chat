---
name: testing
description: 'REQUIRED when writing or fixing tests. Invoke this skill before creating test files or modifying existing ones.'
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(bun:*), Bash(bunx:*)
---

# Testing Patterns

## When to Use

- Writing tests for a new component or feature
- Fixing failing tests
- Adding coverage for existing code

## Unit Tests (Vitest)

Location: `tests/unit/`
Naming: `[feature].test.ts`

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import ChatInput from '$lib/components/chat/ChatInput.svelte';

describe('ChatInput', () => {
	it('should render input field', () => {
		render(ChatInput);
		expect(screen.getByRole('textbox')).toBeTruthy();
	});

	it('should call onSend when submit button clicked', async () => {
		const onSend = vi.fn();
		render(ChatInput, { props: { onSend } });

		const input = screen.getByRole('textbox');
		await fireEvent.input(input, { target: { value: 'Hello' } });
		await fireEvent.click(screen.getByRole('button', { name: /send/i }));

		expect(onSend).toHaveBeenCalledWith('Hello');
	});

	it('should disable send button when input is empty', () => {
		render(ChatInput);
		const button = screen.getByRole('button', { name: /send/i });
		expect(button.hasAttribute('disabled')).toBe(true);
	});
});
```

## E2E Tests (Playwright)

Location: `tests/e2e/`
Naming: `[flow].spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test('should send message and receive streamed response', async ({ page }) => {
	await page.goto('/');

	const input = page.getByRole('textbox');
	await input.fill('What is RAG?');
	await input.press('Enter');

	await expect(page.getByText('What is RAG?')).toBeVisible();
	await expect(page.locator('[data-testid="assistant-message"]')).toBeVisible({ timeout: 10000 });
});

test('should clear chat history', async ({ page }) => {
	await page.goto('/');

	await page.getByRole('textbox').fill('Hello');
	await page.getByRole('textbox').press('Enter');

	await page.getByRole('button', { name: /clear/i }).click();

	await expect(page.locator('[data-testid="message-list"]')).toBeEmpty();
});
```

## Rules

1. Unit tests: `tests/unit/` — test components, utils, services in isolation
2. E2E tests: `tests/e2e/` — test full user flows with Playwright
3. Use `data-testid` attributes for e2e selectors — not CSS classes
4. Mock API calls in unit tests — never hit real backend
5. Run `bun test:unit` for quick feedback, `bun test:e2e` for integration
6. Test accessibility: keyboard navigation, screen reader compat
7. Follow AAA pattern: Arrange, Act, Assert
