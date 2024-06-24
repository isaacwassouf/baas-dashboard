<script>
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Breadcrumb,
		BreadcrumbItem,
		Button
	} from 'flowbite-svelte';
</script>

<Breadcrumb aria-label="Default breadcrumb example" class="mb-8">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem>Database</BreadcrumbItem>
</Breadcrumb>



<div class="flex justify-end mb-2">
	<Button size="sm" class="bg-green-500 hover:bg-green-600 gap-2 flex justify-center items-center">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
  			<path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
		</svg>
		Create Table 
	</Button>
</div>
<Table>
	<caption
		class="bg-gray-100 p-5 text-left rounded-t-md text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white"
	>
		Your Tables
		<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
			This is a list of all the tables you have created for your backend. You can edit or delete
			them. You can also create a new table.
		</p>
	</caption>
	<TableHead class="bg-gray-200">
		<TableHeadCell>Table name</TableHeadCell>
		<TableHeadCell>Size</TableHeadCell>
		<TableHeadCell>Rows</TableHeadCell>
		<TableHeadCell>Comment</TableHeadCell>
		<TableHeadCell>Create Time</TableHeadCell>
		<TableHeadCell>
			<span class="sr-only">Edit</span>
		</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y bg-gray-50">
		<TableBodyRow class="bg-gray-50">
			<TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
			<TableBodyCell>Sliver</TableBodyCell>
			<TableBodyCell>Laptop</TableBodyCell>
			<TableBodyCell>$2999</TableBodyCell>
			<TableBodyCell>Monday</TableBodyCell>
			<TableBodyCell>
				<a href="/tables" class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
					>Edit</a
				>
			</TableBodyCell>
		</TableBodyRow>
		<TableBodyRow class="bg-gray-50">
			<TableBodyCell>Microsoft Surface Pro</TableBodyCell>
			<TableBodyCell>White</TableBodyCell>
			<TableBodyCell>Laptop PC</TableBodyCell>
			<TableBodyCell>$1999</TableBodyCell>
			<TableBodyCell>Monday</TableBodyCell>
			<TableBodyCell>
				<a href="/tables" class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
					>Edit</a
				>
			</TableBodyCell>
		</TableBodyRow>
		<TableBodyRow class="bg-gray-50">
			<TableBodyCell>Magic Mouse 2</TableBodyCell>
			<TableBodyCell>Black</TableBodyCell>
			<TableBodyCell>Accessories</TableBodyCell>
			<TableBodyCell>$99</TableBodyCell>
			<TableBodyCell>Monday</TableBodyCell>
			<TableBodyCell>
				<a href="/tables" class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
					>Edit</a
				>
			</TableBodyCell>
		</TableBodyRow>
	</TableBody>
</Table>
