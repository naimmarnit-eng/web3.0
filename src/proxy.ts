import NextAuth from "next-auth";

import { authConfig } from "@/infrastructure/auth/auth.config";

const { auth } =
  NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn =
    !!req.auth;

  const pathname =
    req.nextUrl.pathname;

  const isAdminRoute =
    pathname.startsWith(
      "/admin",
    );

  const isLoginPage =
    pathname === "/login";

  if (
    isAdminRoute &&
    !isLoginPage &&
    !isLoggedIn
  ) {
    return Response.redirect(
      new URL(
        "/login",
        req.nextUrl,
      ),
    );
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
