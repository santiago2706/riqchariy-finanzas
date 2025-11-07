import { ref } from 'vue';
import { defineStore } from 'pinia';
import { login as apiLogin, register as apiRegister } from '../services/authApi.js';
import router from '../router/index.js';
import { useKioscoStore } from './useKioscoStore';

import { fetchGameState } from '../services/transactionApi.js';

export const useAuthStore = defineStore('auth', () => {
    // 1. ESTADO
    // Inicializamos como null. La carga desde localStorage se hará explícitamente con initialize().
    const user = ref(null);
    const token = ref(null);

    // --- LÓGICA DE CARGA DIFERIDA ---
    /**
     * Carga el estado de autenticación (user y token) desde el localStorage.
     * Esta función debe ser llamada en el setup inicial de App.vue.
     */
    function initialize() {
        try {
            const savedUser = localStorage.getItem('user');
            const savedToken = localStorage.getItem('token');

            user.value = savedUser ? JSON.parse(savedUser) : null;
            token.value = savedToken || null;

            if (savedUser && !savedToken) {
                // Limpieza si solo hay usuario pero no token (estado inconsistente)
                localStorage.removeItem('user');
                user.value = null;
            }
        } catch (e) {
            console.error('Error al inicializar AuthStore:', e);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            user.value = null;
            token.value = null;
        }
    }

    // 2. ACCIONES

    /**
     * 🔐 LOGIN: Maneja la carga de estado y la redirección por ROL.
     */
    async function login(email, password) {
        try {
            const response = await apiLogin(email, password);

            if (response.success) {
                user.value = response.user;
                token.value = response.token;
                localStorage.setItem('user', JSON.stringify(response.user));
                localStorage.setItem('token', response.token);

                // --- Lógica de Carga de Juego (Aislada con try...catch) ---
                if (user.value.role === 'Estudiante') {
                    try {
                        console.log('[Auth Store]: Login exitoso. Intentando cargar datos del juego...');
                        const savedState = await fetchGameState();
                        const kioscoStore = useKioscoStore();

                        // Carga estado de juego (saldo, inventario, día, región)
                        kioscoStore.loadState(savedState.inventario, savedState.saldo, savedState.day, user.value.region);

                    } catch (loadError) {
                        // ⚠️ ARREGLO CLAVE: Si la carga falla, SOLO mostramos el error, pero NO rompemos
                        // la función 'login' ni forzamos logout.
                        console.error('⚠️  Advertencia: Error al cargar el estado del juego (saldo/inventario):', loadError);
                    }
                }

                // --- Lógica de Redirección por ROL y Nivel ---
                if (user.value.role === 'Estudiante') {
                    if (!user.value.level) {
                        // Estudiante sin nivel -> Diagnóstico
                        router.push({ name: 'diagnostico' });
                    } else {
                        // Estudiante con nivel -> Dashboard de juego
                        router.push({ name: 'dashboard' });
                    }
                } else if (user.value.role === 'Profesor' || user.value.role === 'Colegio') {
                    // Gestión (Profesor/Colegio) -> Dashboard de gestión
                    router.push({ name: 'profesor-dashboard' });
                } else {
                    router.push({ name: 'dashboard' }); // Default (por si acaso)
                }

                return true;
            } else {
                console.error(response.message);
                return false;
            }
        } catch (error) {
            console.error('Error en login (API):', error);
            return false;
        }
    }

    /**
     * 🧾 REGISTER: Guarda la información completa del perfil.
     */
    async function register(userData) {
        try {
            const response = await apiRegister(userData);

            if (response.success) {
                console.log('Usuario registrado correctamente. Ahora puedes iniciar sesión.');
                // Redirigimos al Login
                router.push({ name: 'login' });
                return true;
            } else {
                console.error(response.message || 'Error al registrar el usuario.');
                return false;
            }
        } catch (error) {
            console.error('Error en register:', error);
            return false;
        }
    }

    /**
     * 🚪 LOGOUT
     */
    function logout() {
        user.value = null;
        token.value = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        router.push({ name: 'login' });
    }

    /**
     * 🧑‍🎓 ASIGNAR NIVEL: Guarda el nivel asignado después del diagnóstico
     */
    function assignLevel(level) {
        if (user.value) {
            user.value.level = level;
            // Actualizar localStorage inmediatamente
            localStorage.setItem('user', JSON.stringify(user.value));
        }
    }

    // --- DEVUELVE LAS ACCIONES Y ESTADO ---
    return {
        user,
        token,
        login,
        register,
        logout,
        assignLevel,
        initialize // 👈 EXPORTAMOS LA FUNCIÓN DE INICIALIZACIÓN
    };
});
