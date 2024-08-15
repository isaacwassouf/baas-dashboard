<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Breadcrumb,
		BreadcrumbItem,
		Spinner,
		Badge
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { listContent } from '$lib/api/contents';
	import { listColumns } from '$lib/api/schemas';
	import type { TableViewResponse, TableViewRow } from '$lib/types/contents';
	import { onMount } from 'svelte';
	import type { ColumnDetails } from '$lib/types/schemas';

	const { name } = $page.params;
	let columnsDetails: ColumnDetails[] = [];
	let tableRows: TableViewRow[] = [];
	let loading: boolean = false;

	const loadColumns = async (tableName: string) => {
		try {
			const result = await listColumns(tableName);

			columnsDetails = result?.columnsList ?? [];
		} catch (error) {
			console.error(error);
		}
	};

	const loadContent = async () => {
		try {
			const result: TableViewResponse | undefined = await listContent(name);
			tableRows = result?.data ?? [];
		} catch (error) {
			console.error(error);
		} finally {
		}
	};

	// this function fetches the column names first and then fetches the data
	const loadTableData = async () => {
		loading = true;
		try {
			// fetch the column names
			await loadColumns(name);
			// fetch the table data
			await loadContent();
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	};

	onMount(() => {
		loadTableData();
	});
</script>

<Breadcrumb aria-label="Default breadcrumb example" class="mb-8">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem>Database</BreadcrumbItem>
	<BreadcrumbItem>Tables</BreadcrumbItem>
	<BreadcrumbItem>{name ?? ''}</BreadcrumbItem>
</Breadcrumb>

{#if loading}
	<div class="mt-40 flex items-center justify-center">
		<Spinner />
	</div>
{:else}
	<Table>
		<caption
			class="rounded-t-md bg-gray-100 p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white"
		>
			Table <Badge large class="bg-gray-300 text-gray-800">{name}</Badge> data.
			<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
				This is a list of the table internal data.
			</p>
		</caption>
		<TableHead class="bg-gray-200">
			{#each columnsDetails as column}
				<TableHeadCell>
					<div class="flex items-center gap-2">
						{#if column.columnName === 'id'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="size-4"
							>
								<path
									fill-rule="evenodd"
									d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
									clip-rule="evenodd"
								/>
							</svg>
						{/if}
						{column.columnName}
					</div>
				</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody tableBodyClass="divide-y bg-gray-50">
			{#each tableRows as row}
				<TableBodyRow>
					{#each columnsDetails as column}
						<TableBodyCell>{row?.[column.columnName] ?? ''}</TableBodyCell>
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
{/if}
