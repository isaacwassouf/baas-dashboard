<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Indicator,
		Badge
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { listColumns } from '$lib/api/schemas';
	import { type ColumnDetails } from '$lib/types/schemas';
	import { onMount } from 'svelte';

	const { name } = $page.params;
	let columnsDetails: ColumnDetails[] = [];

	const loadColumns = async (tableName: string) => {
		try {
			const result = await listColumns(tableName);

			columnsDetails = result?.columnsList ?? [];
		} catch (error) {
			console.error(error);
		}
	};

	onMount(async () => {
		if (name) {
			await loadColumns(name);
		}
	});
</script>

<Table>
	<caption
		class="rounded-t-md bg-gray-100 p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white"
	>
		Table columns

		<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
			List of columns for table <Badge large class="bg-gray-300 text-gray-800">{name}</Badge>
		</p>
	</caption>
	<TableHead class="bg-gray-200">
		<TableHeadCell>Column name</TableHeadCell>
		<TableHeadCell>Column type</TableHeadCell>
		<TableHeadCell>Default value</TableHeadCell>
		<TableHeadCell>Not Nullable</TableHeadCell>
		<TableHeadCell>Unique</TableHeadCell>
		<TableHeadCell>
			<span class="sr-only">Delete</span>
		</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y bg-gray-50">
		{#each columnsDetails as columnDetail (columnDetail.columnName)}
			<TableBodyRow class="bg-gray-50">
				<TableBodyCell>{columnDetail.columnName}</TableBodyCell>
				<TableBodyCell>{columnDetail.columnType}</TableBodyCell>
				<TableBodyCell>{columnDetail.columnDefault}</TableBodyCell>
				<TableBodyCell
					><Indicator color={columnDetail.isNotNullable ? 'green' : 'red'} /></TableBodyCell
				>
				<TableBodyCell><Indicator color={columnDetail.isUnique ? 'green' : 'red'} /></TableBodyCell>
				<TableBodyCell>
					{#if columnDetail.columnName === 'id' || columnDetail.columnName === 'created_at' || columnDetail.columnName === 'updated_at'}
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
					{:else}
						<button class="flex items-center justify-center gap-2" on:click={() => {}}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="size-4 text-red-500 hover:text-red-600"
							>
								<path
									fill-rule="evenodd"
									d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					{/if}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
