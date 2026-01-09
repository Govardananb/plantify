import { openDB, saveScan, StoredScan } from "./db";
import { analyzePlantImage } from "@/app/actions/analyze";
import { simulateOfflineAnalysis } from "./offline-analysis";
import { PlantAnalysisResult } from "@/types/plant-analysis";

export async function processPendingScan(scanId: string, isOnline: boolean, language: string = "en"): Promise<{ success: boolean; result?: PlantAnalysisResult; error?: string }> {
    try {
        const db = await openDB();
        const tx = db.transaction("scanHistory", "readwrite");
        const store = tx.objectStore("scanHistory");

        const scan: StoredScan = await new Promise((resolve, reject) => {
            const req = store.get(scanId);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });

        if (!scan || scan.status !== "pending") {
            return { success: false, error: "Scan not found or not pending" };
        }

        // Convert base64 to File (needed for simulation, or just use base64 for online)
        // For online analyzePlantImage, we pass base64 string.
        // For offline simulation, we effectively need the file object or just run logic?
        // simulateOfflineAnalysis takes a File because it might need to read it, 
        // but our implementation matches random crops. It ignores the file content mostly.
        // Let's check simulateOfflineAnalysis signature. It takes `File`.
        // We have base64 `originalImage`. We can mock a File or modify simulate.

        let result: PlantAnalysisResult;

        if (isOnline) {
            const apiRes = await analyzePlantImage(scan.originalImage, language);
            if (!apiRes.success) throw new Error(apiRes.error);
            result = apiRes.data;
        } else {
            // Need to convert base64 to Blob/File for compatibility if we want strict typing
            const res = await fetch(scan.originalImage);
            const blob = await res.blob();
            const file = new File([blob], "pending.jpg", { type: "image/jpeg" });
            result = await simulateOfflineAnalysis(file);
            result.isOffline = true;
        }

        // Update Scan
        const updatedScan: StoredScan = {
            ...scan,
            status: "analyzed",
            result: result,
            isOffline: !isOnline, // Use current processing mode to determine result status
            timestamp: new Date().toISOString()
        };
        // Reset timestamp to original if we want to preserve upload time? 
        // User said "Preserve original upload time".
        // scan.timestamp is the original.
        updatedScan.timestamp = scan.timestamp;
        // Reset timestamp to original
        updatedScan.timestamp = scan.timestamp;

        await saveScan(updatedScan);

        return { success: true, result };

    } catch (error: any) {
        console.error("Pending processing failed", error);
        return { success: false, error: error.message };
    }
}
