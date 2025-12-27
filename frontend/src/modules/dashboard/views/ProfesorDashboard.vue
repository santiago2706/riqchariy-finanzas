<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { RouterLink } from 'vue-router';
// Importamos el componente base (asumimos que lo nombramos BasePanel para evitar conflictos)
import BasePanel from '@/core/components/BasePanel.vue';

const authStore = useAuthStore();
const userRole = computed(() => authStore.user?.role || 'Colegio');
const userName = computed(() => authStore.user?.name || (userRole.value === 'Colegio' ? 'Admin Central' : 'Prof. Pérez'));

// --- Datos Mock para la Jerarquía ---
const profesores = ref(['Todos', 'Prof. Pérez', 'Prof. Castro', 'Prof. García']);
const selectedProfesor = ref('Todos');
const aulas = ref(['Todas', '4to Grado A', '4to Grado B', '5to Grado A']);
const selectedAula = ref('Todos');

const aulaAvanceTotal = ref([
    // Añadimos 'patrimonioAnterior' para la nueva funcionalidad de Deterioro
    { id: 1, nombre: 'Ana Perea', nivel: 'Brote', aula: '4to Grado A', profesor: 'Prof. Pérez', patrimonio: 450, patrimonioAnterior: 400, progresoUltimaSemana: 15, calificacionIA: 'A', dia: 15 },
    { id: 2, nombre: 'Luis Torres', nivel: 'Semilla', aula: '4to Grado A', profesor: 'Prof. Pérez', patrimonio: 120, patrimonioAnterior: 160, progresoUltimaSemana: -10, calificacionIA: 'C', dia: 8 }, // 🚨 Deterioro
    { id: 3, nombre: 'María Fernández', nivel: 'Brote', aula: '4to Grado B', profesor: 'Prof. Castro', patrimonio: 320, patrimonioAnterior: 310, progresoUltimaSemana: 5, calificacionIA: 'B', dia: 12 },
    { id: 4, nombre: 'Carlos Ruiz', nivel: 'Semilla', aula: '4to Grado B', profesor: 'Prof. Castro', patrimonio: 250, patrimonioAnterior: 250, progresoUltimaSemana: 0, calificacionIA: 'B', dia: 10 },
    { id: 5, nombre: 'Elena Sosa', nivel: 'Árbol', aula: '5to Grado A', profesor: 'Prof. García', patrimonio: 900, patrimonioAnterior: 850, progresoUltimaSemana: 20, calificacionIA: 'A+', dia: 18 },
]);

// Lógica de Filtrado (Se queda igual, pero ahora más robusta)
const filteredAlumnos = computed(() => {
    let alumnos = aulaAvanceTotal.value;

    if (userRole.value === 'Profesor') {
        alumnos = alumnos.filter(a => a.profesor === userName.value);
        return alumnos;
    }
    if (selectedProfesor.value !== 'Todos') {
        alumnos = alumnos.filter(a => a.profesor === selectedProfesor.value);
    }
    if (selectedAula.value !== 'Todos') {
        alumnos = alumnos.filter(a => a.aula === selectedAula.value);
    }
    return alumnos;
});

// CLAVE: Función para detectar si el alumno está empeorando o necesita atención
const necesitaAtencion = (alumno) => alumno.progresoUltimaSemana < 0 && alumno.patrimonio < alumno.patrimonioAnterior;

const getPatrimonioClass = (patrimonio) => {
    if (patrimonio > 400) return 'bg-green-200 text-green-800 font-bold';
    if (patrimonio > 200) return 'bg-yellow-200 text-yellow-800 font-bold';
    return 'bg-red-200 text-red-800 font-bold';
};

const handleLanzarEvento = () => {
    alert(`🚨 Evento Global de Mercado lanzado por ${userName.value}. ¡Impacto Institucional activado! (Backend: marketApi.launchGlobalEvent)`);
};

const handleEnviarReto = (alumnoNombre) => {
    alert(`✅ Reto de Nivel Inicial enviado a ${alumnoNombre}. (Funcionalidad: Personalización de Lecciones)`);
};
</script>

