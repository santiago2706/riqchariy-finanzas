// --- ARREGLO 1: Este archivo se movió de 'services/' a 'stores/' para romper el bucle de importación. ---

import { defineStore } from 'pinia';
import { useAuthStore } from '../stores/useAuthStore'; // Ahora la ruta es './' (o sin nada)
import { fetchUpdatedPrices } from '../services/marketApi.js'; // Los servicios SÍ se quedan en 'services/'

export const useMarketStore = defineStore('market', {
  state: () => ({
    day: 1,
    products: [],
    isUpdating: false,
    marketEvent: null
 }),
   actions: {
     setProducts(initialProducts) {
       this.products = initialProducts;
   },
    async advanceDay() {
       if (this.isUpdating) {
         console.log("¡Espera! El mercado ya se está actualizando.");
        return;
 }
    this.isUpdating = true;
    this.marketEvent = null;

     try {
       const authStore = useAuthStore();
       const region = authStore.user ? authStore.user.region : 'default';
       const response = await fetchUpdatedPrices(this.products, region, this.day);
       this.products = response.products;
       this.marketEvent = response.event;
       this.day += 1;
        console.log(`¡Día ${this.day} avanzado! Precios actualizados.`);
     } catch (error) {
           console.error("Error al actualizar precios:", error);
   } finally {
     this.isUpdating = false;
 }
 },
    loadState(savedDay) {
    console.log("[Market Store]: Cargando día guardado...");
    this.day = savedDay;
 }
  },
   getters: {
    productCount: (state) => state.products.length,
}
});
