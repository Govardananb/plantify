import React from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface HealthStatusProps {
    status: "Healthy" | "Critical" | "Moderate";
    description: string;
}

export const HealthStatusCard: React.FC<HealthStatusProps> = ({ status, description }) => {
    const isHealthy = status === "Healthy";

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-[var(--color-text-main)]">{useLanguage().t.result.healthStatus}</h3>
                <div className={`px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold ${isHealthy ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                    {isHealthy ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                    {status}
                </div>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {description}
            </p>
        </div>
    );
};
