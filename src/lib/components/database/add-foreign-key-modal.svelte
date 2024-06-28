<script lang="ts">
	import { createEventDispatcher, type ComponentProps } from 'svelte';
	import { Button, Modal, Label, Input, Checkbox, Alert } from 'flowbite-svelte';
	import TableSelect from '../shared/TableSelect.svelte';
	import '$lib/styles/svelte-select.css';
	import ColumnSelect from '../shared/selects/ColumnSelect.svelte';
	import ReferenialActionSelect from '../shared/selects/ReferenialActionSelect.svelte';
	import type { AddForeignKeyDetails } from '$lib/types/schemas';
	import { addForeignKey } from '$lib/api/schemas';
	import toast from 'svelte-french-toast';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

	export let open = false;
	export let size: ComponentProps<Modal>['size'] = 'md';
	export let tableName: string;

	let dispatcher = createEventDispatcher();

	let addForeignKeyDetails: AddForeignKeyDetails = {
		tableName: tableName,
		isNotNullable: false,
		foriegnKeyDetails: {
			columnName: '',
			referenceTableName: '',
			referenceColumnName: '',
			onUpdate: '',
			onDelete: ''
		}
	};

	let addingForeignKey: boolean = false;
	let addingForeignKeyError: boolean = false;

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		addingForeignKey = true;
		try {
			await addForeignKey(addForeignKeyDetails);
			open = false;
			addingForeignKeyError = false;

			// Dispatching an event to the parent component
			dispatcher('foreign-key-added');
			// Displaying a success toast
			toast.success('Foreign key added successfully', {
				position: 'bottom-right'
			});
		} catch (e) {
			console.log('Error adding foreign key');
			addingForeignKeyError = true;
		} finally {
			addingForeignKey = false;
		}
	};
</script>

<Modal bind:open {size} autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" action="#">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add a new foreign key</h3>
		{#if addingForeignKeyError}
			<Alert>
				<InfoCircleSolid slot="icon" class="h-5 w-5" />
				<span class="font-medium">Error adding foreign key.</span>
				There has a been an error adding the foreign key. Please try again.
			</Alert>
		{/if}

		<Label class="space-y-2">
			<span class="basis-1/3">Column name <span class="text-red-500">*</span></span>
			<Input
				class="basis-2/3"
				type="text"
				name="name"
				placeholder="customers"
				required
				bind:value={addForeignKeyDetails.foriegnKeyDetails.columnName}
			/>
		</Label>

		<Label class="!space-y-2">
			<span>Reference table name <span class="text-red-500">*</span></span>
			<TableSelect bind:justValue={addForeignKeyDetails.foriegnKeyDetails.referenceTableName} />
		</Label>

		<Label class="!space-y-2">
			<span> Reference column name <span class="text-red-500">*</span></span>
			<ColumnSelect
				tableName={addForeignKeyDetails.foriegnKeyDetails.referenceTableName}
				bind:justValue={addForeignKeyDetails.foriegnKeyDetails.referenceColumnName}
			/>
		</Label>

		<Label class="!space-y-2">
			<span>On Update <span class="text-red-500">*</span></span>
			<ReferenialActionSelect
				id="onUpdate"
				bind:justValue={addForeignKeyDetails.foriegnKeyDetails.onUpdate}
			/>
		</Label>

		<Label class="!space-y-2">
			<span>On Delete <span class="text-red-500">*</span></span>
			<ReferenialActionSelect
				id="onDelete"
				bind:justValue={addForeignKeyDetails.foriegnKeyDetails.onDelete}
			/>
		</Label>

		<Label class="!space-y-2">
			<span>Not Nullable </span>
			<Checkbox bind:checked={addForeignKeyDetails.isNotNullable} />
		</Label>

		<Button type="submit" class="w-full" on:click={handleSubmit}>Add Foreign key</Button>
	</form>
</Modal>
