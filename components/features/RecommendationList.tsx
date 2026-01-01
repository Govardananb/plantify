import React from "react";
import { Card } from "../ui/Card";

interface RecommendationProps {
    type: "cure" | "prevention" | "improvement";
    items: string[];
}

export const RecommendationList: React.FC<RecommendationProps> = ({ type, items }) => {
    const titles = {
        cure: "Immediate Action",
        prevention: "Prevention",
        improvement: "Growth Tips",
    };

    const icons = {
        cure: "🩹",
        prevention: "🛡️",
        improvement: "🌱",
    };

    return (
        <Card className="bg-white/60">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-[var(--color-primary-dark)]">
                <span>{icons[type]}</span> {titles[type]}
            </h3>
            <ul className="space-y-2">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[var(--color-text-main)]">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
        </Card>
    );
};
