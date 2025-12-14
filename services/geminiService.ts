import { GoogleGenAI } from "@google/genai";
import { MOCK_ASSETS, GOVERNANCE_RULES, FINANCIAL_HISTORY } from "../constants";

const getSystemInstruction = () => {
  const assetSummary = MOCK_ASSETS.map(a => `${a.name} (${a.category}): $${a.value}`).join(', ');
  const rulesSummary = GOVERNANCE_RULES.map(r => `${r.title}: ${r.description}`).join('; ');
  
  return `
    You are the SHAHANA HERITAGE AI ADVISOR, a sophisticated governance strategist and wealth analyst for a multi-generational family office.
    
    CONTEXT:
    - This ERP manages two families: The Shahs and The Hanas.
    - Total Assets: ${assetSummary}
    - Key Governance Rules: ${rulesSummary}
    
    YOUR ROLE:
    - Provide concise, enterprise-grade advice on finance, governance, and conflict resolution.
    - Analyze risks based on the provided asset data.
    - Suggest actions that align with long-term legacy preservation.
    - If asked about "Sentiment" or "Emotional Health", act as a mediator.
    
    TONE: Professional, Wise, Strategic, Objective.
  `;
};

export const generateAdvisorResponse = async (userPrompt: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
        return "System Notification: API Key is missing. Please configure process.env.API_KEY.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: getSystemInstruction(),
        temperature: 0.7, // Balanced creativity and precision
      }
    });

    return response.text || "I was unable to generate a strategic response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Advisory System Offline. Please check connectivity or API configuration.";
  }
};