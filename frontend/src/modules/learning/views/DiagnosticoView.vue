<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// Importamos el store para asignar el nivel
import { useAuthStore } from '@/modules/auth/store/useAuthStore';

const router = useRouter();
const authStore = useAuthStore();

const edad = ref(authStore.user?.edad || 11); // Usa la edad del registro como default
const respuesta1 = ref('');
const isLoading = ref(false);

// Lógica simple para asignar nivel por edad
function asignarNivel(edad) {
    if (edad >= 14) return 'Arbol'; // 14+ años
    if (edad >= 11) return 'Brote'; // 11-13 años
    return 'Semilla'; // 7-10 años
}

async function completarDiagnostico() {
    isLoading.value = true;

    // 1. Determinar nivel por edad/respuestas
    const nivelAsignado = asignarNivel(edad.value);

    // 2. Asignar y guardar el nivel en el Store
    try {
        // Llama a la acción que guarda el nivel localmente y en localStorage
        authStore.assignLevel(nivelAsignado);
        console.log(`Diagnóstico completado. Nivel asignado: ${nivelAsignado}`);

    } catch (error) {
        console.error("Error al asignar el nivel:", error);
    } finally {
        isLoading.value = false;
    }

    // 3. 🚨 Lógica de Redirección Específica por Nivel 🚨
    if (nivelAsignado === 'Brote') {
        // Redirige al módulo específico de Nivel Brote (Planificación)
        router.push({ name: 'presupuesto-brote' });
    } else if (nivelAsignado === 'Semilla') {
        // Redirige al módulo específico de Nivel Semilla (Lecciones)
        router.push({ name: 'lecciones-semilla' });
    } else {
        // Nivel Árbol o cualquier otro caso (Redirección al dashboard general)
        router.push({ name: 'dashboard' });
    }
}
</script>

<template>
    <div class="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
        <h1 class="text-3xl font-extrabold text-indigo-700 mb-6">
            Carga Inicial y Diagnóstico
        </h1>
        <p class="text-gray-600 mb-8">
            Responde estas preguntas para que podamos asignarte un nivel de aprendizaje adaptativo (Semilla, Brote o Árbol).
        </p>

        <form @submit.prevent="completarDiagnostico" class="space-y-6">

            <div>
                <label for="edad" class="block text-lg font-medium text-gray-700 mb-2">
                    ¿Cuál es tu edad? (7-17 años)
                </label>
                <input
                    v-model.number="edad"
                    type="number"
                    min="7"
                    max="17"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label for="q1" class="block text-lg font-medium text-gray-700 mb-2">
                    Si ganas S/10 y gastas S/12, ¿tienes una ganancia o una pérdida? (Nivel Semilla)
                </label>
                <select
                    v-model="respuesta1"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Selecciona una opción</option>
                    <option value="ganancia">Ganancia</option>
                    <option value="perdida">Pérdida</option>
                </select>
            </div>

            <button
                type="submit"
                :disabled="isLoading || !respuesta1"
                class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition duration-150"
            >
                {{ isLoading ? 'Analizando...' : 'Comenzar mi Aventura' }}
            </button>
        </form>
    </div>
</template>
