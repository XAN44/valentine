import { GoogleGenAI } from "@google/genai";

export const generateLovePoem = async (): Promise<string> => {
  try {
    // Check if API key exists. In a real app, handle this gracefully.
    // For this demo, we assume the environment is set up correctly as per instructions.
    if (!process.env.API_KEY) {
      console.warn("API Key missing");
      return "ความรักของเรานั้นสวยงามเกินคำบรรยาย... (กรุณาใส่ API Key เพื่อให้ AI แต่งกลอนให้)";
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "แต่งกลอนวันวาเลนไทน์ ภาษาไทย สั้นๆ ซึ้งๆ 4-6 บรรทัด เกี่ยวกับความรักที่ยั่งยืนเหมือน Infinity และความน่ารักของแฟน",
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Speed over deep reasoning for a simple poem
      }
    });

    return response.text || "สุขสันต์วันวาเลนไทน์ รักเธอที่สุดในโลก!";
  } catch (error) {
    console.error("Error generating poem:", error);
    return "แม้ระบบจะขัดข้อง แต่ความรักของเค้าที่มีให้เธอไม่มีวันขัดข้องนะ :) สุขสันต์วันวาเลนไทน์";
  }
};