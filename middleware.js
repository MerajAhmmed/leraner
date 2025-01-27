import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";

const defaultLocale = "en";
const locales = ["en", "bn"];

function getLocale(request) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  const headers = { "accept-language": acceptedLanguage };
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale) || defaultLocale;
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const pathNameIsMissingLocale = !locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathNameIsMissingLocale) {
    const locale = getLocale(request);

    if (locale === defaultLocale && pathname !== "/") {
      return NextResponse.redirect(
        new URL(pathname.replace(`/${defaultLocale}`, ""), request.url)
      );
    }

    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api).*)"],
};
