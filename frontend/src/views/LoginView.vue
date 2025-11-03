<script setup>
import { ref } from 'vue';
// 1. Importamos el cerebro de Autenticación
import { useAuthStore } from '../stores/useAuthStore.js';
// 2. Importamos el router para redirigir después del login
import { useRouter, RouterLink } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

// 3. Creamos variables (estado local) para el formulario
const email = ref('admin@test.com'); // Pre-llenado para pruebas rápidas
const password = ref('123456'); // Pre-llenado para pruebas rápidas
const isLoading = ref(false);

// 4. Esta función se llama al presionar "Ingresar"
const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert('Por favor, ingresa email y contraseña');
    return;
  }

  isLoading.value = true;

  try {
    await authStore.login(email.value, password.value);
    // Redirigimos manualmente al dashboard si quieres forzar navegación
    router.push('/dashboard');
  } catch (error) {
    console.error(error);
    alert('Error al iniciar sesión. Verifica tus credenciales.');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center text-gray-900">
        Bienvenido a Riqch'ariy
      </h2>

      <form class="space-y-6" @submit.prevent="handleLogin">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            v-model="password"
            id="password"
            type="password"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {{ isLoading ? 'Cargando...' : 'Ingresar' }}
        </button>
      </form>

      <!-- Enlace para registrarse -->
      <p class="text-sm text-center text-gray-600">
        ¿No tienes cuenta?
        <RouterLink to="/register" class="text-blue-600 hover:underline font-medium">
          Crear cuenta
        </RouterLink>
      </p>
    </div>
  </div>
</template>