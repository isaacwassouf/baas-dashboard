<script lang="ts">
	import { type ComponentProps } from 'svelte';
	import { Button, Modal, Label, Input, Textarea, Badge } from 'flowbite-svelte';
	import { Table, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
	import AddColumnItem from '$lib/components/database/add-column-item.svelte';
	import { addColumnsStore } from '$lib/stores/add-columns';
	import type { AddTableDetails } from '$lib/types/schemas';
	import { createTable } from '$lib/api/schemas';

	export let open = false;
	export let size: ComponentProps<Modal>['size'] = 'xl';

	let addingTable: boolean = false;

	let addTableDetails: AddTableDetails = {
		tableName: '',
		tableComment: '',
		columns: []
	};

	const addColumn = () => {
		addColumnsStore.update((columns) => {
			// add the column after the fist column
			columns.splice(1, 0, {
				uniqueId: '',
				columnName: '',
				columnType: '',
				columnDefault: '',
				isPrimary: false,
				isUnique: false,
				isNullable: false
			});

			return columns;
		});
	};

	const handleSubmit = (event: Event) => {
		event.preventDefault();
		addingTable = true;
		try {
			createTable({
				tableName: addTableDetails.tableName,
				tableComment: addTableDetails.tableComment,
				columns: $addColumnsStore
			});
		} catch (error) {
			console.error(error);
		} finally {
			addingTable = false;
		}
	};
</script>

<Modal bind:open {size} autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" action="#">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create a new table</h3>
		<Label class="space-y-2">
			<span>Table name</span> <span class="text-red-500">*</span>
			<Input
				type="text"
				name="name"
				placeholder="customers"
				required
				bind:value={addTableDetails.tableName}
			/>
		</Label>

		<Label class="space-y-2">
			<span>Table comment</span>
			<Textarea name="comment" required bind:value={addTableDetails.tableComment} />
		</Label>

		<Label class="space-y-2">
			<span class="text-gray-900">Table columns</span> <span class="text-red-500">*</span> <br />
			<small class="text-gray-500"
				><Badge color="red">id</Badge>
				<Badge color="red">created_at</Badge>
				<Badge color="red">updated_at</Badge>
				columns are reserved.</small
			>
			<Table>
				<TableHead class="bg-white">
					<TableHeadCell class="py-1 text-gray-600">Column name</TableHeadCell>
					<TableHeadCell class="py-1 text-gray-600">Type</TableHeadCell>
					<TableHeadCell class="py-1 text-gray-600">Default</TableHeadCell>
					<TableHeadCell class="py-1 text-gray-600">Primary</TableHeadCell>
					<TableHeadCell class="py-1 text-gray-600">Unique</TableHeadCell>
					<TableHeadCell class="py-1 text-gray-600">Not Nullable</TableHeadCell>
					<TableHeadCell class="py-1 text-gray-600">
						<span class="sr-only">Actions</span>
					</TableHeadCell>
				</TableHead>
				<TableBody tableBodyClass="divide-y">
					{#each $addColumnsStore as columnDetails, index (index)}
						<AddColumnItem {columnDetails} {index} />
					{/each}
				</TableBody>
			</Table>
		</Label>
		<div class="flex items-center justify-center rounded-md border border-dashed py-2">
			<Button
				type="button"
				size="xs"
				class="border bg-transparent text-gray-600 hover:bg-gray-50"
				on:click={addColumn}>Add column</Button
			>
		</div>

		<Button type="submit" class="w-full1" on:click={handleSubmit}>Create table</Button>
	</form>
</Modal>
