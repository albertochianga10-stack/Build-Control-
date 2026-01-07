
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, UserProfile } from "../types";

// Always initialize with the direct process.env.API_KEY reference as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialAdvice = async (
  profile: UserProfile,
  transactions: Transaction[],
  balance: number
) => {
  // Using gemini-3-flash-preview for fast and efficient text tasks.
  const model = 'gemini-3-flash-preview';
  
  const summary = transactions.map(t => `${t.type}: ${t.amount} Kz (${t.category})`).join(', ');
  
  const prompt = `
    Atue como um consultor financeiro especialista no mercado de Angola. 
    Perfil: ${profile.name}, Atividade: ${profile.role}, Meta Mensal: ${profile.monthlyGoal} Kz.
    Saldo Atual: ${balance} Kz.
    Transações recentes: ${summary}.
    
    Gere 3 dicas financeiras curtas e 1 alerta (se necessário) focado na realidade angolana (mencione bancos como BAI ou BPC se fizer sentido). 
    Responda em Português de Angola de forma amigável e motivadora para um jovem.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array de 3 dicas financeiras."
            },
            alert: {
              type: Type.STRING,
              description: "Um alerta de gasto excessivo ou risco financeiro."
            },
            projection: {
              type: Type.STRING,
              description: "Uma breve projeção otimista baseada nos dados."
            }
          },
          required: ["tips", "alert", "projection"],
          propertyOrdering: ["tips", "alert", "projection"]
        }
      }
    });

    // Directly access the text property as a string. Do not call as a method.
    const text = response.text?.trim();
    return JSON.parse(text || '{}');
  } catch (error) {
    console.error("Erro ao obter dicas do Gemini:", error);
    return {
      tips: ["Poupe pelo menos 10% do que ganha.", "Evite compras por impulso na Mutamba.", "Use o Multicaixa Express para monitorar seu saldo."],
      alert: "Mantenha um fundo de emergência sempre disponível.",
      projection: "Se continuar assim, atingirá sua meta em breve!"
    };
  }
};