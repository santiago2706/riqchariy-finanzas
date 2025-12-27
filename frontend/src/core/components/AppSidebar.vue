<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store/useAuthStore'
import { computed } from 'vue'

const authStore = useAuthStore()

// --- Lógica de Roles y Permisos ---
const userRole = computed(() => authStore.user?.role)
const isEstudiante = computed(() => userRole.value === 'Estudiante')
// CLAVE: isProfesorOrColegio es para elementos que ambos roles ven (la sección "Gestión" y "Mi Aula/Admin Central")
const isProfesorOrColegio = computed(() => userRole.value === 'Profesor' || userRole.value === 'Colegio')
// CLAVE: isColegioAdmin es solo para las rutas exclusivas del Administrador
const isColegioAdmin = computed(() => userRole.value === 'Colegio')

// --- Lógica de Niveles de Estudiante ---
const userLevel = computed(() => authStore.user?.level)
const isBrote = computed(() => userLevel.value === 'Brote')
const isSemilla = computed(() => userLevel.value === 'Semilla')
const isArbol = computed(() => userLevel.value === 'Árbol') // Computed para Nivel Árbol

// Información de pie de página
const userName = computed(() => authStore.user?.name || 'Invitado')
</script>

<template>
    <aside class="fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white flex flex-col z-30 shadow-lg">

        <div class="h-16 flex items-center justify-center border-b border-gray-700">
            <h1 class="text-xl font-bold text-white tracking-widest">RIQCH'ARIY</h1>
        </div>

        <nav class="flex-grow p-4 space-y-2">

            <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Plataforma</h2>

            <RouterLink :to="{ name: 'home' }" class="nav-link">
                <span class="font-medium">🏠 Home (Público)</span>
            </RouterLink>

            <template v-if="isEstudiante">
                <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-2">
                    Mi Juego (Nivel: **{{ userLevel || 'N/A' }}**)
                </h2>

                <RouterLink :to="{ name: 'dashboard' }" class="nav-link"><span>📊 Dashboard</span></RouterLink>
                <RouterLink :to="{ name: 'lecciones' }" class="nav-link"><span>📚 Catálogo de Lecciones</span></RouterLink>

                <template v-if="isSemilla">
                    <h3 class="text-xs font-semibold text-gray-500 ml-2 mt-2">Nivel Semilla 🌾 (Básico)</h3>

                    <RouterLink :to="{ name: 'lecciones-semilla' }" class="nav-link ml-4"><span>- Módulo Básico</span></RouterLink>

                    <RouterLink :to="{ name: 'kiosco' }" class="nav-link ml-4"><span>- 🛒 Tienda Virtual</span></RouterLink>
                </template>

                <template v-if="isBrote">
                    <h3 class="text-xs font-semibold text-gray-500 ml-2 mt-2">Nivel Brote 🌻 (Avanzado)</h3>

                    <RouterLink :to="{ name: 'presupuesto-brote' }" class="nav-link ml-4"><span>- Módulo Presupuesto</span></RouterLink>

                    <RouterLink :to="{ name: 'kiosco' }" class="nav-link ml-4"><span>- 🛒 Tienda Virtual (Revisión)</span></RouterLink>
                </template>

                <template v-if="isArbol">
                    <h3 class="text-xs font-semibold text-gray-500 ml-2 mt-2">Nivel Árbol 🌳 (Inversión)</h3>
                    <RouterLink :to="{ name: 'simulador-interes' }" class="nav-link ml-4"><span>- 📈 Simulador de Inversión</span></RouterLink>
                </template>

            </template>
            <template v-if="isProfesorOrColegio">
                <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-2">Gestión</h2>

                <RouterLink :to="{ name: 'profesor-dashboard' }" class="nav-link">
                    <span class="truncate">👤 **{{ isColegioAdmin ? 'Admin Central' : 'Mi Aula' }}**</span>
                </RouterLink>

                <template v-if="isColegioAdmin">
                    <RouterLink :to="{ name: 'institution-dashboard' }" class="nav-link">
                         <span class="truncate">🏫 Dashboard General</span>
                    </RouterLink>
                    <RouterLink :to="{ name: 'estadisticas-colegio' }" class="nav-link">
                        <span class="truncate">📊 Estadísticas Institucionales</span>
                    </RouterLink>
                    <RouterLink :to="{ name: 'retos-gestion' }" class="nav-link">
                        <span class="truncate">🧩 Personalizar Retos</span>
                    </RouterLink>
                </template>

            </template>
            </nav>

        <div class="p-4 border-t border-gray-700">
            <p class="text-sm text-gray-400">Rol: **{{ userRole || 'Invitado' }}**</p>
            <p class="text-sm text-gray-400">Usuario: **{{ userName }}**</p>
            <button @click="authStore.logout" class="mt-2 text-sm text-red-400 hover:text-red-300">
                🚪 Cerrar Sesión
            </button>
        </div>
    </aside>
</template>
