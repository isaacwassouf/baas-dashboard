<script lang="ts">
	import { TableBodyCell, TableBodyRow, Input, Select, Checkbox } from 'flowbite-svelte';
	import { type AddColumnDetails } from '$lib/types/schemas';
	import { addColumnsStore } from '$lib/stores/add-columns';

	// props
	export let columnDetails: AddColumnDetails;
	export let index: number;

	let countries = [
		{ value: 'int16', name: 'int16' },
		{ value: 'uint16', name: 'uint16' },
		{ value: 'int24', name: 'int24' },
		{ value: 'uint24', name: 'uint24' },
		{ value: 'int32', name: 'int32' },
		{ value: 'uint32', name: 'uint32' },
		{ value: 'int64', name: 'int64' },
		{ value: 'uint64', name: 'uint64' }
	];

	const removeColumn = () => {
		addColumnsStore.update((columns) => columns.filter((_, i) => i !== index));
	};

	$: isSystemColumn =
		columnDetails.uniqueId === 'ID' ||
		columnDetails.uniqueId === 'CREATED_AT' ||
		columnDetails.uniqueId === 'UPDATED_AT';
</script>

<TableBodyRow>
	<TableBodyCell class="px-2 py-1">
		<Input
			type="text"
			name="column-name"
			size="md"
			placeholder="column name"
			required
			bind:value={columnDetails.columnName}
			disabled={isSystemColumn}
		/>
	</TableBodyCell>

	<TableBodyCell class="px-2 py-1">
		<Select
			items={countries}
			bind:value={columnDetails.columnType}
			placeholder="----"
			disabled={isSystemColumn}
			class={isSystemColumn ? 'cursor-not-allowed' : ''}
		/>
	</TableBodyCell>

	<TableBodyCell class="px-2 py-1">
		<Input
			type="text"
			name="column-default"
			size="md"
			required
			bind:value={columnDetails.columnDefault}
			disabled={isSystemColumn}
		/>
	</TableBodyCell>

	<TableBodyCell class="px-2 py-1">
		<Checkbox
			name="column-primary"
			checked={columnDetails.isPrimary}
			disabled={isSystemColumn}
			class={isSystemColumn ? 'cursor-not-allowed opacity-80' : ''}
		/>
	</TableBodyCell>

	<TableBodyCell class="px-2 py-1">
		<Checkbox
			name="column-Unique"
			bind:checked={columnDetails.isUnique}
			disabled={isSystemColumn}
			class={isSystemColumn ? 'cursor-not-allowed opacity-80' : ''}
		/>
	</TableBodyCell>

	<TableBodyCell class="px-2 py-1">
		<Checkbox
			name="column-nullable"
			bind:checked={columnDetails.isNullable}
			disabled={isSystemColumn}
			class={isSystemColumn ? 'cursor-not-allowed opacity-80' : ''}
		/>
	</TableBodyCell>

	<TableBodyCell class="px-2 py-1">
		{#if isSystemColumn}
			<span class="text-xs text-gray-500 dark:text-gray-400">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="size-4"
				>
					<path
						fill-rule="evenodd"
						d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		{:else}
			<button on:click|preventDefault={removeColumn}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="size-4 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
				>
					<path
						fill-rule="evenodd"
						d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		{/if}
	</TableBodyCell>
</TableBodyRow>
