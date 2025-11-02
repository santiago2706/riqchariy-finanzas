import { runDailyTick } from './marketSimulation.js';

/**
 * Simula una llamada API...
 * AHORA PASA EL 'currentDay' Y DEVUELVE UN OBJETO COMPLEJO
 *
 * @param {Product[]} currentProducts - La lista actual de productos.
 * @param {string} region - El contexto local del usuario (ej: 'semilla').
 * @param {number} currentDay - El día actual del juego.
 * @returns {Promise<simulationResult>} Una promesa que resuelve al objeto con la lista y los eventos.
 */
export const fetchUpdatedPrices = async (currentProducts, region, currentDay) => {
  // 1. Simular el retraso de la red (300ms)
  await new Promise(resolve => setTimeout(resolve, 300));

  console.log(`📞 API SIMULADA: Pidiendo precios para región: ${region}, Día: ${currentDay}`);
  
  // 2. Llama a la simulación con el día actual
  const simulationResult = runDailyTick(currentProducts, currentDay);

  // 3. Devolvemos el objeto complejo (lista + eventos)
  return simulationResult;
};