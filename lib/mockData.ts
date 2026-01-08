export interface PlantResult {
    id: string;
    plantName: string;
    scientificName: string;
    description: string;
    matchScore: number;
    healthStatus: "Healthy" | "Critical" | "Moderate";
    healthDescription: string;
    diseaseName?: string;
    diseaseDescription?: string;
    treatmentSteps?: string[];
    zones: string;
    sunlight: string;
    water: string;
    careTips: {
        title: string;
        description: string;
        type: "water" | "nutrient" | "general";
    }[];
    videos: {
        title: string;
        url: string;
        views: string;
        thumbnail: string;
        author: string;
        duration: string;
    }[];
}

export const RESULTS: Record<string, PlantResult> = {
    healthy: {
        id: "healthy",
        plantName: "Heirloom Tomato",
        scientificName: "Solanum Lycopersicum",
        matchScore: 98,
        description: "Your plant looks vibrant! The leaves are rich in color, and we detected no signs of pests or major diseases.",
        healthStatus: "Healthy",
        healthDescription: "Your plant looks vibrant! The leaves are rich in color, and we detected no signs of pests or major diseases. Keep up the good work!",
        zones: "9b",
        sunlight: "6-8 hrs",
        water: "Daily",
        careTips: [
            {
                title: "Morning Hydration",
                description: "Water early in the morning to allow leaves to dry and prevent mold growth.",
                type: "water"
            },
            {
                title: "Nutrient Boost",
                description: "Apply organic compost every 2 weeks to support fruit production.",
                type: "nutrient"
            }
        ],
        videos: [
            {
                title: "How to Prune Tomatoes for Big Harvests",
                author: "Garden Master",
                views: "12k views",
                duration: "5:02",
                url: "#",
                thumbnail: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=400&auto=format&fit=crop"
            },
            {
                title: "Best Organic Fertilizer for Summer",
                author: "Eco Farming",
                views: "8k views",
                duration: "10:15",
                url: "#",
                thumbnail: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=400&auto=format&fit=crop"
            }
        ]
    },
    disease: {
        id: "disease",
        plantName: "Tomato Plant",
        scientificName: "Solanum Lycopersicum",
        matchScore: 92,
        description: "Your scan indicates signs of Early Blight.",
        healthStatus: "Critical",
        healthDescription: "Your scan indicates signs of Early Blight. This is a common fungal disease in humid climates.",
        diseaseName: "Early Blight Detected",
        diseaseDescription: "Your scan indicates signs of Early Blight. This is a common fungal disease in humid climates. It starts with small brown spots on older leaves.",
        treatmentSteps: [
            "Prune affected leaves immediately.",
            "Improve air circulation around the plant.",
            "Apply a copper-based fungicide."
        ],
        zones: "9b",
        sunlight: "High",
        water: "Daily",
        careTips: [],
        videos: [] // Design doesn't clearly show videos for disease state, but we can reuse or hide
    }
};

export const getResult = async (type: "healthy" | "disease" = "healthy"): Promise<PlantResult> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(RESULTS[type]);
        }, 500);
    });
};
