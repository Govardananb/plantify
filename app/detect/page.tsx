"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function DetectPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleAnalyze = () => {
        if (!selectedImage) return;

        setIsAnalyzing(true);

        // Simulate AI Processing time
        setTimeout(() => {
            // In a real app, we'd pass the image or ID.
            // Here we just redirect to the static result page.
            router.push("/result");
        }, 2500);
    };

    return (
        <main className="min-h-screen bg-[var(--color-background)] p-6 flex flex-col items-center">
            <div className="max-w-md w-full space-y-6">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-[var(--color-primary-dark)]">
                        Identify Plant
                    </h1>
                    <p className="text-[var(--color-text-muted)]">
                        Snap a photo or upload an image to get instant insights.
                    </p>
                </div>

                {/* Upload Area */}
                <Card
                    onClick={!selectedImage ? triggerFileInput : undefined}
                    className={`min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-stone-300 bg-stone-50 transition-colors ${!selectedImage ? 'cursor-pointer hover:bg-stone-100' : ''}`}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        capture="environment" // Opens camera on mobile
                        onChange={handleFileSelect}
                    />

                    {selectedImage ? (
                        <div className="relative w-full h-full min-h-[300px]">
                            <img
                                src={selectedImage}
                                alt="Preview"
                                className="absolute inset-0 w-full h-full object-cover rounded-xl"
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(null);
                                }}
                                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
                        <div className="text-center space-y-4 p-6">
                            <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto text-3xl">
                                📷
                            </div>
                            <div>
                                <p className="font-semibold text-[var(--color-primary)]">Tap to Upload</p>
                                <p className="text-sm text-stone-400 mt-1">Supports JPG, PNG</p>
                            </div>
                        </div>
                    )}
                </Card>

                {/* Action Button */}
                <div className="pt-4">
                    {isAnalyzing ? (
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-[var(--color-primary-dark)] font-medium animate-pulse">Analyzing leaf patterns...</p>
                        </div>
                    ) : (
                        <Button
                            onClick={handleAnalyze}
                            disabled={!selectedImage}
                            className="w-full text-lg py-4 shadow-xl disabled:shadow-none"
                        >
                            Analyze Plant
                        </Button>
                    )}
                </div>

            </div>
        </main>
    );
}
