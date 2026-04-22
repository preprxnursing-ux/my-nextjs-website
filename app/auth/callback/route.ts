import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      const isGoogleUser = data.user.app_metadata?.provider === "google";
      if (isGoogleUser) {
        return NextResponse.redirect(`${origin}/dashboard`);
      }
    }
  }
  return NextResponse.redirect(`${origin}/auth/verify`);
}