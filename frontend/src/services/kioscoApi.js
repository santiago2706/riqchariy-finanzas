// 1. Importamos los datos de nuestro mock
// (Asegúrate de que products.json está en ../mocks/)
import allProducts from '../mocks/products.json';

// --- NUEVO: Un traductor para pasar local_demand de un parametro de texto a un numero(entendible)
const demandToNumber = (demandString) => {
  switch (demandString.toLowerCase()) {
    case 'alta': return 150;
    case 'media': return 100;
    case 'baja': return 50;
    default: return 75;
  }
};

/**
 * Simula una llamada a la API para obtener productos por región.
 */
export const fetchProductsByRegion = async (region) => {
  console.log(`[Servicio Falso - KIOSCO]: Pidiendo productos para ${region}...`);

  // 2. FILTRA EL JSON
  const regionProducts = allProducts.filter(
    product => product.region === region
  );

  // --- ¡AQUÍ ESTÁ EL ARREGLO! ---
  // "Limpiamos" los datos antes de devolverlos
  const cleanProducts = regionProducts.map(product => ({
    ...product,
    // Convertimos el string "alta" en un número 150
    local_demand: demandToNumber(product.local_demand) 
  }));

  // 3. Simulamos un retraso de red
  await new Promise(resolve => setTimeout(resolve, 500));

  // 4. Devolvemos los datos
  return cleanProducts;
};

// ... (Aquí irían fetchEvents, buyProduct, sellProduct, etc. más tarde) ...
