<script lang="ts">
	import { type ColumnTypeSelectOptionItem } from '$lib/types/schemas';

	export let columnType: ColumnTypeSelectOptionItem | null = null;
</script>

{#if columnType}
	<div class="flex items-center">
		{#if columnType.root === 'numerical'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="mr-2 size-4 text-primary-500 dark:text-primary-400"
			>
				<path
					fill-rule="evenodd"
					d="M11.097 1.515a.75.75 0 0 1 .589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 1 1 1.47.294L16.665 7.5h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.2 6h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103H3.75a.75.75 0 0 1 0-1.5h3.885l1.2-6H5.25a.75.75 0 0 1 0-1.5h3.885l1.08-5.397a.75.75 0 0 1 .882-.588ZM10.365 9l-1.2 6h4.47l1.2-6h-4.47Z"
					clip-rule="evenodd"
				/>
			</svg>
		{:else if columnType.root === 'string'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="mr-2 size-4 text-primary-500 dark:text-primary-400"
			>
				<path
					fill-rule="evenodd"
					d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z"
					clip-rule="evenodd"
				/>
			</svg>
		{:else if columnType.root === 'date'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="mr-2 size-4 text-primary-500 dark:text-primary-400"
			>
				<path
					fill-rule="evenodd"
					d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
					clip-rule="evenodd"
				/>
			</svg>
		{:else if columnType.root === 'boolean'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="mr-2 size-4 text-primary-500 dark:text-primary-400"
			>
				<path
					d="M17,7C15.636,7,8.364,7,7,7c-2.761,0-5,2.239-5,5s2.239,5,5,5c1.364,0,8.636,0,10,0c2.761,0,5-2.239,5-5S19.761,7,17,7z M17,15c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S18.657,15,17,15z"
				></path>
			</svg>
		{/if}
		{columnType.label}
	</div>
{/if}
