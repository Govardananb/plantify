import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    isLoading,
    className = "",
    ...props
}) => {
    const baseStyles =
        "px-6 py-3 rounded-full font-semibold transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2";

    const variants = {
        primary:
            "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] shadow-md hover:shadow-lg",
        secondary:
            "bg-[var(--color-secondary)] text-[var(--color-text-main)] hover:bg-[#C4BCA8]",
        outline:
            "border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
            ) : null}
            {children}
        </button>
    );
};
