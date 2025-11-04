<script setup>
import AppHeader from '@/components/AppHeader.vue' // Este es tu header del juego
import MarketEventPopup from '@/components/MarketEventPopup.vue'
import ChatbotWindow from '@/components/ChatbotWindow.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="game-layout-container" class="min-h-screen bg-gray-100">
    <AppHeader />

    <main class="py-6">
      <RouterView /> </main>

    <MarketEventPopup />
    <ChatbotWindow />
  </div>
</template>
