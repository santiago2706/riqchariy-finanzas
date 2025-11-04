<script setup>
import { computed } from 'vue'
import { useKioscoStore } from '@/stores/useKioscoStore'
import { useAuthStore } from '@/stores/useAuthStore'

const kiosco = useKioscoStore()
const auth = useAuthStore()

const day = computed(() => `Día: ${kiosco.currentDay ?? 1}`)
</script>


<template>
  <!--
    1. Header Simplificado.
    Ahora es 'fixed' (fijo) y 'z-40' (capa alta) para estar *siempre* visible.
    Le damos una altura fija de 'h-16'.
  -->
  <header class="w-full bg-gradient-to-r from-pink-500 via-yellow-300 to-teal-400 text-white px-6 py-3 shadow-md h-16 flex items-center justify-between z-40 fixed top-0 left-0 right-0">

    <!-- Lado Izquierdo: Título y Día -->
    <div class="flex items-center space-x-4">
      <h1 class="text-lg font-bold">Riqch’ariy Finanzas</h1>
      <span class="text-sm font-semibold bg-white/20 px-2 py-0.5 rounded">{{ day }}</span>
    </div>

    <!--
      2. ¡Navegación Eliminada!
      Quitamos los enlaces de 'Dashboard', 'Kiosco', 'Mi Aula'.
      Esos enlaces ahora vivirán en el Sidebar.
    -->
    <nav class="flex items-center space-x-4">
      <button
        @click="auth.logout()"
        class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium"
      >
        Salir
      </button>
    </nav>

  </header>
</template>
