import { ref } from 'vue';
import { defineStore } from 'pinia';

// 1. IMPORTAMOS NUESTRA API FALSA DEL KIOSCO
// (¡Usando el camino relativo que SÍ funciona!)
import { fetchProductsByRegion } from '../services/kioscoApi.js';

// 'kiosco' es el ID de este cerebro
export const useKioscoStore = defineStore('kiosco', () => {

  // --- 2. ESTADO (Los datos del juego) ---
  const saldo = ref(100.00); // Saldo inicial
  const products = ref([]); // Productos del JSON [cite: 215]
  const inventory = ref([]); // Inventario del jugador [cite: 214]
  const isLoading = ref(false); // Para mostrar un "Cargando..."

  // --- 3. ACCIONES (Las funciones del juego) ---

  /**
   * Carga los productos de la API Falsa
   */
  async function loadProducts(region) {
    isLoading.value = true;
    try {
      // 4. Llama a nuestra API FALSA (la de services/kioscoApi.js)
      const data = await fetchProductsByRegion(region);
      products.value = data;
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Lógica para comprar un producto [cite: 198]
   */
  function buyProduct(product, quantity) {
    const cost = product.cost * quantity;
    if (saldo.value >= cost) {
      saldo.value -= cost;
      // (Aquí iría la lógica de añadir al inventario)
      console.log(`Comprados ${quantity} de ${product.name}`);
    } else {
      alert("¡Saldo insuficiente!");
    }
  }

  // --- 5. Devolvemos todo para que los componentes lo usen ---
  return {
    saldo,
    products,
    inventory,
    isLoading,
    loadProducts,
    buyProduct
  };
});
