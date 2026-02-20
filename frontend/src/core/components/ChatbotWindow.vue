<script setup>
import { ref, watch, nextTick, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useChatbotStore } from '@/stores/useChatbotStore';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';

import PatoAvatarUrl from '@/assets/images/pato-chatbot-avatar.png';

// --- Inicialización de Stores y Hooks ---
const chat = useChatbotStore();
const authStore = useAuthStore();
const route = useRoute();

// --- Estado local ---
const newMessage = ref('');
const chatHistory = ref(null);

// --- Dark Mode Reactivo ---
const isDark = ref(false);
let observer = null;

const checkDarkMode = () => {
    isDark.value = document.documentElement.classList.contains('dark-mode');
};

onMounted(() => {
    checkDarkMode();
    observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });
});

onUnmounted(() => {
    if (observer) observer.disconnect();
});

// --- Computed Props ---

const isManagementUser = computed(() =>
    authStore.user?.role === 'Profesor' || authStore.user?.role === 'Colegio'
);

const botTitle = computed(() =>
    isManagementUser.value ? 'Pato: Gestión de Aula' : 'Pato: Ayuda Financiera'
);

// Mensaje inicial basado en la RUTA o el ROL
const initialMessage = computed(() => {
    if (isManagementUser.value) {
        return "¡Hola! Soy Pato. Pregúntame sobre el rendimiento del aula o las calificaciones generadas por IA.";
    }

    switch (route.name) {
        case 'presupuesto-brote':
            return "¡Bienvenido al Módulo Presupuesto! Tu misión es planificar los Costos Fijos y Variables antes de que el evento comience. Recuerda: ¡el flujo de caja es la clave!";
        case 'kiosco':
            return "¡Hora del Kiosco! Aquí aprenderás Ganancia vs. Gasto. Recuerda: Compra el producto más barato (Costo) y véndelo más caro (Precio). ¡Ese es el margen!";
        case 'lecciones-semilla':
            return "¡Hola! Este módulo te enseña los conceptos base: Necesidad vs. Deseo. Pregúntame sobre el 'Cerdo Ahorrador'.";
        default:
            return "¡Hola! Soy Pato, tu tutor. ¿En qué lección financiera puedo ayudarte hoy?";
    }
});

// --- Clases dinámicas para Dark Mode ---

const windowClasses = computed(() => isDark.value
    ? 'chatbot-window bg-dark border-dark'
    : 'chatbot-window bg-light border-light'
);

const headerClasses = computed(() => {
    const base = isManagementUser.value ? 'bg-purple-600' : 'bg-indigo-600';
    return base;
});

const historyClasses = computed(() => isDark.value
    ? 'chat-history bg-history-dark'
    : 'chat-history bg-history-light'
);

const botBubbleClasses = computed(() => isDark.value
    ? 'bubble bubble-bot-dark'
    : 'bubble bubble-bot-light'
);

const userBubbleClasses = computed(() => {
    const color = isManagementUser.value ? 'bg-purple-500' : 'bg-indigo-500';
    return `bubble ${color} text-white`;
});

const inputAreaClasses = computed(() => isDark.value
    ? 'chat-input-area input-area-dark'
    : 'chat-input-area input-area-light'
);

const inputClasses = computed(() => isDark.value
    ? 'chat-input input-dark'
    : 'chat-input input-light'
);

const sendBtnClasses = computed(() => {
    const color = isManagementUser.value ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700';
    return `send-btn ${color}`;
});

const fabClasses = computed(() => {
    const color = isManagementUser.value ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700';
    const darkExtra = isDark.value ? 'fab-dark' : '';
    return `chatbot-fab ${color} ${darkExtra}`;
});

const typingClasses = computed(() => isDark.value
    ? 'bubble bubble-bot-dark italic animate-pulse'
    : 'bubble bubble-bot-light italic animate-pulse'
);


// --- Lógica de Contextualización y Ciclo de Vida ---

