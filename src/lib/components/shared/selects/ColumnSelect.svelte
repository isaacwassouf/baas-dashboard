<script lang="ts">
	import Select from 'svelte-select';
	import type { ColumnSelectOptionItem } from '$lib/types/schemas';
	import { listColumns } from '$lib/api/schemas';
	import ColumnSelectItem from '$lib/components/shared/selects/ColumnSelectItem.svelte';

	export let tableName: string;
	export let justValue: string = '';

	let open: boolean = false;
	let loading: boolean = false;
	let floatingConfig = {
		strategy: 'fixed'
	};

	let columns: ColumnSelectOptionItem[] = [];
	let currentValue: ColumnSelectOptionItem | null = null;

	const loadColumns = async () => {
		loading = true;
		try {
			const result = await listColumns(tableName);
			if (result?.columnsList) {
				columns = result.columnsList.map((column) => ({
					value: column.columnName,
					label: column.columnName
				}));
			} else {
				columns = [];
			}
		} catch (error) {
			console.error(error);
			columns = [];
		} finally {
			loading = false;
		}
	};

	// reload the columns when the table name changes
	$: if (tableName) {
		currentValue = null;
		if (tableName !== 'users') {
			loadColumns();
		} else {
			columns = [{ value: 'id', label: 'id' }];
		}
	}
</script>

<Select
	id="tags"
	items={columns}
	bind:value={currentValue}
	bind:justValue
	placeholder={'Select column'}
	{floatingConfig}
	bind:loading
	bind:listOpen={open}
	required
>
	<div slot="item" let:item>
		<ColumnSelectItem column={item} />
	</div>

	<div slot="selection" let:selection>
		<ColumnSelectItem column={selection} />
	</div>
</Select>
