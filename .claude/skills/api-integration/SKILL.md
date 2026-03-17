---
name: api-integration
description: 'REQUIRED when adding or modifying API calls, SSE streams, or backend communication. Invoke this skill before writing fetch or streaming code.'
allowed-tools: Read, Write, Edit, Glob, Grep
---

# API Integration Pattern

## When to Use

- Adding a new API call to pulsar-api
- Implementing streaming response handling
- Adding error handling for network requests

## Streaming Fetch Pattern

All API calls go through `src/lib/services/api.ts`.

```typescript
import { PUBLIC_API_URL } from '$env/static/public';

const BASE_URL = PUBLIC_API_URL || 'http://localhost:8000';

export async function* streamChat(message: string, signal?: AbortSignal): AsyncGenerator<string> {
	const response = await fetch(`${BASE_URL}/api/chat`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ message }),
		signal
	});

	if (!response.ok) {
		throw new Error(`API error: ${response.status}`);
	}

	const reader = response.body?.getReader();
	if (!reader) throw new Error('No response body');

	const decoder = new TextDecoder();

	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			const chunk = decoder.decode(value, { stream: true });
			const lines = chunk.split('\n');
			for (const line of lines) {
				if (line.startsWith('data: ')) {
					const data = line.slice(6);
					if (data === '[DONE]') return;
					yield data;
				}
			}
		}
	} finally {
		reader.releaseLock();
	}
}
```

## Rules

1. All API calls in `src/lib/services/` — never inline fetch in components
2. Use `PUBLIC_API_URL` env variable, never hardcode URLs
3. Always handle errors — show user-friendly messages
4. Streaming uses async generators — components consume with `for await...of`
5. Support `AbortController` for cancellation (user stops generation)
6. Type all request/response shapes in `src/lib/types/`
7. No API keys or secrets on frontend — everything proxied through pulsar-api
