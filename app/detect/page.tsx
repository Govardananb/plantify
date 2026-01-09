"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, Upload, Image as ImageIcon, Camera, WifiOff, Clock } from "lucide-react";
import { ScanningRadar } from "@/components/features/ScanningRadar";
import { ProcessingSteps } from "@/components/features/ProcessingSteps";
import { saveResult, saveImage } from "@/lib/storage";
import { analyzePlantImage } from "@/app/actions/analyze";
import { simulateOfflineAnalysis } from "@/lib/offline-analysis"; // Import simulation
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useOnline } from "@/hooks/useOnline"; // Import hook

export default function DetectPage() {
    const router = useRouter();
    const isOnline = useOnline(); // Check connectivity
    const fileInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [isSecure, setIsSecure] = useState(true);
    const { language, t } = useLanguage();

    React.useEffect(() => {
        // Check if environment supports camera (HTTPS or localhost)
        if (typeof window !== "undefined") {
            setIsSecure(window.isSecureContext);
        }
    }, []);

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

        // For simulation, we need the file object, but for preview we need base64
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setPreview(base64);
            startAnalysis(base64, file);
        };
        reader.readAsDataURL(file);
    };

    const startAnalysis = async (imageBase64: string, file: File) => {
        setIsAnalyzing(true);

        try {
            // Step 1: Identification
            let resultData;

            if (isOnline) {
                // Online AI
                const result = await analyzePlantImage(imageBase64, language || "en");
                if (!result.success) {
                    throw new Error(result.error);
                }
                resultData = result.data;
            } else {
                // Offline Logic - User requested "Analyze Later" behavior
                // Instead of simulation, we save as pending and redirect.
                // We need to return here since handleSaveForLater does the redirect.
                // We will reuse the logic in handleSaveForLater but since we already have base64 and file...
                // Actually handleSaveForLater reads the file, but we have base64.

                const { saveScan } = await import("@/lib/db");
                await saveScan({
                    scanId: `pending-${Date.now()}`,
                    timestamp: new Date().toISOString(),
                    originalImage: imageBase64,
                    status: "pending",
                    isOffline: true
                });

                // Short delay for UX
                setSteps(prev => prev.map(s => s.id === 1 ? { ...s, status: "completed", sublabel: "Saved for later" } : s));
                await new Promise(resolve => setTimeout(resolve, 800));

                router.push("/history");
                return;
            }

            setSteps(prev => prev.map(s => s.id === 1 ? { ...s, status: "completed" } : s.id === 2 ? { ...s, status: "loading", sublabel: "Analyzing symptoms..." } : s));

            // Simulate slight delay for UX consistency
            if (isOnline) await new Promise(resolve => setTimeout(resolve, 1500));

            const storedScan: any = {
                ...resultData,
                status: "analyzed", // Assuming resultData is PlantAnalysisResult
                // We need to construct the full StoredScan object.
                // Actually analyzePlantImage returns PlantAnalysisResult. 
                // We need to wrap it.
                originalImage: imageBase64, // We need to pass this or ensure it's saved via saveImage(file) logic which saves to session 'plantifier-image'.
                // But saveResult expects StoredScan now?
            };

            // Wait, saveResult in storage.ts uses session storage. saveScan in db.ts uses IndexedDB.
            // DetectPage uses saveResult (storage.ts) for passing data to ResultPage.
            // It ALSO needs to save to history via db.ts? 
            // Previous code didn't save to DB here explicitly?
            // "saveScan({ ...stored, originalImage: getImage() || "" })" is called in ResultPage useEffect!
            // So DetectPage only needs to pass data to ResultPage via session.

            saveResult(resultData); // This saves to session.

            setSteps(prev => prev.map(s => s.id === 2 ? { ...s, status: "completed" } : s.id === 3 ? { ...s, status: "loading", sublabel: "Formatting report..." } : s));

            await new Promise(resolve => setTimeout(resolve, 1000));

            router.push("/result");

        } catch (error) {
            console.error(error);
            alert("Analysis Failed. Please try again.");
            setIsAnalyzing(false);
            setPreview(null);
        }
    };

    const handleSaveForLater = async (file: File) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result as string;
            const { saveScan } = await import("@/lib/db");
            await saveScan({
                scanId: `pending-${Date.now()}`,
                timestamp: new Date().toISOString(),
                originalImage: base64,
                status: "pending",
                isOffline: !isOnline
            });
            router.push("/history");
        };
        reader.readAsDataURL(file);
    };

    if (isAnalyzing) {
        return (
            <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {/* Background removed as per request */}

                <ScanningRadar />

                <div className="z-10 w-full max-w-sm mt-8">
                    <ProcessingSteps steps={steps} />
                    {!isOnline && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-full text-sm font-medium">
                            <WifiOff className="w-4 h-4" />
                            Offline Mode Active
                        </div>
                    )}
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
                <div className="flex items-center gap-2">
                    {!isOnline && <WifiOff className="w-4 h-4 text-stone-400" />}
                    <span className="font-medium bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-sm">
                        {isOnline ? "Scan Plant" : "Offline Scan"}
                    </span>
                </div>
                <div className="w-10"></div>{/* Spacer */}
            </div>

            {/* Main Content: Centered Options */}
            <div className="flex-1 flex flex-col items-center justify-center gap-12 p-6 z-10 w-full animate-in fade-in zoom-in duration-500">

                {/* Visual Icon (Optional, or just text) */}
                <div className="text-center space-y-2 mb-4">
                    <h2 className="text-2xl font-semibold text-white">{isOnline ? "Start Analysis" : "Offline Mode"}</h2>
                    <p className="text-stone-400">
                        {isOnline ? "Choose an image source" : "Will be saved for later analysis"}
                    </p>

                    {!isSecure && (
                        <div className="mx-auto max-w-[280px] bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mt-4">
                            <p className="text-xs text-amber-200 text-center flex items-center justify-center gap-2">
                                <WifiOff className="w-4 h-4" /> {/* Reusing WifiOff conceptually as Warning icon available */}
                                Camera requires HTTPS/Localhost
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-4 w-full max-w-sm">
                    <div className="flex items-center justify-center gap-8 w-full">
                        {/* Capture Option */}
                        <button
                            onClick={() => {
                                if (!isSecure) {
                                    alert("Camera access requires a secure HTTPS connection.");
                                    return;
                                }
                                fileInputRef.current?.click()
                            }}
                            className={`flex-1 flex flex-col items-center gap-4 group p-6 rounded-3xl border transition-all ${!isSecure
                                    ? 'bg-stone-800/50 border-stone-700 cursor-not-allowed opacity-50'
                                    : 'bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20 active:scale-95'
                                }`}
                        >
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${!isSecure ? 'bg-stone-700 shadow-none' : 'bg-emerald-500 shadow-emerald-500/30'
                                }`}>
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
