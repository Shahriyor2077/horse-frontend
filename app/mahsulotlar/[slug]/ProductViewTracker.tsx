'use client';

import { useEffect } from 'react';

const CACHE_KEY = 'viewed_products';
const CACHE_TTL = 24 * 60 * 60 * 1000;

export function ProductViewTracker({ slug }: { slug: string }) {
    useEffect(() => {
        try {
            const raw = localStorage.getItem(CACHE_KEY);
            const cache: Record<string, number> = raw ? JSON.parse(raw) : {};
            if (cache[slug] && Date.now() - cache[slug] < CACHE_TTL) return;

            const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const token = localStorage.getItem('accessToken');

            fetch(`${apiBase}/api/products/${slug}/view`, {
                method: 'POST',
                credentials: 'include',
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            }).then(() => {
                cache[slug] = Date.now();
                localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
            }).catch(() => { });
        } catch { }
    }, [slug]);

    return null;
}
