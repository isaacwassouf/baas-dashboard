<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Indicator,
		Badge,
		Spinner,
		Breadcrumb,
		BreadcrumbItem,
		Button
	} from 'flowbite-svelte';
	import { listColumns } from '$lib/api/schemas';
	import { type ColumnDetails, type ForeignKeyDetails } from '$lib/types/schemas';
	import ConformationModal from '$lib/components/shared/conformation-modal.svelte';
	import AddForeignKeyModal from '$lib/components/database/add-foreign-key-modal.svelte';
	import { toast } from 'svelte-french-toast';
	import { dropColumn, dropForeignKey } from '$lib/api/schemas';

	const { name } = $page.params;
	const loadingColumns: boolean = false;
	let confirmDeleteColumnModalOpen: boolean = false;
	let confirmDeleteForeignKeyModalOpen: boolean = false;
	let columnsDetails: ColumnDetails[] = [];
	let foreignKeysDetails: ForeignKeyDetails[] = [];
	let columnToBeDeleted: ColumnDetails | null = null;
	let foreignKeyToBeDeleted: ForeignKeyDetails | null = null;
	let addForeignKeyModalOpen: boolean = false;

	const loadColumns = async (tableName: string) => {
		try {
			const result = await listColumns(tableName);

			columnsDetails = result?.columnsList ?? [];
			foreignKeysDetails = result?.foreignKeysList ?? [];
		} catch (error) {
			console.error(error);
		}
	};

	const markColumnForDeletion = (column: ColumnDetails) => {
		columnToBeDeleted = column;
	};

	const handleDeleteColumn = (column: ColumnDetails) => {
		markColumnForDeletion(column);
		confirmDeleteColumnModalOpen = true;
	};

	const confirmDeleteColumn = async () => {
		try {
			await dropColumn(name, columnToBeDeleted!.columnName);

			toast.success('Table deleted successfully', {
				position: 'bottom-right'
			});

			await loadColumns(name);
		} catch (error) {
			console.error(error);
			toast.error('Failed to delete table', {
				position: 'bottom-right'
			});
		}
	};

	const confirmDeleteForeignKey = async () => {
		try {
			await dropForeignKey(name, foreignKeyToBeDeleted!.columnName);

			toast.success('Foreign key deleted successfully', {
				position: 'bottom-right'
			});

			await loadColumns(name);
		} catch (error) {
			console.error(error);
			toast.error('Failed to delete foreign key', {
				position: 'bottom-right'
			});
		}
	};

	const openAddForeignKeyModal = () => {
		addForeignKeyModalOpen = true;
	};

	const markForeignKeyForDeletion = (foreignKey: ForeignKeyDetails) => {
		foreignKeyToBeDeleted = foreignKey;
	};

	const openDeleteForeignKeyModal = (foreignKey: ForeignKeyDetails) => {
		markForeignKeyForDeletion(foreignKey);
		confirmDeleteForeignKeyModalOpen = true;
	};

	// called after the foreign key is added
	const handleForeignKeyAdded = async () => {
		await loadColumns(name);
	};

	// check if the column is a foreign key
	const isForeignKey = (column: ColumnDetails) => {
		return foreignKeysDetails.some((foreignKey) => foreignKey.columnName === column.columnName);
	};

	onMount(async () => {
		if (name) {
			await loadColumns(name);
		}
	});
</script>

<AddForeignKeyModal
	bind:open={addForeignKeyModalOpen}
	tableName={name}
	on:foreign-key-added={handleForeignKeyAdded}
/>

<ConformationModal bind:open={confirmDeleteColumnModalOpen} on:confirm={confirmDeleteColumn}>
	<div slot="prompt">
		<h3 class="mb-5 text-lg font-semibold text-gray-500 dark:text-gray-400">
			Are you sure that you want to delete this column?
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
				By deleting the <span class="font-bold">{columnToBeDeleted?.columnName}</span> column you
				will also delete its
				<span class="font-bold"> all of its data.</span> This action is not reversable.
			</p>
		</div>
	</div>
</ConformationModal>

