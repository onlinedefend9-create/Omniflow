import { GoogleGenAI, Type } from "@google/genai";
import { Platform } from "@shared/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const platformInstructions: Record<string, string> = {
  tiktok: "TikTok: Hook puissant, langage parlé, hashtags viraux, texte court.",
  instagram_reel: "Instagram Reel: Accroche visuelle, ton dynamique, hashtags pertinents.",
  instagram_feed: "Instagram Feed: Esthétique, engageant, mix d'emojis.",
  x: "X (Twitter): Concis, percutant, punchy, limite 280 caractères.",
  linkedin: "LinkedIn: Professionnel, éducatif, structuré, aéré.",
  threads: "Threads: Décontracté, conversationnel, invitant à la discussion.",
  facebook: "Facebook: Amical, informatif, encourageant le partage.",
  whatsapp: "WhatsApp: Court, direct, avec emojis, prêt à être transféré.",
  telegram: "Telegram: Informatif, peut être plus long, utilise des listes à puces."
};

export async function generatePlatformVariations(masterCaption: string) {
  const model = "gemini-3-flash-preview";
  
  const prompt = `Tu es un expert en stratégie de contenu multi-plateforme. 
  Prends l'idée de base suivante : "${masterCaption}"
  
  Génère des variantes adaptées spécifiquement pour chaque plateforme :
  - TikTok
  - Instagram Reel
  - Instagram Feed
  - X (Twitter)
  - LinkedIn
  - Threads
  - Facebook
  - WhatsApp
  - Telegram
  
  Respecte les codes de chaque réseau :
  ${Object.values(platformInstructions).join('\n')}
  
  Retourne le résultat au format JSON uniquement.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tiktok: { type: Type.OBJECT, properties: { text: { type: Type.STRING }, hashtags: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["text"] },
          instagram_reel: { type: Type.OBJECT, properties: { text: { type: Type.STRING }, hashtags: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["text"] },
          instagram_feed: { type: Type.OBJECT, properties: { text: { type: Type.STRING }, hashtags: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["text"] },
          x: { type: Type.OBJECT, properties: { text: { type: Type.STRING } }, required: ["text"] },
          linkedin: { type: Type.OBJECT, properties: { text: { type: Type.STRING } }, required: ["text"] },
          threads: { type: Type.OBJECT, properties: { text: { type: Type.STRING } }, required: ["text"] },
          facebook: { type: Type.OBJECT, properties: { text: { type: Type.STRING } }, required: ["text"] },
          whatsapp: { type: Type.OBJECT, properties: { text: { type: Type.STRING } }, required: ["text"] },
          telegram: { type: Type.OBJECT, properties: { text: { type: Type.STRING } }, required: ["text"] },
        },
        required: ["tiktok", "instagram_reel", "instagram_feed", "x", "linkedin", "threads", "facebook", "whatsapp", "telegram"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Erreur lors de la génération du contenu.");
  }
}
