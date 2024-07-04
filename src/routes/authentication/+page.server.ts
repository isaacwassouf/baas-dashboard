import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const response = await fetch('http://localhost:4000/api/schema/tables', {
      method: 'GET',
      headers: {
        orgin: 'http://localhost:4000',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      error(response.status, 'Failed to fetch data');
    }

    const data = await response.json();
    console.log(data);

    return {
      data: 'Hello World'
    };
  } catch (er) {
    console.error(er);
    error(500, 'Internal Server Error');
  }
};
