<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

const authStore = useAuthStore();
const userRole = computed(() => authStore.user?.role);
const estudiantes = ref([
    { id: 1, nombre: 'Ana Perea (Brote)', seleccionado: false },
    { id: 2, nombre: 'Luis Torres (Semilla)', seleccionado: false },
    { id: 3, nombre: 'María Fernández (Árbol)', seleccionado: false },
]);

const lecciones = [
    { id: 'L01', nombre: 'Lección: Ganancia vs. Pérdida', nivel: 'Semilla', dificultad: 1 },
    { id: 'L02', nombre: 'Módulo: Costos Fijos vs. Variables', nivel: 'Brote', dificultad: 3 },
    { id: 'L03', nombre: 'Reto: Ahorro por Volumen (Cusco)', nivel: 'Brote', dificultad: 5 },
];

const retoSeleccionado = ref(lecciones[0]);
const dificultadActual = ref(retoSeleccionado.value.dificultad);
</script>

<template>
    <div class="max-w-7xl mx-auto p-4 sm:p-6">
        <h1 class="text-4xl font-extrabold text-purple-700 mb-2">
            Gestión de Retos y Personalización
        </h1>
        <p class="text-xl text-gray-600 mb-8">
            Aquí {{ userRole }} puedes ajustar la dificultad y asignar lecciones específicas a tus estudiantes.
        </p>

        <div class="md:flex md:space-x-8">

            <div class="md:w-2/3 bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500 mb-6 md:mb-0">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">1. Crear Reto Personalizado</h2>

                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Seleccionar Lección Base:</label>
                    <select v-model="retoSeleccionado" class="w-full mt-1 p-2 border rounded-md">
                        <option v-for="lec in lecciones" :key="lec.id" :value="lec">
                            {{ lec.nombre }} (Nivel {{ lec.dificultad }})
                        </option>
                    </select>
                </div>

                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700">Ajustar Dificultad (1-10):</label>
                    <input type="range" v-model.number="dificultadActual" min="1" max="10" class="w-full mt-2 cursor-pointer">
                    <div class="flex justify-between text-xs text-gray-600 mt-1">
                        <span>Fácil (1)</span>
                        <span class="font-bold text-lg text-red-600">{{ dificultadActual }}</span>
                        <span>Difícil (10)</span>
                    </div>
                    <p class="text-sm text-gray-500 mt-2">Dificultad actual del reto: **{{ dificultadActual }}** (El juego ajustará precios/eventos).</p>
                </div>

                <button class="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition">
                    Guardar Reto y Asignar
                </button>
            </div>

            <div class="md:w-1/3 bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">2. Asignar a Estudiantes</h2>
                <div class="space-y-3 max-h-80 overflow-y-auto">
                    <div v-for="est in estudiantes" :key="est.id" class="flex items-center justify-between p-2 border-b last:border-b-0">
                        <label class="text-sm font-medium text-gray-700">{{ est.nombre }}</label>
                        <input type="checkbox" v-model="est.seleccionado" class="w-5 h-5 text-indigo-600 rounded">
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
