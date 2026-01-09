import { openDB } from "./db";
import { OFFLINE_CROPS, OfflineCrop } from "./offline-data";

const OFF_STORE = "offlineCrops";

export async function cacheOfflineData() {
    try {
        const db = await openDB();

        // 1. Check if already cached
        const count = await new Promise<number>((resolve, reject) => {
            const tx = db.transaction(OFF_STORE, "readonly");
            const store = tx.objectStore(OFF_STORE);
            const req = store.count();
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });

        if (count > 0) return;

        console.log("Starting offline data cache...");

        // 2. Fetch all data first (outside transaction)
        const itemsToCache = [];
        for (const crop of OFFLINE_CROPS) {
            try {
                const response = await fetch(crop.imageUrl);
                const blob = await response.blob();
                itemsToCache.push({
                    id: crop.plant.commonName.toLowerCase(),
                    data: crop,
                    imageBlob: blob
                });
            } catch (err) {
                console.error(`Failed to fetch image for ${crop.plant.commonName}`, err);
            }
        }

        // 3. Store all items in a single transaction
        if (itemsToCache.length > 0) {
            const tx = db.transaction(OFF_STORE, "readwrite");
            const store = tx.objectStore(OFF_STORE);

            await new Promise<void>((resolve, reject) => {
                tx.oncomplete = () => resolve();
                tx.onerror = () => reject(tx.error);

                for (const item of itemsToCache) {
                    store.put(item);
                }
            });
            console.log("Offline data caching complete.");
        }
    } catch (error) {
        console.error("Error caching offline data:", error);
    }
}

export async function getOfflineCrop(commonName: string): Promise<{ data: OfflineCrop, imageBlob: Blob } | null> {
    const db = await openDB();
    const tx = db.transaction(OFF_STORE, "readonly");
    const store = tx.objectStore(OFF_STORE);

    return new Promise((resolve) => {
        const request = store.get(commonName.toLowerCase());
        request.onsuccess = () => {
            resolve(request.result || null);
        };
        request.onerror = () => resolve(null);
    });
}
