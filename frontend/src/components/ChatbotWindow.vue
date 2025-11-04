<script setup>
import { ref, watch, nextTick, computed, onMounted } from 'vue';
import { useChatbotStore } from '../stores/useChatbotStore';
import { useAuthStore } from '@/stores/useAuthStore';

const chat = useChatbotStore();
const authStore = useAuthStore();

const newMessage = ref('');
const chatHistory = ref(null);

// Lógica para saber si es un usuario de gestión (Profesor o Colegio)
const isManagementUser = computed(() =>
    authStore.user?.role === 'Profesor' || authStore.user?.role === 'Colegio'
);

const botTitle = computed(() =>
    isManagementUser.value ? 'Tutor de IA: Gestión de Aula' : 'Tutor de IA: Ayuda Financiera'
);

const initialMessage = computed(() =>
    isManagementUser.value
        ? "¡Hola! Soy YACHAQ. Pregúntame sobre el rendimiento del aula o las calificaciones generadas por IA."
        : "¡Hola! Soy YACHAQ. Pregúntame sobre el kiosco o las lecciones financieras."
);

// Resetea el chat si el usuario abre y no hay mensajes
onMounted(() => {
    if (chat.messages.length <= 1) {
        chat.resetChat(initialMessage.value);
    }
});


const handleSend = () => {
    const prompt = newMessage.value.trim();
    if (prompt) {
        // Añade el contexto del rol al prompt para la API
        const contextPrompt = isManagementUser.value
            ? `CONTEXTO GESTIÓN (${authStore.user?.role}): ${prompt}`
            : prompt;

        chat.sendMessage(contextPrompt);
        newMessage.value = '';
    }
};

// Hook para auto-scroll al fondo cuando llega un nuevo mensaje
watch(chat.messages, async () => {
    await nextTick();
    if (chatHistory.value) {
        chatHistory.value.scrollTop = chatHistory.value.scrollHeight;
    }
});
</script>

<template>
    <div class="fixed bottom-6 right-6 z-50">

        <Transition name="fade">
            <div v-if="chat.isOpen" class="w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col mb-4 overflow-hidden border border-gray-300">

                <header class="text-white p-3 font-bold text-center"
                    :class="isManagementUser ? 'bg-purple-600' : 'bg-indigo-600'">
                    {{ botTitle }}
                </header>

                <div ref="chatHistory" class="flex-1 p-3 space-y-3 overflow-y-auto bg-gray-50">
                    <div v-for="msg in chat.messages" :key="msg.id" :class="msg.sender === 'bot' ? 'chat-bot justify-start flex' : 'chat-user justify-end flex'">
                        <span class="px-3 py-2 rounded-lg shadow-md max-w-[80%]"
                            :class="msg.sender === 'bot' ? 'bg-white text-gray-800' : (isManagementUser ? 'bg-purple-500 text-white' : 'bg-indigo-500 text-white')">
                            {{ msg.text }}
                        </span>
                    </div>
                    <div v-if="chat.isLoading" class="chat-bot justify-start flex">
                        <span class="px-3 py-2 rounded-lg shadow-md bg-white text-gray-800 italic">
                            Escribiendo...
                        </span>
                    </div>
                </div>

                <form @submit.prevent="handleSend" class="flex p-2 border-t bg-white">
                    <input
                        v-model="newMessage"
                        type="text"
                        placeholder="Pregunta sobre la lección o el avance..."
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        :disabled="chat.isLoading"
                    />
                    <button type="submit"
                        class="px-4 py-2 text-white rounded-r-md font-bold hover:bg-indigo-700 transition duration-150"
                        :class="isManagementUser ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'"
                        :disabled="chat.isLoading || !newMessage">
                        Enviar
                    </button>
                </form>
            </div>
        </Transition>

        <button @click="chat.toggleChat" class="w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-white transition duration-300 mt-4"
            :class="isManagementUser ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
        </button>
    </div>
</template>

