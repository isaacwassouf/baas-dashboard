<script lang="ts">
	import { Chart, Card, A, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronRightOutline, ChevronDownOutline } from 'flowbite-svelte-icons';
	import type { ApexOptions } from 'apexcharts';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Breadcrumb,
		BreadcrumbItem,
		Badge,
		Indicator
	} from 'flowbite-svelte';
	import type { LogEntry } from '$lib/types/analytics';
	import { listLogs } from '$lib/api/analytics';
	import { onMount } from 'svelte';

	let options: ApexOptions = {
		chart: {
			height: '200px',
			width: '100%',
			type: 'area',
			fontFamily: 'Inter, sans-serif',
			dropShadow: {
				enabled: false
			},
			toolbar: {
				show: false
			}
		},
		tooltip: {
			enabled: true,
			x: {
				show: false
			}
		},
		fill: {
			type: 'gradient',
			gradient: {
				opacityFrom: 0.55,
				opacityTo: 0,
				shade: '#dc2626',
				gradientToColors: ['#dc2626']
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: 2
		},
		grid: {
			show: true,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: 0
			}
		},
		series: [
			{
				name: 'Total requests',
				data: [6500, 6418, 6456, 6526, 6356, 6456, 6356, 6456, 6356, 6456, 6356, 6456, 6356, 6456],
				color: '#dc2626'
			}
		],
		xaxis: {
			categories: [
				'01 February',
				'02 February',
				'03 February',
				'04 February',
				'05 February',
				'06 February',
				'07 February',
				'08 February',
				'09 February',
				'10 February',
				'11 February',
				'12 February',
				'13 February',
				'14 February'
			],
			labels: {
				show: true
			},
			axisBorder: {
				show: true
			},
			axisTicks: {
				show: false
			}
		},
		yaxis: {
			show: true,
			axisBorder: {
				show: true
			},
			labels: {
				show: true,
				offsetX: -10
			}
		}
	};

	let loadingLogs: boolean = false;
	let logs: LogEntry[] = [];

	const loadLogs = async () => {
		loadingLogs = true;
		try {
			const result = await listLogs();
			logs = result?.logs ?? [];
		} catch (e) {
			console.error(e);
		} finally {
			loadingLogs = false;
		}
	};

	onMount(() => {
		loadLogs();
	});
</script>

<Breadcrumb aria-label="Default breadcrumb example" class="mb-8">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem>Logs</BreadcrumbItem>
</Breadcrumb>

<Card size="xl">
	<div class="flex justify-between">
		<div>
			<h5 class="pb-2 text-3xl font-bold leading-none text-gray-900 dark:text-white">32.4k</h5>
			<p class="text-base font-normal text-gray-500 dark:text-gray-400">Users this week</p>
		</div>
		<div
			class="flex items-center px-2.5 py-0.5 text-center text-base font-semibold text-green-500 dark:text-green-500"
		>
			12%
			<ChevronRightOutline class="ms-1 h-6 w-6" />
		</div>
	</div>
	<Chart {options} />
</Card>

<Table hoverable={true} class="mt-10">
	<caption
		class="rounded-t-md bg-gray-100 p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white"
	>
		Logs
		<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
			This is a list of all the tables you have created for your backend. You can edit or delete
			them. You can also create a new table.
		</p>
	</caption>
	<TableHead class="bg-gray-200">
		<TableHeadCell>Level</TableHeadCell>
		<TableHeadCell>Service</TableHeadCell>
		<TableHeadCell>Message</TableHeadCell>
		<TableHeadCell>Metadata</TableHeadCell>
		<TableHeadCell>Created At</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y bg-gray-50">
		{#each logs as log}
			<TableBodyRow class="bg-gray-50 hover:bg-gray-100">
				<TableBodyCell class="max-w-12">
					{#if log.level === 'ERROR'}
						<Badge color="red" rounded class="px-2.5 py-0.5">
							<Indicator color="red" size="xs" class="me-1" />Error
						</Badge>
					{/if}

					{#if log.level === 'INFO'}
						<Badge color="blue" rounded class="px-2.5 py-0.5">
							<Indicator size="xs" class="me-1 bg-sky-600" />Info
						</Badge>
					{/if}
				</TableBodyCell>
				<TableBodyCell class="max-w-12">
					{#if log.service === 'schema-service'}
						<Badge color="green" class="px-2.5 py-0.5">Schema Service</Badge>
					{/if}

					{#if log.service === 'contents-service'}
						<Badge color="blue" class="px-2.5 py-0.5">Contents Service</Badge>
					{/if}

					{#if log.service === 'auth-service'}
						<Badge color="purple" class="px-2.5 py-0.5">Auth Service</Badge>
					{/if}
				</TableBodyCell>
				<TableBodyCell class="max-w-24 overflow-hidden">{log.message}</TableBodyCell>
				<TableBodyCell class="max-w-56 overflow-hidden">{log.metaData}</TableBodyCell>
				<TableBodyCell class="max-w-12">{log.createdAt}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
