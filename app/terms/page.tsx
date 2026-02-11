import Link from 'next/link';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-800/50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
                        Foydalanish shartlari
                    </h1>

                    <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
                        <section>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">1. Umumiy qoidalar</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Otbozor.uz platformasidan foydalanish orqali siz ushbu foydalanish shartlariga rozilik bildirasiz.
                                Platforma O'zbekiston Respublikasi qonunchiligiga muvofiq faoliyat yuritadi.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">2. Ro'yxatdan o'tish</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Platformadan to'liq foydalanish uchun Telegram orqali ro'yxatdan o'tish talab qilinadi.
                                Foydalanuvchi o'z ma'lumotlarining to'g'riligini ta'minlashi shart.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">3. E'lon berish qoidalari</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Foydalanuvchilar faqat haqiqiy va to'g'ri ma'lumotlar bilan e'lon joylashlari kerak.
                                Yolg'on yoki chalg'ituvchi ma'lumotlar tarqatish taqiqlanadi.
                                Noqonuniy faoliyatga oid e'lonlar darhol o'chiriladi.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">4. Javobgarlik</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Otbozor.uz platformasi foydalanuvchilar o'rtasidagi bitimlar uchun javobgar emas.
                                Platforma faqat e'lonlarni joylashtirish xizmatini taqdim etadi.
                                Sotuvchi va xaridor o'rtasidagi kelishuvlar ularning o'z javobgarligida.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">5. Taqiqlar</h2>
                            <ul className="text-slate-600 dark:text-slate-400 list-disc pl-5 space-y-1">
                                <li>Soxta e'lonlar joylashtirish</li>
                                <li>Boshqa foydalanuvchilarni aldash</li>
                                <li>Platformaning texnik tizimlariga zarar yetkazish</li>
                                <li>Noqonuniy tovarlar yoki xizmatlarni taklif qilish</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">6. Aloqa</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Savollar bo'yicha <Link href="/aloqa" className="text-amber-600 dark:text-amber-400 hover:underline">aloqa sahifasi</Link> orqali murojaat qilishingiz mumkin.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
