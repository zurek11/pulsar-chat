<script lang="ts">
	interface Props {
		isStreaming: boolean;
		onsubmit: (text: string) => void;
		onstop: () => void;
		onclear: () => void;
		hasMessages: boolean;
	}

	let { isStreaming, onsubmit, onstop, onclear, hasMessages }: Props = $props();

	let value = $state('');
	let textarea: HTMLTextAreaElement | undefined = $state();

	function handleSubmit(): void {
		if (!value.trim() || isStreaming) return;
		onsubmit(value);
		value = '';
		if (textarea) {
			textarea.style.height = 'auto';
		}
	}

	function handleKeydown(e: KeyboardEvent): void {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	}

	function handleInput(): void {
		if (!textarea) return;
		textarea.style.height = 'auto';
		textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
	}
</script>

<div class="border-pulsar-border bg-pulsar-bg border-t px-4 py-3">
	<div class="border-pulsar-border bg-pulsar-surface flex items-end gap-2 rounded-xl border p-2">
		<textarea
			bind:this={textarea}
			bind:value
			rows="1"
			placeholder="Ask about RAG..."
			disabled={isStreaming}
			aria-label="Message input"
			data-testid="chat-input"
			oninput={handleInput}
			onkeydown={handleKeydown}
			class="text-pulsar-text placeholder:text-pulsar-muted max-h-40 flex-1 resize-none bg-transparent px-2 py-1 text-sm outline-none disabled:opacity-50"
		></textarea>

		<div class="flex shrink-0 items-center gap-1">
			{#if hasMessages}
				<button
					type="button"
					disabled={isStreaming}
					aria-label="Clear chat history"
					data-testid="clear-button"
					onclick={onclear}
					class="text-pulsar-muted rounded-lg p-1.5 transition-colors hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="3 6 5 6 21 6"></polyline>
						<path d="M19 6l-1 14H6L5 6"></path>
						<path d="M10 11v6"></path>
						<path d="M14 11v6"></path>
						<path d="M9 6V4h6v2"></path>
					</svg>
				</button>
			{/if}

			{#if isStreaming}
				<button
					type="button"
					aria-label="Stop generation"
					data-testid="stop-button"
					onclick={onstop}
					class="bg-pulsar-border text-pulsar-text hover:bg-pulsar-accent rounded-lg p-1.5 transition-colors"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<rect x="6" y="6" width="12" height="12" rx="1"></rect>
					</svg>
				</button>
			{:else}
				<button
					type="button"
					disabled={!value.trim()}
					aria-label="Send message"
					data-testid="send-button"
					onclick={handleSubmit}
					class="bg-pulsar-accent hover:bg-pulsar-accent-hover rounded-lg p-1.5 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="22" y1="2" x2="11" y2="13"></line>
						<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
					</svg>
				</button>
			{/if}
		</div>
	</div>

	<p class="text-pulsar-muted mt-1.5 text-center text-xs">
		Press Enter to send · Shift+Enter for new line
	</p>
</div>
