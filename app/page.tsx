import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[var(--color-background)]">
      <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-700">

        {/* Brand / Logo Area */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center shadow-lg rotate-3 hover:rotate-6 transition-transform">
            <span className="text-3xl">🌱</span>
          </div>
        </div>

        {/* Hero Text */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-primary-dark)]">
            Understand Any Plant. <span className="text-[var(--color-accent)]">Instantly.</span>
          </h1>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            Identify plants, analyze health, and get organic improvement tips using AI.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-4">
          <Link href="/detect">
            <Button className="w-full sm:w-auto text-lg px-8 py-4 shadow-xl shadow-[var(--color-primary)]/20">
              Upload Plant Image
            </Button>
          </Link>

          <Link href="/result?sample=true">
            <Button variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4">
              Try with Sample
            </Button>
          </Link>
        </div>

        {/* Trust/Footer Note */}
        <div className="pt-12">
          <p className="text-sm text-[var(--color-text-muted)] opacity-60">
            100% Free • No Sign-up Required
          </p>
        </div>
      </div>
    </main>
  );
}
