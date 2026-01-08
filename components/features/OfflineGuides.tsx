
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { OFFLINE_CROPS, OfflineCrop } from "@/lib/offline-data";
import { saveResult, saveImagePath } from "@/lib/storage";
import { Sprout, ChevronRight } from "lucide-react";

export const OfflineGuides = () => {
    const router = useRouter();

    const handleOpenGuide = (crop: OfflineCrop) => {
        // Save mock data to session storage
        saveResult(crop);
        saveImagePath(crop.imageUrl);
        router.push("/result");
    };

    return (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center gap-2 mb-4 px-1">
                <div className="p-1.5 bg-amber-100 rounded-lg text-amber-600">
                    <Sprout className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-stone-800">
                    Offline Crop Guides
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {OFFLINE_CROPS.map((crop) => (
                    <button
                        key={crop.scanId}
                        onClick={() => handleOpenGuide(crop)}
                        className="group relative flex flex-col items-start bg-white rounded-2xl shadow-sm border border-stone-200 active:scale-95 transition-all text-left overflow-hidden hover:border-emerald-300 hover:shadow-md h-56"
                    >
                        {/* Image Background */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src={crop.imageUrl}
                                alt={crop.plant.commonName}
                                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        </div>

                        <div className="relative z-10 w-full mt-auto p-4">
                            <h3 className="font-bold text-white text-lg group-hover:text-emerald-300 transition-colors">
                                {crop.plant.commonName}
                            </h3>
                            <p className="text-xs text-white/80 line-clamp-2 mt-1 font-medium">
                                {crop.plant.shortDescription}
                            </p>

                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-300 group-hover:text-emerald-200 gap-1">
                                View Guide <ChevronRight className="w-3 h-3" />
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
