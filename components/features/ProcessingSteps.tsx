import React from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

type StepStatus = "pending" | "loading" | "completed";

interface Step {
    id: number;
    label: string;
    sublabel: string;
    status: StepStatus;
    resultText?: string;
}

interface ProcessingStepsProps {
    steps: Step[];
}

export const ProcessingSteps: React.FC<ProcessingStepsProps> = ({ steps }) => {
    return (
        <div className="w-full max-w-sm mx-auto bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
            <div className="space-y-6">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex gap-4 relative">
                        {/* Connecting Line */}
                        {index !== steps.length - 1 && (
                            <div className={`absolute left-[11px] top-8 bottom-[-16px] w-[2px] ${step.status === 'completed' ? 'bg-[var(--color-success)]' : 'bg-stone-100'}`} />
                        )}

                        {/* Icon */}
                        <div className="relative z-10 bg-white">
                            {step.status === 'completed' && <CheckCircle2 className="w-6 h-6 text-[var(--color-success)] fill-green-100" />}
                            {step.status === 'loading' && <Loader2 className="w-6 h-6 text-[var(--color-success)] animate-spin" />}
                            {step.status === 'pending' && <Circle className="w-6 h-6 text-stone-200" />}
                        </div>

                        {/* Text */}
                        <div>
                            <p className={`text-sm font-semibold transition-colors ${step.status === 'pending' ? 'text-stone-400' : 'text-stone-800'}`}>
                                {step.label}
                            </p>
                            {step.status === 'completed' && step.resultText && (
                                <p className="text-xs font-medium text-[var(--color-success)] mt-0.5">{step.resultText}</p>
                            )}
                            {step.status === 'loading' && (
                                <p className="text-xs text-stone-500 mt-0.5">{step.sublabel}</p>
                            )}
                            {step.status === 'pending' && (
                                <p className="text-xs text-stone-300 mt-0.5">{useLanguage().t.processing.pending}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
