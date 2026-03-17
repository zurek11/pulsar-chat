import { clearHistory, streamChat } from '$lib/services/api';
import type { Message } from '$lib/types/chat';

class ChatState {
	messages = $state<Message[]>([]);
	isStreaming = $state(false);
	error = $state<string | null>(null);

	messageCount = $derived(this.messages.length);
	hasMessages = $derived(this.messages.length > 0);

	private abortController: AbortController | null = null;

	async sendMessage(text: string): Promise<void> {
		if (this.isStreaming || !text.trim()) return;

		this.error = null;

		const userMessage: Message = {
			id: crypto.randomUUID(),
			role: 'user',
			content: text.trim(),
			createdAt: new Date()
		};
		this.messages.push(userMessage);

		const assistantId = crypto.randomUUID();
		this.messages.push({
			id: assistantId,
			role: 'assistant',
			content: '',
			createdAt: new Date()
		});

		this.isStreaming = true;
		this.abortController = new AbortController();

		try {
			for await (const token of streamChat(text.trim(), this.abortController.signal)) {
				// Access via the reactive proxy so Svelte tracks the mutation
				const msg = this.messages[this.messages.length - 1];
				msg.content += token;
			}
		} catch (err) {
			if (err instanceof Error && err.name === 'AbortError') {
				// user cancelled — keep what we have
			} else {
				this.error = err instanceof Error ? err.message : 'Something went wrong';
				// remove the empty assistant message if nothing was streamed
				if (!this.messages[this.messages.length - 1]?.content) {
					this.messages = this.messages.filter((m) => m.id !== assistantId);
				}
			}
		} finally {
			this.isStreaming = false;
			this.abortController = null;
		}
	}

	stopStreaming(): void {
		this.abortController?.abort();
	}

	async clearChat(): Promise<void> {
		if (this.isStreaming) return;

		try {
			await clearHistory();
			this.messages = [];
			this.error = null;
		} catch (err) {
			this.error = err instanceof Error ? err.message : 'Failed to clear history';
		}
	}
}

export const chatState = new ChatState();
