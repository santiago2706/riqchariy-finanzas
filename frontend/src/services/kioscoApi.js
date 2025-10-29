// 1. Importamos los datos de nuestro mock
// (Asegúrate de que products.json está en ../mocks/)
import allProducts from '../mocks/products.json';

/**
 * Simula una llamada a la API para obtener productos por región.
 */
export const fetchProductsByRegion = async (region) => {
  console.log(`[Servicio Falso - KIOSCO]: Pidiendo productos para ${region}...`);

  // 2. Simulamos la lógica del backend: filtrar por región
  const filteredProducts = allProducts.filter(p => p.region.toLowerCase() === region.toLowerCase());

  // 3. Simulamos un retraso de red
  await new Promise(resolve => setTimeout(resolve, 500));

  // 4. Devolvemos los datos
  return filteredProducts;
};

// ... (Aquí irían fetchEvents, buyProduct, sellProduct, etc. más tarde) ...
