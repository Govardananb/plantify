import React from "react";
import { Play } from "lucide-react";

interface VideoCardProps {
    title: string;
    author: string;
    views: string;
    duration: string;
    thumbnail: string;
    url?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({ title, author, views, duration, thumbnail, url }) => {
    return (
        <a
            href={url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-2 group cursor-pointer"
        >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-100 shadow-sm group-hover:shadow-md transition-all">
                <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100">
                        <Play className="w-4 h-4 text-[var(--color-primary)] ml-0.5" fill="currentColor" />
                    </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {duration}
                </div>
            </div>
            <div>
                <h4 className="font-bold text-[var(--color-text-main)] text-sm leading-tight line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">{title}</h4>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">{author} • {views}</p>
            </div>
        </a>
    );
};
