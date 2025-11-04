<script setup>
import { ref } from 'vue';

const presupuestoTotal = ref(500);
const costoFijo = ref(150);
const costoVariable = ref(50);
const metaAhorro = ref(100);
</script>

<template>
    <div class="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-6">

        <h1 class="text-4xl font-extrabold text-blue-600 mb-4">
            🌻 Nivel Brote: Módulo Presupuesto (Mi Gran Evento)
        </h1>
        <p class="text-xl text-gray-600 mb-8">
            Planifica tu presupuesto para un evento escolar. Aprende a gestionar tus Costos Fijos y Variables.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div class="p-6 bg-red-50 rounded-xl border border-red-200">
                <h3 class="text-xl font-bold text-red-800 mb-3">Costos Fijos</h3>
                <p class="text-3xl font-extrabold text-red-600 mb-3">S/ {{ costoFijo }}</p>
                <p class="text-sm text-gray-600">Gastos que no cambian (Ej: Permiso de local).</p>
                <button class="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-red-600">Añadir Gasto Fijo</button>
            </div>

            <div class="p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                <h3 class="text-xl font-bold text-yellow-800 mb-3">Costos Variables</h3>
                <p class="text-3xl font-extrabold text-yellow-600 mb-3">S/ {{ costoVariable }}</p>
                <p class="text-sm text-gray-600">Gastos que varían con la producción (Ej: Comida extra).</p>
                <button class="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-yellow-600">Añadir Gasto Variable</button>
            </div>

            <div class="p-6 bg-green-50 rounded-xl border border-green-200">
                <h3 class="text-xl font-bold text-green-800 mb-3">Meta de Ahorro</h3>
                <p class="text-3xl font-extrabold text-green-600 mb-3">S/ {{ metaAhorro }}</p>
                <p class="text-sm text-gray-600">Objetivo para lograr a mediano plazo (Ej: Comprar una mejor pizarra).</p>
                <button class="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-600">Establecer Meta</button>
            </div>
        </div>

    </div>
</template>
