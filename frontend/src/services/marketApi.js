// src/services/marketApi.js
import apiClient from "./apiClient";

/**
 * Obtiene los precios actualizados y eventos del mercado
 * desde el backend real.
 * @param {Array} currentProducts Lista actual de productos
 * @param {string} region Región del jugador
 * @param {number} currentDay Día actual del juego
 */
export const fetchUpdatedPrices = async (currentProducts, region, currentDay) => {
  try {
    const response = await apiClient.post("/api/mercado/actualizar", {
      products: currentProducts,
      region,
      currentDay,
    });
    return response.data; // { products: [...], event: {...} }
  } catch (error) {
    console.error("Error al obtener precios del mercado:", error);
    return { products: currentProducts, event: null };
  }
};
