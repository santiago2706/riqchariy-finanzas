<template>
  <div class="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-xl rounded-lg font-sans">
    <h1 class="text-3xl font-extrabold text-green-600 border-b-2 border-gray-200 pb-3 mb-6">
      ¡Este es el Kiosco!
    </h1>
    <p class="text-xl mb-6">
      Tu saldo: <strong class="text-indigo-700">${{ kiosco.saldo.toFixed(2) }}</strong>
    </p>

    <hr class="my-8 border-gray-300">

    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-green-500 pl-3">
        Mercado (Compra)
      </h2>

      <div v-if="kiosco.isLoading" class="p-4 bg-yellow-100 text-yellow-800 rounded-lg">
        <p>Cargando productos...</p>
      </div>

      <div v-else-if="kiosco.products.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="product in kiosco.products" :key="product.id" class="bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-md flex flex-col justify-between transition duration-300 hover:shadow-lg">
          <span class="text-lg font-semibold text-gray-700 mb-3">{{ product.name }}</span>
          <div class="text-sm text-gray-500 mb-4">
            <small>Costo de Compra:</small>
            <strong class="text-lg text-red-600 block">${{ product.cost.toFixed(2) }}</strong>
          </div>
          <button @click="kiosco.buyProduct(product, 1)" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200">
            Comprar 1
          </button>
        </div>
      </div>

      <div v-else class="p-4 bg-red-100 text-red-800 rounded-lg">
        <p>No se encontraron productos para esta región.</p>
      </div>
    </section>

    <hr class="my-8 border-gray-300">

    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-yellow-500 pl-3">
        Tu Inventario (Venta)
      </h2>

      <div v-if="kiosco.inventory.length > 0" class="flex flex-col gap-3">
        <div v-for="item in kiosco.inventory" :key="item.product.id" class="flex justify-between items-center p-3 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">

          <div class="flex items-center space-x-3">
            <strong class="text-gray-800 text-lg">{{ item.product.name }}</strong>
            <span class="bg-yellow-300 text-yellow-900 font-extrabold px-3 py-1 rounded-full text-sm">
              x{{ item.quantity }}
            </span>
          </div>

          <div class="flex items-center space-x-4">
            <div class="text-right">
              <small class="text-gray-500 block leading-tight">Precio de Venta:</small>
              <strong class="text-red-600 text-xl">${{ item.product.price.toFixed(2) }}</strong>
            </div>
            <button class="sell-button bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200" @click="kiosco.sellProduct(item, 1)">
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
import { useKioscoStore } from '../stores/useKioscoStore';
import { onMounted } from 'vue';

const kiosco = useKioscoStore();

// Cargamos los productos de 'Lima' al iniciar
onMounted(() => {
  kiosco.loadProducts('Lima');
});
</script>
