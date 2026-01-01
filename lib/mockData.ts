
export interface PlantResult {
    plantName: string;
    description: string;
    zones: string[];
    healthStatus: "Healthy" | "Moderate" | "Critical";
    issues: string[];
    recommendations: {
        cure: string[];
        prevention: string[];
        improvement: string[];
    };
    videos: {
        title: string;
        url: string;
        duration: string;
    }[];
}

export const MOCK_RESULT: PlantResult = {
    plantName: "Tomato Plant",
    description: "Tomato plants thrive in warm climates with good sunlight and regular watering.",
    zones: ["Tropical", "Subtropical"],
    healthStatus: "Moderate",
    issues: ["Leaf blight", "Possible nitrogen deficiency"],
    recommendations: {
        cure: ["Remove infected leaves", "Use neem oil spray"],
        prevention: ["Avoid overwatering", "Improve air circulation"],
        improvement: ["Add nitrogen-rich compost", "Ensure 6–8 hours of sunlight"],
    },
    videos: [
        {
            title: "Tomato Leaf Blight Treatment",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder URL
            duration: "6:12",
        },
        {
            title: "How to Grow Healthy Tomato Plants",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder URL
            duration: "8:45",
        },
    ],
};

export const simulateAnalyze = (): Promise<PlantResult> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_RESULT);
        }, 2000);
    });
};
