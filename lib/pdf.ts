import { jsPDF } from "jspdf";
import { PlantAnalysisResult } from "@/types/plant-analysis";

export const generatePlantPDF = (data: PlantAnalysisResult) => {
    const doc = new jsPDF();
    const margin = 20;
    let y = 20;

    // Title
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text("Plantify Result", margin, y);
    y += 10;

    // Date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Scan Date: ${new Date(data.timestamp).toLocaleDateString()}`, margin, y);
    y += 15;

    // Plant Info
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(data.plant.commonName, margin, y);
    y += 7;
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text(data.plant.scientificName, margin, y);
    y += 10;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const descLines = doc.splitTextToSize(data.plant.shortDescription, 170);
    doc.text(descLines, margin, y);
    y += descLines.length * 5 + 5;

    // Health Stats
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Health Analysis", margin, y);
    y += 7;

    doc.setFontSize(12);
    if (data.healthAnalysis.status === "Critical") {
        doc.setTextColor(220, 53, 69); // Red
    } else if (data.healthAnalysis.status === "Moderate") {
        doc.setTextColor(255, 193, 7); // Orange/Yellow
    } else {
        doc.setTextColor(40, 167, 69); // Green
    }
    doc.text(`Status: ${data.healthAnalysis.status}`, margin, y);
    doc.setTextColor(0, 0, 0); // Reset
    y += 7;

    if (data.healthAnalysis.observedSymptoms.length > 0) {
        doc.setFontSize(11);
        doc.text("Observed Symptoms:", margin, y);
        y += 5;
        data.healthAnalysis.observedSymptoms.forEach((symptom) => {
            doc.text(`- ${symptom}`, margin + 5, y);
            y += 5;
        });
        y += 5;
    }

    // Zone Insights
    doc.setFontSize(14);
    doc.text("Zone Suitability", margin, y);
    y += 7;
    doc.setFontSize(11);
    doc.text(`Climates: ${data.zoneInsights.suitableClimates.join(", ")}`, margin, y);
    y += 5;
    doc.text(`Regions: ${data.zoneInsights.generalRegions.join(", ")}`, margin, y);
    y += 10;

    // Care & Treatment
    doc.setFontSize(14);
    doc.text("Care Recommendations", margin, y);
    y += 7;

    doc.setFontSize(11);
    if (data.recommendations.immediateActions.length > 0) {
        doc.text("Immediate Actions:", margin, y);
        y += 5;
        data.recommendations.immediateActions.forEach((action) => {
            const lines = doc.splitTextToSize(`- ${action}`, 160);
            doc.text(lines, margin + 5, y);
            y += lines.length * 5;
        });
        y += 5;
    }

    if (data.recommendations.careGuide && data.recommendations.careGuide.length > 0) {
        doc.text("Care Guide:", margin, y);
        y += 5;
        data.recommendations.careGuide.forEach((step: string) => {
            const lines = doc.splitTextToSize(`- ${step}`, 160);
            doc.text(lines, margin + 5, y);
            y += lines.length * 5;
        });
        y += 5;
    }

    // Disclaimer
    y += 10;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    const sidebar = doc.splitTextToSize(data.disclaimer, 170);
    doc.text(sidebar, margin, 280); // Bottom of page

    // Save
    const safeName = data.plant.commonName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const dateStr = new Date(data.timestamp).toLocaleDateString('sv'); // YYYY-MM-DD in local time
    doc.save(`Plant_Report_${safeName}_${dateStr}.pdf`);
};
