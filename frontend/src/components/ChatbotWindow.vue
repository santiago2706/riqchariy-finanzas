<template>
  <div class="fixed bottom-6 right-6 z-50">

    <Transition name="fade">
      <div v-if="chat.isOpen" class="w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col mb-4 overflow-hidden border border-gray-300">

        <header class="bg-indigo-600 text-white p-3 font-bold text-center">
          Tutor de IA Riqch'ariy
        </header>

        <div ref="chatHistory" class="flex-1 p-3 space-y-3 overflow-y-auto bg-gray-50">
          <div v-for="msg in chat.messages" :key="msg.id" :class="msg.sender === 'bot' ? 'chat-bot' : 'chat-user'">
            <span class="px-3 py-2 rounded-lg shadow-md" :class="msg.sender === 'bot' ? 'bg-white text-gray-800' : 'bg-indigo-500 text-white'">
              {{ msg.text }}
            </span>
          </div>
          <div v-if="chat.isLoading" class="chat-bot">
             <span class="px-3 py-2 rounded-lg shadow-md bg-white text-gray-800 italic">
               Escribiendo...
             </span>
          </div>
        </div>

        <form @submit.prevent="handleSend" class="flex p-2 border-t bg-white">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Escribe tu lección..."
            class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            :disabled="chat.isLoading"
          />
          <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-r-md font-bold hover:bg-indigo-700" :disabled="chat.isLoading">
            Enviar
          </button>
        </form>
      </div>
    </Transition>

    <button @click="chat.toggleChat" class="w-16 h-16 bg-indigo-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-indigo-700 transition duration-300">
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
      </svg>
    </button>

  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { useChatbotStore } from '../stores/useChatbotStore';

const chat = useChatbotStore();
const newMessage = ref('');
const chatHistory = ref(null); // Referencia al div del historial

const handleSend = () => {
  const prompt = newMessage.value.trim();
  if (prompt) {
    chat.sendMessage(prompt);
    newMessage.value = '';
  }
};

// Hook para auto-scroll al fondo
watch(chat.messages, async () => {
  await nextTick(); // Espera a que el DOM se actualice
  if (chatHistory.value) {
    chatHistory.value.scrollTop = chatHistory.value.scrollHeight;
  }
});
</script>

<style scoped>
/* Transición simple de Vue para 'fade' */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Estilos de Tailwind "inline" para las burbujas de chat */
.chat-bot {
  @apply flex justify-start;
}
.chat-user {
  @apply flex justify-end;
}
</style>
