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

/**
 * (TAREA LÍDER)
 * Simula la carga del estado del juego desde un backend.
 */
export const fetchGameState = async () => {
  console.log('[API Sim]: Cargando estado del juego...');

  // Simulamos un retraso de red (0.3 segundos)
  await new Promise(resolve => setTimeout(resolve, 300));

  // --- ¡ESTO ES LO IMPORTANTE! ---
  // Simulamos los datos que vendrían de la base de datos
  const savedState = {
    saldo: 999.50, // Un saldo guardado
    day: 5,        // Empezará en el Día 5
    inventario: [
      {
        product: {
          id: 'prod_01',
          name: 'Bebida Energética (300ml)',
          price: 4.10, // Precios guardados
          cost: 2.20
        },
        quantity: 20
      }
    ]
  };

  console.log('[API Sim]: ¡Éxito! Estado cargado.', savedState);

  // Devolvemos el estado guardado
  return savedState;
};
