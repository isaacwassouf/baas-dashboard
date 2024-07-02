<script lang="ts">
	import {
		Breadcrumb,
		BreadcrumbItem,
		Accordion,
		AccordionItem,
		Badge,
		Input,
		Label,
		Button,
		Spinner,
		Toggle
	} from 'flowbite-svelte';
	import { ChevronDown, ChevronUp } from 'svelte-heros-v2';
	import {
		enableAuthProvider,
		listAuthProviders,
		disableAuthProvider,
		setAuthProviderCredentials
	} from '$lib/api/auth';
	import toast from 'svelte-french-toast';
	import type { AuthProvider } from '$lib/types/auth';
	import GoogleIcon from '$lib/components/shared/icons/google.svelte';
	import { onMount } from 'svelte';

	let loadingAuthProviders: boolean = false;
	let settingCredentials: boolean = false;
	let togglingAuthProvider: boolean = false;

	let authProviders: AuthProvider[] = [];

	const enableProvider = async (authProviderId: number) => {
		togglingAuthProvider = true;
		const index = authProviders.findIndex((authProvider) => authProvider.id === authProviderId);
		try {
			await enableAuthProvider(authProviderId);

			// Update the authProvider object in the array
			authProviders[index].active = true;

			toast.success('Authentication provider enabled', {
				position: 'bottom-right'
			});
		} catch (e) {
			console.error(e);
			authProviders[index].active = false;
			toast.error('Failed to enable authentication provider', {
				position: 'bottom-right'
			});
		} finally {
			togglingAuthProvider = false;
		}
	};

	const disableProvider = async (authProviderId: number) => {
		togglingAuthProvider = true;
		const index = authProviders.findIndex((authProvider) => authProvider.id === authProviderId);
		try {
			await disableAuthProvider(authProviderId);

			// Update the authProvider object in the array
			authProviders[index].active = false;

			toast.success('Authentication provider disabled', {
				position: 'bottom-right'
			});
		} catch (e) {
			console.error(e);
			authProviders[index].active = true;
			toast.error('Failed to disable authentication provider', {
				position: 'bottom-right'
			});
		} finally {
			togglingAuthProvider = false;
		}
	};

	const loadAuthProviders = async () => {
		loadingAuthProviders = true;
		try {
			const result = await listAuthProviders();
			authProviders = result?.authProviders ?? [];
		} catch (e) {
			console.error(e);
		} finally {
			loadingAuthProviders = false;
		}
	};

	const capitalizeFirstLetter = (str: string): string => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const handleToggleChange = (authProvider: AuthProvider) => (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.checked) {
			enableProvider(authProvider.id);
		} else {
			disableProvider(authProvider.id);
		}
	};

	const handleCredentialsSave = (authProvider: AuthProvider) => async (event: Event) => {
		event.preventDefault();
		settingCredentials = true;
		try {
			// Save the credentials
			await setAuthProviderCredentials(authProvider);
			toast.success('Credentials saved successfully', {
				position: 'bottom-right'
			});
		} catch (e) {
			console.error(e);
			toast.error('Failed to save credentials', {
				position: 'bottom-right'
			});
		} finally {
			settingCredentials = false;
		}
	};

	onMount(() => {
		loadAuthProviders();
	});
</script>

<Breadcrumb aria-label="Default breadcrumb example" class="mb-8">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem>Authentication</BreadcrumbItem>
</Breadcrumb>

<header class="mb-8">
	<h1 class="text-2xl font-semibold">Authentication</h1>
	<p class="text-sm text-gray-600">This is a list of the available authentication providers</p>
</header>

{#if loadingAuthProviders}
	<Spinner />
{:else}
	<Accordion>
		{#each authProviders as authProvider (authProvider.id)}
			<AccordionItem>
				<span slot="header" class="flex items-center gap-2">
					{#if authProvider.name === 'google'}
						<GoogleIcon />
						{capitalizeFirstLetter(authProvider.name)}
					{/if}
				</span>
				<form class="mb-4 flex w-1/2 flex-col space-y-6">
					<Label class="space-y-1">
						<span>Client ID</span> <br />
						<small class="text-gray-500">
							This is the client ID of your Google OAuth2 application</small
						>
						<Input
							type="text"
							name="clientID"
							placeholder="OpenID Connect client ID"
							required
							bind:value={authProvider.clientId}
						/>
					</Label>

					<Label class="space-y-1">
						<span>Client Secret</span> <br />
						<small class="text-gray-500">
							This is the client secret of your Google OAuth2 application
						</small>
						<Input
							type="password"
							name="ClientSecret"
							placeholder="•••••••••••••••"
							required
							bind:value={authProvider.clientSecret}
						/>
					</Label>

					<Label class="space-y-1">
						<span>Rediect URI</span> <br />
						<small class="leading-normal text-gray-500">
							This is the redirect URI of your Google OAuth2 application. Paste this URI in the
							provider redirect config
						</small>
						<Input
							id="redirect"
							type="text"
							disabled
							class="disabled:cursor-pointer"
							value={`<api-gateway-domain>/api/auth/${authProvider.name}/callback`}
						/>
					</Label>

					<Button
						color="green"
						size="xs"
						class="w-1/6"
						on:click={handleCredentialsSave(authProvider)}
					>
						{#if settingCredentials}
							<Spinner color="white" class="mr-2 h-4 w-4" />
						{/if}
						Save</Button
					>
				</form>

				<Toggle
					on:click
					color="green"
					bind:checked={authProvider.active}
					disabled={togglingAuthProvider}
					on:change={handleToggleChange(authProvider)}
					>Toggle Login with {capitalizeFirstLetter(authProvider.name)}</Toggle
				>

				<div slot="arrowup" class="flex items-center gap-4">
					{#if authProvider.active}
						<Badge rounded color="green">Active</Badge>
					{:else}
						<Badge rounded color="red">Inactive</Badge>
					{/if}
					<ChevronUp class="h-4 w-4 text-gray-500 dark:text-gray-400" />
				</div>

				<div slot="arrowdown" class="flex items-center gap-4">
					{#if authProvider.active}
						<Badge rounded color="green">Active</Badge>
					{:else}
						<Badge rounded color="red">Inactive</Badge>
					{/if}
					<ChevronDown class="h-4 w-4 text-gray-500 dark:text-gray-400" />
				</div>
			</AccordionItem>
		{/each}
	</Accordion>
{/if}
