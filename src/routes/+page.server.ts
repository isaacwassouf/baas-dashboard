import { redirect } from '@sveltejs/kit';

export const load = async () => {
  return redirect(301, '/dashboard/database/tables');
};
