<script lang="ts">
	import { type ColumnSelectOptionItem } from '$lib/types/schemas';

	export let column: ColumnSelectOptionItem | null = null;
</script>

{#if column}
	<div class="p-1">
		{column.label}
	</div>
{/if}
