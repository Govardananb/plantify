import React from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface DiseaseTreatmentProps {
    diseaseName: string;
    description: string;
    steps: string[];
}

export const DiseaseTreatment: React.FC<DiseaseTreatmentProps> = ({ diseaseName, description, steps }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-[var(--color-text-main)]">{diseaseName} {useLanguage().t.result.detected}</h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{description}</p>

            <div className="bg-[#E8F5E9] rounded-2xl p-5 border border-[var(--color-success)]/10">
                <h4 className="font-bold text-[var(--color-primary-dark)] text-sm mb-3">{useLanguage().t.result.treatment}</h4>
                <ul className="space-y-2">
                    {steps.map((step, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-[var(--color-primary-dark)] items-start">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                            <span className="opacity-90">{step}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <button className="w-full bg-white border border-stone-200 py-3 rounded-xl font-semibold text-sm text-[var(--color-text-main)] shadow-sm hover:bg-stone-50">
                {useLanguage().t.result.readDiagnosis} →
            </button>
        </div>
    );
};
