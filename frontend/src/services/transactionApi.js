// Archivo: frontend/src/services/transactionApi.js

/**
 * Simula el guardado del estado del juego en un backend.
 * @param {number} saldo El saldo actual del jugador.
 * @param {Array} inventario El inventario actual.
 */
export const saveGameToApi = async (saldo, inventario) => {
  console.log('[API Sim]: Guardando estado del juego...');

  // Simulamos un retraso de red (0.5 segundos)
  await new Promise(resolve => setTimeout(resolve, 500));

  // Imprimimos lo que "guardaríamos"
  console.log(`[API Sim]: ¡Éxito! Saldo: ${saldo}, Items: ${inventario.length}`);

  // Devolvemos una respuesta exitosa
  return { status: 200, message: "Juego guardado" };
};
