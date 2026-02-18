export default function RootLoading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-slate-900">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-14 h-14">
                    <div className="absolute inset-0 rounded-full border-4 border-amber-100 dark:border-amber-900/30" />
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 animate-spin" />
                </div>
                <span className="text-sm text-slate-400 dark:text-slate-500 font-medium tracking-wide">
                    Yuklanmoqda...
                </span>
            </div>
        </div>
    );
}
