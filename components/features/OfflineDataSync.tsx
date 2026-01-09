"use client";

import { useEffect } from "react";
import { useOnline } from "@/hooks/useOnline";
import { cacheOfflineData } from "@/lib/offline-manager";

export function OfflineDataSync() {
    const isOnline = useOnline();

    useEffect(() => {
        if (isOnline) {
            // Trigger caching when online
            cacheOfflineData();
        }
    }, [isOnline]);

    return null; // Headless component
}
