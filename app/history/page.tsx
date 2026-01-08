"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllScans, StoredScan, clearHistory } from "@/lib/db";
import { saveResult, saveImage } from "@/lib/storage";
import { HistoryCard } from "@/components/features/HistoryCard";
import { Trash2, Sprout, Loader2 } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function HistoryPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const [scans, setScans] = useState<StoredScan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const results = await getAllScans();
            setScans(results);
        } catch (error) {
            console.error("Failed to load history", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenScan = (scan: StoredScan) => {
        // Determine image source (originalImage might be absent in older mocks)
        const img = scan.originalImage || "";

        // Save to session storage so Result page picks it up
        saveResult(scan);
        // saveImage expects a File object usually, but for viewing history we might need to adjust logic.
        // However, existing Result page uses `getImage()` which gets from session 'plantifier-image'.
        // We should manually set that session item.
        if (typeof window !== "undefined") {
            sessionStorage.setItem("plantifier-image", img);
        }

        router.push("/result");
    };

    const handleClearHistory = async () => {
        if (confirm(t.history.clearConfirm)) {
            await clearHistory();
            loadHistory();
        }
    };

    const handleDeleteScan = async (scanId: string) => {
        if (confirm(t.history.deleteConfirm)) {
            // Assume deleteScan implementation exists or use clear logic filter
            // We need to implement deleteScan in db.ts if not exported, but task said it's there. 
            // Checking db.ts... yes it has deleteScan.
            const { deleteScan } = await import("@/lib/db");
            await deleteScan(scanId);
            loadHistory();
        }
    }

    return (
        <main className="min-h-screen bg-neutral-50 pb-32">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                <h1 className="text-lg font-bold text-stone-900">{t.history.title}</h1>
                {scans.length > 0 && (
                    <button
                        onClick={handleClearHistory}
                        className="px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors"
                    >
                        {t.history.clear}
                    </button>
                )}
            </div>

            <div className="p-4 space-y-3">
                {loading ? (
                    <div className="flex justify-center pt-20">
                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                    </div>
                ) : scans.length === 0 ? (
                    <div className="flex flex-col items-center justify-center pt-20 text-center opacity-60">
                        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                            <Sprout className="w-8 h-8 text-stone-400" />
                        </div>
                        <h3 className="font-semibold text-stone-800">{t.history.empty}</h3>
                        <p className="text-sm text-stone-500 max-w-[200px]">
                            {t.history.emptyDesc}
                        </p>
                    </div>
                ) : (
                    scans.map((scan) => (
                        <HistoryCard
                            key={scan.scanId}
                            scan={scan}
                            onClick={() => handleOpenScan(scan)}
                            onDelete={() => handleDeleteScan(scan.scanId)}
                        />
                    ))
                )}
            </div>

        </main>
    );
}
