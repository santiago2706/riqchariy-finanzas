// Archivo: frontend/src/stores/useChatbotStore.js

import { ref } from 'vue';
import { defineStore } from 'pinia';
// Usaremos la importación del primer bloque, asumiendo que es la más precisa
import { fetchBotResponse } from '../services/chatbotApi.js';

// Generador simple de ID para mensajes
let messageId = 0;

export const useChatbotStore = defineStore('chatbot', () => {

    // --- CONFIGURACIÓN DEL BOT ---
    // Usamos 'bot' como sender para el frontend, pero este es el nombre visible.
    const VISIBLE_BOT_NAME = 'Pato';
    // Nombre del bot usado anteriormente en mensajes genéricos/de error.
    const LEGACY_BOT_NAME = 'YACHAQ';

    // --- ESTADO ---
    const isOpen = ref(false);
    const isLoading = ref(false);

    // Inicializamos messages como un array vacío, ya que usaremos resetChat en onMounted
    // Cada mensaje debe tener { id, sender: 'user' | 'bot', text }
    const messages = ref([]);

    // --- ACCIONES ---

    function toggleChat() {
        isOpen.value = !isOpen.value;
    }

    /**
     * Acción para reiniciar el historial.
     * Recibe un mensaje inicial contextualizado desde el componente.
     */
    function resetChat(initialMessage) {
        // Si no se proporciona un mensaje, usamos un default que incluye el nombre del bot.
        const defaultMessage = `¡Hola! Soy ${VISIBLE_BOT_NAME}, tu tutor financiero. ¿En qué lección puedo ayudarte hoy?`;

        messages.value = [{
            id: messageId++,
            sender: 'bot',
            text: initialMessage || defaultMessage
        }];
    }

    async function sendMessage(prompt) {
        if (!prompt || isLoading.value) return;

        isLoading.value = true;

        // 1. Añade el mensaje del usuario (usando el generador de ID)
        messages.value.push({ id: messageId++, text: prompt, sender: 'user' });

        try {
            // 2. Llama a la API (Asumimos que fetchBotResponse devuelve { message: string })
            const response = await fetchBotResponse(prompt);

            // 3. Añade la respuesta del bot (usando el generador de ID)
            messages.value.push({
                id: messageId++,
                text: response.message,
                sender: 'bot'
            });

        } catch (error) {
            console.error("Error al contactar al chatbot:", error);
            // Mensaje de error actualizado para usar el nuevo nombre VISIBLE_BOT_NAME
            messages.value.push({
                id: messageId++,
                text: `Lo siento, estoy teniendo problemas de conexión con el Tutor IA (${VISIBLE_BOT_NAME}).`,
                sender: 'bot'
            });
        } finally {
            isLoading.value = false;
        }
    }

    // --- DEVOLUCIÓN ---
    return {
        isOpen,
        isLoading,
        messages,
        toggleChat,
        sendMessage,
        resetChat
    };
});
