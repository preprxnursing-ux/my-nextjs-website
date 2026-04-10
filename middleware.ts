import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // ── safety: if env vars missing, skip auth entirely ──
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({
          request: { headers: request.headers },
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;

    // ── protected routes — must be signed in ──
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

    if (isProtected && !user) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // ── auth routes — redirect signed-in users away ──
    const authPaths = ["/auth/login", "/auth/signup"];
    const isAuthPage = authPaths.some((path) => pathname.startsWith(path));

    if (isAuthPage && user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return response;
  } catch (error) {
    // ── never crash the site — fail open ──
    console.error("Middleware auth error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static  (Next.js static files)
     * - _next/image   (Next.js image optimisation)
     * - favicon.ico, logo.png, robots.txt, sitemap.xml
     * - any file with an image/font extension
     */
    "/((?!_next/static|_next/image|favicon\\.ico|logo\\.png|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf)$).*)",
  ],
};