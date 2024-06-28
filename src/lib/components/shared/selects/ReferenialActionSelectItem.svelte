<script lang="ts">
	import { type ReferenialActionSelectOptionItem } from '$lib/types/schemas';

	export let action: ReferenialActionSelectOptionItem | null = null;
</script>

{#if action}
	<div class="p-1">
		{action.label}
	</div>
{/if}
