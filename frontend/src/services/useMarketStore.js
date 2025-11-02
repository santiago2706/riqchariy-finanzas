import { defineStore } from 'pinia';
import { useAuthStore } from '../stores/useAuthStore';
import { fetchUpdatedPrices } from './marketApi.js';

// Creamos y exportamos nuestro Store
export const useMarketStore = defineStore('market', {
    // === EL ESTADO (STATE) ===
    state: () => ({
        day: 1,
        
        // --- CAMBIO 3: USA EL JSON IMPORTADO ---
        // El estado inicial de tus productos ahora
        // se lee directamente del archivo .json
 
        products: [],
        isUpdating: false,
        marketEvents: [] 
    }),

    // === ACCIONES (ACTIONS) ===
    actions: {
        setProducts(initialProducts) {
            // Reemplaza la lista inicial dura con los datos de la API.
            this.products = initialProducts;
        },
        /**
         * Llama al servicio de simulación para avanzar el día.
         */
        async advanceDay() {
            // 1. Si el candado está puesto... no hagas nada.
            if (this.isUpdating) {
                console.log("¡Espera! El mercado ya se está actualizando.");
                return;
            }

            // 2. Pon el candado
            this.isUpdating = true;
            this.marketEvents = [];

            try {
                // 3. Obtenemos el contexto (la región) del AuthStore
                const authStore = useAuthStore();
                const region = authStore.user ? authStore.user.region : 'default';

                // 4. Incrementamos el día
                this.day += 1;

                // 5. ¡LA LLAMADA! (El Teléfono)
                // Usamos la API simulada, pasándole los productos actuales y la región.
                const response = await fetchUpdatedPrices(this.products, region, this.day);

                // 6. Reemplazamos la lista vieja con la nueva
                this.products = response.newProductList;
                this.marketEvents = response.events;
                
                console.log(`¡Día ${this.day} avanzado! Precios actualizados desde la API.`);

            } catch (error) {
                console.error("Error al actualizar precios desde la API (simulada):", error);
            } finally {
                // 7. Quita el candado
                this.isUpdating = false;
            }
        },

        // --- ¡NUEVA FUNCIÓN (PASO 3B - TU TAREA)! ---
        /**
         * (TAREA LÍDER) Sobrescribe el día inicial con datos guardados.
         */
        loadState(savedDay) {
          console.log("[Market Store]: Cargando día guardado...");
          // (Nota: Tu Dev 4 y Dev 2 tienen lógica de "día" duplicada.
          // Por ahora, actualizaremos ambas.)
          this.day = savedDay;
        }
        // --- FIN DE LA NUEVA FUNCIÓN ---
    },

    // === GETTERS (Opcional, pero útil) ===
    getters: {
        productCount: (state) => state.products.length,
    }
});
