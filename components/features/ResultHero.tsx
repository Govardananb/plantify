import React from "react";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface ResultHeroProps {
    imageUrl: string;
    plantName: string;
    scientificName: string;
    matchLimit?: number;
}

export const ResultHero: React.FC<ResultHeroProps> = ({
    imageUrl,
    plantName,
    scientificName,
    matchLimit = 98,
}) => {
    return (
        <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl shadow-stone-200/50">
            <img
                src={imageUrl}
                alt={plantName}
                className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="mb-2">
                    <Badge variant="success" icon={<CheckCircle2 className="w-3 h-3" />} className="rounded-full px-3 py-1 bg-green-500 text-white border-none">
                        {matchLimit}% {useLanguage().t.result.match}
                    </Badge>
                </div>
                <h1 className="text-3xl font-bold mb-1">{plantName}</h1>
                <p className="text-white/80 italic font-serif opacity-90">{scientificName}</p>
            </div>
        </div>
    );
};
