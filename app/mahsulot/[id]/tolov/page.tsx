'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, Loader2 } from 'lucide-react';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { createProductPaymentInvoice } from '@/lib/api';

function ProductPaymentContent() {
    const params = useParams();
    const router = useRouter();
    const productId = params.id as string;
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [price, setPrice] = useState<number | null>(null);

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        fetch(`${API_URL}/api/payments/product-price`)
            .then(r => r.json())
            .then(data => {
                if (data.success && data.data) setPrice(data.data.productListingPrice);
            })
            .catch(() => setPrice(35000));
    }, []);

    const handlePay = async () => {
        setIsProcessing(true);
        setError('');
        try {
            const result = await createProductPaymentInvoice(productId);
            window.location.href = result.clickUrl;
        } catch (err: any) {
            setError(err.message || "To'lov yaratishda xatolik");
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4">
            <div className="container mx-auto max-w-md">
                <Link
                    href="/profil/elonlarim"
                    className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Orqaga
                </Link>

                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center shadow-sm">
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
                        <Package className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>

                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        Mahsulot joylashtirish
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                        Mahsulotingizni platformada chop etish uchun to&apos;lov qiling
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 mb-6">
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">To&apos;lov summasi</p>
                        <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                            {price !== null
                                ? price.toLocaleString('uz-UZ')
                                : <Loader2 className="w-6 h-6 animate-spin inline" />}
                            {price !== null && <span className="text-base font-normal text-slate-500 ml-1">so&apos;m</span>}
                        </p>
                    </div>

                    <button
                        onClick={handlePay}
                        disabled={isProcessing || price === null}
                        className="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
                    >
                        {isProcessing ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Jarayonda...
                            </span>
                        ) : (
                            "Click orqali to'lash"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ProductPaymentPage() {
    return (
        <RequireAuth redirectTo="/login">
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                </div>
            }>
                <ProductPaymentContent />
            </Suspense>
        </RequireAuth>
    );
}
