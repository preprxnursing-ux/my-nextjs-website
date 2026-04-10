import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  try {
    return NextResponse.next()
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.next()
  }
}