import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { OfflineDataSync } from "@/components/features/OfflineDataSync";
import BottomNav from "@/components/layout/BottomNav";
import OfflineIndicator from "@/components/ui/OfflineIndicator";

// ... existing imports

export const metadata: Metadata = {
  // ...
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <OfflineDataSync />
          <OfflineIndicator />
          <main className="pb-20 min-h-screen bg-neutral-50">
            {children}
          </main>
          <BottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
