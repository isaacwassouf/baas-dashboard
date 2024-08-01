<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import {
		Navbar,
		NavBrand,
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		Drawer,
		CloseButton,
		SidebarDropdownWrapper
	} from 'flowbite-svelte';
	import { CodeBracket } from 'svelte-heros-v2';
	import { ChevronDown, ChevronUp } from 'svelte-heros-v2';
	import { sineIn } from 'svelte/easing';
	import { logoutAdmin } from '$lib/api/auth';
	import { goto } from '$app/navigation';

	const adminData = $page.data.admin;

	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

	let breakPoint: number = 1024;
	let width: number;
	let backdrop: boolean = false;
	let activateClickOutside = true;
	let drawerHidden: boolean = false;
	let spanClass = 'pl-2 self-center text-md text-gray-900 whitespace-nowrap dark:text-white';
	let loggingOut: boolean = false;

	$: activeUrl = $page.url.pathname;

	$: authenticationActive = activeUrl.startsWith(`/dashboard/authentication`);
	$: emailActive = activeUrl.startsWith(`/dashboard/email`);

	$: if (width >= breakPoint) {
		drawerHidden = false;
		activateClickOutside = false;
	} else {
		drawerHidden = true;
		activateClickOutside = true;
	}

	const toggleSide = () => {
		if (width < breakPoint) {
			drawerHidden = !drawerHidden;
		}
	};

	const handleLogout = async () => {
		loggingOut = true;
		try {
			await logoutAdmin();

			goto('/authentication/login');
		} catch (e) {
			console.log(e);
		} finally {
			loggingOut = false;
		}
	};

	onMount(() => {
		if (width >= breakPoint) {
			drawerHidden = false;
			activateClickOutside = false;
		} else {
			drawerHidden = true;
			activateClickOutside = true;
		}
	});
</script>

<svelte:window bind:innerWidth={width} />
<header class="mx-auto w-full flex-none bg-white dark:bg-slate-950">
	<Navbar class="p-6">
		<NavBrand href="/" class="lg:ml-64">
			<CodeBracket />
			<span class="self-center whitespace-nowrap pl-4 text-xl font-bold dark:text-white">
				Dashboard
			</span>
		</NavBrand>
		<div class="ml-auto flex items-center">
			<div class="mr-2 flex items-center justify-start">
				<div class="flex flex-col items-start">
					<span class="block truncate text-xs font-medium">{adminData?.email}</span>
				</div>
			</div>

			<button on:click={() => handleLogout()} class="rounded-md p-2 hover:bg-gray-200">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 text-gray-600 dark:text-white"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
						d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2"
					/><path d="M15 12h-12l3 -3" /><path d="M6 15l-3 -3" /></svg
				>
			</button>
		</div>
	</Navbar>
</header>

<Drawer
	transitionType="fly"
	{backdrop}
	{transitionParams}
	bind:hidden={drawerHidden}
	bind:activateClickOutside
	width="w-64"
	class="z-30 overflow-scroll border-r-2 bg-gray-100 pb-32 dark:border-r-gray-600"
	id="sidebar"
