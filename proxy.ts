import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = verifySessionToken(token);
  const isAuthenticated = !!session;

  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/dashboard");
  const isLoginRoute = pathname === "/login";

  // If trying to access admin dashboard while not authenticated -> Redirect to /login
  if (isAdminRoute && !isAuthenticated) {
    const callbackUrl = encodeURIComponent(`${pathname}${search}`);
    const loginUrl = new URL(`/login?callbackUrl=${callbackUrl}`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If already authenticated and trying to access /login -> Redirect to /admin
  if (isLoginRoute && isAuthenticated) {
    const adminUrl = new URL("/admin", request.url);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/login",
  ],
};