<template>
    <div class="max-w-7xl mx-auto p-4 sm:p-6">

        <div :class="userRole === 'Colegio' ? 'bg-indigo-900' : 'bg-green-700'" class="p-6 rounded-t-xl text-white shadow-xl relative overflow-hidden">
            <!-- Decorative Background Element -->
            <div class="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 rounded-full bg-white opacity-10 blur-xl"></div>

            <div class="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 class="text-3xl font-extrabold tracking-tight">
                        <span v-if="userRole === 'Colegio'">I.E. Gran Unidad Escolar</span>
                        <span v-else>Mi Aula Virtual</span>
                    </h1>
                    <p class="mt-2 text-sm font-medium opacity-90" :class="userRole === 'Colegio' ? 'text-indigo-200' : 'text-green-200'">
                        <span v-if="userRole === 'Colegio'">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-800 text-indigo-100 mr-2">
                                📍 Región: Andes
                            </span>
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-800 text-indigo-100 mr-2">
                                🌾 Contexto: Rural
                            </span>
                             Plan SaaS: <span class="text-yellow-400 font-bold">Premium ✨</span>
                        </span>
                        <span v-else>
                            Bienvenido, {{ userName }}. Gestión del aula.
                        </span>
                    </p>
                </div>
                
                <!-- Macro Metrics (Only for Colegio) -->
                 <div v-if="userRole === 'Colegio'" class="mt-4 md:mt-0 flex space-x-4 bg-indigo-800 bg-opacity-50 p-3 rounded-lg border border-indigo-700">
                    <div class="text-center">
                        <p class="text-xs text-indigo-300 uppercase tracking-wider">Literacidad Financiera</p>
                        <p class="text-2xl font-bold text-green-400">+15% <span class="text-xs text-white mobile-hidden">vs Nac.</span></p>
                    </div>
                     <div class="border-l border-indigo-600 mx-2"></div>
                    <div class="text-center">
                        <p class="text-xs text-indigo-300 uppercase tracking-wider">Engagement</p>
                        <p class="text-2xl font-bold text-white">92%</p>
                    </div>
                </div>
            </div>
        </div>

        <BasePanel :border-class="userRole === 'Colegio' ? 'border-t-4 border-indigo-400' : 'border-t-4 border-green-400'" custom-class="rounded-t-none shadow-lg mb-8">
            <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                <div v-if="userRole === 'Colegio'" class="flex items-center space-x-3 w-full md:w-auto">
                    <select v-model="selectedProfesor" class="p-2 border border-gray-300 rounded-md">
                        <option v-for="prof in profesores" :key="prof" :value="prof">{{ prof }}</option>
                    </select>
                    <select v-model="selectedAula" class="p-2 border border-gray-300 rounded-md">
                        <option v-for="aula in aulas" :key="aula" :value="aula">{{ aula }}</option>
                    </select>
                </div>

                <button v-if="userRole === 'Colegio'"
                        @click="handleLanzarEvento"
                        class="w-full md:w-auto px-4 py-2 font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition shadow-md">
                    🚨 Lanzar Reto Interactivo GLOBAL
                </button>
            </div>
        </BasePanel>

        <div class="mt-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Avance de Estudiantes</h2>

            <div class="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-100">
                        <tr>
                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Estudiante</th>
                            <th v-if="userRole === 'Colegio'" scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Profesor</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Nivel</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Patrimonio Neto</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Alerta</th>
                            <th scope="col" class="relative py-3.5 pl-3 pr-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="alumno in filteredAlumnos" :key="alumno.id">
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{{ alumno.nombre }}</td>
                            <td v-if="userRole === 'Colegio'" class="whitespace-nowrap px-3 py-4 text-sm text-indigo-600 font-medium">{{ alumno.profesor }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ alumno.aula }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-indigo-600 font-medium">{{ alumno.nivel }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm">
                                <span :class="getPatrimonioClass(alumno.patrimonio)" class="px-2 py-0.5 rounded-full text-xs">
                                    S/ {{ alumno.patrimonio.toFixed(2) }}
                                </span>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm">
                                <span v-if="necesitaAtencion(alumno)" class="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold flex items-center">
                                    📉 Necesita Reto
                                </span>
                                <span v-else class="text-green-600">
                                    Estable
                                </span>
                            </td>

                            <td class="whitespace-nowrap px-3 py-4 text-sm font-medium space-x-2">
                                <RouterLink :to="{ name: 'avance-alumno', params: { id: alumno.id } }" class="text-indigo-600 hover:text-indigo-900">
                                    Ver Detalle
                                </RouterLink>
                                <button @click="handleEnviarReto(alumno.nombre)" class="text-purple-600 hover:text-purple-900 ml-2">
                                    Enviar Reto
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="userRole === 'Colegio'" class="mt-10 p-6 bg-white rounded-xl shadow-lg border-t-4 border-yellow-500">
            <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                🤖 YACHAQ - Módulo Estadístico Institucional
            </h2>
            <p class="text-gray-600 mb-4">
                Pregúntale a YACHAQ sobre el rendimiento del colegio, comparativas de aulas o el impacto de un reto global.
            </p>
            <textarea placeholder="Ej: ¿Qué aula tiene el peor desempeño en el módulo 'Fondo de Emergencia'?"
                      class="w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" rows="3"></textarea>
            <button class="mt-3 px-4 py-2 font-bold text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition">
                Consultar Estadísticas
            </button>
        </div>

    </div>
</template>
