"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2, Globe, Info, ChevronRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { clearHistory } from "@/lib/db";

export default function SettingsPage() {
    const router = useRouter();
    const { t, language, setLanguage } = useLanguage();

    const handleClearHistory = async () => {
        if (confirm(t.history.clearConfirm)) {
            await clearHistory();
            alert("History cleared!");
        }
    };

    const toggleLanguage = () => {
        if (language === 'en') setLanguage('ta');
        else if (language === 'ta') setLanguage('hi');
        else setLanguage('en');
    };

    const getLangLabel = () => {
        if (language === 'ta') return 'Tamil (தமிழ்)';
        if (language === 'hi') return 'Hindi (हिंदी)';
        return 'English';
    };

    return (
        <main className="min-h-screen bg-neutral-50 pb-32">
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-black/5">
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <h1 className="text-lg font-bold text-stone-900">{t.bottomNav.settings}</h1>
            </div>

            <div className="p-4 space-y-4">
                {/* Preferences */}
                <section>
                    <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 ml-1">Preferences</h2>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                        <button
                            onClick={toggleLanguage}
                            className="w-full flex items-center justify-between p-4 hover:bg-stone-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                    <Globe className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-stone-700">{t.selectLanguage}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-stone-500">
                                <span>{getLangLabel()}</span>
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </button>
                    </div>
                </section>

                {/* Data */}
                <section>
                    <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 ml-1">Data</h2>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                        <button
                            onClick={handleClearHistory}
                            className="w-full flex items-center justify-between p-4 hover:bg-stone-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                                    <Trash2 className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-red-600">{t.history.clear}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-stone-300" />
                        </button>
                    </div>
                </section>

                {/* About */}
                <section>
                    <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 ml-1">About</h2>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                        <div className="p-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                                <ShieldCheck className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="font-medium text-stone-700">Plantifier App</h3>
                                <p className="text-xs text-stone-500">Version 1.0.0</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
