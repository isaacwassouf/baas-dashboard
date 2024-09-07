<script lang="ts">
	import { toggleMFA, getMFA } from '$lib/api/settings';
	import { showToast } from '$lib/utils/helpers';
	import {
		Breadcrumb,
		BreadcrumbItem,
		Spinner,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		Toggle
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let loading: boolean = false;
	let saving: boolean = false;

	let mfaEnabled: boolean = false;

	const loadMFA = async () => {
		loading = true;
		try {
			const res = await getMFA();
			mfaEnabled = res.enabled;
		} catch (e) {
			console.log(e);
		} finally {
			loading = false;
		}
	};

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

	onMount(async () => {
		await loadMFA();
	});
</script>

<Breadcrumb aria-label="Default breadcrumb example" class="mb-8">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem>Settings</BreadcrumbItem>
</Breadcrumb>

<header class="mb-8">
	<h1 class="text-2xl font-semibold">Settings</h1>
	<p class="text-sm text-gray-600">Manage the settings of the platform</p>
</header>

{#if loading}
	<Spinner class="h-8 w-8 text-primary-500" />
{:else}
	<Table class="w-3/4 rounded">
		<TableBody tableBodyClass="divide-y">
			<TableBodyRow class="hover:bg-gray-100">
				<TableBodyCell class="font-semibold">Multifactor Authentication(MFA)</TableBodyCell>
				<TableBodyCell>
					<Toggle
						color="green"
						disabled={saving}
						bind:checked={mfaEnabled}
						on:change={handleMFAChange}
					/>
				</TableBodyCell>
			</TableBodyRow>
		</TableBody>
	</Table>
{/if}
