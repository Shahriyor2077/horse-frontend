'use client';

import { useEffect } from 'react';

export function ViewTracker({ listingId }: { listingId: string }) {
    useEffect(() => {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const token = localStorage.getItem('accessToken');

        fetch(`${apiBase}/api/listings/${listingId}/view`, {
            method: 'POST',
            credentials: 'include',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        }).catch(() => { });
    }, [listingId]);

    return null;
}
