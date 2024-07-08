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
		Spinner
	} from 'flowbite-svelte';
	import type { User } from '$lib/types/auth';
	import { onMount } from 'svelte';
	import { listUsers } from '$lib/api/auth';
	import Google from '$lib/components/shared/icons/google.svelte';
	import { EnvelopeSolid, GithubSolid } from 'flowbite-svelte-icons';

	let loading: boolean = false;
	let users: User[] | undefined = [];

	const loadUsers = async () => {
		loading = true;
		try {
			const result = await listUsers();
			users = result?.users;
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	};

	onMount(async () => {
		loadUsers();
	});
</script>

<Breadcrumb aria-label="Default breadcrumb example" class="mb-8">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem>Authentication</BreadcrumbItem>
	<BreadcrumbItem>Users</BreadcrumbItem>
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
			Users
			<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
				This is a list of all the users in the system
			</p>
		</caption>
		<TableHead class="bg-gray-200">
			<TableHeadCell>id</TableHeadCell>
			<TableHeadCell>name</TableHeadCell>
			<TableHeadCell>email</TableHeadCell>
			<TableHeadCell>verifed</TableHeadCell>
			<TableHeadCell>auth provider</TableHeadCell>
			<TableHeadCell>created at</TableHeadCell>
			<TableHeadCell>updated at</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y bg-gray-50">
			{#if users && users.length > 0}
				{#each users as user}
					<TableBodyRow key={user.id}>
						<TableBodyCell>{user.id}</TableBodyCell>
						<TableBodyCell>{user.name}</TableBodyCell>
						<TableBodyCell>{user.email}</TableBodyCell>
						<TableBodyCell>{user.isVerified ? 'Yes' : 'No'}</TableBodyCell>
						<TableBodyCell>
							{#if user.authProvider === ''}
								<EnvelopeSolid class="size-5 text-gray-600" />
							{:else if user.authProvider === 'google'}
								<Google svgClass="size-5" />
							{:else if user.authProvider === 'github'}
								<GithubSolid class="size-5 text-gray-600" />
							{/if}
						</TableBodyCell>
						<TableBodyCell>{user.createdAt}</TableBodyCell>
						<TableBodyCell>{user.updatedAt}</TableBodyCell>
					</TableBodyRow>
				{/each}
			{/if}
			{#if users && users.length === 0}
				<TableBodyRow>
					<TableBodyCell colspan="7" class="text-center">No users found</TableBodyCell>
				</TableBodyRow>
			{/if}
		</TableBody>
	</Table>
{/if}
