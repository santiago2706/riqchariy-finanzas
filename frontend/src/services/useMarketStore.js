import { defineStore } from 'pinia';

// 1. IMPORTA EL AUTH STORE (para el contexto)
import { useAuthStore } from '../stores/useAuthStore';

// 3. IMPORTA EL NUEVO "TELÉFONO" (API)
import { fetchUpdatedPrices } from './marketApi.js';

// Datos iniciales para que el juego arranque
const INITIAL_PRODUCTS = [
    { id: 'carrot', name: 'Zanahorias', price: 2.50, cost: 1.00, local_demand: 100 },
    { id: 'apple', name: 'Manzanas', price: 1.75, cost: 0.80, local_demand: 150 },
    { id: 'water', name: 'Agua Embotellada', price: 1.00, cost: 0.30, local_demand: 200 },
];

// Creamos y exportamos nuestro Store
export const useMarketStore = defineStore('market', {
    // === EL ESTADO (STATE) ===
    // Analogía: Los datos que guarda el Gerente en su escritorio.
    state: () => ({
        day: 1, // Controla el "día del juego"
        products: INITIAL_PRODUCTS, // La lista de productos y sus valores.

        isUpdating: false // Un "candado" para evitar que la API se llame 10 veces

    }),

    // === ACCIONES (ACTIONS) ===
    // Analogía: Las tareas que el Gerente puede ejecutar.
    actions: {
        /**
         * Permite que otro store (Kiosco) cargue los productos iniciales.
         * @param {Product[]} initialProducts
         */
        setProducts(initialProducts) {
            // Reemplaza la lista inicial dura con los datos de la API.
            this.products = initialProducts;
        },
        /**
         * Llama al servicio de simulación para avanzar el día.
         */
        async advanceDay() {
            // 1. Si el candado está puesto (ya estamos actualizando), no hagas nada.
            if (this.isUpdating) {
                console.log("¡Espera! El mercado ya se está actualizando.");
                return;
            }
                
            // 2. Pon el candado
            this.isUpdating = true;

            try {
                // 3. Obtenemos el contexto (la región) del AuthStore
                const authStore = useAuthStore();
                const region = authStore.user ? authStore.user.region : 'default';
                
                // 4. Incrementamos el día
                this.day += 1;

                // 5. ¡LA LLAMADA! (El Teléfono)
                // Usamos la API simulada, pasándole los productos actuales y la región.
                const updatedProducts = await fetchUpdatedPrices(this.products, region);

                // 6. Reemplazamos la lista vieja con la nueva
                this.products = updatedProducts;
                
                console.log(`¡Día ${this.day} avanzado! Precios actualizados desde la API.`);

            } catch (error) {
                console.error("Error al actualizar precios desde la API (simulada):", error);
            } finally {
                // 7. Quita el candado, pase lo que pase
                this.isUpdating = false;
            }
        },
    },
    
    // === GETTERS (Opcional, pero útil) ===
    // Analogía: Información derivada que el Gerente puede calcular rápidamente.
    getters: {
        // Por ejemplo, calcular cuántos productos tenemos
        productCount: (state) => state.products.length,
    }
});