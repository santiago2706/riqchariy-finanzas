// src/stores/useAuthStore.js
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { login as apiLogin, register as apiRegister } from '../services/authApi.js';
import router from '../router/index.js';
import { useKioscoStore } from './useKioscoStore';
import { fetchGameState } from '../services/transactionApi.js';

export const useAuthStore = defineStore('auth', () => {
    // =====================================================
    // 🧩 ESTADO
    // =====================================================
    const user = ref(null);
    const token = ref(null);

    // =====================================================
    // ⚙️ INICIALIZACIÓN
    // =====================================================
    function initialize() {
        try {
            const savedUser = localStorage.getItem('user');
            const savedToken = localStorage.getItem('token');

            user.value = savedUser ? JSON.parse(savedUser) : null;
            token.value = savedToken || null;

            // Limpieza si hay inconsistencia
            if (savedUser && !savedToken) {
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

    // =====================================================
    // 🔐 LOGIN
    // =====================================================
    async function login(email, password) {
        try {
            // En authApi el campo se llama "gmail", así que no hay conflicto
            const response = await apiLogin(email, password);

            if (response.success) {
                user.value = response.user;
                token.value = response.token;

                localStorage.setItem('user', JSON.stringify(response.user));
                localStorage.setItem('token', response.token);

                // --- Si el usuario es estudiante, intentar cargar estado de juego ---
                if (user.value.role === 'Estudiante') {
                    try {
                        console.log('[Auth Store]: Login exitoso. Intentando cargar datos del juego...');
                        const savedState = await fetchGameState();
                        const kioscoStore = useKioscoStore();

                        kioscoStore.loadState(
                            savedState.inventario,
                            savedState.saldo,
                            savedState.day,
                            user.value.region
                        );
                    } catch (loadError) {
                        console.warn('⚠️ No se pudo cargar el estado del juego:', loadError);
                    }
                }

                // --- Redirección por rol ---
                if (user.value.role === 'Estudiante') {
                    router.push({ name: user.value.level ? 'dashboard' : 'diagnostico' });
                } else if (user.value.role === 'Profesor' || user.value.role === 'Colegio') {
                    router.push({ name: 'profesor-dashboard' });
                } else {
                    router.push({ name: 'dashboard' });
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

    // =====================================================
    // 🧾 REGISTER (CORREGIDO)
    // =====================================================
    async function register(userData) {
        try {
            const response = await apiRegister(userData);

            if (response.success) {
                console.log('✅ Usuario registrado correctamente.');
                router.push({ name: 'login' });
                return { success: true }; // Devuelve un objeto claro
            } else {
                // Esto maneja errores 400 (usuario ya existe)
                console.error(response.message || 'Error al registrar el usuario.');
                return { success: false, errors: [response.message || 'Error desconocido'] };
            }
        } catch (error) {
            console.error('Error en register:', error);

            // 🛑 CORRECCIÓN CLAVE: Manejar el error 422 (AxiosError)
            if (error.response && error.response.status === 422) {
                // 422 de FastAPI/Pydantic devuelve un objeto 'detail' con la lista de errores.
                const pydanticErrors = error.response.data.detail;
                console.error('Errores de validación (Pydantic):', pydanticErrors);

                // Devuelve los errores de Pydantic al componente que llamó a 'register'
                return { success: false, errors: pydanticErrors };
            }

            return { success: false, errors: ['Error al conectar o registrar el usuario.'] };
        }
    }

    // =====================================================
    // 🚪 LOGOUT
    // =====================================================
    function logout() {
        user.value = null;
        token.value = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        router.push({ name: 'login' });
    }

    // =====================================================
    // 🧩 ASIGNAR NIVEL (después del diagnóstico)
    // =====================================================
    function assignLevel(level) {
        if (user.value) {
            user.value.level = level;
            localStorage.setItem('user', JSON.stringify(user.value));
        }
    }

    return {
        user,
        token,
        login,
        register,
        logout,
        assignLevel,
        initialize
    };
});
