<script lang="ts">
	import Select from 'svelte-select';
	import TableSelectItem from './selects/TableSelectItem.svelte';
	import type { TableSelectOptionItem } from '$lib/types/schemas';
	import { listTables } from '$lib/api/schemas';

	export let justValue: string = '';

	let open: boolean = false;
	let loading: boolean = false;
	let hasBeenOpened: boolean = false;
	let floatingConfig = {
		strategy: 'fixed'
	};

	let tables: TableSelectOptionItem[] = [];

	const loadTables = async () => {
		loading = true;
		try {
			const result = await listTables();
			if (result?.tablesList) {
				tables = result.tablesList.map((table) => ({
					value: table.tableName,
					label: table.tableName
				}));
			} else {
				tables = [];
			}
			// push the users table
			tables.push({
				value: 'users',
				label: 'users'
			});
		} catch (error) {
			console.error(error);
			tables = [];
		} finally {
			loading = false;
		}
	};

	$: if (open && !hasBeenOpened) {
		loadTables();
		hasBeenOpened = true;
	}
</script>

<Select
	id="tags"
	items={tables}
	bind:justValue
	placeholder={'Select table'}
	{floatingConfig}
	bind:loading
	bind:listOpen={open}
	required
>
	<div slot="item" let:item>
		<TableSelectItem table={item} />
	</div>

	<div slot="selection" let:selection>
		<TableSelectItem table={selection} />
	</div>
</Select>
