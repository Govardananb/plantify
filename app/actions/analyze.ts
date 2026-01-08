"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { PlantAnalysisResult } from "@/types/plant-analysis";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export type AnalysisResponse =
  | { success: true; data: PlantAnalysisResult }
  | { success: false; error: string; details?: string };

export async function analyzePlantImage(imageBase64: string, language: string = "en"): Promise<AnalysisResponse> {
  const timestamp = new Date().toISOString();
  const scanId = crypto.randomUUID();

  // 1. Simulation Mode (if Key is missing or invalid)
  const apiKey = process.env.GEMINI_API_KEY;

  // Basic validation: Check existence, length (Gemini keys are long), and specific placeholder strings
  if (!apiKey || apiKey === "undefined" || apiKey.length < 30 || apiKey.includes("YOUR_API_KEY")) {
    console.warn("SERVER: Gemini API Key is missing or invalid. SIMULATING RESPONSE.");
    await new Promise(resolve => setTimeout(resolve, 2000));

    let mock: PlantAnalysisResult;

    if (language === 'ta') {
      mock = {
        scanId,
        timestamp,
        isPlant: true,
        confidenceNote: "High",
        plant: {
          commonName: "மான்ஸ்டெரா டெலிசியோசா",
          scientificName: "Monstera deliciosa",
          plantType: "climber",
          shortDescription: "பெரிய, பிளவுபட்ட இலைகளுக்கு பிரபலமான ஒரு வெப்பமண்டல தாவரம்."
        },
        healthAnalysis: {
          status: "Healthy",
          observedSymptoms: [],
          probableIssues: []
        },
        zoneInsights: {
          suitableClimates: ["Tropical", "Humid"],
          generalRegions: ["மத்திய அமெரிக்கா", "தெற்காசியா"],
        },
        recommendations: {
          immediateActions: [],
          careGuide: [
            "இலைகளை வாரத்திற்கு ஒரு முறை துடைக்கவும்",
            "நேரடி சூரிய ஒளியைத் தவிர்க்கவும்",
            "மண்ணின் ஈரப்பதத்தை அடிக்கடி சரிபார்க்கவும்"
          ]
        },
        learningResources: {
          youtubeSearchQueries: ["monstera deliciosa care tamil", "monstera valarppu murai"]
        },
        disclaimer: "இந்த ஆய்வு ஆலோசனை மட்டுமே மற்றும் தொழில்முறை விவசாய ஆலோசனையை மாற்றாது."
      };
    } else if (language === 'hi') {
      mock = {
        scanId,
        timestamp,
        isPlant: true,
        confidenceNote: "High",
        plant: {
          commonName: "मॉन्स्टेरा डेलिसिओसा",
          scientificName: "Monstera deliciosa",
          plantType: "climber",
          shortDescription: "अपने बड़े, कटे हुए पत्तों के लिए प्रसिद्ध एक लोकप्रिय उष्णकटिबंधीय पौधा।"
        },
        healthAnalysis: {
          status: "Healthy",
          observedSymptoms: [],
          probableIssues: []
        },
        zoneInsights: {
          suitableClimates: ["Tropical", "Humid"],
          generalRegions: ["मध्य अमेरिका", "दक्षिण एशिया"],
        },
        recommendations: {
          immediateActions: [],
          careGuide: [
            "हफ्ते में एक बार पत्ते साफ करें",
            "सीधी धूप से पौधे को बचाएं",
            "मिट्टी की नमी की नियमित जांच करें"
          ]
        },
        learningResources: {
          youtubeSearchQueries: ["monstera deliciosa care hindi", "monstera plant dekhbhal"]
        },
        disclaimer: "यह विश्लेषण केवल सलाह है और पेशेवर कृषि परामर्श का विकल्प नहीं है।"
      };
    } else {
      // Default English
      mock = {
        scanId,
        timestamp,
        isPlant: true,
        confidenceNote: "High",
        plant: {
          commonName: "Monstera Deliciosa",
          scientificName: "Monstera deliciosa",
          plantType: "climber",
          shortDescription: "A popular tropical plant famous for its large, split leaves."
        },
        healthAnalysis: {
          status: "Healthy",
          observedSymptoms: [],
          probableIssues: []
        },
        zoneInsights: {
          suitableClimates: ["Tropical", "Humid"],
          generalRegions: ["Central America", "South Asia"],
        },
        recommendations: {
          immediateActions: [],
          careGuide: [
            "Wipe leaves monthly to remove dust",
            "Keep away from direct noon sunlight",
            "Check soil moisture before watering"
          ]
        },
        learningResources: {
          youtubeSearchQueries: ["monstera deliciosa care guide", "monstera watering tips"]
        },
        disclaimer: "This analysis is advisory and based only on visual observation."
      };
    }

    return { success: true, data: mock };
  }

  // 2. Validation
  if (!imageBase64 || imageBase64.length < 100) {
    return { success: false, error: "Upload Failed: Image data is empty or invalid." };
  }

  try {
    console.log("SERVER: Initializing Gemini Model: gemini-flash-latest");
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const isDataURI = imageBase64.includes("base64,");
    let mimeType = "image/jpeg";
    let base64Raw = imageBase64;

    if (isDataURI) {
      const parts = imageBase64.split(",");
      const header = parts[0];
      base64Raw = parts[1];
      const mimeMatch = header.match(/:(.*?);/);
      if (mimeMatch) mimeType = mimeMatch[1];
    }

    // Clean Base64
    const buffer = Buffer.from(base64Raw, 'base64');
    const cleanBase64 = buffer.toString('base64');

    const prompt = `
        Analyze the provided image and return the result strictly in the JSON format below.
        
        IMPORTANT: Respond ENTIRELY in the "${language}" language. 
        Translate all values (plant names, descriptions, advice, disclaimers) to "${language}".
        Keep specific scientific terms in English/Latin if no common translation exists.

        What to do:

        Identify whether the image contains a plant.

        If yes, identify the plant (common + scientific name if possible).

        Assess visible plant health based only on visual cues.

        Infer possible issues carefully (do not guess aggressively).

        Suggest exactly 3 preventive care steps. Keep them very short and direct.

        Mention suitable climate zones at a high level.

        Recommend learning resources as search queries (not links).

        Output Rules:

        Return ONLY valid JSON

        Do NOT include explanations outside JSON

        Use simple, farmer-friendly language

        If confidence is low, state it clearly

        REQUIRED JSON OUTPUT FORMAT
        {
          "isPlant": true,
          "confidenceNote": "High | Medium | Low",
          "plant": {
            "commonName": "string or Unknown",
            "scientificName": "string or Unknown",
            "plantType": "crop | tree | shrub | herb | climber | unknown",
            "shortDescription": "Short Overview. 2-3 sentences describing the plant's origin, key features, and uses."
          },
          "healthAnalysis": {
            "status": "Healthy | Moderate | Critical",
            "observedSymptoms": [
              "string"
            ],
            "probableIssues": [
              "string"
            ]
          },
          "recommendations": {
            "immediateActions": [
              "string"
            ],
            "careGuide": [
              "string (Short preventive step, max 10 words)"
            ]
          },
          "zoneInsights": {
            "suitableClimates": [
              "Tropical",
              "Subtropical",
              "Temperate",
              "Arid",
              "Humid"
            ],
            "generalRegions": [
              "India",
              "South Asia"
            ]
          },
          "learningResources": {
            "youtubeSearchQueries": [
              "string"
            ]
          },
          "disclaimer": "This analysis is advisory and based only on visual observation."
        }
        `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: cleanBase64,
          mimeType: mimeType,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
      const data = JSON.parse(cleanJson) as PlantAnalysisResult;

      // Force strict ID and Timestamp from server
      data.scanId = scanId;
      data.timestamp = timestamp;

      return { success: true, data };
    } catch {
      console.error("SERVER: JSON Output:", text);
      return { success: false, error: "AI Response Error: Could not parse JSON." };
    }

  } catch (error: unknown) {
    console.error("SERVER: Gemini Exception:", error);
    return {
      success: false,
      error: "Gemini API Error: " + (error instanceof Error ? error.message : "Unknown error"),
      details: String(error)
    };
  }
}
