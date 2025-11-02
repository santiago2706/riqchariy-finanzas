import { ref } from 'vue';
import { defineStore } from 'pinia';

// 1. IMPORTAMOS NUESTRA API FALSA (Ruta corregida)
import { login as apiLogin, register as apiRegister } from '../services/authApi.js';

// 2. Importamos el router (Ruta corregida con el archivo index.js)
import router from '../router/index.js';

// --- ¡NUEVOS IMPORTS (PASO 4)! ---
import { useKioscoStore } from './useKioscoStore';
import { useMarketStore } from '../services/useMarketStore'; // El de tu compañero
import { fetchGameState } from '../services/transactionApi.js';
// --- FIN DE NUEVOS IMPORTS ---


// 'auth' es el ID de este cerebro
export const useAuthStore = defineStore('auth', () => {
    // --- 3. ESTADO (Con la mejora de Copilot) ---

    // Función segura para leer el 'user' del localStorage
    const getSavedUser = () => {
        try {
            const savedUser = localStorage.getItem('user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error('Error al parsear el usuario del localStorage:', error);
            localStorage.removeItem('user'); // Limpia el dato corrupto
            return null;
        }
    };

    const user = ref(getSavedUser());
    const token = ref(localStorage.getItem('token')); // El token no necesita parseo

    // --- 4. ACCIONES (Las funciones que puede ejecutar) ---

    /**
     * Acción de Login
     */
    async function login(email, password) {
        try {
            const response = await apiLogin(email, password);

            if (response.success) {
                // --- TU LÓGICA DE LOGIN (¡PERFECTA!) ---
                user.value = response.user;
                token.value = response.token;
                localStorage.setItem('user', JSON.stringify(response.user));
                localStorage.setItem('token', response.token);

                // --- ¡CÓDIGO AÑADIDO (PASO 4)! ---
                // ¡Antes de redirigir, cargamos el estado del juego!
                try {
                    console.log("[Auth Store]: Login exitoso. Cargando datos del juego...");
                    // 1. Llama a la API de carga
                    const savedState = await fetchGameState();

                    // 2. Obtén los otros stores (¡Llamados AQUÍ DENTRO para evitar bucles!)
                    const kioscoStore = useKioscoStore();
                    const marketStore = useMarketStore();

                    // 3. Pasa los datos guardados a los stores
                    kioscoStore.loadState(savedState.inventario, savedState.saldo, savedState.day);
                    marketStore.loadState(savedState.day);

                } catch (loadError) {
                    console.error("Error al cargar el estado del juego:", loadError);
                    // (Nota: El login fue exitoso, pero la carga falló.
                    // El jugador empezará de cero.)
                }
                // --- FIN DE LA MODIFICACIÓN ---

                router.push('/'); // Redirige al Dashboard/Home
                return true;

            } else {
                alert(response.message);
                return false;
            }
        } catch (error) {
            console.error("Error en login:", error);
            return false;
        }
    }

    /**
     * Acción de Logout
     */
    function logout() {
        user.value = null;
        token.value = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        router.push('/login');
    }

    // --- 5. Devolvemos todo para que los componentes lo usen ---
    return {
        user,
        token,
        login,
        logout
    };
});
