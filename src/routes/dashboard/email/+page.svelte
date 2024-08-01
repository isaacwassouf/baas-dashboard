<script lang="ts">
	import {
		Breadcrumb,
		BreadcrumbItem,
		Accordion,
		AccordionItem,
		Spinner,
		Label,
		Input,
		Button
	} from 'flowbite-svelte';
	import { ChevronDown, ChevronUp } from 'svelte-heros-v2';
	import { onMount } from 'svelte';
	import { type SMTPData } from '$lib/types/email';

	import EmailTemplateAccordionItem from '$lib/components/email/email-accordion-item.svelte';
	import { EmailTemplateEnum } from '$lib/types/email';
	import { setSMTPConfig } from '$lib/api/email';

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
		} catch (e) {
			console.log(e);
		} finally {
			settingSMTPConfig = false;
		}
	};

	onMount(() => {});
</script>

<Breadcrumb aria-label="Default breadcrumb example" class="mb-8">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem>Email</BreadcrumbItem>
</Breadcrumb>

<header class="mb-8">
	<h1 class="text-2xl font-semibold">Email configuration</h1>
	<p class="text-sm text-gray-600">
		This is the list of the email configuration includeing the SMTP config and the emails templates
	</p>
</header>

{#if loadingData}
	<Spinner />
{:else}
	<Accordion>
		<AccordionItem>
			<span slot="header" class="flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="size-4 text-gray-600 dark:text-gray-500"
				>
					<path
						fill-rule="evenodd"
						d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
						clip-rule="evenodd"
					/>
					<path
						d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z"
					/>
					<path
						fill-rule="evenodd"
						d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z"
						clip-rule="evenodd"
					/>
				</svg>

				SMTP configuration
			</span>

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

			<div slot="arrowup" class="flex items-center gap-4">
				<ChevronUp class="h-4 w-4 text-gray-500 dark:text-gray-400" />
			</div>

			<div slot="arrowdown" class="flex items-center gap-4">
				<ChevronDown class="h-4 w-4 text-gray-500 dark:text-gray-400" />
			</div>
		</AccordionItem>

		<EmailTemplateAccordionItem
			title="Email verification email template"
			templateType={EmailTemplateEnum.EMAIL_VERIFICATION}
		/>
		<EmailTemplateAccordionItem
			title="MFA verification email template"
			templateType={EmailTemplateEnum.MFA_VERIFICATION}
		/>
		<EmailTemplateAccordionItem
			title="Password reset email template"
			templateType={EmailTemplateEnum.PASSWORD_RESET}
		/>
	</Accordion>
{/if}
