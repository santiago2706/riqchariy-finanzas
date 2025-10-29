import { ref } from 'vue';
import { defineStore } from 'pinia';

// 1. IMPORTAMOS NUESTRA API FALSA DEL KIOSCO
import { fetchProductsByRegion } from '../services/kioscoApi.js';

// 'kiosco' es el ID de este cerebro
export const useKioscoStore = defineStore('kiosco', () => {

  // --- 2. ESTADO (Los datos del juego) ---
  const saldo = ref(100.00); // Saldo inicial
  const products = ref([]); // Productos del JSON
  // El inventario ahora es un array de OBJETOS { product: {}, quantity: 0 }
  const inventory = ref([]);
  const isLoading = ref(false); // Para mostrar un "Cargando..."

  // --- 3. ACCIONES (Las funciones del juego) ---

  /**
   * Carga los productos de la API Falsa
   */
  async function loadProducts(region) {
    isLoading.value = true;
    try {
      const data = await fetchProductsByRegion(region);
      products.value = data;
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Lógica para comprar un producto (Paso 1: ¡Añadir al Inventario!)
   */
  function buyProduct(product, quantity = 1) { // quantity por defecto es 1
    const cost = product.cost * quantity;

    if (saldo.value >= cost) {
      saldo.value -= cost;

      // 1. Buscamos si el producto ya existe en el inventario
      const item = inventory.value.find(item => item.product.id === product.id);

      if (item) {
        // 2. Si existe, solo aumentamos la cantidad
        item.quantity += quantity;
      } else {
        // 3. Si no existe, lo añadimos como un nuevo objeto
        inventory.value.push({ product, quantity });
      }

      console.log(`Comprados ${quantity} de ${product.name}. Saldo: ${saldo.value.toFixed(2)}`);
      return true; // Compra exitosa
    } else {
      alert("¡Saldo insuficiente!");
      return false; // Compra fallida
    }
  }

  /**
   * Lógica para vender un producto (Paso 3: ¡Ganar Dinero!)
   */
  function sellProduct(itemToSell, quantity = 1) { // itemToSell es el objeto {product, quantity}
    const product = itemToSell.product;
    const revenue = product.price * quantity; // ¡Usamos PRICE (precio de venta)!

    if (itemToSell.quantity >= quantity) {
      saldo.value += revenue;
      itemToSell.quantity -= quantity;

      // Si la cantidad llega a cero, lo quitamos del inventario
      if (itemToSell.quantity <= 0) {
        inventory.value = inventory.value.filter(item => item.product.id !== product.id);
      }

      console.log(`Vendidos ${quantity} de ${product.name}. Ganancia: ${revenue.toFixed(2)}`);
      return true; // Venta exitosa
    } else {
      alert("No tienes suficiente inventario para vender esa cantidad.");
      return false; // Venta fallida
    }
  }


  // --- 5. Devolvemos todo para que los componentes lo usen ---
  return {
    saldo,
    products,
    inventory, // ¡Ahora con lógica de agregar/restar!
    isLoading,
    loadProducts,
    buyProduct,
    sellProduct // ¡Añadida la venta!
  };
});
