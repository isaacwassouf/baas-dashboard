<script lang="ts">
	import { type TableSelectOptionItem } from '$lib/types/schemas';
	import { Badge } from 'flowbite-svelte';

	export let table: TableSelectOptionItem | null = null;
</script>

{#if table}
	<div class="p-2">
		<Badge large class="bg-gray-300 text-gray-800">{table.label}</Badge>
	</div>
{/if}
