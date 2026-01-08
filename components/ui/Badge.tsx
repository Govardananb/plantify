import React from "react";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "neutral" | "success" | "warning" | "danger" | "system" | "info";
    className?: string;
    icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = "neutral",
    className = "",
    icon,
}) => {
    const variants = {
        neutral: "bg-stone-100 text-stone-600",
        success: "bg-[var(--color-success)] text-white",
        warning: "bg-[var(--color-warning)] text-white",
        danger: "bg-[var(--color-danger)]/10 text-[var(--color-danger)] border border-[var(--color-danger)]/20",
        system: "bg-white/90 backdrop-blur-md text-[var(--color-text-main)] shadow-sm px-3 py-1.5 rounded-full text-xs font-semibold",
        info: "bg-blue-100 text-blue-600",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${variants[variant]} ${className}`}
        >
            {icon}
            {children}
        </span>
    );
};
