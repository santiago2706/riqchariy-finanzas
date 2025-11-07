import { createRouter, createWebHistory } from 'vue-router';

// 1. IMPORTA LAYOUTS
import GameLayout from '@/layouts/GameLayout.vue'
import PublicLayout from '@/layouts/PublicLayout.vue'

// 2. IMPORTA TUS VISTAS (PÁGINAS)
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue';
import KioscoView from '../views/KioscoView.vue';
import DiagnosticoView from '../views/DiagnosticoView.vue';
// --- Vistas Específicas del Juego ---
import SemillaView from '../views/SemillaView.vue';
import PresupuestoView from '../views/PresupuestoView.vue';
import LeccionesView from '../views/LeccionesView.vue';
// --- Vistas de Gestión ---
import AvanceAlumnoView from '../views/AvanceAlumnoView.vue';

// 3. IMPORTA TU AUTH STORE
import { useAuthStore } from '../stores/useAuthStore.js';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    // 4. ESTRUCTURA DE RUTAS COMBINADA
    routes: [
        // --- Rutas Públicas (usan PublicLayout) ---
        {
            path: '/',
            component: PublicLayout,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: HomeView
                },
                {
                    path: 'login',
                    name: 'login',
                    component: LoginView,
                    meta: { requiresGuest: true }
                },
                {
                    path: 'register',
                    name: 'register',
                    component: RegisterView,
                    meta: { requiresGuest: true }
                },
                // --- RUTA DE DIAGNÓSTICO (MOVIDA A /app) ---
                /* {
                    path: 'diagnostico',
                    name: 'diagnostico',
                    component: DiagnosticoView,
                    meta: { requiresAuth: true }
                } */
            ]
        },

        // --- Rutas del Juego (usan GameLayout) ---
        {
            path: '/app',
            component: GameLayout,
            meta: { requiresAuth: true },
            children: [
                // 1. VISTAS PRINCIPALES
                { path: 'dashboard', name: 'dashboard', component: DashboardView },
                { path: 'kiosco', name: 'kiosco', component: KioscoView },

                // ✅ RUTA DE DIAGNÓSTICO (MOVIMIENTO CLAVE)
                {
                    path: 'diagnostico',
                    name: 'diagnostico',
                    component: DiagnosticoView
                },

                // 2. VISTAS DE LECCIONES Y MÓDULOS
                // MÓDULOS GENERALES (Nivel Árbol)
                { path: 'lecciones', name: 'lecciones', component: LeccionesView },

                // MÓDULOS DE JUEGO (Nivel Brote)
                {
                    path: 'presupuesto',
                    name: 'presupuesto-brote',
                    component: PresupuestoView
                },

                // MÓDULOS DE JUEGO (Nivel Semilla)
                {
                    path: 'semilla',
                    name: 'lecciones-semilla',
                    component: SemillaView
                },

                // Rutas de Gestión (Profesor / Colegio)
                {
                    path: 'profesor',
                    name: 'profesor-dashboard',
                    component: () => import('../views/ProfesorDashboard.vue')
                },

                // --- RUTA DINÁMICA DE AVANCE DE ALUMNO ---
                {
                    path: 'avance/:id',
                    name: 'avance-alumno',
                    component: AvanceAlumnoView
                },

                // Vistas de Gestión Central (Colegio)
                {
                    path: 'retos-gestion',
                    name: 'retos-gestion',
                    component: () => import('../views/RetosView.vue')
                },

                // --- NUEVA RUTA DE ESTADÍSTICAS DEL COLEGIO ---
                {
                    path: 'estadisticas',
                    name: 'estadisticas-colegio',
                    component: () => import('../views/EstadisticasView.vue')
                }
            ]
        }
    ]
});

// --- 5. ¡TU GUARDIA DE SEGURIDAD! ---
router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    const isAuthenticated = !!auth.token;

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

    if (requiresAuth && !isAuthenticated) {
        // Redirige al login si se requiere autenticación pero no está logueado
        next({ name: 'login' });
    } else if (requiresGuest && isAuthenticated) {
        // Redirige al dashboard si ya está logueado pero intenta acceder a rutas de invitado
        if (auth.user?.role === 'Estudiante') {
            next({ name: 'dashboard' });
        } else if (auth.user?.role === 'Profesor' || auth.user?.role === 'Colegio') {
            next({ name: 'profesor-dashboard' });
        } else {
            next({ name: 'dashboard' }); // Fallback
        }
    } else if (isAuthenticated && auth.user?.role === 'Estudiante' && !auth.user.level) {
        // ✅ REGLA DE SEGURIDAD ADICIONAL: Fuerza la redirección a 'diagnostico'
        // si el estudiante no tiene nivel, evitando el acceso directo a otras rutas de juego.
        if (to.name !== 'diagnostico') {
            next({ name: 'diagnostico' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
