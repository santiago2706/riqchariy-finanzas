import { useAuthStore } from '../stores/useAuthStore';
import { useKioscoStore } from '../stores/useKioscoStore'; // Necesario para 'save'

/**
 * Guarda el estado del juego en el backend real.
 * Llama a: POST /api/game/save
 * @param {number} saldo El saldo actual del jugador.
 * @param {Array} inventario El inventario actual.
 */
export const saveGameToApi = async (saldo, inventario) => {
    console.log('[API]: Guardando estado real en backend...');

    // Para guardar la partida completa, también necesitamos el día actual.
    // Lo sacamos del kioscoStore.
    const kioscoStore = useKioscoStore();
    const day = kioscoStore.day;

    // (Opcional) Si tuvieras tokens, los sacarías del authStore
    // const authStore = useAuthStore();
    // const token = authStore.token;

    try {
        const response = await fetch('/api/game/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}` // <-- Así lo harías con tokens
            },
            body: JSON.stringify({
                saldo: saldo,
                inventario: inventario,
                day: day 
            })
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const data = await response.json();
        console.log(`[API]: ¡Éxito! Backend dice: "${data.message}"`);
        return data; // Devuelve { status: 200, message: "Juego guardado" }

    } catch (error) {
        console.error('Error al guardar el juego:', error);
        return { status: 500, message: "Error al guardar" };
    }
};

/**
 * Carga el estado del juego desde el backend real.
 * Llama a: GET /api/game/load
 */
export const fetchGameState = async () => {
    console.log('[API]: Cargando estado real desde backend...');

    // 1. Necesitamos la región para filtrar
    const authStore = useAuthStore();
    if (!authStore.user || !authStore.user.region) {
        console.error('fetchGameState: No hay usuario o región en el AuthStore.');
        throw new Error('Usuario no autenticado o sin región.');
    }
    
    const userRegion = authStore.user.region;
    // const token = authStore.token; // (Para autenticación)

    console.log(`[API]: Solicitando estado del juego para la región: ${userRegion}`);

    try {
        // 2. Construimos la URL con el Query Parameter
        const response = await fetch(`/api/game/load?region=${encodeURIComponent(userRegion)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}` // <-- Así lo harías con tokens
            }
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        // 3. Devolvemos el estado de juego que nos da el backend
        // (que ahora SÍ coincide con la estructura esperada: { day, inventario, saldo, ... })
        const savedState = await response.json();
        console.log('[API]: ¡Éxito! Estado cargado desde backend.', savedState);
        return savedState;

    } catch (error) {
        console.error('Error al cargar el estado del juego:', error);
        // Lanzamos el error para que el 'useAuthStore' lo pueda capturar
        throw error; 
    }
};