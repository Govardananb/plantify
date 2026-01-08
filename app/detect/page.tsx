"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, Upload, Image as ImageIcon, Camera } from "lucide-react";
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
                {/* Background removed as per request */}

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

            {/* Main Content: Centered Options */}
            <div className="flex-1 flex flex-col items-center justify-center gap-12 p-6 z-10 w-full animate-in fade-in zoom-in duration-500">

                {/* Visual Icon (Optional, or just text) */}
                <div className="text-center space-y-2 mb-4">
                    <h2 className="text-2xl font-semibold text-white">Start Analysis</h2>
                    <p className="text-stone-400">Choose an image source</p>
                </div>

                <div className="flex items-center justify-center gap-8 w-full max-w-sm">
                    {/* Capture Option */}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 flex flex-col items-center gap-4 group p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 active:scale-95 transition-all"
                    >
                        <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                            <Camera className="w-10 h-10 text-white" />
                        </div>
                        <span className="text-lg font-medium text-white">Capture</span>
                    </button>

                    {/* Upload Option */}
                    <button
                        onClick={() => galleryInputRef.current?.click()}
                        className="flex-1 flex flex-col items-center gap-4 group p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 transition-all"
                    >
                        <div className="w-20 h-20 rounded-full bg-stone-800 flex items-center justify-center border border-white/10">
                            <ImageIcon className="w-10 h-10 text-white" />
                        </div>
                        <span className="text-lg font-medium text-white">Upload</span>
                    </button>
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
