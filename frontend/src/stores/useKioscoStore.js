// Archivo: stores/useKioscoStore.js

import { ref, computed } from 'vue'; // <--- ¡CAMBIO 1: IMPORTAR COMPUTED!
import { defineStore } from 'pinia';

// 1. IMPORTAMOS NUESTRA API FALSA DEL KIOSCO
import { fetchProductsByRegion } from '../services/kioscoApi.js';
import { useMarketStore } from '../services/useMarketStore.js';

// 'kiosco' es el ID de este cerebro
export const useKioscoStore = defineStore('kiosco', () => {

    // --- 2. ESTADO (Los datos del juego) ---
    const saldo = ref(100.00); // Saldo inicial
    const inventory = ref([]); // Inventario del jugador { product: {}, quantity: 0 }
    const isLoading = ref(false); // Para mostrar un "Cargando..."

    //NUEVO: estado para Dev4
    const currentDay =ref(1);
    const marketEvent = ref(null) //{ message, productID?, priceMultiplier? }

    // --- 3. ACCIONES (Las funciones del juego) ---

    /**
     * Carga los productos de la API Falsa
     */
    async function loadProducts(region) {
        const marketStore = useMarketStore();
        isLoading.value = true;
        try {
            const data = await fetchProductsByRegion(region);
            
            // 🚨 REEMPLAZA ESTA LÍNEA: Asegura que cada producto tenga su historial inicial.
            products.value = data.map(product => ({
                ...product,
                // Inicializamos el historial con el precio actual (price)
                priceHistory: [product.price], 
            }));

        } catch (error) {
            console.error("Error al cargar productos:", error);
        } finally {
            isLoading.value = false;
        }
    }

    /**
     * Lógica para comprar un producto
     */
    function buyProduct(product, quantity = 1) {
        // ... (tu lógica de compra existente) ...
        const cost = product.cost * quantity;
        if (saldo.value >= cost) {
            saldo.value -= cost;
            const item = inventory.value.find(item => item.product.id === product.id);
            if (item) {
                item.quantity += quantity;
            } else {
                inventory.value.push({ product, quantity });
            }
            console.log(`Comprados ${quantity} de ${product.name}. Saldo: ${saldo.value.toFixed(2)}`);
            return true;
        } else {
          alert("¡Saldo insuficiente!");
        }
        }

    /**
     * Lógica para vender un producto
     */
    function sellProduct(itemToSell, quantity = 1) {
        // ... (tu lógica de venta existente) ...
        const product = itemToSell.product;
        const revenue = product.price * quantity;
        if (itemToSell.quantity >= quantity) {
            saldo.value += revenue;
            itemToSell.quantity -= quantity;
            if (itemToSell.quantity <= 0) {
                inventory.value = inventory.value.filter(item => item.product.id !== product.id);
            }
            console.log(`Vendidos ${quantity} de ${product.name}. Ganancia: ${revenue.toFixed(2)}`);
            return true;
        } else {
            alert("No tienes suficiente inventario para vender esa cantidad.");
            return false;
        }
    }
    
    function applyPriceFluctuation(productId, newPrice) {
        // 1. Encuentra el producto mutable en el array 'products'
        const productToUpdate = products.value.find(p => p.id === productId);

        if (productToUpdate) {
            
            // 2. Actualiza el precio del producto
            productToUpdate.price = newPrice;
            
            // 3. ¡Guarda el nuevo precio en el historial!
            productToUpdate.priceHistory.push(newPrice);
            
            // Opcional: Limita la longitud del historial para que no crezca demasiado
            const MAX_HISTORY_SIZE = 15; 
            if (productToUpdate.priceHistory.length > MAX_HISTORY_SIZE) {
                // Elimina el elemento más antiguo (el primero)
                productToUpdate.priceHistory.shift(); 
            }
        }
    }

    // --- ¡NUEVA FUNCIÓN (PASO 3A - TU TAREA)! ---
    /**
     * (TAREA LÍDER) Sobrescribe el estado inicial con datos guardados.
     */
    function loadState(savedInventory, savedSaldo, savedDay) {
        console.log("[Kiosco Store]: Cargando estado guardado...");
        inventory.value = savedInventory;
        saldo.value = savedSaldo;
        currentDay.value = savedDay; // También cargamos el día
    }
    // --- FIN DE LA NUEVA FUNCIÓN ---

    //NUEVO: (Código de Dev 4)
    function setMarketEvent(evt) { marketEvent.value = evt }
    function clearMarketEvent() { marketEvent.value = null }
    function nextDay() {
        currentDay.value += 1
        setMarketEvent({message:`Inicia el Día ${currentDay.value}`})
    }

    // --- 4. GETTERS (Métricas calculadas, Paso A) ---
    const inventoryValue = computed(() => {
        return inventory.value.reduce((total, item) => {
            return total + (item.product.cost * item.quantity);
        }, 0);
    });

    const netWorth = computed(() => {
        return saldo.value + inventoryValue.value;
    });


    // --- 5. Devolvemos todo para que los componentes lo usen ---
    return {
        saldo,
        inventory,
        isLoading,
        loadProducts,
        buyProduct,
        sellProduct,
        applyPriceFluctuation, // <--- CAMBIO: Traído de la rama conflictiva
        // ¡CAMBIO 2: DEVOLVEMOS LOS NUEVOS GETTERS!
        inventoryValue,
        netWorth,
        loadState, // <-- ¡AÑADIDA TU FUNCIÓN!
        //NUEVO
        currentDay,
        marketEvent,
        setMarketEvent,
        clearMarketEvent,
        nextDay
    };
});
