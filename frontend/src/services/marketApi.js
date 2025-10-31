import { runDailyTick } from './marketSimulation.js';

/** 
* Simula una llamada API que toma el estado actual del mercado y la región,
 * y devuelve los nuevos precios calculados por el "backend".
 * @param {Product[]} currentProducts - La lista actual de productos.
 * @param {string} region - El contexto local del usuario (ej: 'semilla').
 * @returns {Promise<Product[]>} Una promesa que resuelve a la nueva lista de productos.
 */
export const fetchUpdatedPrices = async (currentProducts, region) => {
  // 1. Simular el retraso de la red (300ms)
  await new Promise(resolve => setTimeout(resolve, 300));

  console.log(`📞 API SIMULADA: Pidiendo precios para región: ${region}`);
  
  // 2. Aquí es donde tu API REAL haría cálculos basados en la región.
  // Por ahora, solo usamos la lógica 'runDailyTick' que ya teníamos.
  // (En el futuro, esta lógica de 'runDailyTick' viviría en el servidor, no aquí).
  const newProductList = runDailyTick(currentProducts);

  // 3. Devolvemos la nueva lista
  return newProductList;
};