onMounted(() => {
    // --- Saludo al iniciar sesión (solo 1 vez por sesión) ---
    if (authStore.user && !sessionStorage.getItem('chatbot_greeted')) {
        const userName = authStore.user.name?.split(' ')[0] || 'Estudiante';
        sessionStorage.setItem('chatbot_greeted', 'true');
        setTimeout(() => {
            chat.greetUser(userName);
        }, 1500);
    } else {
        chat.resetChat(initialMessage.value);
    }
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
            <div v-if="chat.isOpen" :class="windowClasses">

                <header class="chatbot-header p-3 font-bold flex items-center justify-between text-white"
                    :class="headerClasses">

                    <div class="flex items-center">
                        <img :src="PatoAvatarUrl" alt="Pato Chatbot Avatar" class="w-8 h-8 rounded-full mr-2 object-cover border border-white">
                        <h3 class="font-bold text-base">{{ botTitle }}</h3>
                    </div>

                    <button @click="chat.toggleChat" class="text-white hover:text-gray-200 close-btn">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </header>

                <div ref="chatHistory" :class="historyClasses">
                    <div v-for="msg in chat.messages" :key="msg.id" :class="msg.sender === 'bot' ? 'chat-bot justify-start flex' : 'chat-user justify-end flex'">
                        <span class="px-3 py-2 rounded-lg shadow-md max-w-[80%]"
                            :class="msg.sender === 'bot' ? botBubbleClasses : userBubbleClasses">
                            <span v-html="msg.text"></span>
                        </span>
                    </div>
                    <div v-if="chat.isLoading" class="chat-bot justify-start flex">
                        <span class="px-3 py-2 rounded-lg shadow-md" :class="typingClasses">
                            Escribiendo...
                        </span>
                    </div>
                </div>

                <form @submit.prevent="handleSend" :class="inputAreaClasses">
                    <input
                        v-model="newMessage"
                        type="text"
                        placeholder="Pregunta sobre la lección o el avance..."
                        :class="inputClasses"
                        :disabled="chat.isLoading"
                    />
                    <button type="submit"
                        class="px-4 py-2 text-white rounded-r-md font-bold transition duration-150"
                        :class="sendBtnClasses"
                        :disabled="chat.isLoading || !newMessage">
                        Enviar
                    </button>
                </form>
            </div>
        </Transition>

        <button @click="chat.toggleChat"
                :class="fabClasses">

            <img :src="PatoAvatarUrl" alt="Pato Chatbot Avatar"
                 class="w-full h-full object-cover"
                 v-if="!chat.isOpen">

            <svg v-else class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    </div>
</template>

<style scoped>
/* ===== TRANSICIONES ===== */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* ===== VENTANA CHATBOT ===== */
.chatbot-window {
  width: 22rem;
  height: 26rem;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: background-color 0.3s, border-color 0.3s;
}

/* Light */
.bg-light {
  background-color: #ffffff;
}
.border-light {
  border: 1px solid #d1d5db;
}

/* Dark */
.bg-dark {
  background-color: #1e293b;
}
.border-dark {
  border: 1px solid #334155;
}

/* ===== HEADER ===== */
.chatbot-header {
  flex-shrink: 0;
}

/* ===== HISTORIAL ===== */
.chat-history {
  flex: 1;
  padding: 0.75rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: background-color 0.3s;
}

.bg-history-light {
  background-color: #f9fafb;
}

.bg-history-dark {
  background-color: #0f172a;
}

/* ===== BURBUJAS ===== */
.bubble {
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  word-wrap: break-word;
  transition: background-color 0.3s, color 0.3s;
}

.bubble-bot-light {
  background-color: #ffffff;
  color: #1f2937;
}

.bubble-bot-dark {
  background-color: #334155;
  color: #f1f5f9;
}

/* ===== INPUT AREA ===== */
.chat-input-area {
  display: flex;
  padding: 0.5rem;
  flex-shrink: 0;
  transition: background-color 0.3s, border-color 0.3s;
}

.input-area-light {
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
}

.input-area-dark {
  background-color: #1e293b;
  border-top: 1px solid #475569;
}

.chat-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem 0 0 0.375rem;
  outline: none;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
}

.input-light {
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  color: #1f2937;
}

.input-light:focus {
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.4);
  border-color: #6366f1;
}

.input-dark {
  background-color: #334155;
  border: 1px solid #475569;
  color: #f1f5f9;
}

.input-dark::placeholder {
  color: #64748b;
}

.input-dark:focus {
  box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.3);
  border-color: #7c3aed;
}

/* ===== SEND BUTTON ===== */
.send-btn {
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 0 0.375rem 0.375rem 0;
  font-weight: 700;
  transition: all 0.15s;
  border: none;
  cursor: pointer;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ===== FAB BUTTON ===== */
.chatbot-fab {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s;
  margin-top: 1rem;
  overflow: hidden;
  border: none;
  cursor: pointer;
}

.chatbot-fab:hover {
  transform: scale(1.1);
  box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.4);
}

.fab-dark {
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.5),
              0 0 15px rgba(124, 58, 237, 0.3);
}

/* ===== CLOSE BUTTON ===== */
.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

/* ===== SCROLLBAR ===== */
.chat-history::-webkit-scrollbar {
  width: 6px;
}

.chat-history::-webkit-scrollbar-track {
  background: transparent;
}

.chat-history::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 3px;
}

.bg-history-dark::-webkit-scrollbar-thumb {
  background: #475569;
}
</style>
