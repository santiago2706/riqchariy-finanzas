<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useAuthStore } from '../stores/useAuthStore.js';

const authStore = useAuthStore();
const router = useRouter(); // Aunque la redirección principal es en el store, lo mantenemos por si es necesario para errores.

// 3. Variables para el formulario
const email = ref('demo@example.com'); // Usamos el valor del primer bloque
const password = ref('password123'); // Usamos el valor del primer bloque
const isLoading = ref(false);

// 4. Esta función se llama al presionar "Ingresar"
const handleLogin = async () => {
    if (!email.value || !password.value) {
        // Mejoramos la notificación para que no use alert()
        console.error('Por favor, ingresa email y contraseña');
        // Aquí podrías implementar un sistema de toast o modal para el usuario
        return;
    }

    isLoading.value = true;

    try {
        // ⚠️ LA REDIRECCIÓN AHORA ES GESTIONADA POR EL useAuthStore.js
        const success = await authStore.login(email.value, password.value);

        if (!success) {
            // Esto manejaría errores internos del store (p. ej., credenciales inválidas)
            console.error('Error al iniciar sesión. Verifica tus credenciales.');
        }
        // Si es exitoso, ¡el store ya redirigió!
    } catch (error) {
        console.error('Error de red/API durante el login:', error);
        // Mostrar un mensaje de error al usuario final
        // alert('Hubo un error de conexión. Inténtalo de nuevo.');
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

            <p class="text-sm text-center text-gray-600">
                ¿No tienes cuenta?
                <RouterLink to="/register" class="text-blue-600 hover:underline font-medium">
                    Crear cuenta
                </RouterLink>
            </p>
        </div>
    </div>
</template>
