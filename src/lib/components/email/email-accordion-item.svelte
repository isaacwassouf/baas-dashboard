<script lang="ts">
	import { getEmailTemplate, setEmailTemplate } from '$lib/api/email';
	import { EmailTemplateEnum, type EmailTemplate } from '$lib/types/email';
	import { AccordionItem, Label, Input, Button, Spinner, Textarea } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { ChevronDown, ChevronUp } from 'svelte-heros-v2';
	import toast from 'svelte-french-toast';
	import { CheckCircleSolid } from 'flowbite-svelte-icons';
	import ToastSuccessIcon from '../shared/icons/ToastSuccessIcon.svelte';

	export let templateType: EmailTemplateEnum;
	export let title: string;

	let saving: boolean = false;
	let emailTemplate: EmailTemplate = {
		subject: '',
		body: '',
		redirectUrl: ''
	};

	const loadTemplate = async () => {
		try {
			const result: EmailTemplate = await getEmailTemplate(templateType);
			emailTemplate = result;
		} catch (e) {
			console.log(e);
		}
	};

	const saveTemplate = async () => {
		saving = true;
		try {
			await setEmailTemplate(templateType, emailTemplate);

			toast.success('Template saved successfully', {
				position: 'bottom-right',
				duration: 3000,
				icon: ToastSuccessIcon
			});
		} catch (e) {
			console.log(e);

			toast.error('Failed to save template', {
				position: 'bottom-right',
				duration: 3000
			});
		} finally {
			saving = false;
		}
	};

	onMount(async () => {
		await loadTemplate();
	});
</script>

<AccordionItem>
	<span slot="header" class="flex items-center gap-2">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			class="size-4 text-gray-600 dark:text-gray-500"
		>
			<path
				d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"
			/>
			<path
				d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"
			/>
		</svg>
		{title}
	</span>

	<form class="mb-4 flex w-2/3 flex-col space-y-6">
		<Label class="space-y-1">
			<span>Subject</span> <br />
			<small class="text-gray-500">This is the email subject</small>
			<Input
				type="text"
				name="subject"
				placeholder="Email subject"
				required
				bind:value={emailTemplate.subject}
			/>
		</Label>

		<Label class="space-y-1">
			<span> Redirect URL</span> <br />
			<small class="text-gray-500">
				This is the rediect URL the link in the email would go to.</small
			>
			<Input type="url" name="redirectURL" required bind:value={emailTemplate.redirectUrl} />
		</Label>

		<Label class="space-y-1">
			<span>Body</span> <br />
			<small class="leading-normal text-gray-500"> This is the body of the email</small>
			<Textarea
				id="body"
				name="body"
				rows="25"
				placeholder="Email body"
				required
				bind:value={emailTemplate.body}
			/>
		</Label>

		<Button color="green" size="xs" class="w-1/6" on:click={() => saveTemplate()}>
			{#if saving}
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
