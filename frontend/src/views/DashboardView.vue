<template>
  <div class="max-w-6xl mx-auto p-4 sm:p-6 font-sans">
    <h1 class="text-4xl font-extrabold text-blue-700 mb-8">
      Panel de Control (DASHBOARD)
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500">
        <p class="text-sm font-medium text-gray-500">Efectivo Disponible</p>
        <p class="mt-1 text-3xl font-bold text-indigo-700">
          ${{ kiosco.saldo.toFixed(2) }}
        </p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
        <p class="text-sm font-medium text-gray-500">Valor del Inventario (al Costo)</p>
        <p class="mt-1 text-3xl font-bold text-yellow-700">
          ${{ kiosco.inventoryValue.toFixed(2) }}
        </p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
        <p class="text-sm font-medium text-gray-500">PATRIMONIO NETO</p>
        <p class="mt-1 text-4xl font-extrabold text-green-700">
          ${{ kiosco.netWorth.toFixed(2) }}
        </p>
      </div>
    </div>

    <hr class="my-10 border-gray-200">

    <p class="text-lg text-gray-600">Aquí se mostrarán Gráficos de Demanda y la Historia de Transacciones (futuras funcionalidades).</p>

  </div>
</template>

<script setup>
import { useKioscoStore } from '../stores/useKioscoStore';

// Solo necesitamos cargar el store para obtener los datos
const kiosco = useKioscoStore();
</script>
