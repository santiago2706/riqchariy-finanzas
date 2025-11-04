/**
 * Simula una consulta a un modelo de IA adaptativo (YACHAQ).
 * Incorpora lógica adaptativa basada en el prompt y simula la respuesta de la API.
 * * @param {string} prompt La pregunta del usuario, que puede incluir contexto de rol.
 * @returns {Promise<{success: boolean, message: string}>} El objeto de respuesta de la API.
 */
export const fetchBotResponse = async (prompt) => {
    console.log(`[Chatbot API Sim]: Recibido: "${prompt}"`);

    // Simulamos un retraso de red (0.8 segundos)
    await new Promise(resolve => setTimeout(resolve, 800));

    // --- LÓGICA DE RESPUESTA ADAPTATIVA ---
    let message = "No entendí tu pregunta. Pregúntame sobre el juego, el avance de un alumno o las lecciones.";

    // 1. CONTEXTO DE GESTIÓN (Profesor/Colegio)
    if (prompt.includes('CONTEXTO GESTIÓN')) {
        if (prompt.toLowerCase().includes('avance') || prompt.toLowerCase().includes('calificacion')) {
            message = "El estudiante Ana Perea (Nivel Brote) tiene un Patrimonio Neto de S/450, su última lección fue 'Ahorro por Volumen', y su calificación general es 'A'. Su punto débil es la resiliencia ante pérdidas.";
        } else if (prompt.toLowerCase().includes('general') || prompt.toLowerCase().includes('aula')) {
            message = "El avance general del aula es de 5.4 en la escala de madurez financiera. El 70% de los estudiantes ha superado el Reto del Sol 'Fondo de Emergencia'.";
        } else {
            message = "Estoy aquí para ayudarte con métricas y avance de tus alumnos. ¿Deseas un resumen de calificaciones?";
        }
    }
    // 2. CONTEXTO DEL JUEGO (Estudiante)
    else {
        if (prompt.toLowerCase().includes('hola')) {
            message = "¡Hola! Soy YACHAQ, tu tutor. Estoy listo para ayudarte con el kiosco, el presupuesto o tus lecciones.";
        } else if (prompt.toLowerCase().includes('costo') || prompt.toLowerCase().includes('precio')) {
            message = "El **costo** es lo que pagas para comprar el producto. El **precio** es lo que el cliente paga para comprarte. ¡La diferencia es la clave!";
        } else if (prompt.toLowerCase().includes('demanda')) {
            message = "La demanda indica qué tan popular es un producto en tu región. Si la demanda es **alta**, puedes venderlo más rápido, pero ten cuidado con la competencia.";
        }
    }

    console.log(`[Chatbot API Sim]: Respondiendo: "${message}"`);

    // Devolvemos el formato de objeto estándar
    return { success: true, message: message };
};
