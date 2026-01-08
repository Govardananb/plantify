import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "default" | "lg" | "icon";
    isLoading?: boolean;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    size = "default",
    isLoading,
    fullWidth = false,
    className = "",
    ...props
}) => {
    const baseStyles =
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]";

    const variants = {
        primary:
            "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] shadow-lg shadow-[var(--color-primary)]/20",
        secondary:
            "bg-white text-[var(--color-text-main)] border border-stone-200 shadow-sm hover:bg-stone-50",
        outline:
            "border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5",
        ghost:
            "bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-stone-100",
    };

    const sizes = {
        default: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        icon: "p-3",
    };

    return (
        <button
            className={`
                ${baseStyles} 
                ${variants[variant]} 
                ${sizes[size]} 
                ${fullWidth ? "w-full" : ""} 
                ${className}
            `}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
            {children}
        </button>
    );
};
