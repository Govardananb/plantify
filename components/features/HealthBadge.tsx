import React from "react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

interface HealthBadgeProps {
    status: "Healthy" | "Moderate" | "Critical";
    issues?: string[];
}

export const HealthBadge: React.FC<HealthBadgeProps> = ({ status, issues = [] }) => {
    const statusConfig = {
        Healthy: { color: "success", icon: "🌿", label: "Excellent Health" },
        Moderate: { color: "warning", icon: "⚠️", label: "Needs Attention" },
        Critical: { color: "danger", icon: "🚑", label: "Critical Condition" },
    } as const;

    const config = statusConfig[status];

    return (
        <Card className="border-l-4 border-l-[var(--color-warning)] overflow-hidden">
            {/* Dynamic border color override */}
            <div
                style={{ borderLeftColor: `var(--color-${config.color})` }}
                className="absolute left-0 top-0 bottom-0 w-1"
            />

            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{config.icon}</span>
                    <div>
                        <p className="text-xs text-[var(--color-text-muted)] font-bold uppercase tracking-wider">Health Status</p>
                        <h3 className="font-bold text-lg text-[var(--color-text-main)]">{config.label}</h3>
                    </div>
                </div>

                {/* Visual Progress Bar (Mocked) */}
                <div className="flex gap-1">
                    <div className={`w-2 h-6 rounded-full ${status === 'Critical' ? 'bg-[var(--color-danger)]' : 'bg-gray-200'}`}></div>
                    <div className={`w-2 h-6 rounded-full ${status === 'Moderate' || status === 'Critical' ? (status === 'Moderate' ? 'bg-[var(--color-warning)]' : 'bg-[var(--color-danger)]/50') : 'bg-gray-200'}`}></div>
                    <div className={`w-2 h-6 rounded-full ${status === 'Healthy' ? 'bg-[var(--color-success)]' : (status === 'Moderate' ? 'bg-[var(--color-warning)]/50' : 'bg-gray-200')}`}></div>
                </div>
            </div>

            {issues.length > 0 && (
                <div className="mt-3 pt-3 border-t border-dashed border-stone-200">
                    <p className="text-sm font-semibold mb-2 text-[var(--color-text-muted)]">Detected Issues:</p>
                    <ul className="list-disc list-inside space-y-1">
                        {issues.map((issue, i) => (
                            <li key={i} className="text-sm text-[var(--color-text-main)]">{issue}</li>
                        ))}
                    </ul>
                </div>
            )}
        </Card>
    );
};
