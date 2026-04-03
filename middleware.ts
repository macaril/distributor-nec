import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const auth = request.cookies.get('admin-auth'); // Sesuai dengan nama cookie di adminAuth.ts

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!auth) {
      // Jika tidak login, lempar ke halaman login
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }
}