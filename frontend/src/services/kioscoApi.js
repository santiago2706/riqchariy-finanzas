// Archivo: src/services/kioscoApi.js

// 1. Importamos los datos de nuestro mock
import allProducts from '../mocks/products.json';

// --- NUEVO: Un traductor para pasar local_demand de un parametro de texto a un numero (entendible)
const demandToNumber = (demandString) => {
    switch (demandString.toLowerCase()) {
        case 'alta': return 150;
        case 'media': return 100;
        case 'baja': return 50;
        default: return 75; // Valor por defecto
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

    // --- ARREGLO Y LIMPIEZA: TRADUCIMOS LA DEMANDA A UN NÚMERO ---
    const cleanProducts = regionProducts.map(product => ({
        ...product,
        // Convertimos el string "alta", "media", etc. en un número para cálculos.
        local_demand: demandToNumber(product.local_demand)
    }));

    // 3. Simulamos un retraso de red
    await new Promise(resolve => setTimeout(resolve, 500));

    // 4. Devolvemos los datos limpios y listos para el juego
    return cleanProducts;
};
