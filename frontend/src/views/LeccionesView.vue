<script setup>
import { ref, onMounted } from 'vue';
import BasePanel from '@/components/BasePanel.vue';
// Asumimos que BasePanel está disponible

// --- ESTADO DE LA APLICACIÓN ---

// Lista estática de todas las lecciones disponibles (de la Versión 2)
const lessons = ref([
    { id: 1, title: 'Ganancia, Gasto y Pérdida', level: 'Semilla', status: 'Activo', color: 'indigo', content: 'La Ganancia es cuando te entra más dinero del que gastas. El Gasto es todo el dinero que sale. La Pérdida ocurre cuando el gasto es mayor que la ganancia. Ejemplo: Si vendes 5 soles y compras 7 soles en caramelos, tienes una pérdida de 2 soles.' },
    { id: 2, title: 'El Riesgo Inesperado', level: 'Brote', status: 'Inicia', color: 'blue', content: 'El fondo de emergencia es crucial. Sin él, un gasto inesperado puede llevarte a la quiebra. Analizaremos escenarios de riesgo.' },
    { id: 3, title: 'La Competencia', level: 'Semilla', status: 'Completado', color: 'gray', content: 'Foco pedagógico: La oferta y la demanda. Entiende cómo los precios de tus productos se ven afectados por lo que venden otros.' },
    { id: 4, title: 'Interés Compuesto', level: 'Árbol', status: 'Pendiente', color: 'red', content: 'El interés compuesto es la octava maravilla del mundo. Aprende a usarlo para que tu dinero crezca exponencialmente a lo largo del tiempo.' },
]);

// La lección seleccionada actualmente (Inicialmente la primera)
const activeTopic = ref(lessons.value[0]);

// Estado para el resumen IA
const iaSummary = ref('Generando resumen...');
const isLoading = ref(true);

// --- LÓGICA DE INTERACCIÓN ---

// 1. Simulación de la función de la IA (Backend) para resumir el documento
const fetchSummaryFromIA = async (content) => {
    isLoading.value = true;
    // Simulación de la llamada a la API
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulación de la respuesta de la IA (adaptada al contenido actual)
    const summary = `**Resumen de YACHAQ:** Para el nivel **${activeTopic.value.level}**, la lección sobre "${activeTopic.value.title}" enfatiza: ${content.substring(0, 80)}... La clave es la disciplina en el ahorro y la inversión.`;

    isLoading.value = false;
    return summary;
};

// Función para cambiar la lección activa
const selectLesson = async (lesson) => {
    activeTopic.value = lesson;
    iaSummary.value = await fetchSummaryFromIA(lesson.content);
};

// --- CICLO DE VIDA ---
onMounted(async () => {
    // Generar el resumen para la lección activa inicial al cargar
    iaSummary.value = await fetchSummaryFromIA(activeTopic.value.content);
});
</script>

<template>
    <div class="max-w-7xl mx-auto p-4 sm:p-6">

        <h1 class="text-4xl font-extrabold text-gray-800 mb-2">
            📚 Catálogo de Lecciones (Nivel: **{{ activeTopic.level }}**)
        </h1>
        <p class="text-xl text-gray-600 mb-8">
            Aquí podrás acceder al contenido interactivo adaptado a tu Nivel, directamente desde la base de datos de lecciones.
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <BasePanel border-class="border-t-4 border-indigo-500" custom-class="lg:col-span-1">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Temas Disponibles</h2>
                <div class="space-y-2">
                    <div v-for="lesson in lessons" :key="lesson.id"
                         @click="selectLesson(lesson)"
                         :class="{ 'bg-indigo-100 border-indigo-300': lesson.id === activeTopic.id,
                                   'bg-gray-50 border-gray-200': lesson.id !== activeTopic.id }"
                         class="p-3 border rounded-lg cursor-pointer transition duration-150 hover:shadow-md">

                        <p class="font-semibold" :class="{'text-indigo-800': lesson.id === activeTopic.id, 'text-gray-700': lesson.id !== activeTopic.id}">
                            {{ lesson.title }}
                        </p>
                        <p class="text-xs text-gray-600">
                             Nivel: {{ lesson.level }} | Estado: **{{ lesson.status }}**
                        </p>
                    </div>
                </div>
            </BasePanel>

            <div class="lg:col-span-2">
                <BasePanel border-class="border-t-4 border-green-500" custom-class="mb-6">
                    <h2 class="text-2xl font-bold text-green-700 mb-3">Documento: {{ activeTopic.title }}</h2>
                    <p class="text-gray-700 mb-4">{{ activeTopic.content }}</p>
                </BasePanel>

                <BasePanel border-class="border-t-4 border-yellow-500">
                    <h2 class="text-2xl font-bold text-yellow-700 mb-3">🤖 Tutor YACHAQ: Resumen IA</h2>
                    <div v-if="isLoading" class="p-3 bg-yellow-100 rounded-lg text-yellow-800">
                        <div class="animate-pulse">Generando resumen...</div>
                    </div>
                    <div v-else class="p-3 bg-yellow-100 rounded-lg">
                        <p class="text-gray-800" v-html="iaSummary"></p>
                    </div>
                </BasePanel>
            </div>

        </div>
    </div>
</template>
