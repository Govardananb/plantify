"use client";

import React from "react";
import { StoredScan } from "@/lib/db"; // Assuming types are exported from here or types file
import { Calendar, CheckCircle2, AlertTriangle, ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";

interface HistoryCardProps {
    scan: StoredScan;
    onClick: () => void;
    onDelete?: () => void;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ scan, onClick, onDelete }) => {
    const isHealthy = scan.healthAnalysis.status === "Healthy";
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
                    // Using simple img tag for base64/blob to avoid Next.js Image config issues with dynamic data for now
                    <img
                        src={scan.originalImage}
                        alt={scan.plant.commonName}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                        <span className="text-xs">No Img</span>
                    </div>
                )}

                {/* Status Dot */}
                <div className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white ${isHealthy ? "bg-emerald-500" : "bg-red-500"
                    }`} />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-stone-900 truncate">
                    {scan.plant.commonName || "Unknown Plant"}
                </h3>
                <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    {date}
                </p>
                <div className="flex items-center gap-1 mt-1.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isHealthy ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                        }`}>
                        {scan.healthAnalysis.status}
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-end gap-2">
                {/* Delete Button */}
                {onDelete && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(); }}
                        className="p-2 rounded-full text-stone-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                        aria-label="Delete scan"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
                <ArrowRight className="w-4 h-4 text-stone-300" />
            </div>
        </div>
    );
};
