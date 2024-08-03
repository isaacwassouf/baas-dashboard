<script lang="ts">
	import { toggleMFA } from '$lib/api/settings';
	import { showToast } from '$lib/utils/helpers';
	import {
		Breadcrumb,
		BreadcrumbItem,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		Toggle
	} from 'flowbite-svelte';

	let saving: boolean = false;

	const handleMFAChange = async (event: Event) => {
		saving = true;
		try {
			await toggleMFA();
			showToast('MFA settings updated successfully', 'success');
		} catch (e) {
			console.log(e);
			showToast('Failed to update MFA settings', 'error');
		} finally {
			saving = false;
		}
	};
</script>

<Breadcrumb aria-label="Default breadcrumb example" class="mb-8">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem>Settings</BreadcrumbItem>
</Breadcrumb>

<header class="mb-8">
	<h1 class="text-2xl font-semibold">Settings</h1>
	<p class="text-sm text-gray-600">Manage the settings of the platform</p>
</header>

<Table class="w-3/4 rounded">
	<TableBody tableBodyClass="divide-y">
		<TableBodyRow class="hover:bg-gray-100">
			<TableBodyCell class="font-semibold">Multifactor Authentication(MFA)</TableBodyCell>
			<TableBodyCell
				><Toggle color="green" disabled={saving} on:change={handleMFAChange} /></TableBodyCell
			>
		</TableBodyRow>
	</TableBody>
</Table>
