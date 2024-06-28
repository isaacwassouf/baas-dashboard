import { writable } from 'svelte/store';
import { type AddColumnDetails } from '$lib/types/schemas';

export const addColumnsStore = writable<AddColumnDetails[]>([
	{
		uniqueId: 'ID',
		columnName: 'id',
		columnType: 'int32',
		columnDefault: '',
		isNullable: false,
		isUnique: true,
		isPrimary: true
	},
	{
		uniqueId: 'CREATED_AT',
		columnName: 'created_at',
		columnType: 'timestamp',
		columnDefault: 'current_timestamp',
		isUnique: false,
		isNullable: false,
		isPrimary: false
	},
	{
		uniqueId: 'UPDATED_AT',
		columnName: 'updated_at',
		columnType: 'timestamp',
		columnDefault: 'current_timestamp',
		isUnique: false,
		isNullable: false,
		isPrimary: false
	}
]);
