import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/infrastructure/auth/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname, search } = req.nextUrl;

  // 1. Detect if the path has a `/en` prefix
  // Matches '/en/services', '/en', but excludes assets if matcher filters fail
  const hasEnPrefix = pathname.startsWith("/en/") || pathname === "/en";

  // Get the normalized internal path (e.g. /en/about -> /about, /en -> /)
  let normalizedPath = pathname;
  if (hasEnPrefix) {
    normalizedPath = pathname.replace(/^\/en/, "") || "/";
  }

  // 2. Auth checks for admin routes (always evaluated on normalized paths)
  const isAdminRoute = normalizedPath.startsWith("/admin");
  const isLoginPage = normalizedPath === "/login";

  if (isAdminRoute && !isLoginPage && !isLoggedIn) {
    // If not logged in and accessing admin, redirect to login
    // Preserves English prefix on redirect to login if necessary
    const loginUrl = new URL(hasEnPrefix ? "/en/login" : "/login", req.nextUrl);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Handle locale prefix simulation via URL rewrites
  if (hasEnPrefix) {
    // Set cookie on request so that Server Components read it instantly during this render cycle
    req.cookies.set("NEXT_LOCALE", "en");

    // Rewrite internally to the normalized page path
    const rewriteUrl = new URL(`${normalizedPath}${search}`, req.nextUrl);
    const response = NextResponse.rewrite(rewriteUrl);

    // Set cookie on response so that the browser saves it
    response.cookies.set("NEXT_LOCALE", "en", { path: "/" });
    return response;
  } else {
    // For default locale paths (Thai), set cookie to 'th' if it was previously set to 'en'
    const currentLocale = req.cookies.get("NEXT_LOCALE")?.value;
    if (currentLocale === "en") {
      req.cookies.set("NEXT_LOCALE", "th");
      const response = NextResponse.next();
      response.cookies.set("NEXT_LOCALE", "th", { path: "/" });
      return response;
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - uploads, images (media assets)
     * - favicon.ico, sitemap.xml, robots.txt, feed.xml, dynamic assets (logos, icons)
     */
    "/((?!api|_next/static|_next/image|uploads|images|favicon.ico|robots.txt|sitemap.xml|feed.xml|file.svg|globe.svg|window.svg).*)",
  ],
};
