
import { GoogleGenAI } from "@google/genai";
import { AssetCategory } from "../types";

const getAssetAnalysis = async (assetName: string, assetSymbol: string, category: AssetCategory): Promise<string> => {
    // A new GoogleGenAI instance should be created for each call
    // to ensure the most up-to-date API key is used.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Provide a concise market analysis for the ${category} asset: ${assetName} (${assetSymbol}). 
    Include the following sections in your response, using markdown for formatting:
    - **Recent Performance**: Briefly describe its recent price action.
    - **Key Drivers**: What factors are currently influencing its price?
    - **Short-Term Outlook**: What is the potential outlook for the near future?
    
    Keep the analysis brief, professional, and suitable for an investor looking for a quick summary. Do not include any investment advice.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching Gemini analysis:", error);
        return "An error occurred while fetching the analysis. Please try again later.";
    }
};

export { getAssetAnalysis };
