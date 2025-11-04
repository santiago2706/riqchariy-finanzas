<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';

// Obtenemos la instancia del store
const authStore = useAuthStore();

onMounted(() => {
    // 1. Ejecuta la función initialize() del useAuthStore.
    // Esto carga el 'user' y el 'token' guardados en localStorage
    // APENAS arranca la aplicación, antes de que se cargue la primera ruta.
    authStore.initialize();
});
</script>

<template>
  <RouterView />
</template>
