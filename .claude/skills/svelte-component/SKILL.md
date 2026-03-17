---
name: svelte-component
description: Create new Svelte 5 components with runes, TypeScript props, and Tailwind styling. Use when adding UI components, chat elements, or reusable widgets.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# New Svelte 5 Component

## When to Use
- Creating a new reusable component
- Adding a new chat UI element (message bubble, input, typing indicator)
- Building any interactive widget

## Component Template

```svelte
<script lang="ts">
  interface Props {
    // Define typed props here
    label: string;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
  }

  let { label, variant = 'primary', disabled = false }: Props = $props();

  // Reactive state with $state()
  let count = $state(0);

  // Derived values with $derived()
  const isActive = $derived(count > 0);

  // Side effects with $effect()
  $effect(() => {
    // Runs when dependencies change
    console.log('count changed:', count);
  });

  // Event handlers prefixed with "handle"
  function handleClick() {
    count += 1;
  }
</script>

<div class="flex items-center gap-2">
  <button
    class="px-4 py-2 rounded-lg {variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}"
    {disabled}
    onclick={handleClick}
  >
    {label}
  </button>
</div>
```

## Rules
1. Always use Svelte 5 runes — never `$:`, `export let`, or stores API
2. Props interface at top of `<script>` block, always typed
3. Use `$props()` destructuring with defaults
4. Svelte 5 uses `onclick={handler}` not `on:click={handler}`
5. One component per file in `src/lib/components/`
6. Chat components go in `src/lib/components/chat/`
7. Generic UI components go in `src/lib/components/ui/`
8. Include ARIA attributes for accessibility
9. Use Tailwind classes — no inline styles or custom CSS
10. Event handlers start with `handle` prefix
