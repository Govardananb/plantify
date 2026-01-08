"use client";

import Link from "next/link";
import { Camera, Wifi, Leaf, ImageUp, Settings } from "lucide-react";
import LanguageSelector from "@/components/ui/LanguageSelector";
import RecentScans from "@/components/features/RecentScans";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useOnline } from "@/hooks/useOnline";
import { OfflineGuides } from "@/components/features/OfflineGuides";

export default function Home() {
  const { t } = useLanguage();
  const isOnline = useOnline();

  return (
    <main className="min-h-screen bg-stone-50 pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-stone-900/80 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-lg ring-1 ring-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">{t.heroTitle}</span>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/settings" className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white active:scale-95 transition-all hover:bg-white/20">
            <Settings className="w-5 h-5" />
          </Link>
          <LanguageSelector />
        </div>
      </header>

      {/* Hero Section */}
      <div className="px-6 pt-8 pb-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 text-white shadow-xl ring-1 ring-black/5">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-100 text-xs font-medium mb-3 backdrop-blur-sm border border-emerald-400/30">
              {t.systemActive}
            </span>
            <h1 className="text-3xl font-bold leading-tight mb-2">
              {t.heroSubtitle}
            </h1>
            <p className="text-emerald-100 text-sm opacity-90 mb-6 max-w-[200px]">
              {t.disclaimer.split('.')[0]}.
            </p>

            <div className="flex gap-3">
              <Link href="/detect" className="flex-1 bg-white text-emerald-800 py-3.5 px-4 rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2">
                <Camera className="w-4 h-4" />
                {t.scanPlant}
              </Link>
              <button className="bg-emerald-700/50 text-white p-3.5 rounded-xl backdrop-blur-md active:bg-emerald-700/70 transition-colors">
                <ImageUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Scans Widget */}
        {/* Toggle between Recent Scans (Online) and Offline Guides */}
        {!isOnline ? (
          <OfflineGuides />
        ) : (
          <RecentScans />
        )}
      </div>
    </main>
  );
}
