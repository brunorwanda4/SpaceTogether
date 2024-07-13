// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n, Locale } from '@/i18n';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { getToken } from 'next-auth/jwt';
import { AuthDefault, AuthRouter, PublicRouter } from './router';

// Locale detection function
function getLocale(request: NextRequest): Locale {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: Locale[] = [...i18n.locales]; // Create a mutable copy
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    const locale = matchLocale(languages, locales, i18n.defaultLocale as Locale);
    if (!locale || !locales.includes(locale as Locale)) {
      throw new RangeError(`Locale ${locale} is not supported`);
    }
    return locale as Locale;
  } catch (error) {
    console.error('Error in getLocale:', error);
    return i18n.defaultLocale as Locale;
  }
}

// Extract locale from the pathname
function extractLocale(pathname: string): Locale | null {
  const parts = pathname.split('/');
  if (parts.length > 1 && i18n.locales.includes(parts[1] as Locale)) {
    return parts[1] as Locale;
  }
  return null;
}

// Combined middleware function to handle locale and auth redirection
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // get locale
  const extractedLocale = extractLocale(pathname);
  const locale = extractedLocale || getLocale(request);

  // default auth route
  const defaultRouter = pathname.startsWith(AuthDefault);

  if (defaultRouter) {
    return;
  }

  console.log(`Extracted locale: ${extractedLocale}, Detected locale: ${locale}`);

  const pathnameIsMissingLocale = i18n.locales.every(
    loc => !pathname.startsWith(`/${loc}/`) && pathname !== `/${loc}`
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }

  // Ensure secret and salt are defined
  const secret = process.env.NEXTAUTH_SECRET || 'default-secret';
  const salt = process.env.NEXTAUTH_SALT || 'default-salt';

  // Get the token from NextAuth
  const token = await getToken({ req: request, secret, salt });

  console.log(token)

  const publicRouter = PublicRouter.includes(pathname);
  const authRouter = AuthRouter.includes(pathname);

  // Auth logic based on token
  const login = !!token;

  if (!!authRouter) {
    if (!!login) {
      return NextResponse.redirect(
        new URL(`/${locale}/s`, request.url)
      );
    }
    return NextResponse.next(); // Continue if not logged in
  }

  if(!!login) {
    console.log("you are login 🌳")
  }

  if (!login && !publicRouter) {
    let callbackUrl = request.nextUrl.pathname;

    if (request.nextUrl.searchParams.has('callbackUrl')) {
      callbackUrl = request.nextUrl.searchParams.get('callbackUrl') as string;
    } else {
      if (request.nextUrl.search) {
        callbackUrl += request.nextUrl.search;
      }
      const encoded = encodeURIComponent(callbackUrl);
      return NextResponse.redirect(new URL(`/${locale}/auth/login?callbackUrl=${encoded}`, request.url));
    }
  }

  return NextResponse.next(); // Continue if logged in or on public route
}

// Configuration for middleware matcher
export const config = {
  matcher: ['/((?!.*\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
