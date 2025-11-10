// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import GameLayout from '@/layouts/GameLayout.vue';
import PublicLayout from '@/layouts/PublicLayout.vue';

// Vistas públicas
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

// Vistas del juego
import DashboardView from '@/views/DashboardView.vue';
import KioscoView from '@/views/KioscoView.vue';
import DiagnosticoView from '@/views/DiagnosticoView.vue';
import SemillaView from '@/views/SemillaView.vue';
import PresupuestoView from '@/views/PresupuestoView.vue';
import LeccionesView from '@/views/LeccionesView.vue';

// Vistas de gestión
import AvanceAlumnoView from '@/views/AvanceAlumnoView.vue';
import ProfesorDashboard from '@/views/ProfesorDashboard.vue';
import RetosView from '@/views/RetosView.vue';
import EstadisticasView from '@/views/EstadisticasView.vue';

import { useAuthStore } from '@/stores/useAuthStore.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },

  routes: [
    // --- Rutas Públicas ---
    {
      path: '/',
      component: PublicLayout,
      children: [
        { path: '', name: 'home', component: HomeView },
        { path: 'login', name: 'login', component: LoginView, meta: { requiresGuest: true } },
        { path: 'register', name: 'register', component: RegisterView, meta: { requiresGuest: true } },
      ]
    },

    // --- Rutas protegidas del juego ---
    {
      path: '/app',
      component: GameLayout,
      meta: { requiresAuth: true },
      children: [
        { path: 'dashboard', name: 'dashboard', component: DashboardView },
        { path: 'kiosco', name: 'kiosco', component: KioscoView },
        { path: 'diagnostico', name: 'diagnostico', component: DiagnosticoView },
        { path: 'lecciones', name: 'lecciones', component: LeccionesView },
        { path: 'presupuesto', name: 'presupuesto-brote', component: PresupuestoView },
        { path: 'semilla', name: 'lecciones-semilla', component: SemillaView },
        { path: 'profesor', name: 'profesor-dashboard', component: ProfesorDashboard },
        { path: 'avance/:id', name: 'avance-alumno', component: AvanceAlumnoView },
        { path: 'retos-gestion', name: 'retos-gestion', component: RetosView },
        { path: 'estadisticas', name: 'estadisticas-colegio', component: EstadisticasView },
      ]
    },

    // --- Fallback ---
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ]
});

// --- Guardias de ruta globales ---
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  // Asegura que el store cargue del localStorage antes de validar rutas
  if (!auth.user && !auth.token) {
    auth.initialize();
  }

  const isAuthenticated = !!auth.token;
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth);
  const requiresGuest = to.matched.some(r => r.meta.requiresGuest);

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else if (requiresGuest && isAuthenticated) {
    if (auth.user?.role === 'Estudiante') next({ name: 'dashboard' });
    else if (auth.user?.role === 'Profesor' || auth.user?.role === 'Colegio') next({ name: 'profesor-dashboard' });
    else next({ name: 'dashboard' });
  } else if (isAuthenticated && auth.user?.role === 'Estudiante' && !auth.user.level) {
    // ⚙️ Redirección controlada a diagnóstico si aún no tiene nivel
    if (to.name !== 'diagnostico') next({ name: 'diagnostico' });
    else next();
  } else {
    next();
  }
});

export default router;
