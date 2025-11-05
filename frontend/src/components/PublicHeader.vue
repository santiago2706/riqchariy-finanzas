<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- Header a ancho completo -->
  <div class="sticky top-0 z-50">
    <!-- Barra de fondo gradiente a 100% -->
    <div class="w-full bg-gradient-to-r from-rose-400 via-amber-300 via-yellow-300 via-lime-300 to-teal-400 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.25)]">
      <!-- Contenido centrado -->
      <div class="mx-auto max-w-6xl h-16 px-4 sm:px-6 flex items-center justify-between">
        <!-- logo + nombre -->
        <RouterLink to="/" class="flex items-center gap-3">
          <span class="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-300 to-yellow-400 flex items-center justify-center shadow-lg plant-sway">
            <span class="inline-block leading-none text-[28px] md:text-[30px] translate-y-[1px] scale-[0.9]">🌱</span>
          </span>
          <span class="text-white font-extrabold text-2xl drop-shadow">Riqch’ariy Finanzas</span>
        </RouterLink>

        <!-- menú -->
        <nav class="hidden md:flex items-center gap-8">
          <RouterLink to="/" class="nav-link">Inicio</RouterLink>
          <RouterLink to="/" class="nav-link">Características</RouterLink>
          <RouterLink to="/" class="nav-link">Etapas</RouterLink>
          <RouterLink to="/" class="nav-link">Familia</RouterLink>
        </nav>

        <!-- acciones -->
        <div class="hidden md:flex items-center gap-3">
          <RouterLink to="/login" class="btn-ghost">Iniciar Sesión</RouterLink>
          <RouterLink to="/register" class="btn-primary">Registrarse</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
