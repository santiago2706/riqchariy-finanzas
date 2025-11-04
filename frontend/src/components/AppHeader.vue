<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useKioscoStore } from '@/stores/useKioscoStore'
import { useAuthStore } from '@/stores/useAuthStore' // 1. Importado para el botón "Salir"

const kiosco = useKioscoStore()
const auth = useAuthStore() // 2. Inicializado para usar 'logout'

// Tu 'computed' para el día está perfecta
const day = computed(() => `Día: ${kiosco.currentDay ?? 1}`)
</script>


<template>
  <header class="w-full bg-gradient-to-r from-pink-500 via-yellow-300 to-teal-400 text-white px-6 py-3 shadow">
    <div class="max-w-6xl mx-auto flex items-center justify-between">

      <div class="flex items-center space-x-4">
        <h1 class="text-lg font-bold">Riqch’ariy Finanzas</h1>
        <span class="text-sm font-semibold bg-white/20 px-2 py-0.5 rounded">{{ day }}</span>
      </div>

      <nav class="flex items-center space-x-4">

        <router-link
          :to="{ name: 'dashboard' }"
          class="text-sm font-medium hover:text-gray-800 transition-colors"
        >
          Dashboard
        </router-link>
        <router-link
          :to="{ name: 'kiosco' }"
          class="text-sm font-medium hover:text-gray-800 transition-colors"
        >
          Kiosco
        </router-link>

        <button
          @click="auth.logout()"
          class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium"
        >
          Salir
        </button>
      </nav>

    </div>
  </header>
</template>
