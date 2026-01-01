import React from "react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

interface PlantCardProps {
    plantName: string;
    description: string;
    confidence?: number;
    imageUrl?: string;
}

export const PlantCard: React.FC<PlantCardProps> = ({
    plantName,
    description,
    confidence = 98,
    imageUrl,
}) => {
    return (
        <Card className="flex flex-col gap-4">
            {imageUrl && (
                <div className="w-full h-48 rounded-xl overflow-hidden bg-stone-200">
                    <img
                        src={imageUrl}
                        alt={plantName}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--color-primary-dark)]">
                        {plantName}
                    </h2>
                    <p className="text-[var(--color-text-muted)] mt-1 text-sm leading-relaxed">
                        {description}
                    </p>
                </div>
                <Badge variant="success">{confidence}% Match</Badge>
            </div>
        </Card>
    );
};
