import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );
  const { data: { user } } = await supabase.auth.getUser();
  const otpVerified = request.cookies.get("otp_verified")?.value === "true";
  const protectedPaths = ["/dashboard", "/quiz", "/results", "/review", "/history"];
  const isProtected = protectedPaths.some(p => request.nextUrl.pathname.startsWith(p));
  if (isProtected) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
    if (!otpVerified) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/verify";
      return NextResponse.redirect(url);
    }
  }
  return supabaseResponse;
}
export const config = {
  matcher: ["/dashboard/:path*", "/quiz/:path*", "/results/:path*", "/review/:path*", "/history/:path*"],
};