import { defineStore } from 'pinia';

// 1. IMPORTA EL AUTH STORE (para el contexto)
import { useAuthStore } from '../stores/useAuthStore';

// 3. IMPORTA EL "TELÉFONO" (API)
// (Usará la versión de marketApi.js que implementa la dificultad)
import { fetchUpdatedPrices } from './marketApi.js';

// Datos iniciales (se sobrescriben al cargar el kiosco)
const INITIAL_PRODUCTS = [];

// Creamos y exportamos nuestro Store
export const useMarketStore = defineStore('market', {
    // === EL ESTADO (STATE) ===
    state: () => ({
        day: 1, // Controla el "día del juego"
        products: INITIAL_PRODUCTS, // La lista de productos y sus valores.
        isUpdating: false, // Un "candado"
        // ¡NUEVO! Para la Tarea 4 (UI Inmersión)
        marketEvent: null
    }),

    // === ACCIONES (ACTIONS) ===
    actions: {
        /**
         * Permite que otro store (Kiosco) cargue los productos iniciales.
         */
        setProducts(initialProducts) {
            this.products = initialProducts;
        },

        /**
         * Llama al servicio de simulación para avanzar el día.
         * (¡ACTUALIZADO CON DIFICULTAD CRECIENTE!)
         */
        async advanceDay() {
            if (this.isUpdating) {
                console.log("¡Espera! El mercado ya se está actualizando.");
                return;
            }
            this.isUpdating = true;
            this.marketEvent = null; // Limpia el evento antiguo

            try {
                const authStore = useAuthStore();
                const region = authStore.user ? authStore.user.region : 'default';

                // ¡LA LLAMADA (ACTUALIZADA)!
                // Ahora pasamos 'this.day' para la dificultad creciente
                const response = await fetchUpdatedPrices(this.products, region, this.day);

                // ¡ACTUALIZADO! Manejamos la nueva respuesta
                this.products = response.products;
                this.marketEvent = response.event; // <-- ¡Guardamos el evento!

                // Incrementamos el día DESPUÉS de la simulación
                this.day += 1;
                console.log(`¡Día ${this.day} avanzado! Precios actualizados.`);

            } catch (error) {
                console.error("Error al actualizar precios:", error);
            } finally {
                this.isUpdating = false;
            }
        },

        // --- (Tu función de Cargar Partida de la Tarea 1) ---
        loadState(savedDay) {
          console.log("[Market Store]: Cargando día guardado...");
          this.day = savedDay;
        },

        /**
         * (TAREA 4) Limpia el evento actual para que el pop-up desaparezca.
         */
        clearMarketEvent() {
            this.marketEvent = null;
        }
    },

    // === GETTERS (Opcional, pero útil) ===
    getters: {
        productCount: (state) => state.products.length,
    }
});
