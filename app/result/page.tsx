"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, FileDown, AlertTriangle, CheckCircle2, ChevronRight, Droplet, Sprout, Sun, Scissors, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlantAnalysisResult } from "@/types/plant-analysis";
import { getStoredResult, getImage } from "@/lib/storage";
import { saveScan } from "@/lib/db";
import { generatePlantPDF } from "@/lib/pdf";
import { useLanguage } from "@/components/providers/LanguageProvider";

// Components
import { ResultHero } from "@/components/features/ResultHero";
import { VideoCard } from "@/components/features/VideoCard";

export default function ResultPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [data, setData] = useState<PlantAnalysisResult | null>(null);

    useEffect(() => {
        const stored = getStoredResult() as PlantAnalysisResult;
        if (stored) {
            setData(stored);
            saveScan({ ...stored, originalImage: getImage() || "" }).catch(console.error);
        } else {
            // Redirect if no data (e.g., refresh without persistence)
            // For dev/testing, we might want to stay or redirect. 
            // router.push("/"); 
        }
    }, [router]);

    if (!data) return <div className="min-h-screen bg-neutral-50 flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full" /></div>;

    const isHealthy = data.healthAnalysis.status === "Healthy";
    const statusColor = data.healthAnalysis.status === "Critical" ? "red" : data.healthAnalysis.status === "Moderate" ? "orange" : "emerald";
    const StatusIcon = isHealthy ? CheckCircle2 : AlertTriangle;

    const handleSharePDF = () => {
        generatePlantPDF(data);
    };

    return (
        <main className="min-h-screen bg-neutral-50 pb-32">

            {/* 1. Navbar (Sticky) */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
                <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-black/5 active:bg-black/10">
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <span className="font-semibold text-gray-900">{t.result.analysisReport}</span>
                <button onClick={handleSharePDF} className="p-2 rounded-full hover:bg-black/5 active:bg-black/10">
                    <FileDown className="w-5 h-5 text-gray-700" />
                </button>
            </div>

            <div className="p-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* 2. Hero Card */}
                <ResultHero
                    imageUrl={getImage() || "https://placehold.co/600x400?text=Plant"}
                    plantName={data.plant.commonName}
                    scientificName={data.plant.scientificName}
                    matchLimit={data.confidenceNote === 'High' ? 95 : data.confidenceNote === 'Medium' ? 75 : 45}
                />

                {/* 2.5 Overview */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
                    <h3 className="font-bold text-gray-900 mb-2">{t.result.overview}</h3>
                    <p className="text-stone-600 leading-relaxed text-sm">
                        {data.plant.shortDescription}
                    </p>
                </div>

                {/* 3. Primary Status Block */}
                <div className={`rounded-3xl p-6 ${isHealthy ? 'bg-emerald-600 text-white' : 'bg-white border border-red-100 shadow-sm'
                    }`}>
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className={`text-sm font-medium mb-1 ${isHealthy ? 'text-emerald-100' : 'text-gray-500'}`}>{t.result.diagnosis}</p>
                            <h2 className={`text-2xl font-bold ${isHealthy ? 'text-white' : 'text-gray-900'}`}>
                                {isHealthy ? t.result.healthy : data.healthAnalysis.status === 'Critical' ? t.result.critical : t.result.moderate}
                            </h2>
                        </div>
                        <div className={`p-3 rounded-full ${isHealthy ? 'bg-white/20' : 'bg-red-50 text-red-600'
                            }`}>
                            <StatusIcon className="w-8 h-8" />
                        </div>
                    </div>

                    <p className={`text-sm leading-relaxed mb-6 ${isHealthy ? 'text-emerald-50' : 'text-gray-600'}`}>
                        {data.healthAnalysis.probableIssues[0] || t.result.healthyPlantMessage}
                    </p>

                    {/* Primary Action Button */}
                    {!isHealthy && (
                        <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                            <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" /> {t.result.immediateAction}
                            </h3>
                            <ul className="space-y-2">
                                {data.recommendations.immediateActions.map((action, i) => (
                                    <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                                        <span className="mt-1.5 w-1 h-1 bg-red-400 rounded-full shrink-0" />
                                        {action}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* 4. Care Guides */}
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 px-1">{t.result.careGuide}</h3>
                    <div className="grid gap-3">
                        {data.recommendations.careGuide?.map((step, i) => {
                            // Simple heuristic for icons
                            const text = step.toLowerCase();
                            let Icon = ShieldCheck;
                            let colorClass = "bg-stone-100 text-stone-500";
                            let title = t.result.preventiveCare; // Default

                            if (text.includes("water") || text.includes("irrigation")) {
                                Icon = Droplet;
                                colorClass = "bg-blue-50 text-blue-500";
                                title = t.result.water || "Watering";
                            } else if (text.includes("sun") || text.includes("light") || text.includes("shadow")) {
                                Icon = Sun;
                                colorClass = "bg-amber-50 text-amber-500";
                                title = t.result.sunlight || "Sunlight";
                            } else if (text.includes("soil") || text.includes("fertilizer") || text.includes("nutri")) {
                                Icon = Sprout;
                                colorClass = "bg-emerald-50 text-emerald-600";
                                title = "Nutrition"; // Add key if needed, or fallback
                            } else if (text.includes("prun") || text.includes("cut") || text.includes("trim") || text.includes("deadhead")) {
                                Icon = Scissors;
                                colorClass = "bg-rose-50 text-rose-500";
                                title = "Pruning";
                            }

                            return (
                                <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm mb-1">{title}</h4>
                                        <p className="text-sm text-gray-500">{step}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 5. Video Resources */}
                {data.learningResources.youtubeSearchQueries?.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h3 className="text-lg font-bold text-gray-900">{t.result.helpfulVideos}</h3>
                        </div>
                        <div className="space-y-3">
                            {data.learningResources.youtubeSearchQueries.slice(0, 2).map((query, i) => (
                                <VideoCard key={i}
                                    title={query}
                                    author="YouTube"
                                    views="Recommended"
                                    duration="Video"
                                    url={`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`}
                                    thumbnail={`https://placehold.co/600x400?text=${encodeURIComponent(query)}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
