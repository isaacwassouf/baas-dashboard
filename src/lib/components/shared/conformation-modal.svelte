<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import { type ComponentProps, createEventDispatcher } from 'svelte';

	export let open = false;
	export let size: ComponentProps<Modal>['size'] = 'xs';

	const dispatcher = createEventDispatcher();

	const confirm = () => {
		dispatcher('confirm');
	};

	const cancel = () => {
		dispatcher('cancel');
	};
</script>

<Modal bind:open {size} autoclose>
	<div class="text-center">
		<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-600 dark:text-gray-200" />

		<slot name="prompt">
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
				Are you sure you want to delete this product?
			</h3>
		</slot>

		<div class="text-start">
			<slot name="warning" />
		</div>

		<Button color="red" class="me-2" on:click={confirm}>Yes, I'm sure</Button>
		<Button color="alternative" on:click={cancel}>No, cancel</Button>
	</div>
</Modal>
