import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const { email, password } = await request.json();
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return NextResponse.json({ valid: false, message: "Invalid email or password." }, { status: 401 });
  }
  await supabase.auth.signOut();
  const response = NextResponse.json({ valid: true });
  response.cookies.delete("otp_verified");
  return response;
}