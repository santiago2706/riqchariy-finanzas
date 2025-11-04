<script setup>
// Importamos RouterLink para usarlo en los botones de "Registrarme"
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- Contenedor principal de la página -->
  <div class="bg-white">

    <!-- Sección 1: "Hero" (El encabezado principal de tu diseño) -->
    <section class="bg-gradient-to-r from-green-300 via-cyan-400 to-blue-500 text-white text-center py-20 px-4">

      <!-- Título y Subtítulo -->
      <h1 class="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
        Educación Financiera que Crece con tus Hijos
      </h1>
      <p class="text-xl md:text-2xl mb-10 max-w-3xl mx-auto drop-shadow-md">
        El primer ecosistema adaptativo del Perú que transforma la educación financiera en una
        aventura familiar desde los 6 hasta los 17 años.
      </p>

      <!-- Botón especial "Gratuito" -->
      <div class="inline-block bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-bold py-3 px-6 rounded-full shadow-lg mb-12">
        ✨ Totalmente Gratuito - Sin Costo Alguno ✨
      </div>

      <!-- Tarjetas de "Prueba Social" (los óvalos) -->
      <div class="flex flex-wrap justify-center gap-6 mb-12">
        <div class="bg-white bg-opacity-30 backdrop-blur-sm rounded-full px-6 py-3 text-lg font-medium shadow">
          🌟 11 años de aprendizaje continuo
        </div>
        <div class="bg-white bg-opacity-30 backdrop-blur-sm rounded-full px-6 py-3 text-lg font-medium shadow">
          🚀 9 niveles progresivos
        </div>
        <div class="bg-white bg-opacity-30 backdrop-blur-sm rounded-full px-6 py-3 text-lg font-medium shadow">
          🤖 IA personalizada
        </div>
      </div>

      <!-- Botones de Acción (¡Usando Rutas Nombradas!) -->
      <div class="flex justify-center gap-6">
        <!-- El botón "Registrarme" ahora usa la ruta nombrada 'register' -->
        <router-link :to="{ name: 'register' }">
          <button class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-xl py-4 px-10 rounded-full shadow-lg hover:scale-105 transition-transform">
            Registrarme Ahora
          </button>
        </router-link>
        <button class="bg-gradient-to-r from-green-400 to-cyan-500 text-white font-bold text-xl py-4 px-10 rounded-full shadow-lg hover:scale-105 transition-transform">
          Conocer Más
        </button>
      </div>
    </section>

    <!-- Sección 2: "¿Por qué Riqch'ariy es diferente?" -->
    <section class="py-20 px-4 text-center">
      <h2 class="text-4xl font-bold text-gray-800 mb-6">
        ¿Por qué Riqch'ariy es diferente?
      </h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Un ecosistema completo diseñado para evolucionar con cada etapa del desarrollo de tus hijos
      </p>
      <!-- Aquí puedes añadir más contenido, como tarjetas de características -->
    </section>

  </div>
</template>
