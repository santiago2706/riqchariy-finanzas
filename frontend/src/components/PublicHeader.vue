<template>
  <header class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 shadow-md">
    <nav class="container mx-auto flex justify-between items-center">
      <div class="text-2xl font-bold">
        <span>Riqch'ariy Finanzas</span>
      </div>

      <div class="hidden md:flex space-x-6">
        <router-link :to="{ name: 'home' }" class="hover:text-yellow-300">Inicio</router-link>
      </div>

      <div class="hidden md:flex space-x-4">
        <router-link :to="{ name: 'login' }">
          <button class="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-150">
            Iniciar Sesión
          </button>
        </router-link>
        <router-link :to="{ name: 'register' }">
          <button class="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-600 transition duration-150">
            Registrarse
          </button>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup>
</script>
