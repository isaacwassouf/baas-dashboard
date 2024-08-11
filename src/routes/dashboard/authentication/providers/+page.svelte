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
	import { GithubSolid } from 'flowbite-svelte-icons';

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
		<AccordionItem>
			<span slot="header" class="flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="size-5 text-gray-600 dark:text-gray-500"
				>
					<path
						d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"
					/>
					<path
						d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"
					/>
				</svg>
				Email
			</span>

			<div class="flex items-center gap-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="size-4"
				>
					<path
						fill-rule="evenodd"
						d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z"
						clip-rule="evenodd"
					/>
				</svg>
				<p class="text-sm font-semibold text-gray-500 dark:text-gray-400">
					Email and password authentication is enabled, and can't be disabled.
				</p>
			</div>

			<div slot="arrowup" class="flex items-center gap-4">
				<ChevronUp class="h-4 w-4 text-gray-500 dark:text-gray-400" />
			</div>

			<div slot="arrowdown" class="flex items-center gap-4">
				<ChevronDown class="h-4 w-4 text-gray-500 dark:text-gray-400" />
			</div>
		</AccordionItem>

		{#each authProviders as authProvider (authProvider.id)}
			<AccordionItem>
				<span slot="header" class="flex items-center gap-2">
					{#if authProvider.name === 'google'}
						<GoogleIcon />
						{capitalizeFirstLetter(authProvider.name)}
					{:else}
						<GithubSolid class="text-gray-600" />
						{capitalizeFirstLetter(authProvider.name)}
					{/if}
				</span>
				<form class="mb-4 flex w-1/2 flex-col space-y-6">
					<Label class="space-y-1">
						<span>Client ID</span> <br />

						{#if authProvider.name === 'google'}
							<small class="text-gray-500">
								This is the client ID of your Google OIDC application</small
							>
						{:else}
							<small class="text-gray-500">
								This is the client ID of your GitHub OAuth2 application</small
							>
						{/if}

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
						{#if authProvider.name === 'google'}
							<small class="text-gray-500">
								This is the client secret of your Google OIDC application</small
							>
						{:else}
							<small class="text-gray-500">
								This is the client secret of your GitHub OAuth2 application</small
							>
						{/if}
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

						{#if authProvider.name === 'google'}
							<small class="leading-normal text-gray-500">
								This is the redirect URI of your Google OIDC application. Paste this URI in the
								provider redirect config
							</small>
						{:else}
							<small class="leading-normal text-gray-500">
								This is the redirect URI of your GitHub OAuth2 application. Paste this URI in the
								provider redirect config
							</small>
						{/if}

						<Input
							type="text"
							name="redirectURI"
							required
							placeholder="The redirect URI of your Google OpenID Connect application"
							bind:value={authProvider.redirectURI}
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
