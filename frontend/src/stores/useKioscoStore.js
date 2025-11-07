import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// NOTA IMPORTANTE: Para evitar el problema de dependencia circular con useMarketStore,
// NO lo importamos aquí. Lo importaremos dinámicamente dentro de las acciones.

export const useKioscoStore = defineStore('kiosco', () => {

    // --- 2. ESTADO (Los datos del juego) ---
    const saldo = ref(100.00);
    const products = ref([]);      // Lista maestra de productos con historial (para gráficos)
    const inventory = ref([]);     // Inventario del jugador { product: {}, quantity: 0 }
    const isLoading = ref(false);

    const currentDay = ref(1);
    const marketEvent = ref(null);
    const currentRegion = ref('Lima'); // Región actual para el Dashboard

    // --- 3. ACCIONES (Las funciones del juego) ---

    async function loadProducts(region) {
        isLoading.value = true;

        // ✨ SOLUCIÓN AL BUCLE DE DEPENDENCIA: Importación dinámica
        const marketStore = (await import('./useMarketStore')).useMarketStore();

        try {
            const data = await fetchProductsByRegion(region);

            const productsWithHistory = data.map(product => ({
                ...product,
                // Inicializamos el historial con el precio actual
                priceHistory: [product.price],
            }));

            // 1. Damos los productos al MarketStore (el Economista)
            marketStore.setProducts(productsWithHistory);

            // 2. Guardamos una copia maestra en el KioscoStore (para gráficos/historial)
            products.value = productsWithHistory;
            currentRegion.value = region;

        } catch (error) {
            console.error("Error al cargar productos:", error);
        } finally {
            isLoading.value = false;
        }
    }

    async function buyProduct(product, quantity = 1) {
        // ✨ SOLUCIÓN AL BUCLE DE DEPENDENCIA: Importación dinámica
        const marketStore = (await import('./useMarketStore')).useMarketStore();

        const currentMarketProduct = marketStore.products.find(p => p.id === product.id);

        if (!currentMarketProduct) {
            console.error("Error: Producto no encontrado en el mercado.");
            return false;
        }

        const cost = currentMarketProduct.cost * quantity;

        if (saldo.value >= cost) {
            saldo.value -= cost;
            const item = inventory.value.find(item => item.product.id === product.id);

            if (item) {
                item.quantity += quantity;
            } else {
                // Se guarda una copia del producto para que el inventario no cambie si cambia el mercado
                inventory.value.push({ product: { ...currentMarketProduct }, quantity });
            }

            console.log(`Comprados ${quantity} de ${product.name} por S/${cost.toFixed(2)}`);
            return true;
        } else {
            // Se usa console.log en lugar de alert() para mejor manejo en producción
            console.log("¡Saldo insuficiente!");
            return false;
        }
    }

    async function sellProduct(itemToSell, quantity = 1) {
        const productInInventory = itemToSell.product;

        // ✨ SOLUCIÓN AL BUCLE DE DEPENDENCIA: Importación dinámica
        const marketStore = (await import('./useMarketStore')).useMarketStore();

        const currentMarketProduct = marketStore.products.find(p => p.id === productInInventory.id);

        if (!currentMarketProduct) {
            console.log("¡Este producto ya no existe en el mercado!");
            return false;
        }

        // Usamos el precio de VENTA (price) del mercado actual
        const revenue = currentMarketProduct.price * quantity;

        if (itemToSell.quantity >= quantity) {
            saldo.value += revenue;
            itemToSell.quantity -= quantity;

            if (itemToSell.quantity <= 0) {
                // Elimina el producto del inventario si la cantidad llega a cero
                inventory.value = inventory.value.filter(item => item.product.id !== productInInventory.id);
            }

            console.log(`Vendidos ${quantity} de ${productInInventory.name}. Ganancia: ${revenue.toFixed(2)}`);
            return true;
        } else {
            console.log("No tienes suficiente inventario para vender esa cantidad.");
            return false;
        }
    }

    // Sincroniza la lista maestra con los precios actualizados del MarketStore
    function updateProductsFromMarket(marketProducts) {
        console.log("[Kiosco Store]: Sincronizando precios con el mercado...");
        products.value = marketProducts;
    }

    // Aplica la fluctuación de precio y actualiza el historial para los gráficos
    function applyPriceFluctuation(productId, newPrice) {
        const productToUpdate = products.value.find(p => p.id === productId);

        if (productToUpdate) {
            productToUpdate.price = newPrice;

            if (productToUpdate.priceHistory) {
                productToUpdate.priceHistory.push(newPrice);
            } else {
                productToUpdate.priceHistory = [newPrice];
            }

            // Mantiene el historial limitado a los últimos 15 días
            const MAX_HISTORY_SIZE = 15;
            if (productToUpdate.priceHistory.length > MAX_HISTORY_SIZE) {
                productToUpdate.priceHistory.shift();
            }
        }
    }

    // Carga el estado del juego desde el almacenamiento local
    function loadState(savedInventory, savedSaldo, savedDay, savedRegion) {
        console.log("[Kiosco Store]: Cargando estado guardado...");
        inventory.value = savedInventory;
        saldo.value = savedSaldo;
        currentDay.value = savedDay;
        // El operador OR se asegura de que haya un valor por defecto
        currentRegion.value = savedRegion || 'Lima';
    }

    // Lógica para manejar eventos y avanzar el día
    function setMarketEvent(evt) { marketEvent.value = evt }
    function clearMarketEvent() { marketEvent.value = null }
    function nextDay() {
        currentDay.value += 1
        setMarketEvent({message:`Inicia el Día ${currentDay.value}`})
    }

    // --- 4. GETTERS ---

    // Valor total del inventario (basado en el costo inicial)
    const inventoryValue = computed(() => {
        return inventory.value.reduce((total, item) => {
             if (item && item.product && typeof item.product.cost === 'number' && typeof item.quantity === 'number') {
                 // Usamos el 'costo' guardado al momento de la compra para calcular el valor del inventario
                 return total + (item.product.cost * item.quantity);
             }
             return total;
        }, 0);
    });

    // Patrimonio neto (saldo + valor del inventario)
    const netWorth = computed(() => {
        return saldo.value + inventoryValue.value;
    });


    // --- 5. Devolvemos todo ---
    return {
        saldo,
        products,
        inventory,
        isLoading,
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
