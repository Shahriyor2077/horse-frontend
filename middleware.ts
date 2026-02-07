import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if accessing admin routes
    if (pathname.startsWith('/admin')) {
        // Skip login page itself
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Check for auth cookie (accessToken set by backend)
        const accessToken = request.cookies.get('accessToken');

        if (!accessToken) {
            // Not authenticated - redirect to admin login
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // User routes (/profil, /elon) - NO middleware check
    // AuthProvider handles client-side authentication with localStorage
    // This allows cross-domain token storage to work properly

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        // Removed user routes - they use client-side auth
    ],
};
