export type Language = "en" | "ta" | "hi";

export interface Translation {
    appTitle: string;
    history: {
        title: string;
        empty: string;
        emptyDesc: string;
        clear: string;
        deleteConfirm: string;
        clearConfirm: string;
        delete: string;
    };
    systemActive: string;
    heroTitle: string;
    heroSubtitle: string;
    scanPlant: string;
    uploadGallery: string;
    disclaimer: string;
    bottomNav: {
        home: string;
        history: string;
        scan: string;
        settings: string;
    };
    common: {
        error: string;
        analysisFailed: string;
        somethingWentWrong: string;
    };
    processing: {
        title: string;
        analyzing: string;
        identifying: string;
        detecting: string;
        calculating: string;
        cancel: string;
        scanningVisualFeatures: string;
        analyzingSymptoms: string;
        formattingReport: string;
        pending: string;
    };
    detect: {
        placePlant: string;
        identifying: string;
        checkingHealth: string;
        generatingAdvice: string;
    };
    result: {
        analysisReport: string;
        scanResults: string;
        healthy: string;
        critical: string;
        moderate: string;
        newScan: string;
        save: string;
        share: string;
        healthStatus: string;
        match: string;
        careRecommendations: string;
        watchLearn: string;
        viewAll: string;
        zone: string;
        sunlight: string;
        water: string;
        growingConditions: string;
        treatment: string;
        diseaseDetected: string;
        urgent: string;
        fungal: string;
        careGuide: string;
        immediateAction: string;
        detected: string;
        readDiagnosis: string;
        diagnosis: string;
        healthyPlantMessage: string;
        preventiveCare: string;
        helpfulVideos: string;
    };
    selectLanguage: string;
    recentScans: string;
}

