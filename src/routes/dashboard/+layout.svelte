<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import {
		DarkMode,
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		Drawer,
		CloseButton
	} from 'flowbite-svelte';
	import { Cog, Home } from 'svelte-heros-v2';
	import { sineIn } from 'svelte/easing';

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
	$: if (width >= breakPoint) {
		drawerHidden = false;
		activateClickOutside = false;
	} else {
		drawerHidden = true;
		activateClickOutside = true;
	}
	onMount(() => {
		if (width >= breakPoint) {
			drawerHidden = false;
			activateClickOutside = false;
		} else {
			drawerHidden = true;
			activateClickOutside = true;
		}
	});
	const toggleSide = () => {
		if (width < breakPoint) {
			drawerHidden = !drawerHidden;
		}
	};
	const toggleDrawer = () => {
		drawerHidden = false;
	};
	$: activeUrl = $page.url.pathname;
	let spanClass = 'pl-2 self-center text-md text-gray-900 whitespace-nowrap dark:text-white';
	let divClass = 'w-full ml-auto lg:block lg:w-auto order-1 lg:order-none';
	let ulClass =
		'flex flex-col py-3 my-4 lg:flex-row lg:my-0 text-sm font-medium gap-4 dark:lg:bg-transparent lg:bg-white lg:border-0';
	let navDivClass =
		'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700 flex items-center justify-between w-full mx-auto py-1.5 px-4';
</script>

<svelte:window bind:innerWidth={width} />
<header class="mx-auto w-full flex-none bg-white dark:bg-slate-950">
	<Navbar let:hidden let:toggle>
		<NavHamburger
			on:click={toggleDrawer}
			btnClass="focus:outline-none whitespace-normal rounded-lg focus:ring-2 p-1.5 focus:ring-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 m-0 mr-3 lg:hidden"
		/>
		<NavBrand href="/" class="lg:ml-64">
			<Cog />
			<span class="self-center whitespace-nowrap pl-4 text-xl font-semibold dark:text-white">
				My Website
			</span>
		</NavBrand>
		<NavUl
			{hidden}
			{divClass}
			{ulClass}
			nonActiveClass="md:!pl-3 md:!py-2 lg:!pl-0 text-gray-700 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-white lg:dark:hover:text-primary-700 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
			activeClass="md:!pl-3 md:!py-2 lg:!pl-0 lg:text-primary-700 text-white dark:text-white dark:lg:text-primary-500 bg-primary-700 lg:bg-transparent dark:bg-primary-600 lg:dark:bg-transparent cursor-default"
		>
			<NavLi class="lg:mb-0 lg:px-2" active={activeUrl === '/'} href="/">Home</NavLi>
			<NavLi class="lg:mb-0 lg:px-2" active={activeUrl === '/pages/about'} href="/pages/about"
				>About</NavLi
			>
			<NavLi
				class="lg:mb-0 lg:px-2"
				href="https://github.com/shinokada/flowbite-sveltekit-responsive-sidebar-layout"
				>GitHub</NavLi
			>
		</NavUl>
		<div class="ml-auto flex items-center">
			<DarkMode class="inline-block hover:text-gray-900 dark:hover:text-white" />
		</div>
		<NavHamburger on:click={toggle} btnClass="lg:hidden" />
	</Navbar>
</header>

<Drawer
	transitionType="fly"
	{backdrop}
	{transitionParams}
	bind:hidden={drawerHidden}
	bind:activateClickOutside
	width="w-64"
	class="overflow-scroll bg-gray-100 pb-32 border-r-2"
	id="sidebar"
>
	<div class="flex items-center">
		<CloseButton on:click={() => (drawerHidden = true)} class="mb-4 dark:text-white lg:hidden" />
	</div>
	<Sidebar asideClass="w-54 ">
		<SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
			<SidebarGroup>
				<SidebarItem
					label="Home"
					href="/"
					on:click={toggleSide}
					active={activeUrl === `/`}
					class="hover:bg-gray-200"
				>
					<svelte:fragment slot="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-6 text-gray-700"
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
					href={'/dashboard/database'}
					{spanClass}
					activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
					on:click={toggleSide}
					active={activeUrl === `comsthing`}
					class="hover:bg-gray-200"
				>
					<svelte fragment slot="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-6 text-gray-700"
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

				<SidebarItem
					label={'Authentication'}
					href={'comsthing'}
					{spanClass}
					activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
					on:click={toggleSide}
					active={activeUrl === `comsthing`}
					class="hover:bg-gray-200"
				>
					<svelte:fragment slot="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-6 text-gray-700"
						>
							<path
								fill-rule="evenodd"
								d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
								clip-rule="evenodd"
							/>
						</svg>
					</svelte:fragment>
				</SidebarItem>

				<SidebarItem
					label={'Logs'}
					href={'comsthing'}
					{spanClass}
					activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
					on:click={toggleSide}
					active={activeUrl === `comsthing`}
					class="hover:bg-gray-200"
				>
					<svelte:fragment slot="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-6 text-gray-700"
						>
							<path
								d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z"
							/>
						</svg>
					</svelte:fragment>
				</SidebarItem>

				<!---->
				<!-- <SidebarDropdownWrapper label="Articles"> -->
				<!-- 	{#each data.articles as { meta, path }} -->
				<!-- 		<SidebarItem -->
				<!-- 			label={meta.title} -->
				<!-- 			href={`/blog/${path}`} -->
				<!-- 			{spanClass} -->
				<!-- 			activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700" -->
				<!-- 			on:click={toggleSide} -->
				<!-- 			active={activeUrl === `/blog/${path}`} -->
				<!-- 		/> -->
				<!-- 	{/each} -->
				<!-- </SidebarDropdownWrapper> -->
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
</Drawer>

<div class="mx-auto flex w-full px-2">
	<main class="mx-auto w-full p-8 lg:ml-72">
		<slot />
	</main>
</div>