<ConformationModal
	bind:open={confirmDeleteForeignKeyModalOpen}
	on:confirm={confirmDeleteForeignKey}
>
	<div slot="prompt">
		<h3 class="mb-5 text-lg font-semibold text-gray-500 dark:text-gray-400">
			Are you sure that you want to delete this foreign key?
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
				By deleting the <span class="font-bold">{foreignKeyToBeDeleted?.columnName}</span> column
				you will also delete its
				<span class="font-bold"> all of its data.</span> This action is not reversable.
			</p>
		</div>
	</div>
</ConformationModal>

<Breadcrumb aria-label="Default breadcrumb example" class="mb-8">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem>Database</BreadcrumbItem>
	<BreadcrumbItem href="/dashboard/database/tables">Tables</BreadcrumbItem>
	<BreadcrumbItem>{name ?? ''}</BreadcrumbItem>
</Breadcrumb>

{#if loadingColumns}
	<div class="mt-40 flex items-center justify-center">
		<Spinner />
	</div>
{:else}
	<div class="mb-2 flex justify-end">
		<Button
			size="sm"
			class="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600"
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
			Add Column
		</Button>
	</div>
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
					<TableBodyCell>
						<Badge
							color={columnDetail.isNotNullable ? 'green' : 'red'}
							class="px-2.5 py-0.5"
							rounded
						>
							<Indicator
								size="xs"
								color={columnDetail.isNotNullable ? 'green' : 'red'}
								class="me-1"
							/>
							{#if columnDetail.isNotNullable}
								True
							{:else}
								False
							{/if}
						</Badge>
					</TableBodyCell>
					<TableBodyCell>
						<Badge color={columnDetail.isUnique ? 'green' : 'red'} class="px-2.5 py-0.5" rounded>
							<Indicator size="xs" color={columnDetail.isUnique ? 'green' : 'red'} class="me-1" />
							{#if columnDetail.isUnique}
								True
							{:else}
								False
							{/if}
						</Badge>
					</TableBodyCell>
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
						{:else if isForeignKey(columnDetail)}
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
						{:else}
							<button
								class="flex items-center justify-center gap-2"
								on:click={() => {
									handleDeleteColumn(columnDetail);
								}}
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
							</button>
						{/if}
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>

	<div class="mb-2 mt-10 flex justify-end">
		<Button
			size="sm"
			class="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600"
			on:click={openAddForeignKeyModal}
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
			Add Foreign Key
		</Button>
	</div>
	<Table>
		<caption
			class="rounded-t-md bg-gray-100 p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white"
		>
			Table foreign keys

			<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
				List of the foreign keys for table <Badge large class="bg-gray-300 text-gray-800"
					>{name}</Badge
				>
			</p>
		</caption>
		<TableHead class="bg-gray-200">
			<TableHeadCell>Column name</TableHeadCell>
			<TableHeadCell>Reference table name</TableHeadCell>
			<TableHeadCell>Reference column name</TableHeadCell>
			<TableHeadCell>On Update</TableHeadCell>
			<TableHeadCell>On Delete</TableHeadCell>
			<TableHeadCell>
				<span class="sr-only">Delete</span>
			</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y bg-gray-50">
			{#each foreignKeysDetails as foreignKeyDetails (foreignKeyDetails.columnName)}
				<TableBodyRow class="bg-gray-50">
					<TableBodyCell>{foreignKeyDetails.columnName}</TableBodyCell>
					<TableBodyCell>
						<Badge
							large
							class="cursor-pointer bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-gray-900"
						>
							{foreignKeyDetails.referenceTableName}
						</Badge>
					</TableBodyCell>
					<TableBodyCell>{foreignKeyDetails.referenceColumnName}</TableBodyCell>
					<TableBodyCell>{foreignKeyDetails.onUpdate}</TableBodyCell>
					<TableBodyCell>{foreignKeyDetails.onDelete}</TableBodyCell>
					<TableBodyCell>
						<button on:click|preventDefault={() => openDeleteForeignKeyModal(foreignKeyDetails)}>
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
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
{/if}