export const translations: Record<Language, Translation> = {
    en: {
        appTitle: "Plantifier",
        history: {
            title: "Scan History",
            empty: "No scans yet",
            emptyDesc: "Go to the camera to start your garden journal.",
            clear: "Clear All",
            deleteConfirm: "Delete this scan?",
            clearConfirm: "Are you sure you want to delete all scan history?",
            delete: "Delete"
        },
        systemActive: "System Active",
        heroTitle: "Plantifier",
        heroSubtitle: "Identify plants. Understand health.\nGrow better.",
        scanPlant: "Scan Plant",
        uploadGallery: "Upload from Gallery",
        disclaimer: "AI analysis is for reference only. Consult an expert for critical crop decisions.",
        bottomNav: {
            home: "Home",
            history: "Scan History",
            scan: "Scan",
            settings: "Settings"
        },
        common: {
            error: "Error",
            analysisFailed: "Analysis failed",
            somethingWentWrong: "Something went wrong"
        },
        processing: {
            title: "Processing",
            analyzing: "Analyzing your plant...",
            identifying: "Identifying Species",
            detecting: "Detecting Diseases",
            calculating: "Calculating Care Tips",
            cancel: "Cancel Analysis",
            scanningVisualFeatures: "Scanning visual features...",
            analyzingSymptoms: "Analyzing symptoms...",
            formattingReport: "Formatting report...",
            pending: "Pending...",
        },
        detect: {
            placePlant: "Place plant in box",
            identifying: "Identifying Plant",
            checkingHealth: "Checking Health",
            generatingAdvice: "Generating Advice"
        },
        result: {
            analysisReport: "Analysis Report",
            scanResults: "Scan Results",
            healthy: "Healthy",
            critical: "Critical",
            moderate: "Moderate",
            newScan: "New Scan",
            save: "Save",
            share: "Share",
            healthStatus: "Health Status",
            match: "Match",
            careRecommendations: "Care Recommendations",
            watchLearn: "Watch & Learn",
            viewAll: "View All",
            zone: "Zone",
            sunlight: "Sunlight",
            water: "Water",
            growingConditions: "Growing Conditions",
            treatment: "RECOMMENDED TREATMENT",
            diseaseDetected: "Disease Detected",
            urgent: "Urgent Care",
            fungal: "Fungal",
            careGuide: "Care Guide",
            immediateAction: "Immediate Action",
            detected: "Detected",
            readDiagnosis: "Read Full Diagnosis",
            diagnosis: "Diagnosis",
            healthyPlantMessage: "Your plant is looking great! Keep up the good work.",
            preventiveCare: "Preventive Care",
            helpfulVideos: "Helpful Videos"
        },
        selectLanguage: "Select Language",
        recentScans: "Recent Scans"
    },
    ta: {
        appTitle: "பிளான்டிஃபையர்",
        history: {
            title: "ஸ்கேன் வரலாறு",
            empty: "வரலாறு இல்லை",
            emptyDesc: "உங்கள் தோட்டக் குறிப்பைத் தொடங்க கேமராவுக்குச் செல்லவும்.",
            clear: "அழி",
            deleteConfirm: "இந்த ஸ்கேனை நீக்கவா?",
            clearConfirm: "அனைத்து வரலாற்றையும் நீக்க விரும்புகிறீர்களா?",
            delete: "நீக்கு"
        },
        systemActive: "சிஸ்டம் ஆக்டிவ்",
        heroTitle: "பிளான்டிஃபையர்",
        heroSubtitle: "தாவரங்களை கண்டறியவும்.\nஆரோக்கியத்தை புரிந்து கொள்ளவும்.",
        scanPlant: "தாவரத்தை ஸ்கேன் செய்",
        uploadGallery: "படத்தை பதிவேற்று",
        disclaimer: "AI முடிவுகள் குறிப்புக்காக மட்டுமே. முக்கியமான முடிவுகளுக்கு நிபுணரை அணுகவும்.",
        bottomNav: {
            home: "முகப்பு",
            history: "வரலாறு",
            scan: "ஸ்கேன்",
            settings: "அமைப்புகள்"
        },
        common: {
            error: "பிழை",
            analysisFailed: "ஆய்வு தோல்வியடைந்தது",
            somethingWentWrong: "ஏதோ தவறு நடந்துள்ளது"
        },
        processing: {
            title: "செயலாக்கத்தில்",
            analyzing: "ஆய்வு செய்கிறது...",
            identifying: "இனத்தை கண்டறிகிறது",
            detecting: "நோய்களை கண்டறிகிறது",
            calculating: "பராமரிப்பு குறிப்புகள்",
            cancel: "ரத்து செய்",
            scanningVisualFeatures: "அம்சங்களை ஸ்கேன் செய்கிறது...",
            analyzingSymptoms: "அறிகுறிகளை ஆய்வு செய்கிறது...",
            formattingReport: "அறிக்கையை உருவாக்குகிறது...",
            pending: "காத்திருக்கிறது...",
        },
        detect: {
            placePlant: "தாவரத்தை பெட்டியில் வைக்கவும்",
            identifying: "இனத்தை கண்டறிகிறது",
            checkingHealth: "ஆரோக்கியத்தை சோதிக்கிறது",
            generatingAdvice: "ஆலோசனை உருவாக்குகிறது"
        },
        result: {
            analysisReport: "ஆய்வு அறிக்கை",
            scanResults: "ஸ்கேன் முடிவுகள்",
            healthy: "ஆரோக்கியம்",
            critical: "ஆபத்து",
            moderate: "மிதமான",
            newScan: "புதிய ஸ்கேன்",
            save: "சேமி",
            share: "பகிர்",
            healthStatus: "ஆரோக்கிய நிலை",
            match: "பொருத்தம்",
            careRecommendations: "பராமரிப்பு பரிந்துரைகள்",
            watchLearn: "பார்த்து கற்றுக்கொள்",
            viewAll: "அனைத்தும்",
            zone: "மண்டலம்",
            sunlight: "சூரிய ஒளி",
            water: "நீர்",
            growingConditions: "வளரும் சூழல்",
            treatment: "பரிந்துரைக்கப்பட்ட சிகிச்சை",
            diseaseDetected: "நோய் கண்டறியப்பட்டது",
            urgent: "அவசர சிகிச்சை",
            fungal: "பூஞ்சை",
            careGuide: "பராமரிப்பு வழிகாட்டி",
            immediateAction: "உடனடி நடவடிக்கை",
            detected: "கண்டறியப்பட்டது",
            readDiagnosis: "முழு நோயறிதலைப் படிக்க",
            diagnosis: "நோயறிதல்",
            healthyPlantMessage: "உங்கள் தாவரம் நன்றாக உள்ளது!",
            preventiveCare: "தடுப்பு பராமரிப்பு",
            helpfulVideos: "பயனுள்ள வீடியோக்கள்"
        },
        selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
        recentScans: "சமீபத்திய ஸ்கேன்கள்"
    },
    hi: {
        appTitle: "प्लांटिफायर",
        history: {
            title: "स्कैन इतिहास",
            empty: "कोई इतिहास नहीं",
            emptyDesc: "अपनी बागवानी डायरी शुरू करने के लिए कैमरा पर जाएं।",
            clear: "साफ़ करें",
            deleteConfirm: "इस स्कैन को हटाएं?",
            clearConfirm: "क्या आप सभी इतिहास हटाना चाहते हैं?",
            delete: "हटाएं"
        },
        systemActive: "सिस्टम सक्रिय",
        heroTitle: "प्लांटिफायर",
        heroSubtitle: "पौधों की पहचान करें।\nस्वास्थ्य को समझें।",
        scanPlant: "पौधा स्कैन करें",
        uploadGallery: "गैलरी से अपलोड करें",
        disclaimer: "AI विश्लेषण केवल संदर्भ के लिए है। महत्वपूर्ण निर्णयों के लिए विशेषज्ञ से सलाह लें।",
        bottomNav: {
            home: "होम",
            history: "इतिहास",
            scan: "स्कैन",
            settings: "सेटिंग्स"
        },
        common: {
            error: "त्रुटि",
            analysisFailed: "विश्लेषण विफल",
            somethingWentWrong: "कुछ गलत हो गया"
        },
        processing: {
            title: "प्रक्रिया",
            analyzing: "विश्लेषण कर रहा है...",
            identifying: "प्रजाति की पहचान",
            detecting: "रोग की पहचान",
            calculating: "देखभाल के सुझाव",
            cancel: "रद्द करें",
            scanningVisualFeatures: "सुविधाओं को स्कैन कर रहा है...",
            analyzingSymptoms: "लक्षणों का विश्लेषण कर रहा है...",
            formattingReport: "रिपोर्ट स्वरूपण...",
            pending: "लंबित...",
        },
        detect: {
            placePlant: "पौधे को बॉक्स में रखें",
            identifying: "पौधे की पहचान",
            checkingHealth: "स्वास्थ्य की जांच",
            generatingAdvice: "सलाह तैयार हो रही है"
        },
        result: {
            analysisReport: "विश्लेषण रिपोर्ट",
            scanResults: "स्कैन परिणाम",
            healthy: "स्वस्थ",
            critical: "गंभीर",
            moderate: "मध्यम",
            newScan: "नया स्कैन",
            save: "सहेजें",
            share: "शेयर करें",
            healthStatus: "स्वास्थ्य स्थिति",
            match: "मिलान",
            careRecommendations: "देखभाल सुझाव",
            watchLearn: "देखें और सीखें",
            viewAll: "सभी देखें",
            zone: "क्षेत्र",
            sunlight: "धूप",
            water: "पानी",
            growingConditions: "बढ़ने की स्थिति",
            treatment: "अनुशंसित उपचार",
            diseaseDetected: "रोग का पता चला",
            urgent: "तत्काल देखभाल",
            fungal: "फंगल",
            careGuide: "देखभाल गाइड",
            immediateAction: "तत्काल कार्रवाई",
            detected: "का पता चला",
            readDiagnosis: "पूर्ण निदान पढ़ें",
            diagnosis: "निदान",
            healthyPlantMessage: "आपका पौधा बहुत अच्छा दिख रहा है!",
            preventiveCare: "निवारक देखभाल",
            helpfulVideos: "उपयोगी वीडियो"
        },
        selectLanguage: "भाषा चुनें",
        recentScans: "हाल के स्कैन"
    },
};
