'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Share2, Check } from 'lucide-react';
import { useState } from 'react';

interface Props {
    title: string;
}

export function ListingDetailActions({ title }: Props) {
    const router = useRouter();
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({ title, url });
            } catch {
                // user cancelled
            }
        } else {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="flex items-center justify-between mb-4">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
                <ArrowLeft className="w-4 h-4" />
                Orqaga
            </button>

            <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
                {copied ? (
                    <>
                        <Check className="w-4 h-4 text-green-500" />
                        Nusxalandi
                    </>
                ) : (
                    <>
                        <Share2 className="w-4 h-4" />
                        Ulashish
                    </>
                )}
            </button>
        </div>
    );
}
