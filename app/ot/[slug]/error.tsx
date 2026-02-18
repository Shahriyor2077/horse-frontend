'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function ListingError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Listing page error:', error);
    }, [error]);

    return (
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh] text-center">
            <AlertTriangle className="w-14 h-14 text-amber-400 mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                E&apos;lonni yuklashda xatolik yuz berdi
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
                Sahifani yangilang yoki biroz kutib qayta urinib ko&apos;ring.
            </p>
            <div className="flex items-center gap-3">
                <Link
                    href="/bozor"
                    className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Bozorga qaytish
                </Link>
                <button
                    onClick={reset}
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    Qayta urinish
                </button>
            </div>
        </div>
    );
}
