// Archivo: frontend/src/stores/useChatbotStore.js

import { ref } from 'vue';
import { defineStore } from 'pinia';
// Usaremos la importación del primer bloque, asumiendo que es la más precisa
import { fetchBotResponse } from '../services/chatbotApi.js';

// Generador simple de ID para mensajes
let messageId = 0;

export const useChatbotStore = defineStore('chatbot', () => {

    // --- ESTADO ---
    const isOpen = ref(false);
    const isLoading = ref(false);

    // Inicializamos messages como un array vacío, ya que usaremos resetChat en onMounted
    const messages = ref([]);

    // --- ACCIONES ---

    function toggleChat() {
        isOpen.value = !isOpen.value;
    }

    // Acción para reiniciar el historial, usada al montar el componente ChatbotWindow
    function resetChat(initialMessage) {
        messages.value = [{
            id: messageId++,
            sender: 'bot',
            text: initialMessage || "¡Hola! Soy tu tutor de IA. Pregúntame sobre el juego o las lecciones."
        }];
    }

    async function sendMessage(prompt) {
        if (!prompt || isLoading.value) return;

        isLoading.value = true;

        // 1. Añade el mensaje del usuario (usando el generador de ID)
        messages.value.push({ id: messageId++, text: prompt, sender: 'user' });

        try {
            // 2. Llama a la API
            const response = await fetchBotResponse(prompt);

            // 3. Añade la respuesta del bot (usando el generador de ID)
            messages.value.push({
                id: messageId++,
                text: response.message,
                sender: 'bot'
            });

        } catch (error) {
            console.error("Error al contactar al chatbot:", error);
            messages.value.push({
                id: messageId++,
                text: "Lo siento, estoy teniendo problemas de conexión con el Tutor IA (YACHAQ).",
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
        resetChat // ¡Añadido!
    };
});
