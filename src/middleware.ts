import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 如果是 API 请求，直接放行
  if (request.nextUrl.pathname.startsWith('/bkapi')) {
    return NextResponse.next();
  }

  const authToken = request.cookies.get('auth_token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

  // 如果没有 token 且不是认证页面，重定向到登录页
  if (!authToken && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  // 如果有 token 且是认证页面，重定向到仪表板
  if (authToken && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard/overview', request.url));
  }

  // 如果有 token 且是仪表板页面，允许访问
  if (authToken && isDashboardPage) {
    return NextResponse.next();
  }

  // 其他情况，允许访问
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
};
