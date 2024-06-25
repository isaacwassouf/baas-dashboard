<script lang="ts">
	import { listTables } from '$lib/api/schemas';
	import ConformationModal from '$lib/components/shared/conformation-modal.svelte';
	import CreateTableModal from '$lib/components/database/create-table-modal.svelte';
	import type { TableDetails } from '$lib/types/schemas';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Spinner
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let loading: boolean = false;
	let tableDetails: TableDetails[] = [];
	let tableToBeDeleted: TableDetails | null = null;
	let confirmDeletionModalOpen: boolean = false;
	let createTableModalOpen: boolean = false;

	const loadTables = async () => {
		loading = true;
		try {
			tableDetails = await listTables();
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	};

	const openCreateTableModal = () => {
		createTableModalOpen = true;
	};

	const markTableForDeletion = (table: TableDetails) => {
		tableToBeDeleted = table;
		confirmDeletionModalOpen = true;
	};

	onMount(async () => {
		await loadTables();
	});
</script>

<CreateTableModal bind:open={createTableModalOpen} />

<ConformationModal bind:open={confirmDeletionModalOpen}>
	<div slot="prompt">
		<h3 class="mb-5 text-lg font-semibold text-gray-500 dark:text-gray-400">
			Are you sure that you want to delete this table?
		</h3>
	</div>

	<div
		slot="warning"
		class="mb-4 flex rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
		role="alert"
	>
		<svg
			class="me-3 mt-[2px] inline h-4 w-4 flex-shrink-0"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 20 20"
		>
			<path
				d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
			/>
		</svg>
		<span class="sr-only">Danger</span>
		<div>
			<span class="text-md font-bold">Warning </span>
			<p class="mt-2">
				By deleting the <span class="font-bold">{tableToBeDeleted?.tableName}</span> table you will
				also delete its <span class="font-bold"> all of its data.</span>
			</p>
		</div>
	</div>
</ConformationModal>

<Breadcrumb aria-label="Default breadcrumb example" class="mb-8">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem>Database</BreadcrumbItem>
</Breadcrumb>

{#if loading}
	<div class="mt-40 flex items-center justify-center">
		<Spinner />
	</div>
{:else}
	<div class="mb-2 flex justify-end">
		<Button
			size="sm"
			class="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600"
			on:click={openCreateTableModal}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="size-4"
			>
				<path
					fill-rule="evenodd"
					d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
					clip-rule="evenodd"
				/>
			</svg>
			Create Table
		</Button>
	</div>

	<Table>
		<caption
			class="rounded-t-md bg-gray-100 p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white"
		>
			Your Tables
			<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
				This is a list of all the tables you have created for your backend. You can edit or delete
				them. You can also create a new table.
			</p>
		</caption>
		<TableHead class="bg-gray-200">
			<TableHeadCell>Table name</TableHeadCell>
			<TableHeadCell>Approx Size (KB)</TableHeadCell>
			<TableHeadCell>Rows</TableHeadCell>
			<TableHeadCell>Comment</TableHeadCell>
			<TableHeadCell>Create Time</TableHeadCell>
			<TableHeadCell>
				<span class="sr-only">Delete</span>
			</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y bg-gray-50">
			{#if tableDetails && tableDetails.length > 0}
				{#each tableDetails as tableDetail}
					<TableBodyRow class="bg-gray-50">
						<TableBodyCell>{tableDetail.tableName}</TableBodyCell>
						<TableBodyCell>{tableDetail.tableSize}</TableBodyCell>
						<TableBodyCell>{tableDetail.tableCount}</TableBodyCell>
						<TableBodyCell>{tableDetail.tableComment}</TableBodyCell>
						<TableBodyCell>{tableDetail.createTime}</TableBodyCell>
						<TableBodyCell>
							<Button
								class="border-none bg-transparent font-medium text-red-600 focus-within:outline-none focus-within:ring-0 hover:bg-transparent hover:underline focus:outline-none focus:ring-0 dark:text-red-500"
								size="xs"
								on:click={() => markTableForDeletion(tableDetail)}
							>
								Delete
							</Button>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			{/if}
		</TableBody>
	</Table>
{/if}
