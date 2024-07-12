import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';
import { Api_auth_prefix, Auth_routes, DEFAULT_LOGIN_REDIRECT, Public_routes } from '@/router';
import { getToken } from 'next-auth/jwt';
import { i18n } from '@/i18n';

export default async function authMiddleware(request: NextRequest, event: NextFetchEvent) {
  const secret = process.env.NEXTAUTH_SECRET;
  const salt = process.env.NEXTAUTH_SALT;

  if (!secret) {
    throw new Error('NEXTAUTH_SECRET is not set in environment variables');
  }

  if (!salt) {
    throw new Error('NEXTAUTH_SALT is not set in environment variables');
  }

  const token = await getToken({ req: request as any, secret, salt });
  const { nextUrl } = request;
  const is_logged_in = !!token;

  const is_api_auth_route = nextUrl.pathname.startsWith(Api_auth_prefix);
  const is_public_route = Public_routes.includes(nextUrl.pathname);
  const is_auth_route = Auth_routes.includes(nextUrl.pathname);

  if (is_api_auth_route) {
    return NextResponse.next();
  }

  if (is_auth_route) {
    if (is_logged_in) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
