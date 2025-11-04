import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { fetchProductsByRegion } from '../services/kioscoApi.js';
// ¡IMPORTAMOS EL MARKET STORE para obtener el precio actual!
import { useMarketStore } from '../services/useMarketStore';

export const useKioscoStore = defineStore('kiosco', () => {

    // --- 2. ESTADO (Los datos del juego) ---
    const saldo = ref(100.00);
    const products = ref([]); // Esta es la lista "maestra" (para gráficos)
    const inventory = ref([]); // Inventario del jugador { product: {}, quantity: 0 }
    const isLoading = ref(false);

    // NUEVO: estado para Dev4 (Contador de Días y Eventos)
    const currentDay = ref(1);
    const marketEvent = ref(null);

    // ✅ CAMBIO 1: AÑADIDA LA REGIÓN ACTUAL (para el Dashboard)
    const currentRegion = ref('Lima');

    // --- 3. ACCIONES (Las funciones del juego) ---

    async function loadProducts(region) {
        isLoading.value = true;
        // ¡PASO 1: Llama al MarketStore (el "Economista")!
        const marketStore = useMarketStore();
        try {
            const data = await fetchProductsByRegion(region);

            // Lógica de Tarea 3 (Gráficos): Inicializa el historial
            const productsWithHistory = data.map(product => ({
                ...product,
                // Inicializamos el historial con el precio actual (price)
                priceHistory: [product.price],
            }));

            // ¡PASO 2: Dale los productos al MarketStore!
            marketStore.setProducts(productsWithHistory);

            // (Guardamos una copia maestra en el KioscoStore también, para los gráficos)
            products.value = productsWithHistory;

            // Al cargar exitosamente, actualizamos la región
            currentRegion.value = region; // <--- Opcional: actualiza la región al cargar

        } catch (error) {
            console.error("Error al cargar productos:", error);
        } finally {
            isLoading.value = false;
        }
    }

    /**
     * Lógica para comprar un producto (¡CORREGIDO!)
     */
    function buyProduct(product, quantity = 1) {
        // 1. OBTENER EL PRECIO ACTUAL DEL MERCADO
        const marketStore = useMarketStore();
        const currentMarketProduct = marketStore.products.find(p => p.id === product.id);

        if (!currentMarketProduct) {
            console.error("Error: Producto no encontrado en el mercado.");
            return false;
        }

        // 2. Usa el COSTO de COMPRA del mercado
        const cost = currentMarketProduct.cost * quantity;

        if (saldo.value >= cost) {
            saldo.value -= cost;

            // 3. LÓGICA DE INVENTARIO (La que se había perdido)
            const item = inventory.value.find(item => item.product.id === product.id);

            if (item) {
                // Si ya lo tiene, solo añade cantidad
                item.quantity += quantity;
            } else {
                // Si es nuevo, añade una COPIA del producto al inventario
                inventory.value.push({ product: { ...currentMarketProduct }, quantity });
            }

            console.log(`Comprados ${quantity} de ${product.name} por S/${cost.toFixed(2)}`);
            return true;
        } else {
            alert("¡Saldo insuficiente!");
            return false;
        }
    }

    /**
     * Lógica para vender un producto (¡FUSIONADA!)
     */
    function sellProduct(itemToSell, quantity = 1) {
        // 'itemToSell' es el objeto de *nuestro inventario*
        const productInInventory = itemToSell.product;

        // 1. OBTENER EL PRECIO DE VENTA ACTUAL
        const marketStore = useMarketStore();
        const currentMarketProduct = marketStore.products.find(p => p.id === productInInventory.id);

        if (!currentMarketProduct) {
              alert("¡Este producto ya no existe en el mercado!");
              return false;
        }

        // 2. ¡Usamos el precio de VENTA (price) del mercado actual!
        const revenue = currentMarketProduct.price * quantity;

        if (itemToSell.quantity >= quantity) {
            saldo.value += revenue;
            itemToSell.quantity -= quantity;

            if (itemToSell.quantity <= 0) {
                inventory.value = inventory.value.filter(item => item.product.id !== productInInventory.id);
            }

            console.log(`Vendidos ${quantity} de ${productInInventory.name}. Ganancia: ${revenue.toFixed(2)}`);
            return true;
        } else {
            alert("No tienes suficiente inventario para vender esa cantidad.");
            return false;
        }
    }

    /**
     * (TAREA 2) Recibe los productos actualizados del MarketStore
     * y los guarda en el KioscoStore (para los gráficos).
     */
    function updateProductsFromMarket(marketProducts) {
        console.log("[Kiosco Store]: Sincronizando precios con el mercado...");
        products.value = marketProducts;
    }

    // --- LÓGICA DE DIFICULTAD CRECIENTE ---
    function applyPriceFluctuation(productId, newPrice) {
        // 1. Encuentra el producto mutable en el array 'products' (la lista maestra)
        const productToUpdate = products.value.find(p => p.id === productId);

        if (productToUpdate) {
            productToUpdate.price = newPrice;

            // 2. ¡Guarda el nuevo precio en el historial! (Tarea Dev 3)
            if (productToUpdate.priceHistory) {
                productToUpdate.priceHistory.push(newPrice);
            } else {
                productToUpdate.priceHistory = [newPrice];
            }

            const MAX_HISTORY_SIZE = 15;
            if (productToUpdate.priceHistory.length > MAX_HISTORY_SIZE) {
                productToUpdate.priceHistory.shift();
            }
        }
    }

    // --- (Tu Tarea 1) ---
    function loadState(savedInventory, savedSaldo, savedDay, savedRegion) {
        console.log("[Kiosco Store]: Cargando estado guardado...");
        inventory.value = savedInventory;
        saldo.value = savedSaldo;
        currentDay.value = savedDay;
        currentRegion.value = savedRegion; // <--- Opcional: carga la región
    }

    //--- (Código de Dev 4) ---
    function setMarketEvent(evt) { marketEvent.value = evt }
    function clearMarketEvent() { marketEvent.value = null }
    function nextDay() {
        currentDay.value += 1
        setMarketEvent({message:`Inicia el Día ${currentDay.value}`})
    }

    // --- 4. GETTERS ---
    const inventoryValue = computed(() => {
        // ... (Tu lógica de inventoryValue)
        return inventory.value.reduce((total, item) => {
             if (item && item.product && typeof item.product.cost === 'number' && typeof item.quantity === 'number') {
                 return total + (item.product.cost * item.quantity);
             }
             return total;
         }, 0);
    });

    const netWorth = computed(() => {
        return saldo.value + inventoryValue.value;
    });


    // --- 5. Devolvemos todo (¡VERSION FUSIONADA Y LIMPIA!) ---
    return {
        saldo,
        products,
        inventory,
        isLoading,
        // ✅ CAMBIO 2: EXPUESTA LA REGIÓN ACTUAL
        currentRegion,
        currentDay,
        marketEvent,
        inventoryValue,
        netWorth,
        loadProducts,
        buyProduct,
        sellProduct,
        updateProductsFromMarket,
        applyPriceFluctuation,
        loadState,
        setMarketEvent,
        clearMarketEvent,
        nextDay
    };
});
