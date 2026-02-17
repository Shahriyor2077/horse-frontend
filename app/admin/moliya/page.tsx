'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { Save, Loader2, TrendingUp, Package, List, CheckCircle, Clock, XCircle } from 'lucide-react';
import { getFinanceSettings, updateProductPrice, getAdminPayments } from '@/lib/admin-api';

export const dynamic = 'force-dynamic';

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
    COMPLETED: { label: 'To\'langan', color: 'bg-green-100 text-green-700' },
    PENDING: { label: 'Kutilmoqda', color: 'bg-amber-100 text-amber-700' },
    CANCELLED: { label: 'Bekor', color: 'bg-red-100 text-red-700' },
    FAILED: { label: 'Xato', color: 'bg-red-100 text-red-700' },
};

export default function AdminMoliyaPage() {
    const [price, setPrice] = useState('');
    const [isLoadingSettings, setIsLoadingSettings] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [settingsError, setSettingsError] = useState('');
    const [settingsSuccess, setSettingsSuccess] = useState('');

    const [payments, setPayments] = useState<any[]>([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoadingPayments, setIsLoadingPayments] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    useEffect(() => {
        getFinanceSettings()
            .then(res => { if (res.success && res.data) setPrice(String(res.data.productListingPrice)); })
            .catch(() => setPrice('35000'))
            .finally(() => setIsLoadingSettings(false));
    }, []);

    useEffect(() => {
        setIsLoadingPayments(true);
        getAdminPayments({ page, limit: 20, status: statusFilter || undefined, type: typeFilter || undefined })
            .then(res => {
                if (res.success && res.data) {
                    setPayments(res.data.payments);
                    setTotal(res.data.total);
                    setTotalPages(res.data.totalPages);
                    setTotalRevenue(res.data.totalRevenue);
                }
            })
            .finally(() => setIsLoadingPayments(false));
    }, [page, statusFilter, typeFilter]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSettingsError('');
        setSettingsSuccess('');
        const num = Number(price);
        if (!num || num <= 0) { setSettingsError('To\'g\'ri narx kiriting'); return; }
        setIsSaving(true);
        try {
            const res = await updateProductPrice(num);
            if (res.success) setSettingsSuccess('Narx muvaffaqiyatli yangilandi!');
            else setSettingsError(res.message || 'Xatolik');
        } catch (err: any) {
            setSettingsError(err.message || 'Xatolik');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Moliya</h1>
                <p className="text-slate-500">To'lovlar va narx sozlamalari</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Total Revenue */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-xl">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Jami tushum</p>
                        <p className="text-xl font-bold text-slate-900">{totalRevenue.toLocaleString('uz-UZ')} so'm</p>
                    </div>
                </div>
                {/* Total payments */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Jami to'lovlar</p>
                        <p className="text-xl font-bold text-slate-900">{total}</p>
                    </div>
                </div>
                {/* Price setting */}
                <form onSubmit={handleSave} className="bg-white rounded-xl border border-slate-200 p-5">
                    <p className="text-sm text-slate-500 mb-2">Mahsulot joylash narxi</p>
                    {settingsSuccess && <p className="text-xs text-green-600 mb-2">{settingsSuccess}</p>}
                    {settingsError && <p className="text-xs text-red-600 mb-2">{settingsError}</p>}
                    <div className="flex gap-2">
                        {isLoadingSettings ? (
                            <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                        ) : (
                            <>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    min="1000"
                                    step="1000"
                                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="35000"
                                    disabled={isSaving}
                                />
                                <button type="submit" disabled={isSaving} className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm disabled:opacity-50">
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                </button>
                            </>
                        )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">so'm</p>
                </form>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-4 flex-wrap">
                <CustomSelect
                    name="statusFilter"
                    value={statusFilter}
                    onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
                    className="w-44"
                    options={[
                        { value: '', label: 'Barcha holat' },
                        { value: 'COMPLETED', label: "To'langan" },
                        { value: 'PENDING', label: 'Kutilmoqda' },
                        { value: 'CANCELLED', label: 'Bekor' },
                    ]}
                />
                <CustomSelect
                    name="typeFilter"
                    value={typeFilter}
                    onChange={e => { setTypeFilter(e.target.value); setPage(1); }}
                    className="w-40"
                    options={[
                        { value: '', label: 'Barcha tur' },
                        { value: 'listing', label: "E'lon" },
                        { value: 'product', label: 'Mahsulot' },
                    ]}
                />
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="px-4 py-3 text-left font-medium text-slate-600">Foydalanuvchi</th>
                                <th className="px-4 py-3 text-left font-medium text-slate-600">Tur</th>
                                <th className="px-4 py-3 text-left font-medium text-slate-600">Sarlavha</th>
                                <th className="px-4 py-3 text-left font-medium text-slate-600">Summa</th>
                                <th className="px-4 py-3 text-left font-medium text-slate-600">Holat</th>
                                <th className="px-4 py-3 text-left font-medium text-slate-600">Sana</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoadingPayments ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                                        <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                                    </td>
                                </tr>
                            ) : payments.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                                        To'lovlar topilmadi
                                    </td>
                                </tr>
                            ) : (
                                payments.map(p => (
                                    <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-slate-900">{p.user?.displayName || '—'}</p>
                                            <p className="text-xs text-slate-400">{p.user?.phone || ''}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                                                {p.type === 'listing'
                                                    ? <><List className="w-3 h-3" /> E'lon</>
                                                    : <><Package className="w-3 h-3" /> Mahsulot</>
                                                }
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 max-w-[200px] truncate text-slate-700">
                                            {p.subject?.title || '—'}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-slate-900">
                                            {p.amount.toLocaleString('uz-UZ')} so'm
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_LABELS[p.status]?.color || 'bg-slate-100 text-slate-600'}`}>
                                                {p.status === 'COMPLETED' && <CheckCircle className="w-3 h-3" />}
                                                {p.status === 'PENDING' && <Clock className="w-3 h-3" />}
                                                {(p.status === 'CANCELLED' || p.status === 'FAILED') && <XCircle className="w-3 h-3" />}
                                                {STATUS_LABELS[p.status]?.label || p.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-slate-500 text-xs">
                                            {new Date(p.createdAt).toLocaleDateString('uz-UZ')}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200">
                        <p className="text-sm text-slate-500">Jami: {total}</p>
                        <div className="flex gap-2">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm disabled:opacity-40 hover:bg-slate-50">
                                Oldingi
                            </button>
                            <span className="px-3 py-1.5 text-sm text-slate-600">{page} / {totalPages}</span>
                            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm disabled:opacity-40 hover:bg-slate-50">
                                Keyingi
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
