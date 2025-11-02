// Archivo: frontend/src/services/chatbotApi.js

/**
 * Simula una consulta a un modelo de IA.
 * @param {string} prompt La pregunta del estudiante.
 */
export const fetchBotResponse = async (prompt) => {
  console.log(`[Chatbot API Sim]: Recibido: "${prompt}"`);

  // Simulamos un retraso de red
  await new Promise(resolve => setTimeout(resolve, 1000));

  let response = "No entendí tu pregunta. ¿Puedes reformularla?";

  if (prompt.toLowerCase().includes('hola')) {
    response = "¡Hola! Soy tu tutor de Riqch'ariy. ¿En qué lección financiera puedo ayudarte hoy?";
  }
  if (prompt.toLowerCase().includes('costo')) {
    response = "El 'costo' es lo que tú pagas por un producto. El 'precio' es por lo que lo vendes. ¡La diferencia es tu ganancia!";
  }

  console.log(`[Chatbot API Sim]: Respondiendo: "${response}"`);
  return { success: true, message: response };
};
