import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { checkServerSession } from './lib/api/serverApi';
import { parse } from 'cookie';

const privateRoutes = ['/diary', '/profile', '/journey'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionId')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;
    
  const { pathname } = request.nextUrl;
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
    
  if (isPrivateRoute) {
    if (!sessionId) {
      if (refreshToken) {
        try {
          const data = await checkServerSession();
          const setCookie = data.headers['set-cookie'];
          if (setCookie) {
              const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
              
            for (const cookieStr of cookieArray) {
              const parsed = parse(cookieStr);
              const options = {
                expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
                path: parsed.Path,
                maxAge: Number(parsed['Max-Age']),
              };
                
              if (parsed.sessionId) cookieStore.set('sessionId', parsed.sessionId, options);
              if (parsed.refreshToken)
                cookieStore.set('refreshToken', parsed.refreshToken, options);
            }
              
            if (isPrivateRoute) {
              return NextResponse.next({ headers: { Cookie: cookieStore.toString() } });
            }
          }
        } catch {
          return NextResponse.redirect(new URL('/sign-in', request.url));
        }
      }
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }
    
  if (isPublicRoute) {
    if (sessionId) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
      
    return NextResponse.next();
  }
    
  return NextResponse.next();
}

export const config = {
  matcher: ['/diary/:path*', '/profile/:path*', '/journey/:path*', '/sign-in', '/sign-up'],
};
