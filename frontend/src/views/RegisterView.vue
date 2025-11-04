<script setup>
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/useAuthStore.js'

const router = useRouter()
const authStore = useAuthStore()

// --- ESTADO DEL FORMULARIO ---
const nombre = ref('')
const apellido = ref('')
const edad = ref(12) // Default para Estudiante
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const humanCheck = ref(false)
const isLoading = ref(false)

// NUEVOS CAMPOS CLAVE
const role = ref('Estudiante') // Valor inicial
const region = ref('Lima')
const colegioName = ref('')

// Lógica de validación
const isEstudiante = computed(() => role.value === 'Estudiante')
const isColegio = computed(() => role.value === 'Colegio')


// --- FUNCIÓN DE REGISTRO ---
const handleRegister = async () => {
    // 1. VALIDACIONES DE CAMPOS BÁSICOS
    if (!nombre.value || !email.value || !password.value || !confirmPassword.value) {
        // En lugar de alert(), usamos console.log o un mensaje en la UI
        console.error('Por favor, completa todos los campos.');
        return;
    }
    if (password.value !== confirmPassword.value) {
        console.error('Las contraseñas no coinciden.');
        return;
    }
    if (!humanCheck.value) {
        console.error('Por favor, confirma que no eres un robot.');
        return;
    }
    if (isColegio.value && !colegioName.value) {
        console.error('El perfil Colegio requiere el nombre del Colegio.');
        return;
    }

    isLoading.value = true

    try {
        // 2. LLAMADA AL STORE (enviando el rol y la región)
        await authStore.register({
            nombre: nombre.value,
            apellido: apellido.value,
            edad: isEstudiante.value ? edad.value : undefined, // Solo Estudiantes tienen edad
            email: email.value,
            password: password.value,
            role: role.value,
            region: region.value,
            colegioName: isColegio.value ? colegioName.value : undefined
        })

        // El store ya maneja la redirección a /login
        console.log('Cuenta creada exitosamente.');
        router.push('/login');
    } catch (error) {
        console.error('Hubo un error al registrar el usuario:', error);
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-xl">
            <h2 class="text-3xl font-bold text-center text-gray-900">Crear Cuenta Riqch'ariy</h2>

            <form class="space-y-6" @submit.prevent="handleRegister">

                <!-- 1. CAMPO ROL (Lo más importante) -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Tipo de Perfil</label>
                    <select
                        v-model="role"
                        class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="Estudiante">Estudiante</option>
                        <option value="Profesor">Profesor</option>
                        <option value="Colegio">Colegio (Administrador)</option>
                    </select>
                </div>


                <!-- Campos Comunes -->
                <!-- Nombre y Apellido... (El código HTML es el mismo que tenías) -->
                <div><label class="block text-sm font-medium text-gray-700">Nombre</label><input v-model="nombre" type="text" required class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/></div>
                <div><label class="block text-sm font-medium text-gray-700">Apellido</label><input v-model="apellido" type="text" required class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/></div>

                <!-- 2. CAMPO EDAD (Solo para Estudiantes) -->
                <div v-if="isEstudiante">
                    <label class="block text-sm font-medium text-gray-700">Edad del Estudiante (7-17)</label>
                    <input
                        v-model.number="edad"
                        type="number"
                        min="7"
                        max="17"
                        required
                        class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <!-- 3. CAMPO REGIÓN (Para Estudiante/Profesor, clave para el juego) -->
                <div v-if="!isColegio">
                    <label class="block text-sm font-medium text-gray-700">Región de Juego</label>
                    <select
                        v-model="region"
                        class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="Lima">Lima (Costa)</option>
                        <option value="Cusco">Cusco (Sierra)</option>
                        <option value="Iquitos">Iquitos (Selva)</option>
                    </select>
                </div>

                <!-- 4. CAMPO NOMBRE COLEGIO (Solo para Colegios/Admin) -->
                <div v-if="isColegio">
                    <label class="block text-sm font-medium text-gray-700">Nombre Oficial del Colegio</label>
                    <input
                        v-model="colegioName"
                        type="text"
                        required
                        class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                        placeholder="Ej: I.E.P. Sol de Brote"
                    />
                </div>

                <!-- Campos de Correo y Contraseña... (El código HTML es el mismo) -->
                <div><label class="block text-sm font-medium text-gray-700">Correo (Gmail)</label><input v-model="email" type="email" required placeholder="tucorreo@gmail.com" class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/></div>
                <div><label class="block text-sm font-medium text-gray-700">Contraseña</label><input v-model="password" type="password" required class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/></div>
                <div><label class="block text-sm font-medium text-gray-700">Confirmar Contraseña</label><input v-model="confirmPassword" type="password" required class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/></div>

                <!-- Verificación humana y Botón -->
                <div class="flex items-center"><input id="humanCheck" type="checkbox" v-model="humanCheck" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/><label for="humanCheck" class="ml-2 text-sm text-gray-700">No soy un robot 🤖</label></div>

                <button type="submit" :disabled="isLoading" class="w-full px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400">
                    {{ isLoading ? 'Registrando...' : 'Registrarse' }}
                </button>
            </form>

            <p class="text-sm text-center text-gray-600">
                ¿Ya tienes una cuenta? <RouterLink to="/login" class="text-blue-600 hover:underline font-medium">Inicia sesión</RouterLink>
            </p>
        </div>
    </div>
</template>
