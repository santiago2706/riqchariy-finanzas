<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';

const authStore = useAuthStore();
const userName = computed(() => authStore.user?.name || 'Administrador Central');

// Definición de los "botones" de reportes
const reportes = [
    { title: 'Comparativa por Docente', description: 'Rendimiento promedio de patrimonio y calificaciones por cada profesor.', icon: '🧑‍🏫', route: { name: 'reporte-profesores' } },
    { title: 'Análisis de Aulas', description: 'Identifica los grupos con el mayor y menor avance pedagógico. Monitoreo por aula.', icon: '🏫', route: { name: 'reporte-aulas' } },
    { title: 'Impacto de Retos', description: 'Evalúa cómo los Retos Personalizados afectan el rendimiento del estudiante.', icon: '📈', route: { name: 'reporte-retos' } },
    { title: 'Distribución de Calificaciones', description: 'Consistencia de las notas generadas por la IA (Pato) a nivel institucional.', icon: '⭐', route: { name: 'reporte-ia' } },
];
</script>

<template>
    <div class="max-w-7xl mx-auto p-4 sm:p-6">

        <div class="bg-blue-800 p-6 rounded-t-xl text-white shadow-xl">
            <h1 class="text-3xl font-extrabold">Módulo de Estadísticas Centrales</h1>
            <p class="mt-1 text-blue-200">
                Bienvenido, {{ userName }}. Análisis de datos para decisiones estratégicas.
            </p>
        </div>

        <div class="bg-white p-6 rounded-b-xl shadow-lg mb-8 border-t-4 border-blue-400">
            <p class="text-xl font-semibold text-gray-700 mb-6">
                Selecciona un informe para iniciar el análisis:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="reporte in reportes" :key="reporte.title"
                     class="group bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition duration-300 cursor-pointer shadow-md">

                    <span class="text-4xl block mb-2">{{ reporte.icon }}</span>
                    <h3 class="text-lg font-bold text-gray-800 group-hover:text-blue-700">{{ reporte.title }}</h3>
                    <p class="text-sm text-gray-500 mt-1">{{ reporte.description }}</p>

                    <button class="mt-4 text-blue-600 font-semibold text-sm group-hover:text-blue-800">
                        Generar Reporte &rarr;
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
