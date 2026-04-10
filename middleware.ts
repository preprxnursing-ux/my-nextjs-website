import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pages that require login
  const protectedPaths = [
    "/quiz",
    "/results",
    "/review",
    "/history",
    "/dashboard",
  ];

  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // TEMP FIX: we cannot safely check Supabase user in middleware yet
  // so we allow all users through for now

  if (isProtected) {
    const hasSessionCookie =
      request.cookies.get("sb-access-token") ||
      request.cookies.get("supabase-auth-token");

    // If no session cookie → redirect to login
    if (!hasSessionCookie) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/auth/login";
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Prevent logged-in users from seeing auth pages (basic cookie check)
  if (pathname.startsWith("/auth")) {
    const hasSessionCookie =
      request.cookies.get("sb-access-token") ||
      request.cookies.get("supabase-auth-token");

    if (hasSessionCookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};