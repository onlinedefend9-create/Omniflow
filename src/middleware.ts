import { NextResponse } from 'next/server';

export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/webhooks/tiktok|api|_next/static|_next/image|favicon.ico).*)'],
};
