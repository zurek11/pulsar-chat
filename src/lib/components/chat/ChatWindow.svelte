<script lang="ts">
	import { chatState } from '$lib/stores/chat.svelte';
	import ChatInput from './ChatInput.svelte';
	import MessageBubble from './MessageBubble.svelte';
	import TypingIndicator from './TypingIndicator.svelte';

	let messagesEnd: HTMLDivElement | undefined = $state();

	$effect(() => {
		// scroll to bottom whenever messages change or streaming updates
		chatState.messages;
		chatState.isStreaming;
		messagesEnd?.scrollIntoView({ behavior: 'smooth' });
	});

	async function handleSubmit(message: string): Promise<void> {
		await chatState.sendMessage(message);
	}

	function handleStop(): void {
		chatState.stopStreaming();
	}

	async function handleClear(): Promise<void> {
		await chatState.clearChat();
	}
</script>

<div class="bg-pulsar-bg flex h-screen flex-col" data-testid="chat-window">
	<!-- Header -->
	<header class="border-pulsar-border bg-pulsar-bg border-b px-6 py-4">
		<div class="flex items-center gap-3">
			<div class="bg-pulsar-accent flex h-8 w-8 items-center justify-center rounded-lg">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="white"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
			</div>
			<div>
				<h1 class="text-pulsar-text text-sm font-semibold">Pulsar</h1>
				<p class="text-pulsar-muted text-xs">RAG-powered chat</p>
			</div>
		</div>
	</header>

	<!-- Messages -->
	<main class="flex-1 overflow-y-auto px-4 py-6" aria-label="Chat messages" aria-live="polite">
		{#if !chatState.hasMessages}
			<div class="flex h-full flex-col items-center justify-center gap-3 text-center">
				<div
					class="bg-pulsar-surface border-pulsar-border flex h-16 w-16 items-center justify-center rounded-2xl border"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="28"
						height="28"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-pulsar-accent"
					>
						<circle cx="11" cy="11" r="8"></circle>
						<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
					</svg>
				</div>
				<div>
					<p class="text-pulsar-text font-medium">Ask me anything about RAG</p>
					<p class="text-pulsar-muted mt-1 text-sm">
						I have access to research papers, docs, and tutorials
					</p>
				</div>
			</div>
		{:else}
			<div class="mx-auto flex max-w-2xl flex-col gap-4">
				{#each chatState.messages as message (message.id)}
					{#if message.role === 'assistant' && !message.content && chatState.isStreaming}
						<div class="flex justify-start">
							<div
								class="bg-pulsar-surface border-pulsar-border rounded-2xl rounded-bl-sm border px-4 py-3"
							>
								<TypingIndicator />
							</div>
						</div>
					{:else}
						<MessageBubble {message} />
					{/if}
				{/each}
			</div>
		{/if}

		<div bind:this={messagesEnd}></div>
	</main>

	<!-- Error banner -->
	{#if chatState.error}
		<div
			class="mx-4 mb-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400"
			role="alert"
		>
			{chatState.error}
		</div>
	{/if}

	<!-- Input -->
	<ChatInput
		isStreaming={chatState.isStreaming}
		hasMessages={chatState.hasMessages}
		onsubmit={handleSubmit}
		onstop={handleStop}
		onclear={handleClear}
	/>
</div>
