<script setup>
// Importa todos los componentes necesarios para el layout
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import MarketEventPopup from '@/components/MarketEventPopup.vue'
import ChatbotWindow from '@/components/ChatbotWindow.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="game-layout-container" class="min-h-screen bg-gray-100">

    <AppHeader />
    <AppSidebar />

    <main class="pl-64 pt-16">
      <div class="py-6 px-4 sm:px-6">
        <RouterView />
      </div>
    </main>

    <MarketEventPopup />
    <ChatbotWindow />
  </div>
</template>

