'use client';

import React, { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

export default function OfflineIndicator() {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        // Initial check
        setIsOffline(!navigator.onLine);

        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    if (!isOffline) return null;

    return (
        <div className="fixed top-0 left-0 right-0 bg-stone-900/90 backdrop-blur-sm text-white px-4 py-2 z-[60] flex items-center justify-center gap-2 text-xs font-medium animate-in slide-in-from-top duration-300">
            <WifiOff className="w-3 h-3" />
            <span>You are offline. Showing saved data only.</span>
        </div>
    );
}
