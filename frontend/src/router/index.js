// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import GameLayout from '@/layouts/GameLayout.vue';
import PublicLayout from '@/layouts/PublicLayout.vue';

// --- Imports de Módulos (DDD) ---

// Landing
import HomeView from '@/modules/landing/views/HomeView.vue';

// Auth
import LoginView from '@/modules/auth/views/LoginView.vue';
import RegisterView from '@/modules/auth/views/RegisterView.vue';

// Dashboard
import DashboardView from '@/modules/dashboard/views/DashboardView.vue';
import ProfesorDashboard from '@/modules/dashboard/views/ProfesorDashboard.vue';
import AvanceAlumnoView from '@/modules/dashboard/views/AvanceAlumnoView.vue';
import EstadisticasView from '@/modules/dashboard/views/EstadisticasView.vue';

// Institution (Colegio/SaaS)
import InstitutionDashboard from '@/modules/institution/views/InstitutionDashboard.vue';

// Market (Tiendita)
import KioscoView from '@/modules/market/views/KioscoView.vue';

// Learning (Lecciones)
import DiagnosticoView from '@/modules/learning/views/DiagnosticoView.vue';
import SemillaView from '@/modules/learning/views/SemillaView.vue';
import LeccionesView from '@/modules/learning/views/LeccionesView.vue';
import RetosView from '@/modules/learning/views/RetosView.vue';

// Budgeting (Presupuesto)
import PresupuestoView from '@/modules/budgeting/views/PresupuestoView.vue';

// Profile
import ProfileView from '@/modules/auth/views/ProfileView.vue';

// Store
import { useAuthStore } from '@/modules/auth/store/useAuthStore.js';

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
        // Institution Route
        { path: 'institution', name: 'institution-dashboard', component: InstitutionDashboard },

        { path: 'kiosco', name: 'kiosco', component: KioscoView },
        { path: 'diagnostico', name: 'diagnostico', component: DiagnosticoView },
        { path: 'lecciones', name: 'lecciones', component: LeccionesView },
        { path: 'presupuesto', name: 'presupuesto-brote', component: PresupuestoView },
        { path: 'semilla', name: 'lecciones-semilla', component: SemillaView },
        { path: 'profesor', name: 'profesor-dashboard', component: ProfesorDashboard },
        { path: 'avance/:id', name: 'avance-alumno', component: AvanceAlumnoView },
        { path: 'retos-gestion', name: 'retos-gestion', component: RetosView },
        { path: 'estadisticas', name: 'estadisticas-colegio', component: EstadisticasView },
        { path: 'perfil', name: 'perfil', component: ProfileView },
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
    else if (auth.user?.role === 'Profesor') next({ name: 'profesor-dashboard' });
    else if (auth.user?.role === 'Colegio') next({ name: 'institution-dashboard' });
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
