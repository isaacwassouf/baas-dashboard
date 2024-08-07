import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import type { JWTAdminClaims } from '$lib/types/auth';

export const authenticate: Handle = async ({ event, resolve }) => {
  const authToken = event.cookies.get('accessToken');
  console.log('authToken', authToken);
  try {
    if (!authToken) event.locals.admin = undefined;

    const claims = jwt.verify(authToken ?? '', env.JWT_SECRET) as JWTAdminClaims;
    if (!claims) event.locals.admin = undefined;

    if (authToken && claims) {
      event.locals.admin = {
        id: claims.user.id,
        email: claims.user.email
      };
    }
  } finally {
    const response = await resolve(event);
    return response;
  }
};

export const authorize: Handle = async ({ event, resolve }) => {
  const admin = event.locals.admin;

  // redirect the user to the login page if they are not logged in and trying to access a page in the app
  if (!admin && event.url.pathname.startsWith('/dashboard')) {
    return redirect(302, '/authentication/login');
  }

  // redirect the user to the app if they are logged in and trying to access any auth page
  if (admin && event.url.pathname.startsWith('/authentication')) {
    return redirect(302, '/dashboard/database/tables');
  }

  const response = await resolve(event);
  return response;
};

export const handle: Handle = sequence(authenticate, authorize);
