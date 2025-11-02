/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {number} cost
 * @property {number} local_demand
 */

/**
 * @typedef {Object} MarketEvent
 * @property {string} productID - ID del producto afectado
 * @property {number} priceMultiplier - Multiplicador de precio 
 * @property {string} message - Mensaje para el jugador 
 */

/**
 * @typedef {Object} SimulationResult
 * @property {Product[]} newProductList - La lista de productos actualizada
 * @property {MarketEvent[]} events - La lista de eventos que ocurrieron
 */

/**
 * Simula la actualización diaria.
 * AHORA ACEPTA currentDay y DEVUELVE UN OBJETO COMPLEJO.
 *
 * @param {Product[]} products - La lista actual de productos.
 * @param {number} currentDay - El día actual del juego.
 * @returns {SimulationResult} Un objeto con la nueva lista y los eventos.
 */
export function runDailyTick(products, currentDay) {
    
    // 1. TAREA 1: DIFICULTAD CRECIENTE
    // La volatilidad (volatility) aumenta 1% por día.
    const volatility = 0.15 + (currentDay * 0.01);
    
    const events = []; // Array para guardar eventos

    const newProductList = products.map(product => {
        
        const idealPrice = product.cost * 1.2;
        let newPrice = product.price;

        const gravity = (idealPrice - newPrice) * 0.05; // (Si el precio es alto, gravity es negativa)
        newPrice += gravity;

        // 1. Aplicar volatilidad
        const priceChange = (Math.random() - 0.5) * volatility;
        newPrice *= (1 + priceChange);

        // D. ¡CAMBIADO! (Generar Eventos - Buenos Y Malos)
        // ESTO SOLUCIONA LOS "EVENTOS ABURRIDOS"
        const eventChance = Math.random();

        
        // 2. TAREA 2: GENERAR EVENTOS [cite: 2025-10-30]
        // 10% de probabilidad de un evento por producto (lo subí de 5% para que sea más notable)
        if (eventChance < 0.10) { // 10% de escasez
            events.push({
                productID: product.id,
                priceMultiplier: 1.5,
                message: `¡Escasez de ${product.name}! Los precios se disparan.`
            });
            // --- ¡QUITADO! ---
            // (Borramos 'newPrice *= event.priceMultiplier;' de aquí)
            
        } else if (eventChance > 0.95) { // 5% de excedente (evento bueno)
            events.push({
                productID: product.id,
                priceMultiplier: 0.7, // ¡Precio baja 30%!
                message: `¡Excedente de ${product.name}! Precios de liquidación.`
            });
        }
        
        // 3. TAREA 3: APLICAR EVENTOS [cite: 2025-10-30]
        // Buscamos si un evento de los que generamos afecta a este producto
        const relevantEvent = events.find(e => e.productID === product.id);
        if (relevantEvent) {
            newPrice *= relevantEvent.priceMultiplier; // Aplicamos el multiplicador [cite: 2025-10-30]
        }
        
        // Aseguramos que el precio no sea menor al costo
        newPrice = Math.max(newPrice, product.cost * 1.05);

        // ... (Tu lógica de demanda original) ...
        const priceEffect = (idealPrice / newPrice) ** 2; // Usamos newPrice
        const demandFactor = (Math.random() * 0.4) + 0.8;
        const newDemand = Math.round(
            product.local_demand * demandFactor * priceEffect
        );

        return {
            ...product,
            price: parseFloat(newPrice.toFixed(2)),
            local_demand: Math.max(1, newDemand)
        };
    });

    // 4. Devolver el objeto complejo (lista Y eventos)
    return { newProductList, events };
}

//Este archivo se borrará cuando agregemos un Api real. Y en el archivo kioskoApi colocaremos la direccion real del backend