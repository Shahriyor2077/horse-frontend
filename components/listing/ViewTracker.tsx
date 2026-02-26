'use client';

import { useEffect } from 'react';

const VIEW_CACHE_KEY = 'viewed_listings';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 soat

function hasViewedRecently(listingId: string): boolean {
    try {
        const raw = localStorage.getItem(VIEW_CACHE_KEY);
        if (!raw) return false;
        const cache: Record<string, number> = JSON.parse(raw);
        const ts = cache[listingId];
        return !!ts && Date.now() - ts < CACHE_TTL_MS;
    } catch {
        return false;
    }
}

function markViewed(listingId: string) {
    try {
        const raw = localStorage.getItem(VIEW_CACHE_KEY);
        const cache: Record<string, number> = raw ? JSON.parse(raw) : {};
        cache[listingId] = Date.now();
        // Eski yozuvlarni tozalaymiz (500 dan oshsa)
        const keys = Object.keys(cache);
        if (keys.length > 500) {
            keys.sort((a, b) => cache[a] - cache[b]);
            keys.slice(0, 100).forEach(k => delete cache[k]);
        }
        localStorage.setItem(VIEW_CACHE_KEY, JSON.stringify(cache));
    } catch { }
}

export function ViewTracker({ listingId }: { listingId: string }) {
    useEffect(() => {
        if (hasViewedRecently(listingId)) return;

        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

        fetch(`${apiBase}/api/listings/${listingId}/view`, {
            method: 'POST',
            credentials: 'include',
        }).then(() => {
            markViewed(listingId);
        }).catch(() => { });
    }, [listingId]);

    return null;
}
