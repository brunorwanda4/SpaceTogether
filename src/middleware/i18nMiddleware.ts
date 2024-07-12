import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n, Locale } from '@/i18n';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): Locale | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: Locale[] = [...i18n.locales];
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    if (!locale || !locales.includes(locale as Locale)) {
      throw new RangeError(`Locale ${locale} is not supported`);
    }
    return locale as Locale;
  } catch (error) {
    console.error('Error in getLocale:', error);
    return i18n.defaultLocale;
  }
}

export function i18nMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const apiRouter = "/api/auth";

  const homeRouter = "/en";

  if (pathname === homeRouter) {
    console.log("Home rotuer 🌳🌳🌳🌳🌳");
  }
 
  if (pathname.startsWith(apiRouter)) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}
