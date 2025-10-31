/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {number} cost
 * @property {number} local_demand
 */

/**
 * Simula la actualización diaria de precios y demanda.
 * NOTA: Esta es lógica pura, sin dependencias de Vue o Store.
 * * @param {Product[]} products - La lista actual de productos.
 * @returns {Product[]} Una nueva lista de productos con valores actualizados.
 */
export function runDailyTick(products) {
    // Usamos el método `map` para crear una *nueva* lista sin modificar la original.
    // Esto es crucial para la inmutabilidad (no cambiar cosas donde no debes).
    return products.map(product => {
        // --- Lógica de Simulación Simple ---

        // Analogía: La 'fiebre' del mercado sube y baja un poco al azar.
        const priceChange = (Math.random() - 0.5) * 0.1; // Cambio aleatorio entre -5% y +5%
        const demandFactor = (Math.random() * 0.4) + 0.8; // Demanda fluctúa entre 80% y 120%

        // 1. Calcular el nuevo Precio (price):
        // (El precio fluctúa alrededor de su costo)
        const newPrice = Math.max(
            product.price * (1 + priceChange), // Nuevo precio, nunca menos de...
            product.cost * 1.05 // ...5% por encima del costo (para asegurar ganancia mínima)
        );

        // 2. Calcular la nueva Demanda Local (local_demand):
        // (La demanda está influenciada por su precio actual vs. un 'precio ideal' imaginario)
        const idealPrice = product.cost * 1.2; // Precio de referencia
        const priceEffect = (idealPrice / product.price) ** 2; // Efecto cuadrático: si el precio sube mucho, la demanda cae en picada.

        const newDemand = Math.round(
            product.local_demand * demandFactor * priceEffect
        );

        // 3. Devolver el producto *actualizado*
        // El operador `...product` copia todas las propiedades antiguas.
        // Luego sobrescribimos `price` y `local_demand`.
        return {
            ...product,
            price: parseFloat(newPrice.toFixed(2)), // Redondeamos a 2 decimales
            local_demand: Math.max(1, newDemand) // La demanda nunca es menor a 1
        };
    });
}