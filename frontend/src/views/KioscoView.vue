<script setup>
// 1. IMPORTAMOS 'onMounted' Y LOS DOS "CEREBROS"
import { onMounted } from 'vue';
import { useKioscoStore } from '../stores/useKioscoStore';
import { useMarketStore } from '../stores/useMarketStore'; // <-- ¡AÑADIDO!
import ProductCard from '../components/ProductCard.vue';

const kiosco = useKioscoStore();
const market = useMarketStore(); // <-- ¡AÑADIDO!

// --- FUNCIONES DE LA TIENDA ---
// Estas funciones de 'comprar/vender' del kioscoStore
// pueden seguir funcionando para manejar la lógica del inventario local.
function comprarProducto(product) {
  kiosco.buyProduct(product, 1);
}

function venderProducto(item) {
  kiosco.sellProduct(item, 1);
}

function venderProductoDesdeEstante(product) {
  const itemInInventory = kiosco.inventory.find(item => item.product.id === product.id);
  if (itemInInventory) {
    kiosco.sellProduct(itemInInventory, 1);
  } else {
    console.log("¡No tienes este producto en tu inventario para vender!");
  }
}

// --- 2. FUNCIÓN PARA CAMBIAR EL DÍA (¡SIMPLIFICADA!) ---
// 'market.advanceDay()' ya actualiza 'market.products' desde el backend.
// Ya no necesitamos la sincronización manual.
async function handleAdvanceDay() {
  await market.advanceDay();
  
  // NOTA: 'kiosco.updateProductsFromMarket' ya no es necesario
  // si el template lee directamente de 'market.products'.
}

// --- 3. CARGA INICIAL (¡CORREGIDA!) ---
onMounted(() => {
  // ¡CAMBIO CLAVE!
  // Llamamos a la nueva función que habla con el backend (main.py)
  market.fetchInitialProducts();

  // El 'kiosco.loadProducts' simulado ya no se usa.
  // if (kiosco.products.length === 0) {
  //     kiosco.loadProducts(kiosco.currentRegion);
  // }
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

    <section class="mb-10 p-6 bg-white rounded-xl shadow-lg border-l-4 border-yellow-500">
      <h3 class="text-2xl font-bold text-yellow-800 mb-4">Controles del Juego</h3>
      <div class="flex items-center space-x-6">
        <div class="text-lg">
          <span class="font-medium text-gray-600">Día Actual:</span>
          <span class="ml-2 text-2xl font-bold text-gray-900">{{ market.day }}</span>
        </div>
        <button
          @click="handleAdvanceDay"
          :disabled="market.isUpdating"
          class="bg-blue-600 text-white py-2 px-5 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {{ market.isUpdating ? 'Avanzando...' : 'Avanzar al Siguiente Día' }}
        </button>
      </div>
      
      <!-- ¡CAMBIO MENOR! main.py devuelve un string, no un objeto .message -->
      <div v-if="market.marketEvent" class="mt-4 p-3 bg-blue-100 text-blue-800 rounded-lg">
        <p><strong class="font-bold">¡Evento del Día!</strong> {{ market.marketEvent }}</p>
      </div>
    </section>

    <h2 class="text-3xl font-bold text-gray-800 mb-6">Productos (Compra)</h2>
    
    <!-- Mantenemos el isLoading del kiosco por si se usa para el inventario -->
    <div v-if="kiosco.isLoading" class="text-center text-gray-500 py-10">
      Cargando...
    </div>
    
    <!-- ¡CAMBIO CLAVE! Leemos de 'market.products' -->
    <div v-else-if="market.products && market.products.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="prod in market.products" 
        :key="prod.id"
        :product="prod"
        @comprar="comprarProducto"
        @vender="venderProductoDesdeEstante"
      />
    </div>
    <div v-else class="text-center text-gray-400 py-10">
      No hay productos en el mercado.
    </div>

    <hr class="my-10 border-gray-300">
    <section class="inventory-section">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">Tu Inventario (Venta)</h2>

      <!-- El inventario sigue siendo manejado por 'kioscoStore', eso está bien. -->
      <div v-if="kiosco.inventory && kiosco.inventory.length > 0" class="flex flex-col gap-4">
        <div
          v-for="item in kiosco.inventory"
          :key="item.product.id"
          class="bg-white p-4 rounded-xl shadow-md grid grid-cols-3 gap-4 items-center"
        >
          <div>
            <strong class="text-gray-800 text-lg">{{ item.product.name }}</strong>
            <!-- Asumimos que el inventario guarda el 'cost' (precio de compra) -->
            <p class="text-sm text-gray-500">Costo: ${{ item.product.cost ? item.product.cost.toFixed(2) : 'N/A' }}</p>
          </div>

          <div>
            <span class="bg-yellow-200 text-yellow-900 font-extrabold px-3 py-1 rounded-full text-sm">
              x{{ item.quantity }}
            </span>
          </div>

          <div>
            <button
              @click="venderProducto(item)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
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