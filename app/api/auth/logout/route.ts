import { NextResponse } from "next/server";
export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("otp_verified");
  return response;
}