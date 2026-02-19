import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/shared/constants/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(AUTH_COOKIE)?.value;

  const isProtected = pathname.startsWith("/produtos");
  const isLogin = pathname.startsWith("/login") || pathname === "/";

  if (isProtected && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isLogin && token && pathname !== "/produtos") {
    const url = req.nextUrl.clone();
    url.pathname = "/produtos";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/produtos/:path*"],
};
