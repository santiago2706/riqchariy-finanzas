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
const generalError = ref(null) // Para errores generales (Ej: Usuario ya existe, contraseñas no coinciden)
const validationErrors = ref({}) // Para errores de Pydantic 422

// NUEVOS CAMPOS CLAVE
const role = ref('Estudiante') // Valor inicial
const region = ref('Lima (Costa)') // ✅ CORRECCIÓN: Usamos el nombre completo como default para coincidir con el backend
const colegioName = ref('')

// Lógica de validación
const isEstudiante = computed(() => role.value === 'Estudiante')
const isColegio = computed(() => role.value === 'Colegio')

// Helper para obtener errores específicos de Pydantic por campo
const getError = (field) => validationErrors.value[field]


// --- FUNCIÓN DE REGISTRO ---
const handleRegister = async () => {
    // Resetear errores
    generalError.value = null
    validationErrors.value = {}

    // 1. VALIDACIONES DE CAMPOS BÁSICOS (Frontend)
    if (!nombre.value || !email.value || !password.value || !confirmPassword.value) {
        generalError.value = 'Por favor, completa todos los campos requeridos.'
        return;
    }
    if (password.value !== confirmPassword.value) {
        generalError.value = 'Las contraseñas no coinciden.';
        return;
    }
    if (!humanCheck.value) {
        generalError.value = 'Por favor, confirma que no eres un robot.';
        return;
    }
    if (isColegio.value && !colegioName.value) {
        generalError.value = 'El perfil Colegio requiere el nombre del Colegio.';
        return;
    }

    isLoading.value = true

    try {
        // 2. LLAMADA AL STORE (Capturando la respuesta)
        const result = await authStore.register({
            nombre: nombre.value,
            apellido: apellido.value,
            // Si no es estudiante, enviamos 0. El campo 'edad' es obligatorio en el modelo User
            edad: isEstudiante.value ? edad.value : 0,
            gmail: email.value, // ✅ IMPORTANTE: El backend usa 'gmail', no 'email'
            password: password.value,
            role: role.value,
            region: region.value,
            // No enviamos 'colegioName' al backend ya que no está en el modelo User, es solo para el frontend
        })

        // 3. MANEJO DE LA RESPUESTA DEL STORE
        if (result.success) {
            console.log('✅ Cuenta creada exitosamente. Redirigiendo a Login.');
            // El store ya maneja la redirección, pero aseguramos el flujo
            router.push('/login');
        } else {
            // El store devolvió { success: false, errors: [...] } por 422 o 400

            if (result.errors && Array.isArray(result.errors)) {
                // Es un error de Pydantic (422)
                result.errors.forEach(err => {
                    // La ubicación del error (loc) nos da el nombre del campo
                    const fieldName = err.loc ? err.loc[err.loc.length - 1] : 'general';
                    validationErrors.value[fieldName] = err.msg;
                });
                generalError.value = 'Por favor, corrige los errores en los campos marcados.';

            } else if (result.message) {
                // Es un error 400 (Ej: "El usuario ya existe") o un error de conexión
                generalError.value = result.message;
            } else {
                generalError.value = 'Ocurrió un error desconocido durante el registro.';
            }
        }

    } catch (error) {
        // Esto solo capturaría errores de red muy graves que Axios no maneje bien
        generalError.value = 'Error de conexión con el servidor.';
        console.error('Error de red/catch:', error);
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-xl">
            <h2 class="text-3xl font-bold text-center text-gray-900">Crear Cuenta Riqch'ariy</h2>

            <div v-if="generalError" class="p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
                {{ generalError }}
            </div>

            <form class="space-y-6" @submit.prevent="handleRegister">

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


                <div>
                    <label class="block text-sm font-medium text-gray-700">Nombre</label>
                    <input v-model="nombre" type="text" required class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                    <p v-if="getError('nombre')" class="mt-1 text-xs text-red-500">{{ getError('nombre') }}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Apellido</label>
                    <input v-model="apellido" type="text" required class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                    <p v-if="getError('apellido')" class="mt-1 text-xs text-red-500">{{ getError('apellido') }}</p>
                </div>

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
                    <p v-if="getError('edad')" class="mt-1 text-xs text-red-500">{{ getError('edad') }}</p>
                </div>

                <div v-if="!isColegio">
                    <label class="block text-sm font-medium text-gray-700">Región de Juego</label>
                    <select
                        v-model="region"
                        class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="Lima (Costa)">Lima (Costa)</option>
                        <option value="Cusco (Sierra)">Cusco (Sierra)</option>
                        <option value="Iquitos (Selva)">Iquitos (Selva)</option>
                    </select>
                    <p v-if="getError('region')" class="mt-1 text-xs text-red-500">{{ getError('region') }}</p>
                </div>

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

                <div>
                    <label class="block text-sm font-medium text-gray-700">Correo (Gmail)</label>
                    <input v-model="email" type="email" required placeholder="tucorreo@gmail.com" class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                    <p v-if="getError('gmail')" class="mt-1 text-xs text-red-500">El correo es inválido o: {{ getError('gmail') }}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input v-model="password" type="password" required class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                    <p v-if="getError('password')" class="mt-1 text-xs text-red-500">{{ getError('password') }}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                    <input v-model="confirmPassword" type="password" required class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                </div>

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
