<script lang="ts">
	import Select from 'svelte-select';
	import { type ColumnTypeSelectOptionItem } from '$lib/types/schemas';
	import ColumnTypeSelectItem from './ColumnTypeSelectItem.svelte';

	export let id: string;
	export let justValue: string = '';
	export let disabled: boolean = false;

	let floatingConfig = {
		strategy: 'fixed'
	};

	let columnTypes: ColumnTypeSelectOptionItem[] = [
		{ value: 'uint16', label: 'uint16', root: 'numerical' },
		{ value: 'uint32', label: 'uint32', root: 'numerical' },
		{ value: 'uint64', label: 'uint64', root: 'numerical' },
		{ value: 'int16', label: 'int16', root: 'numerical' },
		{ value: 'int32', label: 'int32', root: 'numerical' },
		{ value: 'int64', label: 'int64', root: 'numerical' },
		{ value: 'varchar', label: 'varchar', root: 'string' },
		{ value: 'text', label: 'text', root: 'string' },
		{ value: 'timestamp', label: 'timestamp', root: 'date' },
		{ value: 'boolean', label: 'boolean', root: 'boolean' },
		{ value: 'float', label: 'float', root: 'numerical' },
		{ value: 'double', label: 'double', root: 'numerical' },
		{ value: 'decimal', label: 'decimal', root: 'numerical' }
	];

	const groupByRoot = (item: ColumnTypeSelectOptionItem) => item.root;
</script>

<Select
	{id}
	items={columnTypes}
	placeholder={'Select a column type'}
	searchable={false}
	bind:justValue
	groupBy={groupByRoot}
	{floatingConfig}
	{disabled}
	required
>
	<div slot="item" let:item>
		<ColumnTypeSelectItem columnType={item} />
	</div>

	<div slot="selection" let:selection>
		<ColumnTypeSelectItem columnType={selection} />
	</div>
</Select>
