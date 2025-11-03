import { ref } from 'vue';
import { defineStore } from 'pinia';

// Importamos la API de autenticación
import { login as apiLogin, register as apiRegister } from '../services/authApi.js';

// Importamos el router
import router from '../router/index.js';

// --- Otros stores / servicios ---
import { useKioscoStore } from './useKioscoStore';
import { useMarketStore } from '../services/useMarketStore';
import { fetchGameState } from '../services/transactionApi.js';

export const useAuthStore = defineStore('auth', () => {
  // --- ESTADO ---
  const getSavedUser = () => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error al parsear el usuario del localStorage:', error);
      localStorage.removeItem('user');
      return null;
    }
  };

  const user = ref(getSavedUser());
  const token = ref(localStorage.getItem('token'));

  // --- ACCIONES ---

  /**
   * 🔐 LOGIN
   */
  async function login(email, password) {
    try {
      const response = await apiLogin(email, password);

      if (response.success) {
        user.value = response.user;
        token.value = response.token;
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);

        // Carga el estado del juego al iniciar sesión
        try {
          console.log('[Auth Store]: Login exitoso. Cargando datos del juego...');
          const savedState = await fetchGameState();
          const kioscoStore = useKioscoStore();
          const marketStore = useMarketStore();
          kioscoStore.loadState(savedState.inventario, savedState.saldo, savedState.day);
          marketStore.loadState(savedState.day);
        } catch (loadError) {
          console.error('Error al cargar el estado del juego:', loadError);
        }

        router.push('/');
        return true;
      } else {
        alert(response.message);
        return false;
      }
    } catch (error) {
      console.error('Error en login:', error);
      alert('Hubo un error al iniciar sesión.');
      return false;
    }
  }

  /**
   * 🧾 REGISTER
   */
  async function register(userData) {
    try {
      const response = await apiRegister(userData);

      if (response.success) {
        alert('Usuario registrado correctamente. Ahora puedes iniciar sesión.');
        router.push('/login'); // Redirige al login después del registro
        return true;
      } else {
        alert(response.message || 'Error al registrar el usuario.');
        return false;
      }
    } catch (error) {
      console.error('Error en register:', error);
      alert('Hubo un problema al registrar la cuenta.');
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
    router.push('/login');
  }

  // --- DEVUELVE LAS ACCIONES Y ESTADO ---
  return {
    user,
    token,
    login,
    register,
    logout
  };
});
