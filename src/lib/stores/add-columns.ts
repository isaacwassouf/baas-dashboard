import { writable } from 'svelte/store';
import { type NewColumnDetails } from '$lib/types/schemas';

export const addColumnsStore = writable<NewColumnDetails[]>([]);
