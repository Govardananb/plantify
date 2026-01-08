import { PlantAnalysisResult } from "@/types/plant-analysis";

export const saveImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        if (typeof reader.result === "string") {
            sessionStorage.setItem("plantifier-image", reader.result);
        }
    };
    reader.readAsDataURL(file);
};

export const saveImagePath = (path: string) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem("plantifier-image", path);
    }
};

export const getImage = (): string | null => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("plantifier-image");
};

export const saveResult = (data: PlantAnalysisResult) => {
    // We'll store the full result 
    sessionStorage.setItem("plantifier-result", JSON.stringify(data));
};

export const getStoredResult = (): PlantAnalysisResult | null => {
    if (typeof window === "undefined") return null;
    const data = sessionStorage.getItem("plantifier-result");
    return data ? JSON.parse(data) : null;
};
