<script setup>
import AppHeader from '@/components/AppHeader.vue'
import MarketEventPopup from '@/components/MarketEventPopup.vue'
import ChatbotWindow from '@/components/ChatbotWindow.vue' // <-- 1. IMPORTA EL CHATBOT
import {RouterView} from 'vue-router'
</script>

<template>
  <!-- 2. Añadimos un div contenedor con clases de Tailwind -->
  <div id="app-container" class="min-h-screen bg-gray-100">
    <AppHeader />

    <!-- 3. Añadimos un tag <main> para el contenido principal -->
    <main class="py-6">
        <RouterView />
    </main>

    <!-- 4. AÑADE EL CHATBOT AQUÍ (fuera de <main> para que flote) -->
    <MarketEventPopup/>
    <ChatbotWindow />
  </div>
</template>

<style scoped>
/* Vacío (¡Correcto! Usamos Tailwind) */
</style>
