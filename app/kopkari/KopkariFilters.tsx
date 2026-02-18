'use client';

import { useRouter, usePathname } from 'next/navigation';
import { CustomSelect } from '@/components/ui/CustomSelect';

interface Region {
    id: string;
    nameUz: string;
}

interface Props {
    regions: Region[];
    currentRegionId: string;
    currentStatus: string;
}

export function KopkariFilters({ regions, currentRegionId, currentStatus }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams();
        if (key !== 'regionId' && currentRegionId) params.set('regionId', currentRegionId);
        if (key !== 'status' && currentStatus) params.set('status', currentStatus);
        if (value) params.set(key, value);
        router.push(`${pathname}?${params.toString()}`);
    };

    const regionOptions = [
        { value: '', label: 'Barcha hududlar' },
        ...regions.map((r: Region) => ({ value: r.id, label: r.nameUz })),
    ];

    const statusOptions = [
        { value: '', label: 'Barcha tadbirlar' },
        { value: 'upcoming', label: 'Kutilayotgan' },
        { value: 'past', label: "Bo'lib o'tgan" },
    ];

    return (
        <div className="flex gap-3 mb-6 flex-wrap">
            <CustomSelect
                name="regionId"
                value={currentRegionId}
                onChange={e => updateFilter('regionId', e.target.value)}
                options={regionOptions}
                className="w-52"
            />
            <CustomSelect
                name="status"
                value={currentStatus}
                onChange={e => updateFilter('status', e.target.value)}
                options={statusOptions}
                className="w-48"
            />
        </div>
    );
}
