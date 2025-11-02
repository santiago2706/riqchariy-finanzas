// Archivo: frontend/src/stores/useChatbotStore.js

import { ref } from 'vue';
import { defineStore } from 'pinia';
import { fetchBotResponse } from '../services/chatbotApi.js';

export const useChatbotStore = defineStore('chatbot', () => {

    // --- ESTADO ---
    // El estado 'isOpen' controla si la ventana del chat es visible
    const isOpen = ref(false);
    // 'isLoading' muestra el "Escribiendo..."
    const isLoading = ref(false);
    // 'messages' es el historial del chat
    const messages = ref([
        {
          id: 0,
          text: "¡Hola! Soy tu tutor de IA. Pregúntame sobre el juego o las lecciones.",
          sender: 'bot'
        }
    ]);

    // --- ACCIONES ---

    function toggleChat() {
        isOpen.value = !isOpen.value;
    }

    async function sendMessage(prompt) {
        if (!prompt || isLoading.value) return;

        isLoading.value = true;

        // 1. Añade el mensaje del usuario
        messages.value.push({ id: Date.now(), text: prompt, sender: 'user' });

        try {
            // 2. Llama a la API simulada
            const response = await fetchBotResponse(prompt);

            // 3. Añade la respuesta del bot
            messages.value.push({ id: Date.now() + 1, text: response.message, sender: 'bot' });

        } catch (error) {
            console.error("Error al contactar al chatbot:", error);
            messages.value.push({
                id: Date.now() + 1,
                text: "Lo siento, estoy teniendo problemas de conexión.",
                sender: 'bot'
            });
        } finally {
            isLoading.value = false;
        }
    }

    return {
        isOpen,
        isLoading,
        messages,
        toggleChat,
        sendMessage
    };
});
