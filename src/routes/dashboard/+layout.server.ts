import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  console.log(locals.admin);
  if (locals.admin) {
    return {
      admin: locals.admin
    };
  }

  return redirect(302, '/authentication/login');
};
