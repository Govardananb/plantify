"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PlantCard } from "@/components/features/PlantCard";
import { ZoneIndicator } from "@/components/features/ZoneIndicator";
import { HealthBadge } from "@/components/features/HealthBadge";
import { RecommendationList } from "@/components/features/RecommendationList";
import { VideoCard } from "@/components/features/VideoCard";
import { MOCK_RESULT, PlantResult } from "@/lib/mockData";

export default function ResultPage() {
    const [data, setData] = useState<PlantResult | null>(null);

    useEffect(() => {
        // In a real app, we would fetch data based on ID.
        // Here we just load the mock data.
        setData(MOCK_RESULT);
    }, []);

    if (!data) return null;

    return (
        <main className="min-h-screen bg-[var(--color-background)] pb-20">
            {/* Top Navigation / Back */}
            <div className="p-4 sticky top-0 z-10 bg-[var(--color-background)]/90 backdrop-blur-md flex items-center justify-between border-b border-stone-200">
                <Link href="/detect">
                    <Button variant="outline" className="px-4 py-2 text-sm border-stone-300 text-stone-600 hover:bg-stone-100">
                        ← New Scan
                    </Button>
                </Link>
                <span className="font-semibold text-[var(--color-primary-dark)]">Analysis Report</span>
                <div className="w-20" /> {/* Spacer for balance */}
            </div>

            <div className="max-w-md mx-auto p-4 space-y-6 animate-in slide-in-from-bottom-4 duration-500">

                {/* 1. Identification */}
                <section>
                    <PlantCard
                        plantName={data.plantName}
                        description={data.description}
                        // Using a placeholder image for the result
                        imageUrl="https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=800&auto=format&fit=crop"
                    />
                </section>

                {/* 2. Zones */}
                <section>
                    <ZoneIndicator zones={data.zones} />
                </section>

                {/* 3. Health Analysis */}
                <section>
                    <h3 className="section-title mb-3">Health Analysis</h3>
                    <HealthBadge status={data.healthStatus} issues={data.issues} />
                </section>

                {/* 4. Recommendations */}
                <section className="space-y-4">
                    <h3 className="section-title">Care & Improvement</h3>

                    <RecommendationList type="cure" items={data.recommendations.cure} />
                    <RecommendationList type="prevention" items={data.recommendations.prevention} />
                    <RecommendationList type="improvement" items={data.recommendations.improvement} />
                </section>

                {/* 5. Learning Resources */}
                <section>
                    <h3 className="section-title mb-3">Helpful Videos</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {data.videos.map((video, idx) => (
                            <VideoCard
                                key={idx}
                                title={video.title}
                                duration={video.duration}
                                url={video.url}
                            />
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}
