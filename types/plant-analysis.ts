export interface PlantAnalysisResult {
    scanId: string;
    timestamp: string;
    isPlant: boolean;
    isOffline?: boolean;
    confidenceNote: "High" | "Medium" | "Low";
    plant: {
        commonName: string; // "string or Unknown"
        scientificName: string; // "string or Unknown"
        plantType: "crop" | "tree" | "shrub" | "herb" | "climber" | "unknown";
        shortDescription: string;
    };
    healthAnalysis: {
        status: "Healthy" | "Moderate" | "Critical";
        observedSymptoms: string[];
        probableIssues: string[];
    };
    recommendations: {
        immediateActions: string[];
        careGuide: string[];
    };
    zoneInsights: {
        suitableClimates: ("Tropical" | "Subtropical" | "Temperate" | "Arid" | "Humid")[];
        generalRegions: string[]; // Changed from regions
    };
    learningResources: {
        youtubeSearchQueries: string[];
    };
    disclaimer: string;
}
