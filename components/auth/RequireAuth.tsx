'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { Loader2 } from 'lucide-react';

interface RequireAuthProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
    redirectTo?: string;
}

export function RequireAuth({ children, requireAdmin = false, redirectTo }: RequireAuthProps) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Only redirect after loading is complete
        if (isLoading) return;

        if (!user) {
            console.log('🔒 RequireAuth: No user, redirecting to login');
            const loginUrl = requireAdmin ? '/admin/login' : '/login';
            const returnUrl = redirectTo || (typeof window !== 'undefined' ? window.location.pathname : '/');
            router.push(`${loginUrl}?returnUrl=${encodeURIComponent(returnUrl)}`);
            return;
        }

        if (requireAdmin && !user.isAdmin) {
            console.log('🔒 RequireAuth: User is not admin, redirecting to admin login');
            router.push('/admin/login');
            return;
        }

        console.log('✅ RequireAuth: User authenticated:', user.displayName);
    }, [user, isLoading, requireAdmin, redirectTo, router]);

    // Show loading while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
                    <p className="text-slate-600">Yuklanmoqda...</p>
                </div>
            </div>
        );
    }

    // Don't render children if not authenticated
    if (!user || (requireAdmin && !user.isAdmin)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
                    <p className="text-slate-600">Redirect qilinmoqda...</p>
                </div>
            </div>
        );
    }

    // User is authenticated, render children
    return <>{children}</>;
}
