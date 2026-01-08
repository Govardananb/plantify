import { PlantAnalysisResult } from "@/types/plant-analysis";

export interface OfflineCrop extends PlantAnalysisResult {
    imageUrl: string;
}

export const OFFLINE_CROPS: OfflineCrop[] = [
    {
        scanId: "offline-tomato",
        timestamp: new Date().toISOString(),
        isPlant: true,
        confidenceNote: "High",
        imageUrl: "/offline/tomato.png",
        plant: {
            commonName: "Tomato",
            scientificName: "Solanum lycopersicum",
            plantType: "crop",
            shortDescription: "A widely cultivated edible berry used as a vegetable, originating from South America."
        },
        healthAnalysis: {
            status: "Healthy",
            observedSymptoms: [],
            probableIssues: []
        },
        recommendations: {
            immediateActions: [],
            careGuide: [
                "Water regularly, keeping soil moist",
                "Provide direct sunlight for 6-8 hours",
                "Support stems with stakes"
            ]
        },
        zoneInsights: {
            suitableClimates: ["Temperate", "Tropical"],
            generalRegions: ["Global"]
        },
        learningResources: {
            youtubeSearchQueries: ["tomato cultivation guide", "tomato pest control"]
        },
        disclaimer: "Offline Data. Reference only."
    },
    {
        scanId: "offline-paddy",
        timestamp: new Date().toISOString(),
        isPlant: true,
        confidenceNote: "High",
        imageUrl: "/offline/paddy.png",
        plant: {
            commonName: "Paddy (Rice)",
            scientificName: "Oryza sativa",
            plantType: "crop",
            shortDescription: "The primary staple food for more than half the world's population."
        },
        healthAnalysis: {
            status: "Healthy",
            observedSymptoms: [],
            probableIssues: []
        },
        recommendations: {
            immediateActions: [],
            careGuide: [
                "Maintain standing water in field",
                "Ensure sufficient nitrogen fertilizer",
                "Monitor for stem borers"
            ]
        },
        zoneInsights: {
            suitableClimates: ["Tropical", "Humid"],
            generalRegions: ["Asia", "Africa"]
        },
        learningResources: {
            youtubeSearchQueries: ["rice farming techniques", "paddy disease management"]
        },
        disclaimer: "Offline Data. Reference only."
    },
    {
        scanId: "offline-maize",
        timestamp: new Date().toISOString(),
        isPlant: true,
        confidenceNote: "High",
        imageUrl: "/offline/maize.png",
        plant: {
            commonName: "Maize (Corn)",
            scientificName: "Zea mays",
            plantType: "crop",
            shortDescription: "A cereal grain first domesticated by indigenous peoples in southern Mexico."
        },
        healthAnalysis: {
            status: "Healthy",
            observedSymptoms: [],
            probableIssues: []
        },
        recommendations: {
            immediateActions: [],
            careGuide: [
                "Plant in blocks for pollination",
                "Water deeply during silking",
                "Control weeds early"
            ]
        },
        zoneInsights: {
            suitableClimates: ["Temperate", "Tropical"],
            generalRegions: ["Americas", "Global"]
        },
        learningResources: {
            youtubeSearchQueries: ["growing maize guide", "corn pest control"]
        },
        disclaimer: "Offline Data. Reference only."
    },
    {
        scanId: "offline-cotton",
        timestamp: new Date().toISOString(),
        isPlant: true,
        confidenceNote: "High",
        imageUrl: "/offline/cotton.png",
        plant: {
            commonName: "Cotton",
            scientificName: "Gossypium",
            plantType: "shrub",
            shortDescription: "A soft, fluffy staple fiber that grows in a boll, used to make textiles."
        },
        healthAnalysis: {
            status: "Healthy",
            observedSymptoms: [],
            probableIssues: []
        },
        recommendations: {
            immediateActions: [],
            careGuide: [
                "Ensure well-drained soil",
                "Monitor for boll weevils",
                "Avoid excessive watering"
            ]
        },
        zoneInsights: {
            suitableClimates: ["Tropical", "Subtropical"],
            generalRegions: ["India", "USA", "China"]
        },
        learningResources: {
            youtubeSearchQueries: ["cotton farming guide", "cotton disease control"]
        },
        disclaimer: "Offline Data. Reference only."
    }
];
