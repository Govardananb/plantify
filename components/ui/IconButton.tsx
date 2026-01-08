import React from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({ children, className = "", ...props }) => {
    return (
        <button
            className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm text-stone-700 hover:bg-white active:scale-95 transition-all ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
