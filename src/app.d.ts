// See https://kit.svelte.dev/docs/types#app

import type { Admin } from '$lib/types/auth';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      admin: Omit<Admin, 'is_admin'> | undefined;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export { };
