'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Zap, Rocket, Crown, Check, Star } from 'lucide-react';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { createPaymentInvoice } from '@/lib/api';

interface PackagePrice {
    amount: number;
    originalAmount: number;
    hasDiscount: boolean;
}

interface Package {
    id: string;
    apiKey: string;
    name: string;
    icon: React.ReactNode;
    color: string;
    bgGradient: string;
    borderColor: string;
    selectedBorder: string;
    popular?: boolean;
    features: string[];
}

const PACKAGE_META: Package[] = [
    {
        id: 'oson_start',
        apiKey: 'OSON_START',
        name: 'Oson start',
        icon: <Zap className="w-6 h-6" />,
        color: 'text-blue-600 dark:text-blue-400',
        bgGradient: 'from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20',
        borderColor: 'border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700',
        selectedBorder: 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20',
        features: [
            "3 kun TOP'da joylashtirish",
            "2x ko'proq ko'rishlar",
            "Tezroq sotish imkoniyati",
        ],
    },
    {
        id: 'tezkor_savdo',
        apiKey: 'TEZKOR_SAVDO',
        name: 'Tezkor savdo',
        icon: <Rocket className="w-6 h-6" />,
        color: 'text-primary-600 dark:text-primary-400',
        bgGradient: 'from-primary-50 to-primary-100/50 dark:from-primary-950/30 dark:to-primary-900/20',
        borderColor: 'border-primary-300 dark:border-primary-700 hover:border-primary-400 dark:hover:border-primary-600',
        selectedBorder: 'border-primary-500 dark:border-primary-400 ring-2 ring-primary-500/20',
        popular: true,
        features: [
            "7 kun TOP'da joylashtirish",
            "4x ko'proq ko'rishlar",
            "Qidiruv natijalarida birinchi",
        ],
    },
    {
        id: 'turbo_savdo',
        apiKey: 'TURBO_SAVDO',
        name: 'Premium',
        icon: <Crown className="w-6 h-6" />,
        color: 'text-amber-600 dark:text-amber-400',
        bgGradient: 'from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20',
        borderColor: 'border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-700',
        selectedBorder: 'border-amber-500 dark:border-amber-400 ring-2 ring-amber-500/20',
        features: [
            "30 kun TOP'da joylashtirish",
            "10x ko'proq ko'rishlar",
            "Premium sotuvchi nishoni",
        ],
    },
];

