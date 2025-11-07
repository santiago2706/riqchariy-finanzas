<script setup>
import { ref, watch, nextTick, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useChatbotStore } from '../stores/useChatbotStore';
import { useAuthStore } from '@/stores/useAuthStore';

// 🚨 ARREGLO 1: Importamos la imagen de Pato. Usaremos 'PatoAvatarUrl' para diferenciar
// que es la URL de la imagen que se usa en el template.
import PatoAvatarUrl from '@/assets/images/pato-chatbot-avatar.png';

// --- Inicialización de Stores y Hooks ---
const chat = useChatbotStore();
const authStore = useAuthStore();
const route = useRoute();

// --- Estado local ---
const newMessage = ref('');
const chatHistory = ref(null);

// --- Computed Props ---

// Lógica para saber si es un usuario de gestión (Profesor/Colegio)
const isManagementUser = computed(() =>
    authStore.user?.role === 'Profesor' || authStore.user?.role === 'Colegio'
);

// Título contextualizado
const botTitle = computed(() =>
    isManagementUser.value ? 'Pato: Gestión de Aula' : 'Pato: Ayuda Financiera'
);


// Mensaje inicial basado en la RUTA o el ROL
const initialMessage = computed(() => {
    if (isManagementUser.value) {
        return "¡Hola! Soy YACHAQ. Pregúntame sobre el rendimiento del aula o las calificaciones generadas por IA.";
    }

    switch (route.name) {
        case 'presupuesto-brote':
            return "¡Bienvenido al Módulo Presupuesto! Tu misión es planificar los Costos Fijos y Variables antes de que el evento comience. Recuerda: ¡el flujo de caja es la clave!";
        case 'kiosco':
            return "¡Hora del Kiosco! Aquí aprenderás Ganancia vs. Gasto. Recuerda: Compra el producto más barato (Costo) y véndelo más caro (Precio). ¡Ese es el margen!";
        case 'lecciones-semilla':
            return "¡Hola! Este módulo te enseña los conceptos base: Necesidad vs. Deseo. Pregúntame sobre el 'Cerdo Ahorrador'.";
        default:
            return "¡Hola! Soy YACHAQ, tu tutor. ¿En qué lección financiera puedo ayudarte hoy?";
    }
});


// --- Lógica de Contextualización y Ciclo de Vida ---

onMounted(() => {
    chat.resetChat(initialMessage.value);
});

watch(() => route.name, () => {
    if (chat.isOpen) {
        chat.resetChat(initialMessage.value);
    }
});


// --- Lógica de Envío de Mensajes ---

const handleSend = () => {
    const prompt = newMessage.value.trim();
    if (prompt) {
        const contextPrompt = isManagementUser.value
            ? `CONTEXTO GESTIÓN (${authStore.user?.role}): ${prompt}`
            : `CONTEXTO RUTA (${route.name}): ${prompt}`;

        chat.sendMessage(contextPrompt);
        newMessage.value = '';
    }
};

// --- Lógica de Auto-Scroll ---
const scrollToBottom = () => {
    if (chatHistory.value) {
        chatHistory.value.scrollTop = chatHistory.value.scrollHeight;
    }
};

watch(() => chat.messages.length, () => {
    nextTick(scrollToBottom);
});

</script>

<template>
    <div class="fixed bottom-6 right-6 z-50">

        <Transition name="fade">
            <div v-if="chat.isOpen" class="w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col mb-4 overflow-hidden border border-gray-300">

                <header class="p-3 font-bold flex items-center justify-between text-white"
                    :class="isManagementUser ? 'bg-purple-600' : 'bg-indigo-600'">

                    <div class="flex items-center">
                        <img :src="PatoAvatarUrl" alt="Pato Chatbot Avatar" class="w-8 h-8 rounded-full mr-2 object-cover border border-white">
                        <h3 class="font-bold text-base">{{ botTitle }}</h3>
                    </div>

                    <button @click="chat.toggleChat" class="text-white hover:text-gray-200">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </header>

                <div ref="chatHistory" class="flex-1 p-3 space-y-3 overflow-y-auto bg-gray-50">
                    <div v-for="msg in chat.messages" :key="msg.id" :class="msg.sender === 'bot' ? 'chat-bot justify-start flex' : 'chat-user justify-end flex'">
                        <span class="px-3 py-2 rounded-lg shadow-md max-w-[80%]"
                            :class="msg.sender === 'bot' ? 'bg-white text-gray-800' : (isManagementUser ? 'bg-purple-500 text-white' : 'bg-indigo-500 text-white')">
                            <span v-html="msg.text"></span>
                        </span>
                    </div>
                    <div v-if="chat.isLoading" class="chat-bot justify-start flex">
                        <span class="px-3 py-2 rounded-lg shadow-md bg-white text-gray-800 italic animate-pulse">
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
                        class="px-4 py-2 text-white rounded-r-md font-bold transition duration-150"
                        :class="isManagementUser ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'"
                        :disabled="chat.isLoading || !newMessage">
                        Enviar
                    </button>
                </form>
            </div>
        </Transition>

        <button @click="chat.toggleChat"
                class="w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-white transition duration-300 mt-4 overflow-hidden"
                :class="isManagementUser ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'">

            <img :src="PatoAvatarUrl" alt="Pato Chatbot Avatar"
                 class="w-full h-full object-cover"
                 v-if="!chat.isOpen">

            <svg v-else class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    </div>
</template>

<style scoped>
/* Transición simple para la ventana */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
