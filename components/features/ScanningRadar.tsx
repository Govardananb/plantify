import React from "react";
import { ScanLine } from "lucide-react";

export const ScanningRadar = () => {
    return (
        <div className="relative w-64 h-64 flex items-center justify-center mx-auto my-8">
            {/* Outer Pulse Rings */}
            <div className="absolute inset-0 border border-[var(--color-primary)]/10 rounded-full animate-[ping_3s_ease-in-out_infinite]" />
            <div className="absolute inset-4 border border-[var(--color-primary)]/20 rounded-full animate-[ping_3s_ease-in-out_infinite_delay-700ms]" />

            {/* Inner Circle Image Container */}
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-[var(--color-success)]/20 z-10">
                <img
                    src="https://images.unsplash.com/photo-1599598425947-320d32bb5826?q=80&w=400&auto=format&fit=crop"
                    alt="Scanning"
                    className="w-full h-full object-cover"
                />

                {/* Scanning Overlay (Green horizontal line moving down) */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-primary)]/40 to-transparent h-1/2 w-full animate-[scan_2s_linear_infinite]" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                        <ScanLine className="w-6 h-6 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* CSS for custom scan animation */}
            <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
        </div>
    );
};
