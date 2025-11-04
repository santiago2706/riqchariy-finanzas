<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const alumnoId = computed(() => route.params.id);

// Datos simulados para un solo alumno (para mostrar el detalle)
const alumno = {
    id: alumnoId.value,
    nombre: 'Ana Perea',
    nivel: 'Brote',
    diaActual: 15,
    patrimonio: 450.75,
    calificacionIA: 'A',
    lecciones: [
        { nombre: 'Fondo de Emergencia', estado: 'Completado', nota: 90 },
        { nombre: 'Costos Fijos vs. Variables', estado: 'Pendiente', nota: null },
    ],
    transacciones: [
        { dia: 14, tipo: 'Compra', producto: 'Bebida Energética', monto: -25.50 },
        { dia: 14, tipo: 'Venta', producto: 'Caramelo de Menta', monto: 15.00 },
        { dia: 15, tipo: 'Gasto Evento', producto: 'Reparación de tubería', monto: -50.00 },
    ]
};

// Lógica para dar color a la calificación
const getGradeClass = (patrimonio) => {
    if (patrimonio > 400) return 'bg-green-100 text-green-800';
    if (patrimonio > 150) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
};
</script>

<template>
    <div class="max-w-7xl mx-auto p-4 sm:p-6">

        <div class="flex justify-between items-start mb-8">
            <div>
                <h1 class="text-4xl font-extrabold text-indigo-700">
                    Avance Detallado: {{ alumno.nombre }}
                </h1>
                <p class="text-xl text-gray-600 mt-1">
                    Nivel {{ alumno.nivel }} (Día {{ alumno.diaActual }})
                </p>
            </div>
            <div class="text-right">
                <p class="text-sm font-medium text-gray-500">Patrimonio Neto</p>
                <span :class="getGradeClass(alumno.patrimonio)" class="mt-1 text-4xl font-bold px-3 py-1 rounded-lg inline-block">
                    S/ {{ alumno.patrimonio.toFixed(2) }}
                </span>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div class="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Lecciones y Notas</h2>
                <div v-for="leccion in alumno.lecciones" :key="leccion.nombre" class="mb-3 p-3 rounded-md border" :class="leccion.estado === 'Completado' ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-gray-50'">
                    <p class="font-semibold text-gray-900">{{ leccion.nombre }}</p>
                    <p class="text-sm" :class="leccion.estado === 'Completado' ? 'text-green-700' : 'text-red-600'">
                        Estado: {{ leccion.estado }} | Nota: {{ leccion.nota || 'N/A' }}
                    </p>
                </div>
                <p class="text-sm text-gray-500 mt-4">Calificación Final IA: <strong class="text-indigo-600">{{ alumno.calificacionIA }}</strong></p>
            </div>

            <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Registro de Transacciones</h2>

                <div class="space-y-2 max-h-96 overflow-y-auto">
                    <div v-for="(trans, index) in alumno.transacciones" :key="index" class="p-3 border-b flex justify-between items-center" :class="trans.tipo === 'Venta' ? 'bg-green-50' : 'bg-red-50'">
                        <div class="flex items-center space-x-3">
                            <span class="font-bold text-lg" :class="trans.tipo === 'Venta' ? 'text-green-600' : 'text-red-600'">
                                {{ trans.tipo === 'Venta' ? '+' : '-' }}S/{{ Math.abs(trans.monto).toFixed(2) }}
                            </span>
                            <span class="text-sm text-gray-700">{{ trans.producto }}</span>
                        </div>
                        <span class="text-xs text-gray-500">Día {{ trans.dia }}</span>
                    </div>
                </div>

                <p class="text-sm text-gray-500 mt-4">Este historial demuestra las decisiones del alumno en el motor del mercado.</p>
            </div>

        </div>
    </div>
</template>
