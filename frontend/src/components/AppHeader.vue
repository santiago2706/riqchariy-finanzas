<script setup>
import {computed} from 'vue'
import {useKioscoStore} from '@/stores/useKioscoStore'  // <- existe
const kiosco=useKioscoStore()
const day=computed(()=>`Día: ${kiosco.currentDay ?? 1}`)
</script>


<template>
  <header class="w-full bg-gradient-to-r from-pink-500 via-yellow-300 to-teal-400 text-white px-6 py-3 shadow">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <h1 class="text-lg font-bold">Riqch’ariy Finanzas</h1>
      <span class="text-sm font-semibold">{{ day }}</span>
    </div>
  </header>
</template>