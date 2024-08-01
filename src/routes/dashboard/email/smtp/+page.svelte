<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Spinner, Label, Input, Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { type SMTPData } from '$lib/types/email';

	import { getSMTPConfig, setSMTPConfig } from '$lib/api/email';
	import toast from 'svelte-french-toast';

	let loadingData: boolean = false;
	let settingSMTPConfig: boolean = false;
	let smtpData: SMTPData = {
		host: '',
		port: 0,
		username: '',
		password: '',
		sender: ''
	};

	const saveSMTPConfig = async () => {
		settingSMTPConfig = true;
		try {
			await setSMTPConfig(smtpData);
			toast.success('SMTP configuration saved successfully', {
				position: 'bottom-right'
			});
		} catch (e) {
			console.log(e);

			toast.error('Failed to set SMTP configuration', {
				position: 'bottom-right'
			});
		} finally {
			settingSMTPConfig = false;
		}
	};

	const loadSMTPConfig = async () => {
		loadingData = true;
		try {
			const result: SMTPData = await getSMTPConfig();
			smtpData = result;
		} catch (e) {
			console.log(e);
		} finally {
			loadingData = false;
		}
	};

	onMount(async () => {
		await loadSMTPConfig();
	});
</script>

<Breadcrumb aria-label="Default breadcrumb example" class="mb-8">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem>Email</BreadcrumbItem>
	<BreadcrumbItem>SMTP</BreadcrumbItem>
</Breadcrumb>

<header class="mb-8">
	<h1 class="text-2xl font-semibold">Email SMTP Configuration</h1>
	<p class="text-sm text-gray-600">
		This is a the email SMTP configuration. You can set the SMTP host, port, username, password and
		the sender email address
	</p>
</header>

{#if loadingData}
	<Spinner />
{:else}
	<form class="mb-4 flex w-1/2 flex-col space-y-4">
		<Label class="space-y-1">
			<span>Host</span> <br />
			<small class="text-gray-500">The SMTP host </small>
			<Input type="text" name="host" required bind:value={smtpData.host} />
		</Label>

		<Label class="space-y-1">
			<span>Port</span> <br />
			<small class="text-gray-500"> The SMTP port </small>
			<Input type="text" name="port" required bind:value={smtpData.port} />
		</Label>

		<Label class="space-y-1">
			<span> Username</span> <br />
			<small class="text-gray-500"> The SMTP user </small>
			<Input type="text" name="username" required bind:value={smtpData.username} />
		</Label>

		<Label class="space-y-1">
			<span>Password</span> <br />
			<small class="text-gray-500"> The SMTP password </small>
			<Input type="password" name="password" required bind:value={smtpData.password} />
		</Label>

		<Label class="space-y-1">
			<span> Sender Address</span> <br />
			<small class="text-gray-500"> The SMTP sender address </small>
			<Input type="text" name="email" required bind:value={smtpData.sender} />
		</Label>

		<Button on:click={saveSMTPConfig} color="green" size="xs" class="w-1/6">
			{#if settingSMTPConfig}
				<Spinner color="white" class="mr-2 h-4 w-4" />
			{/if}
			Save</Button
		>
	</form>
{/if}
