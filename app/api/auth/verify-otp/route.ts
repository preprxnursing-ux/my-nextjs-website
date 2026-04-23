import { NextResponse } from "next/server";
export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("otp_verified", "true", {
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return response;
}