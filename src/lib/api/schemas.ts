// import { API } from "$lib/api"
import { type TableDetails } from '$lib/types/schemas';

export const listTables = (): Promise<TableDetails[]> => {
	const result: TableDetails[] = [
		{
			tableName: 'Table1',
			tableSize: 100,
			tableCount: 10,
			tableComment: 'This is a table',
			createTime: '2021-10-10'
		},
		{
			tableName: 'Table2',
			tableSize: 200,
			tableCount: 20,
			tableComment: 'This is another table',
			createTime: '2021-10-11'
		}
	];

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(result);
		}, 1000);
	});
};
