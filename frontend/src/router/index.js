// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// 1. IMPORTA TUS NUEVOS LAYOUTS
import GameLayout from '@/layouts/GameLayout.vue'
import PublicLayout from '@/layouts/PublicLayout.vue'

// 2. IMPORTA TUS VISTAS (PÁGINAS)
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue';
import KioscoView from '../views/KioscoView.vue'; // <-- ¡AÑADIMOS KIOSCO!

// 3. IMPORTA TU AUTH STORE
import { useAuthStore } from '../stores/useAuthStore.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  // 4. ESTA ES LA ESTRUCTURA DE RUTAS *COMBINADA*
  routes: [

    // --- Rutas Públicas (usan PublicLayout) ---
    {
      path: '/',
      component: PublicLayout, // <-- "Envuelve" con el Layout Público
      children: [
        // La ruta '/' es la LANDING PAGE. Es para todos.
        {
          path: '', // Vacío para que coincida con '/'
          name: 'home',
          component: HomeView
          // Sin meta. Es pública.
        },
        // La ruta '/login'
        {
          path: 'login',
          name: 'login',
          component: LoginView,
          meta: { requiresGuest: true } // Correcto
        },
        // La ruta '/register'
        {
          path: 'register',
          name: 'register',
          component: RegisterView,
          meta: { requiresGuest: true } // Correcto
        }
      ]
    },

    // --- Rutas del Juego (usan GameLayout) ---
    {
      path: '/app',
      component: GameLayout, // <-- "Envuelve" con el Layout del Juego
      meta: { requiresAuth: true }, // <-- ¡PROTEGEMOS TODO EL LAYOUT!
      children: [
        // La ruta '/app/dashboard'
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView
          // No necesita meta individual, el 'padre' ya lo protege
        },
        // La ruta '/app/kiosco'
        {
          path: 'kiosco',
          name: 'kiosco',
          component: KioscoView
          // No necesita meta individual, el 'padre' ya lo protege
        }
      ]
    }
  ]
});

// --- 5. ¡TU GUARDIA DE SEGURIDAD! (Mejorado para Layouts) ---
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const isAuthenticated = !!auth.token;

  // Esta lógica es la forma correcta de revisar 'metas' en rutas anidadas
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

  if (requiresAuth && !isAuthenticated) {
    // Si la ruta requiere login y NO está logueado...
    next({ name: 'login' }); // ...mándalo al login (usando el nombre).
  } else if (requiresGuest && isAuthenticated) {
    // Si la ruta es para invitados (login/register) y SÍ está logueado...
    next({ name: 'dashboard' }); // ...mándalo al Dashboard (la app), no al home público.
  } else {
    // En cualquier otro caso, déjalo pasar.
    next();
  }
});

export default router;
