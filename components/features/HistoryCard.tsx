"use client";

import React from "react";
import { StoredScan } from "@/lib/db"; // Assuming types are exported from here or types file
import { Calendar, CheckCircle2, AlertTriangle, ArrowRight, Trash2, WifiOff } from "lucide-react";
import Image from "next/image";

interface HistoryCardProps {
    scan: StoredScan;
    onClick: () => void;
    onDelete?: () => void;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ scan, onClick, onDelete }) => {
    const isPending = scan.status === "pending";
    const result = scan.result; // Use the result object if it exists
    const isOffline = scan.isOffline || result?.isOffline;

    // Fallbacks for Pending state
    const commonName = result?.plant?.commonName || (isPending ? "Analysis Pending" : "Unknown Plant");
    const healthStatus = result?.healthAnalysis?.status;
    const isHealthy = healthStatus === "Healthy";

    // Check if we have legacy data structure (scan has plant directly)
    // @ts-ignore
    const legacyPlant = scan.plant;
    const displayName = legacyPlant ? legacyPlant.commonName : commonName;
    const displayHealth = legacyPlant ? scan.healthAnalysis.status : healthStatus;
    const displayIsHealthy = displayHealth === "Healthy";

    const date = new Date(scan.timestamp).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl p-3 shadow-sm border border-stone-100 flex items-center gap-4 active:scale-[0.98] transition-all relative group"
        >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 relative">
                {scan.originalImage ? (
                    <img
                        src={scan.originalImage}
                        alt={displayName}
                        className={`w-full h-full object-cover ${isPending ? 'opacity-70 grayscale' : ''}`}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                        <span className="text-xs">No Img</span>
                    </div>
                )}

                {/* Status Dot */}
                {!isPending && (
                    <div className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white ${displayIsHealthy ? "bg-emerald-500" : "bg-red-500"
                        }`} />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <h3 className={`font-bold truncate ${isPending ? 'text-stone-500 italic' : 'text-stone-900'}`}>
                    {displayName}
                </h3>
                <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    {date}
                </p>
                <div className="flex items-center gap-1 mt-1.5">
                    {isPending ? (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 flex items-center gap-1">
                            Pending
                        </span>
                    ) : (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${displayIsHealthy ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                            }`}>
                            {displayHealth}
                        </span>
                    )}

                    {isOffline && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 flex items-center gap-1">
                            <WifiOff className="w-3 h-3" /> Offline
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-end gap-2">
                {/* Analyze Action for Pending */}
                {isPending && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onClick(); }} // OnClick triggers default action which will be "Analyze" handling in parent
                        className="bg-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all flex items-center gap-1"
                    >
                        Analyze
                        <ArrowRight className="w-3 h-3" />
                    </button>
                )}

                {/* Delete Button */}
                {onDelete && !isPending && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(); }}
                        className="p-2 rounded-full text-stone-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                        aria-label="Delete scan"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}

                {!isPending && <ArrowRight className="w-4 h-4 text-stone-300" />}
            </div>
        </div>
    );
};
