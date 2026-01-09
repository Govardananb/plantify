'use client';

import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllScans, StoredScan } from "@/lib/db";
import { saveResult } from "@/lib/storage";
import { HistoryCard } from "@/components/features/HistoryCard";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function RecentScans() {
    const router = useRouter();
    const { t } = useLanguage();
    const [recentScans, setRecentScans] = useState<StoredScan[]>([]);

    useEffect(() => {
        getAllScans().then((scans) => {
            setRecentScans(scans.slice(0, 5));
        });
    }, []);

    const handleOpenScan = (scan: StoredScan) => {
        if (scan.status === "pending") {
            router.push("/history");
            return;
        }

        if (scan.result) {
            saveResult(scan.result);
        } else {
            // @ts-ignore
            saveResult(scan);
        }

        if (typeof window !== "undefined") {
            sessionStorage.setItem("plantifier-image", scan.originalImage || "");
        }
        router.push("/result");
    };

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-lg font-semibold text-emerald-950">{t.recentScans}</h2>
                {recentScans.length > 0 && (
                    <Link href="/history" className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
                        {t.result.viewAll}
                    </Link>
                )}
            </div>

            {recentScans.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                        <Clock className="w-6 h-6 text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-500">{t.history.empty}</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {recentScans.map((scan) => (
                        <HistoryCard
                            key={scan.scanId}
                            scan={scan}
                            onClick={() => handleOpenScan(scan)}
                            onDelete={() => { }} // No delete on home page
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
