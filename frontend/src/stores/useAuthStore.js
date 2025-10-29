import { ref } from 'vue';
import { defineStore } from 'pinia';

// 1. IMPORTAMOS NUESTRA API FALSA (Ruta corregida)
import { login as apiLogin, register as apiRegister } from '../services/authApi.js';

// 2. Importamos el router (Ruta corregida con el archivo index.js)
import router from '../router/index.js';

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
        user.value = response.user;
        token.value = response.token;
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);

        router.push('/');
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
