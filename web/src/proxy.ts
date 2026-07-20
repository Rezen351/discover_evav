import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["id", "en"] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = "id";

// Tiny inline Accept-Language matcher (no external package).
// Picks the first supported locale from the Accept-Language header,
// honoring client preference weights (q-values).
function matchAcceptLanguage(
  acceptLanguage: string | null,
  supported: readonly Locale[],
  fallback: Locale,
): Locale {
  if (!acceptLanguage) return fallback;

  const items = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="));
      const quality = q ? parseFloat(q.slice(2)) : 1;
      return { tag: tag.toLowerCase(), quality: Number.isNaN(quality) ? 1 : quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of items) {
    const base = tag.split("-")[0];
    const matched = supported.find((l) => l === tag || l === base);
    if (matched) return matched;
  }

  return fallback;
}

// Get the preferred locale:
// 1. Honor an explicit `lang` cookie if set to a supported locale.
// 2. Otherwise negotiate via the Accept-Language header.
function getLocale(request: NextRequest): Locale {
  const cookieLang = request.cookies.get("lang")?.value;
  if (cookieLang && (locales as readonly string[]).includes(cookieLang)) {
    return cookieLang as Locale;
  }

  return matchAcceptLanguage(request.headers.get("accept-language"), locales, defaultLocale);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale prefix.
  const locale = getLocale(request);

  // If the first segment exists but is not a supported locale (e.g. /fr),
  // it is a phantom/unknown path — redirect to the locale home rather than
  // building a non-existent /<locale>/fr route that 404s.
  const firstSegment = pathname.split("/")[1];
  if (firstSegment && !(locales as readonly string[]).includes(firstSegment)) {
    request.nextUrl.pathname = `/${locale}`;
    return NextResponse.redirect(request.nextUrl);
  }

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Single combined negative-lookahead: run the proxy on every route EXCEPT
  // Next.js internals (_next), API routes, and any static asset (paths that
  // contain a dot, e.g. /_next/static/chunks/foo.js). Otherwise the proxy
  // would redirect JS chunk requests and the browser would receive HTML
  // instead of JavaScript ("Unexpected token '<'").
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
