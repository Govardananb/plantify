import { PlantAnalysisResult } from "@/types/plant-analysis";

const DB_NAME = "plantifier-db";
const DB_VERSION = 2;
const STORE_NAME = "scanHistory";

export interface StoredScan {
    scanId: string;
    timestamp: string;
    originalImage: string; // Blob URL or Base64
    status: 'pending' | 'analyzed' | 'failed';
    isOffline?: boolean;
    // Result is present if analyzed
    result?: PlantAnalysisResult;
    // Legacy support: properties might exist on the root providing backward compat if needed,
    // but we will primarily use 'result'.
}

export const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
            console.error("IndexedDB error:", request.error);
            reject(request.error);
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: "scanId" });
                store.createIndex("timestamp", "timestamp", { unique: false });
            }
            if (!db.objectStoreNames.contains("offlineCrops")) {
                db.createObjectStore("offlineCrops", { keyPath: "id" });
            }
        };
    });
};

export const saveScan = async (scan: StoredScan): Promise<void> => {
    try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        await new Promise<void>((resolve, reject) => {
            const request = store.put(scan);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error("Failed to save scan to IndexedDB:", error);
    }
};

export const getAllScans = async (): Promise<StoredScan[]> => {
    try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => {
                // Sort by timestamp descending (latest first)
                const results = request.result as StoredScan[];
                results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
                resolve(results);
            };
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error("Failed to fetch scans from IndexedDB:", error);
        return [];
    }
};

export const deleteScan = async (scanId: string): Promise<void> => {
    try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        await new Promise<void>((resolve, reject) => {
            const request = store.delete(scanId);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error("Failed to delete scan:", error);
    }
};

export const clearHistory = async (): Promise<void> => {
    try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        await new Promise<void>((resolve, reject) => {
            const request = store.clear();
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error("Failed to clear history:", error);
    }
};
