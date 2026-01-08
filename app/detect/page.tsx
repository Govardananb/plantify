"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { ScanningRadar } from "@/components/features/ScanningRadar";
import { ProcessingSteps } from "@/components/features/ProcessingSteps";
import { saveResult, saveImage } from "@/lib/storage";
import { analyzePlantImage } from "@/app/actions/analyze";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function DetectPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const { language } = useLanguage();

    type StepStatus = "pending" | "loading" | "completed";

    const [steps, setSteps] = useState<{ id: number; label: string; sublabel: string; status: StepStatus }[]>([
        { id: 1, label: "Identifying Plant", sublabel: "Scanning visual features...", status: "loading" },
        { id: 2, label: "Checking Health", sublabel: "Pending...", status: "pending" },
        { id: 3, label: "Generating Advice", sublabel: "Pending...", status: "pending" },
    ]);

    const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Save image immediately for Result Page
        saveImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setPreview(base64);
            startAnalysis(base64);
        };
        reader.readAsDataURL(file);
    };

    const startAnalysis = async (imageBase64: string) => {
        setIsAnalyzing(true);

        try {
            // Step 1: Identification
            const result = await analyzePlantImage(imageBase64, language || "en");

            if (!result.success) {
                alert(`Analysis Failed: ${result.error}`);
                setIsAnalyzing(false);
                setPreview(null);
                return;
            }

            setSteps(prev => prev.map(s => s.id === 1 ? { ...s, status: "completed" } : s.id === 2 ? { ...s, status: "loading", sublabel: "Analyzing symptoms..." } : s));

            // Simulate slight delay for UX
            await new Promise(resolve => setTimeout(resolve, 1500));

            saveResult(result.data);

            setSteps(prev => prev.map(s => s.id === 2 ? { ...s, status: "completed" } : s.id === 3 ? { ...s, status: "loading", sublabel: "Formatting report..." } : s));

            await new Promise(resolve => setTimeout(resolve, 1000));

            router.push("/result");

        } catch (error) {
            console.error(error);
            alert("Something went wrong");
            setIsAnalyzing(false);
            setPreview(null);
        }
    };

    if (isAnalyzing) {
        return (
            <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {/* Background Image Blur */}
                {preview && (
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-10 blur-xl scale-110"
                        style={{ backgroundImage: `url(${preview})` }}
                    />
                )}

                <ScanningRadar />

                <div className="z-10 w-full max-w-sm mt-8">
                    <ProcessingSteps steps={steps} />
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black relative flex flex-col">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center text-white">
                <button onClick={() => router.back()} className="p-2 bg-black/20 backdrop-blur-md rounded-full">
                    <X className="w-6 h-6" />
                </button>
                <span className="font-medium bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-sm">
                    Scan Plant
                </span>
                <div className="w-10"></div>{/* Spacer */}
            </div>

            {/* Viewfinder Overlay */}
            <div className="flex-1 relative flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-xs aspect-[3/4] border-2 border-white/50 rounded-3xl relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-400 -mt-0.5 -ml-0.5 rounded-tl-xl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-400 -mt-0.5 -mr-0.5 rounded-tr-xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-400 -mb-0.5 -ml-0.5 rounded-bl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-400 -mb-0.5 -mr-0.5 rounded-br-xl"></div>

                    <div className="absolute bottom-4 left-0 right-0 text-center text-white/80 text-sm font-medium">
                        Place plant in frame
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-black/80 backdrop-blur-lg p-8 pb-32 rounded-t-3xl border-t border-white/10">
                <div className="flex items-center justify-around max-w-sm mx-auto">
                    {/* Gallery Button */}
                    <button
                        onClick={() => galleryInputRef.current?.click()}
                        className="p-4 rounded-full bg-white/10 active:bg-white/20 transition-colors"
                    >
                        <ImageIcon className="w-6 h-6 text-white" />
                    </button>

                    {/* Shutter Button */}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center relative group active:scale-95 transition-transform"
                    >
                        <div className="w-16 h-16 bg-white rounded-full group-hover:bg-emerald-50 transition-colors"></div>
                    </button>

                    {/* Tips Button (Placeholder) */}
                    <div className="w-14"></div>
                </div>
            </div>

            {/* Camera Input (Forces Camera) */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleCapture}
            />

            {/* Gallery Input (Allows Selection) */}
            <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCapture}
            />
        </main>
    );
}
