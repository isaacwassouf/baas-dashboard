<script lang="ts">
	import { createEventDispatcher, type ComponentProps } from 'svelte';
	import { Button, Modal, Label, Input, Checkbox, Alert } from 'flowbite-svelte';
	import '$lib/styles/svelte-select.css';
	import type { NewColumnDetails } from '$lib/types/schemas';
	import toast from 'svelte-french-toast';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';
	import ColumnTypeSelect from '../shared/selects/ColumnTypeSelect.svelte';
	import { addColumn } from '$lib/api/schemas';

	export let open = false;
	export let size: ComponentProps<Modal>['size'] = 'md';
	export let tableName: string;

	let dispatcher = createEventDispatcher();

	let newColumnDetails: NewColumnDetails = {
		columnName: '',
		columnType: '',
		columnDefault: '',
		isUnique: false,
		isNotNullable: false,
		columnLength: 0,
		columnPrecision: 0,
		columnScale: 0
	};

	let addingColumn: boolean = false;
	let addingColumnError: boolean = false;

	const resetData = () => {
		newColumnDetails = {
			columnName: '',
			columnType: '',
			columnDefault: '',
			isUnique: false,
			isNotNullable: false,
			columnLength: 0,
			columnPrecision: 0,
			columnScale: 0
		};
	};

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		addingColumn = true;
		try {
			await addColumn(tableName, newColumnDetails);
			open = false;
			// reset the data
			resetData();
			addingColumnError = false;

			// Dispatching an event to the parent component
			dispatcher('column-added');
			// Displaying a success toast
			toast.success('Column added successfully', {
				position: 'bottom-right'
			});
		} catch (e) {
			console.log('Error adding foreign key');
			addingColumnError = true;
			toast.error('Failed to add column', {
				position: 'bottom-right'
			});
		} finally {
			addingColumn = false;
		}
	};

	$: {
		if (!open) {
			resetData();
			addingColumnError = false;
		}
	}
</script>

<Modal bind:open {size} autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" action="#">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add a new column</h3>
		{#if addingColumnError}
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
				bind:value={newColumnDetails.columnName}
			/>
		</Label>

		<Label class="!space-y-2">
			<span>Column type <span class="text-red-500">*</span></span>
			<div class="flex gap-2">
				<ColumnTypeSelect id="columnType" bind:justValue={newColumnDetails.columnType} />
				{#if newColumnDetails.columnType === 'varchar'}
					<Input
						class="basis-1/4"
						type="number"
						min="0"
						max="65535"
						name="length"
						bind:value={newColumnDetails.columnLength}
						placeholder="length"
						required
					/>
				{/if}

				{#if newColumnDetails.columnType === 'decimal'}
					<Input
						class="basis-1/4"
						type="number"
						min="0"
						max="65535"
						name="length"
						bind:value={newColumnDetails.columnPrecision}
						placeholder="precision"
						required
					/>

					<Input
						class="basis-1/4"
						type="number"
						min="0"
						max="65535"
						name="length"
						bind:value={newColumnDetails.columnScale}
						placeholder="scale"
						required
					/>
				{/if}

				{#if newColumnDetails.columnType === 'float' || newColumnDetails.columnType === 'double'}
					<Input
						class="basis-1/4"
						type="number"
						min="0"
						max="65535"
						name="length"
						bind:value={newColumnDetails.columnPrecision}
						placeholder="precision"
						required
					/>
				{/if}
			</div>
		</Label>

		<Label class="!space-y-2">
			<span>Default value <span class="text-red-500">*</span></span>
			<Input
				class="basis-2/3"
				type="text"
				name="default"
				placeholder="default value"
				required
				bind:value={newColumnDetails.columnDefault}
			/>
		</Label>

		<Label class="!space-y-2">
			<div class="flex flex-row items-center gap-2">
				<span>Not Nullable </span>
				<Checkbox bind:checked={newColumnDetails.isNotNullable} />
			</div>
		</Label>

		<Label class="!space-y-2">
			<div class="flex flex-row items-center gap-2">
				<span>Unique </span>
				<Checkbox bind:checked={newColumnDetails.isUnique} />
			</div>
		</Label>

		<Button type="submit" class="w-full" on:click={handleSubmit}>Add column</Button>
	</form>
</Modal>
