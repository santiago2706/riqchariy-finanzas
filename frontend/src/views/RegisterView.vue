<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/useAuthStore.js'

const router = useRouter()
const authStore = useAuthStore()

// Campos del formulario
const nombre = ref('')
const apellido = ref('')
const edad = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const humanCheck = ref(false)

const isLoading = ref(false)

// Validación simple y envío
const handleRegister = async () => {
  if (!nombre.value || !apellido.value || !edad.value || !email.value || !password.value || !confirmPassword.value) {
    alert('Por favor, completa todos los campos.')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden.')
    return
  }

  if (!humanCheck.value) {
    alert('Por favor, confirma que no eres un robot.')
    return
  }

  isLoading.value = true

  try {
    // Simula registro (ajusta esto según tu API real)
    await authStore.register({
      nombre: nombre.value,
      apellido: apellido.value,
      edad: edad.value,
      email: email.value,
      password: password.value
    })

    alert('Cuenta creada exitosamente.')
    router.push('/login')
  } catch (error) {
    console.error(error)
    alert('Hubo un error al registrar el usuario.')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center text-gray-900">Crear cuenta</h2>

      <form class="space-y-6" @submit.prevent="handleRegister">
        <!-- Nombre -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            v-model="nombre"
            type="text"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Apellido -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Apellido</label>
          <input
            v-model="apellido"
            type="text"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Edad -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Edad</label>
          <input
            v-model="edad"
            type="number"
            min="0"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Gmail -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Correo Gmail</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="tucorreo@gmail.com"
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Contraseña -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Confirmar Contraseña -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
          <input
            v-model="confirmPassword"
            type="password"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Verificación humana -->
        <div class="flex items-center">
          <input
            id="humanCheck"
            type="checkbox"
            v-model="humanCheck"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label for="humanCheck" class="ml-2 text-sm text-gray-700">
            No soy un robot 🤖
          </label>
        </div>

        <!-- Botón de registrar -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
        >
          {{ isLoading ? 'Registrando...' : 'Registrarse' }}
        </button>
      </form>

      <p class="text-sm text-center text-gray-600">
        ¿Ya tienes una cuenta?
        <RouterLink to="/login" class="text-blue-600 hover:underline font-medium">
          Inicia sesión
        </RouterLink>
      </p>
    </div>
  </div>
</template>
