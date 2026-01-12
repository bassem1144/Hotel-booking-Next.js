import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // If user is admin/partner and trying to access home page, redirect to their dashboard
  if (pathname === "/" && token) {
    if (token.role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (token.role === "partner") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
