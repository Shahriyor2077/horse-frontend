'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';

interface Props {
    listingId: string;
    variant?: 'card' | 'outline';
}

export function FavoriteButton({ listingId, variant = 'card' }: Props) {
    const [saved, setSaved] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setSaved(prev => !prev);
    };

    if (variant === 'outline') {
        return (
            <button
                onClick={handleClick}
                aria-label="Saqlash"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-colors ${
                    saved
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-500 dark:text-red-400'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-red-300 hover:text-red-500 dark:hover:text-red-400'
                }`}
            >
                <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                {saved ? 'Saqlangan' : 'Saqlash'}
            </button>
        );
    }

    return (
        <button
            onClick={handleClick}
            aria-label="Saqlash"
            className={`w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm shadow transition-colors ${
                saved
                    ? 'bg-red-500 text-white'
                    : 'bg-black/40 text-white hover:bg-black/60'
            }`}
        >
            <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>
    );
}
