<script lang="ts">
	import { TableBodyCell, TableBodyRow, Input, Checkbox } from 'flowbite-svelte';
	import { type NewColumnDetails } from '$lib/types/schemas';
	import { addColumnsStore } from '$lib/stores/add-columns';
	import ColumnTypeSelect from '../shared/selects/ColumnTypeSelect.svelte';

	// props
	export let columnDetails: NewColumnDetails;
	export let index: number;
	export let isSystemColumn: boolean = false;

	const removeColumn = () => {
		addColumnsStore.update((columns) => columns.filter((_, i) => i !== index));
	};
</script>

<TableBodyRow>
	<TableBodyCell class="w-48 px-2 py-1">
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

	<TableBodyCell class="w-64 px-2 py-1">
		<div class="flex gap-2">
			<ColumnTypeSelect
				id="columnType"
				disabled={isSystemColumn}
				bind:justValue={columnDetails.columnType}
			/>

			{#if columnDetails.columnType === 'varchar'}
				<Input
					type="number"
					class="basis-1/4"
					name="column-length"
					min="0"
					max="65535"
					size="md"
					placeholder="length"
					required
					bind:value={columnDetails.columnLength}
					disabled={isSystemColumn}
				/>
			{/if}
		</div>
	</TableBodyCell>

	<TableBodyCell class="w-48 px-2 py-1">
		<Input
			type="text"
			name="column-default"
			size="md"
			required
			bind:value={columnDetails.columnDefault}
			disabled={isSystemColumn}
		/>
	</TableBodyCell>

	<TableBodyCell class="w-12 px-2 py-1">
		<Checkbox
			name="column-Unique"
			bind:checked={columnDetails.isUnique}
			disabled={isSystemColumn}
			class={isSystemColumn ? 'cursor-not-allowed opacity-80' : ''}
		/>
	</TableBodyCell>

	<TableBodyCell class="w-12 px-2 py-1">
		<Checkbox
			name="column-nullable"
			bind:checked={columnDetails.isNotNullable}
			disabled={isSystemColumn}
			class={isSystemColumn ? 'cursor-not-allowed opacity-80' : ''}
		/>
	</TableBodyCell>

	<TableBodyCell class="ml-auto w-12 px-2 py-1">
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
