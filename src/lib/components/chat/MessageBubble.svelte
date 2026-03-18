<script lang="ts">
	import { marked } from 'marked';
	import type { Message } from '$lib/types/chat';

	interface Props {
		message: Message;
	}

	let { message }: Props = $props();

	function renderMarkdown(content: string): string {
		return marked.parse(content, { breaks: true }) as string;
	}
</script>

<div
	class="flex w-full {message.role === 'user' ? 'justify-end' : 'justify-start'}"
	data-testid="message-bubble"
>
	<div
		class="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed
			{message.role === 'user'
			? 'bg-pulsar-accent rounded-br-sm text-white'
			: 'bg-pulsar-surface border-pulsar-border text-pulsar-text rounded-bl-sm border'}"
	>
		{#if message.content}
			{#if message.role === 'assistant'}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -- intentional: LLM output rendered as markdown -->
				<div class="markdown-content break-words">{@html renderMarkdown(message.content)}</div>
			{:else}
				<p class="break-words whitespace-pre-wrap">{message.content}</p>
			{/if}
		{/if}
	</div>
</div>
