import React from "react";
import { Card } from "../ui/Card";

interface VideoCardProps {
    title: string;
    duration: string;
    url: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({ title, duration, url }) => {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="block group">
            <Card className="p-0 overflow-hidden hover:shadow-md transition-all group-hover:-translate-y-1">
                <div className="h-32 bg-stone-300 relative flex items-center justify-center">
                    <span className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-[var(--color-primary)] shadow-sm">
                        ▶
                    </span>
                    <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                        {duration}
                    </span>
                </div>
                <div className="p-3">
                    <h4 className="font-semibold text-sm line-clamp-2 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                        {title}
                    </h4>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">Watch on YouTube</p>
                </div>
            </Card>
        </a>
    );
};
