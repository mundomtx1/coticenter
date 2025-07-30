// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Obtener la cookie "flag" que indica si hay una sesión activa
  const sessionCookie = request.cookies.get('session_active')?.value;

  const { pathname } = request.nextUrl;

  // Si el usuario intenta acceder a una ruta protegida y no tiene la cookie de sesión,
  // lo redirigimos al login.
  if (!sessionCookie && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si el usuario está logueado (tiene la cookie) e intenta ir al login,
  // lo redirigimos al dashboard.
  if (sessionCookie && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// El matcher sigue igual, protegiendo todo excepto los assets y las APIs.
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};