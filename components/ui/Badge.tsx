import React from "react";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "neutral" | "success" | "warning" | "danger" | "info";
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = "neutral",
    className = "",
}) => {
    const variants = {
        neutral: "bg-stone-100 text-stone-600",
        success: "bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/20",
        warning: "bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/20",
        danger: "bg-[var(--color-danger)]/10 text-[var(--color-danger)] border border-[var(--color-danger)]/20",
        info: "bg-blue-50 text-blue-600 border border-blue-100",
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${variants[variant]} ${className}`}
        >
            {children}
        </span>
    );
};
