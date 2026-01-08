'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Scan, History, Settings, Camera } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function BottomNav() {
    const pathname = usePathname();
    const { t } = useLanguage();

    const isActive = (path: string) => pathname === path;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe z-50">
            <div className="relative flex items-center h-16 px-6">

                {/* Left Side */}
                <div className="flex-1 flex justify-center">
                    <Link
                        href="/"
                        className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${isActive('/') ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <Home className="w-6 h-6" />
                        <span className="text-[10px] font-medium mt-1">{t.bottomNav.home}</span>
                    </Link>
                </div>

                {/* Center - Absolute Positioned Scan Button */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-6">
                    <Link
                        href="/detect"
                        className="flex flex-col items-center justify-center"
                    >
                        <div className={`p-4 rounded-full shadow-lg transition-transform active:scale-95 ${isActive('/detect')
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                            : 'bg-emerald-500 text-white hover:bg-emerald-600'
                            }`}>
                            <Camera className="w-7 h-7" />
                        </div>
                        <span className="text-[10px] font-medium mt-2 text-emerald-600">{t.bottomNav.scan}</span>
                    </Link>
                </div>

                {/* Right Side */}
                <div className="flex-1 flex justify-center">
                    <Link
                        href="/history"
                        className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${isActive('/history') ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <History className="w-6 h-6" />
                        <span className="text-[10px] font-medium mt-1">{t.bottomNav.history}</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}
