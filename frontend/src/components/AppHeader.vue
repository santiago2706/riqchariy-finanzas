<script setup>
import { computed } from 'vue'

// ⛔️ ¡Cerebro Equivocado!
// import { useKioscoStore } from '@/stores/useKioscoStore'
// const kiosco = useKioscoStore()

// ✅ ¡Este es el Cerebro Correcto (El Economista)!
import { useMarketStore } from '@/services/useMarketStore'

// Usamos el 'market' store
const market = useMarketStore()

// Leemos el 'day' (el reloj) del market store
const day = computed(() => `Día: ${market.day ?? 1}`)
</script>

<template>
 <header class="w-full bg-gradient-to-r from-pink-500 via-yellow-300 to-teal-400 text-white px-6 py-3 shadow">
   <div class="max-w-6xl mx-auto flex items-center justify-between">
   <h1 class="text-lg font-bold">Riqch’ariy Finanzas</h1>
    <span class="text-sm font-semibold">{{ day }}</span>
  </div>
  </header>
</template>
