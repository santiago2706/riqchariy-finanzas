<script setup>
import AppHeader from '@/components/AppHeader.vue'
import MarketEventPopup from '@/components/MarketEventPopup.vue'
import ChatbotWindow from '@/components/ChatbotWindow.vue' // ¡Mantenerlo!
import {RouterView} from 'vue-router'
</script>

<template>
  <div id="app-container" class="min-h-screen bg-gray-100">
    <AppHeader />

    <main class="py-6">
        <RouterView />
    </main>

    <MarketEventPopup/>
    <ChatbotWindow />
  </div>
</template>

<style scoped>
/* Vacío (¡Correcto! Usamos Tailwind) */
</style>
