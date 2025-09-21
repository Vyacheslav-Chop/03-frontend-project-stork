import { NextRequest, NextResponse } from "next/server";
import * as setCookie from 'set-cookie-parser';
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = [
    '/users',
    '/tasks',
    '/diaries',
    // '/auth/logout',
    // '/auth/refresh',
    '/weeks/private',
    '/weeks/mom-state',
    '/weeks/baby-state',
];
const publicRoutes = [
    '/auth/register',
    '/auth/login',
    '/weeks/public',
];

export async function middleware(request: NextRequest) {
    
  const { pathname } = request.nextUrl;
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
    
  const sessionId = request.cookies.get("sessionId")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

   if (isPrivateRoute && !sessionId) {
    if (refreshToken) {
      try {
        const response = await checkServerSession();

        if (response.ok) {
          const res = NextResponse.next();

          const cookiesData: string[] =
            typeof (response.headers as any).getSetCookie === "function"
              ? (response.headers as any).getSetCookie()
              : setCookie.splitCookiesString(response.headers.get("set-cookie") ?? "");

          const parsedCookies = setCookie.parse(cookiesData, { map: false });

            for (const cookie of parsedCookies) {
              
            const sameSite =
            typeof cookie.sameSite === "string"
            ? (cookie.sameSite.toLowerCase() as "lax" | "strict" | "none")
            : "lax";
                
            res.cookies.set({
              name: cookie.name,
              value: cookie.value,
              path: cookie.path ?? "/",
              httpOnly: Boolean(cookie.httpOnly),
              secure: Boolean(cookie.secure),
              sameSite,
              ...(cookie.expires ? { expires: cookie.expires } : {}),
              ...(typeof cookie.maxAge === "number" ? { maxAge: cookie.maxAge } : {}),
              ...(cookie.domain ? { domain: cookie.domain } : {}),
            });
          }

            return res;
        }

        return NextResponse.redirect(new URL("/auth/register", request.url));
      } catch {
        return NextResponse.redirect(new URL("/auth/register", request.url));
      }
    }

    return NextResponse.redirect(new URL("/auth/register", request.url));
  }

  if (isPublicRoute && sessionId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    '/users/:path*',
    '/tasks/:path*',
    '/diaries/:path*',
    // '/auth/logout',
    // '/auth/refresh',
    '/weeks/private/:path*',
    '/weeks/mom-state/:path*',
    '/weeks/baby-state/:path*',
    '/auth/register',
    '/auth/login',
    '/weeks/public',
  ],
};