>
	<div class="flex items-center">
		<CloseButton on:click={() => (drawerHidden = true)} class="mb-4 dark:text-white lg:hidden" />
	</div>
	<Sidebar asideClass="w-54 ">
		<SidebarWrapper divClass="overflow-y-auto py-2 px-2 rounded dark:bg-gray-800">
			<SidebarGroup>
				<SidebarItem label="BaaS Platform" class="font-bold">
					<svelte:fragment slot="icon">
						<svg
							class="h-8 w-8 fill-current"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
							/>
						</svg>
					</svelte:fragment>
				</SidebarItem>
			</SidebarGroup>

			<SidebarGroup border>
				<SidebarItem
					label="Home"
					href="/"
					on:click={toggleSide}
					active={activeUrl === `/`}
					class="font-medium hover:bg-gray-200"
				>
					<svelte:fragment slot="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-5 text-gray-700"
						>
							<path
								d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
							/>
							<path
								d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
							/>
						</svg>
					</svelte:fragment>
				</SidebarItem>

				<SidebarItem
					label={'Database'}
					href={'/dashboard/database/tables'}
					{spanClass}
					activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
					on:click={toggleSide}
					active={activeUrl.startsWith(`/dashboard/database`)}
					class={`font-medium hover:bg-gray-200 ${activeUrl.startsWith(`/dashboard/database`) ? 'bg-gray-200 hover:bg-gray-300' : ''}`}
				>
					<svelte fragment slot="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-5 text-gray-700"
						>
							<path
								d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z"
							/>
							<path
								d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z"
							/>
							<path
								d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z"
							/>
							<path
								d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z"
							/>
						</svg>
					</svelte></SidebarItem
				>

				<SidebarDropdownWrapper
					label="Authentication"
					class={`font-medium hover:bg-gray-200 ${activeUrl.startsWith(`/dashboard/authentication`) ? 'bg-gray-200 hover:bg-gray-300' : ''}`}
					isOpen={authenticationActive}
				>
					<svelte:fragment slot="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-5 text-gray-700"
						>
							<path
								fill-rule="evenodd"
								d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
								clip-rule="evenodd"
							/>
						</svg>
					</svelte:fragment>

					<SidebarItem
						label={'Users'}
						href={'/dashboard/authentication/users'}
						spanClass="pl-2 self-center text-sm text-gray-900 whitespace-nowrap dark:text-white"
						activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
						on:click={toggleSide}
						active={activeUrl === `logs`}
						class={`font-medium hover:bg-gray-200 ${activeUrl.startsWith(`/dashboard/authentication/users`) ? 'bg-gray-200 hover:bg-gray-300' : ''}`}
					>
						<svelte:fragment slot="icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="ml-2 size-5 text-gray-700"
							>
								<path
									d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"
								/>
							</svg>
						</svelte:fragment>
					</SidebarItem>

					<SidebarItem
						label={'Providers'}
						href={'/dashboard/authentication/providers'}
						spanClass="pl-2 self-center text-sm text-gray-900 whitespace-nowrap dark:text-white"
						activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
						on:click={toggleSide}
						active={activeUrl === `logs`}
						class={`font-medium hover:bg-gray-200 ${activeUrl.startsWith(`/dashboard/authentication/providers`) ? 'bg-gray-200 hover:bg-gray-300' : ''}`}
					>
						<svelte:fragment slot="icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="ml-2 size-5 text-gray-700"
							>
								<path
									fill-rule="evenodd"
									d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
									clip-rule="evenodd"
								/>
							</svg>
						</svelte:fragment>
					</SidebarItem>

					<div slot="arrowup" class="flex items-center gap-4">
						<ChevronUp class="h-4 w-4 text-gray-500 dark:text-gray-400" />
					</div>

					<div slot="arrowdown" class="flex items-center gap-4">
						<ChevronDown class="h-4 w-4 text-gray-500 dark:text-gray-400" />
					</div>
				</SidebarDropdownWrapper>

				<SidebarDropdownWrapper
					label="Email"
					class={`font-medium hover:bg-gray-200 ${activeUrl.startsWith(`/dashboard/email`) ? 'bg-gray-200 hover:bg-gray-300' : ''}`}
					isOpen={emailActive}
				>
					<svelte:fragment slot="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-5 text-gray-700"
						>
							<path
								fill-rule="evenodd"
								d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
								clip-rule="evenodd"
							/>
						</svg>
					</svelte:fragment>

					<SidebarItem
						label={'SMTP'}
						href={'/dashboard/email/smtp'}
						spanClass="pl-2 self-center text-sm text-gray-900 whitespace-nowrap dark:text-white"
						activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
						on:click={toggleSide}
						class={`font-medium hover:bg-gray-200 ${activeUrl.startsWith(`/dashboard/email/smtp`) ? 'bg-gray-200 hover:bg-gray-300' : ''}`}
					>
						<svelte:fragment slot="icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="ml-2 size-5 text-gray-700"
							>
								<path
									d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"
								/>
							</svg>
						</svelte:fragment>
					</SidebarItem>

					<SidebarItem
						label={'Templates'}
						href={'/dashboard/email/templates'}
						spanClass="pl-2 self-center text-sm text-gray-900 whitespace-nowrap dark:text-white"
						activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
						on:click={toggleSide}
						class={`font-medium hover:bg-gray-200 ${activeUrl.startsWith(`/dashboard/email/templates`) ? 'bg-gray-200 hover:bg-gray-300' : ''}`}
					>
						<svelte:fragment slot="icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="ml-2 size-5 text-gray-700"
							>
								<path
									fill-rule="evenodd"
									d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
									clip-rule="evenodd"
								/>
							</svg>
						</svelte:fragment>
					</SidebarItem>

					<div slot="arrowup" class="flex items-center gap-4">
						<ChevronUp class="h-4 w-4 text-gray-500 dark:text-gray-400" />
					</div>

					<div slot="arrowdown" class="flex items-center gap-4">
						<ChevronDown class="h-4 w-4 text-gray-500 dark:text-gray-400" />
					</div>
				</SidebarDropdownWrapper>

				<SidebarItem
					label={'Logs'}
					href={'/dashboard/logs'}
					{spanClass}
					activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
					on:click={toggleSide}
					active={activeUrl === `logs`}
					class={`font-medium hover:bg-gray-200 ${activeUrl.startsWith(`/dashboard/logs`) ? 'bg-gray-200 hover:bg-gray-300' : ''}`}
				>
					<svelte:fragment slot="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-5 text-gray-700"
						>
							<path
								d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z"
							/>
						</svg>
					</svelte:fragment>
				</SidebarItem>
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
</Drawer>

<div class="mx-auto flex w-full px-2 dark:bg-gray-800">
	<main class="mx-auto w-full p-8 lg:ml-72">
		<slot />
	</main>
</div>
