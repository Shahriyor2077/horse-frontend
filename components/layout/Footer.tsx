import Link from 'next/link';
import Image from 'next/image';
import { Send } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto pb-20 md:pb-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-3">
                            <Image src="/logo.png" alt="Otbozor" width={32} height={32} className="object-contain" />
                            <span className="text-lg font-bold text-slate-900 dark:text-white">
                                Ot<span className="text-primary-600 dark:text-primary-400">bozor</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            O'zbekistondagi ot savdo platformasi
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-semibold mb-3 text-sm">Havolalar</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/bozor" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                    Bozor
                                </Link>
                            </li>
                            <li>
                                <Link href="/kopkari" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                    Ko'pkari
                                </Link>
                            </li>
                            <li>
                                <Link href="/mahsulotlar" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                    Mahsulotlar
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/aloqa" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                    Aloqa
                                </Link>
                            </li>
                            <li>
                                <Link href="/elon/yaratish" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                    E'lon joylash
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-semibold mb-3 text-sm">Aloqa</h3>
                        <div className="flex flex-col gap-2">
                            <a
                                href={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'otbozor_bot'}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                <Send className="w-4 h-4 text-sky-500" />
                                <span>Telegram Bot</span>
                            </a>
                            <a
                                href="https://t.me/otbozor_rasmiy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                <Send className="w-4 h-4 text-sky-500" />
                                <span>Telegram Kanal</span>
                            </a>
                            <a
                                href="https://www.instagram.com/otbozor.uz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                <svg className="w-4 h-4 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                                <span>Instagram</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                    <p>© {new Date().getFullYear()} Otbozor. Barcha huquqlar himoyalangan.</p>
                    <div className="flex gap-4">
                        <Link href="/terms" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                            Shartlar
                        </Link>
                        <Link href="/privacy" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                            Maxfiylik
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