function PaymentPageContent() {
    const params = useParams();
    const listingId = params.id as string;
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [prices, setPrices] = useState<Record<string, PackagePrice>>({});
    const [isLoadingPrices, setIsLoadingPrices] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/packages`)
            .then(r => r.json())
            .then(res => {
                if (res.success && res.data) setPrices(res.data);
            })
            .catch(() => {})
            .finally(() => setIsLoadingPrices(false));
    }, []);

    const handleSelectPackage = (pkg: Package) => {
        setSelectedPackage(pkg.id);
        setError('');
    };

    const handlePay = async () => {
        if (!selectedPackage || !listingId) return;
        setIsProcessing(true);
        setError('');

        try {
            const packageMap: Record<string, 'OSON_START' | 'TEZKOR_SAVDO' | 'TURBO_SAVDO'> = {
                oson_start: 'OSON_START',
                tezkor_savdo: 'TEZKOR_SAVDO',
                turbo_savdo: 'TURBO_SAVDO',
            };
            const packageType = packageMap[selectedPackage];
            const result = await createPaymentInvoice(listingId, packageType);
            window.location.href = result.clickUrl;
        } catch (err: any) {
            setError(err.message || "To'lov yaratishda xatolik");
            setIsProcessing(false);
        }
    };

    const selected = PACKAGE_META.find((p: Package) => p.id === selectedPackage);
    const selectedPrice = selected ? prices[selected.apiKey] : null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-6 sm:py-10">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                {/* Back */}
                <Link
                    href="/profil/elonlarim"
                    className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors mb-6"
                >
                    <ArrowLeft className="w-5 h-5" />
                    E&apos;lonlarimga qaytish
                </Link>

                {/* Header */}
                <div className="text-center mb-10 sm:mb-12">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        Tarifni tanlang
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
                        E&apos;loningizni ko&apos;proq odamlarga yetkazing
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                        <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
                    </div>
                )}

                {/* Packages Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 items-stretch">
                    {PACKAGE_META.map((pkg: Package) => {
                        const isSelected = selectedPackage === pkg.id;
                        const pkgPrice = prices[pkg.apiKey];
                        const displayAmount = pkgPrice?.amount;
                        const originalAmount = pkgPrice?.originalAmount;
                        const hasDiscount = pkgPrice?.hasDiscount;
                        return (
                            <div key={pkg.id} className="relative pt-4 flex flex-col">
                                {/* Popular Badge — outside card, above it */}
                                {pkg.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-primary-600 text-white shadow-lg shadow-primary-600/30 whitespace-nowrap">
                                            <Star className="w-3 h-3 fill-current" />
                                            ENG MASHHUR
                                        </span>
                                    </div>
                                )}

                                <button
                                    onClick={() => handleSelectPackage(pkg)}
                                    className={`relative flex flex-col flex-1 w-full text-left rounded-2xl border-2 p-5 sm:p-6 transition-all duration-200 bg-gradient-to-b ${pkg.bgGradient} ${
                                        isSelected
                                            ? pkg.selectedBorder + ' scale-[1.02]'
                                            : pkg.borderColor
                                    }`}
                                >
                                    {/* Icon & Name */}
                                    <div className={`mb-4 ${pkg.popular ? 'mt-2' : ''}`}>
                                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm mb-3 ${pkg.color}`}>
                                            {pkg.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                            {pkg.name}
                                        </h3>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-5">
                                        {isLoadingPrices ? (
                                            <div className="h-9 w-28 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                                        ) : (
                                            <>
                                                {hasDiscount && originalAmount && (
                                                    <div className="text-sm line-through text-slate-400 dark:text-slate-500 mb-0.5">
                                                        {originalAmount.toLocaleString('uz-UZ')} so&apos;m
                                                    </div>
                                                )}
                                                <p className={`text-2xl sm:text-3xl font-extrabold leading-tight ${hasDiscount ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-slate-100'}`}>
                                                    {(displayAmount ?? 0).toLocaleString('uz-UZ')}{' '}
                                                    <span className="text-base font-medium text-slate-500 dark:text-slate-400">so&apos;m</span>
                                                </p>
                                            </>
                                        )}
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-2.5 mt-auto">
                                        {pkg.features.map((feature: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                                <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pkg.color}`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Selection indicator */}
                                    {isSelected && (
                                        <div className="absolute top-4 right-4">
                                            <div className="w-6 h-6 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Pay Button */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="w-full sm:w-auto">
                            {selected && selectedPrice ? (
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-0.5">Tanlangan tarif</p>
                                    <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                                        {selected.name}
                                    </p>
                                    <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                                        {(selectedPrice.amount ?? 0).toLocaleString('uz-UZ')}{' '}
                                        <span className="text-base font-medium text-slate-500 dark:text-slate-400">so&apos;m</span>
                                    </p>
                                </div>
                            ) : (
                                <p className="text-slate-500 dark:text-slate-400">
                                    Yuqoridagi tariflardan birini tanlang
                                </p>
                            )}
                        </div>
                        <button
                            onClick={handlePay}
                            disabled={!selectedPackage || isProcessing}
                            className="w-full sm:w-auto btn btn-primary px-8 py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Jarayonda...
                                </span>
                            ) : (
                                "To'lov qilish"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <RequireAuth redirectTo="/profil/elonlarim">
            <PaymentPageContent />
        </RequireAuth>
    );
}
