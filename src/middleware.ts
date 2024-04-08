import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Checks to see if we have exerciseId and userToken cookies set and redirects to the appropriate page if not
export function middleware(request: NextRequest) {
  if (!cookies().get("token")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
