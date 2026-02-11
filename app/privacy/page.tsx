import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-800/50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
                        Maxfiylik siyosati
                    </h1>

                    <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
                        <section>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">1. Umumiy ma'lumot</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Otbozor.uz platformasi foydalanuvchilarning shaxsiy ma'lumotlarini himoya qilishga alohida e'tibor qaratadi.
                                Ushbu maxfiylik siyosati qanday ma'lumotlar yig'ilishi va qanday ishlatilishini tushuntiradi.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">2. Yig'iladigan ma'lumotlar</h2>
                            <ul className="text-slate-600 dark:text-slate-400 list-disc pl-5 space-y-1">
                                <li>Telegram foydalanuvchi nomi va ID raqami</li>
                                <li>Telefon raqami (ixtiyoriy)</li>
                                <li>E'lon ma'lumotlari (matn, rasmlar)</li>
                                <li>Qurilma va brauzer ma'lumotlari</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">3. Ma'lumotlardan foydalanish</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Yig'ilgan ma'lumotlar faqat quyidagi maqsadlarda ishlatiladi:
                            </p>
                            <ul className="text-slate-600 dark:text-slate-400 list-disc pl-5 space-y-1 mt-2">
                                <li>Foydalanuvchi autentifikatsiyasi</li>
                                <li>E'lonlarni boshqarish va ko'rsatish</li>
                                <li>Platformani yaxshilash va xatolarni tuzatish</li>
                                <li>Foydalanuvchi bilan aloqa</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">4. Ma'lumotlarni himoya qilish</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Barcha shaxsiy ma'lumotlar shifrlangan holda saqlanadi.
                                Uchinchi tomonlarga foydalanuvchi ma'lumotlari taqdim etilmaydi, qonun talab qilgan hollar bundan mustasno.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">5. Cookie fayllar</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Platforma autentifikatsiya va sessiyalarni boshqarish uchun cookie fayllardan foydalanadi.
                                Bu fayllar foydalanuvchi tajribasini yaxshilash uchun zarur.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">6. Foydalanuvchi huquqlari</h2>
                            <ul className="text-slate-600 dark:text-slate-400 list-disc pl-5 space-y-1">
                                <li>O'z ma'lumotlaringizni ko'rish va tahrirlash huquqi</li>
                                <li>Akkauntni o'chirish va barcha ma'lumotlarni yo'q qilish huquqi</li>
                                <li>Ma'lumotlarni qayta ishlashga rozilikni bekor qilish huquqi</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">7. Aloqa</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Maxfiylik siyosati bo'yicha savollar uchun <Link href="/aloqa" className="text-amber-600 dark:text-amber-400 hover:underline">aloqa sahifasi</Link> orqali murojaat qilishingiz mumkin.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
