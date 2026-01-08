import React from "react";
import { Globe2, Sun, Droplets } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface StatsGridProps {
    zone: string;
    steps?: string; // Not used but inferred
    sunlight: string;
    water: string;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ zone, sunlight, water }) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {/* Zone */}
            <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm border border-stone-100 aspect-square">
                <Globe2 className="w-6 h-6 text-[var(--color-success)] mb-2" />
                <p className="text-xs text-[var(--color-text-muted)]">{useLanguage().t.result.zone}</p>
                <p className="font-bold text-[var(--color-text-main)] text-sm">{zone}</p>
            </div>

            {/* Sunlight */}
            <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm border border-stone-100 aspect-square">
                <Sun className="w-6 h-6 text-[var(--color-warning)] mb-2" />
                <p className="text-xs text-[var(--color-text-muted)]">{useLanguage().t.result.sunlight}</p>
                <p className="font-bold text-[var(--color-text-main)] text-sm">{sunlight}</p>
            </div>

            {/* Water */}
            <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm border border-stone-100 aspect-square">
                <Droplets className="w-6 h-6 text-blue-500 mb-2" />
                <p className="text-xs text-[var(--color-text-muted)]">{useLanguage().t.result.water}</p>
                <p className="font-bold text-[var(--color-text-main)] text-sm">{water}</p>
            </div>
        </div>
    );
};
