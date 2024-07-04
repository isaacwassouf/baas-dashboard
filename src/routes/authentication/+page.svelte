<script lang="ts">
	import { goto } from '$app/navigation';
	import { registerAdmin } from '$lib/api/auth';
	import type { RegisterAdminData } from '$lib/types/auth';
	import { A, Button, Card, Label, Input, Spinner, Alert } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

	// Tailwind CSS classes
	let mainClass = 'bg-gray-50 dark:bg-gray-900 w-full';
	let mainDivClass =
		'flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900';
	let siteLinkClass =
		'flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white';
	let cardH1Class = 'text-2xl font-bold text-gray-900 dark:text-white';
	let haveAccountDivClass = 'text-sm font-medium text-gray-500 dark:text-gray-400';
	const labelClass = 'space-y-2 dark:text-white';

	let submitting: boolean = false;
	let submitError: boolean = false;
	const data: RegisterAdminData = {
		email: '',
		password: '',
		passwordConfirmation: ''
	};

	const onSubmit = async () => {
		submitting = true;
		try {
			await registerAdmin(data);
			submitError = false;

			goto('/dashboard/database/tables');
		} catch (e) {
			console.error(e);
			submitError = true;
		} finally {
			submitting = false;
		}
	};
</script>

<main class={mainClass}>
	<div class={mainDivClass}>
		<a href={'/'} class={siteLinkClass}>
			<svg
				class="mr-2 size-10 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
				/>
			</svg>
			<span class="text-2xl font-bold">BaaS Platform</span>
		</a>

		<Card class="w-full" size="md" border={false}>
			<h1 class={cardH1Class}>Create Admin Account</h1>
			<form class="mt-8 space-y-6" on:submit|preventDefault={onSubmit}>
				<div>
					<Label class={labelClass}>
						<span>Your email</span>
						<Input
							type="email"
							name="email"
							placeholder="name@company.com"
							required
							class="border outline-none dark:border-gray-600 dark:bg-gray-700"
							bind:value={data.email}
						/>
					</Label>
				</div>
				<div>
					<Label class={labelClass}>
						<span>Your password</span>
						<Input
							type="password"
							name="password"
							placeholder="••••••••"
							required
							class="border outline-none dark:border-gray-600 dark:bg-gray-700"
							bind:avalue={data.password}
						/>
					</Label>
				</div>
				<div>
					<Label class={labelClass}>
						<span>Confirm password</span>
						<Input
							type="password"
							name="confirm-password"
							placeholder="••••••••"
							required
							class="border outline-none dark:border-gray-600 dark:bg-gray-700"
							bind:value={data.passwordConfirmation}
						/>
					</Label>
				</div>

				{#if submitError}
					<Alert color="red">
						<InfoCircleSolid slot="icon" class="h-5 w-5" />
						<span class="font-medium">Submitting error.</span>
						<span class="block sm:inline">Failed to create the admin account.</span>
					</Alert>
				{/if}

				<Button type="submit" size="lg">
					{#if submitting}
						<Spinner color="white" />
					{/if}

					Create account</Button
				>
				<div class={haveAccountDivClass}>
					Already have an account? <A href="/authentication/login">Login here</A>
				</div>
			</form>
		</Card>
	</div>
</main>
