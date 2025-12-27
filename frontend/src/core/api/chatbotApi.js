// src/services/chatbotApi.js
import apiClient from "./apiClient";

/**
 * Consulta al modelo de IA adaptativo (YACHAQ)
 * @param {string} prompt Texto o pregunta del usuario
 */
export const fetchBotResponse = async (prompt) => {
  try {
    const response = await apiClient.post("/api/chatbot", { prompt });
    return response.data; // { success, message }
  } catch (error) {
    console.error("Error al conectar con el chatbot:", error);
    return { success: false, message: "Error al obtener respuesta del servidor" };
  }
};
