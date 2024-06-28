<script lang="ts">
	import Select from 'svelte-select';
	import { type ReferenialActionSelectOptionItem } from '$lib/types/schemas';
	import ReferenialActionSelectItem from '$lib/components/shared/selects/ReferenialActionSelectItem.svelte';

	export let id: string;
	export let justValue: string = '';

	let actions: ReferenialActionSelectOptionItem[] = [
		{ label: 'No Action', value: 'No Action' },
		{ label: 'Cascade', value: 'Cascade' },
		{ label: 'Restrict', value: 'Restrict' },
		{ label: 'Set Null', value: 'Set Null' }
	];
</script>

<Select
	{id}
	items={actions}
	placeholder={'Select an action'}
	searchable={false}
	bind:justValue
	required
>
	<div slot="item" let:item>
		<ReferenialActionSelectItem action={item} />
	</div>

	<div slot="selection" let:selection>
		<ReferenialActionSelectItem action={selection} />
	</div>
</Select>
