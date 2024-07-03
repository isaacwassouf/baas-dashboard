<script lang="ts">
	import { Chart, Card, A, Popover } from 'flowbite-svelte';
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
		Indicator,
		Button,
		Dropdown,
		DropdownItem
	} from 'flowbite-svelte';
	import type { LogEntry } from '$lib/types/analytics';
	import { listLogs } from '$lib/api/analytics';
	import { onMount } from 'svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

	let options: ApexOptions = {
		chart: {
			height: '250px',
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
				data: [],
				color: '#dc2626'
			}
		],
		xaxis: {
			categories: [],
			labels: {
				show: false
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

	function processLogEntries(entries: LogEntry[]) {
		const dateCounts: { [date: string]: number } = {};

		entries.forEach((entry) => {
			const date = entry.createdAt;

			// count the number of logs for each date
			if (!dateCounts[date]) {
				dateCounts[date] = 0;
			}
			dateCounts[date]++;
		});

		const dates = Object.keys(dateCounts).sort();
		const counts = dates.map((date) => dateCounts[date]);

		options.series = [
			{
				name: 'Total requests',
				data: counts,
				color: '#dc2626'
			}
		];

		if (options.xaxis) {
			options.xaxis.categories = dates;
		}
	}

	const pieOptions: ApexOptions = {
		series: [],
		colors: ['#86efac', '#7dd3fc', '#d8b4fe'],
		chart: {
			height: '250px',
			width: '100%',
			type: 'pie'
		},
		stroke: {
			colors: ['white']
		},
		plotOptions: {
			pie: {
				dataLabels: {
					offset: -25
				},
				customScale: 1
			}
		},
		labels: [],
		dataLabels: {
			enabled: true,
			style: {
				fontFamily: 'Inter, sans-serif'
			}
		},
		legend: {
			position: 'bottom',
			fontFamily: 'Inter, sans-serif'
		},
		yaxis: {
			labels: {
				formatter: function (value) {
					return value + '%';
				}
			}
		},
		xaxis: {
			labels: {
				formatter: function (value) {
					return value + '%';
				}
			},
			axisTicks: {
				show: false
			},
			axisBorder: {
				show: false
			}
		}
	};

	function processPieChartData(entries: LogEntry[]) {
		const serviceCounts: { [service: string]: number } = {};

		entries.forEach((entry) => {
			if (!serviceCounts[entry.service]) {
				serviceCounts[entry.service] = 0;
			}
			serviceCounts[entry.service]++;
		});

		const services = Object.keys(serviceCounts);
		const counts = services.map((service) => serviceCounts[service]);

		pieOptions.series = counts;
		pieOptions.labels = services;
	}

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

	onMount(async () => {
		await loadLogs();
		processLogEntries(logs);
		processPieChartData(logs);
	});
</script>

<Breadcrumb aria-label="Default breadcrumb example" class="mb-8">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem>Logs</BreadcrumbItem>
</Breadcrumb>

<div class="flex gap-2">
	<Card size="xl">
		<div class="flex justify-between">
			<div>
				<h5 class="pb-2 text-3xl font-bold leading-none text-gray-900 dark:text-white">
					{logs.length.toLocaleString('en-US', {
						style: 'decimal',
						maximumFractionDigits: 0,
						minimumFractionDigits: 0,
						useGrouping: true
					})}
				</h5>
				<p class="text-base font-normal text-gray-500 dark:text-gray-400">Logs this week</p>
			</div>
		</div>
		<Chart {options} />
		<div
			class="grid grid-cols-1 items-center justify-between border-t border-gray-200 dark:border-gray-700"
		>
			<div class="flex items-center justify-between pt-5">
				<Button
					class="inline-flex items-center bg-transparent py-0 text-center text-sm font-medium text-gray-500 hover:bg-transparent hover:text-gray-900 focus:ring-transparent dark:bg-transparent dark:text-gray-400 dark:hover:bg-transparent dark:hover:text-white dark:focus:ring-transparent"
					>Last 7 days<ChevronDownOutline class="m-2.5 ms-1.5 w-2.5" /></Button
				>
				<Dropdown class="w-40" offset={-6}>
					<DropdownItem>Yesterday</DropdownItem>
					<DropdownItem>Today</DropdownItem>
					<DropdownItem>Last 7 days</DropdownItem>
					<DropdownItem>Last 30 days</DropdownItem>
					<DropdownItem>Last 90 days</DropdownItem>
				</Dropdown>
			</div>
		</div>
	</Card>

	<Card>
		<div class="flex w-full items-start justify-between">
			<div class="flex-col items-center">
				<div class="mb-1 flex items-center">
					<h5 class="me-1 text-xl font-bold leading-none text-gray-900 dark:text-white">Traffic</h5>
					<InfoCircleSolid
						id="pie1"
						class="ms-1 h-3.5 w-3.5 cursor-pointer text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
					/>
					<Popover
						triggeredBy="#pie1"
						class="z-10 w-72 rounded-lg border border-gray-200 bg-white text-sm text-gray-500 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
					>
						<div class="space-y-2 p-3">
							<h3 class="font-semibold text-gray-900 dark:text-white">
								Activity growth - Incremental
							</h3>
							<p>
								Report helps navigate cumulative growth of community activities. Ideally, the chart
								should have a growing trend, as stagnating chart signifies a significant decrease of
								community activity.
							</p>
							<h3 class="font-semibold text-gray-900 dark:text-white">Calculation</h3>
							<p>
								For each date bucket, the all-time volume of activities is calculated. This means
								that activities in period n contain all activities up to period n, plus the
								activities generated by your community in period.
							</p>
							<A href="/">Read more <ChevronRightOutline class="ms-1.5 h-2 w-2" /></A>
						</div>
					</Popover>
				</div>
			</div>
		</div>

		<Chart options={pieOptions} class="py-6" />
	</Card>
</div>

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
