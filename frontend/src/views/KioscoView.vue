<script setup>
// 1. IMPORTAMOS 'onMounted'
// Esta es la "conexión que faltaba". Se ejecuta cuando la página carga.
import { onMounted } from 'vue';
import { useKioscoStore } from '../stores/useKioscoStore';
// 2. Importamos la "Tarjeta Inteligente" que ya tienes
import ProductCard from '../components/ProductCard.vue';

// 3. Cargamos el cerebro
const kiosco = useKioscoStore();

// 4. Funciones que los botones de la tarjeta llamarán
function comprarProducto(product) {
  // Llama a la función 'buyProduct' de tu store
  kiosco.buyProduct(product, 1);
}

function venderProducto(product) {
  // Llama a la función 'sellProduct' de tu store
  // Buscamos el item en el inventario, porque 'sellProduct' lo necesita
  const itemInInventory = kiosco.inventory.find(item => item.product.id === product.id);
  if (itemInInventory) {
    kiosco.sellProduct(itemInInventory, 1);
  } else {
    // Usamos console.log en lugar de alert() para no detener la app
    console.log("¡No tienes este producto en tu inventario para vender!");
  }
}

// 5. ¡AQUÍ ESTÁ LA MAGIA!
// onMounted() se ejecuta automáticamente cuando el componente se carga
onMounted(() => {
  // Le decimos al cerebro: "Oye, carga los productos de tu 'currentRegion'"
  // (El cerebro ya sabe que la región es 'Lima' por defecto)
  kiosco.loadProducts(kiosco.currentRegion);
});
</script>

<template>
  <div class="max-w-6xl mx-auto p-4 sm:p-6">
    <h1 class="text-4xl font-extrabold text-blue-700 mb-2">
      Mi Kiosco
    </h1>
    <h2 class="text-2xl font-semibold text-gray-500 mb-8">
      Región Actual: <span class="text-indigo-600">{{ kiosco.currentRegion }}</span>
    </h2>

    <div v-if="kiosco.isLoading" class="text-center text-gray-500 py-10">
      <p class="text-xl">Cargando productos...</p>
    </div>

    <div v-else-if="kiosco.products && kiosco.products.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      <ProductCard
        v-for="prod in kiosco.products"
        :key="prod.id"
        :product="prod"
        @comprar="comprarProducto"
        @vender="venderProducto"
      />
    </div>

    <div v-else class="text-center text-gray-400 py-10">
      <p class="text-2xl font-bold">¡Tienda Vacía!</p>
      <p class="text-lg">No se encontraron productos para la región "{{ kiosco.currentRegion }}".</p>
      <p>(Asegúrate de que `mocks/products.json` tenga productos para "Lima")</p>
    </div>
  </div>
</template>
