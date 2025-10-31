import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue'; // <--- ¡AÑADIDO EL IMPORT DEL DASHBOARD!

// 1. Importamos el cerebro de Auth para saber si el usuario está logueado
import { useAuthStore } from '../stores/useAuthStore.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true } // Esta ruta SÍ requiere login
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true } // Si ya está logueado, no puede ver esto
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresGuest: true } // Si ya está logueado, no puede ver esto
    },

    // --- RUTAS DEL JUEGO ---
    {
      path: '/dashboard', // <--- ¡NUEVA RUTA!
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },

  ]
});

// --- 2. ¡EL GUARDIA DE SEGURIDAD! ---
// Esto se ejecuta ANTES de cargar cualquier página
router.beforeEach((to, from, next) => {
  const auth = useAuthStore(); // Llama al cerebro de Auth
  const isAuthenticated = !!auth.token; // ¿Tiene token?

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Si la ruta requiere login y NO está logueado...
    next('/login'); // ...mándalo al login.
  } else if (to.meta.requiresGuest && isAuthenticated) {
    // Si la ruta es para invitados (login/register) y SÍ está logueado...
    next('/'); // ...mándalo al Home (Dashboard).
  } else {
    // En cualquier otro caso, déjalo pasar.
    next();
  }
});

export default router;
