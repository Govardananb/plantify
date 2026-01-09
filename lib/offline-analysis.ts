import { PlantAnalysisResult } from "@/types/plant-analysis";
import { OFFLINE_CROPS } from "./offline-data";
import { getOfflineCrop } from "./offline-manager";

export async function simulateOfflineAnalysis(imageFile: File): Promise<PlantAnalysisResult> {
    // 1. Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 2. Simple simulation: Pick a random crop from our offline pack
    // In a real scenario, this would use a lightweight TFJS model or similar constant analysis.
    // For this demo, we'll try to be slightly deterministic if possible, or just random.

    const randomIndex = Math.floor(Math.random() * OFFLINE_CROPS.length);
    const matchedCrop = OFFLINE_CROPS[randomIndex];

    // 3. Try to fetch the cached version to ensure we have the data, 
    // although for the simulation result we effectively return the static data structure.
    // We modify it slightly to look like a fresh scan.

    return {
        ...matchedCrop,
        scanId: `offline-${Date.now()}`,
        timestamp: new Date().toISOString(),
        confidenceNote: "Low", // Allow marking as low confidence/offline
        disclaimer: "Offline Analysis: Result based on local simulation. Connect online for accurate AI diagnosis."
    };
}
