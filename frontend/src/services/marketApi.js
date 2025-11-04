/**
 * ¡Motor de Lecciones Simulado! (Tarea 2 Corregida)
 * Recibe el día actual y devuelve precios basados en la "lección"
 * y un evento de mercado.
 * @param {Product[]} currentProducts - La lista actual de productos.
 * @param {string} region - El contexto local del usuario (ej: 'semilla').
 * @param {number} currentDay - El día actual del juego.
 * @returns {Promise<simulationResult>} Una promesa que resuelve al objeto con la lista y los eventos.
 */
export const fetchUpdatedPrices = async (currentProducts, region, currentDay) => {
    console.log(`[API Sim]: Calculando Lección para el Día ${currentDay} en ${region}...`);
    let marketEvent = null;
    let volatility = 0.05;
    if (currentDay >= 5 && currentDay < 10) {
        volatility = 0.15;
        marketEvent = {
            message: `¡Lección 2! El mercado es volátil. ¡Compra barato, vende caro!`
        };
    } else if (currentDay >= 10) {
        volatility = 0.10;
        if (Math.random() < 0.5) {
            const productsToImpact = currentProducts.filter(p => p.id !== 'water');
            const productToImpact = productsToImpact[Math.floor(Math.random() * productsToImpact.length)];
            if (productToImpact) {
                marketEvent = {
                    message: `¡Noticia de última hora! La demanda de "${productToImpact.name}" colapsa. El precio cae.`,
                    productId: productToImpact.id,
                    priceMultiplier: 0.6
                };
                console.log(`[API Sim]: ¡EVENTO GENERADO! ${marketEvent.message}`);
            }
        }
    } else if (currentDay === 1) {
        marketEvent = {
            message: `¡Lección 1: Tu Primer Kiosco! Compra productos para tu inventario.`
        };
    }
    const updatedProducts = currentProducts.map(product => {
        let newPrice = product.price;
        let newCost = product.cost;
        if (marketEvent && marketEvent.productId === product.id) {
            newPrice = newPrice * marketEvent.priceMultiplier;
        } else {
            const priceChange = (Math.random() - 0.5) * 2 * volatility;
            const costChange = (Math.random() - 0.5) * 2 * (volatility * 0.5);
            newPrice *= (1 + priceChange);
            newCost *= (1 + costChange);
        }
        if (newPrice <= newCost) {
            newPrice = newCost * 1.2;
        }
        const newPriceHistory = product.priceHistory
            ? [...product.priceHistory, parseFloat(newPrice.toFixed(2))]
            : [parseFloat(newPrice.toFixed(2))];
        if (newPriceHistory.length > 20) {
            newPriceHistory.shift();
        }
        return {
            ...product,
            price: parseFloat(newPrice.toFixed(2)),
            cost: parseFloat(newCost.toFixed(2)),
            priceHistory: newPriceHistory
        };
    });
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        products: updatedProducts,
        event: marketEvent
    };
};
