'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { getRegionsWithDistricts, getBreeds, Region, Breed } from '@/lib/api';

export function BozorMobileFilters() {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [regions, setRegions] = useState<Region[]>([]);
    const [breeds, setBreeds] = useState<Breed[]>([]);

    const [regionId, setRegionId] = useState('');
    const [districtId, setDistrictId] = useState('');
    const [breedId, setBreedId] = useState('');
    const [purpose, setPurpose] = useState('');
    const [gender, setGender] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');

    useEffect(() => {
        getRegionsWithDistricts().then(setRegions).catch(() => {});
        getBreeds().then(setBreeds).catch(() => {});
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        const p = new URLSearchParams(window.location.search);
        setRegionId(p.get('regionId') || '');
        setDistrictId(p.get('districtId') || '');
        setBreedId(p.get('breedId') || '');
        setPurpose(p.get('purpose') || '');
        setGender(p.get('gender') || '');
        setPriceMin(p.get('priceMin') || '');
        setPriceMax(p.get('priceMax') || '');
    }, [isOpen]);

    const selectedRegion = regions.find(r => r.id === regionId);
    const districts = selectedRegion?.districts || [];

    const apply = () => {
        const params = new URLSearchParams();
        if (regionId) params.set('regionId', regionId);
        if (districtId) params.set('districtId', districtId);
        if (breedId) params.set('breedId', breedId);
        if (purpose) params.set('purpose', purpose);
        if (gender) params.set('gender', gender);
        if (priceMin) params.set('priceMin', priceMin);
        if (priceMax) params.set('priceMax', priceMax);
        router.push(`/bozor?${params.toString()}`);
        setIsOpen(false);
    };

    const clear = () => {
        router.push('/bozor');
        setIsOpen(false);
    };

    const inp = "w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary-500";

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
                <SlidersHorizontal className="w-4 h-4" />
                Filtr
            </button>

            {isOpen && (
                <div className="fixed inset-x-0 top-16 bottom-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 top-0 bottom-0 w-72 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl flex flex-col">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
                            <h2 className="font-semibold text-slate-900 dark:text-slate-100">Filtrlar</h2>
                            <button type="button" onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-5">
                            {/* Viloyat */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Viloyat</label>
                                <select className={inp} value={regionId} onChange={e => { setRegionId(e.target.value); setDistrictId(''); }}>
                                    <option value="">Barchasi</option>
                                    {regions.map(r => <option key={r.id} value={r.id}>{r.nameUz}</option>)}
                                </select>
                            </div>
                            {/* Tuman */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Tuman</label>
                                <select className={inp} value={districtId} onChange={e => setDistrictId(e.target.value)} disabled={!regionId || districts.length === 0}>
                                    <option value="">Barchasi</option>
                                    {districts.map(d => <option key={d.id} value={d.id}>{d.nameUz}</option>)}
                                </select>
                            </div>
                            {/* Maqsad */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Maqsad</label>
                                <select className={inp} value={purpose} onChange={e => setPurpose(e.target.value)}>
                                    <option value="">Barchasi</option>
                                    <option value="KOPKARI">Ko&apos;pkari</option>
                                    <option value="SPORT">Sport</option>
                                    <option value="SAYR">Sayr</option>
                                    <option value="ISHCHI">Ishchi</option>
                                    <option value="NASLCHILIK">Naslchilik</option>
                                </select>
                            </div>
                            {/* Zoti */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Zoti</label>
                                <select className={inp} value={breedId} onChange={e => setBreedId(e.target.value)}>
                                    <option value="">Barchasi</option>
                                    {breeds.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                </select>
                            </div>
                            {/* Jinsi */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Jinsi</label>
                                <div className="flex gap-2">
                                    {[{ v: '', l: 'Barchasi' }, { v: 'AYGIR', l: 'Aygir' }, { v: 'BIYA', l: 'Biya' }, { v: 'AXTA', l: 'Axta' }].map(({ v, l }) => (
                                        <button key={v} type="button" onClick={() => setGender(v)}
                                            className={`flex-1 py-2 rounded-lg border text-sm transition-colors ${gender === v ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-500 text-primary-700 dark:text-primary-400 font-medium' : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400'}`}>
                                            {l}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Narx */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Narx (so&apos;m)</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input type="number" placeholder="Min" value={priceMin} onChange={e => setPriceMin(e.target.value)} className={inp} min={0} />
                                    <input type="number" placeholder="Max" value={priceMax} onChange={e => setPriceMax(e.target.value)} className={inp} min={0} />
                                </div>
                            </div>
                            {/* Buttons */}
                            <div className="flex gap-2 pt-1">
                                <button type="button" onClick={clear} className="flex-1 py-2.5 text-sm font-medium border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    Tozalash
                                </button>
                                <button type="button" onClick={apply} className="flex-1 py-2.5 text-sm font-semibold bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                                    Filtrlash
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
