<script lang="ts">
	interface Props {
		variant?: 'primary' | 'ghost' | 'danger';
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		ariaLabel?: string;
		onclick?: () => void;
		children: import('svelte').Snippet;
	}

	let {
		variant = 'primary',
		disabled = false,
		type = 'button',
		ariaLabel,
		onclick,
		children
	}: Props = $props();
</script>

<button
	{type}
	{disabled}
	aria-label={ariaLabel}
	{onclick}
	class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40
		{variant === 'primary'
		? 'bg-pulsar-accent hover:bg-pulsar-accent-hover text-white'
		: variant === 'danger'
			? 'text-red-400 hover:bg-red-400/10'
			: 'text-pulsar-muted hover:bg-pulsar-border hover:text-pulsar-text'}"
>
	{@render children()}
</button>
