import React from "react";
import { Droplet, Sprout } from "lucide-react";

interface CareRecommendationProps {
    title: string;
    description: string;
    type?: "water" | "nutrient" | "general";
}

export const CareRecommendation: React.FC<CareRecommendationProps> = ({ title, description, type = "general" }) => {

    const getIcon = () => {
        if (type === "water") return <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500"><Droplet size={20} fill="currentColor" /></div>;
        if (type === "nutrient") return <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600"><Sprout size={20} /></div>;
        return <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500"><Sprout size={20} /></div>;
    };

    return (
        <div className="bg-white rounded-2xl p-4 flex gap-4 items-start shadow-sm border border-stone-100">
            {getIcon()}
            <div>
                <h3 className="font-bold text-[var(--color-text-main)] text-sm mb-1">{title}</h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};
