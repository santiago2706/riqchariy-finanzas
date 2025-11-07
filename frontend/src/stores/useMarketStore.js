import { defineStore } from 'pinia';
// ¡AHORA SÍ USAMOS EL AUTHSTORE para obtener la región!
import { useAuthStore } from '../stores/useAuthStore'; 

export const useMarketStore = defineStore('market', {
  state: () => ({
    day: 1,
    products: [],
    isUpdating: false,
    marketEvent: null
  }),

  actions: {
    /**
     * ACCIÓN 1: Pide al backend la lista inicial de productos.
     * ¡CORREGIDO! Ahora envía la región.
     */
    async fetchInitialProducts() {
      if (this.products.length > 0) return; // No cargar si ya tenemos productos
      console.log("[Frontend] Pidiendo productos iniciales al backend...");
      
      this.isUpdating = true;
      try {
        // 1. Obtenemos la región desde el AuthStore
        const authStore = useAuthStore();
        if (!authStore.user || !authStore.user.region) {
          throw new Error('No se pudo determinar la región del usuario para cargar el mercado.');
        }
        const region = authStore.user.region;

        // 2. Construimos la URL con el parámetro de región
        const response = await fetch(`/api/productos/iniciales?region=${encodeURIComponent(region)}`); // GET
        
        if (!response.ok) {
          // Si el backend devuelve 422 (porque falta la región) u otro error, saltará aquí
          throw new Error(`No se pudieron cargar los productos iniciales (Error: ${response.status})`);
        }
        
        const initialProducts = await response.json();
        this.products = initialProducts;
        console.log(`[Frontend] Productos iniciales recibidos para ${region}:`, initialProducts);

      } catch (error) {
        console.error("Error al cargar productos iniciales:", error);
      } finally {
        this.isUpdating = false;
      }
    },

    /**
     * ACCIÓN 2: El motor del juego. Llama al backend para avanzar un día.
     * (Esta función estaba correcta, no necesita la región en la URL)
     */
    async advanceDay() {
        if (this.isUpdating) {
            console.log("¡Espera! El mercado ya se está actualizando.");
            return;
        }
        this.isUpdating = true;
        this.marketEvent = null;

        try {
            // 1. Preparamos los datos para el backend
            const estadoActual = {
                dia_actual: this.day,
                products: this.products 
            };

            // 2. Llamamos al backend
            const response = await fetch('/api/mercado/avanzar-dia', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(estadoActual)
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta del backend');
            }

            const nuevoEstadoDesdeBackend = await response.json();
            
            // 3. Actualizamos todo
            this.day = nuevoEstadoDesdeBackend.nuevo_dia;
            this.marketEvent = nuevoEstadoDesdeBackend.evento_regional;
            this.products = nuevoEstadoDesdeBackend.products; 

            console.log(`¡Día ${this.day} avanzado por el BACKEND!`);

        } catch (error) {
            console.error("Error al contactar el Motor del Mercado:", error);
        } finally {
            this.isUpdating = false;
        }
    },

    /**
     * ACCIÓN 3: Pide al backend una partida guardada.
     * ¡CORREGIDO! Ahora también envía la región.
     */
    async loadGame() {
      console.log("[Frontend] Cargando partida guardada desde el backend...");
      this.isUpdating = true;
      try {
        // 1. Obtenemos la región desde el AuthStore
        const authStore = useAuthStore();
        if (!authStore.user || !authStore.user.region) {
          throw new Error('No se pudo determinar la región del usuario para cargar la partida.');
        }
        const region = authStore.user.region;
        
        // 2. Construimos la URL con el parámetro de región
        const response = await fetch(`/api/game/load?region=${encodeURIComponent(region)}`); // GET
        
        if (!response.ok) {
           // Si el backend devuelve 422 (porque falta la región) u otro error, saltará aquí
          throw new Error(`No se pudo cargar la partida (Error: ${response.status})`);
        }
        
        const gameState = await response.json();
        
        // Actualizamos todo el estado del 'store'
        // NOTA: El kioscoStore debería cargar el 'saldo' y 'inventario'
        // Este store (market) solo debe cargar los productos del mercado.
        // Pero si tu lógica depende de esto, lo dejamos.
        this.day = gameState.day;
        this.products = gameState.inventario.map(item => item.product); // Asumiendo que quieres los productos del inventario
        this.marketEvent = gameState.marketEvent;

        console.log(`[Frontend] Partida cargada (simulada por backend). Día ${this.day}.`);

      } catch (error) {
        console.error("Error al cargar partida:", error);
      } finally {
        this.isUpdating = false;
      }
    }
  },

  getters: {
    productCount: (state) => state.products.length,
  }
});
