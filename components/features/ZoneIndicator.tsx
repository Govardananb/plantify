import React from "react";
import { Badge } from "../ui/Badge";

interface ZoneIndicatorProps {
    zones: string[];
}

export const ZoneIndicator: React.FC<ZoneIndicatorProps> = ({ zones }) => {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Thrives In
            </h3>
            <div className="flex flex-wrap gap-2">
                {zones.map((zone) => (
                    <Badge key={zone} variant="neutral" className="bg-[#EBE5D5] text-[#5C5749] border-none px-3 py-1 text-sm">
                        {zone}
                    </Badge>
                ))}
            </div>
        </div>
    );
};
