<script lang="ts">
	import { listTables, dropTable } from '$lib/api/schemas';
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
	import toast from 'svelte-french-toast';

	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { DotsVerticalOutline } from 'flowbite-svelte-icons';
	import ToastSuccessIcon from '$lib/components/shared/icons/ToastSuccessIcon.svelte';

	let loading: boolean = false;
	let tableDetails: TableDetails[] | undefined = [];
	let tableToBeDeleted: TableDetails | null = null;
	let confirmDeletionModalOpen: boolean = false;
	let createTableModalOpen: boolean = false;

	const loadTables = async () => {
		loading = true;
		try {
			const result = await listTables();
			tableDetails = result?.tablesList;
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

	const confirmTableDrop = async () => {
		try {
			await dropTable(tableToBeDeleted!.tableName);

			toast.success('Table deleted successfully', {
				position: 'bottom-right',
				icon: ToastSuccessIcon
			});

			await loadTables();
		} catch (error) {
			console.error(error);
			toast.error('Failed to delete table', {
				position: 'bottom-right'
			});
		}
	};

	const handleTableCreated = () => {
		createTableModalOpen = false;
		loadTables();
	};

	onMount(async () => {
		await loadTables();
	});
</script>

<CreateTableModal bind:open={createTableModalOpen} on:tableCreated={handleTableCreated} />

<ConformationModal bind:open={confirmDeletionModalOpen} on:confirm={confirmTableDrop}>
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
	<BreadcrumbItem>Tables</BreadcrumbItem>
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
				{#each tableDetails as tableDetail (tableDetail.tableName)}
					<TableBodyRow class="bg-gray-50">
						<TableBodyCell>{tableDetail.tableName}</TableBodyCell>
						<TableBodyCell>{tableDetail.tableSize}</TableBodyCell>
						<TableBodyCell>{tableDetail.tableCount}</TableBodyCell>
						<TableBodyCell>{tableDetail.tableComment}</TableBodyCell>
						<TableBodyCell>{tableDetail.createTime}</TableBodyCell>
						<TableBodyCell>
							<DotsVerticalOutline
								class={`dot-menu-${tableDetail.tableName} cursor-pointer dark:text-white`}
							/>
							<Dropdown
								class="p-1"
								placement="left"
								triggeredBy={`.dot-menu-${tableDetail.tableName}`}
							>
								<DropdownItem class="flex items-center gap-2 rounded-lg py-2 text-xs">
									<a
										href={`/dashboard/database/tables/${tableDetail.tableName}/view`}
										class="flex items-center justify-center gap-2"
										data-sveltekit-preload-code="hover"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											class="size-4 text-gray-500 hover:text-gray-600"
										>
											<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
											<path
												fill-rule="evenodd"
												d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
												clip-rule="evenodd"
											/>
										</svg>
										<span>View data</span>
									</a>
								</DropdownItem>

								<DropdownItem class="flex items-center gap-2 rounded-lg py-2 text-xs">
									<a
										href={`/dashboard/database/tables/${tableDetail.tableName}/columns`}
										class="flex items-center justify-center gap-2"
										data-sveltekit-preload-code="hover"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											class="size-4 text-gray-500 hover:text-gray-600"
										>
											<path
												d="M15 3.75H9v16.5h6V3.75ZM16.5 20.25h3.375c1.035 0 1.875-.84 1.875-1.875V5.625c0-1.036-.84-1.875-1.875-1.875H16.5v16.5ZM4.125 3.75H7.5v16.5H4.125a1.875 1.875 0 0 1-1.875-1.875V5.625c0-1.036.84-1.875 1.875-1.875Z"
											/>
										</svg>
										<span>View columns</span>
									</a>
								</DropdownItem>

								<DropdownItem class="flex items-center gap-2 rounded-lg py-2 text-xs">
									<button
										class="flex items-center justify-center gap-2"
										on:click={() => markTableForDeletion(tableDetail)}
									>
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

										<span>Delete</span>
									</button>
								</DropdownItem>
							</Dropdown>

							<div class="flex items-center justify-center gap-2"></div>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			{/if}
		</TableBody>
	</Table>
{/if}
