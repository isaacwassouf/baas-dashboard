<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Accordion, Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	import EmailTemplateAccordionItem from '$lib/components/email/email-accordion-item.svelte';
	import { EmailTemplateEnum } from '$lib/types/email';

	let loadingData: boolean = false;

	onMount(() => {});
</script>

<Breadcrumb aria-label="Default breadcrumb example" class="mb-8">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem>Email</BreadcrumbItem>
	<BreadcrumbItem>Templates</BreadcrumbItem>
</Breadcrumb>

<header class="mb-8">
	<h1 class="text-2xl font-semibold">Email Templates Configuration</h1>
	<p class="text-sm text-gray-600">
		This is the list of the email configuration includeing the SMTP config and the emails templates
	</p>
</header>

{#if loadingData}
	<Spinner />
{:else}
	<Accordion>
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
