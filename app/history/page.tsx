"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllScans, StoredScan, clearHistory } from "@/lib/db";
import { saveResult, saveImage } from "@/lib/storage";
import { HistoryCard } from "@/components/features/HistoryCard";
import { Trash2, Sprout, Loader2 } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

import { useOnline } from "@/hooks/useOnline";

export default function HistoryPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const isOnline = useOnline();
    const [scans, setScans] = useState<StoredScan[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setFilter] = useState("All");

    // ... (filters)
    const filteredScans = scans.filter(scan => {
        if (activeFilter === "All") return true;

        if (activeFilter === "Pending") return scan.status === "pending";

        if (activeFilter === "Offline") return scan.isOffline || scan.result?.isOffline;

        if (scan.result?.healthAnalysis?.status === activeFilter) return true;

        // Legacy support check
        // @ts-ignore
        if (scan.healthAnalysis?.status === activeFilter) return true;

        return false;
    });

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

    const handleOpenScan = async (scan: StoredScan) => {
        if (scan.status === "pending") {
            const performAnalysis = confirm(t.history?.analyzeConfirm || "Analyze this pending scan now?");
            if (performAnalysis) {
                setLoading(true);
                try {
                    const { processPendingScan } = await import("@/lib/pending-manager");
                    // Use the hook value
                    const res = await processPendingScan(scan.scanId, isOnline, "en");

                    if (res.success) {
                        // After successful processing, we need to load the result into session
                        // and navigate.
                        if (res.result) {
                            saveResult(res.result);
                            if (typeof window !== "undefined") {
                                // originalImage must be present if processing succeeded
                                sessionStorage.setItem("plantifier-image", scan.originalImage);
                            }
                        }
                        router.push("/result");
                    } else {
                        alert("Analysis failed: " + res.error);
                    }
                } catch (e) {
                    console.error(e);
                    alert("Error starting analysis.");
                } finally {
                    setLoading(false);
                    // No need to loadHistory if pushing to result, but if staying or erroring:
                    loadHistory();
                }
            }
            return;
        }

        // Determine image source 
        const img = scan.originalImage || "";

        // Save to session storage so Result page picks it up
        if (scan.result) {
            saveResult(scan.result);
        } else {
            // Legacy fallback - if scan *is* the result
            // @ts-ignore
            saveResult(scan);
        }

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

            <div className="p-4 space-y-4">
                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {["All", "Pending", "Healthy", "Critical", "Offline"].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setFilter(filter)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === filter
                                ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
                                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center pt-20">
                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                    </div>
                ) : filteredScans.length === 0 ? (
                    <div className="flex flex-col items-center justify-center pt-20 text-center opacity-60">
                        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                            <Sprout className="w-8 h-8 text-stone-400" />
                        </div>
                        <h3 className="font-semibold text-stone-800">{t.history.empty}</h3>
                        <p className="text-sm text-stone-500 max-w-[200px]">
                            {activeFilter === "All" ? t.history.emptyDesc : "No scans match this filter"}
                        </p>
                    </div>
                ) : (
                    filteredScans.map((scan) => (
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
