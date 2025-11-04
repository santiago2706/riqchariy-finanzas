// Archivo: src/services/kioscoApi.js

import allProducts from '../mocks/products.json';

/**
 * Simula una llamada a la API para obtener productos por región.
 */
export const fetchProductsByRegion = async (region) => {
console.log(`[kioscoApi]: Petición RECIBIDA para ${region}`);

// 2. FILTRA EL JSON
const regionProducts = allProducts.filter(
product => product.region === region
);

// --- ¡ARREGLO! ---
// Dejamos que los productos pasen "limpios" (cleanProducts)
const cleanProducts = regionProducts;

// 3. Simulamos un retraso de red
await new Promise(resolve => setTimeout(resolve, 500));

// 4. Devolvemos los datos limpios
console.log(`[kioscoApi]: Devolviendo ${cleanProducts.length} productos.`);
return cleanProducts;
};
