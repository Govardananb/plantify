"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Translation, Language } from "@/lib/translations";

interface LanguageContextType {
    language: Language | null;
    setLanguage: (lang: Language | null) => void;
    t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language | null>(null);

    useEffect(() => {
        // Try checking localStorage first
        const saved = localStorage.getItem("plantifier-lang") as Language;
        if (saved && translations[saved]) {
            setLanguageState(saved);
        }
    }, []);

    const setLanguage = (lang: Language | null) => {
        setLanguageState(lang);
        if (lang) {
            localStorage.setItem("plantifier-lang", lang);
        } else {
            localStorage.removeItem("plantifier-lang");
        }
    };

    // Default to English if null, but UI will handle the null state to show selector
    const t = language ? translations[language] : translations["en"];

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
