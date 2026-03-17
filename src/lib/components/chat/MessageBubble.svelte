<script lang="ts">
	import type { Message } from '$lib/types/chat';

	interface Props {
		message: Message;
	}

	let { message }: Props = $props();
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
			<p class="break-words whitespace-pre-wrap">{message.content}</p>
		{/if}
	</div>
</div>
