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

export async function clearHistory(): Promise<void> {
	const response = await fetch(`${BASE_URL}/api/chat/history`, {
		method: 'DELETE'
	});

	if (!response.ok) {
		throw new Error(`API error: ${response.status}`);
	}
}
