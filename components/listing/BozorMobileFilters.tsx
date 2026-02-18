'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { ListingFilters } from './ListingFilters';

export function BozorMobileFilters() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
                <SlidersHorizontal className="w-4 h-4" />
                Filtr
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl flex flex-col">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
                            <h2 className="font-semibold text-slate-900 dark:text-slate-100">Filtrlar</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            <ListingFilters
                                hideTitle
                                onApply={() => setIsOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
