<template>
  <div class="max-w-4xl mx-auto p-4 sm:p-6 font-sans">
    <h1 class="text-3xl font-bold text-gray-800">¡Este es el Kiosco!</h1>
    <p class="text-lg">Tu saldo: <strong class="text-indigo-600">${{ kiosco?.saldo?.toFixed(2) }}</strong></p>
    <div class="my-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
      <strong class="font-bold text-yellow-800">⚙️ Verificación del Motor de Mercado:</strong>
      <p class="text-sm">Día actual: {{ market?.day }}</p>
      <button
        @click="onAdvanceDay"
        class="mt-2 bg-blue-600 text-white py-1 px-3 rounded-md cursor-pointer hover:bg-blue-700 text-sm font-medium"
      >
        Forzar Avance de Día
      </button>
    </div>
    <div class="my-5">
      <button
        @click="onEndDay"
        :disabled="transaction?.isLoading"
        class="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-red-700 disabled:bg-gray-400"
      >
        {{ transaction?.isLoading ? 'Guardando...' : 'Terminar Día y Guardar Progreso' }}
      </button>
    </div>
    <div
      v-if="market && market.marketEvent"
      class="my-4 p-4 bg-blue-100 text-blue-800 rounded-lg shadow-md"
    >
      <h3 class="font-bold">¡Evento del Mercado!</h3>
      <p>{{ market.marketEvent.message }}</p>
    </div>
    <hr class="my-6 border-gray-300">
    <div v-if="kiosco?.isLoading" class="text-center p-8">
      <p class="text-lg font-medium text-gray-600">Cargando productos...</p>
    </div>
    <div v-else-if="market?.products?.length > 0">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Nuestros Productos (Región: Lima)</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="product in market.products" :key="product.id" class="bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-md flex flex-col justify-between">
          <span class="text-lg font-semibold text-gray-700 mb-3">{{ product.name }}</span>
          <div class="text-sm text-gray-500 mb-4">
            <small>Costo de Compra:</small>
            <strong class="text-lg text-red-600 block">${{ product.cost.toFixed(2) }}</strong>
          </div>
          <button
            @click="kiosco?.buyProduct(product, 1)"
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Comprar 1
          </button>
        </div>
      </div>
    </div>
    <div v-else class="p-4 bg-red-100 text-red-800 rounded-lg">
      <p>No se encontraron productos para esta región.</p>
    </div>
    <hr class="my-6 border-gray-300">
    <section class="inventory-section mt-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Tu Inventario (Venta)</h2>
      <div v-if="kiosco?.inventory?.length > 0" class="flex flex-col gap-3">
        <div v-for="item in kiosco.inventory" :key="item.product.id" class="flex justify-between items-center p-3 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
          <div class="flex items-center space-x-3">
            <strong class="text-gray-800 text-lg">{{ item.product.name }}</strong>
            <span class="bg-yellow-300 text-yellow-900 font-extrabold px-3 py-1 rounded-full text-sm">x{{ item.quantity }}</span>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <small class="text-gray-500 block leading-tight">Precio de Venta:</small>
              <strong class="text-green-600 text-xl">${{ item.product.price.toFixed(2) }}</strong>
            </div>
            <button
              @click="kiosco?.sellProduct(item, 1)"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Vender 1
            </button>
          </div>
        </div>
      </div>
      <div v-else class="p-4 bg-blue-100 text-blue-800 rounded-lg">
        <p>¡Inventario vacío! Compra algo para empezar a jugar.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, shallowRef } from 'vue';
import { useKioscoStore } from '../stores/useKioscoStore';
import { useMarketStore } from '../services/useMarketStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useTransactionStore } from '../stores/useTransactionStore';

const kiosco = shallowRef(null);
const auth = shallowRef(null);
const market = shallowRef(null);
const transaction = shallowRef(null);

onMounted(() => {
  kiosco.value = useKioscoStore();
  auth.value = useAuthStore();
  market.value = useMarketStore();
  transaction.value = useTransactionStore();

  console.log("Forzando carga de productos para Lima...");
  kiosco.value.loadProducts('Lima');

  if (market.value && market.value.startGameLoop) {
    market.value.startGameLoop();
  }
});

function onAdvanceDay(){
  if (market.value && market.value.advanceDay) {
    market.value.advanceDay();
  } else {
    console.error("Market store no está listo o no tiene advanceDay.");
  }
}

async function onEndDay(){
  if (transaction.value && transaction.value.endDayAndSave) {
    await transaction.value.endDayAndSave();
    console.log(`Día guardado.`);
  } else {
    console.error("Transaction store no está listo o no tiene endDayAndSave.");
  }
}
</script>
