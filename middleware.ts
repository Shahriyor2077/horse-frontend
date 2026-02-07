import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // NO server-side auth checks
    // All authentication is handled client-side by RequireAuth component
    // This allows localStorage tokens to work properly in cross-domain setup (AWS + Vercel)

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Middleware disabled - client-side auth only
    ],
};
